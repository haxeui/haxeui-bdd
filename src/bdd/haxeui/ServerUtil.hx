package bdd.haxeui;

import haxe.ui.remoting.server.Client;
import haxe.ui.remoting.server.Server;
import promhx.Deferred;
import promhx.Promise;

class ServerUtil {
    public static var server:Server;    
    
    public static var client:Client;
    
    public static var connected:Deferred<Dynamic> = new Deferred<Dynamic>();
    public static var disconnected:Deferred<Dynamic>;
    
    public static function start() {
        server = new Server();
        server.onConnected  = function(client:Client) {
            disconnected = new Deferred<Dynamic>();
            ServerUtil.client = client;
            connected.resolve(client);
        };
        server.onDisconnected  = function(client:Client) {
            ServerUtil.client = null;
            connected = new Deferred<Dynamic>(); 
            disconnected.resolve(null);
        };
        
        server.start();
    }
    
    public static function stop() {
        if (server != null) {
            server.stop();
        }
    }
    
    public static function closeClient() {
        if (client != null) {
            client.close();
        }
    }
    
    public static function waitForConnected():Promise<Dynamic> {
        var p = new Promise<Dynamic>(connected);
        return p;
    }
    
    public static function makeCall(id:String, params:Map<String, String> = null):Promise<Dynamic> {
        if (client == null) {
            throw "No client!";
        }
        
        var d:Deferred<Dynamic> = new Deferred<Dynamic>();
        var p:Promise<Dynamic> = new Promise<Dynamic>(d);
        client.makeCall(id, params, function(r) {
            d.resolve(r);
        });
        return p;
    }
}