package bdd.haxeui;

import bdd.runner.FeatureRunner;
import bdd.runner.Runner;
import bdd.runner.RunnerContext;
import sys.io.Process;

class ProfileRunner {
    private var _profiles:Array<Dynamic>;
    private var _stepDefs:Array<String>;
    private var _featureFile:String;
    
    public function new(profiles:Array<Dynamic>, stepDefs:Array<String>) {
        _profiles = new Array<Dynamic>();
        for (profile in profiles) {
            _profiles.push(profile);
        }
        _stepDefs = stepDefs;
    }
    
    private var _fn:Void->Void;
    public function run(featureFile:String, fn:Void->Void = null) {
        _fn = fn;
        _featureFile = featureFile;
        nextProfile();
    }
    
    private function nextProfile() {
        if (_profiles.length == 0) {
            if (_fn != null) {
                _fn();
            }
            return;
        }
        
        var profile = _profiles[0];
        _profiles.remove(profile);
        Runner.log(StringTools.lpad("", "-", 80) + "\n");
        Runner.debug("    Profile: " + profile.name);
        Runner.debug("    Type: " + profile.type);
        
        startProfile(profile);
        
        var runner:FeatureRunner = new FeatureRunner(_featureFile, _stepDefs);

        var context:RunnerContext = new RunnerContext();
        context.addStatic("System", ProcessUtil);
        context.addStatic("Input", InputSimulatorUtil);
        context.addObject("Remoting", ServerUtil);
        runner.run(context, function(e) {
            endProfile(profile);
            ServerUtil.disconnected.then(function(e) {
               nextProfile();
            });
        });
    }

    private var _serverProcess:Process = null;
    private var _browserProcess:Process = null;
    private function startProfile(profile) {
        profile.path = replaceVars(profile.path);
        
        InputSimulatorUtil.mouse.setOffsetY(0);
        
        var delay:Int = 0; // in ms
        if (profile.settings.startUpDelay != null) {
            delay = Std.parseInt(profile.settings.startUpDelay);
        }
        
        switch (profile.type) {
            case "standalone":
                var processId = ProcessUtil.open(profile.path, delay);
                Runner.debug("    Process Path: " + profile.path);
                Runner.debug("    Process Id: " + processId);
                InputSimulatorUtil.handleFromProcessId(processId);                
            case "swf":
                var processId = ProcessUtil.open(profile.path, delay);
                Runner.debug("    Process Id: " + processId);
                InputSimulatorUtil.handleFromProcessId(processId);                
            case "browser":
                var arr:Array<String> = profile.settings.server.split(" ");
                arr.reverse();
                var first:String = arr.pop();
                arr.reverse();
                //_serverProcess = new Process("nekotools", ["server", "-p", "4000", "-d", "Z:/TestApps/haxeui-remoting-testapp/bin/html5/release/bin"]);
                _serverProcess = new Process(first, arr);
                
                // "C:\Program Files (x86)\Mozilla Firefox\firefox.exe" -foreground -new-instance -url http://localhost:2000/
                _browserProcess = new Process("C:/Program Files (x86)/Mozilla Firefox/firefox.exe", ["-new-instance", "-url", "http://localhost:4000/"]);
                Runner.debug("    Process Id: " + _browserProcess.getPid());
                Sys.sleep(delay / 1000);
                InputSimulatorUtil.handleFromProcessId(_browserProcess.getPid());
                InputSimulatorUtil.mouse.setOffsetY(48); // forced for FF browser
                
        }
        Runner.debug("");
    }
    
    private function endProfile(profile) {
        switch (profile.type) {
            case "standalone":
                InputSimulatorUtil.window.close();
                ProcessUtil.killCurrent();
            case "browser":
                if (_serverProcess != null) {
                    ProcessUtil.kill(_serverProcess.getPid());
                    _serverProcess.close();
                    _serverProcess = null;
                }
                InputSimulatorUtil.window.close();
                ProcessUtil.killCurrent();
        }
        Runner.debug("");
    }
    
    private function replaceVars(input:String):String {
        var output:String = input;
        output = StringTools.replace(output, "${baseDir}", Sys.getCwd());
        return output;
    }
}