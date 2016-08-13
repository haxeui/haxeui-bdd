@echo off
if %1 == debug (
	bin\Main-debug.exe -s Z:\HaxeUI2\tools\haxeui-bdd\tests -f Z:\HaxeUI2\tools\haxeui-bdd\tests\test1.feature -p Z:\HaxeUI2\tools\haxeui-bdd\tests\profiles.json
) else (
	bin\Main.exe -s Z:\HaxeUI2\tools\haxeui-bdd\tests -f Z:\HaxeUI2\tools\haxeui-bdd\tests\test1.feature -p Z:\HaxeUI2\tools\haxeui-bdd\tests\profiles.json
)
pause