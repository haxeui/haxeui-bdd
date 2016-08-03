package bdd.haxeui;

import input.simulation.KeyBoard;
import input.simulation.Mouse;
import input.simulation.WindowLocator;

class InputSimulatorUtil {

    private static var _mouse:Mouse = Mouse.create();
    private static var _keyboard:KeyBoard = KeyBoard.create();
    
    public static function handleFromTitle(title:String):Bool {
        var locator:WindowLocator = WindowLocator.create();
        var found = locator.findByTitle(title);
        if (found == false) {
            return false;
        }
        _mouse.setWindowHandle(locator.getWindow());
        _keyboard.setWindowHandle(locator.getWindow());
        locator.bringToFront();
        return true;
    }
    
    public static function stroke(fromX:Int, fromY:Int, toX:Int, toY:Int) {
        _mouse.stroke(fromX, fromY, toX, toY);
    }
}