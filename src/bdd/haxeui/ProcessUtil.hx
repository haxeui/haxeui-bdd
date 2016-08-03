package bdd.haxeui;
import sys.io.Process;

class ProcessUtil {
    public function new() {
        
    }
    
    public static function open(file:String) {
        var p:Process = new Process("cmd", ["/c", file]);
    }
    
    public static function sleep(amount:Int) {
        Sys.sleep(amount);
    }
}