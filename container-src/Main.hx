package;

import haxe.ui.HaxeUIApp;

class Main {
    public static function main() {
        var app = new HaxeUIApp();
        app.ready(function() {
            var button:haxe.ui.components.Button = new haxe.ui.components.Button();
            button.text = "Test";
            app.addComponent(button);
            app.start();
        });
    }
}