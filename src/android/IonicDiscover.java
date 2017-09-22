package com.ionicframework.discover;


import android.os.AsyncTask;
import android.util.Log;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;


public class IonicDiscover extends CordovaPlugin {
  private static int PORT = 41234;
  private static String PREFIX = "ION_DP";
  private static String LOGTAG = "IonicDiscover";
  private CallbackContext callbackContext = null;
  private volatile HashMap<String, Service> services = new HashMap<>();
  private CountDownLatch latch = null;
  private volatile boolean running = false;
  private ScheduledThreadPoolExecutor timer = null;

  /**
   * Sets the context of the Command. This can then be used to do things like
   * get file paths associated with the Activity.
   *
   * @param cordova The context of the main Activity.
   * @param cWebView The CordovaWebView Cordova is running in.
   */
  public void initialize(CordovaInterface cordova, CordovaWebView cWebView) {

  }

  /**
   * Executes the request and returns PluginResult.
   *
   * @param action            The action to execute.
   * @param args              JSONArry of arguments for the plugin.
   * @param callbackContext   The callback id used when calling back into JavaScript.
   * @return                  True if the action was valid, false if not.
   */
  public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
    if (action.equals("watch")) {
//      Log.d(LOGTAG, "WATCH");
      this.watch(callbackContext);
      return true;
    } else if (action.equals("unwatch")) {
//      Log.d(LOGTAG, "UNWATCH");
      this.unwatch(callbackContext);
      return true;
    }
    return false;
  }

  public void watch(CallbackContext callbackContext) {
    // unwatch previous connections
    this.unwatch(null);
    this.callbackContext = callbackContext;
    this.start();
  }

  public void unwatch(CallbackContext cb) {
    this.close();
    if (this.callbackContext != null) {
      this.callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK));
      this.callbackContext = null;
    }
    if (cb != null) {
      cb.sendPluginResult(new PluginResult(PluginResult.Status.OK));
    }
  }

  private void start() {
//    Log.d(LOGTAG, "START");
    if (latch != null) return;
    latch = new CountDownLatch(1);
    running = true;

    // start timer to do GC
    timer = new ScheduledThreadPoolExecutor(1);
    timer.scheduleWithFixedDelay(() -> gc(), 0L, 1L, TimeUnit.SECONDS);

    new AsyncTask<Void, Void, JSONObject>() {
      @Override
      final protected JSONObject doInBackground(Void...params) {
        try {
          DatagramSocket socket = new DatagramSocket(PORT);
          socket.setBroadcast(true);

          byte[] buf = new byte[1024];
          DatagramPacket packet = new DatagramPacket(buf, buf.length);
          while (running) {
            socket.receive(packet);
//            Log.d(LOGTAG, "packet received");
            String prefix = new String(buf, 0, PREFIX.length());
            if (!prefix.equals(PREFIX)) continue;
            String result = new String(buf, PREFIX.length(), packet.getLength());
            JSONObject dict;
            try {
              dict = new JSONObject(result);
              if ("devapp".equals(dict.getString("nspace"))){
                IonicDiscover.this.addService(dict);
              }
            } catch (JSONException e) {
              if (callbackContext != null) {
                PluginResult err = new PluginResult(PluginResult.Status.ERROR, "Error parsing result as JSON: " + result);
                err.setKeepCallback(true);
                callbackContext.sendPluginResult(err);
              }
            }
          }
          socket.close();
//          Log.d(LOGTAG, "Latch unlocked by thread");
          latch.countDown();

        } catch (Exception e) {
          callbackContext.error(e.getMessage());
          Log.e(LOGTAG, "Exception while listening for server broadcast");
          e.printStackTrace();
          running = false;
          latch.countDown();
        }
        return null;
      }

    }.execute();
  }

  private synchronized void addService(JSONObject dict) {
    try {
      if (!"devapp".equals(dict.getString("nspace"))) return;

      services.put(dict.getString("id"), new Service(
          dict.getString("id"),
          System.currentTimeMillis() / 1000,
          dict.getString("name"),
          dict.getString("host"),
          dict.getString("ip"),
          dict.getInt("port"),
          dict.getString("path")
      ));
    } catch (ExceptionInInitializerError | JSONException e) {
      if (callbackContext != null) {
        callbackContext.error("Malformed service response");
      }
      Log.e(LOGTAG, "Malformed service response");
      e.printStackTrace();
      return;
    }
    this.gc();
  }

  private synchronized void gc() {
//    Log.d(LOGTAG, "GC");
    long expired = (System.currentTimeMillis() / 1000) - 8;
    Iterator it = this.services.entrySet().iterator();
    while (it.hasNext()) {
      Map.Entry pair = (Map.Entry)it.next();
      Service s = (Service)pair.getValue();
      if (s.timeStamp < expired) {
        it.remove();
      }
    }
    this.emit();
  }

  // TODO don't block main thread
  private void close() {
//    Log.d(LOGTAG, "CLOSE");
    if (latch == null) return;
    running = false;
    Log.d(LOGTAG, "Waiting for latch");
    try {
      latch.await();
    } catch(InterruptedException e) {
      e.printStackTrace();
    }
    services = new HashMap<>();
    latch = null;
    timer.shutdownNow();

    return;
  }

  private void emit() {
    if (this.callbackContext == null) return;
    JSONObject message = generateMessage(services.values());
    PluginResult pr = new PluginResult(PluginResult.Status.OK, message);
    pr.setKeepCallback(true);
    this.callbackContext.sendPluginResult(pr);
  }

  private JSONObject generateMessage(Collection<Service> services) {
    JSONObject result = new JSONObject();
    JSONArray servicesArray = new JSONArray();
    Iterator<Service> i = services.iterator();
    while(i.hasNext()) {
      Service s = i.next();
      JSONObject o = new JSONObject();
      try {
        o.put("id", s.id);
        o.put("name", s.name);
        o.put("hostname", s.hostname);
        o.put("address", s.address);
        o.put("port", s.port);
        o.put("path", s.path);
        servicesArray.put(o);
      } catch (JSONException e) {
        e.printStackTrace();
      }
    }
    try {
      result.put("services", servicesArray);
    } catch (JSONException e) {
      e.printStackTrace();
    }

    return result;
  }

  private class Service {
    public String id;
    public long timeStamp;
    public String name;
    public String hostname;
    public String address;
    public int port;
    public String path;

    public Service(String id, long timeStamp, String name, String hostname, String address, int port, String path) {
      this.id = id;
      this.timeStamp = timeStamp;
      this.name = name;
      this.hostname = hostname;
      this.address = address;
      this.port = port;
      this.path = path;
    }
  }
}

