package bdd.haxeui;

import haxe.Json;
import haxe.ui.remoting.server.Server;
import sys.FileSystem;
import sys.io.File;

class Main {
    public static var server:Server;
	public static function main() {
        var args = Sys.args();
        var cfg = new Config();
        
        var argHandler = hxargs.Args.generate([
            @doc("Feature file to run")
            ["-f", "--feature"] => function(path:String) cfg.featureFile = path,
            
            @doc("Profiles to use")
            ["-p", "--profiles"] => function(path:String) cfg.profiles = path,
            
            @doc("Step definitions directory")
            ["-s", "--step-defs"] => function(path:String) cfg.stepDefsDir = path,
        ]);
        
        if (args.length == 0) {
            Sys.println("\nHaxeUI Behaviour Driven Development\n");
            Sys.println(argHandler.getDoc());
            Sys.exit(0);
        }
        
        argHandler.parse(args);
        
        cfg.profiles = "default-profiles.json";
        
        Sys.println("Feature: " + cfg.featureFile);
        Sys.println("Profiles: " + cfg.profiles);
        Sys.println("Step Defs: " + cfg.stepDefsDir);
        Sys.println("");
        
        var files:Array<String> = FileSystem.readDirectory(cfg.stepDefsDir);
        var stepDefs:Array<String> = [];
        for (file in files) {
            if (StringTools.endsWith(file, ".hscript") == false) {
                continue;
            }
            var fullPath = cfg.stepDefsDir + "/" + file;
            stepDefs.push(fullPath);
        }
        
        var profiles:Array<Dynamic> = Json.parse(File.getContent(cfg.profiles));
        ServerUtil.start();
        
        var runner:ProfileRunner = new ProfileRunner(profiles, stepDefs);
        runner.run(cfg.featureFile, function() {
            Sys.exit(0);
        });  
            
        Sys.getChar(false);
    }
}