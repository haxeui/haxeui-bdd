package bdd.haxeui;

import input.simulation.KeyBoard;
import input.simulation.Mouse;
import input.simulation.WindowLocator;

class InputSimulatorUtil {

    public static var mouse:Mouse = Mouse.create();
    private static var _keyboard:KeyBoard = KeyBoard.create();
    public static var window:WindowLocator = WindowLocator.create();


    public static function handleFromTitle(title:String):Bool {
        var found = window.findByTitle(title);
        if (found == false) {
            return false;
        }
        mouse.setWindowHandle(window.getWindow());
        _keyboard.setWindowHandle(window.getWindow());
        window.bringToFront();
        return true;
    }

    public static function handleFromProcessId(processId:Int):Bool {
        var found = window.findByProcessId(processId);
        if (found == false) {
            return false;
        }
        mouse.setWindowHandle(window.getWindow());
        _keyboard.setWindowHandle(window.getWindow());
        window.bringToFront();
        return true;
    }

    public static function stroke(fromX:Int, fromY:Int, toX:Int, toY:Int) {
        mouse.stroke(fromX, fromY, toX, toY);
    }

    public static function click(x:Int, y:Int) {
        mouse.click(x, y);
    }

    public static function type(text:String) {
        _keyboard.type(text);
    }
}