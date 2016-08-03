package bdd.haxeui;

import bdd.haxeui.test1.MockDBRecord;
import bdd.haxeui.test1.MockDBService;
import bdd.runner.FeatureRunner;
import bdd.runner.Runner;
import bdd.runner.RunnerContext;
import bdd.runner.runtime.FeatureExpander;
import bdd.runner.script.Script;
import cpp.Lib;
import gherkin.AstBuilder;
import gherkin.Parser;
import gherkin.ast.GherkinDocument;
import haxe.Json;
import sys.io.File;
import input.simulation.KeyBoard;
import input.simulation.Keys;
import input.simulation.Mouse;
import input.simulation.WindowLocator;
import sys.io.Process;

class Main {
	public static function main() {
        //Sys.getChar(false);
        /*
        var parser:Parser<GherkinDocument> = new Parser<GherkinDocument>(new AstBuilder());
		var doc:GherkinDocument = parser.parseString(File.getContent("tests/test1.feature"));

        var expander:FeatureExpander = new FeatureExpander();
        doc = expander.expand(doc);
        
        var script:Script = new Script(File.getContent("tests/test1-stepdefs.hscript"));
        
        trace(doc.feature.children.length);
        for (c in doc.feature.children) {
            trace(c);
        }        
        */
        
        /*
        var p:input.simulation.Process = input.simulation.Process.create();
        p.open("Z:/TestApps/Drawing/bin/flash/release/bin/Drawing.swf");
        trace(p.getProcessId());
        
        return;
        */
        
        
        var profiles:Array<Dynamic> = Json.parse(File.getContent("tests/profiles.json"));
        for (profile in profiles) {
            trace("name: " + profile.name);
            trace("type: " + profile.type);
            
            startProfile(profile);
            
            
            
            
            
            
            
            var stepDefs:Array<String> = [
                "tests/test1-stepdefs-a.hscript",
                "tests/test1-stepdefs-b.hscript",
                "tests/process-steps.hscript",
                "tests/input-simulator-steps.hscript",
                "tests/generic-steps.hscript",
            ];
            
            var runner:FeatureRunner = new FeatureRunner("tests/test1.feature", stepDefs);
            
            var context:RunnerContext = new RunnerContext();
            context.addStatic("System", ProcessUtil);
            context.addStatic("Input", InputSimulatorUtil);
            
            context.addStatic("FakeRecord", MockDBRecord);
            context.addObject("fakeDB", new MockDBService());
            //var runner:Runner = new Runner(doc, script);
            //runner.prepare();
            runner.run(context);
            
            
            
            
            
            
            
            endProfile(profile);
            
            //break;
        }
        
        //Sys.getChar(false);
        return;
        
        
        var stepDefs:Array<String> = [
            "tests/test1-stepdefs-a.hscript",
            "tests/test1-stepdefs-b.hscript",
            "tests/process-steps.hscript",
            "tests/input-simulator-steps.hscript",
            "tests/generic-steps.hscript",
        ];
        
        var runner:FeatureRunner = new FeatureRunner("tests/test1.feature", stepDefs);
        
        var context:RunnerContext = new RunnerContext();
        context.addStatic("System", ProcessUtil);
        context.addStatic("Input", InputSimulatorUtil);
        
        context.addStatic("FakeRecord", MockDBRecord);
        context.addObject("fakeDB", new MockDBService());
        //var runner:Runner = new Runner(doc, script);
        //runner.prepare();
        runner.run(context);
        
        //var p:Process = new Process("cmd", ["/c", "Z:/TestApps/Drawing/bin/flash/release/bin/Drawing.swf"]);
        //test();
        Sys.getChar(false);
	}
    
    private static var serverProcess:Process = null;
    private static var browserProcess:Process = null;
    private static function startProfile(profile) {
        InputSimulatorUtil.mouse.setOffsetY(0);
        
        switch (profile.type) {
            case "standalone":
                var processId = ProcessUtil.open(profile.path, 1000);
                trace(processId);
                InputSimulatorUtil.handleFromProcessId(processId);                
            case "browser":
                serverProcess = new Process("nekotools", ["server", "-p", "4000", "-d", "Z:/TestApps/Drawing/bin/html5/release/bin"]);
                //ProcessUtil.open(profile.path);
                
                // "C:\Program Files (x86)\Mozilla Firefox\firefox.exe" -foreground -new-instance -url http://localhost:2000/
                browserProcess = new Process("C:/Program Files (x86)/Mozilla Firefox/firefox.exe", ["-foreground", "-silent", "-new-instance", "-url", "http://localhost:4000/"]);
                trace(browserProcess.getPid());
                Sys.sleep(3);
                InputSimulatorUtil.handleFromProcessId(browserProcess.getPid());
                InputSimulatorUtil.mouse.setOffsetY(48);
                
        }
    }
    
    private static function endProfile(profile) {
        switch (profile.type) {
            case "standalone":
                ProcessUtil.killCurrent();
            case "browser":
                if (serverProcess != null) {
                    ProcessUtil.kill(serverProcess.getPid());
                    serverProcess.close();
                    serverProcess = null;
                }
                //ProcessUtil.kill(browserProcess.getPid());
                //browserProcess.close();
                InputSimulatorUtil.window.close();
                ProcessUtil.killCurrent();
        }
    }
    
    
    public static function test() {
        var locator:WindowLocator = WindowLocator.create();
        var h = locator.findByTitle("Adobe Flash Player 11");
        locator.bringToFront();

        var mouse:Mouse = Mouse.create();
        mouse.setWindowHandle(locator.getWindow());

        mouse.stroke(200, 20, 200, 200);

        mouse.stroke(210, 200, 270, 20);
        mouse.stroke(270, 20, 330, 200);
        mouse.stroke(235, 120, 300, 120);

        mouse.stroke(340, 200, 340, 20);
        mouse.stroke(340, 20, 420, 200);
        mouse.stroke(420, 200, 420, 20);

        mouse.click(20, 20);

        var keyboard:KeyBoard = KeyBoard.create();
        keyboard.setWindowHandle(locator.getWindow());

        keyboard.type("first we found a candidate HWND\n");

        keyboard.type("now we can send chars to it\n\n");

        keyboard.type("this is a test line 1\n");
        keyboard.type("this is a test line 2\n");
        keyboard.type("this is a test line 3\n");
        keyboard.type("this is a test line 4\n");
        keyboard.type("this is a test line 5\n");

        keyboard.down(Keys.CONTROL_KEY);
        keyboard.down("a".charCodeAt(0));

        keyboard.up(Keys.CONTROL_KEY);
        keyboard.up("a".charCodeAt(0));

        keyboard.press(Keys.DELETE_KEY);
    }
}