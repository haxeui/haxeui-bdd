package bdd.haxeui;

import input.simulation.Process;

class ProcessUtil {
    private static var _process:Process = Process.create();

    public static function open(file:String, wait:Int = 0):Int {
        _process.kill();
        _process.open(file, wait);
        return _process.getProcessId();
    }

    public static function sleep(amount:Int) {
        Sys.sleep(amount);
    }

    public static function killCurrent():Bool {
        return _process.kill(0);
    }

    public static function kill(processId:Int):Bool {
        return _process.kill(processId);
    }
}
