package bdd.haxeui;

import sys.FileSystem;
import sys.io.File;

class FileUtil {
    public static function getFileContent(filename:String):String {
        return File.getContent(filename);
    }
}