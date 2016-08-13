(function (console, $global) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	r: null
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw new js__$Boot_HaxeError("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var IntIterator = function(min,max) {
	this.min = min;
	this.max = max;
};
$hxClasses["IntIterator"] = IntIterator;
IntIterator.__name__ = ["IntIterator"];
IntIterator.prototype = {
	min: null
	,max: null
	,hasNext: function() {
		return this.min < this.max;
	}
	,next: function() {
		return this.min++;
	}
	,__class__: IntIterator
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,__class__: List
};
var Main = function() { };
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.main = function() {
	var app = new haxe_ui_HaxeUIApp();
	app.ready(function() {
		var button = new haxe_ui_components_Button();
		button.set_text("Test");
		app.addComponent(button);
		app.start();
	});
};
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js_Boot.__instanceof(v,t);
};
Std.instance = function(value,c) {
	if((value instanceof c)) return value; else return null;
};
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	b: null
	,add: function(x) {
		this.b += Std.string(x);
	}
	,addSub: function(s,pos,len) {
		if(len == null) this.b += HxOverrides.substr(s,pos,null); else this.b += HxOverrides.substr(s,pos,len);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
};
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
};
StringTools.htmlEscape = function(s,quotes) {
	s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	if(quotes) return s.split("\"").join("&quot;").split("'").join("&#039;"); else return s;
};
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&quot;").join("\"").split("&#039;").join("'").split("&amp;").join("&");
};
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = c + s;
	return s;
};
StringTools.rpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = s + c;
	return s;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
StringTools.isEof = function(c) {
	return c != c;
};
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw new js__$Boot_HaxeError("No such constructor " + constr);
	if(Reflect.isFunction(f)) {
		if(params == null) throw new js__$Boot_HaxeError("Constructor " + constr + " need parameters");
		return Reflect.callMethod(e,f,params);
	}
	if(params != null && params.length != 0) throw new js__$Boot_HaxeError("Constructor " + constr + " does not need parameters");
	return f;
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = js_Boot.getClass(v);
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2;
		var _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e1 ) {
		haxe_CallStack.lastException = e1;
		if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
		return false;
	}
	return true;
};
var Xml = function(nodeType) {
	this.nodeType = nodeType;
	this.children = [];
	this.attributeMap = new haxe_ds_StringMap();
};
$hxClasses["Xml"] = Xml;
Xml.__name__ = ["Xml"];
Xml.parse = function(str) {
	return haxe_xml_Parser.parse(str);
};
Xml.createElement = function(name) {
	var xml = new Xml(Xml.Element);
	if(xml.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + xml.nodeType);
	xml.nodeName = name;
	return xml;
};
Xml.createPCData = function(data) {
	var xml = new Xml(Xml.PCData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createCData = function(data) {
	var xml = new Xml(Xml.CData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createComment = function(data) {
	var xml = new Xml(Xml.Comment);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createDocType = function(data) {
	var xml = new Xml(Xml.DocType);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createProcessingInstruction = function(data) {
	var xml = new Xml(Xml.ProcessingInstruction);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createDocument = function() {
	return new Xml(Xml.Document);
};
Xml.prototype = {
	nodeType: null
	,nodeName: null
	,nodeValue: null
	,parent: null
	,children: null
	,attributeMap: null
	,get_nodeValue: function() {
		if(this.nodeType == Xml.Document || this.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + this.nodeType);
		return this.nodeValue;
	}
	,get: function(att) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.attributeMap.get(att);
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		this.attributeMap.set(att,value);
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.attributeMap.exists(att);
	}
	,attributes: function() {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.attributeMap.keys();
	}
	,elements: function() {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		var ret;
		var _g = [];
		var _g1 = 0;
		var _g2 = this.children;
		while(_g1 < _g2.length) {
			var child = _g2[_g1];
			++_g1;
			if(child.nodeType == Xml.Element) _g.push(child);
		}
		ret = _g;
		return HxOverrides.iter(ret);
	}
	,elementsNamed: function(name) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		var ret;
		var _g = [];
		var _g1 = 0;
		var _g2 = this.children;
		while(_g1 < _g2.length) {
			var child = _g2[_g1];
			++_g1;
			if(child.nodeType == Xml.Element && (function($this) {
				var $r;
				if(child.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + child.nodeType);
				$r = child.nodeName;
				return $r;
			}(this)) == name) _g.push(child);
		}
		ret = _g;
		return HxOverrides.iter(ret);
	}
	,firstElement: function() {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.nodeType == Xml.Element) return child;
		}
		return null;
	}
	,addChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		if(x.parent != null) x.parent.removeChild(x);
		this.children.push(x);
		x.parent = this;
	}
	,removeChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		if(HxOverrides.remove(this.children,x)) {
			x.parent = null;
			return true;
		}
		return false;
	}
	,__class__: Xml
	,__properties__: {get_nodeValue:"get_nodeValue"}
};
var haxe_StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe_StackItem.CFunction = ["CFunction",0];
haxe_StackItem.CFunction.toString = $estr;
haxe_StackItem.CFunction.__enum__ = haxe_StackItem;
haxe_StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
var haxe_CallStack = function() { };
$hxClasses["haxe.CallStack"] = haxe_CallStack;
haxe_CallStack.__name__ = ["haxe","CallStack"];
haxe_CallStack.getStack = function(e) {
	if(e == null) return [];
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			if(haxe_CallStack.wrapCallSite != null) site = haxe_CallStack.wrapCallSite(site);
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe_StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe_StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe_CallStack.makeStack(e.stack);
	Error.prepareStackTrace = oldValue;
	return a;
};
haxe_CallStack.callStack = function() {
	try {
		throw new Error();
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		var a = haxe_CallStack.getStack(e);
		a.shift();
		return a;
	}
};
haxe_CallStack.exceptionStack = function() {
	return haxe_CallStack.getStack(haxe_CallStack.lastException);
};
haxe_CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe_CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe_CallStack.itemToString = function(b,s) {
	switch(s[1]) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = s[2];
		b.b += "module ";
		if(m == null) b.b += "null"; else b.b += "" + m;
		break;
	case 2:
		var line = s[4];
		var file = s[3];
		var s1 = s[2];
		if(s1 != null) {
			haxe_CallStack.itemToString(b,s1);
			b.b += " (";
		}
		if(file == null) b.b += "null"; else b.b += "" + file;
		b.b += " line ";
		if(line == null) b.b += "null"; else b.b += "" + line;
		if(s1 != null) b.b += ")";
		break;
	case 3:
		var meth = s[3];
		var cname = s[2];
		if(cname == null) b.b += "null"; else b.b += "" + cname;
		b.b += ".";
		if(meth == null) b.b += "null"; else b.b += "" + meth;
		break;
	case 4:
		var n = s[2];
		b.b += "local function #";
		if(n == null) b.b += "null"; else b.b += "" + n;
		break;
	}
};
haxe_CallStack.makeStack = function(s) {
	if(s == null) return []; else if(typeof(s) == "string") {
		var stack = s.split("\n");
		if(stack[0] == "Error") stack.shift();
		var m = [];
		var rie10 = new EReg("^   at ([A-Za-z0-9_. ]+) \\(([^)]+):([0-9]+):([0-9]+)\\)$","");
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			if(rie10.match(line)) {
				var path = rie10.matched(1).split(".");
				var meth = path.pop();
				var file = rie10.matched(2);
				var line1 = Std.parseInt(rie10.matched(3));
				m.push(haxe_StackItem.FilePos(meth == "Anonymous function"?haxe_StackItem.LocalFunction():meth == "Global code"?null:haxe_StackItem.Method(path.join("."),meth),file,line1));
			} else m.push(haxe_StackItem.Module(StringTools.trim(line)));
		}
		return m;
	} else return s;
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = ["haxe","_Int64","___Int64"];
haxe__$Int64__$_$_$Int64.prototype = {
	high: null
	,low: null
	,__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Log = function() { };
$hxClasses["haxe.Log"] = haxe_Log;
haxe_Log.__name__ = ["haxe","Log"];
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var haxe_Resource = function() { };
$hxClasses["haxe.Resource"] = haxe_Resource;
haxe_Resource.__name__ = ["haxe","Resource"];
haxe_Resource.listNames = function() {
	var _g = [];
	var _g1 = 0;
	var _g2 = haxe_Resource.content;
	while(_g1 < _g2.length) {
		var x = _g2[_g1];
		++_g1;
		_g.push(x.name);
	}
	return _g;
};
haxe_Resource.getString = function(name) {
	var _g = 0;
	var _g1 = haxe_Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) return x.str;
			var b = haxe_crypto_Base64.decode(x.data);
			return b.toString();
		}
	}
	return null;
};
haxe_Resource.getBytes = function(name) {
	var _g = 0;
	var _g1 = haxe_Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) return haxe_io_Bytes.ofString(x.str);
			return haxe_crypto_Base64.decode(x.data);
		}
	}
	return null;
};
var haxe_Serializer = function() {
	this.buf = new StringBuf();
	this.cache = [];
	this.useCache = haxe_Serializer.USE_CACHE;
	this.useEnumIndex = haxe_Serializer.USE_ENUM_INDEX;
	this.shash = new haxe_ds_StringMap();
	this.scount = 0;
};
$hxClasses["haxe.Serializer"] = haxe_Serializer;
haxe_Serializer.__name__ = ["haxe","Serializer"];
haxe_Serializer.prototype = {
	buf: null
	,cache: null
	,shash: null
	,scount: null
	,useCache: null
	,useEnumIndex: null
	,toString: function() {
		return this.buf.b;
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.b += "R";
			if(x == null) this.buf.b += "null"; else this.buf.b += "" + x;
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.b += "y";
		s = encodeURIComponent(s);
		if(s.length == null) this.buf.b += "null"; else this.buf.b += "" + s.length;
		this.buf.b += ":";
		if(s == null) this.buf.b += "null"; else this.buf.b += "" + s;
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0;
		var _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += "r";
				if(i == null) this.buf.b += "null"; else this.buf.b += "" + i;
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeFields: function(v) {
		var _g = 0;
		var _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += "g";
	}
	,serialize: function(v) {
		{
			var _g = Type["typeof"](v);
			switch(_g[1]) {
			case 0:
				this.buf.b += "n";
				break;
			case 1:
				var v1 = v;
				if(v1 == 0) {
					this.buf.b += "z";
					return;
				}
				this.buf.b += "i";
				if(v1 == null) this.buf.b += "null"; else this.buf.b += "" + v1;
				break;
			case 2:
				var v2 = v;
				if(isNaN(v2)) this.buf.b += "k"; else if(!isFinite(v2)) if(v2 < 0) this.buf.b += "m"; else this.buf.b += "p"; else {
					this.buf.b += "d";
					if(v2 == null) this.buf.b += "null"; else this.buf.b += "" + v2;
				}
				break;
			case 3:
				if(v) this.buf.b += "t"; else this.buf.b += "f";
				break;
			case 6:
				var c = _g[2];
				if(c == String) {
					this.serializeString(v);
					return;
				}
				if(this.useCache && this.serializeRef(v)) return;
				switch(c) {
				case Array:
					var ucount = 0;
					this.buf.b += "a";
					var l = v.length;
					var _g1 = 0;
					while(_g1 < l) {
						var i = _g1++;
						if(v[i] == null) ucount++; else {
							if(ucount > 0) {
								if(ucount == 1) this.buf.b += "n"; else {
									this.buf.b += "u";
									if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
								}
								ucount = 0;
							}
							this.serialize(v[i]);
						}
					}
					if(ucount > 0) {
						if(ucount == 1) this.buf.b += "n"; else {
							this.buf.b += "u";
							if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
						}
					}
					this.buf.b += "h";
					break;
				case List:
					this.buf.b += "l";
					var v3 = v;
					var _g1_head = v3.h;
					var _g1_val = null;
					while(_g1_head != null) {
						var i1;
						_g1_val = _g1_head[0];
						_g1_head = _g1_head[1];
						i1 = _g1_val;
						this.serialize(i1);
					}
					this.buf.b += "h";
					break;
				case Date:
					var d = v;
					this.buf.b += "v";
					this.buf.add(d.getTime());
					break;
				case haxe_ds_StringMap:
					this.buf.b += "b";
					var v4 = v;
					var $it0 = v4.keys();
					while( $it0.hasNext() ) {
						var k = $it0.next();
						this.serializeString(k);
						this.serialize(__map_reserved[k] != null?v4.getReserved(k):v4.h[k]);
					}
					this.buf.b += "h";
					break;
				case haxe_ds_IntMap:
					this.buf.b += "q";
					var v5 = v;
					var $it1 = v5.keys();
					while( $it1.hasNext() ) {
						var k1 = $it1.next();
						this.buf.b += ":";
						if(k1 == null) this.buf.b += "null"; else this.buf.b += "" + k1;
						this.serialize(v5.h[k1]);
					}
					this.buf.b += "h";
					break;
				case haxe_ds_ObjectMap:
					this.buf.b += "M";
					var v6 = v;
					var $it2 = v6.keys();
					while( $it2.hasNext() ) {
						var k2 = $it2.next();
						var id = Reflect.field(k2,"__id__");
						Reflect.deleteField(k2,"__id__");
						this.serialize(k2);
						k2.__id__ = id;
						this.serialize(v6.h[k2.__id__]);
					}
					this.buf.b += "h";
					break;
				case haxe_io_Bytes:
					var v7 = v;
					var i2 = 0;
					var max = v7.length - 2;
					var charsBuf = new StringBuf();
					var b64 = haxe_Serializer.BASE64;
					while(i2 < max) {
						var b1 = v7.get(i2++);
						var b2 = v7.get(i2++);
						var b3 = v7.get(i2++);
						charsBuf.add(b64.charAt(b1 >> 2));
						charsBuf.add(b64.charAt((b1 << 4 | b2 >> 4) & 63));
						charsBuf.add(b64.charAt((b2 << 2 | b3 >> 6) & 63));
						charsBuf.add(b64.charAt(b3 & 63));
					}
					if(i2 == max) {
						var b11 = v7.get(i2++);
						var b21 = v7.get(i2++);
						charsBuf.add(b64.charAt(b11 >> 2));
						charsBuf.add(b64.charAt((b11 << 4 | b21 >> 4) & 63));
						charsBuf.add(b64.charAt(b21 << 2 & 63));
					} else if(i2 == max + 1) {
						var b12 = v7.get(i2++);
						charsBuf.add(b64.charAt(b12 >> 2));
						charsBuf.add(b64.charAt(b12 << 4 & 63));
					}
					var chars = charsBuf.b;
					this.buf.b += "s";
					if(chars.length == null) this.buf.b += "null"; else this.buf.b += "" + chars.length;
					this.buf.b += ":";
					if(chars == null) this.buf.b += "null"; else this.buf.b += "" + chars;
					break;
				default:
					if(this.useCache) this.cache.pop();
					if(v.hxSerialize != null) {
						this.buf.b += "C";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						v.hxSerialize(this);
						this.buf.b += "g";
					} else {
						this.buf.b += "c";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						this.serializeFields(v);
					}
				}
				break;
			case 4:
				if(js_Boot.__instanceof(v,Class)) {
					var className = Type.getClassName(v);
					this.buf.b += "A";
					this.serializeString(className);
				} else if(js_Boot.__instanceof(v,Enum)) {
					this.buf.b += "B";
					this.serializeString(Type.getEnumName(v));
				} else {
					if(this.useCache && this.serializeRef(v)) return;
					this.buf.b += "o";
					this.serializeFields(v);
				}
				break;
			case 7:
				var e = _g[2];
				if(this.useCache) {
					if(this.serializeRef(v)) return;
					this.cache.pop();
				}
				if(this.useEnumIndex) this.buf.b += "j"; else this.buf.b += "w";
				this.serializeString(Type.getEnumName(e));
				if(this.useEnumIndex) {
					this.buf.b += ":";
					this.buf.b += Std.string(v[1]);
				} else this.serializeString(v[0]);
				this.buf.b += ":";
				var l1 = v.length;
				this.buf.b += Std.string(l1 - 2);
				var _g11 = 2;
				while(_g11 < l1) {
					var i3 = _g11++;
					this.serialize(v[i3]);
				}
				if(this.useCache) this.cache.push(v);
				break;
			case 5:
				throw new js__$Boot_HaxeError("Cannot serialize function");
				break;
			default:
				throw new js__$Boot_HaxeError("Cannot serialize " + Std.string(v));
			}
		}
	}
	,__class__: haxe_Serializer
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe_Timer;
haxe_Timer.__name__ = ["haxe","Timer"];
haxe_Timer.prototype = {
	id: null
	,stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = [];
	this.cache = [];
	var r = haxe_Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe_Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe_Unserializer;
haxe_Unserializer.__name__ = ["haxe","Unserializer"];
haxe_Unserializer.initCodes = function() {
	var codes = [];
	var _g1 = 0;
	var _g = haxe_Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe_Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe_Unserializer.prototype = {
	buf: null
	,pos: null
	,length: null
	,cache: null
	,scache: null
	,resolver: null
	,setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_1) {
			return null;
		}}; else this.resolver = r;
	}
	,get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,readFloat: function() {
		var p1 = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
		}
		return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw new js__$Boot_HaxeError("Invalid object");
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!(typeof(k) == "string")) throw new js__$Boot_HaxeError("Invalid object key");
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.get(this.pos++) != 58) throw new js__$Boot_HaxeError("Invalid enum format");
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = [];
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		var _g = this.get(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			return this.readFloat();
		case 121:
			var len = this.readDigits();
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw new js__$Boot_HaxeError("Invalid string length");
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 107:
			return NaN;
		case 109:
			return -Infinity;
		case 112:
			return Infinity;
		case 97:
			var buf = this.buf;
			var a = [];
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n1 = this.readDigits();
			if(n1 < 0 || n1 >= this.cache.length) throw new js__$Boot_HaxeError("Invalid reference");
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw new js__$Boot_HaxeError("Invalid string reference");
			return this.scache[n2];
		case 120:
			throw new js__$Boot_HaxeError(this.unserialize());
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw new js__$Boot_HaxeError("Class not found " + name);
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw new js__$Boot_HaxeError("Enum not found " + name1);
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw new js__$Boot_HaxeError("Enum not found " + name2);
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw new js__$Boot_HaxeError("Unknown enum index " + name2 + "@" + index);
			var e1 = this.unserializeEnum(edecl1,tag);
			this.cache.push(e1);
			return e1;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf1 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe_ds_StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s1 = this.unserialize();
				h.set(s1,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe_ds_IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var c1 = this.get(this.pos++);
			while(c1 == 58) {
				var i = this.readDigits();
				h1.set(i,this.unserialize());
				c1 = this.get(this.pos++);
			}
			if(c1 != 104) throw new js__$Boot_HaxeError("Invalid IntMap format");
			return h1;
		case 77:
			var h2 = new haxe_ds_ObjectMap();
			this.cache.push(h2);
			var buf4 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s2 = this.unserialize();
				h2.set(s2,this.unserialize());
			}
			this.pos++;
			return h2;
		case 118:
			var d;
			if(this.buf.charCodeAt(this.pos) >= 48 && this.buf.charCodeAt(this.pos) <= 57 && this.buf.charCodeAt(this.pos + 1) >= 48 && this.buf.charCodeAt(this.pos + 1) <= 57 && this.buf.charCodeAt(this.pos + 2) >= 48 && this.buf.charCodeAt(this.pos + 2) <= 57 && this.buf.charCodeAt(this.pos + 3) >= 48 && this.buf.charCodeAt(this.pos + 3) <= 57 && this.buf.charCodeAt(this.pos + 4) == 45) {
				var s3 = HxOverrides.substr(this.buf,this.pos,19);
				d = HxOverrides.strDate(s3);
				this.pos += 19;
			} else {
				var t = this.readFloat();
				var d1 = new Date();
				d1.setTime(t);
				d = d1;
			}
			this.cache.push(d);
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			if(this.get(this.pos++) != 58 || this.length - this.pos < len1) throw new js__$Boot_HaxeError("Invalid bytes length");
			var codes = haxe_Unserializer.CODES;
			if(codes == null) {
				codes = haxe_Unserializer.initCodes();
				haxe_Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size;
			size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = haxe_io_Bytes.alloc(size);
			var bpos = 0;
			while(i1 < max) {
				var c11 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c2 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c11 << 2 | c2 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c2 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c12 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c21 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c12 << 2 | c21 >> 4);
				if(rest == 3) {
					var c31 = codes[StringTools.fastCodeAt(buf5,i1++)];
					bytes.set(bpos++,c21 << 4 | c31 >> 2);
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw new js__$Boot_HaxeError("Class not found " + name3);
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			if(this.get(this.pos++) != 103) throw new js__$Boot_HaxeError("Invalid custom data");
			return o2;
		case 65:
			var name4 = this.unserialize();
			var cl2 = this.resolver.resolveClass(name4);
			if(cl2 == null) throw new js__$Boot_HaxeError("Class not found " + name4);
			return cl2;
		case 66:
			var name5 = this.unserialize();
			var e2 = this.resolver.resolveEnum(name5);
			if(e2 == null) throw new js__$Boot_HaxeError("Enum not found " + name5);
			return e2;
		default:
		}
		this.pos--;
		throw new js__$Boot_HaxeError("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
	}
	,__class__: haxe_Unserializer
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = ["haxe","io","Bytes"];
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.ofString = function(s) {
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = StringTools.fastCodeAt(s,i++);
		if(55296 <= c && c <= 56319) c = c - 55232 << 10 | StringTools.fastCodeAt(s,i++) & 1023;
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.prototype = {
	length: null
	,b: null
	,get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe_io_Bytes
};
var haxe_crypto_Base64 = function() { };
$hxClasses["haxe.crypto.Base64"] = haxe_crypto_Base64;
haxe_crypto_Base64.__name__ = ["haxe","crypto","Base64"];
haxe_crypto_Base64.encode = function(bytes,complement) {
	if(complement == null) complement = true;
	var str = new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).encodeBytes(bytes).toString();
	if(complement) {
		var _g = bytes.length % 3;
		switch(_g) {
		case 1:
			str += "==";
			break;
		case 2:
			str += "=";
			break;
		default:
		}
	}
	return str;
};
haxe_crypto_Base64.decode = function(str,complement) {
	if(complement == null) complement = true;
	if(complement) while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
	return new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).decodeBytes(haxe_io_Bytes.ofString(str));
};
var haxe_crypto_BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) nbits++;
	if(nbits > 8 || len != 1 << nbits) throw new js__$Boot_HaxeError("BaseCode : base length must be a power of two.");
	this.base = base;
	this.nbits = nbits;
};
$hxClasses["haxe.crypto.BaseCode"] = haxe_crypto_BaseCode;
haxe_crypto_BaseCode.__name__ = ["haxe","crypto","BaseCode"];
haxe_crypto_BaseCode.prototype = {
	base: null
	,nbits: null
	,tbl: null
	,encodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		var size = b.length * 8 / nbits | 0;
		var out = haxe_io_Bytes.alloc(size + (b.length * 8 % nbits == 0?0:1));
		var buf = 0;
		var curbits = 0;
		var mask = (1 << nbits) - 1;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < nbits) {
				curbits += 8;
				buf <<= 8;
				buf |= b.get(pin++);
			}
			curbits -= nbits;
			out.set(pout++,base.b[buf >> curbits & mask]);
		}
		if(curbits > 0) out.set(pout++,base.b[buf << nbits - curbits & mask]);
		return out;
	}
	,initTable: function() {
		var tbl = [];
		var _g = 0;
		while(_g < 256) {
			var i = _g++;
			tbl[i] = -1;
		}
		var _g1 = 0;
		var _g2 = this.base.length;
		while(_g1 < _g2) {
			var i1 = _g1++;
			tbl[this.base.b[i1]] = i1;
		}
		this.tbl = tbl;
	}
	,decodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		if(this.tbl == null) this.initTable();
		var tbl = this.tbl;
		var size = b.length * nbits >> 3;
		var out = haxe_io_Bytes.alloc(size);
		var buf = 0;
		var curbits = 0;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				var i = tbl[b.get(pin++)];
				if(i == -1) throw new js__$Boot_HaxeError("BaseCode : invalid encoded char");
				buf |= i;
			}
			curbits -= 8;
			out.set(pout++,buf >> curbits & 255);
		}
		return out;
	}
	,__class__: haxe_crypto_BaseCode
};
var haxe_ds_GenericCell = function(elt,next) {
	this.elt = elt;
	this.next = next;
};
$hxClasses["haxe.ds.GenericCell"] = haxe_ds_GenericCell;
haxe_ds_GenericCell.__name__ = ["haxe","ds","GenericCell"];
haxe_ds_GenericCell.prototype = {
	elt: null
	,next: null
	,__class__: haxe_ds_GenericCell
};
var haxe_ds_GenericStack = function() {
};
$hxClasses["haxe.ds.GenericStack"] = haxe_ds_GenericStack;
haxe_ds_GenericStack.__name__ = ["haxe","ds","GenericStack"];
haxe_ds_GenericStack.prototype = {
	head: null
	,add: function(item) {
		this.head = new haxe_ds_GenericCell(item,this.head);
	}
	,pop: function() {
		var k = this.head;
		if(k == null) return null; else {
			this.head = k.next;
			return k.elt;
		}
	}
	,__class__: haxe_ds_GenericStack
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = ["haxe","ds","IntMap"];
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	h: null
	,set: function(key,value) {
		this.h[key] = value;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	h: null
	,set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
$hxClasses["haxe.ds._StringMap.StringMapIterator"] = haxe_ds__$StringMap_StringMapIterator;
haxe_ds__$StringMap_StringMapIterator.__name__ = ["haxe","ds","_StringMap","StringMapIterator"];
haxe_ds__$StringMap_StringMapIterator.prototype = {
	map: null
	,keys: null
	,index: null
	,count: null
	,hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	h: null
	,rh: null
	,set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_BytesBuffer = function() {
	this.b = [];
};
$hxClasses["haxe.io.BytesBuffer"] = haxe_io_BytesBuffer;
haxe_io_BytesBuffer.__name__ = ["haxe","io","BytesBuffer"];
haxe_io_BytesBuffer.prototype = {
	b: null
	,getBytes: function() {
		var bytes = new haxe_io_Bytes(new Uint8Array(this.b).buffer);
		this.b = null;
		return bytes;
	}
	,__class__: haxe_io_BytesBuffer
};
var haxe_io_Input = function() { };
$hxClasses["haxe.io.Input"] = haxe_io_Input;
haxe_io_Input.__name__ = ["haxe","io","Input"];
haxe_io_Input.prototype = {
	readByte: function() {
		throw new js__$Boot_HaxeError("Not implemented");
	}
	,readBytes: function(s,pos,len) {
		var k = len;
		var b = s.b;
		if(pos < 0 || len < 0 || pos + len > s.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		while(k > 0) {
			b[pos] = this.readByte();
			pos++;
			k--;
		}
		return len;
	}
	,readFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.readBytes(s,pos,len);
			pos += k;
			len -= k;
		}
	}
	,readString: function(len) {
		var b = haxe_io_Bytes.alloc(len);
		this.readFullBytes(b,0,len);
		return b.toString();
	}
	,__class__: haxe_io_Input
};
var haxe_io_BytesInput = function(b,pos,len) {
	if(pos == null) pos = 0;
	if(len == null) len = b.length - pos;
	if(pos < 0 || len < 0 || pos + len > b.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
	this.b = b.b;
	this.pos = pos;
	this.len = len;
	this.totlen = len;
};
$hxClasses["haxe.io.BytesInput"] = haxe_io_BytesInput;
haxe_io_BytesInput.__name__ = ["haxe","io","BytesInput"];
haxe_io_BytesInput.__super__ = haxe_io_Input;
haxe_io_BytesInput.prototype = $extend(haxe_io_Input.prototype,{
	b: null
	,pos: null
	,len: null
	,totlen: null
	,readByte: function() {
		if(this.len == 0) throw new js__$Boot_HaxeError(new haxe_io_Eof());
		this.len--;
		return this.b[this.pos++];
	}
	,readBytes: function(buf,pos,len) {
		if(pos < 0 || len < 0 || pos + len > buf.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		if(this.len == 0 && len > 0) throw new js__$Boot_HaxeError(new haxe_io_Eof());
		if(this.len < len) len = this.len;
		var b1 = this.b;
		var b2 = buf.b;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b2[pos + i] = b1[this.pos + i];
		}
		this.pos += len;
		this.len -= len;
		return len;
	}
	,__class__: haxe_io_BytesInput
});
var haxe_io_Output = function() { };
$hxClasses["haxe.io.Output"] = haxe_io_Output;
haxe_io_Output.__name__ = ["haxe","io","Output"];
var haxe_io_BytesOutput = function() {
	this.b = new haxe_io_BytesBuffer();
};
$hxClasses["haxe.io.BytesOutput"] = haxe_io_BytesOutput;
haxe_io_BytesOutput.__name__ = ["haxe","io","BytesOutput"];
haxe_io_BytesOutput.__super__ = haxe_io_Output;
haxe_io_BytesOutput.prototype = $extend(haxe_io_Output.prototype,{
	b: null
	,writeByte: function(c) {
		this.b.b.push(c);
	}
	,getBytes: function() {
		return this.b.getBytes();
	}
	,__class__: haxe_io_BytesOutput
});
var haxe_io_Eof = function() {
};
$hxClasses["haxe.io.Eof"] = haxe_io_Eof;
haxe_io_Eof.__name__ = ["haxe","io","Eof"];
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var haxe_io_Error = $hxClasses["haxe.io.Error"] = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = ["haxe","io","FPHelper"];
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var haxe_io_StringInput = function(s) {
	haxe_io_BytesInput.call(this,haxe_io_Bytes.ofString(s));
};
$hxClasses["haxe.io.StringInput"] = haxe_io_StringInput;
haxe_io_StringInput.__name__ = ["haxe","io","StringInput"];
haxe_io_StringInput.__super__ = haxe_io_BytesInput;
haxe_io_StringInput.prototype = $extend(haxe_io_BytesInput.prototype,{
	__class__: haxe_io_StringInput
});
var haxe_ui_backend_AppBase = function() {
};
$hxClasses["haxe.ui.backend.AppBase"] = haxe_ui_backend_AppBase;
haxe_ui_backend_AppBase.__name__ = ["haxe","ui","backend","AppBase"];
haxe_ui_backend_AppBase.prototype = {
	build: function() {
	}
	,init: function(onReady,onEnd) {
		onReady();
	}
	,getToolkitInit: function() {
		return { container : this.findContainer(haxe_ui_Toolkit.backendProperties.getProp("haxe.ui.html5.container"))};
	}
	,start: function() {
	}
	,findContainer: function(id) {
		var el = null;
		if(id == "body") el = window.document.body;
		if(el == null) el = window.document.body;
		el.style.overflow = "hidden";
		return el;
	}
	,__class__: haxe_ui_backend_AppBase
};
var haxe_ui_HaxeUIApp = function() {
	haxe_ui_backend_AppBase.call(this);
	haxe_ui_Toolkit.build();
	this.build();
};
$hxClasses["haxe.ui.HaxeUIApp"] = haxe_ui_HaxeUIApp;
haxe_ui_HaxeUIApp.__name__ = ["haxe","ui","HaxeUIApp"];
haxe_ui_HaxeUIApp.__super__ = haxe_ui_backend_AppBase;
haxe_ui_HaxeUIApp.prototype = $extend(haxe_ui_backend_AppBase.prototype,{
	ready: function(onReady,onEnd) {
		this.init(onReady,onEnd);
	}
	,init: function(onReady,onEnd) {
		if(haxe_ui_Toolkit.backendProperties.getProp("haxe.ui.theme") != null && haxe_ui_Toolkit.theme == "default") haxe_ui_Toolkit.theme = haxe_ui_Toolkit.backendProperties.getProp("haxe.ui.theme");
		haxe_ui_Toolkit.init(this.getToolkitInit());
		haxe_ui_backend_AppBase.prototype.init.call(this,onReady,onEnd);
	}
	,addComponent: function(component) {
		haxe_ui_core_Screen.get_instance().addComponent(component);
	}
	,__class__: haxe_ui_HaxeUIApp
});
var haxe_ui_util_Properties = function() {
	this._props = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.util.Properties"] = haxe_ui_util_Properties;
haxe_ui_util_Properties.__name__ = ["haxe","ui","util","Properties"];
haxe_ui_util_Properties.prototype = {
	_props: null
	,getProp: function(name,defaultValue) {
		var v = defaultValue;
		if(this._props.exists(name)) v = this._props.get(name);
		return v;
	}
	,getPropInt: function(name,defaultValue) {
		if(defaultValue == null) defaultValue = 0;
		var v = defaultValue;
		var stringValue = this.getProp(name);
		if(stringValue != null) v = Std.parseInt(stringValue);
		return v;
	}
	,getPropBool: function(name,defaultValue) {
		if(defaultValue == null) defaultValue = false;
		var v = defaultValue;
		var stringValue = this.getProp(name);
		if(stringValue != null) v = stringValue == "true";
		return v;
	}
	,getPropCol: function(name,defaultValue) {
		if(defaultValue == null) defaultValue = 0;
		var v = defaultValue;
		var stringValue = this.getProp(name);
		if(stringValue != null) v = haxe_ui_util_ColorUtil.parseColor(stringValue);
		return v;
	}
	,setProp: function(name,value) {
		this._props.set(name,value);
	}
	,names: function() {
		return this._props.keys();
	}
	,addAll: function(p) {
		var $it0 = p.names();
		while( $it0.hasNext() ) {
			var name = $it0.next();
			var value = p.getProp(name);
			this._props.set(name,value);
		}
	}
	,__class__: haxe_ui_util_Properties
};
var haxe_ui_util_GenericConfig = function() {
	this.sections = new haxe_ds_StringMap();
	this.values = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.util.GenericConfig"] = haxe_ui_util_GenericConfig;
haxe_ui_util_GenericConfig.__name__ = ["haxe","ui","util","GenericConfig"];
haxe_ui_util_GenericConfig.prototype = {
	values: null
	,sections: null
	,addSection: function(name) {
		var config = new haxe_ui_util_GenericConfig();
		var array = this.sections.get(name);
		if(array == null) {
			array = [];
			this.sections.set(name,array);
		}
		array.push(config);
		return config;
	}
	,findBy: function(section,field,value) {
		var array = this.sections.get(section);
		if(array == null) return null;
		if(field == null && value == null) return array[0];
		var r = null;
		var _g = 0;
		while(_g < array.length) {
			var item = array[_g];
			++_g;
			var $it0 = item.values.keys();
			while( $it0.hasNext() ) {
				var key = $it0.next();
				if(key == field && item.values.get(key) == value) {
					r = item;
					break;
				}
			}
			if(r != null) break;
		}
		return r;
	}
	,queryBool: function(q,defaultValue) {
		if(defaultValue == null) defaultValue = false;
		var r = this.query(q,null);
		if(r == null) return defaultValue;
		return r == "true";
	}
	,query: function(q,defaultValue) {
		var regexp = new EReg("\\.(?![^\\[]*\\])","g");
		var $final = regexp.split(q);
		var ref = this;
		var value = null;
		var _g = 0;
		while(_g < $final.length) {
			var f = $final[_g];
			++_g;
			if(f.indexOf("[") == -1 && f.indexOf("@") == -1) ref = ref.findBy(f); else if(f.indexOf("[") != -1) {
				var p = f.split("[");
				var p1 = p[0];
				var p2 = p[1].split("=")[0];
				var p3 = p[1].split("=")[1];
				p3 = HxOverrides.substr(p3,0,p3.length - 1);
				ref = ref.findBy(p1,p2,p3);
			} else if(f.indexOf("@") != -1) {
				var v = HxOverrides.substr(f,1,f.length);
				value = ref.values.get(v);
				break;
			}
			if(ref == null) return defaultValue;
		}
		if(value == null) value = defaultValue;
		return value;
	}
	,queryValues: function(q) {
		var regexp = new EReg("\\.(?![^\\[]*\\])","g");
		var $final = regexp.split(q);
		var ref = this;
		var _g = 0;
		while(_g < $final.length) {
			var f = $final[_g];
			++_g;
			if(f.indexOf("[") == -1 && f.indexOf("@") == -1) ref = ref.findBy(f); else if(f.indexOf("[") != -1) {
				var p = f.split("[");
				var p1 = p[0];
				var p2 = p[1].split("=")[0];
				var p3 = p[1].split("=")[1];
				p3 = HxOverrides.substr(p3,0,p3.length - 1);
				ref = ref.findBy(p1,p2,p3);
			}
			if(ref == null) return null;
		}
		return ref.values;
	}
	,__class__: haxe_ui_util_GenericConfig
};
var haxe_ui_styles_Engine = function() {
	this.rules = [];
};
$hxClasses["haxe.ui.styles.Engine"] = haxe_ui_styles_Engine;
haxe_ui_styles_Engine.__name__ = ["haxe","ui","styles","Engine"];
haxe_ui_styles_Engine.ruleMatch = function(c,d) {
	if(c.pseudoClass != null) {
		var pc = ":" + c.pseudoClass;
		var found = false;
		var _g = 0;
		var _g1 = d.classes;
		while(_g < _g1.length) {
			var cc = _g1[_g];
			++_g;
			if(cc == pc) {
				found = true;
				break;
			}
		}
		if(!found) return false;
	}
	if(c.className != null) {
		if(d.classes == null) return false;
		var found1 = false;
		var _g2 = 0;
		var _g11 = d.classes;
		while(_g2 < _g11.length) {
			var cc1 = _g11[_g2];
			++_g2;
			if(cc1 == c.className) {
				found1 = true;
				break;
			}
		}
		if(!found1) return false;
	}
	if(c.id != null && c.id != d.get_id()) return false;
	if(c.parent != null) {
		var p = d.parentComponent;
		while(p != null) {
			if(haxe_ui_styles_Engine.ruleMatch(c.parent,p)) break;
			p = p.parentComponent;
		}
		if(p == null) return false;
	}
	return true;
};
haxe_ui_styles_Engine.prototype = {
	rules: null
	,applyClasses: function(c,set) {
		if(set == null) set = true;
		var s = new haxe_ui_styles_Style();
		if(set == true) c.set_style(s);
		var rules = [];
		var _g = 0;
		var _g1 = this.rules;
		while(_g < _g1.length) {
			var r = _g1[_g];
			++_g;
			if(!haxe_ui_styles_Engine.ruleMatch(r.c,c)) continue;
			rules.push(r);
		}
		rules.sort($bind(this,this.sortByPriority));
		var _g2 = 0;
		while(_g2 < rules.length) {
			var r1 = rules[_g2];
			++_g2;
			s.apply(r1.s);
		}
		if(c.customStyle != null) s.apply(c.customStyle);
		return s;
	}
	,sortByPriority: function(r1,r2) {
		var dp = r1.priority - r2.priority;
		if(dp == 0) return r1.id - r2.id; else return dp;
	}
	,addRules: function(text) {
		var _g = 0;
		var _g1 = new haxe_ui_styles_Parser().parseRules(text);
		while(_g < _g1.length) {
			var r = _g1[_g];
			++_g;
			var c = r.c;
			var imp;
			if(r.imp) imp = 1; else imp = 0;
			var nids = 0;
			var nothers = 0;
			var nnodes = 0;
			while(c != null) {
				if(c.id != null) nids++;
				if(c.node != null) nnodes++;
				if(c.pseudoClass != null) nothers++;
				if(c.className != null) nothers++;
				c = c.parent;
			}
			var rule = new haxe_ui_styles_Rule();
			rule.id = this.rules.length;
			rule.c = r.c;
			rule.s = r.s;
			rule.priority = imp << 24 | nids << 16 | nothers << 8 | nnodes;
			this.rules.push(rule);
		}
	}
	,__class__: haxe_ui_styles_Engine
};
var haxe_ui_Toolkit = function() { };
$hxClasses["haxe.ui.Toolkit"] = haxe_ui_Toolkit;
haxe_ui_Toolkit.__name__ = ["haxe","ui","Toolkit"];
haxe_ui_Toolkit.__properties__ = {get_screen:"get_screen",get_assets:"get_assets"}
haxe_ui_Toolkit.build = function() {
	if(haxe_ui_Toolkit._built == true) return;
	haxe_ui_Toolkit.backendProperties.setProp("haxe.ui.html5.container","body");
	haxe_ui_Toolkit.backendProperties.setProp("haxe.ui.theme","default");
	(function() {
		haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","styles/default/main.css");
		haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","styles/default/app.css");
		haxe_ui_themes_ThemeManager.get_instance().addStyleResource("global","styles/main.css");
		haxe_ui_themes_ThemeManager.get_instance().addStyleResource("native","styles/native/main.css");
		haxe_ui_scripting_ScriptInterp.addClassAlias("BindingInfo","haxe.ui.core.Component.BindingInfo");
		haxe_ui_scripting_ScriptInterp.addClassAlias("DeferredBindingInfo","haxe.ui.core.Component.DeferredBindingInfo");
		haxe_ui_scripting_ScriptInterp.addClassAlias("Component","haxe.ui.core.Component");
		haxe_ui_scripting_ScriptInterp.addClassAlias("Button","haxe.ui.components.Button");
		haxe_ui_scripting_ScriptInterp.addClassAlias("ButtonDefaultTextBehaviour","haxe.ui.components.Button.ButtonDefaultTextBehaviour");
		haxe_ui_scripting_ScriptInterp.addClassAlias("ButtonDefaultIconBehaviour","haxe.ui.components.Button.ButtonDefaultIconBehaviour");
		haxe_ui_scripting_ScriptInterp.addClassAlias("ButtonLayout","haxe.ui.components.Button.ButtonLayout");
		haxe_ui_scripting_ScriptInterp.addClassAlias("CheckBox","haxe.ui.components.CheckBox");
		haxe_ui_scripting_ScriptInterp.addClassAlias("CheckBoxDefaultTextBehaviour","haxe.ui.components.CheckBox.CheckBoxDefaultTextBehaviour");
		haxe_ui_scripting_ScriptInterp.addClassAlias("CheckBoxDefaultSelectedBehaviour","haxe.ui.components.CheckBox.CheckBoxDefaultSelectedBehaviour");
		haxe_ui_scripting_ScriptInterp.addClassAlias("CheckBoxValue","haxe.ui.components.CheckBox.CheckBoxValue");
		haxe_ui_scripting_ScriptInterp.addClassAlias("HProgress","haxe.ui.components.HProgress");
		haxe_ui_scripting_ScriptInterp.addClassAlias("HProgressLayout","haxe.ui.components.HProgress.HProgressLayout");
		haxe_ui_scripting_ScriptInterp.addClassAlias("HScroll","haxe.ui.components.HScroll");
		haxe_ui_scripting_ScriptInterp.addClassAlias("HScrollLayout","haxe.ui.components.HScroll.HScrollLayout");
		haxe_ui_scripting_ScriptInterp.addClassAlias("HSlider","haxe.ui.components.HSlider");
		haxe_ui_scripting_ScriptInterp.addClassAlias("HSliderLayout","haxe.ui.components.HSlider.HSliderLayout");
		haxe_ui_scripting_ScriptInterp.addClassAlias("Image","haxe.ui.components.Image");
		haxe_ui_scripting_ScriptInterp.addClassAlias("ImageLayout","haxe.ui.components.Image.ImageLayout");
		haxe_ui_scripting_ScriptInterp.addClassAlias("ImageDefaultResourceBehaviour","haxe.ui.components.Image.ImageDefaultResourceBehaviour");
		haxe_ui_scripting_ScriptInterp.addClassAlias("Label","haxe.ui.components.Label");
		haxe_ui_scripting_ScriptInterp.addClassAlias("LabelLayout","haxe.ui.components.Label.LabelLayout");
		haxe_ui_scripting_ScriptInterp.addClassAlias("LabelDefaultTextBehaviour","haxe.ui.components.Label.LabelDefaultTextBehaviour");
		haxe_ui_scripting_ScriptInterp.addClassAlias("OptionBox","haxe.ui.components.OptionBox");
		haxe_ui_scripting_ScriptInterp.addClassAlias("OptionBoxDefaultTextBehaviour","haxe.ui.components.OptionBox.OptionBoxDefaultTextBehaviour");
		haxe_ui_scripting_ScriptInterp.addClassAlias("OptionBoxDefaultSelectedBehaviour","haxe.ui.components.OptionBox.OptionBoxDefaultSelectedBehaviour");
		haxe_ui_scripting_ScriptInterp.addClassAlias("OptionBoxValue","haxe.ui.components.OptionBox.OptionBoxValue");
		haxe_ui_scripting_ScriptInterp.addClassAlias("Progress","haxe.ui.components.Progress");
		haxe_ui_scripting_ScriptInterp.addClassAlias("ProgressDefaultMinBehaviour","haxe.ui.components.Progress.ProgressDefaultMinBehaviour");
		haxe_ui_scripting_ScriptInterp.addClassAlias("ProgressDefaultMaxBehaviour","haxe.ui.components.Progress.ProgressDefaultMaxBehaviour");
		haxe_ui_scripting_ScriptInterp.addClassAlias("ProgressDefaultPosBehaviour","haxe.ui.components.Progress.ProgressDefaultPosBehaviour");
		haxe_ui_scripting_ScriptInterp.addClassAlias("ProgressDefaultRangeStartBehaviour","haxe.ui.components.Progress.ProgressDefaultRangeStartBehaviour");
		haxe_ui_scripting_ScriptInterp.addClassAlias("ProgressDefaultRangeEndBehaviour","haxe.ui.components.Progress.ProgressDefaultRangeEndBehaviour");
		haxe_ui_scripting_ScriptInterp.addClassAlias("ProgressDefaultIndeterminateBehaviour","haxe.ui.components.Progress.ProgressDefaultIndeterminateBehaviour");
		haxe_ui_scripting_ScriptInterp.addClassAlias("Scroll","haxe.ui.components.Scroll");
		haxe_ui_scripting_ScriptInterp.addClassAlias("ScrollDefaultMinBehaviour","haxe.ui.components.Scroll.ScrollDefaultMinBehaviour");
		haxe_ui_scripting_ScriptInterp.addClassAlias("ScrollDefaultMaxBehaviour","haxe.ui.components.Scroll.ScrollDefaultMaxBehaviour");
		haxe_ui_scripting_ScriptInterp.addClassAlias("ScrollDefaultPosBehaviour","haxe.ui.components.Scroll.ScrollDefaultPosBehaviour");
		haxe_ui_scripting_ScriptInterp.addClassAlias("ScrollDefaultPageSizeBehaviour","haxe.ui.components.Scroll.ScrollDefaultPageSizeBehaviour");
		haxe_ui_scripting_ScriptInterp.addClassAlias("Slider","haxe.ui.components.Slider");
		haxe_ui_scripting_ScriptInterp.addClassAlias("SliderDefaultMinBehaviour","haxe.ui.components.Slider.SliderDefaultMinBehaviour");
		haxe_ui_scripting_ScriptInterp.addClassAlias("SliderDefaultMaxBehaviour","haxe.ui.components.Slider.SliderDefaultMaxBehaviour");
		haxe_ui_scripting_ScriptInterp.addClassAlias("SliderDefaultPosBehaviour","haxe.ui.components.Slider.SliderDefaultPosBehaviour");
		haxe_ui_scripting_ScriptInterp.addClassAlias("SliderDefaultRangeStartBehaviour","haxe.ui.components.Slider.SliderDefaultRangeStartBehaviour");
		haxe_ui_scripting_ScriptInterp.addClassAlias("SliderDefaultRangeEndBehaviour","haxe.ui.components.Slider.SliderDefaultRangeEndBehaviour");
		haxe_ui_scripting_ScriptInterp.addClassAlias("TabBar","haxe.ui.components.TabBar");
		haxe_ui_scripting_ScriptInterp.addClassAlias("TabBarLayout","haxe.ui.components.TabBar.TabBarLayout");
		haxe_ui_scripting_ScriptInterp.addClassAlias("TextField","haxe.ui.components.TextField");
		haxe_ui_scripting_ScriptInterp.addClassAlias("TextFieldDefaultTextBehaviour","haxe.ui.components.TextField.TextFieldDefaultTextBehaviour");
		haxe_ui_scripting_ScriptInterp.addClassAlias("TextFieldDefaultIconBehaviour","haxe.ui.components.TextField.TextFieldDefaultIconBehaviour");
		haxe_ui_scripting_ScriptInterp.addClassAlias("TextFieldLayout","haxe.ui.components.TextField.TextFieldLayout");
		haxe_ui_scripting_ScriptInterp.addClassAlias("VProgress","haxe.ui.components.VProgress");
		haxe_ui_scripting_ScriptInterp.addClassAlias("VProgressLayout","haxe.ui.components.VProgress.VProgressLayout");
		haxe_ui_scripting_ScriptInterp.addClassAlias("VScroll","haxe.ui.components.VScroll");
		haxe_ui_scripting_ScriptInterp.addClassAlias("VScrollLayout","haxe.ui.components.VScroll.VScrollLayout");
		haxe_ui_scripting_ScriptInterp.addClassAlias("VSlider","haxe.ui.components.VSlider");
		haxe_ui_scripting_ScriptInterp.addClassAlias("VSliderLayout","haxe.ui.components.VSlider.VSliderLayout");
		haxe_ui_scripting_ScriptInterp.addClassAlias("Absolute","haxe.ui.containers.Absolute");
		haxe_ui_scripting_ScriptInterp.addClassAlias("Box","haxe.ui.containers.Box");
		haxe_ui_scripting_ScriptInterp.addClassAlias("HBox","haxe.ui.containers.HBox");
		haxe_ui_scripting_ScriptInterp.addClassAlias("ScrollView","haxe.ui.containers.ScrollView");
		haxe_ui_scripting_ScriptInterp.addClassAlias("ScrollViewLayout","haxe.ui.containers.ScrollView.ScrollViewLayout");
		haxe_ui_scripting_ScriptInterp.addClassAlias("Stack","haxe.ui.containers.Stack");
		haxe_ui_scripting_ScriptInterp.addClassAlias("TabView","haxe.ui.containers.TabView");
		haxe_ui_scripting_ScriptInterp.addClassAlias("TabViewLayout","haxe.ui.containers.TabView.TabViewLayout");
		haxe_ui_scripting_ScriptInterp.addClassAlias("VBox","haxe.ui.containers.VBox");
		haxe_ui_scripting_ScriptInterp.addClassAlias("Dialog","haxe.ui.containers.dialogs.Dialog");
		haxe_ui_scripting_ScriptInterp.addClassAlias("DialogButton","haxe.ui.containers.dialogs.DialogButton");
		haxe_ui_scripting_ScriptInterp.addClassAlias("DialogOptions","haxe.ui.containers.dialogs.DialogOptions");
		haxe_ui_scripting_ScriptInterp.addClassAlias("MessageDialog","haxe.ui.containers.dialogs.MessageDialog");
		haxe_ui_scripting_ScriptInterp.addClassAlias("Animation","haxe.ui.animation.Animation");
		haxe_ui_scripting_ScriptInterp.addClassAlias("AnimationComponentRef","haxe.ui.animation.AnimationComponentRef");
		haxe_ui_scripting_ScriptInterp.addClassAlias("AnimationKeyFrame","haxe.ui.animation.AnimationKeyFrame");
		haxe_ui_scripting_ScriptInterp.addClassAlias("AnimationManager","haxe.ui.animation.AnimationManager");
		haxe_ui_scripting_ScriptInterp.addClassAlias("Std","Std");
		haxe_ui_scripting_ScriptInterp.addStaticClass("Std",Std);
		haxe_ui_scripting_ScriptInterp.addClassAlias("Math","Math");
		haxe_ui_scripting_ScriptInterp.addStaticClass("Math",Math);
		haxe_ui_scripting_ScriptInterp.addClassAlias("StringTools","StringTools");
		haxe_ui_scripting_ScriptInterp.addStaticClass("StringTools",StringTools);
		haxe_ui_scripting_ScriptInterp.addClassAlias("DialogEntry","haxe.ui.core.Screen.DialogEntry");
		haxe_ui_scripting_ScriptInterp.addStaticClass("DialogEntry",haxe_ui_core_DialogEntry);
		haxe_ui_scripting_ScriptInterp.addClassAlias("Screen","haxe.ui.core.Screen");
		haxe_ui_scripting_ScriptInterp.addStaticClass("Screen",haxe_ui_core_Screen);
		haxe_ui_scripting_ScriptInterp.addClassAlias("Dialog","haxe.ui.containers.dialogs.Dialog");
		haxe_ui_scripting_ScriptInterp.addStaticClass("Dialog",haxe_ui_containers_dialogs_Dialog);
		haxe_ui_scripting_ScriptInterp.addClassAlias("DialogOptions","haxe.ui.containers.dialogs.DialogOptions");
		haxe_ui_scripting_ScriptInterp.addStaticClass("DialogOptions",haxe_ui_containers_dialogs_DialogOptions);
		haxe_ui_scripting_ScriptInterp.addClassAlias("DialogButton","haxe.ui.containers.dialogs.DialogButton");
		haxe_ui_scripting_ScriptInterp.addStaticClass("DialogButton",haxe_ui_containers_dialogs_DialogButton);
		haxe_ui_scripting_ScriptInterp.addClassAlias("AnimationManager","haxe.ui.animation.AnimationManager");
		haxe_ui_scripting_ScriptInterp.addStaticClass("AnimationManager",haxe_ui_animation_AnimationManager);
		haxe_ui_themes_ThemeManager.get_instance().getTheme("test").parent = "default";
		haxe_ui_themes_ThemeManager.get_instance().addStyleResource("test","haxeui-core/styles/test/main.css");
		haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/main.css");
		haxe_ui_themes_ThemeManager.get_instance().addStyleResource("global","haxeui-core/styles/global.css");
		haxe_ui_themes_ThemeManager.get_instance().getTheme("native").parent = "default";
		haxe_ui_themes_ThemeManager.get_instance().addStyleResource("native","haxeui-core/styles/native/main.css");
		haxe_ui_Toolkit.properties.set("haxe.ui.components.hprogress.animation.indeterminate","haxe.ui.components.animation.indeterminate");
		haxe_ui_Toolkit.properties.set("haxe.ui.components.vprogress.animation.indeterminate","haxe.ui.components.animation.indeterminate");
		haxe_ui_Toolkit.properties.set("haxe.ui.components.hslider.animation.pos","haxe.ui.components.animation.pos");
		haxe_ui_Toolkit.properties.set("haxe.ui.components.hslider.animation.rangeStart","haxe.ui.components.animation.rangeStart");
		haxe_ui_Toolkit.properties.set("haxe.ui.components.hslider.animation.rangeEnd","haxe.ui.components.animation.rangeEnd");
		haxe_ui_Toolkit.properties.set("haxe.ui.components.vslider.animation.pos","haxe.ui.components.animation.pos");
		haxe_ui_Toolkit.properties.set("haxe.ui.components.vslider.animation.rangeStart","haxe.ui.components.animation.rangeStart");
		haxe_ui_Toolkit.properties.set("haxe.ui.components.vslider.animation.rangeEnd","haxe.ui.components.animation.rangeEnd");
		haxe_ui_Toolkit.properties.set("haxe.ui.components.hscroll.animation.pos","haxe.ui.components.animation.pos");
		haxe_ui_Toolkit.properties.set("haxe.ui.components.vscroll.animation.pos","haxe.ui.components.animation.pos");
		var a = new haxe_ui_animation_Animation();
		a.id = "haxe.ui.components.animation.pos";
		a.easing = haxe_ui_animation_Animation.easingFromString("Bounce.easeOut");
		var kf = a.addKeyFrame(300);
		var ref = kf.addComponentRef("target");
		ref.addVar("pos","pos");
		haxe_ui_animation_AnimationManager.get_instance().registerAnimation(a.id,a);
		var a1 = new haxe_ui_animation_Animation();
		a1.id = "haxe.ui.components.animation.rangeStart";
		a1.easing = haxe_ui_animation_Animation.easingFromString("Bounce.easeOut");
		var kf1 = a1.addKeyFrame(300);
		var ref1 = kf1.addComponentRef("target");
		ref1.addVar("rangeStart","rangeStart");
		haxe_ui_animation_AnimationManager.get_instance().registerAnimation(a1.id,a1);
		var a2 = new haxe_ui_animation_Animation();
		a2.id = "haxe.ui.components.animation.rangeEnd";
		a2.easing = haxe_ui_animation_Animation.easingFromString("Bounce.easeOut");
		var kf2 = a2.addKeyFrame(300);
		var ref2 = kf2.addComponentRef("target");
		ref2.addVar("rangeEnd","rangeEnd");
		haxe_ui_animation_AnimationManager.get_instance().registerAnimation(a2.id,a2);
		var a3 = new haxe_ui_animation_Animation();
		a3.id = "haxe.ui.components.animation.indeterminate";
		a3.easing = haxe_ui_animation_Animation.easingFromString("Back.easeIn");
		var kf3 = a3.addKeyFrame(0);
		var ref3 = kf3.addComponentRef("target");
		ref3.addProperty("rangeEnd",25);
		ref3.addProperty("rangeStart",0);
		var kf4 = a3.addKeyFrame(500);
		var ref4 = kf4.addComponentRef("target");
		ref4.addProperty("rangeEnd",100);
		ref4.addProperty("rangeStart",75);
		var kf5 = a3.addKeyFrame(1000);
		var ref5 = kf5.addComponentRef("target");
		ref5.addProperty("rangeEnd",25);
		ref5.addProperty("rangeStart",0);
		haxe_ui_animation_AnimationManager.get_instance().registerAnimation(a3.id,a3);
		var a4 = new haxe_ui_animation_Animation();
		a4.id = "haxe.ui.components.animation.dialog.show";
		a4.easing = haxe_ui_animation_Animation.easingFromString("Linear.easeNone");
		var kf6 = a4.addKeyFrame(0);
		var ref6 = kf6.addComponentRef("target");
		ref6.addProperty("opacity",0);
		ref6.addVar("top","startTop");
		ref6.addVar("left","startLeft");
		var kf7 = a4.addKeyFrame(300);
		var ref7 = kf7.addComponentRef("target");
		ref7.addProperty("opacity",1);
		ref7.addVar("top","endTop");
		ref7.addVar("left","endLeft");
		haxe_ui_animation_AnimationManager.get_instance().registerAnimation(a4.id,a4);
		var a5 = new haxe_ui_animation_Animation();
		a5.id = "haxe.ui.components.animation.dialog.hide";
		a5.easing = haxe_ui_animation_Animation.easingFromString("Linear.easeNone");
		var kf8 = a5.addKeyFrame(0);
		var ref8 = kf8.addComponentRef("target");
		ref8.addProperty("opacity",1);
		ref8.addVar("top","startTop");
		ref8.addVar("left","startLeft");
		var kf9 = a5.addKeyFrame(300);
		var ref9 = kf9.addComponentRef("target");
		ref9.addProperty("opacity",0);
		ref9.addVar("top","endTop");
		ref9.addVar("left","endLeft");
		haxe_ui_animation_AnimationManager.get_instance().registerAnimation(a5.id,a5);
	})();
	(function() {
		var s1 = haxe_ui_Toolkit.nativeConfig.addSection("component");
		s1.values.set("id","haxe.ui.components.Button");
		s1.values.set("class","haxe.ui.backend.html5.native.NativeElement");
		s1.values.set("nodeType","button");
		s1.values.set("style","padding:0px; padding-bottom: 1px");
		var s2 = s1.addSection("layout");
		s2.values.set("class","haxe.ui.backend.html5.native.layouts.ButtonLayout");
		var s21 = s1.addSection("behaviour");
		s21.values.set("id","text");
		s21.values.set("class","haxe.ui.backend.html5.native.behaviours.SpanText");
		s21.values.set("style","margin-top:-2px;margin-left:-2px;");
		var s22 = s1.addSection("behaviour");
		s22.values.set("id","icon");
		s22.values.set("class","haxe.ui.backend.html5.native.behaviours.ElementImage");
		var s11 = haxe_ui_Toolkit.nativeConfig.addSection("component");
		s11.values.set("id","haxe.ui.components.CheckBox");
		s11.values.set("class","haxe.ui.backend.html5.native.LabeledInputElement");
		s11.values.set("type","checkbox");
		var s23 = s11.addSection("behaviour");
		s23.values.set("id","text");
		s23.values.set("class","haxe.ui.backend.html5.native.behaviours.SpanText");
		s23.values.set("index","last");
		var s24 = s11.addSection("behaviour");
		s24.values.set("id","selected");
		s24.values.set("class","haxe.ui.backend.html5.native.behaviours.ElementAttribute");
		s24.values.set("name","checked");
		s24.values.set("removeIfNegative","true");
		s24.values.set("child","input");
		var s25 = s11.addSection("size");
		s25.values.set("class","haxe.ui.backend.html5.native.size.TextSize");
		s25.values.set("incrementWidthBy","20");
		s25.values.set("incrementHeightBy","0");
		var s12 = haxe_ui_Toolkit.nativeConfig.addSection("component");
		s12.values.set("id","haxe.ui.components.OptionBox");
		s12.values.set("class","haxe.ui.backend.html5.native.LabeledInputElement");
		s12.values.set("type","radio");
		var s26 = s12.addSection("behaviour");
		s26.values.set("id","text");
		s26.values.set("class","haxe.ui.backend.html5.native.behaviours.SpanText");
		s26.values.set("index","last");
		var s27 = s12.addSection("behaviour");
		s27.values.set("id","selected");
		s27.values.set("class","haxe.ui.backend.html5.native.behaviours.ElementAttribute");
		s27.values.set("name","checked");
		s27.values.set("removeIfNegative","true");
		s27.values.set("child","input");
		var s28 = s12.addSection("size");
		s28.values.set("class","haxe.ui.backend.html5.native.size.TextSize");
		s28.values.set("incrementWidthBy","20");
		s28.values.set("incrementHeightBy","0");
		var s13 = haxe_ui_Toolkit.nativeConfig.addSection("component");
		s13.values.set("id","haxe.ui.components.TextField");
		s13.values.set("class","haxe.ui.backend.html5.native.NativeElement");
		s13.values.set("nodeType","input");
		s13.values.set("style","padding-left:4px;");
		var s29 = s13.addSection("behaviour");
		s29.values.set("id","text");
		s29.values.set("class","haxe.ui.backend.html5.native.behaviours.ElementValue");
		var s210 = s13.addSection("size");
		s210.values.set("class","haxe.ui.backend.html5.native.size.ElementSize");
		var s14 = haxe_ui_Toolkit.nativeConfig.addSection("component");
		s14.values.set("id","haxe.ui.components.HSlider");
		s14.values.set("class","haxe.ui.backend.html5.native.NativeElement");
		s14.values.set("nodeType","input");
		s14.values.set("type","range");
		s14.values.set("style","margin: 0;padding:0;");
		var s211 = s14.addSection("behaviour");
		s211.values.set("id","min");
		s211.values.set("class","haxe.ui.backend.html5.native.behaviours.ElementAttribute");
		s211.values.set("name","min");
		var s212 = s14.addSection("behaviour");
		s212.values.set("id","max");
		s212.values.set("class","haxe.ui.backend.html5.native.behaviours.ElementAttribute");
		s212.values.set("name","max");
		var s213 = s14.addSection("behaviour");
		s213.values.set("id","pos");
		s213.values.set("class","haxe.ui.backend.html5.native.behaviours.ElementAttribute");
		s213.values.set("name","value");
		var s214 = s14.addSection("size");
		s214.values.set("class","haxe.ui.backend.html5.native.size.ElementSize");
		var s15 = haxe_ui_Toolkit.nativeConfig.addSection("component");
		s15.values.set("id","haxe.ui.components.VSlider");
		s15.values.set("class","haxe.ui.backend.html5.native.NativeElement");
		s15.values.set("nodeType","input");
		s15.values.set("type","range");
		s15.values.set("style","padding:0;margin: 0;-webkit-appearance: slider-vertical;-moz-orient: vertical;writing-mode: bt-lr;");
		s15.values.set("orient","vertical");
		var s215 = s15.addSection("behaviour");
		s215.values.set("id","min");
		s215.values.set("class","haxe.ui.backend.html5.native.behaviours.ElementAttribute");
		s215.values.set("name","min");
		var s216 = s15.addSection("behaviour");
		s216.values.set("id","max");
		s216.values.set("class","haxe.ui.backend.html5.native.behaviours.ElementAttribute");
		s216.values.set("name","max");
		var s217 = s15.addSection("behaviour");
		s217.values.set("id","pos");
		s217.values.set("class","haxe.ui.backend.html5.native.behaviours.ElementAttribute");
		s217.values.set("name","value");
		var s218 = s15.addSection("size");
		s218.values.set("class","haxe.ui.backend.html5.native.size.ElementSize");
		var s16 = haxe_ui_Toolkit.nativeConfig.addSection("component");
		s16.values.set("id","haxe.ui.components.HProgress");
		s16.values.set("class","haxe.ui.backend.html5.native.NativeElement");
		s16.values.set("nodeType","progress");
		s16.values.set("style","padding:0;");
		var s219 = s16.addSection("behaviour");
		s219.values.set("id","min");
		s219.values.set("class","haxe.ui.backend.html5.native.behaviours.ElementAttribute");
		s219.values.set("name","min");
		var s220 = s16.addSection("behaviour");
		s220.values.set("id","max");
		s220.values.set("class","haxe.ui.backend.html5.native.behaviours.ElementAttribute");
		s220.values.set("name","max");
		var s221 = s16.addSection("behaviour");
		s221.values.set("id","pos");
		s221.values.set("class","haxe.ui.backend.html5.native.behaviours.ElementAttribute");
		s221.values.set("name","value");
		var s222 = s16.addSection("behaviour");
		s222.values.set("id","indeterminate");
		s222.values.set("class","haxe.ui.backend.html5.native.behaviours.ElementAttribute");
		s222.values.set("name","value");
		s222.values.set("remove","true");
		var s223 = s16.addSection("size");
		s223.values.set("class","haxe.ui.backend.html5.native.size.ElementSize");
		var s17 = haxe_ui_Toolkit.nativeConfig.addSection("component");
		s17.values.set("id","haxe.ui.components.VProgress");
		s17.values.set("class","haxe.ui.backend.html5.native.NativeElement");
		s17.values.set("nodeType","progress");
		s17.values.set("style","padding:0;-webkit-transform: rotate(-90deg) translateY(-1000%);-webkit-transform-origin: 100% 0%;-moz-orient: vertical;writing-mode: bt-lr;");
		s17.values.set("orient","vertical");
		var s224 = s17.addSection("behaviour");
		s224.values.set("id","min");
		s224.values.set("class","haxe.ui.backend.html5.native.behaviours.ElementAttribute");
		s224.values.set("name","min");
		var s225 = s17.addSection("behaviour");
		s225.values.set("id","max");
		s225.values.set("class","haxe.ui.backend.html5.native.behaviours.ElementAttribute");
		s225.values.set("name","max");
		var s226 = s17.addSection("behaviour");
		s226.values.set("id","pos");
		s226.values.set("class","haxe.ui.backend.html5.native.behaviours.ElementAttribute");
		s226.values.set("name","value");
		var s227 = s17.addSection("behaviour");
		s227.values.set("id","indeterminate");
		s227.values.set("class","haxe.ui.backend.html5.native.behaviours.ElementAttribute");
		s227.values.set("name","value");
		s227.values.set("remove","true");
		var s228 = s17.addSection("size");
		s228.values.set("class","haxe.ui.backend.html5.native.size.ElementSize");
		var s18 = haxe_ui_Toolkit.nativeConfig.addSection("component");
		s18.values.set("id","haxe.ui.containers.ScrollView");
		s18.values.set("class","haxe.ui.backend.html5.native.NativeElement");
	})();
	haxe_ui_Toolkit._built = true;
	var client = new haxe_ui_remoting_client_Client();
};
haxe_ui_Toolkit.init = function(options) {
	haxe_ui_Toolkit.build();
	haxe_ui_themes_ThemeManager.get_instance().applyTheme(haxe_ui_Toolkit.theme);
	if(options != null) {
		haxe_ui_Toolkit.get_screen().options = options;
		haxe_ui_ToolkitAssets.get_instance().options = options;
	}
	haxe_ui_Toolkit.get_screen().registerEvent("KeyDown",haxe_ui_Toolkit.onKeyDown);
};
haxe_ui_Toolkit.onKeyDown = function(event) {
	if(event.keyCode == 9) {
		if(event.shiftKey == false) haxe_ui_focus_FocusManager.get_instance().focusNext(); else haxe_ui_focus_FocusManager.get_instance().focusPrev();
	}
};
haxe_ui_Toolkit.get_assets = function() {
	return haxe_ui_ToolkitAssets.get_instance();
};
haxe_ui_Toolkit.get_screen = function() {
	return haxe_ui_core_Screen.get_instance();
};
var haxe_ui_backend_AssetsBase = function() {
};
$hxClasses["haxe.ui.backend.AssetsBase"] = haxe_ui_backend_AssetsBase;
haxe_ui_backend_AssetsBase.__name__ = ["haxe","ui","backend","AssetsBase"];
haxe_ui_backend_AssetsBase.prototype = {
	getTextDelegate: function(resourceId) {
		return null;
	}
	,getImageInternal: function(resourceId,callback) {
		var bytes = haxe_Resource.getBytes(resourceId);
		if(bytes != null) {
			callback(null);
			return;
		}
		var image;
		var _this = window.document;
		image = _this.createElement("img");
		image.onload = function(e) {
			var imageInfo = { width : image.width, height : image.height, data : image};
			callback(imageInfo);
		};
		image.onerror = function(e1) {
			callback(null);
		};
		image.src = resourceId;
	}
	,getImageFromHaxeResource: function(resourceId,callback) {
		var image;
		var _this = window.document;
		image = _this.createElement("img");
		var bytes = haxe_Resource.getBytes(resourceId);
		image.onload = function(e) {
			var imageInfo = { width : image.width, height : image.height, data : image};
			callback(resourceId,imageInfo);
		};
		var base64 = haxe_crypto_Base64.encode(bytes);
		image.src = "data:image/png;base64," + base64;
	}
	,getFontInternal: function(resourceId,callback) {
		callback(null);
	}
	,getFontFromHaxeResource: function(resourceId,callback) {
		callback(resourceId,null);
	}
	,__class__: haxe_ui_backend_AssetsBase
};
var haxe_ui_ToolkitAssets = function() {
	this.options = null;
	haxe_ui_backend_AssetsBase.call(this);
};
$hxClasses["haxe.ui.ToolkitAssets"] = haxe_ui_ToolkitAssets;
haxe_ui_ToolkitAssets.__name__ = ["haxe","ui","ToolkitAssets"];
haxe_ui_ToolkitAssets.__properties__ = {get_instance:"get_instance"}
haxe_ui_ToolkitAssets.get_instance = function() {
	if(haxe_ui_ToolkitAssets._instance == null) haxe_ui_ToolkitAssets._instance = new haxe_ui_ToolkitAssets();
	return haxe_ui_ToolkitAssets._instance;
};
haxe_ui_ToolkitAssets.__super__ = haxe_ui_backend_AssetsBase;
haxe_ui_ToolkitAssets.prototype = $extend(haxe_ui_backend_AssetsBase.prototype,{
	options: null
	,_fontCache: null
	,_fontCallbacks: null
	,_imageCache: null
	,_imageCallbacks: null
	,getFont: function(resourceId,callback,useCache) {
		if(useCache == null) useCache = true;
		var _g = this;
		if(this._fontCache != null && this._fontCache.get(resourceId) != null && useCache == true) callback(this._fontCache.get(resourceId)); else {
			if(this._fontCallbacks == null) this._fontCallbacks = new haxe_ui_util_CallbackMap();
			this._fontCallbacks.add(resourceId,callback);
			if(this._fontCallbacks.count(resourceId) == 1) this.getFontInternal(resourceId,function(font) {
				if(font != null) _g._onFontLoaded(resourceId,font); else if((function($this) {
					var $r;
					var _this = haxe_Resource.listNames();
					$r = HxOverrides.indexOf(_this,resourceId,0);
					return $r;
				}(this)) != -1) _g.getFontFromHaxeResource(resourceId,$bind(_g,_g._onFontLoaded)); else {
					_g._fontCallbacks.remove(resourceId,callback);
					callback(null);
				}
			});
		}
	}
	,_onFontLoaded: function(resourceId,font) {
		if(this._fontCache == null) this._fontCache = new haxe_ds_StringMap();
		this._fontCache.set(resourceId,font);
		this._fontCallbacks.invokeAndRemove(resourceId,font);
	}
	,getImage: function(resourceId,callback,useCache) {
		if(useCache == null) useCache = true;
		var _g = this;
		var orginalResourceId = resourceId;
		resourceId = this.runPlugins(resourceId);
		if(this._imageCache != null && this._imageCache.get(resourceId) != null && useCache == true) callback(this._imageCache.get(resourceId)); else {
			if(this._imageCallbacks == null) this._imageCallbacks = new haxe_ui_util_CallbackMap();
			this._imageCallbacks.add(resourceId,callback);
			if(this._imageCallbacks.count(resourceId) == 1) this.getImageInternal(resourceId,function(imageInfo) {
				if(imageInfo != null) _g._onImageLoaded(resourceId,imageInfo); else if((function($this) {
					var $r;
					var _this = haxe_Resource.listNames();
					$r = HxOverrides.indexOf(_this,orginalResourceId,0);
					return $r;
				}(this)) != -1) {
					_g._imageCallbacks.remove(resourceId,callback);
					_g._imageCallbacks.add(orginalResourceId,callback);
					_g.getImageFromHaxeResource(orginalResourceId,$bind(_g,_g._onImageLoaded));
				} else if((function($this) {
					var $r;
					var _this1 = haxe_Resource.listNames();
					$r = HxOverrides.indexOf(_this1,resourceId,0);
					return $r;
				}(this)) != -1) _g.getImageFromHaxeResource(resourceId,$bind(_g,_g._onImageLoaded)); else {
					_g._imageCallbacks.remove(resourceId,callback);
					callback(null);
				}
			});
		}
	}
	,_onImageLoaded: function(resourceId,imageInfo) {
		if(imageInfo != null && (imageInfo.width == -1 || imageInfo.width == -1)) haxe_Log.trace("WARNING: imageData.originalWidth == -1 || imageData.originalHeight == -1",{ fileName : "ToolkitAssets.hx", lineNumber : 103, className : "haxe.ui.ToolkitAssets", methodName : "_onImageLoaded"});
		if(this._imageCache == null) this._imageCache = new haxe_ds_StringMap();
		this._imageCache.set(resourceId,imageInfo);
		this._imageCallbacks.invokeAndRemove(resourceId,imageInfo);
	}
	,getText: function(resourceId) {
		var s = this.getTextDelegate(resourceId);
		if(s == null) s = haxe_Resource.getString(resourceId);
		return s;
	}
	,getBytes: function(resourceId) {
		return null;
	}
	,_plugins: null
	,addPlugin: function(plugin) {
		if(this._plugins == null) this._plugins = [];
		this._plugins.push(plugin);
	}
	,runPlugins: function(asset) {
		if(this._plugins == null) return asset;
		var _g = 0;
		var _g1 = this._plugins;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			asset = p.invoke(asset);
		}
		return asset;
	}
	,__class__: haxe_ui_ToolkitAssets
});
var haxe_ui_animation_Animation = function() {
	this.vars = new haxe_ds_StringMap();
	this._stopped = false;
	this._loop = false;
	this.looping = false;
	this._currentFrameIndex = 0;
	this._currentTime = 0;
	this.easing = null;
	this.componentMap = new haxe_ds_StringMap();
	this.keyFrames = [];
};
$hxClasses["haxe.ui.animation.Animation"] = haxe_ui_animation_Animation;
haxe_ui_animation_Animation.__name__ = ["haxe","ui","animation","Animation"];
haxe_ui_animation_Animation.easingFromString = function(s) {
	return null;
};
haxe_ui_animation_Animation.prototype = {
	keyFrames: null
	,componentMap: null
	,easing: null
	,id: null
	,easingString: null
	,set_easingString: function(value) {
		this.easing = haxe_ui_animation_Animation.easingFromString(value);
		return value;
	}
	,addKeyFrame: function(time) {
		var keyFrame = new haxe_ui_animation_AnimationKeyFrame(time);
		keyFrame.animation = this;
		this.keyFrames.push(keyFrame);
		return keyFrame;
	}
	,setComponent: function(id,component) {
		this.componentMap.set(id,component);
	}
	,getComponent: function(id) {
		return this.componentMap.get(id);
	}
	,_currentTime: null
	,_currentFrameIndex: null
	,_complete: null
	,start: function(complete) {
		this._complete = complete;
		this._stopped = false;
		this._currentTime = 0;
		this._currentFrameIndex = 0;
		this.runFrame(this._currentFrameIndex);
	}
	,runFrame: function(index) {
		var _g = this;
		var f = this.keyFrames[index];
		var duration = f.time - this._currentTime;
		f.run(duration,function() {
			_g._currentTime = f.time;
			_g.nextFrame();
		});
	}
	,nextFrame: function() {
		this._currentFrameIndex++;
		if(this._stopped == true) {
			this.complete();
			return;
		}
		if(this._currentFrameIndex >= this.keyFrames.length) this.complete(); else this.runFrame(this._currentFrameIndex);
	}
	,looping: null
	,_loop: null
	,complete: function() {
		if(this._loop == true) this.start(); else if(this._complete != null) this._complete();
	}
	,loop: function(complete) {
		this._loop = true;
		this.looping = true;
		this.start(complete);
	}
	,_stopped: null
	,stop: function() {
		this._stopped = true;
		this._loop = false;
	}
	,fromXML: function(xml) {
		this.id = xml.get("id");
		this.easing = haxe_ui_animation_Animation.easingFromString(xml.get("ease"));
		var $it0 = xml.elementsNamed("keyframe");
		while( $it0.hasNext() ) {
			var keyFrameNode = $it0.next();
			var kf = this.addKeyFrame(Std.parseInt(keyFrameNode.get("time")));
			var $it1 = keyFrameNode.elements();
			while( $it1.hasNext() ) {
				var refNode = $it1.next();
				var r = kf.addComponentRef((function($this) {
					var $r;
					if(refNode.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + refNode.nodeType);
					$r = refNode.nodeName;
					return $r;
				}(this)));
				var $it2 = refNode.attributes();
				while( $it2.hasNext() ) {
					var attrName = $it2.next();
					var attrValue = refNode.get(attrName);
					if(StringTools.startsWith(attrValue,"{") && StringTools.endsWith(attrValue,"}")) {
						attrValue = attrValue.substring(1,attrValue.length - 1);
						r.addVar(attrName,attrValue);
					} else r.addProperty(attrName,parseFloat(attrValue));
				}
			}
		}
	}
	,vars: null
	,setVar: function(name,value) {
		this.vars.set(name,value);
	}
	,clone: function() {
		var c = new haxe_ui_animation_Animation();
		c.id = this.id;
		c.set_easingString(this.easingString);
		c.easing = this.easing;
		var _g = 0;
		var _g1 = this.keyFrames;
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			var cf = f.clone();
			cf.animation = c;
			c.keyFrames.push(cf);
		}
		return c;
	}
	,__class__: haxe_ui_animation_Animation
	,__properties__: {set_easingString:"set_easingString"}
};
var haxe_ui_animation_AnimationComponentRef = function(id) {
	this.vars = new haxe_ds_StringMap();
	this.properties = new haxe_ds_StringMap();
	this.id = id;
};
$hxClasses["haxe.ui.animation.AnimationComponentRef"] = haxe_ui_animation_AnimationComponentRef;
haxe_ui_animation_AnimationComponentRef.__name__ = ["haxe","ui","animation","AnimationComponentRef"];
haxe_ui_animation_AnimationComponentRef.prototype = {
	keyFrame: null
	,id: null
	,properties: null
	,vars: null
	,addProperty: function(name,value) {
		this.properties.set(name,value);
	}
	,addVar: function(name,value) {
		this.vars.set(name,value);
	}
	,clone: function() {
		var c = new haxe_ui_animation_AnimationComponentRef(this.id);
		var $it0 = this.properties.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			var value = this.properties.get(k);
			c.properties.set(k,value);
		}
		var $it1 = this.vars.keys();
		while( $it1.hasNext() ) {
			var k1 = $it1.next();
			var value1 = this.vars.get(k1);
			c.vars.set(k1,value1);
		}
		return c;
	}
	,__class__: haxe_ui_animation_AnimationComponentRef
};
var haxe_ui_animation_AnimationKeyFrame = function(time) {
	this._count = 0;
	this.componentRefs = [];
	this.time = time;
};
$hxClasses["haxe.ui.animation.AnimationKeyFrame"] = haxe_ui_animation_AnimationKeyFrame;
haxe_ui_animation_AnimationKeyFrame.__name__ = ["haxe","ui","animation","AnimationKeyFrame"];
haxe_ui_animation_AnimationKeyFrame.prototype = {
	animation: null
	,time: null
	,componentRefs: null
	,addComponentRef: function(id) {
		var componentRef = new haxe_ui_animation_AnimationComponentRef(id);
		componentRef.keyFrame = this;
		this.componentRefs.push(componentRef);
		return componentRef;
	}
	,_completeCallback: null
	,_count: null
	,run: function(duration,complete) {
		this._completeCallback = complete;
		this._count = this.componentRefs.length;
		var _g = 0;
		var _g1 = this.componentRefs;
		while(_g < _g1.length) {
			var ref = _g1[_g];
			++_g;
			if(this.animation.getComponent(ref.id) == null) this._count--;
		}
		var _g2 = 0;
		var _g11 = this.componentRefs;
		while(_g2 < _g11.length) {
			var ref1 = _g11[_g2];
			++_g2;
			var actualComponent = this.animation.getComponent(ref1.id);
			if(actualComponent != null) {
				var props = { };
				var $it0 = ref1.properties.keys();
				while( $it0.hasNext() ) {
					var k = $it0.next();
					Reflect.setField(props,k,ref1.properties.get(k));
				}
				var $it1 = ref1.vars.keys();
				while( $it1.hasNext() ) {
					var k1 = $it1.next();
					var v = ref1.vars.get(k1);
					if(this.animation.vars.exists(v)) Reflect.setField(props,k1,this.animation.vars.get(v));
				}
			}
		}
	}
	,onComplete: function() {
		this._count--;
		if(this._count == 0) this._completeCallback();
	}
	,clone: function() {
		var c = new haxe_ui_animation_AnimationKeyFrame(this.time);
		c.animation = this.animation;
		var _g = 0;
		var _g1 = this.componentRefs;
		while(_g < _g1.length) {
			var r = _g1[_g];
			++_g;
			var cr = r.clone();
			cr.keyFrame = c;
			c.componentRefs.push(cr);
		}
		return c;
	}
	,__class__: haxe_ui_animation_AnimationKeyFrame
};
var haxe_ui_animation_AnimationManager = function() {
	this._animations = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.animation.AnimationManager"] = haxe_ui_animation_AnimationManager;
haxe_ui_animation_AnimationManager.__name__ = ["haxe","ui","animation","AnimationManager"];
haxe_ui_animation_AnimationManager.__properties__ = {get_instance:"get_instance"}
haxe_ui_animation_AnimationManager.get_instance = function() {
	if(haxe_ui_animation_AnimationManager._instance == null) haxe_ui_animation_AnimationManager._instance = new haxe_ui_animation_AnimationManager();
	return haxe_ui_animation_AnimationManager._instance;
};
haxe_ui_animation_AnimationManager.prototype = {
	_animations: null
	,registerAnimation: function(id,animation) {
		this._animations.set(id,animation);
	}
	,run: function(id,components,vars,complete) {
		var a = this.initAnimation(id,components,vars);
		if(a != null) a.start(function() {
			if(complete != null) complete();
		});
		return a;
	}
	,loop: function(id,components,vars,complete) {
		var a = this.initAnimation(id,components,vars);
		if(a != null) a.loop(function() {
			if(complete != null) complete();
		});
		return a;
	}
	,initAnimation: function(id,components,vars) {
		var a = this.get(id);
		if(a != null) {
			if(components != null) {
				var $it0 = components.keys();
				while( $it0.hasNext() ) {
					var k = $it0.next();
					a.setComponent(k,__map_reserved[k] != null?components.getReserved(k):components.h[k]);
				}
			}
			if(vars != null) {
				var $it1 = vars.keys();
				while( $it1.hasNext() ) {
					var k1 = $it1.next();
					a.setVar(k1,__map_reserved[k1] != null?vars.getReserved(k1):vars.h[k1]);
				}
			}
		}
		return a;
	}
	,get: function(id) {
		var a = this._animations.get(id);
		if(a == null) return null;
		return a.clone();
	}
	,__class__: haxe_ui_animation_AnimationManager
};
var haxe_ui_assets_AssetPlugin = function() {
};
$hxClasses["haxe.ui.assets.AssetPlugin"] = haxe_ui_assets_AssetPlugin;
haxe_ui_assets_AssetPlugin.__name__ = ["haxe","ui","assets","AssetPlugin"];
haxe_ui_assets_AssetPlugin.prototype = {
	_props: null
	,invoke: function(asset) {
		return asset;
	}
	,setProperty: function(name,value) {
		if(this._props == null) this._props = new haxe_ds_StringMap();
		this._props.set(name,value);
	}
	,getProperty: function(name,defaultValue) {
		if(this._props == null) return defaultValue;
		var v = this._props.get(name);
		if(v == null) v = defaultValue;
		return v;
	}
	,__class__: haxe_ui_assets_AssetPlugin
};
var haxe_ui_backend_ComponentBase = function() {
	this._eventMap = new haxe_ds_StringMap();
	this._mutationObserver = new MutationObserver($bind(this,this.onMutationEvent));
	this._mutationObserver.observe(haxe_ui_core_Screen.get_instance().get_container(),{ childList : true});
};
$hxClasses["haxe.ui.backend.ComponentBase"] = haxe_ui_backend_ComponentBase;
haxe_ui_backend_ComponentBase.__name__ = ["haxe","ui","backend","ComponentBase"];
haxe_ui_backend_ComponentBase.prototype = {
	element: null
	,_eventMap: null
	,_nativeElement: null
	,_mutationObserver: null
	,onMutationEvent: function(records,o) {
		var done = false;
		var _g = 0;
		while(_g < records.length) {
			var record = records[_g];
			++_g;
			var _g2 = 0;
			var _g1 = record.addedNodes.length;
			while(_g2 < _g1) {
				var i = _g2++;
				var node = record.addedNodes.item(i);
				if(node == this.element) {
					this.recursiveReady();
					done = true;
				}
			}
			if(done == true) break;
		}
	}
	,recursiveReady: function() {
		if(this._mutationObserver != null) {
			this._mutationObserver.disconnect();
			this._mutationObserver = null;
		}
		var component;
		component = js_Boot.__cast(this , haxe_ui_core_Component);
		component.ready();
		var _g = 0;
		var _g1 = component.get_childComponents();
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.recursiveReady();
		}
	}
	,handleCreate: function($native) {
		var newElement = null;
		if($native == true) {
			var className = Type.getClassName(js_Boot.getClass(this));
			if(className == "haxe.ui.containers.ScrollView") {
				this._nativeElement = new haxe_ui_backend_html5_native_NativeElement(this);
				if(this.element == null) this.element = this._nativeElement.create();
				this.element.style.position = "absolute";
				this.element.style.overflow = "auto";
				return;
			} else {
				var component;
				component = js_Boot.__cast(this , haxe_ui_core_Component);
				var nativeConfig = component.getNativeConfigProperties();
				if(nativeConfig != null && (__map_reserved["class"] != null?nativeConfig.existsReserved("class"):nativeConfig.h.hasOwnProperty("class"))) {
					this._nativeElement = Type.createInstance(Type.resolveClass(__map_reserved["class"] != null?nativeConfig.getReserved("class"):nativeConfig.h["class"]),[this]);
					this._nativeElement.config = nativeConfig;
					newElement = this._nativeElement.create();
				}
			}
			if(newElement != null) {
				newElement.style.position = "absolute";
				if(this.element != null) {
					var p = this.element.parentElement;
					if(p != null) p.replaceChild(newElement,this.element);
				}
				this.element = newElement;
				this.remapEvents();
			}
		}
		if(newElement == null) {
			if(Type.getClassName(js_Boot.getClass(this)) == "haxe.ui.containers.ScrollView") {
				this._nativeElement = null;
				if(this.element == null) {
					var _this = window.document;
					this.element = _this.createElement("div");
					this.element.style.setProperty("-webkit-touch-callout","none");
					this.element.style.setProperty("-webkit-user-select","none");
					this.element.style.setProperty("-khtml-user-select","none");
					this.element.style.setProperty("-moz-user-select","none");
					this.element.style.setProperty("-ms-user-select","none");
					this.element.style.setProperty("user-select","none");
					this.element.style.position = "absolute";
				}
				this.element.scrollTop = 0;
				this.element.scrollLeft = 0;
				this.element.style.overflow = "hidden";
				return;
			}
			var _this1 = window.document;
			newElement = _this1.createElement("div");
			newElement.style.setProperty("-webkit-touch-callout","none");
			newElement.style.setProperty("-webkit-user-select","none");
			newElement.style.setProperty("-khtml-user-select","none");
			newElement.style.setProperty("-moz-user-select","none");
			newElement.style.setProperty("-ms-user-select","none");
			newElement.style.setProperty("user-select","none");
			newElement.style.position = "absolute";
			if(this.element != null) {
				var p1 = this.element.parentElement;
				if(p1 != null) p1.replaceChild(newElement,this.element);
			}
			this.element = newElement;
			this._nativeElement = null;
			this.remapEvents();
		}
	}
	,remapEvents: function() {
		if(this._eventMap == null) return;
		var copy = new haxe_ds_StringMap();
		var $it0 = this._eventMap.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			var fn = this._eventMap.get(k);
			if(__map_reserved[k] != null) copy.setReserved(k,fn); else copy.h[k] = fn;
			this.unmapEvent(k,fn);
		}
		this._eventMap = new haxe_ds_StringMap();
		var $it1 = copy.keys();
		while( $it1.hasNext() ) {
			var k1 = $it1.next();
			this.mapEvent(k1,__map_reserved[k1] != null?copy.getReserved(k1):copy.h[k1]);
		}
	}
	,handlePosition: function(left,top,style) {
		if(this.element == null) return;
		if(left != null) this.element.style.left = "" + left + "px";
		if(top != null) this.element.style.top = "" + top + "px";
	}
	,handleSize: function(width,height,style) {
		if(width == null || height == null || width <= 0 || height <= 0) return;
		if(this.element == null) return;
		if(js_Boot.__instanceof(this,haxe_ui_components_VProgress)) {
			if(this.element.style.getPropertyValue("transform-origin") != null && this.element.style.getPropertyValue("transform-origin").length > 0) {
				var tw = width;
				var th = height;
				width = th;
				height = tw;
			}
		}
		var css = this.element.style;
		haxe_ui_backend_html5_StyleHelper.apply(this,width,height,style);
		var parent;
		parent = (js_Boot.__cast(this , haxe_ui_core_Component)).parentComponent;
		if(parent != null && parent.element.style.borderWidth != null) {
			css.marginTop = "-" + parent.element.style.borderWidth;
			css.marginLeft = "-" + parent.element.style.borderWidth;
		} else {
		}
		var _g = 0;
		var _g1 = (js_Boot.__cast(this , haxe_ui_core_Component)).get_childComponents();
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(style.borderLeftSize != null && style.borderLeftSize > 0) child.element.style.marginLeft = "-" + style.borderLeftSize + "px";
			if(style.borderTopSize != null && style.borderTopSize > 0) child.element.style.marginTop = "-" + style.borderTopSize + "px";
		}
	}
	,handleReady: function() {
		if((js_Boot.__cast(this , haxe_ui_core_Component)).get_id() != null) this.element.id = (js_Boot.__cast(this , haxe_ui_core_Component)).get_id();
	}
	,handleClipRect: function(value) {
		var parent;
		parent = (js_Boot.__cast(this , haxe_ui_core_Component)).parentComponent;
		if(parent._nativeElement == null) {
			this.element.style.clip = "rect(" + ("" + value.top + "px") + "," + haxe_ui_backend_html5_HtmlUtils.px(value.get_right()) + "," + haxe_ui_backend_html5_HtmlUtils.px(value.get_bottom()) + "," + ("" + value.left + "px") + ")";
			this.element.style.left = "" + ("" + -value.left + "px");
			this.element.style.top = "" + ("" + -value.top + "px");
		} else this.element.style.removeProperty("clip");
	}
	,handlePreReposition: function() {
	}
	,handlePostReposition: function() {
	}
	,handleVisibility: function(show) {
		if(show == true) this.element.style.display = ""; else this.element.style.display = "none";
	}
	,_textDisplay: null
	,createTextDisplay: function(text) {
		if(this._textDisplay == null) {
			this._textDisplay = new haxe_ui_core_TextDisplay();
			this._textDisplay.parentComponent = this;
			this.element.appendChild(this._textDisplay.element);
		}
		if(text != null) this._textDisplay.set_text(text);
		return this._textDisplay;
	}
	,getTextDisplay: function() {
		return this.createTextDisplay();
	}
	,hasTextDisplay: function() {
		return this._textDisplay != null;
	}
	,_textInput: null
	,createTextInput: function(text) {
		if(this._textInput == null) {
			this._textInput = new haxe_ui_core_TextInput();
			this._textInput.parentComponent = this;
			this.element.appendChild(this._textInput.element);
		}
		if(text != null) this._textInput.set_text(text);
		return this._textInput;
	}
	,getTextInput: function() {
		return this.createTextInput();
	}
	,hasTextInput: function() {
		return this._textInput != null;
	}
	,_imageDisplay: null
	,createImageDisplay: function() {
		if(this._imageDisplay == null) {
			this._imageDisplay = new haxe_ui_core_ImageDisplay();
			this.element.appendChild(this._imageDisplay.element);
		}
		return this._imageDisplay;
	}
	,getImageDisplay: function() {
		return this.createImageDisplay();
	}
	,hasImageDisplay: function() {
		return this._imageDisplay != null;
	}
	,removeImageDisplay: function() {
		if(this._imageDisplay != null) {
			this._imageDisplay.dispose();
			this._imageDisplay = null;
		}
	}
	,handleAddComponent: function(child) {
		this.element.appendChild(child.element);
		return child;
	}
	,handleRemoveComponent: function(child,dispose) {
		if(dispose == null) dispose = true;
		haxe_ui_backend_html5_HtmlUtils.removeElement(child.element);
		return child;
	}
	,applyStyle: function(style) {
		if(this.element == null) return;
		var useHandCursor = false;
		if(style.cursor != null && style.cursor == "pointer") useHandCursor = true;
		this.setCursor(useHandCursor == true?"pointer":null);
		if(style.filter != null) {
			if(style.filter[0] == "drop-shadow") {
				var dropShadow = haxe_ui_util_filters_FilterParser.parseDropShadow(style.filter);
				if(dropShadow.inner == false) this.element.style.boxShadow = "" + dropShadow.distance + "px " + dropShadow.distance + "px " + dropShadow.blurX + "px 0px " + haxe_ui_backend_html5_HtmlUtils.rgba(dropShadow.color,dropShadow.alpha); else this.element.style.boxShadow = "inset " + dropShadow.distance + "px " + dropShadow.distance + "px " + dropShadow.blurX + "px 0px " + haxe_ui_backend_html5_HtmlUtils.rgba(dropShadow.color,dropShadow.alpha);
			} else if(style.filter[0] == "blur") {
				haxe_Log.trace(style.filter,{ fileName : "ComponentBase.hx", lineNumber : 363, className : "haxe.ui.backend.ComponentBase", methodName : "applyStyle"});
				var blur = haxe_ui_util_filters_FilterParser.parseBlur(style.filter);
				this.element.style.setProperty("-webkit-filter","blur(1px)");
				this.element.style.setProperty("-moz-filter","blur(1px)");
				this.element.style.setProperty("-o-filter","blur(1px)");
				this.element.style.setProperty("filter","blur(1px)");
			}
		} else {
			this.element.style.boxShadow = null;
			this.element.style.removeProperty("box-shadow");
			this.element.style.removeProperty("-webkit-filter");
			this.element.style.removeProperty("-moz-filter");
			this.element.style.removeProperty("-o-filter");
			this.element.style.removeProperty("filter");
		}
		if(style.opacity != null) this.element.style.opacity = "" + style.opacity;
	}
	,setCursor: function(cursor) {
		if(cursor == null) cursor = "default";
		if(cursor == null) {
			this.element.style.removeProperty("cursor");
			if(this.hasImageDisplay()) this.getImageDisplay().element.style.removeProperty("cursor");
			if(this.hasTextDisplay()) this.getTextDisplay().element.style.removeProperty("cursor");
			if(this.hasTextInput()) {
			}
		} else {
			this.element.style.cursor = cursor;
			if(this.hasImageDisplay()) this.getImageDisplay().element.style.cursor = cursor;
			if(this.hasTextDisplay()) this.getTextDisplay().element.style.cursor = cursor;
			if(this.hasTextInput()) {
			}
		}
		var _g = 0;
		var _g1 = (js_Boot.__cast(this , haxe_ui_core_Component)).get_childComponents();
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			c.setCursor(cursor);
		}
	}
	,mapEvent: function(type,listener) {
		switch(type) {
		case "MouseMove":case "MouseOver":case "MouseOut":case "MouseDown":case "MouseUp":case "Click":
			if(this._eventMap.exists(type) == false) {
				this._eventMap.set(type,listener);
				this.element.addEventListener(haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.get(type),$bind(this,this.__onMouseEvent));
			}
			break;
		case "MouseWheel":
			this._eventMap.set(type,listener);
			if(haxe_ui_backend_html5_UserAgent.get_instance().get_firefox() == true) this.element.addEventListener("DOMMouseScroll",$bind(this,this.__onMouseWheelEvent)); else this.element.addEventListener("mousewheel",$bind(this,this.__onMouseWheelEvent));
			break;
		}
	}
	,unmapEvent: function(type,listener) {
		switch(type) {
		case "MouseMove":case "MouseOver":case "MouseOut":case "MouseDown":case "MouseUp":case "Click":
			this._eventMap.remove(type);
			this.element.removeEventListener(haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.get(type),$bind(this,this.__onMouseEvent));
			break;
		case "MouseWheel":
			this._eventMap.remove(type);
			if(haxe_ui_backend_html5_UserAgent.get_instance().get_firefox() == true) this.element.removeEventListener("DOMMouseScroll",$bind(this,this.__onMouseWheelEvent)); else this.element.removeEventListener("mousewheel",$bind(this,this.__onMouseWheelEvent));
			break;
		}
	}
	,__onMouseEvent: function(event) {
		var type = haxe_ui_backend_html5_EventMapper.DOM_TO_HAXEUI.get(event.type);
		if(type != null) {
			var fn = this._eventMap.get(type);
			if(fn != null) {
				event.stopPropagation();
				var mouseEvent = new haxe_ui_core_MouseEvent(type);
				mouseEvent.screenX = event.pageX;
				mouseEvent.screenY = event.pageY;
				fn(mouseEvent);
			}
		}
	}
	,__onMouseWheelEvent: function(event) {
		var fn = this._eventMap.get("MouseWheel");
		if(fn == null) return;
		var delta = 0;
		if(Reflect.field(event,"wheelDelta") != null) delta = Reflect.field(event,"wheelDelta"); else if(js_Boot.__instanceof(event,WheelEvent)) delta = (js_Boot.__cast(event , WheelEvent)).deltaY; else delta = -event.detail;
		delta = Math.max(-1,Math.min(1,delta));
		var mouseEvent = new haxe_ui_core_MouseEvent("MouseWheel");
		mouseEvent.screenX = event.pageX;
		mouseEvent.screenY = event.pageY;
		mouseEvent.delta = delta;
		fn(mouseEvent);
	}
	,__class__: haxe_ui_backend_ComponentBase
};
var haxe_ui_backend_FontData = function() {
};
$hxClasses["haxe.ui.backend.FontData"] = haxe_ui_backend_FontData;
haxe_ui_backend_FontData.__name__ = ["haxe","ui","backend","FontData"];
haxe_ui_backend_FontData.prototype = {
	__class__: haxe_ui_backend_FontData
};
var haxe_ui_backend_ImageDisplayBase = function() {
	this._imageHeight = 0;
	this._imageWidth = 0;
	this._top = 0;
	this._left = 0;
	this.aspectRatio = 1;
	var _this = window.document;
	this.element = _this.createElement("img");
	this.element.style.position = "absolute";
};
$hxClasses["haxe.ui.backend.ImageDisplayBase"] = haxe_ui_backend_ImageDisplayBase;
haxe_ui_backend_ImageDisplayBase.__name__ = ["haxe","ui","backend","ImageDisplayBase"];
haxe_ui_backend_ImageDisplayBase.prototype = {
	parentComponent: null
	,aspectRatio: null
	,element: null
	,_left: null
	,get_left: function() {
		return this._left;
	}
	,set_left: function(value) {
		if(value == this._left) {
		}
		this._left = value;
		this.updatePos();
		return value;
	}
	,_top: null
	,get_top: function() {
		return this._top;
	}
	,set_top: function(value) {
		if(value == this._top) {
		}
		this._top = value;
		this.updatePos();
		return value;
	}
	,_imageWidth: null
	,set_imageWidth: function(value) {
		if(this._imageWidth == value || value <= 0) return value;
		this._imageWidth = value;
		this.updateSize();
		return value;
	}
	,get_imageWidth: function() {
		return this._imageWidth;
	}
	,_imageHeight: null
	,set_imageHeight: function(value) {
		if(this._imageHeight == value || value <= 0) return value;
		this._imageHeight = value;
		this.updateSize();
		return value;
	}
	,get_imageHeight: function() {
		return this._imageHeight;
	}
	,_imageInfo: null
	,get_imageInfo: function() {
		return this._imageInfo;
	}
	,set_imageInfo: function(value) {
		if(this.element.src != value.data.src) {
			this._imageInfo = value;
			this._imageWidth = this._imageInfo.width;
			this._imageHeight = this._imageInfo.height;
			this.element.src = value.data.src;
		}
		return value;
	}
	,dispose: function() {
		if(this.element != null) haxe_ui_backend_html5_HtmlUtils.removeElement(this.element);
	}
	,updatePos: function() {
		var style = this.element.style;
		style.left = "" + this._left + "px";
		style.top = "" + this._top + "px";
	}
	,updateSize: function() {
		var style = this.element.style;
		style.width = haxe_ui_backend_html5_HtmlUtils.px(this.get_imageWidth());
		style.height = haxe_ui_backend_html5_HtmlUtils.px(this.get_imageHeight());
	}
	,__class__: haxe_ui_backend_ImageDisplayBase
	,__properties__: {set_imageInfo:"set_imageInfo",get_imageInfo:"get_imageInfo",set_imageHeight:"set_imageHeight",get_imageHeight:"get_imageHeight",set_imageWidth:"set_imageWidth",get_imageWidth:"get_imageWidth",set_top:"set_top",get_top:"get_top",set_left:"set_left",get_left:"get_left"}
};
var haxe_ui_backend_PlatformBase = function() { };
$hxClasses["haxe.ui.backend.PlatformBase"] = haxe_ui_backend_PlatformBase;
haxe_ui_backend_PlatformBase.__name__ = ["haxe","ui","backend","PlatformBase"];
haxe_ui_backend_PlatformBase.calcScrollSize = function() {
	if(haxe_ui_backend_PlatformBase._vscrollWidth >= 0 && haxe_ui_backend_PlatformBase._hscrollHeight >= 0) return;
	var div = window.document.createElement("div");
	div.style.position = "absolute";
	div.style.top = "-99999px";
	div.style.left = "-99999px";
	div.style.height = "100px";
	div.style.width = "100px";
	div.style.overflow = "scroll";
	window.document.body.appendChild(div);
	haxe_ui_backend_PlatformBase._vscrollWidth = div.offsetWidth - div.clientWidth;
	haxe_ui_backend_PlatformBase._hscrollHeight = div.offsetHeight - div.clientHeight;
	haxe_ui_backend_html5_HtmlUtils.removeElement(div);
};
haxe_ui_backend_PlatformBase.prototype = {
	getMetric: function(id) {
		switch(id) {
		case "patform.metrics.vscroll.width":
			haxe_ui_backend_PlatformBase.calcScrollSize();
			return haxe_ui_backend_PlatformBase._vscrollWidth;
		case "patform.metrics.hscroll.height":
			haxe_ui_backend_PlatformBase.calcScrollSize();
			return haxe_ui_backend_PlatformBase._hscrollHeight;
		}
		return 0;
	}
	,__class__: haxe_ui_backend_PlatformBase
};
var haxe_ui_backend_ScreenBase = function() {
	this._hasListener = false;
	this.__topLevelComponents = [];
	this._mapping = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.backend.ScreenBase"] = haxe_ui_backend_ScreenBase;
haxe_ui_backend_ScreenBase.__name__ = ["haxe","ui","backend","ScreenBase"];
haxe_ui_backend_ScreenBase.prototype = {
	_mapping: null
	,focus: null
	,options: null
	,width: null
	,get_width: function() {
		return this.get_container().offsetWidth;
	}
	,height: null
	,get_height: function() {
		return this.get_container().offsetHeight;
	}
	,__topLevelComponents: null
	,addComponent: function(component) {
		this.__topLevelComponents.push(component);
		this.addResizeListener();
		this.resizeComponent(component);
		this.get_container().appendChild(component.element);
	}
	,removeComponent: function(component) {
		HxOverrides.remove(this.__topLevelComponents,component);
		this.get_container().removeChild(component.element);
	}
	,resizeComponent: function(c) {
		if(c.get_percentWidth() > 0) c.set_width(this.get_width() * c.get_percentWidth() / 100);
		if(c.get_percentHeight() > 0) c.set_height(this.get_height() * c.get_percentHeight() / 100);
	}
	,container: null
	,get_container: function() {
		if(this.options == null || this.options.container == null) return window.document.body;
		return this.options.container;
	}
	,_hasListener: null
	,addResizeListener: function() {
		var _g = this;
		if(this._hasListener == true) return;
		window.onresize = function(e) {
			var _g1 = 0;
			var _g2 = _g.__topLevelComponents;
			while(_g1 < _g2.length) {
				var c = _g2[_g1];
				++_g1;
				_g.resizeComponent(c);
			}
		};
		this._hasListener = true;
	}
	,messageDialog: function(message,title,options,callback) {
		return null;
	}
	,showDialog: function(content,options,callback) {
		return null;
	}
	,hideDialog: function(dialog) {
		return false;
	}
	,supportsEvent: function(type) {
		return haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.get(type) != null;
	}
	,mapEvent: function(type,listener) {
		switch(type) {
		case "MouseMove":case "MouseOver":case "MouseOut":case "MouseDown":case "MouseUp":case "Click":
			if(this._mapping.exists(type) == false) {
				this._mapping.set(type,listener);
				this.get_container().addEventListener(haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.get(type),$bind(this,this.__onMouseEvent));
			}
			break;
		}
	}
	,unmapEvent: function(type,listener) {
	}
	,__onMouseEvent: function(event) {
		var type = haxe_ui_backend_html5_EventMapper.DOM_TO_HAXEUI.get(event.type);
		if(type != null) {
			var fn = this._mapping.get(type);
			if(fn != null) {
				var mouseEvent = new haxe_ui_core_MouseEvent(type);
				mouseEvent.screenX = event.pageX;
				mouseEvent.screenY = event.pageY;
				fn(mouseEvent);
			}
		}
	}
	,__class__: haxe_ui_backend_ScreenBase
	,__properties__: {get_container:"get_container",get_height:"get_height",get_width:"get_width"}
};
var haxe_ui_backend_TextDisplayBase = function() {
	this._originalSize = 0;
	this._checkSizeCounter = 0;
	this._textHeight = 0;
	this._textWidth = 0;
	this._height = -1;
	this._width = -1;
	this._top = 0;
	this._left = 0;
	var _this = window.document;
	this.element = _this.createElement("div");
	this.element.style.position = "absolute";
	this.element.style.cursor = "default";
};
$hxClasses["haxe.ui.backend.TextDisplayBase"] = haxe_ui_backend_TextDisplayBase;
haxe_ui_backend_TextDisplayBase.__name__ = ["haxe","ui","backend","TextDisplayBase"];
haxe_ui_backend_TextDisplayBase.prototype = {
	element: null
	,parentComponent: null
	,_text: null
	,get_text: function() {
		return this.element.innerHTML;
	}
	,set_text: function(value) {
		if(value == this._text) return value;
		this.element.innerHTML = value;
		this._text = value;
		this.measureText();
		return value;
	}
	,_left: null
	,get_left: function() {
		return this._left;
	}
	,set_left: function(value) {
		if(value == this._left) return value;
		this._left = value;
		this.updatePos();
		return value;
	}
	,_top: null
	,get_top: function() {
		return this._top;
	}
	,set_top: function(value) {
		if(value == this._top) return value;
		this._top = value;
		this.updatePos();
		return value;
	}
	,_width: null
	,set_width: function(value) {
		if(this._width == value) return value;
		this._width = value;
		this.updateSize();
		return value;
	}
	,get_width: function() {
		return this._width;
	}
	,_height: null
	,set_height: function(value) {
		if(this._height == value) return value;
		this._height = value;
		this.updateSize();
		return value;
	}
	,get_height: function() {
		return this._height;
	}
	,_textWidth: null
	,textWidth: null
	,get_textWidth: function() {
		return this._textWidth;
	}
	,_textHeight: null
	,textHeight: null
	,get_textHeight: function() {
		return this._textHeight;
	}
	,_color: null
	,get_color: function() {
		return this._color;
	}
	,set_color: function(value) {
		if(this._color == value) return value;
		this._color = value;
		this.element.style.color = haxe_ui_backend_html5_HtmlUtils.color(this._color);
		return value;
	}
	,_rawFontName: null
	,_fontName: null
	,get_fontName: function() {
		return this._fontName;
	}
	,set_fontName: function(value) {
		if(this._rawFontName == value) {
			this.measureText();
			return value;
		}
		this._rawFontName = value;
		var customFont = false;
		if(value.indexOf(".") != -1) {
			customFont = true;
			var cssName = value.split("/").pop();
			var n = cssName.lastIndexOf(".");
			if(n != -1) cssName = cssName.substring(0,n);
			if(haxe_ui_backend_TextDisplayBase.ADDED_FONTS.exists(value) == false) {
				var css = "@font-face { font-family: \"" + cssName + "\"; src: url(\"" + value + "\"); }";
				var style = window.document.createElement("style");
				window.document.head.appendChild(style);
				style.innerHTML = css;
				haxe_ui_backend_TextDisplayBase.ADDED_FONTS.set(value,cssName);
			}
			value = cssName;
		}
		if(this._fontName == value) {
			this.measureText();
			return value;
		}
		this._fontName = value;
		this.element.style.fontFamily = this._fontName;
		this.measureText();
		this.parentComponent.invalidateLayout();
		if(customFont == true) {
			if(this._checkSizeTimer == null) {
				this._originalSize = this.element.clientWidth;
				this._checkSizeTimer = new haxe_Timer(10);
				this._checkSizeTimer.run = $bind(this,this.checkSize);
			}
		}
		return value;
	}
	,_checkSizeTimer: null
	,_checkSizeCounter: null
	,_originalSize: null
	,checkSize: function() {
		if(this.element.clientWidth != this._originalSize) {
			this._checkSizeCounter = 0;
			this._checkSizeTimer.stop();
			this._checkSizeTimer = null;
			return;
		}
		this._checkSizeCounter++;
		if(this._checkSizeCounter >= 50) {
			this._checkSizeCounter = 0;
			this._checkSizeTimer.stop();
			this._checkSizeTimer = null;
			return;
		}
	}
	,_fontSize: null
	,get_fontSize: function() {
		return this._fontSize;
	}
	,set_fontSize: function(value) {
		if(this._fontSize == value) return value;
		this._fontSize = value;
		this.element.style.fontSize = value + "px";
		this.measureText();
		return value;
	}
	,updatePos: function() {
		var style = this.element.style;
		style.left = "" + this._left + "px";
		style.top = "" + this._top + "px";
	}
	,updateSize: function() {
		var style = this.element.style;
		if(this.get_width() > 0) style.width = haxe_ui_backend_html5_HtmlUtils.px(this.get_width());
		if(this.get_height() > 0) style.height = haxe_ui_backend_html5_HtmlUtils.px(this.get_height());
	}
	,measureText: function() {
		var t = this._text;
		if(t == null || t.length == 0) t = " ";
		var div = window.document.createElement("div");
		div.style.fontFamily = this.element.style.fontFamily;
		div.style.fontSize = this.element.style.fontSize;
		div.innerHTML = t;
		div.style.position = "absolute";
		div.style.top = "-99999px";
		div.style.left = "-99999px";
		window.document.body.appendChild(div);
		this._textWidth = div.clientWidth + 2;
		this._textHeight = div.clientHeight - 1;
		haxe_ui_backend_html5_HtmlUtils.removeElement(div);
	}
	,__class__: haxe_ui_backend_TextDisplayBase
	,__properties__: {set_fontSize:"set_fontSize",get_fontSize:"get_fontSize",set_fontName:"set_fontName",get_fontName:"get_fontName",set_color:"set_color",get_color:"get_color",get_textHeight:"get_textHeight",get_textWidth:"get_textWidth",set_height:"set_height",get_height:"get_height",set_width:"set_width",get_width:"get_width",set_top:"set_top",get_top:"get_top",set_left:"set_left",get_left:"get_left",set_text:"set_text",get_text:"get_text"}
};
var haxe_ui_backend_TextInputBase = function() {
	haxe_ui_backend_TextDisplayBase.call(this);
	this.element.contentEditable = "true";
	this.element.style.outline = "none";
	this.element.style.marginTop = "-1px";
	this.element.style.marginLeft = "-1px";
	this.element.style.whiteSpace = "nowrap";
	this.element.style.overflow = "hidden";
	this.element.style.cursor = "initial";
};
$hxClasses["haxe.ui.backend.TextInputBase"] = haxe_ui_backend_TextInputBase;
haxe_ui_backend_TextInputBase.__name__ = ["haxe","ui","backend","TextInputBase"];
haxe_ui_backend_TextInputBase.__super__ = haxe_ui_backend_TextDisplayBase;
haxe_ui_backend_TextInputBase.prototype = $extend(haxe_ui_backend_TextDisplayBase.prototype,{
	__class__: haxe_ui_backend_TextInputBase
});
var haxe_ui_backend_TimerBase = function(delay,callback) {
	this._timer = new haxe_Timer(delay);
	this._timer.run = function() {
		callback();
	};
};
$hxClasses["haxe.ui.backend.TimerBase"] = haxe_ui_backend_TimerBase;
haxe_ui_backend_TimerBase.__name__ = ["haxe","ui","backend","TimerBase"];
haxe_ui_backend_TimerBase.prototype = {
	_timer: null
	,stop: function() {
		this._timer.stop();
	}
	,__class__: haxe_ui_backend_TimerBase
};
var haxe_ui_backend_html5_EventMapper = function() { };
$hxClasses["haxe.ui.backend.html5.EventMapper"] = haxe_ui_backend_html5_EventMapper;
haxe_ui_backend_html5_EventMapper.__name__ = ["haxe","ui","backend","html5","EventMapper"];
var haxe_ui_backend_html5_HtmlUtils = function() { };
$hxClasses["haxe.ui.backend.html5.HtmlUtils"] = haxe_ui_backend_html5_HtmlUtils;
haxe_ui_backend_html5_HtmlUtils.__name__ = ["haxe","ui","backend","html5","HtmlUtils"];
haxe_ui_backend_html5_HtmlUtils.px = function(value) {
	return "" + value + "px";
};
haxe_ui_backend_html5_HtmlUtils.color = function(value) {
	return "#" + StringTools.hex(value,6);
};
haxe_ui_backend_html5_HtmlUtils.rgba = function(value,alpha) {
	if(alpha == null) alpha = 1;
	var r = value >> 16 & 255;
	var g = value >> 8 & 255;
	var b = value & 255;
	return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
};
haxe_ui_backend_html5_HtmlUtils.measureText = function(text,addWidth,addHeight) {
	if(addHeight == null) addHeight = 0;
	if(addWidth == null) addWidth = 0;
	var div = window.document.createElement("div");
	div.innerHTML = text;
	div.style.position = "absolute";
	div.style.top = "-99999px";
	div.style.left = "-99999px";
	window.document.body.appendChild(div);
	var size = new haxe_ui_util_Size(div.clientWidth + addWidth,div.clientHeight + addHeight);
	haxe_ui_backend_html5_HtmlUtils.removeElement(div);
	return size;
};
haxe_ui_backend_html5_HtmlUtils.swapElements = function(el1,el2) {
	el2.parentNode.insertBefore(el2,el1);
};
haxe_ui_backend_html5_HtmlUtils.removeElement = function(el) {
	if(el.parentElement != null) el.parentElement.removeChild(el);
};
var haxe_ui_backend_html5_StyleHelper = function() { };
$hxClasses["haxe.ui.backend.html5.StyleHelper"] = haxe_ui_backend_html5_StyleHelper;
haxe_ui_backend_html5_StyleHelper.__name__ = ["haxe","ui","backend","html5","StyleHelper"];
haxe_ui_backend_html5_StyleHelper.apply = function(component,width,height,style) {
	var parent;
	parent = (js_Boot.__cast(component , haxe_ui_core_Component)).parentComponent;
	var element = component.element;
	var css = element.style;
	css.width = "" + width + "px";
	css.height = "" + height + "px";
	if(style.borderLeftSize != null && style.borderLeftSize == style.borderRightSize && style.borderLeftSize == style.borderBottomSize && style.borderLeftSize == style.borderTopSize) {
		if(style.borderLeftSize > 0) {
			css.borderWidth = "" + style.borderLeftSize + "px";
			css.borderStyle = "solid";
		} else {
			css.removeProperty("border-width");
			css.removeProperty("border-style");
		}
	} else if(style.borderLeftSize == null && style.borderRightSize == null && style.borderBottomSize == null && style.borderTopSize == null) {
		css.removeProperty("border-width");
		css.removeProperty("border-style");
	} else {
		if(style.borderTopSize != null && style.borderTopSize > 0) {
			css.borderTopWidth = "" + style.borderTopSize + "px";
			css.borderTopStyle = "solid";
		} else {
			css.removeProperty("border-top-width");
			css.removeProperty("border-top-style");
		}
		if(style.borderLeftSize != null && style.borderLeftSize > 0) {
			css.borderLeftWidth = "" + style.borderLeftSize + "px";
			css.borderLeftStyle = "solid";
		} else {
			css.removeProperty("border-left-width");
			css.removeProperty("border-left-style");
		}
		if(style.borderBottomSize != null && style.borderBottomSize > 0) {
			css.borderBottomWidth = "" + style.borderBottomSize + "px";
			css.borderBottomStyle = "solid";
		} else {
			css.removeProperty("border-bottom-width");
			css.removeProperty("border-bottom-style");
		}
		if(style.borderRightSize != null && style.borderRightSize > 0) {
			css.borderRightWidth = "" + style.borderRightSize + "px";
			css.borderRightStyle = "solid";
		} else {
			css.removeProperty("border-right-width");
			css.removeProperty("border-right-style");
		}
	}
	if(style.borderLeftColor != null && style.borderLeftColor == style.borderRightColor && style.borderLeftColor == style.borderBottomColor && style.borderLeftColor == style.borderTopColor) css.borderColor = haxe_ui_backend_html5_HtmlUtils.color(style.borderLeftColor); else if(style.borderLeftColor == null && style.borderRightColor == null && style.borderBottomColor == null && style.borderTopColor == null) css.removeProperty("border-color"); else {
		if(style.borderTopColor != null) css.borderTopColor = haxe_ui_backend_html5_HtmlUtils.color(style.borderTopColor); else css.removeProperty("border-top-color");
		if(style.borderLeftColor != null) css.borderLeftColor = haxe_ui_backend_html5_HtmlUtils.color(style.borderLeftColor); else css.removeProperty("border-left-color");
		if(style.borderBottomColor != null) css.borderBottomColor = haxe_ui_backend_html5_HtmlUtils.color(style.borderBottomColor); else css.removeProperty("border-bottom-color");
		if(style.borderRightColor != null) css.borderRightColor = haxe_ui_backend_html5_HtmlUtils.color(style.borderRightColor); else css.removeProperty("border-right-color");
	}
	if(style.backgroundColor != null) {
		if(style.backgroundColorEnd != null && style.backgroundColorEnd != style.backgroundColor) {
			css.removeProperty("background-color");
			var gradientStyle = style.backgroundGradientStyle;
			if(gradientStyle == null) gradientStyle = "vertical";
			if(gradientStyle == "vertical") css.background = "linear-gradient(to bottom, " + haxe_ui_backend_html5_HtmlUtils.color(style.backgroundColor) + ", " + haxe_ui_backend_html5_HtmlUtils.color(style.backgroundColorEnd) + ")"; else if(gradientStyle == "horizontal") css.background = "linear-gradient(to right, " + haxe_ui_backend_html5_HtmlUtils.color(style.backgroundColor) + ", " + haxe_ui_backend_html5_HtmlUtils.color(style.backgroundColorEnd) + ")";
		} else {
			css.removeProperty("background");
			css.backgroundColor = haxe_ui_backend_html5_HtmlUtils.color(style.backgroundColor);
		}
	} else {
		css.removeProperty("background");
		css.removeProperty("background-color");
	}
	if(style.borderRadius != null && style.borderRadius > 0) css.borderRadius = "" + style.borderRadius + "px"; else css.removeProperty("border-radius");
	if(style.backgroundImage != null) haxe_ui_Toolkit.get_assets().getImage(style.backgroundImage,function(imageInfo) {
		if(imageInfo == null) return;
		var imageRect = new haxe_ui_util_Rectangle(0,0,imageInfo.width,imageInfo.height);
		if(style.backgroundImageClipTop != null && style.backgroundImageClipLeft != null && style.backgroundImageClipBottom != null && style.backgroundImageClipRight != null) imageRect = new haxe_ui_util_Rectangle(style.backgroundImageClipLeft,style.backgroundImageClipTop,style.backgroundImageClipRight - style.backgroundImageClipLeft,style.backgroundImageClipBottom - style.backgroundImageClipTop);
		var slice = null;
		if(style.backgroundImageSliceTop != null && style.backgroundImageSliceLeft != null && style.backgroundImageSliceBottom != null && style.backgroundImageSliceRight != null) slice = new haxe_ui_util_Rectangle(style.backgroundImageSliceLeft,style.backgroundImageSliceTop,style.backgroundImageSliceRight - style.backgroundImageSliceLeft,style.backgroundImageSliceBottom - style.backgroundImageSliceTop);
		if(slice == null) {
			if(imageRect.width == imageInfo.width && imageRect.height == imageInfo.height) {
				css.backgroundImage = "url(" + imageInfo.data.src + ")";
				if(style.backgroundImageRepeat == null) css.backgroundRepeat = "no-repeat"; else if(style.backgroundImageRepeat == "repeat") css.backgroundRepeat = "repeat"; else if(style.backgroundImageRepeat == "stretch") {
					css.backgroundRepeat = "no-repeat";
					css.backgroundSize = "" + ("" + width + "px") + " " + ("" + height + "px");
				}
			} else {
				var canvas;
				var _this = window.document;
				canvas = _this.createElement("canvas");
				canvas.width = width;
				canvas.height = height;
				var ctx = canvas.getContext("2d",null);
				haxe_ui_backend_html5_StyleHelper.paintBitmap(ctx,imageInfo.data,imageRect,new haxe_ui_util_Rectangle(0,0,width,height));
				var data = canvas.toDataURL();
				css.backgroundImage = "url(" + data + ")";
			}
		} else {
			var rects = haxe_ui_util_Slice9.buildRects(width,height,imageRect.width,imageRect.height,slice);
			var srcRects = rects.src;
			var dstRects = rects.dst;
			var canvas1;
			var _this1 = window.document;
			canvas1 = _this1.createElement("canvas");
			canvas1.width = width;
			canvas1.height = height;
			var ctx1 = canvas1.getContext("2d",null);
			var _g1 = 0;
			var _g = srcRects.length;
			while(_g1 < _g) {
				var i = _g1++;
				var srcRect = new haxe_ui_util_Rectangle(srcRects[i].left + imageRect.left,srcRects[i].top + imageRect.top,srcRects[i].width,srcRects[i].height);
				var dstRect = dstRects[i];
				haxe_ui_backend_html5_StyleHelper.paintBitmap(ctx1,imageInfo.data,srcRect,dstRect);
			}
			var data1 = canvas1.toDataURL();
			css.backgroundImage = "url(" + data1 + ")";
		}
	});
};
haxe_ui_backend_html5_StyleHelper.paintBitmap = function(ctx,img,srcRect,dstRect) {
	ctx.drawImage(img,srcRect.left,srcRect.top,srcRect.width,srcRect.height,dstRect.left,dstRect.top,dstRect.width,dstRect.height);
};
var haxe_ui_backend_html5_UserAgent = function() {
	var ua = window.navigator.userAgent;
	haxe_Log.trace(ua,{ fileName : "UserAgent.hx", lineNumber : 18, className : "haxe.ui.backend.html5.UserAgent", methodName : "new"});
	if(ua.indexOf("Opera") != -1 || ua.indexOf("OPR") != -1) this._opera = true; else if(ua.indexOf("Chrome") != -1) this._chrome = true; else if(ua.indexOf("Safari") != -1) this._safari = true; else if(ua.indexOf("Firefox") != -1) this._firefox = true; else if(ua.indexOf("MSIE") != -1) this._msie = true; else this._unknown = true;
};
$hxClasses["haxe.ui.backend.html5.UserAgent"] = haxe_ui_backend_html5_UserAgent;
haxe_ui_backend_html5_UserAgent.__name__ = ["haxe","ui","backend","html5","UserAgent"];
haxe_ui_backend_html5_UserAgent.__properties__ = {get_instance:"get_instance"}
haxe_ui_backend_html5_UserAgent.get_instance = function() {
	if(haxe_ui_backend_html5_UserAgent._instance == null) haxe_ui_backend_html5_UserAgent._instance = new haxe_ui_backend_html5_UserAgent();
	return haxe_ui_backend_html5_UserAgent._instance;
};
haxe_ui_backend_html5_UserAgent.prototype = {
	_opera: null
	,opera: null
	,get_opera: function() {
		return this._opera;
	}
	,_chrome: null
	,chrome: null
	,get_chrome: function() {
		return this._chrome;
	}
	,_safari: null
	,safari: null
	,get_safari: function() {
		return this._safari;
	}
	,_firefox: null
	,firefox: null
	,get_firefox: function() {
		return this._firefox;
	}
	,_msie: null
	,msie: null
	,get_msie: function() {
		return this._msie;
	}
	,_unknown: null
	,unknown: null
	,get_unknown: function() {
		return this._unknown;
	}
	,__class__: haxe_ui_backend_html5_UserAgent
	,__properties__: {get_unknown:"get_unknown",get_msie:"get_msie",get_firefox:"get_firefox",get_safari:"get_safari",get_chrome:"get_chrome",get_opera:"get_opera"}
};
var haxe_ui_backend_html5_native_NativeElement = function(component) {
	this.config = null;
	this._component = component;
};
$hxClasses["haxe.ui.backend.html5.native.NativeElement"] = haxe_ui_backend_html5_native_NativeElement;
haxe_ui_backend_html5_native_NativeElement.__name__ = ["haxe","ui","backend","html5","native","NativeElement"];
haxe_ui_backend_html5_native_NativeElement.prototype = {
	_component: null
	,config: null
	,create: function() {
		var nodeType = this.getConfigValue("nodeType","div");
		var el = window.document.createElement(nodeType);
		var type = this.getConfigValue("type");
		if(type != null) el.setAttribute("type",type);
		var orient = this.getConfigValue("orient");
		if(orient != null) el.setAttribute("orient",orient);
		var style = this.getConfigValue("style");
		if(style != null) {
			var styles = style.split(";");
			var _g = 0;
			while(_g < styles.length) {
				var s = styles[_g];
				++_g;
				s = StringTools.trim(s);
				if(s.length == 0) continue;
				var parts = s.split(":");
				el.style.setProperty(StringTools.trim(parts[0]),StringTools.trim(parts[1]));
			}
		}
		if(nodeType == "input" && type == "range") el.addEventListener("change",$bind(this,this.onChange));
		return el;
	}
	,paint: function() {
		var el = this._component.element;
		var style = this._component.get_style();
		var nodeType = el.nodeName.toLowerCase();
		if(nodeType == "button") {
			var list = el.getElementsByTagName("span");
			if(list != null && list.length > 0) {
				var span = list.item(0);
				if(style.color != null) span.style.color = haxe_ui_backend_html5_HtmlUtils.color(style.color);
			}
		} else if(nodeType == "label") {
			if(style.color != null) el.style.color = haxe_ui_backend_html5_HtmlUtils.color(style.color);
		}
	}
	,onChange: function(e) {
		if(js_Boot.__instanceof(this._component,haxe_ui_components_Slider)) {
			var input = this._component.element;
			(js_Boot.__cast(this._component , haxe_ui_components_Slider)).set_pos(parseFloat(input.value));
		}
	}
	,getConfigValue: function(name,defaultValue) {
		if(this.config == null) return defaultValue;
		if(this.config.exists(name) == false) return defaultValue;
		return this.config.get(name);
	}
	,__class__: haxe_ui_backend_html5_native_NativeElement
};
var haxe_ui_backend_html5_native_LabeledInputElement = function(component) {
	haxe_ui_backend_html5_native_NativeElement.call(this,component);
};
$hxClasses["haxe.ui.backend.html5.native.LabeledInputElement"] = haxe_ui_backend_html5_native_LabeledInputElement;
haxe_ui_backend_html5_native_LabeledInputElement.__name__ = ["haxe","ui","backend","html5","native","LabeledInputElement"];
haxe_ui_backend_html5_native_LabeledInputElement.__super__ = haxe_ui_backend_html5_native_NativeElement;
haxe_ui_backend_html5_native_LabeledInputElement.prototype = $extend(haxe_ui_backend_html5_native_NativeElement.prototype,{
	create: function() {
		var type = this.getConfigValue("type","button");
		var input;
		var _this = window.document;
		input = _this.createElement("input");
		input.style.display = "inline";
		input.style.verticalAlign = "middle";
		input.style.margin = "0";
		input.style.marginRight = "2px";
		input.type = type;
		var label;
		var _this1 = window.document;
		label = _this1.createElement("label");
		label.appendChild(input);
		if(type == "checkbox" || type == "radio") input.addEventListener("change",$bind(this,this.onChange));
		return label;
	}
	,onChange: function(e) {
		var type = this.getConfigValue("type","button");
		if(type == "checkbox" || type == "radio") {
			var label = this._component.element;
			var input = label.getElementsByTagName("input").item(0);
			if(type == "checkbox") {
				var checkbox = this._component;
				checkbox.set_selected(input.checked);
			} else if(type == "radio") {
				var optionbox = this._component;
				optionbox.set_selected(input.checked);
			}
		}
	}
	,__class__: haxe_ui_backend_html5_native_LabeledInputElement
});
var haxe_ui_core_Behaviour = function(component) {
	this.config = null;
	this._component = component;
};
$hxClasses["haxe.ui.core.Behaviour"] = haxe_ui_core_Behaviour;
haxe_ui_core_Behaviour.__name__ = ["haxe","ui","core","Behaviour"];
haxe_ui_core_Behaviour.prototype = {
	config: null
	,_component: null
	,set: function(value) {
	}
	,get: function() {
		return null;
	}
	,update: function() {
	}
	,getConfigValue: function(name,defaultValue) {
		if(this.config == null) return defaultValue;
		if(this.config.exists(name) == false) return defaultValue;
		return this.config.get(name);
	}
	,getConfigValueBool: function(name,defaultValue) {
		if(defaultValue == null) defaultValue = false;
		var v = defaultValue;
		var s = this.getConfigValue(name);
		if(s != null) v = s == "true";
		return v;
	}
	,__class__: haxe_ui_core_Behaviour
};
var haxe_ui_backend_html5_native_behaviours_ElementAttribute = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.backend.html5.native.behaviours.ElementAttribute"] = haxe_ui_backend_html5_native_behaviours_ElementAttribute;
haxe_ui_backend_html5_native_behaviours_ElementAttribute.__name__ = ["haxe","ui","backend","html5","native","behaviours","ElementAttribute"];
haxe_ui_backend_html5_native_behaviours_ElementAttribute.__super__ = haxe_ui_core_Behaviour;
haxe_ui_backend_html5_native_behaviours_ElementAttribute.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		var el = this._component.element;
		var name = this.getConfigValue("name");
		if(name == null) return;
		var child = this.getConfigValue("child");
		if(child != null) {
			var list = el.getElementsByTagName(child);
			if(list.length == 0) return;
			el = list.item(0);
		}
		if(this.getConfigValueBool("remove",false) == true) {
			if(value != null && (haxe_ui_util__$Variant_Variant_$Impl_$.get_isBool(value) == true && haxe_ui_util__$Variant_Variant_$Impl_$.toBool(value) == true)) el.removeAttribute(name);
			return;
		}
		if(el.nodeName == "INPUT" && value != null) {
			var input = el;
			if(haxe_ui_util__$Variant_Variant_$Impl_$.get_isBool(value) == true && name == "checked") input.checked = haxe_ui_util__$Variant_Variant_$Impl_$.toBool(value); else if(name == "min") input.min = haxe_ui_util__$Variant_Variant_$Impl_$.toString(value); else if(name == "max") input.max = haxe_ui_util__$Variant_Variant_$Impl_$.toString(value); else if(name == "value") input.value = haxe_ui_util__$Variant_Variant_$Impl_$.toString(value);
		}
		if(el.nodeName == "PROGRESS" && value != null) {
			var progress = el;
			if(name == "min") {
			} else if(name == "max") progress.max = haxe_ui_util__$Variant_Variant_$Impl_$.toInt(value); else if(name == "value") progress.value = haxe_ui_util__$Variant_Variant_$Impl_$.toInt(value);
		}
		var removeIfNegative = this.getConfigValueBool("removeIfNegative",false);
		if((value == null || haxe_ui_util__$Variant_Variant_$Impl_$.get_isBool(value) == true && haxe_ui_util__$Variant_Variant_$Impl_$.toBool(value) == false) && removeIfNegative == true) {
			el.removeAttribute(name);
			return;
		}
		if(value != null) el.setAttribute(name,haxe_ui_util__$Variant_Variant_$Impl_$.toString(value));
	}
	,__class__: haxe_ui_backend_html5_native_behaviours_ElementAttribute
});
var haxe_ui_backend_html5_native_behaviours_ElementImage = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.backend.html5.native.behaviours.ElementImage"] = haxe_ui_backend_html5_native_behaviours_ElementImage;
haxe_ui_backend_html5_native_behaviours_ElementImage.__name__ = ["haxe","ui","backend","html5","native","behaviours","ElementImage"];
haxe_ui_backend_html5_native_behaviours_ElementImage.__super__ = haxe_ui_core_Behaviour;
haxe_ui_backend_html5_native_behaviours_ElementImage.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		var _g = this;
		if(haxe_ui_util__$Variant_Variant_$Impl_$.get_isNull(value)) return;
		var el = this._component.element;
		var img = null;
		var list = el.getElementsByTagName("img");
		if(list != null && list.length == 1) img = list.item(0); else {
			var _this = window.document;
			img = _this.createElement("img");
			img.style.display = "inline";
			img.style.verticalAlign = "middle";
			img.style.marginTop = "-1px";
			el.appendChild(img);
		}
		haxe_ui_ToolkitAssets.get_instance().getImage(haxe_ui_util__$Variant_Variant_$Impl_$.toString(value),function(image) {
			img.src = image.data.src;
			_g._component.invalidateLayout();
		});
	}
	,get: function() {
		var el = this._component.element;
		return null;
	}
	,__class__: haxe_ui_backend_html5_native_behaviours_ElementImage
});
var haxe_ui_backend_html5_native_behaviours_ElementText = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.backend.html5.native.behaviours.ElementText"] = haxe_ui_backend_html5_native_behaviours_ElementText;
haxe_ui_backend_html5_native_behaviours_ElementText.__name__ = ["haxe","ui","backend","html5","native","behaviours","ElementText"];
haxe_ui_backend_html5_native_behaviours_ElementText.__super__ = haxe_ui_core_Behaviour;
haxe_ui_backend_html5_native_behaviours_ElementText.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		var el = this._component.element;
		el.textContent = haxe_ui_util__$Variant_Variant_$Impl_$.toString(value);
	}
	,get: function() {
		var el = this._component.element;
		return haxe_ui_util__$Variant_Variant_$Impl_$.fromString(el.textContent);
	}
	,__class__: haxe_ui_backend_html5_native_behaviours_ElementText
});
var haxe_ui_backend_html5_native_behaviours_ElementValue = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.backend.html5.native.behaviours.ElementValue"] = haxe_ui_backend_html5_native_behaviours_ElementValue;
haxe_ui_backend_html5_native_behaviours_ElementValue.__name__ = ["haxe","ui","backend","html5","native","behaviours","ElementValue"];
haxe_ui_backend_html5_native_behaviours_ElementValue.__super__ = haxe_ui_core_Behaviour;
haxe_ui_backend_html5_native_behaviours_ElementValue.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		var el = this._component.element;
		el.setAttribute("value",haxe_ui_util__$Variant_Variant_$Impl_$.toString(value));
	}
	,get: function() {
		var el = this._component.element;
		return haxe_ui_util__$Variant_Variant_$Impl_$.fromString(el.textContent);
	}
	,__class__: haxe_ui_backend_html5_native_behaviours_ElementValue
});
var haxe_ui_backend_html5_native_behaviours_SpanText = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.backend.html5.native.behaviours.SpanText"] = haxe_ui_backend_html5_native_behaviours_SpanText;
haxe_ui_backend_html5_native_behaviours_SpanText.__name__ = ["haxe","ui","backend","html5","native","behaviours","SpanText"];
haxe_ui_backend_html5_native_behaviours_SpanText.__super__ = haxe_ui_core_Behaviour;
haxe_ui_backend_html5_native_behaviours_SpanText.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		var el = this._component.element;
		var span = this.getSpan(el);
		if(span == null) {
			var _this = window.document;
			span = _this.createElement("span");
			span.style.display = "inline-block";
			span.style.verticalAlign = "middle";
			var style = this.getConfigValue("style");
			if(style != null) {
				var styles = style.split(";");
				var _g = 0;
				while(_g < styles.length) {
					var s = styles[_g];
					++_g;
					s = StringTools.trim(s);
					if(s.length == 0) continue;
					var parts = s.split(":");
					span.style.setProperty(StringTools.trim(parts[0]),StringTools.trim(parts[1]));
				}
			}
			el.appendChild(span);
		}
		span.textContent = haxe_ui_util__$Variant_Variant_$Impl_$.toString(value);
	}
	,getSpan: function(el) {
		var span = null;
		var list = el.getElementsByTagName("span");
		if(list.length != 0) span = list.item(0);
		return span;
	}
	,__class__: haxe_ui_backend_html5_native_behaviours_SpanText
});
var haxe_ui_layouts_ILayout = function() { };
$hxClasses["haxe.ui.layouts.ILayout"] = haxe_ui_layouts_ILayout;
haxe_ui_layouts_ILayout.__name__ = ["haxe","ui","layouts","ILayout"];
var haxe_ui_layouts_Layout = function() {
};
$hxClasses["haxe.ui.layouts.Layout"] = haxe_ui_layouts_Layout;
haxe_ui_layouts_Layout.__name__ = ["haxe","ui","layouts","Layout"];
haxe_ui_layouts_Layout.__interfaces__ = [haxe_ui_layouts_ILayout];
haxe_ui_layouts_Layout.prototype = {
	_component: null
	,get_component: function() {
		return this._component;
	}
	,set_component: function(value) {
		this._component = value;
		this.refresh();
		return value;
	}
	,refresh: function() {
		if(this._component != null && this._component.get_isReady() == true) {
			this.resizeChildren();
			this._component.handlePreReposition();
			this.repositionChildren();
			this._component.handlePostReposition();
			if(this.get_component().get_autoWidth() == true || this.get_component().get_autoHeight() == true) {
				var size = this.calcAutoSize();
				var calculatedWidth = null;
				var calculatedHeight = null;
				if(this.get_component().get_autoWidth() == true) calculatedWidth = size.width;
				if(this.get_component().get_autoHeight() == true) calculatedHeight = size.height;
				this.get_component().resizeComponent(calculatedWidth,calculatedHeight);
			}
		}
	}
	,autoSize: function() {
		if(this.get_component().get_isReady() == false) return false;
		var calculatedWidth = null;
		var calculatedHeight = null;
		if(this.get_component().get_autoWidth() == true || this.get_component().get_autoHeight() == true) {
			var size = this.calcAutoSize();
			if(this.get_component().get_autoWidth() == true) calculatedWidth = size.width;
			if(this.get_component().get_autoHeight() == true) calculatedHeight = size.height;
			this.get_component().resizeComponent(calculatedWidth,calculatedHeight);
		}
		return calculatedWidth != null || calculatedHeight != null;
	}
	,marginTop: function(child) {
		if(child == null || child.get_style() == null || child.get_style().marginTop == null) return 0;
		return child.get_style().marginTop;
	}
	,marginLeft: function(child) {
		if(child == null || child.get_style() == null || child.get_style().marginLeft == null) return 0;
		return child.get_style().marginLeft;
	}
	,marginBottom: function(child) {
		if(child == null || child.get_style() == null || child.get_style().marginBottom == null) return 0;
		return child.get_style().marginBottom;
	}
	,marginRight: function(child) {
		if(child == null || child.get_style() == null || child.get_style().marginRight == null) return 0;
		return child.get_style().marginRight;
	}
	,hidden: function(c) {
		if(c == null) c = this.get_component();
		if(c.get_style().hidden == null) return false;
		return c.get_style().hidden;
	}
	,horizontalAlign: function(child) {
		if(child == null || child.get_style() == null || child.get_style().horizontalAlign == null) return "left";
		return child.get_style().horizontalAlign;
	}
	,verticalAlign: function(child) {
		if(child == null || child.get_style() == null || child.get_style().verticalAlign == null) return "top";
		return child.get_style().verticalAlign;
	}
	,paddingLeft: null
	,get_paddingLeft: function() {
		if(this._component == null || this._component.get_style() == null || this._component.get_style().paddingLeft == null) return 0;
		return this._component.get_style().paddingLeft;
	}
	,paddingTop: null
	,get_paddingTop: function() {
		if(this._component == null || this._component.get_style() == null || this._component.get_style().paddingTop == null) return 0;
		return this._component.get_style().paddingTop;
	}
	,paddingBottom: null
	,get_paddingBottom: function() {
		if(this._component == null || this._component.get_style() == null || this._component.get_style().paddingBottom == null) return 0;
		return this._component.get_style().paddingBottom;
	}
	,paddingRight: null
	,get_paddingRight: function() {
		if(this._component == null || this._component.get_style() == null || this._component.get_style().paddingRight == null) return 0;
		return this._component.get_style().paddingRight;
	}
	,horizontalSpacing: null
	,get_horizontalSpacing: function() {
		if(this._component == null || this._component.get_style() == null || this._component.get_style().horizontalSpacing == null) return 0;
		return this._component.get_style().horizontalSpacing;
	}
	,verticalSpacing: null
	,get_verticalSpacing: function() {
		if(this._component == null || this._component.get_style() == null || this._component.get_style().verticalSpacing == null) return 0;
		return this._component.get_style().verticalSpacing;
	}
	,innerWidth: null
	,innerHeight: null
	,get_innerWidth: function() {
		if(this.get_component() == null) return 0;
		return this.get_component().get_componentWidth() - (this.get_paddingLeft() + this.get_paddingRight());
	}
	,get_innerHeight: function() {
		if(this.get_component() == null) return 0;
		var padding = 0;
		if(this.get_component().get_style().paddingTop != null) padding += this.get_component().get_style().paddingTop;
		if(this.get_component().get_style().paddingBottom != null) padding += this.get_component().get_style().paddingBottom;
		var icy = this.get_component().get_componentHeight() - padding;
		return icy;
	}
	,resizeChildren: function() {
		return true;
	}
	,repositionChildren: function() {
	}
	,usableSize: null
	,get_usableSize: function() {
		var ucx = 0;
		if(this._component.get_componentWidth() != null) {
			ucx = this._component.get_componentWidth();
			ucx -= this.get_paddingLeft() + this.get_paddingRight();
		}
		var ucy = 0;
		if(this._component.get_componentHeight() != null) {
			ucy = this._component.get_componentHeight();
			ucy -= this.get_paddingTop() + this.get_paddingBottom();
		}
		return new haxe_ui_util_Size(ucx,ucy);
	}
	,usableWidth: null
	,get_usableWidth: function() {
		return this.get_usableSize().width;
	}
	,usableHeight: null
	,get_usableHeight: function() {
		return this.get_usableSize().height;
	}
	,calcAutoWidth: function() {
		return this.calcAutoSize().width;
	}
	,calcAutoHeight: function() {
		return this.calcAutoSize().height;
	}
	,calcAutoSize: function() {
		var x1 = 16777215;
		var x2 = 0;
		var y1 = 16777215;
		var y2 = 0;
		var _g = 0;
		var _g1 = this.get_component().get_childComponents();
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) continue;
			if(child.get_percentWidth() == null) {
				if(child.get_left() < x1) x1 = child.get_left();
				if(child.get_componentWidth() != null && child.get_left() + child.get_componentWidth() > x2) x2 = child.get_left() + child.get_componentWidth();
			}
			if(child.get_percentHeight() == null) {
				if(child.get_top() < y1) y1 = child.get_top();
				if(child.get_componentHeight() != null && child.get_top() + child.get_componentHeight() > y2) y2 = child.get_top() + child.get_componentHeight();
			}
		}
		if(x1 == 16777215) x1 = 0;
		if(y1 == 16777215) y1 = 0;
		var w = x2 - x1 + (this.get_paddingLeft() + this.get_paddingRight());
		var h = y2 - y1 + (this.get_paddingTop() + this.get_paddingBottom());
		return new haxe_ui_util_Size(w,h);
	}
	,__class__: haxe_ui_layouts_Layout
	,__properties__: {get_usableHeight:"get_usableHeight",get_usableWidth:"get_usableWidth",get_usableSize:"get_usableSize",get_innerHeight:"get_innerHeight",get_innerWidth:"get_innerWidth",get_verticalSpacing:"get_verticalSpacing",get_horizontalSpacing:"get_horizontalSpacing",get_paddingRight:"get_paddingRight",get_paddingBottom:"get_paddingBottom",get_paddingTop:"get_paddingTop",get_paddingLeft:"get_paddingLeft",set_component:"set_component",get_component:"get_component"}
};
var haxe_ui_layouts_DefaultLayout = function() {
	haxe_ui_layouts_Layout.call(this);
};
$hxClasses["haxe.ui.layouts.DefaultLayout"] = haxe_ui_layouts_DefaultLayout;
haxe_ui_layouts_DefaultLayout.__name__ = ["haxe","ui","layouts","DefaultLayout"];
haxe_ui_layouts_DefaultLayout.__super__ = haxe_ui_layouts_Layout;
haxe_ui_layouts_DefaultLayout.prototype = $extend(haxe_ui_layouts_Layout.prototype,{
	resizeChildren: function() {
		var usableSize = this.get_usableSize();
		var resized = false;
		var _g = 0;
		var _g1 = this.get_component().get_childComponents();
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			var cx = null;
			var cy = null;
			if(child.get_percentWidth() != null) {
				cx = usableSize.width * child.get_percentWidth() / 100;
				resized = true;
			}
			if(child.get_percentHeight() != null) {
				cy = usableSize.height * child.get_percentHeight() / 100;
				resized = true;
			}
			child.resizeComponent(cx,cy);
		}
		return resized;
	}
	,repositionChildren: function() {
		var usableSize = this.get_component().get_layout().get_usableSize();
		var _g = 0;
		var _g1 = this.get_component().get_childComponents();
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) continue;
			var xpos = this.get_paddingLeft() + this.marginLeft(child) - this.marginRight(child);
			var ypos = this.get_paddingTop() + this.marginTop(child) - this.marginBottom(child);
			var _g2 = this.horizontalAlign(child);
			switch(_g2) {
			case "center":
				xpos = this.get_component().get_componentWidth() / 2 - child.get_componentWidth() / 2 + this.marginLeft(child) - this.marginRight(child);
				break;
			case "right":
				xpos = this.get_component().get_componentWidth() - (child.get_componentWidth() + this.get_paddingRight() + this.marginLeft(child) - this.marginRight(child));
				break;
			}
			var _g21 = this.verticalAlign(child);
			switch(_g21) {
			case "center":
				ypos = this.get_component().get_componentHeight() / 2 - child.get_componentHeight() / 2 + this.marginTop(child) - this.marginBottom(child);
				break;
			case "bottom":
				ypos = this.get_component().get_componentHeight() / 2 - child.get_componentHeight() / 2 + this.marginTop(child) - this.marginBottom(child);
				break;
			}
			child.moveComponent(xpos,ypos);
		}
	}
	,__class__: haxe_ui_layouts_DefaultLayout
});
var haxe_ui_backend_html5_native_layouts_ButtonLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
};
$hxClasses["haxe.ui.backend.html5.native.layouts.ButtonLayout"] = haxe_ui_backend_html5_native_layouts_ButtonLayout;
haxe_ui_backend_html5_native_layouts_ButtonLayout.__name__ = ["haxe","ui","backend","html5","native","layouts","ButtonLayout"];
haxe_ui_backend_html5_native_layouts_ButtonLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_backend_html5_native_layouts_ButtonLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	calcAutoSize: function() {
		var textSize = haxe_ui_backend_html5_HtmlUtils.measureText(this.get_component().get_text());
		var iconCX = this.getIconWidth();
		var iconCY = this.getIconHeight();
		var cx = textSize.width;
		var cy = textSize.height;
		var iconPosition = this.get_component().get_style().iconPosition;
		if(iconPosition == "top" || iconPosition == "bottom") {
			if(iconCX > cx) cx = iconCX;
			cy += iconCY + this.get_component().get_style().verticalSpacing;
		} else {
			cx += iconCX + this.get_component().get_style().horizontalSpacing;
			if(iconCY > cy) cy = iconCY;
		}
		var size = new haxe_ui_util_Size(cx,cy);
		size.width += this.get_paddingLeft() + this.get_paddingRight() + 6;
		size.height += this.get_paddingTop() + this.get_paddingBottom() + 2;
		return size;
	}
	,repositionChildren: function() {
		var el = this.get_component().element;
		if(el.childElementCount == 2) {
			var first = el.firstElementChild;
			var last = el.lastElementChild;
			var _g = this.get_component().get_style().iconPosition;
			if(_g == null) {
				if(js_Boot.__instanceof(first,HTMLImageElement) == false) haxe_ui_backend_html5_HtmlUtils.swapElements(first,last);
			} else switch(_g) {
			case "top":case "left":
				if(js_Boot.__instanceof(first,HTMLImageElement) == false) haxe_ui_backend_html5_HtmlUtils.swapElements(first,last);
				break;
			case "right":case "bottom":
				if(js_Boot.__instanceof(last,HTMLImageElement) == false) haxe_ui_backend_html5_HtmlUtils.swapElements(last,first);
				break;
			}
			var img = this.getIcon();
			if(img != null) {
				var _g1 = this.get_component().get_style().iconPosition;
				if(_g1 != null) switch(_g1) {
				case "top":
					img.style.marginBottom = haxe_ui_backend_html5_HtmlUtils.px(this._component.get_style().verticalSpacing);
					break;
				case "left":
					img.style.marginRight = haxe_ui_backend_html5_HtmlUtils.px(this._component.get_style().horizontalSpacing);
					break;
				case "bottom":
					img.style.marginTop = haxe_ui_backend_html5_HtmlUtils.px(this._component.get_style().verticalSpacing);
					break;
				case "right":
					img.style.marginLeft = haxe_ui_backend_html5_HtmlUtils.px(this._component.get_style().horizontalSpacing);
					break;
				default:
					img.style.marginRight = haxe_ui_backend_html5_HtmlUtils.px(this._component.get_style().horizontalSpacing);
				} else img.style.marginRight = haxe_ui_backend_html5_HtmlUtils.px(this._component.get_style().horizontalSpacing);
			}
			var text = this.getText();
			if(text != null) {
				var _g2 = this.get_component().get_style().iconPosition;
				if(_g2 == null) text.style.display = "inline-block"; else switch(_g2) {
				case "left":case "right":
					text.style.display = "inline-block";
					break;
				case "top":case "bottom":
					text.style.display = "block";
					break;
				}
			}
		}
	}
	,getIconWidth: function() {
		var cx = 0;
		var icon = this.getIcon();
		if(icon != null) cx = icon.offsetWidth;
		return cx;
	}
	,getIconHeight: function() {
		var cy = 0;
		var icon = this.getIcon();
		if(icon != null) cy = icon.offsetHeight;
		return cy;
	}
	,getIcon: function() {
		var img = null;
		var el = this.get_component().element;
		var list = el.getElementsByTagName("img");
		if(list != null && list.length == 1) img = list.item(0);
		return img;
	}
	,getText: function() {
		var span = null;
		var el = this.get_component().element;
		var list = el.getElementsByTagName("span");
		if(list != null && list.length == 1) span = list.item(0);
		return span;
	}
	,__class__: haxe_ui_backend_html5_native_layouts_ButtonLayout
});
var haxe_ui_layouts_DelegateLayoutSize = function() { };
$hxClasses["haxe.ui.layouts.DelegateLayoutSize"] = haxe_ui_layouts_DelegateLayoutSize;
haxe_ui_layouts_DelegateLayoutSize.__name__ = ["haxe","ui","layouts","DelegateLayoutSize"];
haxe_ui_layouts_DelegateLayoutSize.prototype = {
	component: null
	,config: null
	,width: null
	,get_width: function() {
		return 0;
	}
	,height: null
	,get_height: function() {
		return 0;
	}
	,usableWidthModifier: null
	,get_usableWidthModifier: function() {
		return 0;
	}
	,usableHeightModifier: null
	,get_usableHeightModifier: function() {
		return 0;
	}
	,getString: function(name,defaultValue) {
		if(this.config == null) return defaultValue;
		if(this.config.exists(name) == false) return defaultValue;
		return this.config.get(name);
	}
	,getInt: function(name,defaultValue) {
		if(defaultValue == null) defaultValue = 0;
		var v = this.getString(name);
		if(v == null) return defaultValue;
		return Std.parseInt(v);
	}
	,getBool: function(name,defaultValue) {
		if(defaultValue == null) defaultValue = false;
		var v = this.getString(name);
		if(v == null) return defaultValue;
		return v == "true";
	}
	,__class__: haxe_ui_layouts_DelegateLayoutSize
	,__properties__: {get_usableHeightModifier:"get_usableHeightModifier",get_usableWidthModifier:"get_usableWidthModifier",get_height:"get_height",get_width:"get_width"}
};
var haxe_ui_backend_html5_native_size_ButtonSize = function() {
};
$hxClasses["haxe.ui.backend.html5.native.size.ButtonSize"] = haxe_ui_backend_html5_native_size_ButtonSize;
haxe_ui_backend_html5_native_size_ButtonSize.__name__ = ["haxe","ui","backend","html5","native","size","ButtonSize"];
haxe_ui_backend_html5_native_size_ButtonSize.__super__ = haxe_ui_layouts_DelegateLayoutSize;
haxe_ui_backend_html5_native_size_ButtonSize.prototype = $extend(haxe_ui_layouts_DelegateLayoutSize.prototype,{
	get_width: function() {
		var size = haxe_ui_backend_html5_HtmlUtils.measureText(this.component.get_text());
		var iconCX = this.getIconWidth();
		var cx = size.width;
		var iconPosition = this.component.get_style().iconPosition;
		if(iconPosition == "top" || iconPosition == "bottom") {
			if(iconCX > cx) cx = iconCX;
		} else cx += iconCX + this.component.get_style().horizontalSpacing;
		return cx + this.getInt("incrementWidthBy");
	}
	,get_height: function() {
		var size = haxe_ui_backend_html5_HtmlUtils.measureText(this.component.get_text());
		var iconCY = this.getIconHeight();
		var cy = size.height;
		var iconPosition = this.component.get_style().iconPosition;
		if(iconPosition == "top" || iconPosition == "bottom") cy += iconCY + this.component.get_style().verticalSpacing; else if(iconCY > cy) cy = iconCY;
		return cy + this.getInt("incrementHeightBy");
	}
	,getIconWidth: function() {
		var cx = 0;
		var icon = this.getIcon();
		if(icon != null) cx = icon.offsetWidth;
		return cx;
	}
	,getIconHeight: function() {
		var cy = 0;
		var icon = this.getIcon();
		if(icon != null) cy = icon.offsetHeight;
		return cy;
	}
	,getIcon: function() {
		var img = null;
		var el = this.component.element;
		var list = el.getElementsByTagName("img");
		if(list != null && list.length == 1) img = list.item(0);
		return img;
	}
	,__class__: haxe_ui_backend_html5_native_size_ButtonSize
});
var haxe_ui_backend_html5_native_size_ComponentSize = function() {
};
$hxClasses["haxe.ui.backend.html5.native.size.ComponentSize"] = haxe_ui_backend_html5_native_size_ComponentSize;
haxe_ui_backend_html5_native_size_ComponentSize.__name__ = ["haxe","ui","backend","html5","native","size","ComponentSize"];
haxe_ui_backend_html5_native_size_ComponentSize.__super__ = haxe_ui_layouts_DelegateLayoutSize;
haxe_ui_backend_html5_native_size_ComponentSize.prototype = $extend(haxe_ui_layouts_DelegateLayoutSize.prototype,{
	get_width: function() {
		var w = this.component.get_componentWidth();
		if(w == null || w <= 0) w = this.getInt("defaultWidth");
		return w;
	}
	,get_height: function() {
		var h = this.component.get_componentHeight();
		if(h == null || h <= 0) h = this.getInt("defaultHeight");
		return h;
	}
	,__class__: haxe_ui_backend_html5_native_size_ComponentSize
});
var haxe_ui_backend_html5_native_size_ElementSize = function() {
};
$hxClasses["haxe.ui.backend.html5.native.size.ElementSize"] = haxe_ui_backend_html5_native_size_ElementSize;
haxe_ui_backend_html5_native_size_ElementSize.__name__ = ["haxe","ui","backend","html5","native","size","ElementSize"];
haxe_ui_backend_html5_native_size_ElementSize.__super__ = haxe_ui_layouts_DelegateLayoutSize;
haxe_ui_backend_html5_native_size_ElementSize.prototype = $extend(haxe_ui_layouts_DelegateLayoutSize.prototype,{
	get_width: function() {
		var w = this.component.element.offsetWidth;
		if(js_Boot.__instanceof(this.component,haxe_ui_components_VSlider)) {
			if(w == this.component.element.offsetHeight) w = 21;
		} else if(js_Boot.__instanceof(this.component,haxe_ui_components_VProgress)) {
			if(this.component.element.offsetWidth > this.component.element.offsetHeight) w = this.component.element.offsetHeight;
		}
		return w;
	}
	,get_height: function() {
		var h = this.component.element.offsetHeight;
		if(js_Boot.__instanceof(this.component,haxe_ui_components_VProgress)) {
			if(this.component.element.offsetWidth > this.component.element.offsetHeight) h = this.component.element.offsetWidth;
		}
		return h;
	}
	,__class__: haxe_ui_backend_html5_native_size_ElementSize
});
var haxe_ui_backend_html5_native_size_FontHeight = function() { };
$hxClasses["haxe.ui.backend.html5.native.size.FontHeight"] = haxe_ui_backend_html5_native_size_FontHeight;
haxe_ui_backend_html5_native_size_FontHeight.__name__ = ["haxe","ui","backend","html5","native","size","FontHeight"];
haxe_ui_backend_html5_native_size_FontHeight.__super__ = haxe_ui_layouts_DelegateLayoutSize;
haxe_ui_backend_html5_native_size_FontHeight.prototype = $extend(haxe_ui_layouts_DelegateLayoutSize.prototype,{
	get_width: function() {
		return this.component.get_width();
	}
	,get_height: function() {
		return haxe_ui_backend_html5_HtmlUtils.measureText("|").height + this.getInt("incrementBy");
	}
	,__class__: haxe_ui_backend_html5_native_size_FontHeight
});
var haxe_ui_backend_html5_native_size_TextSize = function() {
};
$hxClasses["haxe.ui.backend.html5.native.size.TextSize"] = haxe_ui_backend_html5_native_size_TextSize;
haxe_ui_backend_html5_native_size_TextSize.__name__ = ["haxe","ui","backend","html5","native","size","TextSize"];
haxe_ui_backend_html5_native_size_TextSize.__super__ = haxe_ui_layouts_DelegateLayoutSize;
haxe_ui_backend_html5_native_size_TextSize.prototype = $extend(haxe_ui_layouts_DelegateLayoutSize.prototype,{
	get_width: function() {
		var size = haxe_ui_backend_html5_HtmlUtils.measureText(this.component.get_text());
		return size.width + this.getInt("incrementWidthBy");
	}
	,get_height: function() {
		var size = haxe_ui_backend_html5_HtmlUtils.measureText(this.component.get_text());
		return size.height + this.getInt("incrementHeightBy");
	}
	,__class__: haxe_ui_backend_html5_native_size_TextSize
});
var haxe_ui_core_IClonable = function() { };
$hxClasses["haxe.ui.core.IClonable"] = haxe_ui_core_IClonable;
haxe_ui_core_IClonable.__name__ = ["haxe","ui","core","IClonable"];
haxe_ui_core_IClonable.prototype = {
	cloneComponent: null
	,self: null
	,__class__: haxe_ui_core_IClonable
};
var haxe_ui_core_IComponentBase = function() { };
$hxClasses["haxe.ui.core.IComponentBase"] = haxe_ui_core_IComponentBase;
haxe_ui_core_IComponentBase.__name__ = ["haxe","ui","core","IComponentBase"];
haxe_ui_core_IComponentBase.prototype = {
	mapEvent: null
	,handleAddComponent: null
	,__class__: haxe_ui_core_IComponentBase
};
var haxe_ui_core_Component = function() {
	this._displayingInvalidating = false;
	this._layoutReinvalidation = false;
	this._layoutInvalidating = false;
	this.scriptAccess = true;
	this._top = 0;
	this._left = 0;
	this._ready = false;
	this._includeInLayout = true;
	this.classes = [];
	this.customStyle = new haxe_ui_styles_Style();
	this._hidden = false;
	this.parentComponent = null;
	this._clipRect = null;
	this._text = null;
	this._id = null;
	this.userData = null;
	this._animatable = true;
	this._native = null;
	this._behaviours = new haxe_ds_StringMap();
	this._defaultBehaviours = new haxe_ds_StringMap();
	haxe_ui_backend_ComponentBase.call(this);
	var parts = Type.getClassName(js_Boot.getClass(this)).split(".");
	var className = parts[parts.length - 1].toLowerCase();
	this.addClass(className,false);
	this.set_layout(new haxe_ui_layouts_DefaultLayout());
	this.createDefaults();
	var s = haxe_ui_Toolkit.styleSheet.applyClasses(this,false);
	if(s["native"] != null && this.get_hasNativeEntry() == true) this.set_native(s["native"]); else this.create();
};
$hxClasses["haxe.ui.core.Component"] = haxe_ui_core_Component;
haxe_ui_core_Component.__name__ = ["haxe","ui","core","Component"];
haxe_ui_core_Component.__interfaces__ = [haxe_ui_core_IClonable,haxe_ui_core_IComponentBase];
haxe_ui_core_Component.addNamedComponentsFrom = function(parent,list) {
	if(parent == null) return;
	if(parent.get_id() != null) list.push(parent);
	var _g = 0;
	var _g1 = parent.get_childComponents();
	while(_g < _g1.length) {
		var child = _g1[_g];
		++_g;
		haxe_ui_core_Component.addNamedComponentsFrom(child,list);
	}
};
haxe_ui_core_Component.__super__ = haxe_ui_backend_ComponentBase;
haxe_ui_core_Component.prototype = $extend(haxe_ui_backend_ComponentBase.prototype,{
	create: function() {
		this.handleCreate(this.get_native());
		this.destroyChildren();
		this.set_layout(this.createLayout());
		if(this.get_native() == false || this.get_native() == null) this.createChildren();
	}
	,createDefaults: function() {
	}
	,createChildren: function() {
	}
	,destroyChildren: function() {
	}
	,hasNativeEntry: null
	,get_hasNativeEntry: function() {
		return this.getNativeConfigProperty(".@id") != null;
	}
	,_defaultLayout: null
	,createLayout: function() {
		var l = null;
		if(this.get_native() == true) {
			var sizeProps = this.getNativeConfigProperties(".size");
			if(sizeProps != null && (__map_reserved["class"] != null?sizeProps.existsReserved("class"):sizeProps.h.hasOwnProperty("class"))) {
				var size = Type.createInstance(Type.resolveClass(__map_reserved["class"] != null?sizeProps.getReserved("class"):sizeProps.h["class"]),[]);
				size.config = sizeProps;
				l = new haxe_ui_layouts_DelegateLayout(size);
			} else {
				var layoutProps = this.getNativeConfigProperties(".layout");
				if(layoutProps != null && (__map_reserved["class"] != null?layoutProps.existsReserved("class"):layoutProps.h.hasOwnProperty("class"))) l = Type.createInstance(Type.resolveClass(__map_reserved["class"] != null?layoutProps.getReserved("class"):layoutProps.h["class"]),[]);
			}
		}
		if(l == null) l = this._defaultLayout;
		if(l == null) return this.get_layout();
		return l;
	}
	,_defaultBehaviours: null
	,_behaviours: null
	,getBehaviour: function(id) {
		var b = this._behaviours.get(id);
		if(b != null) return b;
		if(this.get_native() == true) {
			var nativeProps = this.getNativeConfigProperties(".behaviour[id=" + id + "]");
			if(nativeProps != null && (__map_reserved["class"] != null?nativeProps.existsReserved("class"):nativeProps.h.hasOwnProperty("class"))) {
				b = Type.createInstance(Type.resolveClass(__map_reserved["class"] != null?nativeProps.getReserved("class"):nativeProps.h["class"]),[this]);
				b.config = nativeProps;
			}
		}
		if(b == null) b = this._defaultBehaviours.get(id);
		this._behaviours.set(id,b);
		return b;
	}
	,behaviourGet: function(id) {
		var b = this.getBehaviour(id);
		if(b != null) return b.get();
		return null;
	}
	,behaviourSet: function(id,value) {
		var b = this.getBehaviour(id);
		if(b != null) b.set(value);
	}
	,behavioursUpdate: function() {
		var $it0 = this._behaviours.iterator();
		while( $it0.hasNext() ) {
			var b = $it0.next();
			if(b != null) b.update();
		}
	}
	,_native: null
	,get_native: function() {
		if(this.get_hasNativeEntry() == false) return false;
		return this._native;
	}
	,set_native: function(value) {
		var className = Type.getClassName(js_Boot.getClass(this));
		if(this.get_hasNativeEntry() == false) return value;
		if(this._native == value) return value;
		if(this._ready == false) {
		}
		this._native = value;
		if(this._native == true && this.get_hasNativeEntry()) this.addClass(":native"); else this.removeClass(":native");
		this._behaviours = new haxe_ds_StringMap();
		this.create();
		return value;
	}
	,_animatable: null
	,get_animatable: function() {
		return false;
		return this._animatable;
	}
	,set_animatable: function(value) {
		this._animatable = value;
		return value;
	}
	,userData: null
	,_id: null
	,get_id: function() {
		return this._id;
	}
	,set_id: function(value) {
		if(this._id != value) this._id = value;
		return this._id;
	}
	,_text: null
	,get_text: function() {
		return this._text;
	}
	,set_text: function(value) {
		if(this._text != value) this._text = value;
		return this._text;
	}
	,get_value: function() {
		return haxe_ui_util__$Variant_Variant_$Impl_$.fromString(this.get_text());
	}
	,set_value: function(value) {
		this.set_text(haxe_ui_util__$Variant_Variant_$Impl_$.toString(value));
		return value;
	}
	,screen: null
	,get_screen: function() {
		return haxe_ui_Toolkit.get_screen();
	}
	,_bindings: null
	,addBinding: function(target,transform,targetProperty,sourceProperty) {
		if(sourceProperty == null) sourceProperty = "value";
		if(targetProperty == null) targetProperty = "value";
		if(this._bindings == null) this._bindings = new haxe_ds_StringMap();
		var array = this._bindings.get(sourceProperty);
		if(array == null) {
			array = [];
			this._bindings.set(sourceProperty,array);
		}
		var info = new haxe_ui_core_BindingInfo();
		info.target = target;
		info.targetProperty = targetProperty;
		info.sourceProperty = sourceProperty;
		info.transform = transform;
		array.push(info);
	}
	,_deferredBindings: null
	,addDeferredBinding: function(targetId,sourceId,transform,targetProperty,sourceProperty) {
		if(sourceProperty == null) sourceProperty = "value";
		if(targetProperty == null) targetProperty = "value";
		if(this._deferredBindings == null) this._deferredBindings = [];
		var deferredBinding = new haxe_ui_core_DeferredBindingInfo();
		deferredBinding.targetId = targetId;
		deferredBinding.sourceId = sourceId;
		deferredBinding.transform = transform;
		deferredBinding.targetProperty = targetProperty;
		deferredBinding.sourceProperty = sourceProperty;
		this._deferredBindings.push(deferredBinding);
	}
	,getDefferedBindings: function() {
		var b = null;
		var c = this;
		while(b == null && c != null) {
			if(c._deferredBindings != null) {
				b = c._deferredBindings;
				break;
			}
			c = c.parentComponent;
		}
		return b;
	}
	,handleBindings: function(sourceProperties) {
		if(this._bindings == null) return;
		var _g = 0;
		while(_g < sourceProperties.length) {
			var sourceProperty = sourceProperties[_g];
			++_g;
			var v = this.getProperty(sourceProperty);
			if(v == null) continue;
			var array = this._bindings.get(sourceProperty);
			if(array == null) continue;
			var _g1 = 0;
			while(_g1 < array.length) {
				var info = array[_g1];
				++_g1;
				if(info.target == null) continue;
				if(info.transform == null) info.target.setProperty(info.targetProperty,v); else if(info.transform.indexOf("${value}") != -1) {
					v = haxe_ui_util__$Variant_Variant_$Impl_$.fromString(StringTools.replace(info.transform,"${value}",haxe_ui_util__$Variant_Variant_$Impl_$.toString(v)));
					info.target.setProperty(info.targetProperty,v);
				} else if(info.transform.indexOf("${") != -1) {
					var s = HxOverrides.substr(info.transform,2,info.transform.length - 3);
					var scriptResult = null;
					try {
						var parser = new hscript_Parser();
						var program = parser.parseString(s);
						var interp = this.findScriptInterp();
						interp.variables.set("Math",Math);
						var value = haxe_ui_util__$Variant_Variant_$Impl_$.toDynamic(v);
						interp.variables.set("value",value);
						scriptResult = haxe_ui_util__$Variant_Variant_$Impl_$.fromDynamic(interp.expr(program));
					} catch( e ) {
						haxe_CallStack.lastException = e;
						if (e instanceof js__$Boot_HaxeError) e = e.val;
						haxe_Log.trace("Problem executing binding script: " + Std.string(e),{ fileName : "Component.hx", lineNumber : 392, className : "haxe.ui.core.Component", methodName : "handleBindings"});
					}
					if(scriptResult != null) info.target.setProperty(info.targetProperty,scriptResult);
				} else {
				}
			}
		}
	}
	,_clipRect: null
	,get_clipRect: function() {
		return this._clipRect;
	}
	,set_clipRect: function(value) {
		this._clipRect = value;
		this.handleClipRect(value);
		return value;
	}
	,get_rootComponent: function() {
		var r = this;
		while(r.parentComponent != null) r = r.parentComponent;
		return r;
	}
	,_children: null
	,parentComponent: null
	,addComponent: function(child) {
		if(this.get_native() == true) {
			var className = Type.getClassName(js_Boot.getClass(this));
			var allowChildren = this.getNativeConfigPropertyBool(".@allowChildren",true);
			if(allowChildren == false) return child;
		}
		child.parentComponent = this;
		if(this._children == null) this._children = [];
		this._children.push(child);
		var deferredBindings = this.getDefferedBindings();
		if(deferredBindings != null) {
			var itemsToRemove = [];
			var _g = 0;
			while(_g < deferredBindings.length) {
				var binding = deferredBindings[_g];
				++_g;
				var source = this.findComponent(binding.sourceId,null,true);
				var target = this.findComponent(binding.targetId,null,true);
				if(source != null && target != null) {
					source.addBinding(target,binding.transform,binding.targetProperty,binding.sourceProperty);
					itemsToRemove.push(binding);
				}
			}
			var _g1 = 0;
			while(_g1 < itemsToRemove.length) {
				var item = itemsToRemove[_g1];
				++_g1;
				HxOverrides.remove(deferredBindings,item);
			}
		}
		this.handleAddComponent(child);
		if(this._ready) child.ready();
		this.invalidateLayout();
		return child;
	}
	,removeComponent: function(child,dispose,invalidate) {
		if(invalidate == null) invalidate = true;
		if(dispose == null) dispose = true;
		this.handleRemoveComponent(child,dispose);
		if(this._children != null) {
			HxOverrides.remove(this._children,child);
			this.invalidateLayout();
		}
		return child;
	}
	,removeAllComponents: function(dispose) {
		if(dispose == null) dispose = true;
		if(this._children != null) {
			while(this._children.length > 0) {
				this._children[0].removeAllComponents(dispose);
				this.removeComponent(this._children[0],dispose,false);
			}
			this.invalidateLayout();
		}
	}
	,childComponents: null
	,get_childComponents: function() {
		if(this._children == null) return [];
		return this._children;
	}
	,findComponent: function(critera,type,recursive,searchType) {
		if(searchType == null) searchType = "id";
		if(recursive == null) recursive = false;
		var match = null;
		var _g = 0;
		var _g1 = this.get_childComponents();
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(critera != null) {
				if(searchType == "id" && child.get_id() == critera) {
					match = child;
					break;
				} else if(searchType == "css" && child.hasClass(critera) == true) {
					match = child;
					break;
				}
			} else if(type != null) {
				if(js_Boot.__instanceof(child,type) == true) {
					match = child;
					break;
				}
			}
		}
		if(match == null && recursive == true) {
			var _g2 = 0;
			var _g11 = this.get_childComponents();
			while(_g2 < _g11.length) {
				var child1 = _g11[_g2];
				++_g2;
				var temp = child1.findComponent(critera,type,recursive,searchType);
				if(temp != null) {
					match = temp;
					break;
				}
			}
		}
		return match;
	}
	,getComponentIndex: function(child) {
		var index = -1;
		if(this._children != null && child != null) index = HxOverrides.indexOf(this._children,child,0);
		return index;
	}
	,getComponentAt: function(index) {
		if(this._children == null) return null;
		return this._children[index];
	}
	,hide: function() {
		this.handleVisibility(false);
		this._hidden = true;
		if(this.parentComponent != null) this.parentComponent.invalidateLayout();
	}
	,show: function() {
		this.handleVisibility(true);
		this._hidden = false;
		if(this.parentComponent != null) this.parentComponent.invalidateLayout();
	}
	,_hidden: null
	,get_hidden: function() {
		if(this._hidden == true) return true;
		if(this.parentComponent != null) return this.parentComponent.get_hidden();
		return false;
	}
	,set_hidden: function(value) {
		if(value == this._hidden) return value;
		if(value == true) this.hide(); else this.show();
		return value;
	}
	,customStyle: null
	,classes: null
	,addClass: function(name,invalidate) {
		if(invalidate == null) invalidate = true;
		if(HxOverrides.indexOf(this.classes,name,0) == -1) {
			this.classes.push(name);
			if(invalidate == true) this.invalidateStyle();
		}
	}
	,removeClass: function(name,invalidate) {
		if(invalidate == null) invalidate = true;
		if(HxOverrides.indexOf(this.classes,name,0) != -1) {
			HxOverrides.remove(this.classes,name);
			if(invalidate == true) this.invalidateStyle();
		}
	}
	,hasClass: function(name) {
		return HxOverrides.indexOf(this.classes,name,0) != -1;
	}
	,get_styleNames: function() {
		return this.classes.join(" ");
	}
	,set_styleNames: function(value) {
		if(value == null) return value;
		var _g = 0;
		var _g1 = value.split(" ");
		while(_g < _g1.length) {
			var x = _g1[_g];
			++_g;
			this.addClass(x);
		}
		return value;
	}
	,_styleString: null
	,styleString: null
	,set_styleString: function(value) {
		if(value == null) return value;
		var cssString = StringTools.trim(value);
		if(cssString.length == 0) return value;
		if(StringTools.endsWith(cssString,";") == false) cssString += ";";
		cssString = "_ { " + cssString + "}";
		var s = new haxe_ui_styles_Parser().parseRules(cssString)[0].s;
		this.customStyle.apply(s);
		this._styleString = value;
		return value;
	}
	,_style: null
	,get_style: function() {
		return this._style;
	}
	,set_style: function(value) {
		this._style = value;
		return value;
	}
	,__events: null
	,registerEvent: function(type,listener) {
		if(this.__events == null) this.__events = new haxe_ui_util_EventMap();
		if(this.__events.add(type,listener) == true) this.mapEvent(type,$bind(this,this._onMappedEvent));
	}
	,unregisterEvent: function(type,listener) {
		if(this.__events != null) {
			if(this.__events.remove(type,listener) == true) this.unmapEvent(type,$bind(this,this._onMappedEvent));
		}
	}
	,dispatch: function(event) {
		if(this.__events != null) this.__events.invoke(event.type,event,this);
	}
	,_onMappedEvent: function(event) {
		this.dispatch(event);
	}
	,_includeInLayout: null
	,get_includeInLayout: function() {
		return this._includeInLayout && !this._hidden;
	}
	,set_includeInLayout: function(value) {
		this._includeInLayout = value;
		return value;
	}
	,_layout: null
	,get_layout: function() {
		return this._layout;
	}
	,set_layout: function(value) {
		if(value == null) return value;
		this._layout = value;
		this._layout.set_component(this);
		return value;
	}
	,_ready: null
	,isReady: null
	,get_isReady: function() {
		return this._ready;
	}
	,ready: function() {
		if(this._ready == false) {
			this.invalidateStyle(false);
			this._ready = true;
			this.handleReady();
			if(this.get_childComponents() != null) {
				var _g = 0;
				var _g1 = this.get_childComponents();
				while(_g < _g1.length) {
					var child = _g1[_g];
					++_g;
					child.ready();
				}
			}
			if(this.get_autoWidth() == true || this.get_autoHeight() == true) {
				var s = this.get_layout().calcAutoSize();
				var calculatedWidth = null;
				var calculatedHeight = null;
				if(this.get_autoWidth() == true) calculatedWidth = s.width;
				if(this.get_autoHeight() == true) calculatedHeight = s.height;
				this.resizeComponent(calculatedWidth,calculatedHeight);
			} else this.invalidateDisplay();
			this.invalidateLayout();
			this.onReady();
		}
	}
	,onReady: function() {
		this.behavioursUpdate();
		this.handleBindings(["text","value","width","height"]);
		this.initScript();
	}
	,onResized: function() {
	}
	,_backgroundColor: null
	,_borderColor: null
	,_borderSize: null
	,_borderRadius: null
	,_paddingLeft: null
	,_paddingRight: null
	,_paddingTop: null
	,_paddingBottom: null
	,_marginLeft: null
	,_marginRight: null
	,_marginTop: null
	,_marginBottom: null
	,_clip: null
	,_opacity: null
	,autoWidth: null
	,get_autoWidth: function() {
		if(this._percentWidth != null || this._width != null || this.get_style() == null) return false;
		if(this.get_style().autoWidth == null) return false;
		return this.get_style().autoWidth;
	}
	,autoHeight: null
	,get_autoHeight: function() {
		if(this._percentHeight != null || this._height != null || this.get_style() == null) return false;
		if(this.get_style().autoHeight == null) return false;
		return this.get_style().autoHeight;
	}
	,resizeComponent: function(width,height) {
		var invalidate = false;
		if(width != null && this._componentWidth != width) {
			this._componentWidth = width;
			invalidate = true;
		}
		if(height != null && this._componentHeight != height) {
			this._componentHeight = height;
			invalidate = true;
		}
		if(invalidate == true) {
			this.invalidateDisplay();
			this.invalidateLayout();
			this.onResized();
			this.dispatch(new haxe_ui_core_UIEvent("Resize"));
			if(this.parentComponent != null) this.parentComponent.invalidateLayout();
		}
	}
	,autoSize: function() {
		if(this._ready == false || this._layout == null) return false;
		return this.get_layout().autoSize();
	}
	,_percentWidth: null
	,get_percentWidth: function() {
		return this._percentWidth;
	}
	,set_percentWidth: function(value) {
		if(this._percentWidth == value) return value;
		this._percentWidth = value;
		if(this.parentComponent != null) this.parentComponent.invalidateLayout();
		return value;
	}
	,_percentHeight: null
	,get_percentHeight: function() {
		return this._percentHeight;
	}
	,set_percentHeight: function(value) {
		if(this._percentHeight == value) return value;
		this._percentHeight = value;
		if(this.parentComponent != null) this.parentComponent.invalidateLayout();
		return value;
	}
	,hitTest: function(left,top) {
		var b = false;
		var sx = this.get_screenLeft();
		var sy = this.get_screenTop();
		var cx = 0;
		if(this.get_componentWidth() != null) cx = this.get_componentWidth();
		var cy = 0;
		if(this.get_componentHeight() != null) cy = this.get_componentHeight();
		if(cx <= 0 || cy <= 0) return false;
		if(left > sx && left < sx + cx && top > sy && top < sy + cy) b = true;
		return b;
	}
	,_componentWidth: null
	,get_componentWidth: function() {
		if(this._componentWidth == null) return 0;
		return this._componentWidth;
	}
	,set_componentWidth: function(value) {
		this.resizeComponent(value,null);
		return value;
	}
	,_componentHeight: null
	,get_componentHeight: function() {
		if(this._componentHeight == null) return 0;
		return this._componentHeight;
	}
	,set_componentHeight: function(value) {
		this.resizeComponent(null,value);
		return value;
	}
	,_width: null
	,set_width: function(value) {
		if(this._width == value) return value;
		this._width = value;
		this.set_componentWidth(value);
		return value;
	}
	,get_width: function() {
		var f = this.get_componentWidth();
		return f;
	}
	,_height: null
	,set_height: function(value) {
		if(this._height == value) return value;
		this._height = value;
		this.set_componentHeight(value);
		return value;
	}
	,get_height: function() {
		var f = this.get_componentHeight();
		return f;
	}
	,moveComponent: function(left,top) {
		var invalidate = false;
		if(left != null && this._left != left) {
			this._left = left;
			invalidate = true;
		}
		if(top != null && this._top != top) {
			this._top = top;
			invalidate = true;
		}
		if(invalidate == true) this.handlePosition(this._left,this._top,this._style);
	}
	,_left: null
	,get_left: function() {
		return this._left;
	}
	,set_left: function(value) {
		this.moveComponent(value,null);
		return value;
	}
	,_top: null
	,get_top: function() {
		return this._top;
	}
	,set_top: function(value) {
		this.moveComponent(null,value);
		return value;
	}
	,screenLeft: null
	,get_screenLeft: function() {
		var c = this;
		var xpos = 0;
		while(c != null) {
			xpos += c.get_left();
			c = c.parentComponent;
		}
		return xpos;
	}
	,screenTop: null
	,get_screenTop: function() {
		var c = this;
		var ypos = 0;
		while(c != null) {
			ypos += c.get_top();
			c = c.parentComponent;
		}
		return ypos;
	}
	,scriptAccess: null
	,_interp: null
	,_script: null
	,script: null
	,set_script: function(value) {
		this._script = value;
		return value;
	}
	,executeScriptCall: function(expr) {
		var parser = new hscript_Parser();
		var line = parser.parseString(expr);
		var interp = this.findScriptInterp();
		interp.variables.set("this",this);
		interp.expr(line);
		interp.variables.remove("this");
	}
	,findScriptInterp: function(refreshNamedComponents) {
		if(refreshNamedComponents == null) refreshNamedComponents = true;
		var interp = null;
		var c = this;
		while(c != null && interp == null) {
			if(c._interp != null) {
				interp = c._interp;
				break;
			}
			c = c.parentComponent;
		}
		if(interp == null) {
			c = this.get_rootComponent();
			c._interp = new haxe_ui_scripting_ScriptInterp();
			interp = c._interp;
		}
		if(refreshNamedComponents == true && c != null) {
			var comps = c.get_namedComponents();
			var _g = 0;
			while(_g < comps.length) {
				var comp = comps[_g];
				++_g;
				var safeId = haxe_ui_util_StringUtil.capitalizeHyphens(comp.get_id());
				interp.variables.set(safeId,comp);
			}
		}
		return interp;
	}
	,initScript: function() {
		if(this._script != null) try {
			var parser = new hscript_Parser();
			var program = parser.parseString(this._script);
			this._interp = new haxe_ui_scripting_ScriptInterp();
			var comps = this.get_namedComponents();
			var _g = 0;
			while(_g < comps.length) {
				var comp = comps[_g];
				++_g;
				if(comp.scriptAccess == true) {
					var safeId = haxe_ui_util_StringUtil.capitalizeHyphens(comp.get_id());
					this._interp.variables.set(safeId,comp);
				}
			}
			this._interp.execute(program);
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			haxe_Log.trace("Problem initializing script: " + Std.string(e),{ fileName : "Component.hx", lineNumber : 1381, className : "haxe.ui.core.Component", methodName : "initScript"});
			haxe_ui_util_CallStackHelper.traceExceptionStack();
		}
	}
	,_scriptEvents: null
	,addScriptEvent: function(event,script) {
		event = event.toLowerCase();
		if(this._scriptEvents == null) this._scriptEvents = new haxe_ds_StringMap();
		this._scriptEvents.set(event,script);
		switch(event) {
		case "onclick":
			this.registerEvent("Click",$bind(this,this._onScriptClick));
			break;
		case "onchange":
			this.registerEvent("Change",$bind(this,this._onScriptChange));
			break;
		}
	}
	,_onScriptClick: function(event) {
		if(this._scriptEvents != null) {
			var script = this._scriptEvents.get("onclick");
			if(script != null) this.executeScriptCall(script);
		}
	}
	,_onScriptChange: function(event) {
		if(this._scriptEvents != null) {
			var script = this._scriptEvents.get("onchange");
			if(script != null) this.executeScriptCall(script);
		}
	}
	,namedComponents: null
	,get_namedComponents: function() {
		var list = [];
		haxe_ui_core_Component.addNamedComponentsFrom(this,list);
		return list;
	}
	,__onClick: null
	,onClick: null
	,set_onClick: function(value) {
		if(this.__onClick != null) {
			this.unregisterEvent("Click",this.__onClick);
			this.__onClick = null;
		}
		this.registerEvent("Click",value);
		this.__onClick = value;
		return value;
	}
	,onChange: null
	,set_onChange: function(value) {
		this.registerEvent("Change",value);
		return value;
	}
	,_layoutInvalidating: null
	,_layoutReinvalidation: null
	,invalidateLayout: function() {
		if(this._ready == false) return;
		if(this._layoutInvalidating == true) {
			this._layoutReinvalidation = true;
			return;
		}
		this._layoutInvalidating = true;
		this.get_layout().refresh();
		this._layoutInvalidating = false;
		if(this._layoutReinvalidation == true) {
			this._layoutReinvalidation = false;
			this.invalidateLayout();
		}
	}
	,_displayingInvalidating: null
	,invalidateDisplay: function() {
		if(this._ready == false) return;
		if(this._displayingInvalidating == true) return;
		if(this.get_componentWidth() == null || this.get_componentHeight() == null || this.get_componentWidth() <= 0 || this.get_componentHeight() <= 0) return;
		this._displayingInvalidating = true;
		this.handleSize(this.get_componentWidth(),this.get_componentHeight(),this._style);
		this._displayingInvalidating = false;
	}
	,invalidateStyle: function(invalidate) {
		if(invalidate == null) invalidate = true;
		var s = haxe_ui_Toolkit.styleSheet.applyClasses(this,false);
		if(this._ready == false || this._style == null || this._style.equalTo(s) == false) {
			this._style = s;
			this.applyStyle(this._style);
			if(invalidate == true) this.invalidateDisplay();
		}
	}
	,applyStyle: function(style) {
		haxe_ui_backend_ComponentBase.prototype.applyStyle.call(this,style);
		if(style.percentWidth != null) this.set_percentWidth(style.percentWidth);
		if(style.percentHeight != null) this.set_percentHeight(style.percentHeight);
		if(style.width != null) this.set_width(style.width);
		if(style.height != null) this.set_height(style.height);
		if(style["native"] != null) this.set_native(style["native"]);
	}
	,getProperty: function(name) {
		switch(name) {
		case "value":
			return this.get_value();
		case "width":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.get_width());
			break;
		case "height":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.get_height());
			break;
		}
		return null;
	}
	,setProperty: function(name,value) {
		switch(name) {
		case "value":
			return this.set_value(value);
		case "width":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.set_width(haxe_ui_util__$Variant_Variant_$Impl_$.toInt(value)));
			break;
		case "height":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.set_height(haxe_ui_util__$Variant_Variant_$Impl_$.toInt(value)));
			break;
		}
		return null;
	}
	,getClassProperty: function(name) {
		var v = null;
		if(this._classProperties != null) v = this._classProperties.get(name);
		if(v == null) {
			var c = Type.getClassName(js_Boot.getClass(this)).toLowerCase() + "." + name;
			v = haxe_ui_Toolkit.properties.get(c);
		}
		return v;
	}
	,_classProperties: null
	,setClassProperty: function(name,value) {
		if(this._classProperties == null) this._classProperties = new haxe_ds_StringMap();
		this._classProperties.set(name,value);
	}
	,getNativeConfigProperty: function(query,defaultValue) {
		query = "component[id=" + this.get_className() + "]" + query;
		return haxe_ui_Toolkit.nativeConfig.query(query,defaultValue);
	}
	,getNativeConfigPropertyBool: function(query,defaultValue) {
		if(defaultValue == null) defaultValue = false;
		query = "component[id=" + this.get_className() + "]" + query;
		return haxe_ui_Toolkit.nativeConfig.queryBool(query,defaultValue);
	}
	,getNativeConfigProperties: function(query) {
		if(query == null) query = "";
		query = "component[id=" + this.get_className() + "]" + query;
		return haxe_ui_Toolkit.nativeConfig.queryValues(query);
	}
	,className: null
	,get_className: function() {
		return Type.getClassName(js_Boot.getClass(this));
	}
	,get_backgroundColor: function() {
		if(this.get_style().backgroundColor == null) return 0;
		return this.get_style().backgroundColor;
	}
	,set_backgroundColor: function(value) {
		if(this.customStyle.backgroundColor == value) return value;
		this.customStyle.backgroundColor = value;
		this.invalidateStyle();
		return value;
	}
	,get_borderColor: function() {
		if(this.get_style().borderColor == null) return 0;
		return this.get_style().borderColor;
	}
	,set_borderColor: function(value) {
		if(this.customStyle.borderColor == value) return value;
		this.customStyle.borderColor = value;
		this.invalidateStyle();
		return value;
	}
	,get_borderSize: function() {
		if(this.get_style().borderSize == null) return 0;
		return this.get_style().borderSize;
	}
	,set_borderSize: function(value) {
		if(this.customStyle.borderSize == value) return value;
		this.customStyle.borderSize = value;
		this.invalidateStyle();
		return value;
	}
	,get_borderRadius: function() {
		if(this.get_style().borderRadius == null) return 0;
		return this.get_style().borderRadius;
	}
	,set_borderRadius: function(value) {
		if(this.customStyle.borderRadius == value) return value;
		this.customStyle.borderRadius = value;
		this.invalidateStyle();
		return value;
	}
	,get_paddingLeft: function() {
		if(this.get_style().paddingLeft == null) return 0;
		return this.get_style().paddingLeft;
	}
	,set_paddingLeft: function(value) {
		if(this.customStyle.paddingLeft == value) return value;
		this.customStyle.paddingLeft = value;
		this.invalidateStyle();
		return value;
	}
	,get_paddingRight: function() {
		if(this.get_style().paddingRight == null) return 0;
		return this.get_style().paddingRight;
	}
	,set_paddingRight: function(value) {
		if(this.customStyle.paddingRight == value) return value;
		this.customStyle.paddingRight = value;
		this.invalidateStyle();
		return value;
	}
	,get_paddingTop: function() {
		if(this.get_style().paddingTop == null) return 0;
		return this.get_style().paddingTop;
	}
	,set_paddingTop: function(value) {
		if(this.customStyle.paddingTop == value) return value;
		this.customStyle.paddingTop = value;
		this.invalidateStyle();
		return value;
	}
	,get_paddingBottom: function() {
		if(this.get_style().paddingBottom == null) return 0;
		return this.get_style().paddingBottom;
	}
	,set_paddingBottom: function(value) {
		if(this.customStyle.paddingBottom == value) return value;
		this.customStyle.paddingBottom = value;
		this.invalidateStyle();
		return value;
	}
	,get_marginLeft: function() {
		if(this.get_style().marginLeft == null) return 0;
		return this.get_style().marginLeft;
	}
	,set_marginLeft: function(value) {
		if(this.customStyle.marginLeft == value) return value;
		this.customStyle.marginLeft = value;
		this.invalidateStyle();
		return value;
	}
	,get_marginRight: function() {
		if(this.get_style().marginRight == null) return 0;
		return this.get_style().marginRight;
	}
	,set_marginRight: function(value) {
		if(this.customStyle.marginRight == value) return value;
		this.customStyle.marginRight = value;
		this.invalidateStyle();
		return value;
	}
	,get_marginTop: function() {
		if(this.get_style().marginTop == null) return 0;
		return this.get_style().marginTop;
	}
	,set_marginTop: function(value) {
		if(this.customStyle.marginTop == value) return value;
		this.customStyle.marginTop = value;
		this.invalidateStyle();
		return value;
	}
	,get_marginBottom: function() {
		if(this.get_style().marginBottom == null) return 0;
		return this.get_style().marginBottom;
	}
	,set_marginBottom: function(value) {
		if(this.customStyle.marginBottom == value) return value;
		this.customStyle.marginBottom = value;
		this.invalidateStyle();
		return value;
	}
	,get_clip: function() {
		return this.get_style().clip;
	}
	,set_clip: function(value) {
		if(this.customStyle.clip == value) return value;
		this.customStyle.clip = value;
		this.invalidateStyle();
		return value;
	}
	,get_opacity: function() {
		if(this.get_style().opacity == null) return 0;
		return this.get_style().opacity;
	}
	,set_opacity: function(value) {
		if(this.customStyle.opacity == value) return value;
		this.customStyle.opacity = value;
		this.invalidateStyle();
		return value;
	}
	,cloneComponent: function() {
		var c = this.self();
		c._id = this._id;
		c.set_id(this.get_id());
		c.set_text(this.get_text());
		c.set_value(this.get_value());
		c._percentWidth = this._percentWidth;
		c.set_percentWidth(this.get_percentWidth());
		c._percentHeight = this._percentHeight;
		c.set_percentHeight(this.get_percentHeight());
		c.set_width(this.get_width());
		c.set_height(this.get_height());
		c.set_backgroundColor(this.get_backgroundColor());
		c.set_borderColor(this.get_borderColor());
		c.set_borderSize(this.get_borderSize());
		c.set_borderRadius(this.get_borderRadius());
		c.set_paddingLeft(this.get_paddingLeft());
		c.set_paddingRight(this.get_paddingRight());
		c.set_paddingTop(this.get_paddingTop());
		c.set_paddingBottom(this.get_paddingBottom());
		c.set_marginLeft(this.get_marginLeft());
		c.set_marginRight(this.get_marginRight());
		c.set_marginTop(this.get_marginTop());
		c.set_marginBottom(this.get_marginBottom());
		c.set_clip(this.get_clip());
		c.set_opacity(this.get_opacity());
		return c;
	}
	,self: function() {
		return new haxe_ui_core_Component();
	}
	,__class__: haxe_ui_core_Component
	,__properties__: {set_opacity:"set_opacity",get_opacity:"get_opacity",set_clip:"set_clip",get_clip:"get_clip",set_marginBottom:"set_marginBottom",get_marginBottom:"get_marginBottom",set_marginTop:"set_marginTop",get_marginTop:"get_marginTop",set_marginRight:"set_marginRight",get_marginRight:"get_marginRight",set_marginLeft:"set_marginLeft",get_marginLeft:"get_marginLeft",set_paddingBottom:"set_paddingBottom",get_paddingBottom:"get_paddingBottom",set_paddingTop:"set_paddingTop",get_paddingTop:"get_paddingTop",set_paddingRight:"set_paddingRight",get_paddingRight:"get_paddingRight",set_paddingLeft:"set_paddingLeft",get_paddingLeft:"get_paddingLeft",set_borderRadius:"set_borderRadius",get_borderRadius:"get_borderRadius",set_borderSize:"set_borderSize",get_borderSize:"get_borderSize",set_borderColor:"set_borderColor",get_borderColor:"get_borderColor",set_backgroundColor:"set_backgroundColor",get_backgroundColor:"get_backgroundColor",get_className:"get_className",set_onChange:"set_onChange",set_onClick:"set_onClick",get_namedComponents:"get_namedComponents",set_script:"set_script",get_screenTop:"get_screenTop",get_screenLeft:"get_screenLeft",set_top:"set_top",get_top:"get_top",set_left:"set_left",get_left:"get_left",set_height:"set_height",get_height:"get_height",set_width:"set_width",get_width:"get_width",set_componentHeight:"set_componentHeight",get_componentHeight:"get_componentHeight",set_componentWidth:"set_componentWidth",get_componentWidth:"get_componentWidth",set_percentHeight:"set_percentHeight",get_percentHeight:"get_percentHeight",set_percentWidth:"set_percentWidth",get_percentWidth:"get_percentWidth",get_autoHeight:"get_autoHeight",get_autoWidth:"get_autoWidth",get_isReady:"get_isReady",set_layout:"set_layout",get_layout:"get_layout",set_includeInLayout:"set_includeInLayout",get_includeInLayout:"get_includeInLayout",set_style:"set_style",get_style:"get_style",set_styleString:"set_styleString",set_styleNames:"set_styleNames",get_styleNames:"get_styleNames",set_hidden:"set_hidden",get_hidden:"get_hidden",get_childComponents:"get_childComponents",get_rootComponent:"get_rootComponent",set_clipRect:"set_clipRect",get_clipRect:"get_clipRect",get_screen:"get_screen",set_value:"set_value",get_value:"get_value",set_text:"set_text",get_text:"get_text",set_id:"set_id",get_id:"get_id",set_animatable:"set_animatable",get_animatable:"get_animatable",set_native:"set_native",get_native:"get_native",get_hasNativeEntry:"get_hasNativeEntry"}
});
var haxe_ui_focus_IFocusable = function() { };
$hxClasses["haxe.ui.focus.IFocusable"] = haxe_ui_focus_IFocusable;
haxe_ui_focus_IFocusable.__name__ = ["haxe","ui","focus","IFocusable"];
haxe_ui_focus_IFocusable.prototype = {
	get_focus: null
	,set_focus: null
	,get_allowFocus: null
	,set_allowFocus: null
	,__class__: haxe_ui_focus_IFocusable
	,__properties__: {set_allowFocus:"set_allowFocus",get_allowFocus:"get_allowFocus",set_focus:"set_focus",get_focus:"get_focus"}
};
var haxe_ui_core_InteractiveComponent = function() {
	this._allowFocus = true;
	haxe_ui_core_Component.call(this);
};
$hxClasses["haxe.ui.core.InteractiveComponent"] = haxe_ui_core_InteractiveComponent;
haxe_ui_core_InteractiveComponent.__name__ = ["haxe","ui","core","InteractiveComponent"];
haxe_ui_core_InteractiveComponent.__interfaces__ = [haxe_ui_core_IClonable,haxe_ui_focus_IFocusable];
haxe_ui_core_InteractiveComponent.__super__ = haxe_ui_core_Component;
haxe_ui_core_InteractiveComponent.prototype = $extend(haxe_ui_core_Component.prototype,{
	_focus: null
	,get_focus: function() {
		return this._focus;
	}
	,set_focus: function(value) {
		if(this._focus == value || this.get_allowFocus() == false) return value;
		this._focus = value;
		if(this._focus == true) this.addClass(":active"); else this.removeClass(":active");
		return value;
	}
	,_allowFocus: null
	,get_allowFocus: function() {
		return this._allowFocus;
	}
	,set_allowFocus: function(value) {
		if(this._allowFocus == value) return value;
		this._allowFocus = value;
		return value;
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_Component.prototype.cloneComponent.call(this);
		return c;
	}
	,self: function() {
		return new haxe_ui_core_InteractiveComponent();
	}
	,__class__: haxe_ui_core_InteractiveComponent
	,__properties__: $extend(haxe_ui_core_Component.prototype.__properties__,{set_allowFocus:"set_allowFocus",get_allowFocus:"get_allowFocus",set_focus:"set_focus",get_focus:"get_focus"})
});
var haxe_ui_components_Button = function() {
	this._down = false;
	this.repeatInterval = 50;
	this.repeater = false;
	this.remainPressed = false;
	haxe_ui_core_InteractiveComponent.call(this);
};
$hxClasses["haxe.ui.components.Button"] = haxe_ui_components_Button;
haxe_ui_components_Button.__name__ = ["haxe","ui","components","Button"];
haxe_ui_components_Button.__interfaces__ = [haxe_ui_core_IClonable];
haxe_ui_components_Button.__super__ = haxe_ui_core_InteractiveComponent;
haxe_ui_components_Button.prototype = $extend(haxe_ui_core_InteractiveComponent.prototype,{
	_label: null
	,_icon: null
	,_repeatTimer: null
	,createDefaults: function() {
		var _g = new haxe_ds_StringMap();
		var value = new haxe_ui_components_ButtonDefaultTextBehaviour(this);
		if(__map_reserved.text != null) _g.setReserved("text",value); else _g.h["text"] = value;
		var value1 = new haxe_ui_components_ButtonDefaultIconBehaviour(this);
		if(__map_reserved.icon != null) _g.setReserved("icon",value1); else _g.h["icon"] = value1;
		this._defaultBehaviours = _g;
		this._defaultLayout = new haxe_ui_components_ButtonLayout();
	}
	,create: function() {
		haxe_ui_core_InteractiveComponent.prototype.create.call(this);
		this.behaviourSet("text",haxe_ui_util__$Variant_Variant_$Impl_$.fromString(this._text));
		this.behaviourSet("icon",haxe_ui_util__$Variant_Variant_$Impl_$.fromString(this._iconResource));
	}
	,createChildren: function() {
		this.registerEvent("MouseOver",$bind(this,this._onMouseOver));
		this.registerEvent("MouseOut",$bind(this,this._onMouseOut));
		this.registerEvent("MouseDown",$bind(this,this._onMouseDown));
	}
	,destroyChildren: function() {
		haxe_ui_core_InteractiveComponent.prototype.destroyChildren.call(this);
		this.unregisterEvent("MouseOver",$bind(this,this._onMouseOver));
		this.unregisterEvent("MouseOut",$bind(this,this._onMouseOut));
		this.unregisterEvent("MouseDown",$bind(this,this._onMouseDown));
		if(this._label != null) {
			this.removeComponent(this._label);
			this._label = null;
		}
		if(this._icon != null) {
			this.removeComponent(this._icon);
			this._icon = null;
		}
	}
	,set_text: function(value) {
		value = haxe_ui_core_InteractiveComponent.prototype.set_text.call(this,value);
		this.behaviourSet("text",haxe_ui_util__$Variant_Variant_$Impl_$.fromString(value));
		return value;
	}
	,applyStyle: function(style) {
		haxe_ui_core_InteractiveComponent.prototype.applyStyle.call(this,style);
		if(style.icon != null) this.set_icon(style.icon);
		if(this._label != null) {
			this._label.customStyle.color = style.color;
			this._label.customStyle.fontName = style.fontName;
			this._label.customStyle.fontSize = style.fontSize;
			this._label.customStyle.cursor = style.cursor;
			this._label.invalidateStyle();
		}
		if(this._icon != null) {
			this._icon.customStyle.cursor = style.cursor;
			this._icon.invalidateStyle();
		}
	}
	,remainPressed: null
	,repeater: null
	,repeatInterval: null
	,_iconResource: null
	,get_icon: function() {
		return this._iconResource;
	}
	,set_icon: function(value) {
		if(this._iconResource == value) return value;
		this._iconResource = value;
		this.behaviourSet("icon",haxe_ui_util__$Variant_Variant_$Impl_$.fromString(value));
		return value;
	}
	,_down: null
	,_onMouseOver: function(event) {
		if(event.buttonDown == false || this._down == false) this.addClass(":hover"); else this.addClass(":down");
	}
	,_onMouseOut: function(event) {
		if(this.remainPressed == false) this.removeClass(":down");
		this.removeClass(":hover");
	}
	,_onMouseDown: function(event) {
		if(haxe_ui_focus_FocusManager.get_instance().get_focusInfo() != null && haxe_ui_focus_FocusManager.get_instance().get_focusInfo().currentFocus != null) haxe_ui_focus_FocusManager.get_instance().get_focusInfo().currentFocus.set_focus(false);
		this._down = true;
		this.addClass(":down");
		this.get_screen().registerEvent("MouseUp",$bind(this,this._onMouseUp));
		if(this.repeater == true) this._repeatTimer = new haxe_ui_util_Timer(this.repeatInterval,$bind(this,this._onRepeatTimer));
	}
	,_onRepeatTimer: function() {
		if(this.hasClass(":hover") && this._down == true) {
			var event = new haxe_ui_core_MouseEvent("Click");
			this.dispatch(event);
		}
	}
	,_onMouseUp: function(event) {
		this._down = false;
		this.removeClass(":down");
		if(this.hitTest(event.screenX,event.screenY)) this.addClass(":hover");
		if(this._repeatTimer != null) {
			this._repeatTimer.stop();
			this._repeatTimer = null;
		}
		this.get_screen().unregisterEvent("MouseUp",$bind(this,this._onMouseUp));
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_InteractiveComponent.prototype.cloneComponent.call(this);
		c.remainPressed = this.remainPressed;
		c.repeater = this.repeater;
		c.repeatInterval = this.repeatInterval;
		c.set_icon(this.get_icon());
		return c;
	}
	,self: function() {
		return new haxe_ui_components_Button();
	}
	,__class__: haxe_ui_components_Button
	,__properties__: $extend(haxe_ui_core_InteractiveComponent.prototype.__properties__,{set_icon:"set_icon",get_icon:"get_icon"})
});
var haxe_ui_components_ButtonDefaultTextBehaviour = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components.ButtonDefaultTextBehaviour"] = haxe_ui_components_ButtonDefaultTextBehaviour;
haxe_ui_components_ButtonDefaultTextBehaviour.__name__ = ["haxe","ui","components","ButtonDefaultTextBehaviour"];
haxe_ui_components_ButtonDefaultTextBehaviour.__super__ = haxe_ui_core_Behaviour;
haxe_ui_components_ButtonDefaultTextBehaviour.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		if(haxe_ui_util__$Variant_Variant_$Impl_$.get_isNull(value)) return;
		var button = this._component;
		if(button._label == null) {
			button._label = new haxe_ui_components_Label();
			button._label.set_id("button-label");
			button._label.scriptAccess = false;
			button.addComponent(button._label);
		}
		button._label.set_text(haxe_ui_util__$Variant_Variant_$Impl_$.toString(value));
	}
	,__class__: haxe_ui_components_ButtonDefaultTextBehaviour
});
var haxe_ui_components_ButtonDefaultIconBehaviour = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components.ButtonDefaultIconBehaviour"] = haxe_ui_components_ButtonDefaultIconBehaviour;
haxe_ui_components_ButtonDefaultIconBehaviour.__name__ = ["haxe","ui","components","ButtonDefaultIconBehaviour"];
haxe_ui_components_ButtonDefaultIconBehaviour.__super__ = haxe_ui_core_Behaviour;
haxe_ui_components_ButtonDefaultIconBehaviour.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	get: function() {
		var button = this._component;
		if(button._icon == null) return null;
		return button._icon.get_resource();
	}
	,set: function(value) {
		if(haxe_ui_util__$Variant_Variant_$Impl_$.get_isNull(value)) return;
		var button = this._component;
		if(button._icon == null) {
			button._icon = new haxe_ui_components_Image();
			button._icon.addClass("icon");
			button._icon.set_id("button-icon");
			button._icon.scriptAccess = false;
			button.addComponent(button._icon);
		}
		button._icon.set_resource(haxe_ui_util__$Variant_Variant_$Impl_$.toString(value));
	}
	,__class__: haxe_ui_components_ButtonDefaultIconBehaviour
});
var haxe_ui_components_ButtonLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
};
$hxClasses["haxe.ui.components.ButtonLayout"] = haxe_ui_components_ButtonLayout;
haxe_ui_components_ButtonLayout.__name__ = ["haxe","ui","components","ButtonLayout"];
haxe_ui_components_ButtonLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_components_ButtonLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	iconPosition: null
	,get_iconPosition: function() {
		if(this.get_component().get_style().iconPosition == null) return "left";
		return this.get_component().get_style().iconPosition;
	}
	,repositionChildren: function() {
		haxe_ui_layouts_DefaultLayout.prototype.repositionChildren.call(this);
		var label = this.get_component().findComponent("button-label");
		var icon = this.get_component().findComponent("button-icon");
		var _g = this.get_iconPosition();
		switch(_g) {
		case "left":case "right":
			if(label != null && icon != null) {
				var cx = label.get_componentWidth() + icon.get_componentWidth() + this.get_horizontalSpacing();
				var x = Std["int"](this.get_component().get_componentWidth() / 2 - cx / 2);
				if(this.get_iconPosition() == "right") {
					label.set_left(x + this.marginLeft(label) - this.marginRight(label));
					x += this.get_horizontalSpacing() + label.get_componentWidth();
					icon.set_left(x + this.marginLeft(icon) - this.marginRight(icon));
				} else {
					icon.set_left(x + this.marginLeft(icon) - this.marginRight(icon));
					x += this.get_horizontalSpacing() + icon.get_componentWidth();
					label.set_left(x + this.marginLeft(label) - this.marginRight(label));
				}
				label.set_top(Std["int"](this.get_component().get_componentHeight() / 2 - label.get_componentHeight() / 2) + this.marginTop(label) - this.marginBottom(label));
				icon.set_top(Std["int"](this.get_component().get_componentHeight() / 2 - icon.get_componentHeight() / 2) + this.marginTop(icon) - this.marginBottom(icon));
			} else if(label != null) {
				label.set_left(Std["int"](this.get_component().get_componentWidth() / 2 - label.get_componentWidth() / 2) + this.marginLeft(label) - this.marginRight(label));
				label.set_top(Std["int"](this.get_component().get_componentHeight() / 2 - label.get_componentHeight() / 2) + this.marginTop(label) - this.marginBottom(label));
			} else if(icon != null) {
				icon.set_left(Std["int"](this.get_component().get_componentWidth() / 2 - icon.get_componentWidth() / 2));
				icon.set_top(Std["int"](this.get_component().get_componentHeight() / 2 - icon.get_componentHeight() / 2) + this.marginTop(icon) - this.marginBottom(icon));
			}
			break;
		case "top":case "bottom":
			if(label != null && icon != null) {
				var cy = label.get_componentHeight() + icon.get_componentHeight() + this.get_verticalSpacing();
				var y = Std["int"](this.get_component().get_componentHeight() / 2 - cy / 2);
				if(this.get_iconPosition() == "bottom") {
					label.set_top(y + this.marginTop(label) - this.marginBottom(label));
					y += this.get_verticalSpacing() + label.get_componentHeight();
					icon.set_top(y + this.marginTop(icon) - this.marginBottom(icon));
				} else {
					icon.set_top(y + this.marginTop(icon) - this.marginBottom(icon));
					y += this.get_verticalSpacing() + icon.get_componentHeight();
					label.set_top(y + this.marginTop(label) - this.marginBottom(label));
				}
				label.set_left(Std["int"](this.get_component().get_componentWidth() / 2 - label.get_componentWidth() / 2) + this.marginLeft(label) - this.marginRight(label));
				icon.set_left(Std["int"](this.get_component().get_componentWidth() / 2 - icon.get_componentWidth() / 2) + this.marginLeft(icon) - this.marginRight(icon));
			} else if(label != null) {
				label.set_left(Std["int"](this.get_component().get_componentWidth() / 2 - label.get_componentWidth() / 2) + this.marginLeft(label) - this.marginRight(label));
				label.set_top(Std["int"](this.get_component().get_componentHeight() / 2 - label.get_componentHeight() / 2) + this.marginTop(label) - this.marginBottom(label));
			} else if(icon != null) {
				icon.set_left(Std["int"](this.get_component().get_componentWidth() / 2 - icon.get_componentWidth() / 2) + this.marginLeft(icon) - this.marginRight(icon));
				icon.set_top(Std["int"](this.get_component().get_componentHeight() / 2 - icon.get_componentHeight() / 2) + this.marginTop(icon) - this.marginBottom(icon));
			}
			break;
		}
	}
	,__class__: haxe_ui_components_ButtonLayout
	,__properties__: $extend(haxe_ui_layouts_DefaultLayout.prototype.__properties__,{get_iconPosition:"get_iconPosition"})
});
var haxe_ui_components_CheckBox = function() {
	this._selected = false;
	haxe_ui_core_InteractiveComponent.call(this);
};
$hxClasses["haxe.ui.components.CheckBox"] = haxe_ui_components_CheckBox;
haxe_ui_components_CheckBox.__name__ = ["haxe","ui","components","CheckBox"];
haxe_ui_components_CheckBox.__interfaces__ = [haxe_ui_core_IClonable];
haxe_ui_components_CheckBox.__super__ = haxe_ui_core_InteractiveComponent;
haxe_ui_components_CheckBox.prototype = $extend(haxe_ui_core_InteractiveComponent.prototype,{
	_value: null
	,_label: null
	,createDefaults: function() {
		var _g = new haxe_ds_StringMap();
		var value = new haxe_ui_components_CheckBoxDefaultTextBehaviour(this);
		if(__map_reserved.text != null) _g.setReserved("text",value); else _g.h["text"] = value;
		var value1 = new haxe_ui_components_CheckBoxDefaultSelectedBehaviour(this);
		if(__map_reserved.selected != null) _g.setReserved("selected",value1); else _g.h["selected"] = value1;
		this._defaultBehaviours = _g;
		this._defaultLayout = new haxe_ui_layouts_HorizontalLayout();
	}
	,create: function() {
		haxe_ui_core_InteractiveComponent.prototype.create.call(this);
		this.behaviourSet("text",haxe_ui_util__$Variant_Variant_$Impl_$.fromString(this._text));
		this.behaviourSet("selected",haxe_ui_util__$Variant_Variant_$Impl_$.fromBool(this.get_selected()));
	}
	,createChildren: function() {
		if(this._value == null) {
			this._value = new haxe_ui_components_CheckBoxValue();
			this._value.set_id("checkbox-value");
			this._value.addClass("checkbox-value");
			this.addComponent(this._value);
			this._value.registerEvent("Click",$bind(this,this._onClick));
			this._value.registerEvent("MouseOver",$bind(this,this._onMouseOver));
			this._value.registerEvent("MouseOut",$bind(this,this._onMouseOut));
		}
	}
	,destroyChildren: function() {
		if(this._value != null) {
			this.removeComponent(this._value);
			this._value = null;
		}
		if(this._label != null) {
			this.removeComponent(this._label);
			this._label = null;
		}
	}
	,get_value: function() {
		return haxe_ui_util__$Variant_Variant_$Impl_$.fromBool(this.get_selected());
	}
	,set_value: function(value) {
		this.set_selected(haxe_ui_util__$Variant_Variant_$Impl_$.toBool(value));
		return value;
	}
	,set_text: function(value) {
		value = haxe_ui_core_InteractiveComponent.prototype.set_text.call(this,value);
		this.behaviourSet("text",haxe_ui_util__$Variant_Variant_$Impl_$.fromString(value));
		return value;
	}
	,applyStyle: function(style) {
		haxe_ui_core_InteractiveComponent.prototype.applyStyle.call(this,style);
		if(this._label != null) {
			this._label.customStyle.color = style.color;
			this._label.customStyle.fontName = style.fontName;
			this._label.customStyle.fontSize = style.fontSize;
			this._label.customStyle.cursor = style.cursor;
			this._label.invalidateStyle();
		}
	}
	,_selected: null
	,set_selected: function(value) {
		if(value == this._selected) return value;
		this._selected = value;
		this.behaviourSet("selected",haxe_ui_util__$Variant_Variant_$Impl_$.fromBool(value));
		var event = new haxe_ui_core_UIEvent("Change");
		this.dispatch(event);
		return value;
	}
	,get_selected: function() {
		return this._selected;
	}
	,toggleSelected: function() {
		return this.set_selected(!this.get_selected());
	}
	,_onClick: function(event) {
		this.toggleSelected();
		var event1 = new haxe_ui_core_UIEvent("Change");
		this.dispatch(event1);
	}
	,_onMouseOver: function(event) {
		this.addClass(":hover");
		this._value.addClass(":hover");
	}
	,_onMouseOut: function(event) {
		this.removeClass(":hover");
		this._value.removeClass(":hover");
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_InteractiveComponent.prototype.cloneComponent.call(this);
		c.set_selected(this.get_selected());
		return c;
	}
	,self: function() {
		return new haxe_ui_components_CheckBox();
	}
	,__class__: haxe_ui_components_CheckBox
	,__properties__: $extend(haxe_ui_core_InteractiveComponent.prototype.__properties__,{set_selected:"set_selected",get_selected:"get_selected"})
});
var haxe_ui_components_CheckBoxDefaultTextBehaviour = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components.CheckBoxDefaultTextBehaviour"] = haxe_ui_components_CheckBoxDefaultTextBehaviour;
haxe_ui_components_CheckBoxDefaultTextBehaviour.__name__ = ["haxe","ui","components","CheckBoxDefaultTextBehaviour"];
haxe_ui_components_CheckBoxDefaultTextBehaviour.__super__ = haxe_ui_core_Behaviour;
haxe_ui_components_CheckBoxDefaultTextBehaviour.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		var checkbox = this._component;
		if(checkbox._label == null) {
			checkbox._label = new haxe_ui_components_Label();
			checkbox._label.set_id("checkbox-label");
			checkbox._label.addClass("checkbox-label");
			checkbox._label.registerEvent("Click",$bind(checkbox,checkbox._onClick));
			checkbox._label.registerEvent("MouseOver",$bind(checkbox,checkbox._onMouseOver));
			checkbox._label.registerEvent("MouseOut",$bind(checkbox,checkbox._onMouseOut));
			checkbox.addComponent(checkbox._label);
		}
		checkbox._label.set_text(haxe_ui_util__$Variant_Variant_$Impl_$.toString(value));
	}
	,__class__: haxe_ui_components_CheckBoxDefaultTextBehaviour
});
var haxe_ui_components_CheckBoxDefaultSelectedBehaviour = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components.CheckBoxDefaultSelectedBehaviour"] = haxe_ui_components_CheckBoxDefaultSelectedBehaviour;
haxe_ui_components_CheckBoxDefaultSelectedBehaviour.__name__ = ["haxe","ui","components","CheckBoxDefaultSelectedBehaviour"];
haxe_ui_components_CheckBoxDefaultSelectedBehaviour.__super__ = haxe_ui_core_Behaviour;
haxe_ui_components_CheckBoxDefaultSelectedBehaviour.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		var checkbox = this._component;
		if(checkbox._value == null) return;
		if(haxe_ui_util__$Variant_Variant_$Impl_$.toBool(value) == true) checkbox._value.addClass(":selected"); else checkbox._value.removeClass(":selected");
	}
	,__class__: haxe_ui_components_CheckBoxDefaultSelectedBehaviour
});
var haxe_ui_components_CheckBoxValue = function() {
	haxe_ui_core_InteractiveComponent.call(this);
	this._icon = new haxe_ui_components_Image();
	this._icon.set_id("checkbox-icon");
	this._icon.addClass("checkbox-icon");
	this.addComponent(this._icon);
};
$hxClasses["haxe.ui.components.CheckBoxValue"] = haxe_ui_components_CheckBoxValue;
haxe_ui_components_CheckBoxValue.__name__ = ["haxe","ui","components","CheckBoxValue"];
haxe_ui_components_CheckBoxValue.__super__ = haxe_ui_core_InteractiveComponent;
haxe_ui_components_CheckBoxValue.prototype = $extend(haxe_ui_core_InteractiveComponent.prototype,{
	_icon: null
	,applyStyle: function(style) {
		haxe_ui_core_InteractiveComponent.prototype.applyStyle.call(this,style);
		if(this._icon != null) this._icon.set_resource(style.icon);
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_InteractiveComponent.prototype.cloneComponent.call(this);
		return c;
	}
	,self: function() {
		return new haxe_ui_components_CheckBoxValue();
	}
	,__class__: haxe_ui_components_CheckBoxValue
});
var haxe_ui_components_Progress = function() {
	this._indeterminate = false;
	this._rangeEnd = 0;
	this._rangeStart = 0;
	this._max = 100;
	this._min = 0;
	this._pos = 0;
	haxe_ui_core_InteractiveComponent.call(this);
	this.set_allowFocus(false);
	this.addClass("progress");
};
$hxClasses["haxe.ui.components.Progress"] = haxe_ui_components_Progress;
haxe_ui_components_Progress.__name__ = ["haxe","ui","components","Progress"];
haxe_ui_components_Progress.__interfaces__ = [haxe_ui_core_IClonable];
haxe_ui_components_Progress.__super__ = haxe_ui_core_InteractiveComponent;
haxe_ui_components_Progress.prototype = $extend(haxe_ui_core_InteractiveComponent.prototype,{
	_value: null
	,createDefaults: function() {
		var _g = new haxe_ds_StringMap();
		var value = new haxe_ui_components_ProgressDefaultMinBehaviour(this);
		if(__map_reserved.min != null) _g.setReserved("min",value); else _g.h["min"] = value;
		var value1 = new haxe_ui_components_ProgressDefaultMaxBehaviour(this);
		if(__map_reserved.max != null) _g.setReserved("max",value1); else _g.h["max"] = value1;
		var value2 = new haxe_ui_components_ProgressDefaultPosBehaviour(this);
		if(__map_reserved.pos != null) _g.setReserved("pos",value2); else _g.h["pos"] = value2;
		var value3 = new haxe_ui_components_ProgressDefaultRangeStartBehaviour(this);
		if(__map_reserved.rangeStart != null) _g.setReserved("rangeStart",value3); else _g.h["rangeStart"] = value3;
		var value4 = new haxe_ui_components_ProgressDefaultRangeEndBehaviour(this);
		if(__map_reserved.rangeEnd != null) _g.setReserved("rangeEnd",value4); else _g.h["rangeEnd"] = value4;
		var value5 = new haxe_ui_components_ProgressDefaultIndeterminateBehaviour(this);
		if(__map_reserved.indeterminate != null) _g.setReserved("indeterminate",value5); else _g.h["indeterminate"] = value5;
		this._defaultBehaviours = _g;
	}
	,create: function() {
		haxe_ui_core_InteractiveComponent.prototype.create.call(this);
		this.behaviourSet("min",haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this._min));
		this.behaviourSet("max",haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this._max));
		this.behaviourSet("pos",haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this._pos));
		this.behaviourSet("indeterminate",haxe_ui_util__$Variant_Variant_$Impl_$.fromBool(this._indeterminate));
	}
	,createChildren: function() {
		if(this._value == null) {
			this._value = new haxe_ui_core_Component();
			this._value.set_id("progress-value");
			this._value.addClass("progress-value");
			this.addComponent(this._value);
		}
	}
	,destroyChildren: function() {
		if(this._value != null) {
			this.removeComponent(this._value);
			this._value = null;
		}
	}
	,get_value: function() {
		return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.get_pos());
	}
	,set_value: function(value) {
		this.set_pos(haxe_ui_util__$Variant_Variant_$Impl_$.toInt(value));
		return value;
	}
	,_pos: null
	,get_pos: function() {
		return this._pos;
	}
	,set_pos: function(value) {
		if(this._ready) {
			if(value < this._min) value = this._min;
			if(value > this._max) value = this._max;
		}
		if(value == this._pos) return value;
		this._pos = value;
		this.behaviourSet("pos",haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(value));
		var changeEvent = new haxe_ui_core_UIEvent("Change");
		this.dispatch(changeEvent);
		this.handleBindings(["value"]);
		return value;
	}
	,_min: null
	,get_min: function() {
		return this._min;
	}
	,set_min: function(value) {
		if(this._ready) {
			if(value < this._min) value = this._min;
		}
		if(value == this._min) return value;
		this._min = value;
		this.behaviourSet("min",haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(value));
		return value;
	}
	,_max: null
	,get_max: function() {
		return this._max;
	}
	,set_max: function(value) {
		if(this._ready) {
			if(value > this._max) value = this._max;
		}
		if(value == this._max) return value;
		this._max = value;
		this.behaviourSet("max",haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(value));
		return value;
	}
	,_rangeStart: null
	,get_rangeStart: function() {
		return this._rangeStart;
	}
	,set_rangeStart: function(value) {
		if(this._ready) {
			if(value < this._min) value = this._min;
			if(value >= this._rangeEnd) value = this._rangeEnd;
		}
		this._rangeStart = value;
		this.behaviourSet("rangeStart",haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(value));
		return value;
	}
	,_rangeEnd: null
	,get_rangeEnd: function() {
		return this._rangeEnd;
	}
	,set_rangeEnd: function(value) {
		if(this._ready) {
			if(value > this._max) value = this._max;
			if(value <= this._rangeStart) value = this._rangeStart;
		}
		this._rangeEnd = value;
		this.behaviourSet("rangeEnd",haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(value));
		return value;
	}
	,_indeterminate: null
	,get_indeterminate: function() {
		return this._indeterminate;
	}
	,set_indeterminate: function(value) {
		if(value == this._indeterminate) return value;
		this._indeterminate = value;
		this.behaviourSet("indeterminate",haxe_ui_util__$Variant_Variant_$Impl_$.fromBool(value));
		return value;
	}
	,startIndeterminateAnimation: function() {
		var animationId = this.getClassProperty("animation.indeterminate");
		if(animationId == null) return;
		haxe_ui_animation_AnimationManager.get_instance().loop(animationId,(function($this) {
			var $r;
			var _g = new haxe_ds_StringMap();
			if(__map_reserved.target != null) _g.setReserved("target",$this); else _g.h["target"] = $this;
			$r = _g;
			return $r;
		}(this)));
	}
	,stopIndeterminateAnimation: function() {
	}
	,getProperty: function(name) {
		switch(name) {
		case "pos":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.get_pos());
			break;
		case "min":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.get_min());
			break;
		case "max":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.get_max());
			break;
		case "rangeStart":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.get_rangeStart());
			break;
		case "rangeEnd":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.get_rangeEnd());
			break;
		case "indeterminate":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromBool(this.get_indeterminate());
			break;
		}
		return haxe_ui_core_InteractiveComponent.prototype.getProperty.call(this,name);
	}
	,setProperty: function(name,v) {
		switch(name) {
		case "pos":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.set_pos(haxe_ui_util__$Variant_Variant_$Impl_$.toInt(v)));
			break;
		case "min":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.set_min(haxe_ui_util__$Variant_Variant_$Impl_$.toInt(v)));
			break;
		case "max":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.set_max(haxe_ui_util__$Variant_Variant_$Impl_$.toInt(v)));
			break;
		case "rangeStart":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.set_rangeStart(haxe_ui_util__$Variant_Variant_$Impl_$.toInt(v)));
			break;
		case "rangeEnd":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.set_rangeEnd(haxe_ui_util__$Variant_Variant_$Impl_$.toInt(v)));
			break;
		case "indeterminate":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromBool(this.set_indeterminate(haxe_ui_util__$Variant_Variant_$Impl_$.toBool(v)));
			break;
		}
		return haxe_ui_core_InteractiveComponent.prototype.setProperty.call(this,name,v);
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_InteractiveComponent.prototype.cloneComponent.call(this);
		c.set_pos(this.get_pos());
		c.set_min(this.get_min());
		c.set_max(this.get_max());
		c.set_rangeStart(this.get_rangeStart());
		c.set_rangeEnd(this.get_rangeEnd());
		c.set_indeterminate(this.get_indeterminate());
		return c;
	}
	,self: function() {
		return new haxe_ui_components_Progress();
	}
	,__class__: haxe_ui_components_Progress
	,__properties__: $extend(haxe_ui_core_InteractiveComponent.prototype.__properties__,{set_indeterminate:"set_indeterminate",get_indeterminate:"get_indeterminate",set_rangeEnd:"set_rangeEnd",get_rangeEnd:"get_rangeEnd",set_rangeStart:"set_rangeStart",get_rangeStart:"get_rangeStart",set_max:"set_max",get_max:"get_max",set_min:"set_min",get_min:"get_min",set_pos:"set_pos",get_pos:"get_pos"})
});
var haxe_ui_components_HProgress = function() {
	haxe_ui_components_Progress.call(this);
};
$hxClasses["haxe.ui.components.HProgress"] = haxe_ui_components_HProgress;
haxe_ui_components_HProgress.__name__ = ["haxe","ui","components","HProgress"];
haxe_ui_components_HProgress.__interfaces__ = [haxe_ui_core_IClonable];
haxe_ui_components_HProgress.__super__ = haxe_ui_components_Progress;
haxe_ui_components_HProgress.prototype = $extend(haxe_ui_components_Progress.prototype,{
	createDefaults: function() {
		haxe_ui_components_Progress.prototype.createDefaults.call(this);
		this._defaultLayout = new haxe_ui_components_HProgressLayout();
	}
	,createChildren: function() {
		haxe_ui_components_Progress.prototype.createChildren.call(this);
		if(this.get_componentWidth() <= 0) this.set_componentWidth(150);
		if(this.get_componentHeight() <= 0) this.set_componentHeight(20);
	}
	,cloneComponent: function() {
		var c = haxe_ui_components_Progress.prototype.cloneComponent.call(this);
		return c;
	}
	,self: function() {
		return new haxe_ui_components_HProgress();
	}
	,__class__: haxe_ui_components_HProgress
});
var haxe_ui_components_HProgressLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
};
$hxClasses["haxe.ui.components.HProgressLayout"] = haxe_ui_components_HProgressLayout;
haxe_ui_components_HProgressLayout.__name__ = ["haxe","ui","components","HProgressLayout"];
haxe_ui_components_HProgressLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_components_HProgressLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	resizeChildren: function() {
		haxe_ui_layouts_DefaultLayout.prototype.resizeChildren.call(this);
		var value = this.get_component().findComponent("progress-value");
		var progress = this.get_component();
		if(value != null) {
			var ucx = this.get_usableWidth();
			var cx = 0;
			if(progress.get_rangeStart() == progress.get_rangeEnd()) cx = (progress.get_pos() - progress.get_min()) / (progress.get_max() - progress.get_min()) * ucx; else cx = (progress.get_rangeEnd() - progress.get_rangeStart() - progress.get_min()) / (progress.get_max() - progress.get_min()) * ucx;
			if(cx < 0) cx = 0; else if(cx > ucx) cx = ucx;
			if(cx == 0) {
				value.set_componentWidth(0);
				value.set_hidden(true);
			} else {
				value.set_componentWidth(cx);
				value.set_hidden(false);
			}
		}
		return true;
	}
	,repositionChildren: function() {
		haxe_ui_layouts_DefaultLayout.prototype.repositionChildren.call(this);
		var value = this.get_component().findComponent("progress-value");
		var progress = this.get_component();
		if(value != null) {
			if(progress.get_rangeStart() != progress.get_rangeEnd()) {
				var ucx = this.get_usableWidth();
				value.set_left(this.get_paddingLeft() + (progress.get_rangeStart() - progress.get_min()) / (progress.get_max() - progress.get_min()) * ucx);
			}
		}
	}
	,__class__: haxe_ui_components_HProgressLayout
});
var haxe_ui_components_Scroll = function() {
	this._mouseDownOffset = -1;
	this._incrementSize = 20;
	this._pageSize = 0;
	this._max = 100;
	this._min = 0;
	this._pos = 0;
	haxe_ui_core_InteractiveComponent.call(this);
	this.addClass("scroll");
	this.set_allowFocus(false);
};
$hxClasses["haxe.ui.components.Scroll"] = haxe_ui_components_Scroll;
haxe_ui_components_Scroll.__name__ = ["haxe","ui","components","Scroll"];
haxe_ui_components_Scroll.__interfaces__ = [haxe_ui_core_IClonable];
haxe_ui_components_Scroll.__super__ = haxe_ui_core_InteractiveComponent;
haxe_ui_components_Scroll.prototype = $extend(haxe_ui_core_InteractiveComponent.prototype,{
	_incButton: null
	,_deincButton: null
	,_thumb: null
	,createDefaults: function() {
		var _g = new haxe_ds_StringMap();
		var value = new haxe_ui_components_ScrollDefaultMinBehaviour(this);
		if(__map_reserved.min != null) _g.setReserved("min",value); else _g.h["min"] = value;
		var value1 = new haxe_ui_components_ScrollDefaultMaxBehaviour(this);
		if(__map_reserved.max != null) _g.setReserved("max",value1); else _g.h["max"] = value1;
		var value2 = new haxe_ui_components_ScrollDefaultPosBehaviour(this);
		if(__map_reserved.pos != null) _g.setReserved("pos",value2); else _g.h["pos"] = value2;
		var value3 = new haxe_ui_components_ScrollDefaultPageSizeBehaviour(this);
		if(__map_reserved.pageSize != null) _g.setReserved("pageSize",value3); else _g.h["pageSize"] = value3;
		this._defaultBehaviours = _g;
	}
	,create: function() {
		haxe_ui_core_InteractiveComponent.prototype.create.call(this);
		this.behaviourSet("min",haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this._min));
		this.behaviourSet("max",haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this._max));
		this.behaviourSet("pos",haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this._pos));
		this.behaviourSet("pageSize",haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this._pageSize));
	}
	,createChildren: function() {
		if(this.get_componentWidth() <= 0) this.set_componentWidth(100);
		if(this.get_componentHeight() <= 0) this.set_componentHeight(100);
		if(this._deincButton == null) {
			this._deincButton = new haxe_ui_components_Button();
			this._deincButton.scriptAccess = false;
			this._deincButton.customStyle["native"] = false;
			this._deincButton.set_id("scroll-deinc-button");
			this._deincButton.addClass("deinc");
			this._deincButton.set_allowFocus(false);
			this._deincButton.repeater = true;
			this._deincButton.registerEvent("Click",$bind(this,this._onDeinc));
			this.addComponent(this._deincButton);
		}
		if(this._incButton == null) {
			this._incButton = new haxe_ui_components_Button();
			this._incButton.scriptAccess = false;
			this._incButton.customStyle["native"] = false;
			this._incButton.set_id("scroll-inc-button");
			this._incButton.addClass("inc");
			this._incButton.set_allowFocus(false);
			this._incButton.repeater = true;
			this._incButton.registerEvent("Click",$bind(this,this._onInc));
			this.addComponent(this._incButton);
		}
		if(this._thumb == null) {
			this._thumb = new haxe_ui_components_Button();
			this._thumb.scriptAccess = false;
			this._thumb.customStyle["native"] = false;
			this._thumb.set_id("scroll-thumb-button");
			this._thumb.addClass("thumb");
			this._thumb.set_allowFocus(false);
			this._thumb.remainPressed = true;
			this._thumb.registerEvent("MouseDown",$bind(this,this._onThumbMouseDown));
			this.addComponent(this._thumb);
		}
		this.registerEvent("MouseDown",$bind(this,this._onMouseDown));
	}
	,get_value: function() {
		return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.get_pos());
	}
	,set_value: function(value) {
		this.set_pos(haxe_ui_util__$Variant_Variant_$Impl_$.toInt(value));
		return value;
	}
	,_pos: null
	,get_pos: function() {
		return this._pos;
	}
	,set_pos: function(value) {
		if(this._ready) {
			if(value < this._min) value = this._min;
			if(value > this._max) value = this._max;
		}
		if(value != this._pos) {
			this._pos = value;
			this.behaviourSet("pos",haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(value));
			var changeEvent = new haxe_ui_core_UIEvent("Change");
			this.dispatch(changeEvent);
			this.handleBindings(["value"]);
		}
		return value;
	}
	,animatePos: function(value) {
		if(this.get_animatable() == false) {
			this.set_pos(value);
			return;
		}
		var animationId = this.getClassProperty("animation.pos");
		if(animationId == null) {
			this.set_pos(value);
			return;
		}
		haxe_ui_animation_AnimationManager.get_instance().run(animationId,(function($this) {
			var $r;
			var _g = new haxe_ds_StringMap();
			if(__map_reserved.target != null) _g.setReserved("target",$this); else _g.h["target"] = $this;
			$r = _g;
			return $r;
		}(this)),(function($this) {
			var $r;
			var _g1 = new haxe_ds_StringMap();
			if(__map_reserved.pos != null) _g1.setReserved("pos",value); else _g1.h["pos"] = value;
			$r = _g1;
			return $r;
		}(this)));
	}
	,_min: null
	,get_min: function() {
		return this._min;
	}
	,set_min: function(value) {
		if(value != this._min) {
			this._min = value;
			if(this._pos < this._min) this._pos = this._min;
			this.behaviourSet("min",haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(value));
		}
		return value;
	}
	,_max: null
	,get_max: function() {
		return this._max;
	}
	,set_max: function(value) {
		if(value != this._max) {
			this._max = value;
			if(this._pos > this._max) this._pos = this._max;
			this.behaviourSet("max",haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(value));
		}
		return value;
	}
	,_pageSize: null
	,get_pageSize: function() {
		return this._pageSize;
	}
	,set_pageSize: function(value) {
		if(value == this._pageSize) return value;
		this._pageSize = value;
		this.behaviourSet("pageSize",haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(value));
		return value;
	}
	,_incrementSize: null
	,get_incrementSize: function() {
		return this._incrementSize;
	}
	,set_incrementSize: function(value) {
		if(this._incrementSize == value) return value;
		this._incrementSize = value;
		return value;
	}
	,_mouseDownOffset: null
	,_onDeinc: function(event) {
		this.deincrementValue();
	}
	,_onInc: function(event) {
		this.incrementValue();
	}
	,_onThumbMouseDown: function(event) {
		this.get_screen().registerEvent("MouseUp",$bind(this,this._onScreenMouseUp));
		this.get_screen().registerEvent("MouseMove",$bind(this,this._onScreenMouseMove));
	}
	,_onScreenMouseMove: function(event) {
	}
	,_onScreenMouseUp: function(event) {
		this._mouseDownOffset = -1;
		this.get_screen().unregisterEvent("MouseUp",$bind(this,this._onScreenMouseUp));
		this.get_screen().unregisterEvent("MouseMove",$bind(this,this._onScreenMouseMove));
	}
	,_onMouseDown: function(event) {
		if(event.screenY < this._thumb.get_screenTop()) this.animatePos(this.get_pos() - this.get_pageSize()); else if(event.screenY > this._thumb.get_screenTop() + this._thumb.get_componentHeight()) this.animatePos(this.get_pos() + this.get_pageSize());
	}
	,deincrementValue: function() {
		this.animatePos(this.get_pos() - this._incrementSize);
	}
	,incrementValue: function() {
		this.animatePos(this.get_pos() + this._incrementSize);
	}
	,getProperty: function(name) {
		switch(name) {
		case "pos":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.get_pos());
			break;
		case "min":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.get_min());
			break;
		case "max":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.get_max());
			break;
		case "pageSize":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.get_pageSize());
			break;
		case "incrementSize":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.get_incrementSize());
			break;
		}
		return haxe_ui_core_InteractiveComponent.prototype.getProperty.call(this,name);
	}
	,setProperty: function(name,v) {
		switch(name) {
		case "pos":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.set_pos(haxe_ui_util__$Variant_Variant_$Impl_$.toInt(v)));
			break;
		case "min":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.set_min(haxe_ui_util__$Variant_Variant_$Impl_$.toInt(v)));
			break;
		case "max":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.set_max(haxe_ui_util__$Variant_Variant_$Impl_$.toInt(v)));
			break;
		case "pageSize":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.set_pageSize(haxe_ui_util__$Variant_Variant_$Impl_$.toInt(v)));
			break;
		case "incrementSize":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.set_incrementSize(haxe_ui_util__$Variant_Variant_$Impl_$.toInt(v)));
			break;
		}
		return haxe_ui_core_InteractiveComponent.prototype.setProperty.call(this,name,v);
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_InteractiveComponent.prototype.cloneComponent.call(this);
		c.set_pos(this.get_pos());
		c.set_min(this.get_min());
		c.set_max(this.get_max());
		c.set_pageSize(this.get_pageSize());
		c.set_incrementSize(this.get_incrementSize());
		return c;
	}
	,self: function() {
		return new haxe_ui_components_Scroll();
	}
	,__class__: haxe_ui_components_Scroll
	,__properties__: $extend(haxe_ui_core_InteractiveComponent.prototype.__properties__,{set_incrementSize:"set_incrementSize",get_incrementSize:"get_incrementSize",set_pageSize:"set_pageSize",get_pageSize:"get_pageSize",set_max:"set_max",get_max:"get_max",set_min:"set_min",get_min:"get_min",set_pos:"set_pos",get_pos:"get_pos"})
});
var haxe_ui_components_HScroll = function() {
	haxe_ui_components_Scroll.call(this);
};
$hxClasses["haxe.ui.components.HScroll"] = haxe_ui_components_HScroll;
haxe_ui_components_HScroll.__name__ = ["haxe","ui","components","HScroll"];
haxe_ui_components_HScroll.__interfaces__ = [haxe_ui_core_IClonable];
haxe_ui_components_HScroll.__super__ = haxe_ui_components_Scroll;
haxe_ui_components_HScroll.prototype = $extend(haxe_ui_components_Scroll.prototype,{
	createDefaults: function() {
		haxe_ui_components_Scroll.prototype.createDefaults.call(this);
		this._defaultLayout = new haxe_ui_components_HScrollLayout();
	}
	,_onThumbMouseDown: function(event) {
		haxe_ui_components_Scroll.prototype._onThumbMouseDown.call(this,event);
		this._mouseDownOffset = event.screenX - this._thumb.get_left();
	}
	,_onScreenMouseMove: function(event) {
		haxe_ui_components_Scroll.prototype._onScreenMouseMove.call(this,event);
		if(this._mouseDownOffset == -1) return;
		var xpos = event.screenX - this._mouseDownOffset;
		var minX = 0;
		if(this._deincButton != null) minX = this._deincButton.get_componentWidth() + this.get_layout().get_horizontalSpacing();
		var maxX = this.get_layout().get_usableWidth() - this._thumb.get_componentWidth();
		if(this._deincButton != null) maxX += this._deincButton.get_componentWidth() + this.get_layout().get_horizontalSpacing();
		if(xpos < minX) xpos = minX; else if(xpos > maxX) xpos = maxX;
		var ucx = this.get_layout().get_usableWidth();
		ucx -= this._thumb.get_componentWidth();
		var m = Std["int"](this.get_max() - this.get_min());
		var v = xpos - minX;
		var newValue = this.get_min() + v / ucx * m;
		this.set_pos(newValue);
	}
	,cloneComponent: function() {
		var c = haxe_ui_components_Scroll.prototype.cloneComponent.call(this);
		return c;
	}
	,self: function() {
		return new haxe_ui_components_HScroll();
	}
	,__class__: haxe_ui_components_HScroll
});
var haxe_ui_components_HScrollLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
};
$hxClasses["haxe.ui.components.HScrollLayout"] = haxe_ui_components_HScrollLayout;
haxe_ui_components_HScrollLayout.__name__ = ["haxe","ui","components","HScrollLayout"];
haxe_ui_components_HScrollLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_components_HScrollLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	resizeChildren: function() {
		haxe_ui_layouts_DefaultLayout.prototype.resizeChildren.call(this);
		var scroll = this.get_component();
		var thumb = this.get_component().findComponent("scroll-thumb-button");
		if(thumb != null) {
			var m = scroll.get_max() - scroll.get_min();
			var ucx = this.get_usableWidth();
			var thumbWidth = scroll.get_pageSize() / m * ucx;
			if(thumbWidth < this.get_innerHeight()) thumbWidth = this.get_innerHeight(); else if(thumbWidth > ucx) thumbWidth = ucx;
			if(thumbWidth > 0 && isNaN(thumbWidth) == false) thumb.set_componentWidth(thumbWidth);
		}
		return true;
	}
	,repositionChildren: function() {
		haxe_ui_layouts_DefaultLayout.prototype.repositionChildren.call(this);
		var deinc = this.get_component().findComponent("scroll-deinc-button");
		var inc = this.get_component().findComponent("scroll-inc-button");
		if(inc != null && this.hidden(inc) == false) inc.set_left(this.get_component().get_componentWidth() - inc.get_componentWidth() - this.get_paddingRight());
		var scroll = this.get_component();
		var thumb = this.get_component().findComponent("scroll-thumb-button");
		if(thumb != null) {
			var m = scroll.get_max() - scroll.get_min();
			var u = this.get_usableWidth();
			u -= thumb.get_componentWidth();
			var x = (scroll.get_pos() - scroll.get_min()) / m * u;
			x += this.get_paddingLeft();
			if(deinc != null && this.hidden(deinc) == false) x += deinc.get_componentWidth() + this.get_horizontalSpacing();
			thumb.set_left(x);
		}
	}
	,get_usableWidth: function() {
		var ucx = this.get_innerWidth();
		var deinc = this.get_component().findComponent("scroll-deinc-button");
		var inc = this.get_component().findComponent("scroll-inc-button");
		if(deinc != null && this.hidden(deinc) == false) ucx -= deinc.get_componentWidth() + this.get_horizontalSpacing();
		if(inc != null && this.hidden(inc) == false) ucx -= inc.get_componentWidth() + this.get_horizontalSpacing();
		return ucx;
	}
	,__class__: haxe_ui_components_HScrollLayout
});
var haxe_ui_components_Slider = function() {
	this._mouseDownOffset = -1;
	this._rangeEnd = 0;
	this._rangeStart = 0;
	this._max = 100;
	this._min = 0;
	this._pos = 0;
	haxe_ui_core_InteractiveComponent.call(this);
	this.set_allowFocus(false);
	this.addClass("slider");
};
$hxClasses["haxe.ui.components.Slider"] = haxe_ui_components_Slider;
haxe_ui_components_Slider.__name__ = ["haxe","ui","components","Slider"];
haxe_ui_components_Slider.__interfaces__ = [haxe_ui_core_IClonable];
haxe_ui_components_Slider.__super__ = haxe_ui_core_InteractiveComponent;
haxe_ui_components_Slider.prototype = $extend(haxe_ui_core_InteractiveComponent.prototype,{
	_valueBackground: null
	,_value: null
	,_rangeStartThumb: null
	,_rangeEndThumb: null
	,createDefaults: function() {
		var _g = new haxe_ds_StringMap();
		var value = new haxe_ui_components_SliderDefaultMinBehaviour(this);
		if(__map_reserved.min != null) _g.setReserved("min",value); else _g.h["min"] = value;
		var value1 = new haxe_ui_components_SliderDefaultMaxBehaviour(this);
		if(__map_reserved.max != null) _g.setReserved("max",value1); else _g.h["max"] = value1;
		var value2 = new haxe_ui_components_SliderDefaultPosBehaviour(this);
		if(__map_reserved.pos != null) _g.setReserved("pos",value2); else _g.h["pos"] = value2;
		var value3 = new haxe_ui_components_SliderDefaultRangeStartBehaviour(this);
		if(__map_reserved.rangeStart != null) _g.setReserved("rangeStart",value3); else _g.h["rangeStart"] = value3;
		var value4 = new haxe_ui_components_SliderDefaultRangeEndBehaviour(this);
		if(__map_reserved.rangeEnd != null) _g.setReserved("rangeEnd",value4); else _g.h["rangeEnd"] = value4;
		this._defaultBehaviours = _g;
	}
	,create: function() {
		haxe_ui_core_InteractiveComponent.prototype.create.call(this);
		this.behaviourSet("min",haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this._min));
		this.behaviourSet("max",haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this._max));
		this.behaviourSet("pos",haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this._pos));
	}
	,createChildren: function() {
		haxe_ui_core_InteractiveComponent.prototype.createChildren.call(this);
		if(this._valueBackground == null) {
			this._valueBackground = new haxe_ui_core_Component();
			this._valueBackground.set_id("slider-value-background");
			this._valueBackground.addClass("slider-value-background");
			this.addComponent(this._valueBackground);
			this._valueBackground.registerEvent("MouseDown",$bind(this,this._onValueBackgroundMouseDown));
		}
		if(this._value == null) {
			this._value = new haxe_ui_core_Component();
			this._value.set_id("slider-value");
			this._value.addClass("slider-value");
			this._valueBackground.addComponent(this._value);
			this._value.registerEvent("MouseDown",$bind(this,this._onValueMouseDown));
		}
		if(this._rangeEndThumb == null) {
			this._rangeEndThumb = new haxe_ui_components_Button();
			this._rangeEndThumb.scriptAccess = false;
			this._rangeEndThumb.customStyle["native"] = false;
			this._rangeEndThumb.set_id("slider-range-end-button");
			this._rangeEndThumb.addClass("slider-button");
			this._rangeEndThumb.remainPressed = true;
			this.addComponent(this._rangeEndThumb);
			this._rangeEndThumb.registerEvent("MouseDown",$bind(this,this._onRangeEndThumbMouseDown));
		}
	}
	,destroyChildren: function() {
		if(this._valueBackground != null) {
			if(this._value != null) {
				this._valueBackground.removeComponent(this._value);
				this._value = null;
			}
			this.removeComponent(this._valueBackground);
			this._valueBackground = null;
		}
		if(this._rangeEndThumb != null) {
			this.removeComponent(this._rangeEndThumb);
			this._rangeEndThumb = null;
		}
		if(this._rangeStartThumb != null) {
			this.removeComponent(this._rangeStartThumb);
			this._rangeStartThumb = null;
		}
	}
	,get_value: function() {
		return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.get_pos());
	}
	,set_value: function(value) {
		this.set_pos(haxe_ui_util__$Variant_Variant_$Impl_$.toInt(value));
		return value;
	}
	,_pos: null
	,get_pos: function() {
		return this._pos;
	}
	,set_pos: function(value) {
		if(this._ready) {
			if(value < this._min) value = this._min;
			if(value > this._max) value = this._max;
		}
		if(value == this._pos) return value;
		this._pos = value;
		this.behaviourSet("pos",haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(value));
		var changeEvent = new haxe_ui_core_UIEvent("Change");
		this.dispatch(changeEvent);
		this.handleBindings(["value"]);
		return value;
	}
	,animatePos: function(value) {
		if(this.get_animatable() == false) {
			this.set_pos(value);
			return;
		}
		var animationId = this.getClassProperty("animation.pos");
		if(animationId == null) {
			this.set_pos(value);
			return;
		}
		haxe_ui_animation_AnimationManager.get_instance().run(animationId,(function($this) {
			var $r;
			var _g = new haxe_ds_StringMap();
			if(__map_reserved.target != null) _g.setReserved("target",$this); else _g.h["target"] = $this;
			$r = _g;
			return $r;
		}(this)),(function($this) {
			var $r;
			var _g1 = new haxe_ds_StringMap();
			if(__map_reserved.pos != null) _g1.setReserved("pos",value); else _g1.h["pos"] = value;
			$r = _g1;
			return $r;
		}(this)));
	}
	,_min: null
	,get_min: function() {
		return this._min;
	}
	,set_min: function(value) {
		if(this._ready) {
			if(value < this._min) value = this._min;
		}
		if(value == this._min) return value;
		this._min = value;
		this.behaviourSet("min",haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(value));
		return value;
	}
	,_max: null
	,get_max: function() {
		return this._max;
	}
	,set_max: function(value) {
		if(this._ready) {
			if(value > this._max) value = this._max;
		}
		if(value == this._max) return value;
		this._max = value;
		this.behaviourSet("max",haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(value));
		return value;
	}
	,_rangeStart: null
	,get_rangeStart: function() {
		return this._rangeStart;
	}
	,set_rangeStart: function(value) {
		if(this._ready) {
			if(value < this._min) value = this._min;
			if(value >= this._rangeEnd - 1) value = this._rangeEnd - 1;
		}
		if(value != this._rangeStart) {
			if(this._rangeStartThumb == null) {
				this._rangeStartThumb = new haxe_ui_components_Button();
				this._rangeStartThumb.scriptAccess = false;
				this._rangeStartThumb.set_native(false);
				this._rangeStartThumb.set_id("slider-range-start-button");
				this._rangeStartThumb.addClass("slider-button");
				this._rangeStartThumb.remainPressed = true;
				this._rangeStartThumb.registerEvent("MouseDown",$bind(this,this._onRangeStartThumbMouseDown));
				this.addComponent(this._rangeStartThumb);
			}
			this._rangeStart = value;
			this.invalidateLayout();
			this.handleBindings(["value"]);
		}
		return value;
	}
	,animateRangeStart: function(value) {
		if(this.get_animatable() == false) {
			this.set_rangeStart(value);
			return;
		}
		var animationId = this.getClassProperty("animation.rangeStart");
		if(animationId == null) {
			this.set_rangeStart(value);
			return;
		}
		haxe_ui_animation_AnimationManager.get_instance().run(animationId,(function($this) {
			var $r;
			var _g = new haxe_ds_StringMap();
			if(__map_reserved.target != null) _g.setReserved("target",$this); else _g.h["target"] = $this;
			$r = _g;
			return $r;
		}(this)),(function($this) {
			var $r;
			var _g1 = new haxe_ds_StringMap();
			if(__map_reserved.rangeStart != null) _g1.setReserved("rangeStart",value); else _g1.h["rangeStart"] = value;
			$r = _g1;
			return $r;
		}(this)));
	}
	,_rangeEnd: null
	,get_rangeEnd: function() {
		return this._rangeEnd;
	}
	,set_rangeEnd: function(value) {
		if(this._ready) {
			if(value > this._max) value = this._max;
			if(value <= this._rangeStart + 1) value = this._rangeStart + 1;
		}
		if(value != this._rangeEnd) {
			this._rangeEnd = value;
			this.invalidateLayout();
			this.handleBindings(["value"]);
		}
		return value;
	}
	,animateRangeEnd: function(value) {
		if(this.get_animatable() == false) {
			this.set_rangeEnd(value);
			return;
		}
		var animationId = this.getClassProperty("animation.rangeEnd");
		if(animationId == null) {
			this.set_rangeEnd(value);
			return;
		}
		haxe_ui_animation_AnimationManager.get_instance().run(animationId,(function($this) {
			var $r;
			var _g = new haxe_ds_StringMap();
			if(__map_reserved.target != null) _g.setReserved("target",$this); else _g.h["target"] = $this;
			$r = _g;
			return $r;
		}(this)),(function($this) {
			var $r;
			var _g1 = new haxe_ds_StringMap();
			if(__map_reserved.rangeEnd != null) _g1.setReserved("rangeEnd",value); else _g1.h["rangeEnd"] = value;
			$r = _g1;
			return $r;
		}(this)));
	}
	,setRange: function(start,end) {
		if(start != this._rangeStart) this._rangeStart = start;
		if(end != this._rangeEnd) this._rangeEnd = end;
		this.invalidateLayout();
		this.handleBindings(["value"]);
	}
	,_mouseDownOffset: null
	,_activeThumb: null
	,_onValueBackgroundMouseDown: function(event) {
	}
	,_onValueMouseDown: function(event) {
		this._activeThumb = null;
		this.get_screen().registerEvent("MouseUp",$bind(this,this._onScreenMouseUp));
		this.get_screen().registerEvent("MouseMove",$bind(this,this._onScreenMouseMove));
	}
	,_onRangeEndThumbMouseDown: function(event) {
		this._activeThumb = this._rangeEndThumb;
		this.get_screen().registerEvent("MouseUp",$bind(this,this._onScreenMouseUp));
		this.get_screen().registerEvent("MouseMove",$bind(this,this._onScreenMouseMove));
	}
	,_onRangeStartThumbMouseDown: function(event) {
		this._activeThumb = this._rangeStartThumb;
		this.get_screen().registerEvent("MouseUp",$bind(this,this._onScreenMouseUp));
		this.get_screen().registerEvent("MouseMove",$bind(this,this._onScreenMouseMove));
	}
	,_onScreenMouseMove: function(event) {
	}
	,_onScreenMouseUp: function(event) {
		this._mouseDownOffset = -1;
		this._activeThumb = null;
		this.get_screen().unregisterEvent("MouseUp",$bind(this,this._onScreenMouseUp));
		this.get_screen().unregisterEvent("MouseMove",$bind(this,this._onScreenMouseMove));
	}
	,getProperty: function(name) {
		switch(name) {
		case "pos":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.get_pos());
			break;
		case "min":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.get_min());
			break;
		case "max":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.get_max());
			break;
		case "rangeStart":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.get_rangeStart());
			break;
		case "rangeEnd":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.get_rangeEnd());
			break;
		}
		return haxe_ui_core_InteractiveComponent.prototype.getProperty.call(this,name);
	}
	,setProperty: function(name,v) {
		switch(name) {
		case "pos":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.set_pos(haxe_ui_util__$Variant_Variant_$Impl_$.toInt(v)));
			break;
		case "min":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.set_min(haxe_ui_util__$Variant_Variant_$Impl_$.toInt(v)));
			break;
		case "max":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.set_max(haxe_ui_util__$Variant_Variant_$Impl_$.toInt(v)));
			break;
		case "rangeStart":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.set_rangeStart(haxe_ui_util__$Variant_Variant_$Impl_$.toInt(v)));
			break;
		case "rangeEnd":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.set_rangeEnd(haxe_ui_util__$Variant_Variant_$Impl_$.toInt(v)));
			break;
		}
		return haxe_ui_core_InteractiveComponent.prototype.setProperty.call(this,name,v);
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_InteractiveComponent.prototype.cloneComponent.call(this);
		c.set_pos(this.get_pos());
		c.set_min(this.get_min());
		c.set_max(this.get_max());
		c.set_rangeStart(this.get_rangeStart());
		c.set_rangeEnd(this.get_rangeEnd());
		return c;
	}
	,self: function() {
		return new haxe_ui_components_Slider();
	}
	,__class__: haxe_ui_components_Slider
	,__properties__: $extend(haxe_ui_core_InteractiveComponent.prototype.__properties__,{set_rangeEnd:"set_rangeEnd",get_rangeEnd:"get_rangeEnd",set_rangeStart:"set_rangeStart",get_rangeStart:"get_rangeStart",set_max:"set_max",get_max:"get_max",set_min:"set_min",get_min:"get_min",set_pos:"set_pos",get_pos:"get_pos"})
});
var haxe_ui_components_HSlider = function() {
	haxe_ui_components_Slider.call(this);
};
$hxClasses["haxe.ui.components.HSlider"] = haxe_ui_components_HSlider;
haxe_ui_components_HSlider.__name__ = ["haxe","ui","components","HSlider"];
haxe_ui_components_HSlider.__interfaces__ = [haxe_ui_core_IClonable];
haxe_ui_components_HSlider.__super__ = haxe_ui_components_Slider;
haxe_ui_components_HSlider.prototype = $extend(haxe_ui_components_Slider.prototype,{
	createDefaults: function() {
		haxe_ui_components_Slider.prototype.createDefaults.call(this);
		this._defaultLayout = new haxe_ui_components_HSliderLayout();
	}
	,createChildren: function() {
		haxe_ui_components_Slider.prototype.createChildren.call(this);
		if(this.get_componentWidth() <= 0) this.set_componentWidth(150);
		if(this.get_componentHeight() <= 0) this.set_componentHeight(20);
		if(this._valueBackground != null) {
		}
	}
	,_onValueBackgroundMouseDown: function(event) {
		haxe_ui_components_Slider.prototype._onValueBackgroundMouseDown.call(this,event);
		if(this._value.hitTest(event.screenX,event.screenY) == false) {
			if(this.get_rangeEnd() != this.get_rangeStart()) {
				if(event.screenX < this._rangeStartThumb.get_screenLeft()) {
					this._activeThumb = this._rangeStartThumb;
					var xpos = event.screenX - this._valueBackground.get_screenLeft() - this._activeThumb.get_componentWidth() / 2 - this._valueBackground.get_paddingLeft();
					this.animateRangeStart(this.calcPosFromCoord(xpos));
					this._onRangeStartThumbMouseDown(event);
				} else if(event.screenX > this._rangeEndThumb.get_screenLeft() + this._rangeEndThumb.get_componentWidth()) {
					this._activeThumb = this._rangeEndThumb;
					var xpos1 = event.screenX - this._valueBackground.get_screenLeft() - this._activeThumb.get_componentWidth() / 2 - this._valueBackground.get_paddingLeft();
					this.animateRangeEnd(this.calcPosFromCoord(xpos1));
					this._onRangeEndThumbMouseDown(event);
				}
			} else {
				this._activeThumb = this._rangeEndThumb;
				var xpos2 = event.screenX - this._valueBackground.get_screenLeft() - this._activeThumb.get_componentWidth() / 2 - this._valueBackground.get_paddingLeft();
				this.animatePos(this.calcPosFromCoord(xpos2));
				this._onRangeEndThumbMouseDown(event);
			}
		}
	}
	,_onValueMouseDown: function(event) {
		haxe_ui_components_Slider.prototype._onValueMouseDown.call(this,event);
		if(this.get_rangeEnd() != this.get_rangeStart()) this._mouseDownOffset = event.screenX - this._value.get_left(); else {
			this._activeThumb = this._rangeEndThumb;
			var xpos = event.screenX - this._valueBackground.get_screenLeft() - this._activeThumb.get_componentWidth() / 2 - this._valueBackground.get_paddingLeft();
			this.animatePos(this.calcPosFromCoord(xpos));
			this._onRangeEndThumbMouseDown(event);
		}
	}
	,_onRangeEndThumbMouseDown: function(event) {
		haxe_ui_components_Slider.prototype._onRangeEndThumbMouseDown.call(this,event);
		this._mouseDownOffset = event.screenX - this._activeThumb.get_screenLeft() + this._valueBackground.get_paddingLeft();
	}
	,_onRangeStartThumbMouseDown: function(event) {
		haxe_ui_components_Slider.prototype._onRangeStartThumbMouseDown.call(this,event);
		this._mouseDownOffset = event.screenX - this._activeThumb.get_screenLeft() + this._valueBackground.get_paddingLeft();
	}
	,_onScreenMouseMove: function(event) {
		if(this._mouseDownOffset == -1) return;
		if(this._activeThumb != null) {
			var xpos = event.screenX - this._valueBackground.get_screenLeft() - this._mouseDownOffset;
			if(this.get_rangeEnd() != this.get_rangeStart()) {
				if(this._activeThumb == this._rangeEndThumb) this.set_rangeEnd(this.calcPosFromCoord(xpos)); else if(this._activeThumb == this._rangeStartThumb) this.set_rangeStart(this.calcPosFromCoord(xpos));
			} else this.set_pos(this.calcPosFromCoord(xpos));
		} else {
			var diff = this.get_rangeEnd() - this.get_rangeStart();
			var xpos1 = event.screenX - this._mouseDownOffset;
			this._activeThumb = this._rangeStartThumb;
			var start = this.calcPosFromCoord(xpos1 - this._activeThumb.get_componentWidth() / 2 - this._valueBackground.get_paddingLeft());
			this._activeThumb = null;
			if(start + diff > this.get_max()) return;
			var end = start + diff;
			this.setRange(start,end);
		}
	}
	,calcPosFromCoord: function(xpos) {
		var minX = -(this._activeThumb.get_componentWidth() / 2);
		var maxX = this.get_layout().get_usableWidth() - this._activeThumb.get_componentWidth() / 2 - (this._valueBackground.get_paddingLeft() + this._valueBackground.get_paddingRight());
		if(xpos < minX) xpos = minX; else if(xpos > maxX) xpos = maxX;
		var ucx = this.get_layout().get_usableWidth() - (this._valueBackground.get_paddingLeft() + this._valueBackground.get_paddingRight());
		var m = this.get_max() - this.get_min();
		var v = xpos - minX;
		var newValue = this.get_min() + v / ucx * m;
		return newValue;
	}
	,cloneComponent: function() {
		var c = haxe_ui_components_Slider.prototype.cloneComponent.call(this);
		return c;
	}
	,self: function() {
		return new haxe_ui_components_HSlider();
	}
	,__class__: haxe_ui_components_HSlider
});
var haxe_ui_components_HSliderLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
};
$hxClasses["haxe.ui.components.HSliderLayout"] = haxe_ui_components_HSliderLayout;
haxe_ui_components_HSliderLayout.__name__ = ["haxe","ui","components","HSliderLayout"];
haxe_ui_components_HSliderLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_components_HSliderLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	resizeChildren: function() {
		haxe_ui_layouts_DefaultLayout.prototype.resizeChildren.call(this);
		var background = this.get_component().findComponent("slider-value-background");
		var value = null;
		if(background != null) value = background.findComponent("slider-value");
		var slider = this.get_component();
		if(value != null) {
			var ucx = background.get_layout().get_usableWidth();
			var cx = 0;
			if(slider.get_rangeStart() == slider.get_rangeEnd()) cx = (slider.get_pos() - slider.get_min()) / (slider.get_max() - slider.get_min()) * ucx; else cx = (slider.get_rangeEnd() - slider.get_rangeStart() - slider.get_min()) / (slider.get_max() - slider.get_min()) * ucx;
			if(cx < 0) cx = 0; else if(cx > ucx) cx = ucx;
			if(cx == 0) {
				value.set_componentWidth(cx);
				if(value.get_hidden() == false) {
					value.set_hidden(true);
					value.invalidateStyle();
				}
			} else {
				value.set_componentWidth(cx);
				if(value.get_hidden() == true) {
					value.set_hidden(false);
					value.invalidateStyle();
				}
			}
		}
		return true;
	}
	,repositionChildren: function() {
		haxe_ui_layouts_DefaultLayout.prototype.repositionChildren.call(this);
		var background = this.get_component().findComponent("slider-value-background");
		var value = null;
		if(background != null) value = background.findComponent("slider-value");
		var slider = this.get_component();
		if(value != null) {
			var rangeStartButton = null;
			var rangeEndButton = this.get_component().findComponent("slider-range-end-button");
			var x = 0;
			if(slider.get_rangeStart() != slider.get_rangeEnd()) {
				rangeStartButton = this.get_component().findComponent("slider-range-start-button");
				var ucx = background.get_layout().get_usableWidth();
				x = (slider.get_rangeStart() - slider.get_min()) / (slider.get_max() - slider.get_min()) * ucx;
			}
			value.set_left(x + background.get_layout().get_paddingLeft());
			if(rangeStartButton != null) rangeStartButton.set_left(x);
			if(rangeEndButton != null) rangeEndButton.set_left(this.get_paddingLeft() + value.get_left() + value.get_componentWidth() - rangeEndButton.get_componentWidth() / 2);
		}
	}
	,__class__: haxe_ui_components_HSliderLayout
});
var haxe_ui_components_Image = function() {
	this._originalSize = new haxe_ui_util_Size();
	haxe_ui_core_Component.call(this);
};
$hxClasses["haxe.ui.components.Image"] = haxe_ui_components_Image;
haxe_ui_components_Image.__name__ = ["haxe","ui","components","Image"];
haxe_ui_components_Image.__interfaces__ = [haxe_ui_core_IClonable];
haxe_ui_components_Image.__super__ = haxe_ui_core_Component;
haxe_ui_components_Image.prototype = $extend(haxe_ui_core_Component.prototype,{
	_originalSize: null
	,createDefaults: function() {
		var _g = new haxe_ds_StringMap();
		var value = new haxe_ui_components_ImageDefaultResourceBehaviour(this);
		if(__map_reserved.resource != null) _g.setReserved("resource",value); else _g.h["resource"] = value;
		this._defaultBehaviours = _g;
		this._defaultLayout = new haxe_ui_components_ImageLayout();
	}
	,create: function() {
		haxe_ui_core_Component.prototype.create.call(this);
		this.behaviourSet("resource",haxe_ui_util__$Variant_Variant_$Impl_$.fromString(this._resource));
	}
	,_resource: null
	,get_resource: function() {
		return this._resource;
	}
	,set_resource: function(value) {
		if(this._resource == value) return value;
		if(value == null) {
			this._resource = null;
			this.removeImageDisplay();
			return value;
		}
		this._resource = "" + Std.string(value);
		this.behaviourSet("resource",haxe_ui_util__$Variant_Variant_$Impl_$.fromString(this._resource));
		this._resource = value;
		return value;
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_Component.prototype.cloneComponent.call(this);
		c.set_resource(this.get_resource());
		return c;
	}
	,self: function() {
		return new haxe_ui_components_Image();
	}
	,getProperty: function(name) {
		switch(name) {
		case "resource":
			return this.get_resource();
		}
		return haxe_ui_core_Component.prototype.getProperty.call(this,name);
	}
	,setProperty: function(name,v) {
		switch(name) {
		case "resource":
			return this.set_resource(v);
		}
		return haxe_ui_core_Component.prototype.setProperty.call(this,name,v);
	}
	,__class__: haxe_ui_components_Image
	,__properties__: $extend(haxe_ui_core_Component.prototype.__properties__,{set_resource:"set_resource",get_resource:"get_resource"})
});
var haxe_ui_components_ImageLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
};
$hxClasses["haxe.ui.components.ImageLayout"] = haxe_ui_components_ImageLayout;
haxe_ui_components_ImageLayout.__name__ = ["haxe","ui","components","ImageLayout"];
haxe_ui_components_ImageLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_components_ImageLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	maintainAspectRatio: null
	,get_maintainAspectRatio: function() {
		return true;
	}
	,resizeChildren: function() {
		if(this.get_component().hasImageDisplay()) {
			if(this.get_component().get_autoWidth() == false) {
				var usz = this.get_usableSize();
				this.get_component().getImageDisplay().set_imageWidth(usz.width);
				if(this.get_maintainAspectRatio() == true) {
					var image = this._component;
					var r = usz.width / image._originalSize.width;
					this.get_component().getImageDisplay().set_imageHeight(image._originalSize.height * r);
					this.get_component().set_componentHeight(this.get_component().getImageDisplay().get_imageHeight() + (this.get_paddingTop() + this.get_paddingBottom()));
				}
			}
			if(this.get_component().get_autoHeight() == false) {
				var usz1 = this.get_usableSize();
				this.get_component().getImageDisplay().set_imageHeight(usz1.height);
				if(this.get_maintainAspectRatio() == true) {
					var image1 = this._component;
					var r1 = usz1.height / image1._originalSize.height;
					this.get_component().getImageDisplay().set_imageWidth(image1._originalSize.width * r1);
					this.get_component().set_componentWidth(this.get_component().getImageDisplay().get_imageWidth() + (this.get_paddingLeft() + this.get_paddingRight()));
				}
			}
		}
		return true;
	}
	,repositionChildren: function() {
		if(this.get_component().hasImageDisplay()) {
			this.get_component().getImageDisplay().set_left(this.get_paddingLeft());
			this.get_component().getImageDisplay().set_top(this.get_paddingTop());
		}
	}
	,calcAutoSize: function() {
		var size = haxe_ui_layouts_DefaultLayout.prototype.calcAutoSize.call(this);
		if(this.get_component().hasImageDisplay()) {
			size.width += this.get_component().getImageDisplay().get_imageWidth();
			size.height += this.get_component().getImageDisplay().get_imageHeight();
		}
		return size;
	}
	,__class__: haxe_ui_components_ImageLayout
	,__properties__: $extend(haxe_ui_layouts_DefaultLayout.prototype.__properties__,{get_maintainAspectRatio:"get_maintainAspectRatio"})
});
var haxe_ui_components_ImageDefaultResourceBehaviour = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components.ImageDefaultResourceBehaviour"] = haxe_ui_components_ImageDefaultResourceBehaviour;
haxe_ui_components_ImageDefaultResourceBehaviour.__name__ = ["haxe","ui","components","ImageDefaultResourceBehaviour"];
haxe_ui_components_ImageDefaultResourceBehaviour.__super__ = haxe_ui_core_Behaviour;
haxe_ui_components_ImageDefaultResourceBehaviour.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		var image = this._component;
		if(value == null || haxe_ui_util__$Variant_Variant_$Impl_$.get_isNull(value) || haxe_ui_util__$Variant_Variant_$Impl_$.toString(value) == "null") {
			image.removeImageDisplay();
			return;
		}
		if(haxe_ui_util__$Variant_Variant_$Impl_$.get_isString(value)) {
			var resource = haxe_ui_util__$Variant_Variant_$Impl_$.toString(value);
			if(StringTools.startsWith(resource,"http://")) {
			} else haxe_ui_Toolkit.get_assets().getImage(resource,function(imageInfo) {
				if(imageInfo != null) {
					var display = image.getImageDisplay();
					if(display != null) {
						display.set_imageInfo(imageInfo);
						image._originalSize = new haxe_ui_util_Size(imageInfo.width,imageInfo.height);
						if(image.autoSize() == true) image.parentComponent.invalidateLayout();
					}
				}
			});
		}
	}
	,__class__: haxe_ui_components_ImageDefaultResourceBehaviour
});
var haxe_ui_components_Label = function() {
	haxe_ui_core_InteractiveComponent.call(this);
};
$hxClasses["haxe.ui.components.Label"] = haxe_ui_components_Label;
haxe_ui_components_Label.__name__ = ["haxe","ui","components","Label"];
haxe_ui_components_Label.__interfaces__ = [haxe_ui_core_IClonable];
haxe_ui_components_Label.__super__ = haxe_ui_core_InteractiveComponent;
haxe_ui_components_Label.prototype = $extend(haxe_ui_core_InteractiveComponent.prototype,{
	createDefaults: function() {
		var _g = new haxe_ds_StringMap();
		var value = new haxe_ui_components_LabelDefaultTextBehaviour(this);
		if(__map_reserved.text != null) _g.setReserved("text",value); else _g.h["text"] = value;
		this._defaultBehaviours = _g;
		this._defaultLayout = new haxe_ui_components_LabelLayout();
	}
	,create: function() {
		haxe_ui_core_InteractiveComponent.prototype.create.call(this);
		this.behaviourSet("text",haxe_ui_util__$Variant_Variant_$Impl_$.fromString(this._text));
	}
	,set_text: function(value) {
		if(value == this._text) return value;
		value = haxe_ui_core_InteractiveComponent.prototype.set_text.call(this,value);
		this.behaviourSet("text",haxe_ui_util__$Variant_Variant_$Impl_$.fromString(value));
		this.handleBindings(["text","value"]);
		this.invalidateLayout();
		return value;
	}
	,applyStyle: function(style) {
		haxe_ui_core_InteractiveComponent.prototype.applyStyle.call(this,style);
		if(this.hasTextDisplay() == true) {
			if(style.color != null) this.getTextDisplay().set_color(style.color);
			if(style.fontName != null) this.getTextDisplay().set_fontName(style.fontName);
			if(style.fontSize != null) this.getTextDisplay().set_fontSize(style.fontSize);
		}
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_InteractiveComponent.prototype.cloneComponent.call(this);
		return c;
	}
	,self: function() {
		return new haxe_ui_components_Label();
	}
	,__class__: haxe_ui_components_Label
});
var haxe_ui_components_LabelLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
};
$hxClasses["haxe.ui.components.LabelLayout"] = haxe_ui_components_LabelLayout;
haxe_ui_components_LabelLayout.__name__ = ["haxe","ui","components","LabelLayout"];
haxe_ui_components_LabelLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_components_LabelLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	resizeChildren: function() {
		if(this.get_component().get_autoWidth() == false) this.get_component().getTextDisplay().set_width(this.get_component().get_componentWidth());
		return true;
	}
	,repositionChildren: function() {
		if(this.get_component().hasTextDisplay() == true) {
			this.get_component().getTextDisplay().set_left(this.get_paddingLeft());
			this.get_component().getTextDisplay().set_top(this.get_paddingTop());
		}
	}
	,calcAutoSize: function() {
		var size = haxe_ui_layouts_DefaultLayout.prototype.calcAutoSize.call(this);
		if(this.get_component().hasTextDisplay() == true) {
			size.width += this.get_component().getTextDisplay().get_textWidth();
			size.height += this.get_component().getTextDisplay().get_textHeight();
		}
		return size;
	}
	,__class__: haxe_ui_components_LabelLayout
});
var haxe_ui_components_LabelDefaultTextBehaviour = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components.LabelDefaultTextBehaviour"] = haxe_ui_components_LabelDefaultTextBehaviour;
haxe_ui_components_LabelDefaultTextBehaviour.__name__ = ["haxe","ui","components","LabelDefaultTextBehaviour"];
haxe_ui_components_LabelDefaultTextBehaviour.__super__ = haxe_ui_core_Behaviour;
haxe_ui_components_LabelDefaultTextBehaviour.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		if(haxe_ui_util__$Variant_Variant_$Impl_$.get_isNull(value)) value = haxe_ui_util__$Variant_Variant_$Impl_$.fromString("");
		var label = this._component;
		label.getTextDisplay().set_text(haxe_ui_util__$Variant_Variant_$Impl_$.toString(value));
		label.invalidateDisplay();
	}
	,__class__: haxe_ui_components_LabelDefaultTextBehaviour
});
var haxe_ui_components_OptionBox = function() {
	this._selected = false;
	haxe_ui_core_InteractiveComponent.call(this);
	if(haxe_ui_components_OptionBox._groups == null) haxe_ui_components_OptionBox._groups = new haxe_ds_StringMap();
	this.set_group("defaultGroup");
};
$hxClasses["haxe.ui.components.OptionBox"] = haxe_ui_components_OptionBox;
haxe_ui_components_OptionBox.__name__ = ["haxe","ui","components","OptionBox"];
haxe_ui_components_OptionBox.__interfaces__ = [haxe_ui_core_IClonable];
haxe_ui_components_OptionBox.optionInGroup = function(value,option) {
	var exists = false;
	var arr = haxe_ui_components_OptionBox._groups.get(value);
	if(arr != null) {
		var _g = 0;
		while(_g < arr.length) {
			var test = arr[_g];
			++_g;
			if(test == option) {
				exists = true;
				break;
			}
		}
	}
	return exists;
};
haxe_ui_components_OptionBox.getGroupOptions = function(group) {
	return haxe_ui_components_OptionBox._groups.get(group);
};
haxe_ui_components_OptionBox.__super__ = haxe_ui_core_InteractiveComponent;
haxe_ui_components_OptionBox.prototype = $extend(haxe_ui_core_InteractiveComponent.prototype,{
	_value: null
	,_label: null
	,createDefaults: function() {
		var _g = new haxe_ds_StringMap();
		var value = new haxe_ui_components_OptionBoxDefaultTextBehaviour(this);
		if(__map_reserved.text != null) _g.setReserved("text",value); else _g.h["text"] = value;
		var value1 = new haxe_ui_components_OptionBoxDefaultSelectedBehaviour(this);
		if(__map_reserved.selected != null) _g.setReserved("selected",value1); else _g.h["selected"] = value1;
		this._defaultBehaviours = _g;
		this._defaultLayout = new haxe_ui_layouts_HorizontalLayout();
	}
	,create: function() {
		haxe_ui_core_InteractiveComponent.prototype.create.call(this);
		this.behaviourSet("text",haxe_ui_util__$Variant_Variant_$Impl_$.fromString(this._text));
		this.behaviourSet("group",haxe_ui_util__$Variant_Variant_$Impl_$.fromString(this._group));
		this.behaviourSet("selected",haxe_ui_util__$Variant_Variant_$Impl_$.fromBool(this.get_selected()));
	}
	,createChildren: function() {
		if(this._value == null) {
			this._value = new haxe_ui_components_OptionBoxValue();
			this._value.set_id("optionbox-value");
			this._value.addClass("optionbox-value");
			this.addComponent(this._value);
			this._value.registerEvent("Click",$bind(this,this._onClick));
			this._value.registerEvent("MouseOver",$bind(this,this._onMouseOver));
			this._value.registerEvent("MouseOut",$bind(this,this._onMouseOut));
		}
	}
	,destroyChildren: function() {
		if(this._value != null) {
			this.removeComponent(this._value);
			this._value = null;
		}
		if(this._label != null) {
			this.removeComponent(this._label);
			this._label = null;
		}
	}
	,get_value: function() {
		return haxe_ui_util__$Variant_Variant_$Impl_$.fromBool(this.get_selected());
	}
	,set_value: function(value) {
		this.set_selected(haxe_ui_util__$Variant_Variant_$Impl_$.toBool(value));
		return value;
	}
	,set_text: function(value) {
		value = haxe_ui_core_InteractiveComponent.prototype.set_text.call(this,value);
		this.behaviourSet("text",haxe_ui_util__$Variant_Variant_$Impl_$.fromString(value));
		return value;
	}
	,applyStyle: function(style) {
		haxe_ui_core_InteractiveComponent.prototype.applyStyle.call(this,style);
		if(this._label != null) {
			this._label.customStyle.color = style.color;
			this._label.customStyle.fontName = style.fontName;
			this._label.customStyle.fontSize = style.fontSize;
			this._label.customStyle.cursor = style.cursor;
			this._label.invalidateStyle();
		}
	}
	,_selected: null
	,set_selected: function(value) {
		if(value == this._selected) return value;
		if(this._group != null && value == false) {
			var arr = haxe_ui_components_OptionBox._groups.get(this._group);
			var hasSelection = false;
			if(arr != null) {
				var _g = 0;
				while(_g < arr.length) {
					var option = arr[_g];
					++_g;
					if(option != this && option.get_selected() == true) {
						hasSelection = true;
						break;
					}
				}
			}
			if(hasSelection == false) return value;
		}
		this._selected = value;
		this.behaviourSet("selected",haxe_ui_util__$Variant_Variant_$Impl_$.fromBool(value));
		if(this._group != null && value == true) {
			var arr1 = haxe_ui_components_OptionBox._groups.get(this._group);
			if(arr1 != null) {
				var _g1 = 0;
				while(_g1 < arr1.length) {
					var option1 = arr1[_g1];
					++_g1;
					if(option1 != this) option1.set_selected(false);
				}
			}
		}
		return value;
	}
	,get_selected: function() {
		return this._selected;
	}
	,toggleSelected: function() {
		return this.set_selected(!this.get_selected());
	}
	,_group: null
	,get_group: function() {
		return this._group;
	}
	,set_group: function(value) {
		if(value != null) {
			var arr1 = haxe_ui_components_OptionBox._groups.get(value);
			if(arr1 != null) HxOverrides.remove(arr1,this);
		}
		this._group = value;
		this.behaviourSet("group",haxe_ui_util__$Variant_Variant_$Impl_$.fromString(value));
		var arr = haxe_ui_components_OptionBox._groups.get(value);
		if(arr == null) arr = [];
		if(haxe_ui_components_OptionBox.optionInGroup(value,this) == false) arr.push(this);
		haxe_ui_components_OptionBox._groups.set(value,arr);
		return value;
	}
	,selectedOption: null
	,get_selectedOption: function() {
		var arr = haxe_ui_components_OptionBox.getGroupOptions(this._group);
		var selectionOption = null;
		if(arr != null) {
			var _g = 0;
			while(_g < arr.length) {
				var test = arr[_g];
				++_g;
				if(test.get_selected() == true) {
					selectionOption = test;
					break;
				}
			}
		}
		return selectionOption;
	}
	,_onClick: function(event) {
		this.toggleSelected();
		var event1 = new haxe_ui_core_UIEvent("Change");
		this.dispatch(event1);
	}
	,_onMouseOver: function(event) {
		this.addClass(":hover");
		this._value.addClass(":hover");
	}
	,_onMouseOut: function(event) {
		this.removeClass(":hover");
		this._value.removeClass(":hover");
	}
	,getProperty: function(name) {
		switch(name) {
		case "selected":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromBool(this.get_selected());
			break;
		}
		return haxe_ui_core_InteractiveComponent.prototype.getProperty.call(this,name);
	}
	,setProperty: function(name,v) {
		switch(name) {
		case "selected":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromBool(this.set_selected(haxe_ui_util__$Variant_Variant_$Impl_$.toBool(v)));
			break;
		}
		return haxe_ui_core_InteractiveComponent.prototype.setProperty.call(this,name,v);
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_InteractiveComponent.prototype.cloneComponent.call(this);
		c.set_selected(this.get_selected());
		c.set_group(this.get_group());
		return c;
	}
	,self: function() {
		return new haxe_ui_components_OptionBox();
	}
	,__class__: haxe_ui_components_OptionBox
	,__properties__: $extend(haxe_ui_core_InteractiveComponent.prototype.__properties__,{get_selectedOption:"get_selectedOption",set_group:"set_group",get_group:"get_group",set_selected:"set_selected",get_selected:"get_selected"})
});
var haxe_ui_components_OptionBoxDefaultTextBehaviour = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components.OptionBoxDefaultTextBehaviour"] = haxe_ui_components_OptionBoxDefaultTextBehaviour;
haxe_ui_components_OptionBoxDefaultTextBehaviour.__name__ = ["haxe","ui","components","OptionBoxDefaultTextBehaviour"];
haxe_ui_components_OptionBoxDefaultTextBehaviour.__super__ = haxe_ui_core_Behaviour;
haxe_ui_components_OptionBoxDefaultTextBehaviour.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		var optionbox = this._component;
		if(optionbox._label == null) {
			optionbox._label = new haxe_ui_components_Label();
			optionbox._label.set_id("optionbox-label");
			optionbox._label.addClass("optionbox-label");
			optionbox._label.registerEvent("Click",$bind(optionbox,optionbox._onClick));
			optionbox._label.registerEvent("MouseOver",$bind(optionbox,optionbox._onMouseOver));
			optionbox._label.registerEvent("MouseOut",$bind(optionbox,optionbox._onMouseOut));
			optionbox.addComponent(optionbox._label);
		}
		optionbox._label.set_text(haxe_ui_util__$Variant_Variant_$Impl_$.toString(value));
	}
	,__class__: haxe_ui_components_OptionBoxDefaultTextBehaviour
});
var haxe_ui_components_OptionBoxDefaultSelectedBehaviour = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components.OptionBoxDefaultSelectedBehaviour"] = haxe_ui_components_OptionBoxDefaultSelectedBehaviour;
haxe_ui_components_OptionBoxDefaultSelectedBehaviour.__name__ = ["haxe","ui","components","OptionBoxDefaultSelectedBehaviour"];
haxe_ui_components_OptionBoxDefaultSelectedBehaviour.__super__ = haxe_ui_core_Behaviour;
haxe_ui_components_OptionBoxDefaultSelectedBehaviour.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		var optionbox = this._component;
		if(optionbox._value == null) return;
		if(haxe_ui_util__$Variant_Variant_$Impl_$.toBool(value) == true) optionbox._value.addClass(":selected"); else optionbox._value.removeClass(":selected");
	}
	,__class__: haxe_ui_components_OptionBoxDefaultSelectedBehaviour
});
var haxe_ui_components_OptionBoxValue = function() {
	haxe_ui_core_InteractiveComponent.call(this);
	this._icon = new haxe_ui_components_Image();
	this._icon.set_id("optionbox-icon");
	this._icon.addClass("optionbox-icon");
	this.addComponent(this._icon);
};
$hxClasses["haxe.ui.components.OptionBoxValue"] = haxe_ui_components_OptionBoxValue;
haxe_ui_components_OptionBoxValue.__name__ = ["haxe","ui","components","OptionBoxValue"];
haxe_ui_components_OptionBoxValue.__super__ = haxe_ui_core_InteractiveComponent;
haxe_ui_components_OptionBoxValue.prototype = $extend(haxe_ui_core_InteractiveComponent.prototype,{
	_icon: null
	,applyStyle: function(style) {
		haxe_ui_core_InteractiveComponent.prototype.applyStyle.call(this,style);
		if(this._icon != null) this._icon.set_resource(style.icon);
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_InteractiveComponent.prototype.cloneComponent.call(this);
		return c;
	}
	,self: function() {
		return new haxe_ui_components_OptionBoxValue();
	}
	,__class__: haxe_ui_components_OptionBoxValue
});
var haxe_ui_components_ProgressDefaultMinBehaviour = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components.ProgressDefaultMinBehaviour"] = haxe_ui_components_ProgressDefaultMinBehaviour;
haxe_ui_components_ProgressDefaultMinBehaviour.__name__ = ["haxe","ui","components","ProgressDefaultMinBehaviour"];
haxe_ui_components_ProgressDefaultMinBehaviour.__super__ = haxe_ui_core_Behaviour;
haxe_ui_components_ProgressDefaultMinBehaviour.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		var progress = this._component;
		progress.invalidateLayout();
	}
	,__class__: haxe_ui_components_ProgressDefaultMinBehaviour
});
var haxe_ui_components_ProgressDefaultMaxBehaviour = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components.ProgressDefaultMaxBehaviour"] = haxe_ui_components_ProgressDefaultMaxBehaviour;
haxe_ui_components_ProgressDefaultMaxBehaviour.__name__ = ["haxe","ui","components","ProgressDefaultMaxBehaviour"];
haxe_ui_components_ProgressDefaultMaxBehaviour.__super__ = haxe_ui_core_Behaviour;
haxe_ui_components_ProgressDefaultMaxBehaviour.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		var progress = this._component;
		progress.invalidateLayout();
	}
	,__class__: haxe_ui_components_ProgressDefaultMaxBehaviour
});
var haxe_ui_components_ProgressDefaultPosBehaviour = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components.ProgressDefaultPosBehaviour"] = haxe_ui_components_ProgressDefaultPosBehaviour;
haxe_ui_components_ProgressDefaultPosBehaviour.__name__ = ["haxe","ui","components","ProgressDefaultPosBehaviour"];
haxe_ui_components_ProgressDefaultPosBehaviour.__super__ = haxe_ui_core_Behaviour;
haxe_ui_components_ProgressDefaultPosBehaviour.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		var progress = this._component;
		progress.invalidateLayout();
	}
	,__class__: haxe_ui_components_ProgressDefaultPosBehaviour
});
var haxe_ui_components_ProgressDefaultRangeStartBehaviour = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components.ProgressDefaultRangeStartBehaviour"] = haxe_ui_components_ProgressDefaultRangeStartBehaviour;
haxe_ui_components_ProgressDefaultRangeStartBehaviour.__name__ = ["haxe","ui","components","ProgressDefaultRangeStartBehaviour"];
haxe_ui_components_ProgressDefaultRangeStartBehaviour.__super__ = haxe_ui_core_Behaviour;
haxe_ui_components_ProgressDefaultRangeStartBehaviour.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		var progress = this._component;
		progress.invalidateLayout();
	}
	,__class__: haxe_ui_components_ProgressDefaultRangeStartBehaviour
});
var haxe_ui_components_ProgressDefaultRangeEndBehaviour = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components.ProgressDefaultRangeEndBehaviour"] = haxe_ui_components_ProgressDefaultRangeEndBehaviour;
haxe_ui_components_ProgressDefaultRangeEndBehaviour.__name__ = ["haxe","ui","components","ProgressDefaultRangeEndBehaviour"];
haxe_ui_components_ProgressDefaultRangeEndBehaviour.__super__ = haxe_ui_core_Behaviour;
haxe_ui_components_ProgressDefaultRangeEndBehaviour.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		var progress = this._component;
		progress.invalidateLayout();
	}
	,__class__: haxe_ui_components_ProgressDefaultRangeEndBehaviour
});
var haxe_ui_components_ProgressDefaultIndeterminateBehaviour = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components.ProgressDefaultIndeterminateBehaviour"] = haxe_ui_components_ProgressDefaultIndeterminateBehaviour;
haxe_ui_components_ProgressDefaultIndeterminateBehaviour.__name__ = ["haxe","ui","components","ProgressDefaultIndeterminateBehaviour"];
haxe_ui_components_ProgressDefaultIndeterminateBehaviour.__super__ = haxe_ui_core_Behaviour;
haxe_ui_components_ProgressDefaultIndeterminateBehaviour.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		var progress = this._component;
		if(progress._indeterminate == true) progress.startIndeterminateAnimation(); else progress.stopIndeterminateAnimation();
	}
	,__class__: haxe_ui_components_ProgressDefaultIndeterminateBehaviour
});
var haxe_ui_components_ScrollDefaultMinBehaviour = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components.ScrollDefaultMinBehaviour"] = haxe_ui_components_ScrollDefaultMinBehaviour;
haxe_ui_components_ScrollDefaultMinBehaviour.__name__ = ["haxe","ui","components","ScrollDefaultMinBehaviour"];
haxe_ui_components_ScrollDefaultMinBehaviour.__super__ = haxe_ui_core_Behaviour;
haxe_ui_components_ScrollDefaultMinBehaviour.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		var scroll = this._component;
		scroll.invalidateLayout();
	}
	,__class__: haxe_ui_components_ScrollDefaultMinBehaviour
});
var haxe_ui_components_ScrollDefaultMaxBehaviour = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components.ScrollDefaultMaxBehaviour"] = haxe_ui_components_ScrollDefaultMaxBehaviour;
haxe_ui_components_ScrollDefaultMaxBehaviour.__name__ = ["haxe","ui","components","ScrollDefaultMaxBehaviour"];
haxe_ui_components_ScrollDefaultMaxBehaviour.__super__ = haxe_ui_core_Behaviour;
haxe_ui_components_ScrollDefaultMaxBehaviour.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		var scroll = this._component;
		scroll.invalidateLayout();
	}
	,__class__: haxe_ui_components_ScrollDefaultMaxBehaviour
});
var haxe_ui_components_ScrollDefaultPosBehaviour = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components.ScrollDefaultPosBehaviour"] = haxe_ui_components_ScrollDefaultPosBehaviour;
haxe_ui_components_ScrollDefaultPosBehaviour.__name__ = ["haxe","ui","components","ScrollDefaultPosBehaviour"];
haxe_ui_components_ScrollDefaultPosBehaviour.__super__ = haxe_ui_core_Behaviour;
haxe_ui_components_ScrollDefaultPosBehaviour.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		var scroll = this._component;
		scroll.invalidateLayout();
	}
	,__class__: haxe_ui_components_ScrollDefaultPosBehaviour
});
var haxe_ui_components_ScrollDefaultPageSizeBehaviour = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components.ScrollDefaultPageSizeBehaviour"] = haxe_ui_components_ScrollDefaultPageSizeBehaviour;
haxe_ui_components_ScrollDefaultPageSizeBehaviour.__name__ = ["haxe","ui","components","ScrollDefaultPageSizeBehaviour"];
haxe_ui_components_ScrollDefaultPageSizeBehaviour.__super__ = haxe_ui_core_Behaviour;
haxe_ui_components_ScrollDefaultPageSizeBehaviour.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		var scroll = this._component;
		scroll.invalidateLayout();
	}
	,__class__: haxe_ui_components_ScrollDefaultPageSizeBehaviour
});
var haxe_ui_components_SliderDefaultMinBehaviour = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components.SliderDefaultMinBehaviour"] = haxe_ui_components_SliderDefaultMinBehaviour;
haxe_ui_components_SliderDefaultMinBehaviour.__name__ = ["haxe","ui","components","SliderDefaultMinBehaviour"];
haxe_ui_components_SliderDefaultMinBehaviour.__super__ = haxe_ui_core_Behaviour;
haxe_ui_components_SliderDefaultMinBehaviour.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		var slider = this._component;
		slider.invalidateLayout();
	}
	,__class__: haxe_ui_components_SliderDefaultMinBehaviour
});
var haxe_ui_components_SliderDefaultMaxBehaviour = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components.SliderDefaultMaxBehaviour"] = haxe_ui_components_SliderDefaultMaxBehaviour;
haxe_ui_components_SliderDefaultMaxBehaviour.__name__ = ["haxe","ui","components","SliderDefaultMaxBehaviour"];
haxe_ui_components_SliderDefaultMaxBehaviour.__super__ = haxe_ui_core_Behaviour;
haxe_ui_components_SliderDefaultMaxBehaviour.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		var slider = this._component;
		slider.invalidateLayout();
	}
	,__class__: haxe_ui_components_SliderDefaultMaxBehaviour
});
var haxe_ui_components_SliderDefaultPosBehaviour = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components.SliderDefaultPosBehaviour"] = haxe_ui_components_SliderDefaultPosBehaviour;
haxe_ui_components_SliderDefaultPosBehaviour.__name__ = ["haxe","ui","components","SliderDefaultPosBehaviour"];
haxe_ui_components_SliderDefaultPosBehaviour.__super__ = haxe_ui_core_Behaviour;
haxe_ui_components_SliderDefaultPosBehaviour.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		var slider = this._component;
		slider.invalidateLayout();
	}
	,__class__: haxe_ui_components_SliderDefaultPosBehaviour
});
var haxe_ui_components_SliderDefaultRangeStartBehaviour = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components.SliderDefaultRangeStartBehaviour"] = haxe_ui_components_SliderDefaultRangeStartBehaviour;
haxe_ui_components_SliderDefaultRangeStartBehaviour.__name__ = ["haxe","ui","components","SliderDefaultRangeStartBehaviour"];
haxe_ui_components_SliderDefaultRangeStartBehaviour.__super__ = haxe_ui_core_Behaviour;
haxe_ui_components_SliderDefaultRangeStartBehaviour.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		var slider = this._component;
		slider.invalidateLayout();
	}
	,__class__: haxe_ui_components_SliderDefaultRangeStartBehaviour
});
var haxe_ui_components_SliderDefaultRangeEndBehaviour = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components.SliderDefaultRangeEndBehaviour"] = haxe_ui_components_SliderDefaultRangeEndBehaviour;
haxe_ui_components_SliderDefaultRangeEndBehaviour.__name__ = ["haxe","ui","components","SliderDefaultRangeEndBehaviour"];
haxe_ui_components_SliderDefaultRangeEndBehaviour.__super__ = haxe_ui_core_Behaviour;
haxe_ui_components_SliderDefaultRangeEndBehaviour.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		var slider = this._component;
		slider.invalidateLayout();
	}
	,__class__: haxe_ui_components_SliderDefaultRangeEndBehaviour
});
var haxe_ui_components_TabBar = function() {
	this._selectedIndex = -1;
	haxe_ui_core_Component.call(this);
	this.set_layout(new haxe_ui_layouts_HorizontalLayout());
};
$hxClasses["haxe.ui.components.TabBar"] = haxe_ui_components_TabBar;
haxe_ui_components_TabBar.__name__ = ["haxe","ui","components","TabBar"];
haxe_ui_components_TabBar.__interfaces__ = [haxe_ui_core_IClonable];
haxe_ui_components_TabBar.__super__ = haxe_ui_core_Component;
haxe_ui_components_TabBar.prototype = $extend(haxe_ui_core_Component.prototype,{
	_currentButton: null
	,addComponent: function(child) {
		var v = haxe_ui_core_Component.prototype.addComponent.call(this,child);
		child.addClass("tabbar-button");
		child.registerEvent("MouseDown",$bind(this,this.__onButtonMouseDown));
		if(this._selectedIndex == -1) this.set_selectedIndex(0);
		return v;
	}
	,_selectedIndex: null
	,get_selectedIndex: function() {
		return this._selectedIndex;
	}
	,set_selectedIndex: function(value) {
		if(value < 0) return value;
		if(this._selectedIndex == value) return value;
		this._selectedIndex = value;
		var button = this.getComponentAt(this._selectedIndex);
		if(button != null) {
			if(this._currentButton != null) this._currentButton.removeClass("tabbar-button-selected");
			this._currentButton = button;
			this._currentButton.addClass("tabbar-button-selected");
			this.invalidateLayout();
			var event = new haxe_ui_core_UIEvent("Change");
			event.target = this;
			this.dispatch(event);
		}
		return value;
	}
	,__onButtonMouseDown: function(event) {
		if(event.target == this._currentButton) return;
		this.set_selectedIndex(this.getComponentIndex(event.target));
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_Component.prototype.cloneComponent.call(this);
		return c;
	}
	,self: function() {
		return new haxe_ui_components_TabBar();
	}
	,getProperty: function(name) {
		switch(name) {
		case "selectedIndex":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromInt(this.get_selectedIndex());
			break;
		}
		return haxe_ui_core_Component.prototype.getProperty.call(this,name);
	}
	,setProperty: function(name,v) {
		switch(name) {
		case "selectedIndex":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromInt(this.set_selectedIndex(haxe_ui_util__$Variant_Variant_$Impl_$.toInt(v)));
			break;
		}
		return haxe_ui_core_Component.prototype.setProperty.call(this,name,v);
	}
	,__class__: haxe_ui_components_TabBar
	,__properties__: $extend(haxe_ui_core_Component.prototype.__properties__,{set_selectedIndex:"set_selectedIndex",get_selectedIndex:"get_selectedIndex"})
});
var haxe_ui_layouts_HorizontalLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
};
$hxClasses["haxe.ui.layouts.HorizontalLayout"] = haxe_ui_layouts_HorizontalLayout;
haxe_ui_layouts_HorizontalLayout.__name__ = ["haxe","ui","layouts","HorizontalLayout"];
haxe_ui_layouts_HorizontalLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_layouts_HorizontalLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	repositionChildren: function() {
		var xpos = this.get_paddingLeft();
		var usableSize = this.get_component().get_layout().get_usableSize();
		var _g = 0;
		var _g1 = this.get_component().get_childComponents();
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) continue;
			var ypos = 0;
			var _g2 = this.verticalAlign(child);
			switch(_g2) {
			case "center":
				ypos = this.get_component().get_componentHeight() / 2 - child.get_componentHeight() / 2 + this.marginTop(child) - this.marginBottom(child);
				break;
			case "bottom":
				if(child.get_componentHeight() < this.get_component().get_componentHeight()) ypos = usableSize.height - (child.get_componentHeight() + this.get_paddingBottom() + this.marginTop(child) - this.marginBottom(child));
				break;
			default:
				ypos = this.get_paddingTop() + this.marginTop(child) - this.marginBottom(child);
			}
			child.moveComponent(xpos + this.marginLeft(child) - this.marginRight(child),ypos);
			xpos += child.get_componentWidth() + this.get_horizontalSpacing();
		}
	}
	,get_usableSize: function() {
		var size = haxe_ui_layouts_DefaultLayout.prototype.get_usableSize.call(this);
		var visibleChildren = this.get_component().get_childComponents().length;
		var _g = 0;
		var _g1 = this.get_component().get_childComponents();
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				visibleChildren--;
				continue;
			}
			if(child.get_componentWidth() > 0 && child.get_percentWidth() == null) size.width -= child.get_componentWidth() + this.marginLeft(child) + this.marginRight(child);
		}
		if(visibleChildren > 1) size.width -= this.get_horizontalSpacing() * (visibleChildren - 1);
		if(size.width < 0) size.width = 0;
		return size;
	}
	,__class__: haxe_ui_layouts_HorizontalLayout
});
var haxe_ui_components_TabBarLayout = function() {
	haxe_ui_layouts_HorizontalLayout.call(this);
};
$hxClasses["haxe.ui.components.TabBarLayout"] = haxe_ui_components_TabBarLayout;
haxe_ui_components_TabBarLayout.__name__ = ["haxe","ui","components","TabBarLayout"];
haxe_ui_components_TabBarLayout.__super__ = haxe_ui_layouts_HorizontalLayout;
haxe_ui_components_TabBarLayout.prototype = $extend(haxe_ui_layouts_HorizontalLayout.prototype,{
	resizeChildren: function() {
		haxe_ui_layouts_HorizontalLayout.prototype.resizeChildren.call(this);
		return true;
		var background = this.get_component().findComponent("tabbar-background");
		if(background != null) {
			background.set_componentWidth(this.get_component().get_componentWidth());
			background.set_componentHeight(this.get_component().get_componentHeight() - 1);
		}
		return true;
		var ucy = this.get_usableHeight();
		var background1 = this.get_component().findComponent("tabbar-background");
		if(background1 != null) {
			background1.set_componentWidth(this.get_component().get_componentWidth());
			background1.set_componentHeight(this.get_component().get_componentHeight() - 1);
		}
		var _g = 0;
		var _g1 = this.get_component().get_childComponents();
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			if(c.get_includeInLayout() == false) continue;
			if(c.hasClass("tabbar-button-selected")) c.set_componentHeight(ucy); else c.set_componentHeight(ucy);
		}
	}
	,__class__: haxe_ui_components_TabBarLayout
});
var haxe_ui_components_TextField = function() {
	haxe_ui_core_InteractiveComponent.call(this);
};
$hxClasses["haxe.ui.components.TextField"] = haxe_ui_components_TextField;
haxe_ui_components_TextField.__name__ = ["haxe","ui","components","TextField"];
haxe_ui_components_TextField.__interfaces__ = [haxe_ui_core_IClonable,haxe_ui_focus_IFocusable];
haxe_ui_components_TextField.__super__ = haxe_ui_core_InteractiveComponent;
haxe_ui_components_TextField.prototype = $extend(haxe_ui_core_InteractiveComponent.prototype,{
	_icon: null
	,createDefaults: function() {
		var _g = new haxe_ds_StringMap();
		var value = new haxe_ui_components_TextFieldDefaultTextBehaviour(this);
		if(__map_reserved.text != null) _g.setReserved("text",value); else _g.h["text"] = value;
		var value1 = new haxe_ui_components_TextFieldDefaultIconBehaviour(this);
		if(__map_reserved.icon != null) _g.setReserved("icon",value1); else _g.h["icon"] = value1;
		this._defaultBehaviours = _g;
		this._defaultLayout = new haxe_ui_components_TextFieldLayout();
	}
	,create: function() {
		haxe_ui_core_InteractiveComponent.prototype.create.call(this);
	}
	,createChildren: function() {
		if(this.get_componentWidth() == 0) this.set_componentWidth(150);
		this.registerEvent("MouseDown",$bind(this,this._onMouseDown));
		this.registerEvent("Change",$bind(this,this._onTextChanged));
	}
	,destroyChildren: function() {
		haxe_ui_core_InteractiveComponent.prototype.destroyChildren.call(this);
		this.unregisterEvent("MouseDown",$bind(this,this._onMouseDown));
		this.unregisterEvent("Change",$bind(this,this._onTextChanged));
		if(this._icon != null) {
			this.removeComponent(this._icon);
			this._icon = null;
		}
	}
	,get_text: function() {
		return haxe_ui_util__$Variant_Variant_$Impl_$.toString(this.behaviourGet("text"));
	}
	,set_text: function(value) {
		if(value == this._text) return value;
		value = haxe_ui_core_InteractiveComponent.prototype.set_text.call(this,value);
		this.behaviourSet("text",haxe_ui_util__$Variant_Variant_$Impl_$.fromString(value));
		return value;
	}
	,applyStyle: function(style) {
		haxe_ui_core_InteractiveComponent.prototype.applyStyle.call(this,style);
		if(style.icon != null) this.set_icon(style.icon);
		if(this.hasTextInput() == true) {
			if(style.color != null) this.getTextInput().set_color(style.color);
			if(style.fontName != null) this.getTextInput().set_fontName(style.fontName);
			if(style.fontSize != null) this.getTextInput().set_fontSize(style.fontSize);
		}
	}
	,_iconResource: null
	,get_icon: function() {
		return this._iconResource;
	}
	,set_icon: function(value) {
		if(this._iconResource == value) return value;
		this._iconResource = value;
		this.behaviourSet("icon",haxe_ui_util__$Variant_Variant_$Impl_$.fromString(value));
		return value;
	}
	,_onTextChanged: function(event) {
		this.handleBindings(["text","value"]);
	}
	,_onMouseDown: function(event) {
		haxe_ui_focus_FocusManager.get_instance().set_focus(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_InteractiveComponent.prototype.cloneComponent.call(this);
		c.set_icon(this.get_icon());
		return c;
	}
	,self: function() {
		return new haxe_ui_components_TextField();
	}
	,__class__: haxe_ui_components_TextField
	,__properties__: $extend(haxe_ui_core_InteractiveComponent.prototype.__properties__,{set_icon:"set_icon",get_icon:"get_icon"})
});
var haxe_ui_components_TextFieldDefaultTextBehaviour = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components.TextFieldDefaultTextBehaviour"] = haxe_ui_components_TextFieldDefaultTextBehaviour;
haxe_ui_components_TextFieldDefaultTextBehaviour.__name__ = ["haxe","ui","components","TextFieldDefaultTextBehaviour"];
haxe_ui_components_TextFieldDefaultTextBehaviour.__super__ = haxe_ui_core_Behaviour;
haxe_ui_components_TextFieldDefaultTextBehaviour.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		if(haxe_ui_util__$Variant_Variant_$Impl_$.get_isNull(value)) return;
		var textField = this._component;
		textField.getTextInput().set_text(haxe_ui_util__$Variant_Variant_$Impl_$.toString(value));
		textField.invalidateDisplay();
	}
	,get: function() {
		var textField = this._component;
		return haxe_ui_util__$Variant_Variant_$Impl_$.fromString(textField.getTextInput().get_text());
	}
	,__class__: haxe_ui_components_TextFieldDefaultTextBehaviour
});
var haxe_ui_components_TextFieldDefaultIconBehaviour = function(component) {
	haxe_ui_core_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components.TextFieldDefaultIconBehaviour"] = haxe_ui_components_TextFieldDefaultIconBehaviour;
haxe_ui_components_TextFieldDefaultIconBehaviour.__name__ = ["haxe","ui","components","TextFieldDefaultIconBehaviour"];
haxe_ui_components_TextFieldDefaultIconBehaviour.__super__ = haxe_ui_core_Behaviour;
haxe_ui_components_TextFieldDefaultIconBehaviour.prototype = $extend(haxe_ui_core_Behaviour.prototype,{
	set: function(value) {
		if(value == null || haxe_ui_util__$Variant_Variant_$Impl_$.get_isNull(value) || haxe_ui_util__$Variant_Variant_$Impl_$.toString(value) == "null") return;
		var textField = this._component;
		if(textField._icon == null) {
			textField._icon = new haxe_ui_components_Image();
			textField._icon.set_id("textfield-icon");
			textField._icon.addClass("icon");
			textField._icon.scriptAccess = false;
			textField.addComponent(textField._icon);
		}
		textField._icon.set_resource(haxe_ui_util__$Variant_Variant_$Impl_$.toString(value));
	}
	,__class__: haxe_ui_components_TextFieldDefaultIconBehaviour
});
var haxe_ui_components_TextFieldLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
};
$hxClasses["haxe.ui.components.TextFieldLayout"] = haxe_ui_components_TextFieldLayout;
haxe_ui_components_TextFieldLayout.__name__ = ["haxe","ui","components","TextFieldLayout"];
haxe_ui_components_TextFieldLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_components_TextFieldLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	iconPosition: null
	,get_iconPosition: function() {
		if(this.get_component().get_style().iconPosition == null) return "left";
		return this.get_component().get_style().iconPosition;
	}
	,repositionChildren: function() {
		var icon = this.get_component().findComponent("textfield-icon");
		var xpos = this.get_paddingLeft();
		if(icon != null) {
			var _g = this.get_iconPosition();
			switch(_g) {
			case "left":
				icon.set_left(xpos);
				icon.set_top(this.get_component().get_componentHeight() / 2 - icon.get_componentHeight() / 2);
				xpos += icon.get_componentWidth() + this.get_horizontalSpacing();
				break;
			case "right":
				icon.set_left(this.get_component().get_componentWidth() - icon.get_componentWidth() - this.get_paddingRight());
				icon.set_top(this.get_component().get_componentHeight() / 2 - icon.get_componentHeight() / 2);
				break;
			}
		}
		if(this.get_component().hasTextInput() == true) {
			this.get_component().getTextInput().set_left(xpos);
			this.get_component().getTextInput().set_top(this.get_component().get_componentHeight() / 2 - this.get_component().getTextInput().get_textHeight() / 2);
		}
	}
	,resizeChildren: function() {
		haxe_ui_layouts_DefaultLayout.prototype.resizeChildren.call(this);
		if(this.get_component().hasTextInput() == true) {
			var size = this.get_usableSize();
			this.get_component().getTextInput().set_width(size.width);
		}
		return true;
	}
	,calcAutoSize: function() {
		var size = haxe_ui_layouts_DefaultLayout.prototype.calcAutoSize.call(this);
		if(this.get_component().hasTextInput() == true) {
			if(this.get_component().getTextInput().get_textWidth() + this.get_paddingLeft() + this.get_paddingRight() > size.width) size.width = this.get_component().getTextInput().get_textWidth() + this.get_paddingLeft() + this.get_paddingRight();
			if(this.get_component().getTextInput().get_textHeight() + this.get_paddingTop() + this.get_paddingBottom() > size.height) size.height = this.get_component().getTextInput().get_textHeight() + this.get_paddingTop() + this.get_paddingBottom();
		}
		return size;
	}
	,get_usableSize: function() {
		var size = haxe_ui_layouts_DefaultLayout.prototype.get_usableSize.call(this);
		var icon = this.get_component().findComponent("textfield-icon");
		if(icon != null) size.width -= icon.get_componentWidth() + this.get_horizontalSpacing();
		return size;
	}
	,__class__: haxe_ui_components_TextFieldLayout
	,__properties__: $extend(haxe_ui_layouts_DefaultLayout.prototype.__properties__,{get_iconPosition:"get_iconPosition"})
});
var haxe_ui_components_VProgress = function() {
	haxe_ui_components_Progress.call(this);
};
$hxClasses["haxe.ui.components.VProgress"] = haxe_ui_components_VProgress;
haxe_ui_components_VProgress.__name__ = ["haxe","ui","components","VProgress"];
haxe_ui_components_VProgress.__interfaces__ = [haxe_ui_core_IClonable];
haxe_ui_components_VProgress.__super__ = haxe_ui_components_Progress;
haxe_ui_components_VProgress.prototype = $extend(haxe_ui_components_Progress.prototype,{
	createDefaults: function() {
		haxe_ui_components_Progress.prototype.createDefaults.call(this);
		this._defaultLayout = new haxe_ui_components_VProgressLayout();
	}
	,createChildren: function() {
		haxe_ui_components_Progress.prototype.createChildren.call(this);
		if(this.get_componentWidth() <= 0) this.set_componentWidth(20);
		if(this.get_componentHeight() <= 0) this.set_componentHeight(150);
	}
	,cloneComponent: function() {
		var c = haxe_ui_components_Progress.prototype.cloneComponent.call(this);
		return c;
	}
	,self: function() {
		return new haxe_ui_components_VProgress();
	}
	,__class__: haxe_ui_components_VProgress
});
var haxe_ui_components_VProgressLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
};
$hxClasses["haxe.ui.components.VProgressLayout"] = haxe_ui_components_VProgressLayout;
haxe_ui_components_VProgressLayout.__name__ = ["haxe","ui","components","VProgressLayout"];
haxe_ui_components_VProgressLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_components_VProgressLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	resizeChildren: function() {
		haxe_ui_layouts_DefaultLayout.prototype.resizeChildren.call(this);
		var value = this.get_component().findComponent("progress-value");
		var progress = this.get_component();
		if(value != null) {
			var ucy = this.get_usableHeight();
			var cy = 0;
			if(progress.get_rangeStart() == progress.get_rangeEnd()) cy = (progress.get_pos() - progress.get_min()) / (progress.get_max() - progress.get_min()) * ucy; else cy = (progress.get_rangeEnd() - progress.get_rangeStart() - progress.get_min()) / (progress.get_max() - progress.get_min()) * ucy;
			if(cy < 0) cy = 0; else if(cy > ucy) cy = ucy;
			if(cy == 0) {
				value.set_componentHeight(0);
				value.set_hidden(true);
			} else {
				value.set_componentHeight(cy);
				value.set_hidden(false);
			}
		}
		return true;
	}
	,repositionChildren: function() {
		haxe_ui_layouts_DefaultLayout.prototype.repositionChildren.call(this);
		var value = this.get_component().findComponent("progress-value");
		var progress = this.get_component();
		if(value != null) {
			var ucy = this.get_usableHeight();
			var y = ucy - value.get_componentHeight() + this.get_paddingBottom();
			if(progress.get_rangeStart() != progress.get_rangeEnd()) y -= (progress.get_rangeStart() - progress.get_min()) / (progress.get_max() - progress.get_min()) * ucy;
			value.set_top(y);
		}
	}
	,__class__: haxe_ui_components_VProgressLayout
});
var haxe_ui_components_VScroll = function() {
	haxe_ui_components_Scroll.call(this);
	this.set_layout(new haxe_ui_components_VScrollLayout());
};
$hxClasses["haxe.ui.components.VScroll"] = haxe_ui_components_VScroll;
haxe_ui_components_VScroll.__name__ = ["haxe","ui","components","VScroll"];
haxe_ui_components_VScroll.__interfaces__ = [haxe_ui_core_IClonable];
haxe_ui_components_VScroll.__super__ = haxe_ui_components_Scroll;
haxe_ui_components_VScroll.prototype = $extend(haxe_ui_components_Scroll.prototype,{
	_onThumbMouseDown: function(event) {
		haxe_ui_components_Scroll.prototype._onThumbMouseDown.call(this,event);
		this._mouseDownOffset = event.screenY - this._thumb.get_top();
	}
	,_onScreenMouseMove: function(event) {
		haxe_ui_components_Scroll.prototype._onScreenMouseMove.call(this,event);
		if(this._mouseDownOffset == -1) return;
		var ypos = event.screenY - this._mouseDownOffset;
		var minY = 0;
		if(this._deincButton != null) minY = this._deincButton.get_componentHeight() + this.get_layout().get_verticalSpacing();
		var maxY = this.get_layout().get_usableHeight() - this._thumb.get_componentHeight();
		if(this._deincButton != null) maxY += this._deincButton.get_componentHeight() + this.get_layout().get_verticalSpacing();
		if(ypos < minY) ypos = minY; else if(ypos > maxY) ypos = maxY;
		var ucy = this.get_layout().get_usableHeight();
		ucy -= this._thumb.get_componentHeight();
		var m = Std["int"](this.get_max() - this.get_min());
		var v = ypos - minY;
		var newValue = this.get_min() + v / ucy * m;
		this.set_pos(newValue);
	}
	,cloneComponent: function() {
		var c = haxe_ui_components_Scroll.prototype.cloneComponent.call(this);
		return c;
	}
	,self: function() {
		return new haxe_ui_components_VScroll();
	}
	,__class__: haxe_ui_components_VScroll
});
var haxe_ui_components_VScrollLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
};
$hxClasses["haxe.ui.components.VScrollLayout"] = haxe_ui_components_VScrollLayout;
haxe_ui_components_VScrollLayout.__name__ = ["haxe","ui","components","VScrollLayout"];
haxe_ui_components_VScrollLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_components_VScrollLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	resizeChildren: function() {
		haxe_ui_layouts_DefaultLayout.prototype.resizeChildren.call(this);
		var scroll = this.get_component();
		var thumb = this.get_component().findComponent("scroll-thumb-button");
		if(thumb != null) {
			var m = scroll.get_max() - scroll.get_min();
			var ucy = this.get_usableHeight();
			var thumbHeight = scroll.get_pageSize() / m * ucy;
			if(thumbHeight < this.get_innerWidth()) thumbHeight = this.get_innerWidth(); else if(thumbHeight > ucy) thumbHeight = ucy;
			if(thumbHeight > 0 && isNaN(thumbHeight) == false) thumb.set_componentHeight(thumbHeight);
		}
		return true;
	}
	,repositionChildren: function() {
		haxe_ui_layouts_DefaultLayout.prototype.repositionChildren.call(this);
		var deinc = this.get_component().findComponent("scroll-deinc-button");
		var inc = this.get_component().findComponent("scroll-inc-button");
		if(inc != null && this.hidden(inc) == false) inc.set_top(this.get_component().get_componentHeight() - inc.get_componentHeight() - this.get_paddingBottom());
		var scroll = this.get_component();
		var thumb = this.get_component().findComponent("scroll-thumb-button");
		if(thumb != null) {
			var m = scroll.get_max() - scroll.get_min();
			var u = this.get_usableHeight();
			u -= thumb.get_componentHeight();
			var y = (scroll.get_pos() - scroll.get_min()) / m * u;
			y += this.get_paddingTop();
			if(deinc != null && this.hidden(deinc) == false) y += deinc.get_componentHeight() + this.get_verticalSpacing();
			thumb.set_top(y);
		}
	}
	,get_usableHeight: function() {
		var ucy = this.get_innerHeight();
		var deinc = this.get_component().findComponent("scroll-deinc-button");
		var inc = this.get_component().findComponent("scroll-inc-button");
		if(deinc != null && this.hidden(deinc) == false) ucy -= deinc.get_componentHeight() + this.get_verticalSpacing();
		if(inc != null && this.hidden(inc) == false) ucy -= inc.get_componentHeight() + this.get_verticalSpacing();
		return ucy;
	}
	,__class__: haxe_ui_components_VScrollLayout
});
var haxe_ui_components_VSlider = function() {
	haxe_ui_components_Slider.call(this);
};
$hxClasses["haxe.ui.components.VSlider"] = haxe_ui_components_VSlider;
haxe_ui_components_VSlider.__name__ = ["haxe","ui","components","VSlider"];
haxe_ui_components_VSlider.__interfaces__ = [haxe_ui_core_IClonable];
haxe_ui_components_VSlider.__super__ = haxe_ui_components_Slider;
haxe_ui_components_VSlider.prototype = $extend(haxe_ui_components_Slider.prototype,{
	createDefaults: function() {
		haxe_ui_components_Slider.prototype.createDefaults.call(this);
		this._defaultLayout = new haxe_ui_components_VSliderLayout();
	}
	,createChildren: function() {
		haxe_ui_components_Slider.prototype.createChildren.call(this);
		if(this.get_componentWidth() <= 0) this.set_componentWidth(20);
		if(this.get_componentHeight() <= 0) this.set_componentHeight(150);
		if(this._valueBackground != null) {
		}
	}
	,_onValueBackgroundMouseDown: function(event) {
		haxe_ui_components_Slider.prototype._onValueBackgroundMouseDown.call(this,event);
		if(this._value.hitTest(event.screenX,event.screenY) == false) {
			if(this.get_rangeEnd() != this.get_rangeStart()) {
				if(event.screenY < this._rangeEndThumb.get_screenTop()) {
					this._activeThumb = this._rangeEndThumb;
					var ypos = event.screenY - this._valueBackground.get_screenTop() - this._activeThumb.get_componentHeight() / 2 - this._valueBackground.get_paddingBottom();
					this.animateRangeEnd(this.calcPosFromCoord(ypos));
					this._onRangeEndThumbMouseDown(event);
				} else if(event.screenY > this._rangeStartThumb.get_screenTop() + this._rangeStartThumb.get_componentHeight()) {
					this._activeThumb = this._rangeStartThumb;
					var ypos1 = event.screenY - this._valueBackground.get_screenTop() - this._activeThumb.get_componentHeight() / 2 - this._valueBackground.get_paddingBottom();
					this.animateRangeStart(this.calcPosFromCoord(ypos1));
					this._onRangeStartThumbMouseDown(event);
				}
			} else {
				this._activeThumb = this._rangeEndThumb;
				var ypos2 = event.screenY - this._valueBackground.get_screenTop() - this._activeThumb.get_componentHeight() / 2 - this._valueBackground.get_paddingBottom();
				this.animatePos(this.calcPosFromCoord(ypos2));
				this._onRangeEndThumbMouseDown(event);
			}
		}
	}
	,_onValueMouseDown: function(event) {
		haxe_ui_components_Slider.prototype._onValueMouseDown.call(this,event);
		if(this.get_rangeEnd() != this.get_rangeStart()) this._mouseDownOffset = event.screenY - this._value.get_top(); else {
			this._activeThumb = this._rangeEndThumb;
			var ypos = event.screenY - this._valueBackground.get_screenTop() - this._activeThumb.get_componentHeight() / 2 - this._valueBackground.get_paddingBottom();
			this.animatePos(this.calcPosFromCoord(ypos));
			this._onRangeEndThumbMouseDown(event);
		}
	}
	,_onRangeEndThumbMouseDown: function(event) {
		haxe_ui_components_Slider.prototype._onRangeEndThumbMouseDown.call(this,event);
		this._mouseDownOffset = event.screenY - this._activeThumb.get_screenTop() + this._valueBackground.get_paddingBottom();
	}
	,_onRangeStartThumbMouseDown: function(event) {
		haxe_ui_components_Slider.prototype._onRangeStartThumbMouseDown.call(this,event);
		this._mouseDownOffset = event.screenY - this._activeThumb.get_screenTop() + this._valueBackground.get_paddingBottom();
	}
	,_onScreenMouseMove: function(event) {
		if(this._mouseDownOffset == -1) return;
		if(this._activeThumb != null) {
			var ypos = event.screenY - this._valueBackground.get_screenTop() - this._mouseDownOffset;
			if(this.get_rangeEnd() != this.get_rangeStart()) {
				if(this._activeThumb == this._rangeEndThumb) this.set_rangeEnd(this.calcPosFromCoord(ypos)); else if(this._activeThumb == this._rangeStartThumb) this.set_rangeStart(this.calcPosFromCoord(ypos));
			} else this.set_pos(this.calcPosFromCoord(ypos));
		} else {
			var diff = this.get_rangeEnd() - this.get_rangeStart();
			var ypos1 = event.screenY - this._mouseDownOffset;
			ypos1 += this._value.get_componentHeight();
			this._activeThumb = this._rangeStartThumb;
			var start = this.calcPosFromCoord(ypos1 - this._activeThumb.get_componentHeight() / 2 - this._valueBackground.get_paddingBottom());
			this._activeThumb = null;
			if(start + diff > this.get_max()) return;
			var end = start + diff;
			this.setRange(start,end);
		}
	}
	,calcPosFromCoord: function(ypos) {
		var minY = -(this._activeThumb.get_componentHeight() / 2);
		var maxY = this.get_layout().get_usableHeight() - this._activeThumb.get_componentHeight() / 2 - (this._valueBackground.get_paddingTop() + this._valueBackground.get_paddingBottom());
		if(ypos < minY) ypos = minY; else if(ypos > maxY) ypos = maxY;
		var ucy = this.get_layout().get_usableHeight() - (this._valueBackground.get_paddingTop() + this._valueBackground.get_paddingBottom());
		var m = this.get_max() - this.get_min();
		var v = ypos - minY;
		var newValue = this.get_min() + v / ucy * m;
		return this.get_max() - newValue;
	}
	,cloneComponent: function() {
		var c = haxe_ui_components_Slider.prototype.cloneComponent.call(this);
		return c;
	}
	,self: function() {
		return new haxe_ui_components_VSlider();
	}
	,__class__: haxe_ui_components_VSlider
});
var haxe_ui_components_VSliderLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
};
$hxClasses["haxe.ui.components.VSliderLayout"] = haxe_ui_components_VSliderLayout;
haxe_ui_components_VSliderLayout.__name__ = ["haxe","ui","components","VSliderLayout"];
haxe_ui_components_VSliderLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_components_VSliderLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	resizeChildren: function() {
		haxe_ui_layouts_DefaultLayout.prototype.resizeChildren.call(this);
		var background = this.get_component().findComponent("slider-value-background");
		var value = null;
		if(background != null) value = background.findComponent("slider-value");
		var slider = this.get_component();
		if(value != null) {
			var ucy = background.get_layout().get_usableHeight();
			var cy = 0;
			if(slider.get_rangeStart() == slider.get_rangeEnd()) cy = (slider.get_pos() - slider.get_min()) / (slider.get_max() - slider.get_min()) * ucy; else cy = (slider.get_rangeEnd() - slider.get_rangeStart() - slider.get_min()) / (slider.get_max() - slider.get_min()) * ucy;
			if(cy < 0) cy = 0; else if(cy > ucy) cy = ucy;
			if(cy == 0) {
				value.set_componentHeight(cy);
				if(value.get_hidden() == false) {
					value.set_hidden(true);
					value.invalidateStyle();
				}
			} else {
				value.set_componentHeight(cy);
				if(value.get_hidden() == true) {
					value.set_hidden(false);
					value.invalidateStyle();
				}
			}
		}
		return true;
	}
	,repositionChildren: function() {
		haxe_ui_layouts_DefaultLayout.prototype.repositionChildren.call(this);
		var background = this.get_component().findComponent("slider-value-background");
		var value = null;
		if(background != null) value = background.findComponent("slider-value");
		var slider = this.get_component();
		if(value != null) {
			var rangeStartButton = null;
			var rangeEndButton = this.get_component().findComponent("slider-range-end-button");
			var ucy = background.get_layout().get_usableHeight();
			var y = ucy - value.get_componentHeight() + background.get_layout().get_paddingTop();
			if(slider.get_rangeStart() != slider.get_rangeEnd()) {
				rangeStartButton = this.get_component().findComponent("slider-range-start-button");
				y -= (slider.get_rangeStart() - slider.get_min()) / (slider.get_max() - slider.get_min()) * ucy;
			}
			value.set_top(y);
			if(rangeStartButton != null) rangeStartButton.set_top(y + this.get_paddingTop() + value.get_componentHeight() - rangeStartButton.get_componentHeight() / 2);
			if(rangeEndButton != null) rangeEndButton.set_top(this.get_paddingTop() + value.get_top() - rangeEndButton.get_componentHeight() / 2);
		}
	}
	,__class__: haxe_ui_components_VSliderLayout
});
var haxe_ui_containers_Box = function() {
	haxe_ui_core_Component.call(this);
	this.set_layout(new haxe_ui_layouts_VerticalLayout());
};
$hxClasses["haxe.ui.containers.Box"] = haxe_ui_containers_Box;
haxe_ui_containers_Box.__name__ = ["haxe","ui","containers","Box"];
haxe_ui_containers_Box.__interfaces__ = [haxe_ui_core_IClonable];
haxe_ui_containers_Box.__super__ = haxe_ui_core_Component;
haxe_ui_containers_Box.prototype = $extend(haxe_ui_core_Component.prototype,{
	_icon: null
	,get_icon: function() {
		return this._icon;
	}
	,set_icon: function(value) {
		this._icon = value;
		return value;
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_Component.prototype.cloneComponent.call(this);
		c.set_icon(this.get_icon());
		return c;
	}
	,self: function() {
		return new haxe_ui_containers_Box();
	}
	,__class__: haxe_ui_containers_Box
	,__properties__: $extend(haxe_ui_core_Component.prototype.__properties__,{set_icon:"set_icon",get_icon:"get_icon"})
});
var haxe_ui_containers_Absolute = function() {
	haxe_ui_containers_Box.call(this);
	this.set_layout(new haxe_ui_layouts_AbsoluteLayout());
};
$hxClasses["haxe.ui.containers.Absolute"] = haxe_ui_containers_Absolute;
haxe_ui_containers_Absolute.__name__ = ["haxe","ui","containers","Absolute"];
haxe_ui_containers_Absolute.__interfaces__ = [haxe_ui_core_IClonable];
haxe_ui_containers_Absolute.__super__ = haxe_ui_containers_Box;
haxe_ui_containers_Absolute.prototype = $extend(haxe_ui_containers_Box.prototype,{
	cloneComponent: function() {
		var c = haxe_ui_containers_Box.prototype.cloneComponent.call(this);
		return c;
	}
	,self: function() {
		return new haxe_ui_containers_Absolute();
	}
	,__class__: haxe_ui_containers_Absolute
});
var haxe_ui_containers_HBox = function() {
	haxe_ui_containers_Box.call(this);
	this.set_layout(new haxe_ui_layouts_HorizontalLayout());
};
$hxClasses["haxe.ui.containers.HBox"] = haxe_ui_containers_HBox;
haxe_ui_containers_HBox.__name__ = ["haxe","ui","containers","HBox"];
haxe_ui_containers_HBox.__interfaces__ = [haxe_ui_core_IClonable];
haxe_ui_containers_HBox.__super__ = haxe_ui_containers_Box;
haxe_ui_containers_HBox.prototype = $extend(haxe_ui_containers_Box.prototype,{
	cloneComponent: function() {
		var c = haxe_ui_containers_Box.prototype.cloneComponent.call(this);
		return c;
	}
	,self: function() {
		return new haxe_ui_containers_HBox();
	}
	,__class__: haxe_ui_containers_HBox
});
var haxe_ui_containers_ScrollView = function() {
	haxe_ui_core_Component.call(this);
};
$hxClasses["haxe.ui.containers.ScrollView"] = haxe_ui_containers_ScrollView;
haxe_ui_containers_ScrollView.__name__ = ["haxe","ui","containers","ScrollView"];
haxe_ui_containers_ScrollView.__interfaces__ = [haxe_ui_core_IClonable];
haxe_ui_containers_ScrollView.__super__ = haxe_ui_core_Component;
haxe_ui_containers_ScrollView.prototype = $extend(haxe_ui_core_Component.prototype,{
	_contents: null
	,_hscroll: null
	,_vscroll: null
	,createDefaults: function() {
		this._defaultLayout = new haxe_ui_containers_ScrollViewLayout();
	}
	,create: function() {
		haxe_ui_core_Component.prototype.create.call(this);
		if(this.get_native() == true) this.updateScrollRect(); else this.checkScrolls();
	}
	,createChildren: function() {
		haxe_ui_core_Component.prototype.createChildren.call(this);
	}
	,destroyChildren: function() {
		if(this._hscroll != null) {
			this.removeComponent(this._hscroll);
			this._hscroll = null;
		}
		if(this._vscroll != null) {
			this.removeComponent(this._vscroll);
			this._vscroll = null;
		}
	}
	,onReady: function() {
		haxe_ui_core_Component.prototype.onReady.call(this);
		this.checkScrolls();
		this.updateScrollRect();
	}
	,onResized: function() {
		this.checkScrolls();
		this.updateScrollRect();
	}
	,get_vscrollPos: function() {
		if(this._vscroll == null) return 0;
		return this._vscroll.get_pos();
	}
	,set_vscrollPos: function(value) {
		if(this._vscroll == null) return value;
		this._vscroll.set_pos(value);
		this.handleBindings(["vscrollPos"]);
		return value;
	}
	,get_hscrollPos: function() {
		if(this._hscroll == null) return 0;
		return this._hscroll.get_pos();
	}
	,set_hscrollPos: function(value) {
		if(this._hscroll == null) return value;
		this._hscroll.set_pos(value);
		this.handleBindings(["hscrollPos"]);
		return value;
	}
	,addComponent: function(child) {
		var v = null;
		if(js_Boot.__instanceof(child,haxe_ui_components_HScroll) || js_Boot.__instanceof(child,haxe_ui_components_VScroll)) v = haxe_ui_core_Component.prototype.addComponent.call(this,child); else if(js_Boot.__instanceof(child,haxe_ui_containers_Box) && this._contents == null) {
			this._contents = child;
			this._contents.addClass("scrollview-contents");
			this._contents.registerEvent("Resize",$bind(this,this._onContentsResized));
			this._contents.registerEvent("MouseWheel",$bind(this,this._onMouseWheel));
			v = haxe_ui_core_Component.prototype.addComponent.call(this,this._contents);
		} else {
			if(this._contents == null) {
				this._contents = new haxe_ui_containers_VBox();
				this._contents.addClass("scrollview-contents");
				this._contents.registerEvent("Resize",$bind(this,this._onContentsResized));
				this._contents.registerEvent("MouseWheel",$bind(this,this._onMouseWheel));
				haxe_ui_core_Component.prototype.addComponent.call(this,this._contents);
			}
			v = this._contents.addComponent(child);
		}
		return v;
	}
	,contents: null
	,get_contents: function() {
		return this._contents;
	}
	,_onMouseWheel: function(event) {
		if(this._vscroll != null) {
			if(event.delta > 0) {
				var _g = this._vscroll;
				_g.set_pos(_g.get_pos() - 60);
			} else if(event.delta < 0) {
				var _g1 = this._vscroll;
				_g1.set_pos(_g1.get_pos() + 60);
			}
		}
	}
	,_onContentsResized: function(event) {
		this.checkScrolls();
		this.updateScrollRect();
	}
	,checkScrolls: function() {
		if(this.get_isReady() == false || this._contents == null || this.get_native() == true) return;
		this.checkHScroll();
		this.checkVScroll();
		if(this._contents.get_componentWidth() > this.get_layout().get_usableWidth()) {
			if(this._hscroll != null) {
				this._hscroll.set_hidden(false);
				this._hscroll.set_max(this._contents.get_componentWidth() - this.get_layout().get_usableWidth());
				this._hscroll.set_pageSize(this.get_layout().get_usableWidth() / this._contents.get_componentWidth() * this._hscroll.get_max());
			}
		} else if(this._hscroll != null) this._hscroll.set_hidden(true);
		if(this._contents.get_componentHeight() > this.get_layout().get_usableHeight()) {
			if(this._vscroll != null) {
				this._vscroll.set_hidden(false);
				this._vscroll.set_max(this._contents.get_componentHeight() - this.get_layout().get_usableHeight());
				this._vscroll.set_pageSize(this.get_layout().get_usableHeight() / this._contents.get_componentHeight() * this._vscroll.get_max());
			}
		} else if(this._vscroll != null) this._vscroll.set_hidden(true);
		this.invalidateLayout();
	}
	,checkHScroll: function() {
		if(this.get_componentWidth() <= 0) return;
		if(this._contents.get_componentWidth() > this.get_layout().get_usableWidth()) {
			if(this._hscroll == null) {
				this._hscroll = new haxe_ui_components_HScroll();
				this._hscroll.set_percentWidth(100);
				this._hscroll.set_id("scrollview-hscroll");
				this._hscroll.registerEvent("Change",$bind(this,this._onScroll));
				this.addComponent(this._hscroll);
			}
		} else if(this._hscroll != null) {
			this.removeComponent(this._hscroll);
			this._hscroll = null;
		}
	}
	,checkVScroll: function() {
		if(this.get_componentHeight() <= 0) return;
		if(this._contents.get_componentHeight() > this.get_layout().get_usableHeight()) {
			if(this._vscroll == null) {
				this._vscroll = new haxe_ui_components_VScroll();
				this._vscroll.set_percentHeight(100);
				this._vscroll.set_id("scrollview-vscroll");
				this._vscroll.registerEvent("Change",$bind(this,this._onScroll));
				this.addComponent(this._vscroll);
			}
		} else if(this._vscroll != null) {
			this.removeComponent(this._vscroll);
			this._vscroll = null;
		}
	}
	,_onScroll: function(event) {
		this.updateScrollRect();
		this.handleBindings(["vscrollPos"]);
	}
	,updateScrollRect: function() {
		if(this._contents == null) return;
		var ucx = this.get_layout().get_usableWidth();
		var ucy = this.get_layout().get_usableHeight();
		var clipCX = ucx;
		if(clipCX > this._contents.get_componentWidth()) clipCX = this._contents.get_componentWidth();
		var clipCY = ucy;
		if(clipCY > this._contents.get_componentHeight()) clipCY = this._contents.get_componentHeight();
		var xpos = 0;
		if(this._hscroll != null) xpos = this._hscroll.get_pos();
		var ypos = 0;
		if(this._vscroll != null) ypos = this._vscroll.get_pos();
		var rc = new haxe_ui_util_Rectangle(xpos | 0,ypos | 0,clipCX,clipCY);
		this._contents.set_clipRect(rc);
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_Component.prototype.cloneComponent.call(this);
		return c;
	}
	,self: function() {
		return new haxe_ui_containers_ScrollView();
	}
	,getProperty: function(name) {
		switch(name) {
		case "vscrollPos":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.get_vscrollPos());
			break;
		case "hscrollPos":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.get_hscrollPos());
			break;
		}
		return haxe_ui_core_Component.prototype.getProperty.call(this,name);
	}
	,setProperty: function(name,v) {
		switch(name) {
		case "vscrollPos":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.set_vscrollPos(haxe_ui_util__$Variant_Variant_$Impl_$.toInt(v)));
			break;
		case "hscrollPos":
			return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(this.set_hscrollPos(haxe_ui_util__$Variant_Variant_$Impl_$.toInt(v)));
			break;
		}
		return haxe_ui_core_Component.prototype.setProperty.call(this,name,v);
	}
	,__class__: haxe_ui_containers_ScrollView
	,__properties__: $extend(haxe_ui_core_Component.prototype.__properties__,{get_contents:"get_contents",set_hscrollPos:"set_hscrollPos",get_hscrollPos:"get_hscrollPos",set_vscrollPos:"set_vscrollPos",get_vscrollPos:"get_vscrollPos"})
});
var haxe_ui_containers_ScrollViewLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
};
$hxClasses["haxe.ui.containers.ScrollViewLayout"] = haxe_ui_containers_ScrollViewLayout;
haxe_ui_containers_ScrollViewLayout.__name__ = ["haxe","ui","containers","ScrollViewLayout"];
haxe_ui_containers_ScrollViewLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_containers_ScrollViewLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	resizeChildren: function() {
		haxe_ui_layouts_DefaultLayout.prototype.resizeChildren.call(this);
		var hscroll = this.get_component().findComponent("scrollview-hscroll");
		var vscroll = this.get_component().findComponent("scrollview-vscroll");
		var ucx = this.get_usableWidth();
		var ucy = this.get_usableHeight();
		return true;
	}
	,repositionChildren: function() {
		var contents = this.get_component().findComponent("scrollview-contents",null,false,"css");
		if(contents == null) return;
		var hscroll = this.get_component().findComponent("scrollview-hscroll");
		var vscroll = this.get_component().findComponent("scrollview-vscroll");
		var ucx = this.get_innerWidth();
		var ucy = this.get_innerHeight();
		if(hscroll != null && this.hidden(hscroll) == false) {
			hscroll.set_left(this.get_paddingLeft());
			hscroll.set_top(ucy - hscroll.get_componentHeight() + this.get_paddingBottom());
		}
		if(vscroll != null && this.hidden(vscroll) == false) {
			vscroll.set_left(ucx - vscroll.get_componentWidth() + this.get_paddingRight());
			vscroll.set_top(this.get_paddingTop());
		}
		contents.set_left(this.get_paddingLeft());
		contents.set_top(this.get_paddingTop());
	}
	,get_usableSize: function() {
		var size = haxe_ui_layouts_DefaultLayout.prototype.get_usableSize.call(this);
		var hscroll = this.get_component().findComponent("scrollview-hscroll");
		var vscroll = this.get_component().findComponent("scrollview-vscroll");
		if(hscroll != null && this.hidden(hscroll) == false) size.height -= hscroll.get_componentHeight();
		if(vscroll != null && this.hidden(vscroll) == false) size.width -= vscroll.get_componentWidth();
		if((js_Boot.__cast(this.get_component() , haxe_ui_containers_ScrollView)).get_native() == true) {
			var contents = this.get_component().findComponent("scrollview-contents",null,false,"css");
			if(contents != null && contents.get_componentHeight() > size.height) size.width -= haxe_ui_core_Platform.get_vscrollWidth();
			var contents1 = this.get_component().findComponent("scrollview-contents",null,false,"css");
			if(contents1 != null && contents1.get_componentWidth() > size.width) size.height -= haxe_ui_core_Platform.get_hscrollHeight();
		}
		return size;
	}
	,calcAutoSize: function() {
		var size = haxe_ui_layouts_DefaultLayout.prototype.calcAutoSize.call(this);
		var hscroll = this.get_component().findComponent("scrollview-hscroll");
		var vscroll = this.get_component().findComponent("scrollview-vscroll");
		if(hscroll != null && hscroll.get_hidden() == false) size.height += hscroll.get_componentHeight();
		if(vscroll != null && vscroll.get_hidden() == false) size.width += vscroll.get_componentWidth();
		var contents = this.get_component().findComponent("scrollview-contents",null,false,"css");
		if(contents != null) {
		}
		return size;
	}
	,__class__: haxe_ui_containers_ScrollViewLayout
});
var haxe_ui_containers_Stack = function() {
	haxe_ui_containers_Box.call(this);
};
$hxClasses["haxe.ui.containers.Stack"] = haxe_ui_containers_Stack;
haxe_ui_containers_Stack.__name__ = ["haxe","ui","containers","Stack"];
haxe_ui_containers_Stack.__interfaces__ = [haxe_ui_core_IClonable];
haxe_ui_containers_Stack.__super__ = haxe_ui_containers_Box;
haxe_ui_containers_Stack.prototype = $extend(haxe_ui_containers_Box.prototype,{
	cloneComponent: function() {
		var c = haxe_ui_containers_Box.prototype.cloneComponent.call(this);
		return c;
	}
	,self: function() {
		return new haxe_ui_containers_Stack();
	}
	,__class__: haxe_ui_containers_Stack
});
var haxe_ui_containers_TabView = function() {
	this._pageIndex = -1;
	haxe_ui_core_Component.call(this);
};
$hxClasses["haxe.ui.containers.TabView"] = haxe_ui_containers_TabView;
haxe_ui_containers_TabView.__name__ = ["haxe","ui","containers","TabView"];
haxe_ui_containers_TabView.__interfaces__ = [haxe_ui_core_IClonable];
haxe_ui_containers_TabView.__super__ = haxe_ui_core_Component;
haxe_ui_containers_TabView.prototype = $extend(haxe_ui_core_Component.prototype,{
	_tabs: null
	,_content: null
	,_views: null
	,createDefaults: function() {
		this._defaultLayout = new haxe_ui_containers_TabViewLayout();
	}
	,createChildren: function() {
		haxe_ui_core_Component.prototype.createChildren.call(this);
		if(this._views == null) this._views = [];
		if(this._content == null) {
			this._content = new haxe_ui_containers_VBox();
			this._content.set_id("tabview-content");
			this._content.addClass("tabview-content");
			this.addComponent(this._content);
		}
		if(this._tabs == null) {
			this._tabs = new haxe_ui_components_TabBar();
			this._tabs.set_id("tabview-tabs");
			this._tabs.addClass("tabview-tabs");
			this._tabs.registerEvent("Change",$bind(this,this._onTabsChange));
			this.addComponent(this._tabs);
		}
	}
	,addComponent: function(child) {
		var v = null;
		if(child == this._tabs) v = haxe_ui_core_Component.prototype.addComponent.call(this,child); else if(child == this._content) v = haxe_ui_core_Component.prototype.addComponent.call(this,child); else if(this._views != null && this._tabs != null) {
			var text = child.get_text();
			var icon = null;
			if(js_Boot.__instanceof(child,haxe_ui_containers_Box)) icon = (js_Boot.__cast(child , haxe_ui_containers_Box)).get_icon();
			this._views.push(child);
			var button = new haxe_ui_components_Button();
			button.set_text(text);
			button.set_icon(icon);
			this._tabs.addComponent(button);
		} else haxe_ui_core_Component.prototype.addComponent.call(this,child);
		return v;
	}
	,removeComponent: function(child,dispose,invalidate) {
		if(invalidate == null) invalidate = true;
		if(dispose == null) dispose = true;
		var v = null;
		if(child == this._tabs) v = haxe_ui_core_Component.prototype.removeComponent.call(this,child,dispose); else if(child == this._content) v = haxe_ui_core_Component.prototype.removeComponent.call(this,child,dispose); else {
		}
		return v;
	}
	,_currentView: null
	,_pageIndex: null
	,get_pageIndex: function() {
		return this._pageIndex;
	}
	,set_pageIndex: function(value) {
		if(value < 0) return value;
		if(this._pageIndex == value) return value;
		this._pageIndex = value;
		var view = this._views[this._pageIndex];
		if(view != null) {
			if(this._currentView != null) this._currentView.hide();
			if(this._content.getComponentIndex(view) == -1) this._content.addComponent(view); else view.show();
			this._currentView = view;
			this.invalidateLayout();
		}
		this.dispatch(new haxe_ui_core_UIEvent("Change"));
		return value;
	}
	,_onTabsChange: function(event) {
		this.set_pageIndex(this._tabs.get_selectedIndex());
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_Component.prototype.cloneComponent.call(this);
		return c;
	}
	,self: function() {
		return new haxe_ui_containers_TabView();
	}
	,__class__: haxe_ui_containers_TabView
	,__properties__: $extend(haxe_ui_core_Component.prototype.__properties__,{set_pageIndex:"set_pageIndex",get_pageIndex:"get_pageIndex"})
});
var haxe_ui_containers_TabViewLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
};
$hxClasses["haxe.ui.containers.TabViewLayout"] = haxe_ui_containers_TabViewLayout;
haxe_ui_containers_TabViewLayout.__name__ = ["haxe","ui","containers","TabViewLayout"];
haxe_ui_containers_TabViewLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_containers_TabViewLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	repositionChildren: function() {
		var tabs = this.get_component().findComponent("tabview-tabs");
		var content = this.get_component().findComponent("tabview-content");
		if(tabs == null || content == null) return;
		tabs.set_left(this.get_paddingLeft());
		tabs.set_top(this.get_paddingTop());
		content.set_left(this.get_paddingLeft());
		if(tabs.get_componentHeight() != null) content.set_top(tabs.get_top() + tabs.get_componentHeight() - 1);
	}
	,resizeChildren: function() {
		var content = this.get_component().findComponent("tabview-content");
		var tabs = this.get_component().findComponent("tabview-tabs");
		if(tabs == null || content == null) return false;
		if(this.get_component().get_autoHeight() == false) content.set_componentHeight(this.get_usableHeight());
		if(this.get_component().get_autoWidth() == false) content.set_componentWidth(this.get_component().get_componentWidth()); else {
		}
		return true;
	}
	,get_usableSize: function() {
		var size = haxe_ui_layouts_DefaultLayout.prototype.get_usableSize.call(this);
		var tabs = this.get_component().findComponent("tabview-tabs");
		if(tabs != null && tabs.get_componentHeight() != null) size.height -= tabs.get_componentHeight();
		return size;
	}
	,calcAutoSize: function() {
		var size = haxe_ui_layouts_DefaultLayout.prototype.calcAutoSize.call(this);
		return size;
	}
	,__class__: haxe_ui_containers_TabViewLayout
});
var haxe_ui_containers_VBox = function() {
	haxe_ui_containers_Box.call(this);
	this.set_layout(new haxe_ui_layouts_VerticalLayout());
};
$hxClasses["haxe.ui.containers.VBox"] = haxe_ui_containers_VBox;
haxe_ui_containers_VBox.__name__ = ["haxe","ui","containers","VBox"];
haxe_ui_containers_VBox.__interfaces__ = [haxe_ui_core_IClonable];
haxe_ui_containers_VBox.__super__ = haxe_ui_containers_Box;
haxe_ui_containers_VBox.prototype = $extend(haxe_ui_containers_Box.prototype,{
	cloneComponent: function() {
		var c = haxe_ui_containers_Box.prototype.cloneComponent.call(this);
		return c;
	}
	,self: function() {
		return new haxe_ui_containers_VBox();
	}
	,__class__: haxe_ui_containers_VBox
});
var haxe_ui_containers_dialogs_Dialog = function() {
	haxe_ui_core_Component.call(this);
};
$hxClasses["haxe.ui.containers.dialogs.Dialog"] = haxe_ui_containers_dialogs_Dialog;
haxe_ui_containers_dialogs_Dialog.__name__ = ["haxe","ui","containers","dialogs","Dialog"];
haxe_ui_containers_dialogs_Dialog.__super__ = haxe_ui_core_Component;
haxe_ui_containers_dialogs_Dialog.prototype = $extend(haxe_ui_core_Component.prototype,{
	_titleBar: null
	,_buttons: null
	,_title: null
	,_closeButton: null
	,createChildren: function() {
		this.set_layout(new haxe_ui_layouts_VerticalLayout());
	}
	,createTitleBar: function() {
		if(this.get_native() == true) return;
		if(this._titleBar == null) {
			this._titleBar = new haxe_ui_containers_HBox();
			this._titleBar.set_id("dialog-title-bar");
			this._titleBar.addClass("dialog-title-bar");
			this._title = new haxe_ui_components_Label();
			this._title.set_text(this._options.title);
			this._title.set_id("dialog-title");
			this._title.addClass("dialog-title");
			this._titleBar.addComponent(this._title);
			this._closeButton = new haxe_ui_components_Button();
			this._closeButton.set_id("dialog-close-button");
			this._closeButton.addClass("dialog-close-button");
			this._closeButton.registerEvent("Click",$bind(this,this._onButtonClick));
			this._titleBar.addComponent(this._closeButton);
			this.addComponent(this._titleBar);
		}
	}
	,createButtonBar: function() {
		if(this._buttons == null && this._options != null && this._options.buttons.length > 0) {
			this._buttons = new haxe_ui_containers_HBox();
			this._buttons.set_id("dialog-buttons");
			this._buttons.addClass("dialog-buttons");
			var _g = 0;
			var _g1 = this._options.buttons;
			while(_g < _g1.length) {
				var b = _g1[_g];
				++_g;
				var button = this.addButton(b);
			}
			this.addComponent(this._buttons);
		}
	}
	,addComponent: function(child) {
		var r = null;
		if(child == this._titleBar || child == this._buttons) r = haxe_ui_core_Component.prototype.addComponent.call(this,child); else {
			child.addClass("dialog-content");
			r = haxe_ui_core_Component.prototype.addComponent.call(this,child);
			this.createButtonBar();
		}
		return r;
	}
	,close: function() {
		this.get_screen().hideDialog(this);
	}
	,addButton: function(dialogButton) {
		if(this._buttons == null) this.createButtonBar();
		var button = new haxe_ui_components_Button();
		button.set_id(dialogButton.id);
		button.set_text(dialogButton.text);
		button.set_styleNames(dialogButton.styleNames);
		button.set_styleString(dialogButton.style);
		button.set_icon(dialogButton.icon);
		button.userData = dialogButton;
		button.registerEvent("Click",$bind(this,this._onButtonClick));
		this._buttons.addComponent(button);
		return button;
	}
	,_options: null
	,get_dialogOptions: function() {
		return this._options;
	}
	,set_dialogOptions: function(value) {
		this._options = value;
		if(this._options.styleNames != null) this.set_styleNames(this._options.styleNames);
		this.createTitleBar();
		return value;
	}
	,callback: null
	,_onButtonClick: function(event) {
		var dialogButton = null;
		if(event.target.userData != null) dialogButton = js_Boot.__cast(event.target.userData , haxe_ui_containers_dialogs_DialogButton);
		if(dialogButton == null || dialogButton.closesDialog == true) this.close();
		if(this.callback != null) this.callback(dialogButton);
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_Component.prototype.cloneComponent.call(this);
		return c;
	}
	,self: function() {
		return new haxe_ui_containers_dialogs_Dialog();
	}
	,__class__: haxe_ui_containers_dialogs_Dialog
	,__properties__: $extend(haxe_ui_core_Component.prototype.__properties__,{set_dialogOptions:"set_dialogOptions",get_dialogOptions:"get_dialogOptions"})
});
var haxe_ui_containers_dialogs_DialogButton = function() {
	this.closesDialog = true;
};
$hxClasses["haxe.ui.containers.dialogs.DialogButton"] = haxe_ui_containers_dialogs_DialogButton;
haxe_ui_containers_dialogs_DialogButton.__name__ = ["haxe","ui","containers","dialogs","DialogButton"];
haxe_ui_containers_dialogs_DialogButton.prototype = {
	text: null
	,icon: null
	,id: null
	,styleNames: null
	,style: null
	,closesDialog: null
	,__class__: haxe_ui_containers_dialogs_DialogButton
};
var haxe_ui_containers_dialogs_DialogOptions = function() {
	this.buttons = [];
};
$hxClasses["haxe.ui.containers.dialogs.DialogOptions"] = haxe_ui_containers_dialogs_DialogOptions;
haxe_ui_containers_dialogs_DialogOptions.__name__ = ["haxe","ui","containers","dialogs","DialogOptions"];
haxe_ui_containers_dialogs_DialogOptions.prototype = {
	buttons: null
	,title: null
	,icon: null
	,styleNames: null
	,addStandardButton: function(button) {
		switch(button) {
		case 1:
			var b = new haxe_ui_containers_dialogs_DialogButton();
			b.text = "OK";
			b.id = "" + 1;
			b.styleNames = "dialog-button dialog-button-ok";
			this.addButton(b);
			break;
		case 2:
			var b1 = new haxe_ui_containers_dialogs_DialogButton();
			b1.text = "Cancel";
			b1.id = "" + 2;
			b1.styleNames = "dialog-button dialog-button-cancel";
			this.addButton(b1);
			break;
		case 4:
			var b2 = new haxe_ui_containers_dialogs_DialogButton();
			b2.text = "Close";
			b2.id = "" + 4;
			b2.styleNames = "dialog-button dialog-button-close";
			this.addButton(b2);
			break;
		case 8:
			var b3 = new haxe_ui_containers_dialogs_DialogButton();
			b3.text = "Confirm";
			b3.id = "" + 8;
			b3.styleNames = "dialog-button dialog-button-confirm";
			this.addButton(b3);
			break;
		case 16:
			var b4 = new haxe_ui_containers_dialogs_DialogButton();
			b4.text = "Yes";
			b4.id = "" + 16;
			b4.styleNames = "dialog-button dialog-button-yes";
			this.addButton(b4);
			break;
		case 32:
			var b5 = new haxe_ui_containers_dialogs_DialogButton();
			b5.text = "No";
			b5.id = "" + 32;
			b5.styleNames = "dialog-button dialog-button-no";
			this.addButton(b5);
			break;
		default:
		}
	}
	,addButton: function(button) {
		this.buttons.push(button);
	}
	,__class__: haxe_ui_containers_dialogs_DialogOptions
};
var haxe_ui_containers_dialogs_MessageDialog = function() {
	haxe_ui_containers_dialogs_Dialog.call(this);
};
$hxClasses["haxe.ui.containers.dialogs.MessageDialog"] = haxe_ui_containers_dialogs_MessageDialog;
haxe_ui_containers_dialogs_MessageDialog.__name__ = ["haxe","ui","containers","dialogs","MessageDialog"];
haxe_ui_containers_dialogs_MessageDialog.__super__ = haxe_ui_containers_dialogs_Dialog;
haxe_ui_containers_dialogs_MessageDialog.prototype = $extend(haxe_ui_containers_dialogs_Dialog.prototype,{
	cloneComponent: function() {
		var c = haxe_ui_containers_dialogs_Dialog.prototype.cloneComponent.call(this);
		return c;
	}
	,self: function() {
		return new haxe_ui_containers_dialogs_MessageDialog();
	}
	,__class__: haxe_ui_containers_dialogs_MessageDialog
});
var haxe_ui_core_BindingInfo = function() {
};
$hxClasses["haxe.ui.core.BindingInfo"] = haxe_ui_core_BindingInfo;
haxe_ui_core_BindingInfo.__name__ = ["haxe","ui","core","BindingInfo"];
haxe_ui_core_BindingInfo.prototype = {
	target: null
	,targetProperty: null
	,sourceProperty: null
	,transform: null
	,__class__: haxe_ui_core_BindingInfo
};
var haxe_ui_core_DeferredBindingInfo = function() {
};
$hxClasses["haxe.ui.core.DeferredBindingInfo"] = haxe_ui_core_DeferredBindingInfo;
haxe_ui_core_DeferredBindingInfo.__name__ = ["haxe","ui","core","DeferredBindingInfo"];
haxe_ui_core_DeferredBindingInfo.prototype = {
	targetId: null
	,sourceId: null
	,targetProperty: null
	,sourceProperty: null
	,transform: null
	,__class__: haxe_ui_core_DeferredBindingInfo
};
var haxe_ui_core_ComponentClassMap = function() {
	this._map = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.core.ComponentClassMap"] = haxe_ui_core_ComponentClassMap;
haxe_ui_core_ComponentClassMap.__name__ = ["haxe","ui","core","ComponentClassMap"];
haxe_ui_core_ComponentClassMap.__properties__ = {get_instance:"get_instance"}
haxe_ui_core_ComponentClassMap.get_instance = function() {
	if(haxe_ui_core_ComponentClassMap._instance == null) haxe_ui_core_ComponentClassMap._instance = new haxe_ui_core_ComponentClassMap();
	return haxe_ui_core_ComponentClassMap._instance;
};
haxe_ui_core_ComponentClassMap.get = function(alias) {
	return haxe_ui_core_ComponentClassMap.get_instance().getClassName(alias);
};
haxe_ui_core_ComponentClassMap.register = function(alias,className) {
	haxe_ui_core_ComponentClassMap.get_instance().registerClassName(alias,className);
};
haxe_ui_core_ComponentClassMap.prototype = {
	_map: null
	,getClassName: function(alias) {
		return this._map.get(alias);
	}
	,registerClassName: function(alias,className) {
		this._map.set(alias,className);
	}
	,__class__: haxe_ui_core_ComponentClassMap
};
var haxe_ui_core_ImageDisplay = function() {
	haxe_ui_backend_ImageDisplayBase.call(this);
};
$hxClasses["haxe.ui.core.ImageDisplay"] = haxe_ui_core_ImageDisplay;
haxe_ui_core_ImageDisplay.__name__ = ["haxe","ui","core","ImageDisplay"];
haxe_ui_core_ImageDisplay.__super__ = haxe_ui_backend_ImageDisplayBase;
haxe_ui_core_ImageDisplay.prototype = $extend(haxe_ui_backend_ImageDisplayBase.prototype,{
	__class__: haxe_ui_core_ImageDisplay
});
var haxe_ui_core_UIEvent = function(type) {
	this.type = type;
};
$hxClasses["haxe.ui.core.UIEvent"] = haxe_ui_core_UIEvent;
haxe_ui_core_UIEvent.__name__ = ["haxe","ui","core","UIEvent"];
haxe_ui_core_UIEvent.prototype = {
	type: null
	,target: null
	,clone: function() {
		var c = new haxe_ui_core_UIEvent(this.type);
		c.type = this.type;
		c.target = this.target;
		return c;
	}
	,__class__: haxe_ui_core_UIEvent
};
var haxe_ui_core_KeyboardEvent = function(type) {
	haxe_ui_core_UIEvent.call(this,type);
};
$hxClasses["haxe.ui.core.KeyboardEvent"] = haxe_ui_core_KeyboardEvent;
haxe_ui_core_KeyboardEvent.__name__ = ["haxe","ui","core","KeyboardEvent"];
haxe_ui_core_KeyboardEvent.__super__ = haxe_ui_core_UIEvent;
haxe_ui_core_KeyboardEvent.prototype = $extend(haxe_ui_core_UIEvent.prototype,{
	keyCode: null
	,shiftKey: null
	,clone: function() {
		var c = new haxe_ui_core_KeyboardEvent(this.type);
		c.type = this.type;
		c.target = this.target;
		c.keyCode = this.keyCode;
		c.shiftKey = this.shiftKey;
		return c;
	}
	,__class__: haxe_ui_core_KeyboardEvent
});
var haxe_ui_core_MouseEvent = function(type) {
	haxe_ui_core_UIEvent.call(this,type);
};
$hxClasses["haxe.ui.core.MouseEvent"] = haxe_ui_core_MouseEvent;
haxe_ui_core_MouseEvent.__name__ = ["haxe","ui","core","MouseEvent"];
haxe_ui_core_MouseEvent.__super__ = haxe_ui_core_UIEvent;
haxe_ui_core_MouseEvent.prototype = $extend(haxe_ui_core_UIEvent.prototype,{
	screenX: null
	,screenY: null
	,buttonDown: null
	,delta: null
	,clone: function() {
		var c = new haxe_ui_core_MouseEvent(this.type);
		c.type = this.type;
		c.target = this.target;
		c.screenX = this.screenX;
		c.screenY = this.screenY;
		c.buttonDown = this.buttonDown;
		c.delta = this.delta;
		return c;
	}
	,__class__: haxe_ui_core_MouseEvent
});
var haxe_ui_core_Platform = function() {
};
$hxClasses["haxe.ui.core.Platform"] = haxe_ui_core_Platform;
haxe_ui_core_Platform.__name__ = ["haxe","ui","core","Platform"];
haxe_ui_core_Platform.__properties__ = {get_instance:"get_instance",get_hscrollHeight:"get_hscrollHeight",get_vscrollWidth:"get_vscrollWidth"}
haxe_ui_core_Platform.get_vscrollWidth = function() {
	return haxe_ui_core_Platform.get_instance().getMetric("patform.metrics.vscroll.width");
};
haxe_ui_core_Platform.get_hscrollHeight = function() {
	return haxe_ui_core_Platform.get_instance().getMetric("patform.metrics.hscroll.height");
};
haxe_ui_core_Platform.get_instance = function() {
	if(haxe_ui_core_Platform._instance == null) haxe_ui_core_Platform._instance = new haxe_ui_core_Platform();
	return haxe_ui_core_Platform._instance;
};
haxe_ui_core_Platform.__super__ = haxe_ui_backend_PlatformBase;
haxe_ui_core_Platform.prototype = $extend(haxe_ui_backend_PlatformBase.prototype,{
	getMetric: function(id) {
		return haxe_ui_backend_PlatformBase.prototype.getMetric.call(this,id);
	}
	,__class__: haxe_ui_core_Platform
});
var haxe_ui_core_DialogEntry = function() {
};
$hxClasses["haxe.ui.core.DialogEntry"] = haxe_ui_core_DialogEntry;
haxe_ui_core_DialogEntry.__name__ = ["haxe","ui","core","DialogEntry"];
haxe_ui_core_DialogEntry.prototype = {
	overlay: null
	,dialog: null
	,callback: null
	,__class__: haxe_ui_core_DialogEntry
};
var haxe_ui_core_Screen = function() {
	this.rootComponents = [];
	this._dialogs = new haxe_ds_ObjectMap();
	haxe_ui_backend_ScreenBase.call(this);
	this._eventMap = new haxe_ui_util_EventMap();
};
$hxClasses["haxe.ui.core.Screen"] = haxe_ui_core_Screen;
haxe_ui_core_Screen.__name__ = ["haxe","ui","core","Screen"];
haxe_ui_core_Screen.__properties__ = {get_instance:"get_instance"}
haxe_ui_core_Screen.get_instance = function() {
	if(haxe_ui_core_Screen._instance == null) haxe_ui_core_Screen._instance = new haxe_ui_core_Screen();
	return haxe_ui_core_Screen._instance;
};
haxe_ui_core_Screen.createDialogOptions = function(options) {
	if(js_Boot.__instanceof(options,haxe_ui_containers_dialogs_DialogOptions)) return js_Boot.__cast(options , haxe_ui_containers_dialogs_DialogOptions);
	var dialogOptions = new haxe_ui_containers_dialogs_DialogOptions();
	var o = { };
	if(options == null) o = { }; else if(((options | 0) === options)) {
		var n;
		n = js_Boot.__cast(options , Int);
		o.buttons = [n];
		o.icon = n;
	} else o = options;
	if(o.buttons == null) o.buttons = [1]; else if(js_Boot.__instanceof(o.buttons,Int)) o.buttons = [options.buttons];
	if(o.title == null) o.title = "HaxeUI";
	var buttons = o.buttons;
	haxe_Log.trace(o.buttons,{ fileName : "Screen.hx", lineNumber : 188, className : "haxe.ui.core.Screen", methodName : "createDialogOptions"});
	var _g = 0;
	while(_g < buttons.length) {
		var b = buttons[_g];
		++_g;
		if(((b | 0) === b)) {
			if((b & 1) == 1) dialogOptions.addStandardButton(1);
			if((b & 2) == 2) dialogOptions.addStandardButton(2);
			if((b & 4) == 4) dialogOptions.addStandardButton(4);
			if((b & 8) == 8) dialogOptions.addStandardButton(8);
			if((b & 16) == 16) dialogOptions.addStandardButton(16);
			if((b & 32) == 32) dialogOptions.addStandardButton(32);
		} else {
			var dialogButton = new haxe_ui_containers_dialogs_DialogButton();
			dialogButton.text = b.text;
			dialogButton.icon = b.icon;
			if(b.closesDialog != null) dialogButton.closesDialog = b.closesDialog;
			dialogOptions.addButton(dialogButton);
		}
	}
	if(o.icon != null) {
		if((o.icon & 256) == 256) dialogOptions.icon = 256; else if((o.icon & 512) == 512) dialogOptions.icon = 512; else if((o.icon & 1024) == 1024) dialogOptions.icon = 1024; else if((o.icon & 2048) == 2048) dialogOptions.icon = 2048;
	}
	dialogOptions.title = o.title;
	dialogOptions.styleNames = o.styleNames;
	return dialogOptions;
};
haxe_ui_core_Screen.__super__ = haxe_ui_backend_ScreenBase;
haxe_ui_core_Screen.prototype = $extend(haxe_ui_backend_ScreenBase.prototype,{
	_dialogs: null
	,rootComponents: null
	,_eventMap: null
	,addComponent: function(component) {
		haxe_ui_backend_ScreenBase.prototype.addComponent.call(this,component);
		component.ready();
		this.rootComponents.push(component);
		haxe_ui_focus_FocusManager.get_instance().pushView(component);
	}
	,removeComponent: function(component) {
		haxe_ui_backend_ScreenBase.prototype.removeComponent.call(this,component);
		HxOverrides.remove(this.rootComponents,component);
	}
	,messageDialog: function(message,title,options,callback) {
		var dialog = haxe_ui_backend_ScreenBase.prototype.messageDialog.call(this,message,title,options,callback);
		if(dialog != null) return dialog;
		var dialogOptions = new haxe_ui_containers_dialogs_DialogOptions();
		var dialogOptions1 = haxe_ui_core_Screen.createDialogOptions(options);
		if(dialogOptions1.buttons.length == 0) dialogOptions1.addStandardButton(1);
		if(title != null) dialogOptions1.title = title;
		var content = new haxe_ui_containers_HBox();
		content.set_percentWidth(100);
		if(dialogOptions1.icon > 0) {
			var image = new haxe_ui_components_Image();
			image.set_id("message-dialog-icon");
			image.set_styleNames("message-dialog-icon");
			var _g = dialogOptions1.icon;
			switch(_g) {
			case 256:
				image.set_resource("haxeui-core/styles/default/dialogs/cross-circle.png");
				break;
			case 512:
				image.set_resource("haxeui-core/styles/default/dialogs/information.png");
				break;
			case 1024:
				image.set_resource("haxeui-core/styles/default/dialogs/exclamation.png");
				break;
			case 2048:
				image.set_resource("haxeui-core/styles/default/dialogs/question.png");
				break;
			}
			content.addComponent(image);
		}
		var label = new haxe_ui_components_Label();
		label.set_percentWidth(100);
		label.set_text(message);
		label.set_id("message-dialog-message");
		label.addClass("message-dialog-message");
		content.addComponent(label);
		return this.showDialog(content,dialogOptions1,callback);
	}
	,showDialog: function(content,options,callback) {
		var dialog = haxe_ui_backend_ScreenBase.prototype.showDialog.call(this,content,options,callback);
		if(dialog != null) return dialog;
		var overlay = new haxe_ui_core_Component();
		overlay.set_id("modal-background");
		overlay.addClass("modal-background");
		overlay.set_percentWidth(overlay.set_percentHeight(100));
		this.addComponent(overlay);
		var dialog1 = new haxe_ui_containers_dialogs_Dialog();
		dialog1.callback = callback;
		dialog1.set_dialogOptions(haxe_ui_core_Screen.createDialogOptions(options));
		content.addClass("dialog-content");
		dialog1.addComponent(content);
		this.addComponent(dialog1);
		this.centerDialog(dialog1);
		var x = this.get_width() / 2 - dialog1.get_componentWidth() / 2;
		var y = this.get_height() / 2 - dialog1.get_componentHeight() / 2;
		var vars;
		var _g = new haxe_ds_StringMap();
		if(__map_reserved.startLeft != null) _g.setReserved("startLeft",x); else _g.h["startLeft"] = x;
		var value = -dialog1.get_componentHeight();
		if(__map_reserved.startTop != null) _g.setReserved("startTop",value); else _g.h["startTop"] = value;
		if(__map_reserved.endLeft != null) _g.setReserved("endLeft",x); else _g.h["endLeft"] = x;
		if(__map_reserved.endTop != null) _g.setReserved("endTop",y); else _g.h["endTop"] = y;
		vars = _g;
		haxe_ui_animation_AnimationManager.get_instance().run("haxe.ui.components.animation.dialog.show",(function($this) {
			var $r;
			var _g1 = new haxe_ds_StringMap();
			if(__map_reserved.target != null) _g1.setReserved("target",dialog1); else _g1.h["target"] = dialog1;
			$r = _g1;
			return $r;
		}(this)),vars);
		var entry = new haxe_ui_core_DialogEntry();
		entry.overlay = overlay;
		entry.dialog = dialog1;
		this._dialogs.set(dialog1,entry);
		if(Lambda.count(this._dialogs) == 1) {
			var _g2 = 0;
			var _g3 = this.rootComponents;
			while(_g2 < _g3.length) {
				var r = _g3[_g2];
				++_g2;
				r.addClass("modal-component");
			}
		}
		return dialog1;
	}
	,hideDialog: function(dialog) {
		var _g2 = this;
		if(haxe_ui_backend_ScreenBase.prototype.hideDialog.call(this,dialog) == true) return true;
		var entry = this._dialogs.h[dialog.__id__];
		if(entry == null) return false;
		var x = dialog.get_left();
		var y = this.get_height();
		var vars;
		var _g = new haxe_ds_StringMap();
		var value = dialog.get_left();
		if(__map_reserved.startLeft != null) _g.setReserved("startLeft",value); else _g.h["startLeft"] = value;
		var value1 = dialog.get_top();
		if(__map_reserved.startTop != null) _g.setReserved("startTop",value1); else _g.h["startTop"] = value1;
		if(__map_reserved.endLeft != null) _g.setReserved("endLeft",x); else _g.h["endLeft"] = x;
		if(__map_reserved.endTop != null) _g.setReserved("endTop",y); else _g.h["endTop"] = y;
		vars = _g;
		haxe_ui_animation_AnimationManager.get_instance().run("haxe.ui.components.animation.dialog.hide",(function($this) {
			var $r;
			var _g1 = new haxe_ds_StringMap();
			if(__map_reserved.target != null) _g1.setReserved("target",dialog); else _g1.h["target"] = dialog;
			$r = _g1;
			return $r;
		}(this)),vars,function() {
			haxe_ui_core_Screen.get_instance().removeComponent(entry.dialog);
			haxe_ui_core_Screen.get_instance().removeComponent(entry.overlay);
			_g2._dialogs.remove(dialog);
			if(Lambda.count(_g2._dialogs) == 0) {
				var _g3 = 0;
				var _g4 = _g2.rootComponents;
				while(_g3 < _g4.length) {
					var r = _g4[_g3];
					++_g3;
					r.removeClass("modal-component");
				}
			}
		});
		return true;
	}
	,centerDialog: function(dialog) {
		var x = this.get_width() / 2 - dialog.get_componentWidth() / 2;
		var y = this.get_height() / 2 - dialog.get_componentHeight() / 2;
		dialog.moveComponent(x,y);
	}
	,registerEvent: function(type,listener) {
		if(this.supportsEvent(type) == true) {
			if(this._eventMap.add(type,listener) == true) this.mapEvent(type,$bind(this,this._onMappedEvent));
		} else haxe_Log.trace("WARNING: Screen event \"" + type + "\" not supported",{ fileName : "Screen.hx", lineNumber : 288, className : "haxe.ui.core.Screen", methodName : "registerEvent"});
	}
	,unregisterEvent: function(type,listener) {
		if(this._eventMap.remove(type,listener) == true) this.unmapEvent(type,$bind(this,this._onMappedEvent));
	}
	,_onMappedEvent: function(event) {
		this._eventMap.invoke(event.type,event);
	}
	,__class__: haxe_ui_core_Screen
});
var haxe_ui_core_TextDisplay = function() {
	haxe_ui_backend_TextDisplayBase.call(this);
};
$hxClasses["haxe.ui.core.TextDisplay"] = haxe_ui_core_TextDisplay;
haxe_ui_core_TextDisplay.__name__ = ["haxe","ui","core","TextDisplay"];
haxe_ui_core_TextDisplay.__super__ = haxe_ui_backend_TextDisplayBase;
haxe_ui_core_TextDisplay.prototype = $extend(haxe_ui_backend_TextDisplayBase.prototype,{
	_textStyle: null
	,get_textStyle: function() {
		return this._textStyle;
	}
	,set_textStyle: function(value) {
		if(value == null) return value;
		if(value.color != null) this.set_color(value.color);
		return value;
	}
	,__class__: haxe_ui_core_TextDisplay
	,__properties__: $extend(haxe_ui_backend_TextDisplayBase.prototype.__properties__,{set_textStyle:"set_textStyle",get_textStyle:"get_textStyle"})
});
var haxe_ui_core_TextInput = function() {
	haxe_ui_backend_TextInputBase.call(this);
};
$hxClasses["haxe.ui.core.TextInput"] = haxe_ui_core_TextInput;
haxe_ui_core_TextInput.__name__ = ["haxe","ui","core","TextInput"];
haxe_ui_core_TextInput.__super__ = haxe_ui_backend_TextInputBase;
haxe_ui_core_TextInput.prototype = $extend(haxe_ui_backend_TextInputBase.prototype,{
	_textStyle: null
	,get_textStyle: function() {
		return this._textStyle;
	}
	,set_textStyle: function(value) {
		if(value == null) return value;
		if(value.color != null) this.set_color(value.color);
		return value;
	}
	,__class__: haxe_ui_core_TextInput
	,__properties__: $extend(haxe_ui_backend_TextInputBase.prototype.__properties__,{set_textStyle:"set_textStyle",get_textStyle:"get_textStyle"})
});
var haxe_ui_focus_FocusInfo = function() {
};
$hxClasses["haxe.ui.focus.FocusInfo"] = haxe_ui_focus_FocusInfo;
haxe_ui_focus_FocusInfo.__name__ = ["haxe","ui","focus","FocusInfo"];
haxe_ui_focus_FocusInfo.prototype = {
	view: null
	,currentFocus: null
	,__class__: haxe_ui_focus_FocusInfo
};
var haxe_ui_focus_FocusManager = function() {
	this._views = [];
	this._focusInfo = new haxe_ds_ObjectMap();
};
$hxClasses["haxe.ui.focus.FocusManager"] = haxe_ui_focus_FocusManager;
haxe_ui_focus_FocusManager.__name__ = ["haxe","ui","focus","FocusManager"];
haxe_ui_focus_FocusManager.__properties__ = {get_instance:"get_instance"}
haxe_ui_focus_FocusManager.get_instance = function() {
	if(haxe_ui_focus_FocusManager._instance == null) haxe_ui_focus_FocusManager._instance = new haxe_ui_focus_FocusManager();
	return haxe_ui_focus_FocusManager._instance;
};
haxe_ui_focus_FocusManager.prototype = {
	_views: null
	,_focusInfo: null
	,pushView: function(component) {
		this._views.push(component);
	}
	,popView: function() {
		var c = this._views.pop();
		this._focusInfo.remove(c);
	}
	,focusInfo: null
	,get_focusInfo: function() {
		if(this._views.length == 0) return null;
		var c = this._views[this._views.length - 1];
		var info = this._focusInfo.h[c.__id__];
		if(info == null) {
			info = new haxe_ui_focus_FocusInfo();
			info.view = c;
			this._focusInfo.set(c,info);
		}
		return info;
	}
	,get_focus: function() {
		return this.get_focusInfo().currentFocus;
	}
	,set_focus: function(value) {
		if(js_Boot.__instanceof(value,haxe_ui_focus_IFocusable) == false) throw new js__$Boot_HaxeError("Component does not implement IFocusable");
		if(this.get_focusInfo().currentFocus != null && this.get_focusInfo().currentFocus != value) {
			this.get_focusInfo().currentFocus.set_focus(false);
			this.get_focusInfo().currentFocus = null;
			haxe_ui_Toolkit.get_screen().focus = null;
		}
		if(value != null) {
			this.get_focusInfo().currentFocus = value;
			this.get_focusInfo().currentFocus.set_focus(true);
			haxe_ui_Toolkit.get_screen().focus = value;
		}
		return this.get_focusInfo().currentFocus;
	}
	,focusNext: function() {
		if(this._views.length == 0) return null;
		var list = [];
		var info = this.get_focusInfo();
		var currentFocus = this.buildFocusableList(info.view,list);
		var index = -1;
		if(currentFocus != null) index = HxOverrides.indexOf(list,currentFocus,0);
		var nextIndex = index + 1;
		if(nextIndex > list.length - 1) nextIndex = 0;
		var nextFocus = list[nextIndex];
		this.set_focus(nextFocus);
		return nextFocus;
	}
	,focusPrev: function() {
		if(this._views.length == 0) return null;
		var list = [];
		var info = this.get_focusInfo();
		var currentFocus = this.buildFocusableList(info.view,list);
		var index = -1;
		if(currentFocus != null) index = HxOverrides.indexOf(list,currentFocus,0);
		var prevIndex = index - 1;
		if(prevIndex < 0) prevIndex = list.length - 1;
		var prevFocus = list[prevIndex];
		this.set_focus(prevFocus);
		return prevFocus;
	}
	,buildFocusableList: function(c,list) {
		var currentFocus = null;
		if(js_Boot.__instanceof(c,haxe_ui_focus_IFocusable)) {
			var f = c;
			if(f.get_allowFocus() == true) {
				if(f.get_focus() == true) currentFocus = f;
				list.push(f);
			}
		}
		var _g = 0;
		var _g1 = c.get_childComponents();
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			var f1 = this.buildFocusableList(child,list);
			if(f1 != null) currentFocus = f1;
		}
		return currentFocus;
	}
	,__class__: haxe_ui_focus_FocusManager
	,__properties__: {set_focus:"set_focus",get_focus:"get_focus",get_focusInfo:"get_focusInfo"}
};
var haxe_ui_layouts_AbsoluteLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
};
$hxClasses["haxe.ui.layouts.AbsoluteLayout"] = haxe_ui_layouts_AbsoluteLayout;
haxe_ui_layouts_AbsoluteLayout.__name__ = ["haxe","ui","layouts","AbsoluteLayout"];
haxe_ui_layouts_AbsoluteLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_layouts_AbsoluteLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	repositionChildren: function() {
	}
	,__class__: haxe_ui_layouts_AbsoluteLayout
});
var haxe_ui_layouts_VerticalLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
};
$hxClasses["haxe.ui.layouts.VerticalLayout"] = haxe_ui_layouts_VerticalLayout;
haxe_ui_layouts_VerticalLayout.__name__ = ["haxe","ui","layouts","VerticalLayout"];
haxe_ui_layouts_VerticalLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_layouts_VerticalLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	repositionChildren: function() {
		var ypos = this.get_paddingTop();
		var usableSize = this.get_component().get_layout().get_usableSize();
		var _g = 0;
		var _g1 = this.get_component().get_childComponents();
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) continue;
			var xpos = 0;
			var _g2 = this.horizontalAlign(child);
			switch(_g2) {
			case "center":
				xpos = this.get_component().get_componentWidth() / 2 - child.get_componentWidth() / 2 + this.marginLeft(child) - this.marginRight(child);
				break;
			case "right":
				if(child.get_componentWidth() < this.get_component().get_componentWidth()) xpos = usableSize.width - (child.get_componentWidth() + this.get_paddingRight() + this.marginLeft(child) - this.marginRight(child));
				break;
			default:
				xpos = this.get_paddingLeft() + this.marginLeft(child) - this.marginRight(child);
			}
			child.moveComponent(xpos,ypos + this.marginTop(child) - this.marginBottom(child));
			ypos += child.get_componentHeight() + this.get_verticalSpacing();
		}
	}
	,get_usableSize: function() {
		var size = haxe_ui_layouts_DefaultLayout.prototype.get_usableSize.call(this);
		var visibleChildren = this.get_component().get_childComponents().length;
		var _g = 0;
		var _g1 = this.get_component().get_childComponents();
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				visibleChildren--;
				continue;
			}
			if(child.get_componentHeight() > 0 && child.get_percentHeight() == null) size.height -= child.get_componentHeight() + this.marginTop(child) + this.marginBottom(child);
		}
		if(visibleChildren > 1) size.height -= this.get_verticalSpacing() * (visibleChildren - 1);
		if(size.height < 0) size.height = 0;
		return size;
	}
	,__class__: haxe_ui_layouts_VerticalLayout
});
var haxe_ui_layouts_DelegateLayout = function(size) {
	haxe_ui_layouts_VerticalLayout.call(this);
	this._size = size;
};
$hxClasses["haxe.ui.layouts.DelegateLayout"] = haxe_ui_layouts_DelegateLayout;
haxe_ui_layouts_DelegateLayout.__name__ = ["haxe","ui","layouts","DelegateLayout"];
haxe_ui_layouts_DelegateLayout.__super__ = haxe_ui_layouts_VerticalLayout;
haxe_ui_layouts_DelegateLayout.prototype = $extend(haxe_ui_layouts_VerticalLayout.prototype,{
	_size: null
	,calcAutoSize: function() {
		this._size.component = this.get_component();
		var cx = this._size.get_width();
		var cy = this._size.get_height();
		if(this._size.getBool("includePadding",false) == true) {
			cx += this.get_paddingLeft() + this.get_paddingRight();
			cy += this.get_paddingTop() + this.get_paddingBottom();
		}
		var size = new haxe_ui_util_Size(cx,cy);
		return size;
	}
	,get_usableSize: function() {
		var size = haxe_ui_layouts_VerticalLayout.prototype.get_usableSize.call(this);
		this._size.component = this.get_component();
		size.width -= this._size.get_usableWidthModifier();
		size.height -= this._size.get_usableHeightModifier();
		return size;
	}
	,__class__: haxe_ui_layouts_DelegateLayout
});
var haxe_ui_macros_BackendMacros = function() { };
$hxClasses["haxe.ui.macros.BackendMacros"] = haxe_ui_macros_BackendMacros;
haxe_ui_macros_BackendMacros.__name__ = ["haxe","ui","macros","BackendMacros"];
var haxe_ui_macros_ComponentMacros = function() { };
$hxClasses["haxe.ui.macros.ComponentMacros"] = haxe_ui_macros_ComponentMacros;
haxe_ui_macros_ComponentMacros.__name__ = ["haxe","ui","macros","ComponentMacros"];
var haxe_ui_macros_ModuleMacros = function() { };
$hxClasses["haxe.ui.macros.ModuleMacros"] = haxe_ui_macros_ModuleMacros;
haxe_ui_macros_ModuleMacros.__name__ = ["haxe","ui","macros","ModuleMacros"];
var haxe_ui_macros_NativeMacros = function() { };
$hxClasses["haxe.ui.macros.NativeMacros"] = haxe_ui_macros_NativeMacros;
haxe_ui_macros_NativeMacros.__name__ = ["haxe","ui","macros","NativeMacros"];
var haxe_ui_parsers_config_ConfigParser = function() {
};
$hxClasses["haxe.ui.parsers.config.ConfigParser"] = haxe_ui_parsers_config_ConfigParser;
haxe_ui_parsers_config_ConfigParser.__name__ = ["haxe","ui","parsers","config","ConfigParser"];
haxe_ui_parsers_config_ConfigParser.get = function(extension) {
	haxe_ui_parsers_config_ConfigParser.defaultParsers();
	var cls = haxe_ui_parsers_config_ConfigParser._parsers.get(extension);
	if(cls == null) return null;
	var instance = Type.createInstance(cls,[]);
	if(instance == null) throw new js__$Boot_HaxeError("Could not create config parser instance \"" + Std.string(cls) + "\"");
	return instance;
};
haxe_ui_parsers_config_ConfigParser.defaultParsers = function() {
	if(haxe_ui_parsers_config_ConfigParser._parsers == null) haxe_ui_parsers_config_ConfigParser.register("xml",haxe_ui_parsers_config_XMLParser);
};
haxe_ui_parsers_config_ConfigParser.register = function(extension,cls) {
	if(haxe_ui_parsers_config_ConfigParser._parsers == null) haxe_ui_parsers_config_ConfigParser._parsers = new haxe_ds_StringMap();
	haxe_ui_parsers_config_ConfigParser._parsers.set(extension,cls);
};
haxe_ui_parsers_config_ConfigParser.prototype = {
	parse: function(data) {
		throw new js__$Boot_HaxeError("Config parser not implemented!");
	}
	,__class__: haxe_ui_parsers_config_ConfigParser
};
var haxe_ui_parsers_config_XMLParser = function() {
	haxe_ui_parsers_config_ConfigParser.call(this);
};
$hxClasses["haxe.ui.parsers.config.XMLParser"] = haxe_ui_parsers_config_XMLParser;
haxe_ui_parsers_config_XMLParser.__name__ = ["haxe","ui","parsers","config","XMLParser"];
haxe_ui_parsers_config_XMLParser.__super__ = haxe_ui_parsers_config_ConfigParser;
haxe_ui_parsers_config_XMLParser.prototype = $extend(haxe_ui_parsers_config_ConfigParser.prototype,{
	parse: function(data) {
		var config = new haxe_ui_util_GenericConfig();
		var xml = Xml.parse(data).firstElement();
		var $it0 = xml.elements();
		while( $it0.hasNext() ) {
			var el = $it0.next();
			this.parseAddionalConfig(el,config);
		}
		return config;
	}
	,parseAddionalConfig: function(node,parent) {
		var group = parent.addSection((function($this) {
			var $r;
			if(node.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + node.nodeType);
			$r = node.nodeName;
			return $r;
		}(this)));
		var $it0 = node.attributes();
		while( $it0.hasNext() ) {
			var attr = $it0.next();
			var value = node.get(attr);
			group.values.set(attr,value);
		}
		var $it1 = node.elements();
		while( $it1.hasNext() ) {
			var el = $it1.next();
			this.parseAddionalConfig(el,group);
		}
	}
	,__class__: haxe_ui_parsers_config_XMLParser
});
var haxe_ui_parsers_modules_ModuleParser = function() {
};
$hxClasses["haxe.ui.parsers.modules.ModuleParser"] = haxe_ui_parsers_modules_ModuleParser;
haxe_ui_parsers_modules_ModuleParser.__name__ = ["haxe","ui","parsers","modules","ModuleParser"];
haxe_ui_parsers_modules_ModuleParser.get = function(extension) {
	haxe_ui_parsers_modules_ModuleParser.defaultParsers();
	var cls = haxe_ui_parsers_modules_ModuleParser._parsers.get(extension);
	if(cls == null) return null;
	var instance = Type.createInstance(cls,[]);
	if(instance == null) throw new js__$Boot_HaxeError("Could not create module parser instance \"" + Std.string(cls) + "\"");
	return instance;
};
haxe_ui_parsers_modules_ModuleParser.defaultParsers = function() {
	if(haxe_ui_parsers_modules_ModuleParser._parsers == null) {
		haxe_ui_parsers_modules_ModuleParser.register("xml",haxe_ui_parsers_modules_XMLParser);
		haxe_ui_parsers_modules_ModuleParser.register("json",haxe_ui_parsers_modules_JSONParser);
	}
};
haxe_ui_parsers_modules_ModuleParser.register = function(extension,cls) {
	if(haxe_ui_parsers_modules_ModuleParser._parsers == null) haxe_ui_parsers_modules_ModuleParser._parsers = new haxe_ds_StringMap();
	haxe_ui_parsers_modules_ModuleParser._parsers.set(extension,cls);
};
haxe_ui_parsers_modules_ModuleParser.prototype = {
	parse: function(data) {
		throw new js__$Boot_HaxeError("Module parser not implemented!");
	}
	,__class__: haxe_ui_parsers_modules_ModuleParser
};
var haxe_ui_parsers_modules_ObjectParser = function() {
	haxe_ui_parsers_modules_ModuleParser.call(this);
};
$hxClasses["haxe.ui.parsers.modules.ObjectParser"] = haxe_ui_parsers_modules_ObjectParser;
haxe_ui_parsers_modules_ObjectParser.__name__ = ["haxe","ui","parsers","modules","ObjectParser"];
haxe_ui_parsers_modules_ObjectParser.__super__ = haxe_ui_parsers_modules_ModuleParser;
haxe_ui_parsers_modules_ObjectParser.prototype = $extend(haxe_ui_parsers_modules_ModuleParser.prototype,{
	fromObject: function(obj) {
		var module = new haxe_ui_parsers_modules_Module();
		module.id = obj.id;
		if(obj.resources != null) {
			var resources = obj.resources;
			var _g = 0;
			while(_g < resources.length) {
				var r = resources[_g];
				++_g;
				var resourceEntry = new haxe_ui_parsers_modules_ModuleResourceEntry();
				resourceEntry.path = r.path;
				resourceEntry.prefix = r.prefix;
				module.resourceEntries.push(resourceEntry);
			}
		}
		if(obj.components != null) {
			var components = obj.components;
			var _g1 = 0;
			while(_g1 < components.length) {
				var c = components[_g1];
				++_g1;
				var classEntry = new haxe_ui_parsers_modules_ModuleComponentEntry();
				classEntry.classPackage = Reflect.field(c,"package");
				classEntry.className = Reflect.field(c,"name");
				classEntry.classAlias = Reflect.field(c,"alias");
				module.componentEntries.push(classEntry);
			}
		}
		if(obj.themes != null) {
			var themes = obj.themes;
			var _g2 = 0;
			var _g11 = Reflect.fields(themes);
			while(_g2 < _g11.length) {
				var themeId = _g11[_g2];
				++_g2;
				var t = Reflect.field(themes,themeId);
				var theme = new haxe_ui_parsers_modules_ModuleThemeEntry();
				theme.name = themeId;
				theme.parent = t.parent;
				if(t.styles != null) {
					var styles = t.styles;
					var _g21 = 0;
					while(_g21 < styles.length) {
						var s = styles[_g21];
						++_g21;
						var styleResource = s.resource;
						theme.styles.push(styleResource);
					}
				}
				module.themeEntries.set(theme.name,theme);
			}
		}
		return module;
	}
	,__class__: haxe_ui_parsers_modules_ObjectParser
});
var haxe_ui_parsers_modules_JSONParser = function() {
	haxe_ui_parsers_modules_ObjectParser.call(this);
};
$hxClasses["haxe.ui.parsers.modules.JSONParser"] = haxe_ui_parsers_modules_JSONParser;
haxe_ui_parsers_modules_JSONParser.__name__ = ["haxe","ui","parsers","modules","JSONParser"];
haxe_ui_parsers_modules_JSONParser.__super__ = haxe_ui_parsers_modules_ObjectParser;
haxe_ui_parsers_modules_JSONParser.prototype = $extend(haxe_ui_parsers_modules_ObjectParser.prototype,{
	parse: function(data) {
		return this.fromObject(JSON.parse(data));
	}
	,__class__: haxe_ui_parsers_modules_JSONParser
});
var haxe_ui_parsers_modules_Module = function() {
	this.animations = [];
	this.properties = [];
	this.plugins = [];
	this.themeEntries = new haxe_ds_StringMap();
	this.scriptletEntries = [];
	this.componentEntries = [];
	this.resourceEntries = [];
};
$hxClasses["haxe.ui.parsers.modules.Module"] = haxe_ui_parsers_modules_Module;
haxe_ui_parsers_modules_Module.__name__ = ["haxe","ui","parsers","modules","Module"];
haxe_ui_parsers_modules_Module.prototype = {
	id: null
	,resourceEntries: null
	,componentEntries: null
	,scriptletEntries: null
	,themeEntries: null
	,plugins: null
	,properties: null
	,animations: null
	,validate: function() {
	}
	,toString: function() {
		var s = "";
		s += "id: " + this.id + "\n";
		s += "resources:\n";
		var _g = 0;
		var _g1 = this.resourceEntries;
		while(_g < _g1.length) {
			var resourceEntry = _g1[_g];
			++_g;
			s += "  path: " + resourceEntry.path + ", prefix: " + resourceEntry.prefix + "\n";
		}
		s += "components:\n";
		var _g2 = 0;
		var _g11 = this.componentEntries;
		while(_g2 < _g11.length) {
			var componentEntry = _g11[_g2];
			++_g2;
			if(componentEntry.classPackage != null) s += "  package: " + componentEntry.classPackage + "\n";
			if(componentEntry.className != null) {
				s += "  class: " + componentEntry.className;
				if(componentEntry.classAlias != null) s += ", alias: " + componentEntry.classAlias;
				s += "\n";
			}
		}
		s += "themes:\n";
		var $it0 = this.themeEntries.keys();
		while( $it0.hasNext() ) {
			var themeId = $it0.next();
			var themeEntry = this.themeEntries.get(themeId);
			s += "  " + themeId + ":\n";
			if(themeEntry.parent != null) s += "    parent: " + themeEntry.parent + "\n";
			s += "    styles:\n";
			var _g3 = 0;
			var _g12 = themeEntry.styles;
			while(_g3 < _g12.length) {
				var styleEntry = _g12[_g3];
				++_g3;
				s += "      * " + styleEntry + "\n";
			}
		}
		return s;
	}
	,__class__: haxe_ui_parsers_modules_Module
};
var haxe_ui_parsers_modules_ModuleResourceEntry = function() {
};
$hxClasses["haxe.ui.parsers.modules.ModuleResourceEntry"] = haxe_ui_parsers_modules_ModuleResourceEntry;
haxe_ui_parsers_modules_ModuleResourceEntry.__name__ = ["haxe","ui","parsers","modules","ModuleResourceEntry"];
haxe_ui_parsers_modules_ModuleResourceEntry.prototype = {
	path: null
	,prefix: null
	,condition: null
	,__class__: haxe_ui_parsers_modules_ModuleResourceEntry
};
var haxe_ui_parsers_modules_ModuleComponentEntry = function() {
};
$hxClasses["haxe.ui.parsers.modules.ModuleComponentEntry"] = haxe_ui_parsers_modules_ModuleComponentEntry;
haxe_ui_parsers_modules_ModuleComponentEntry.__name__ = ["haxe","ui","parsers","modules","ModuleComponentEntry"];
haxe_ui_parsers_modules_ModuleComponentEntry.prototype = {
	classPackage: null
	,className: null
	,classAlias: null
	,__class__: haxe_ui_parsers_modules_ModuleComponentEntry
};
var haxe_ui_parsers_modules_ModuleScriptletEntry = function() {
};
$hxClasses["haxe.ui.parsers.modules.ModuleScriptletEntry"] = haxe_ui_parsers_modules_ModuleScriptletEntry;
haxe_ui_parsers_modules_ModuleScriptletEntry.__name__ = ["haxe","ui","parsers","modules","ModuleScriptletEntry"];
haxe_ui_parsers_modules_ModuleScriptletEntry.prototype = {
	classPackage: null
	,className: null
	,classAlias: null
	,keep: null
	,staticClass: null
	,__class__: haxe_ui_parsers_modules_ModuleScriptletEntry
};
var haxe_ui_parsers_modules_ModuleThemeEntry = function() {
	this.styles = [];
};
$hxClasses["haxe.ui.parsers.modules.ModuleThemeEntry"] = haxe_ui_parsers_modules_ModuleThemeEntry;
haxe_ui_parsers_modules_ModuleThemeEntry.__name__ = ["haxe","ui","parsers","modules","ModuleThemeEntry"];
haxe_ui_parsers_modules_ModuleThemeEntry.prototype = {
	name: null
	,parent: null
	,styles: null
	,__class__: haxe_ui_parsers_modules_ModuleThemeEntry
};
var haxe_ui_parsers_modules_ModulePluginEntry = function() {
	this.config = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.parsers.modules.ModulePluginEntry"] = haxe_ui_parsers_modules_ModulePluginEntry;
haxe_ui_parsers_modules_ModulePluginEntry.__name__ = ["haxe","ui","parsers","modules","ModulePluginEntry"];
haxe_ui_parsers_modules_ModulePluginEntry.prototype = {
	type: null
	,className: null
	,config: null
	,condition: null
	,__class__: haxe_ui_parsers_modules_ModulePluginEntry
};
var haxe_ui_parsers_modules_ModulePropertyEntry = function() {
};
$hxClasses["haxe.ui.parsers.modules.ModulePropertyEntry"] = haxe_ui_parsers_modules_ModulePropertyEntry;
haxe_ui_parsers_modules_ModulePropertyEntry.__name__ = ["haxe","ui","parsers","modules","ModulePropertyEntry"];
haxe_ui_parsers_modules_ModulePropertyEntry.prototype = {
	name: null
	,value: null
	,__class__: haxe_ui_parsers_modules_ModulePropertyEntry
};
var haxe_ui_parsers_modules_ModuleAnimationEntry = function() {
	this.keyFrames = [];
};
$hxClasses["haxe.ui.parsers.modules.ModuleAnimationEntry"] = haxe_ui_parsers_modules_ModuleAnimationEntry;
haxe_ui_parsers_modules_ModuleAnimationEntry.__name__ = ["haxe","ui","parsers","modules","ModuleAnimationEntry"];
haxe_ui_parsers_modules_ModuleAnimationEntry.prototype = {
	id: null
	,ease: null
	,keyFrames: null
	,__class__: haxe_ui_parsers_modules_ModuleAnimationEntry
};
var haxe_ui_parsers_modules_ModuleAnimationKeyFrameEntry = function() {
	this.componentRefs = new haxe_ds_StringMap();
	this.time = 0;
};
$hxClasses["haxe.ui.parsers.modules.ModuleAnimationKeyFrameEntry"] = haxe_ui_parsers_modules_ModuleAnimationKeyFrameEntry;
haxe_ui_parsers_modules_ModuleAnimationKeyFrameEntry.__name__ = ["haxe","ui","parsers","modules","ModuleAnimationKeyFrameEntry"];
haxe_ui_parsers_modules_ModuleAnimationKeyFrameEntry.prototype = {
	time: null
	,componentRefs: null
	,__class__: haxe_ui_parsers_modules_ModuleAnimationKeyFrameEntry
};
var haxe_ui_parsers_modules_ModuleAnimationComponentRefEntry = function() {
	this.vars = new haxe_ds_StringMap();
	this.properties = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.parsers.modules.ModuleAnimationComponentRefEntry"] = haxe_ui_parsers_modules_ModuleAnimationComponentRefEntry;
haxe_ui_parsers_modules_ModuleAnimationComponentRefEntry.__name__ = ["haxe","ui","parsers","modules","ModuleAnimationComponentRefEntry"];
haxe_ui_parsers_modules_ModuleAnimationComponentRefEntry.prototype = {
	id: null
	,properties: null
	,vars: null
	,__class__: haxe_ui_parsers_modules_ModuleAnimationComponentRefEntry
};
var haxe_ui_parsers_modules_XMLParser = function() {
	haxe_ui_parsers_modules_ModuleParser.call(this);
};
$hxClasses["haxe.ui.parsers.modules.XMLParser"] = haxe_ui_parsers_modules_XMLParser;
haxe_ui_parsers_modules_XMLParser.__name__ = ["haxe","ui","parsers","modules","XMLParser"];
haxe_ui_parsers_modules_XMLParser.__super__ = haxe_ui_parsers_modules_ModuleParser;
haxe_ui_parsers_modules_XMLParser.prototype = $extend(haxe_ui_parsers_modules_ModuleParser.prototype,{
	parse: function(data) {
		var module = new haxe_ui_parsers_modules_Module();
		var xml = Xml.parse(data).firstElement();
		module.id = xml.get("id");
		var $it0 = xml.elements();
		while( $it0.hasNext() ) {
			var el = $it0.next();
			var nodeName;
			if(el.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + el.nodeType);
			nodeName = el.nodeName;
			if(nodeName == "resources") {
				var $it1 = el.elementsNamed("resource");
				while( $it1.hasNext() ) {
					var resourceNode = $it1.next();
					var resourceEntry = new haxe_ui_parsers_modules_ModuleResourceEntry();
					resourceEntry.path = resourceNode.get("path");
					resourceEntry.prefix = resourceNode.get("prefix");
					resourceEntry.condition = this.buildCondition(el,resourceNode);
					module.resourceEntries.push(resourceEntry);
				}
			} else if(nodeName == "components") {
				var $it2 = el.elementsNamed("class");
				while( $it2.hasNext() ) {
					var classNode = $it2.next();
					var classEntry = new haxe_ui_parsers_modules_ModuleComponentEntry();
					classEntry.classPackage = classNode.get("package");
					classEntry.className = classNode.get("name");
					classEntry.classAlias = classNode.get("alias");
					module.componentEntries.push(classEntry);
				}
			} else if(nodeName == "scriptlets") {
				var $it3 = el.elementsNamed("import");
				while( $it3.hasNext() ) {
					var classNode1 = $it3.next();
					var scriptletEntry = new haxe_ui_parsers_modules_ModuleScriptletEntry();
					scriptletEntry.classPackage = classNode1.get("package");
					scriptletEntry.className = classNode1.get("class");
					scriptletEntry.classAlias = classNode1.get("alias");
					scriptletEntry.keep = classNode1.get("keep") == "true";
					scriptletEntry.staticClass = classNode1.get("static") == "true";
					module.scriptletEntries.push(scriptletEntry);
				}
			} else if(nodeName == "themes") {
				var $it4 = el.elements();
				while( $it4.hasNext() ) {
					var themeNode = $it4.next();
					var theme = new haxe_ui_parsers_modules_ModuleThemeEntry();
					if(themeNode.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + themeNode.nodeType);
					theme.name = themeNode.nodeName;
					theme.parent = themeNode.get("parent");
					var $it5 = themeNode.elementsNamed("style");
					while( $it5.hasNext() ) {
						var styleNodes = $it5.next();
						var styleResource = styleNodes.get("resource");
						theme.styles.push(styleResource);
					}
					module.themeEntries.set(theme.name,theme);
				}
			} else if(nodeName == "plugins") {
				var $it6 = el.elementsNamed("plugin");
				while( $it6.hasNext() ) {
					var pluginNode = $it6.next();
					var plugin = new haxe_ui_parsers_modules_ModulePluginEntry();
					var $it7 = pluginNode.attributes();
					while( $it7.hasNext() ) {
						var attr = $it7.next();
						var value = pluginNode.get(attr);
						switch(attr) {
						case "type":
							plugin.type = value;
							break;
						case "class":
							plugin.className = value;
							break;
						default:
							plugin.config.set(attr,value);
						}
					}
					plugin.condition = this.buildCondition(el,pluginNode);
					module.plugins.push(plugin);
				}
			} else if(nodeName == "properties") {
				var $it8 = el.elementsNamed("property");
				while( $it8.hasNext() ) {
					var propertyNode = $it8.next();
					var property = new haxe_ui_parsers_modules_ModulePropertyEntry();
					property.name = propertyNode.get("name");
					property.value = propertyNode.get("value");
					module.properties.push(property);
				}
			} else if(nodeName == "animations") {
				var $it9 = el.elementsNamed("animation");
				while( $it9.hasNext() ) {
					var animationNode = $it9.next();
					var animation = new haxe_ui_parsers_modules_ModuleAnimationEntry();
					animation.id = animationNode.get("id");
					animation.ease = animationNode.get("ease");
					var $it10 = animationNode.elementsNamed("keyframe");
					while( $it10.hasNext() ) {
						var keyFrameNode = $it10.next();
						var keyFrame = new haxe_ui_parsers_modules_ModuleAnimationKeyFrameEntry();
						if(keyFrameNode.get("time") != null) keyFrame.time = Std.parseInt(keyFrameNode.get("time"));
						var $it11 = keyFrameNode.elements();
						while( $it11.hasNext() ) {
							var componentRefNode = $it11.next();
							var componentRef = new haxe_ui_parsers_modules_ModuleAnimationComponentRefEntry();
							if(componentRefNode.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + componentRefNode.nodeType);
							componentRef.id = componentRefNode.nodeName;
							var $it12 = componentRefNode.attributes();
							while( $it12.hasNext() ) {
								var attrName = $it12.next();
								var attrValue = componentRefNode.get(attrName);
								if(StringTools.startsWith(attrValue,"{") && StringTools.endsWith(attrValue,"}")) {
									attrValue = attrValue.substring(1,attrValue.length - 1);
									componentRef.vars.set(attrName,attrValue);
								} else {
									var value1 = parseFloat(attrValue);
									componentRef.properties.set(attrName,value1);
								}
							}
							keyFrame.componentRefs.set(componentRef.id,componentRef);
						}
						animation.keyFrames.push(keyFrame);
					}
					module.animations.push(animation);
				}
			}
		}
		return module;
	}
	,buildCondition: function(parentNode,node) {
		var condition = parentNode.get("condition");
		if(parentNode.get("if") != null) condition = "" + parentNode.get("if");
		if(node.get("condition") != null) condition = node.get("condition");
		if(node.get("if") != null) condition = "" + node.get("if");
		return condition;
	}
	,__class__: haxe_ui_parsers_modules_XMLParser
});
var haxe_ui_parsers_ui_ComponentInfo = function() {
	this.styles = [];
	this.scriptlets = [];
	this.bindings = [];
	this.children = [];
	this.properties = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.parsers.ui.ComponentInfo"] = haxe_ui_parsers_ui_ComponentInfo;
haxe_ui_parsers_ui_ComponentInfo.__name__ = ["haxe","ui","parsers","ui","ComponentInfo"];
haxe_ui_parsers_ui_ComponentInfo.printInfo = function(c,indent) {
	if(indent == null) indent = 0;
	var s = "";
	var i = "";
	var _g = 0;
	while(_g < indent) {
		var x = _g++;
		i += "  ";
	}
	s += i + ("" + c.type + ":\n");
	if(c.id != null) s += i + ("  id: " + c.id + "\n");
	if(c.left != null) s += i + ("  left: " + c.left + "\n");
	if(c.top != null) s += i + ("  top: " + c.top + "\n");
	if(c.width != null) s += i + ("  width: " + c.width + "\n");
	if(c.height != null) s += i + ("  height: " + c.height + "\n");
	if(c.percentWidth != null) s += i + ("  percentWidth: " + c.percentWidth + "\n");
	if(c.percentHeight != null) s += i + ("  percentHeight: " + c.percentHeight + "\n");
	if(c.text != null) s += i + ("  text: " + c.text + "\n");
	if(c.style != null) s += i + ("  style: " + c.style + "\n");
	if(c.styleNames != null) s += i + ("  styleNames: " + c.styleNames + "\n");
	var $it0 = c.properties.keys();
	while( $it0.hasNext() ) {
		var propName = $it0.next();
		var propValue = c.properties.get(propName);
		s += i + ("  " + propName + ": " + propValue + "\n");
	}
	if(c.styles.length > 0) s += i + ("  styles count: " + c.styles.length + "\n");
	if(c.scriptlets.length > 0) s += i + ("  scriptlets count: " + c.scriptlets.length + "\n");
	if(c.bindings.length > 0) {
		s += i + "  bindings:\n";
		var _g1 = 0;
		var _g11 = c.bindings;
		while(_g1 < _g11.length) {
			var b = _g11[_g1];
			++_g1;
			s += i + ("    source: " + b.source + ", target: " + b.target + ", transform: " + b.transform + "\n");
		}
	}
	if(c.children.length > 0) {
		s += i + "  children:\n";
		var _g2 = 0;
		var _g12 = c.children;
		while(_g2 < _g12.length) {
			var child = _g12[_g2];
			++_g2;
			s += haxe_ui_parsers_ui_ComponentInfo.printInfo(child,indent + 2);
		}
	}
	return s;
};
haxe_ui_parsers_ui_ComponentInfo.prototype = {
	type: null
	,id: null
	,left: null
	,top: null
	,width: null
	,height: null
	,percentWidth: null
	,percentHeight: null
	,text: null
	,style: null
	,styleNames: null
	,composite: null
	,properties: null
	,parent: null
	,children: null
	,bindings: null
	,scriptlets: null
	,styles: null
	,get_styleString: function() {
		if(this.style == null) return null;
		return StringTools.replace(this.style,"\"","'");
	}
	,findRootComponent: function() {
		var r = this;
		while(r.parent != null) r = r.parent;
		return r;
	}
	,toString: function() {
		var s = "";
		s = haxe_ui_parsers_ui_ComponentInfo.printInfo(this);
		return s;
	}
	,validate: function() {
	}
	,__class__: haxe_ui_parsers_ui_ComponentInfo
	,__properties__: {get_styleString:"get_styleString"}
};
var haxe_ui_parsers_ui_ComponentBindingInfo = function() {
};
$hxClasses["haxe.ui.parsers.ui.ComponentBindingInfo"] = haxe_ui_parsers_ui_ComponentBindingInfo;
haxe_ui_parsers_ui_ComponentBindingInfo.__name__ = ["haxe","ui","parsers","ui","ComponentBindingInfo"];
haxe_ui_parsers_ui_ComponentBindingInfo.prototype = {
	source: null
	,target: null
	,transform: null
	,__class__: haxe_ui_parsers_ui_ComponentBindingInfo
};
var haxe_ui_parsers_ui_ComponentParser = function() {
};
$hxClasses["haxe.ui.parsers.ui.ComponentParser"] = haxe_ui_parsers_ui_ComponentParser;
haxe_ui_parsers_ui_ComponentParser.__name__ = ["haxe","ui","parsers","ui","ComponentParser"];
haxe_ui_parsers_ui_ComponentParser.get = function(extension) {
	haxe_ui_parsers_ui_ComponentParser.defaultParsers();
	var cls = haxe_ui_parsers_ui_ComponentParser._parsers.get(extension);
	if(cls == null) throw new js__$Boot_HaxeError("No component parser found for \"" + extension + "\"");
	var instance = Type.createInstance(cls,[]);
	if(instance == null) throw new js__$Boot_HaxeError("Could not create component parser instance \"" + Std.string(cls) + "\"");
	return instance;
};
haxe_ui_parsers_ui_ComponentParser.defaultParsers = function() {
	if(haxe_ui_parsers_ui_ComponentParser._parsers == null) {
		haxe_ui_parsers_ui_ComponentParser.register("xml",haxe_ui_parsers_ui_XMLParser);
		haxe_ui_parsers_ui_ComponentParser.register("json",haxe_ui_parsers_ui_JSONParser);
	}
};
haxe_ui_parsers_ui_ComponentParser.register = function(extension,cls) {
	if(haxe_ui_parsers_ui_ComponentParser._parsers == null) haxe_ui_parsers_ui_ComponentParser._parsers = new haxe_ds_StringMap();
	haxe_ui_parsers_ui_ComponentParser._parsers.set(extension,cls);
};
haxe_ui_parsers_ui_ComponentParser.nextId = function(prefix) {
	if(prefix == null) prefix = "component";
	var s = prefix + haxe_ui_parsers_ui_ComponentParser._nextId;
	haxe_ui_parsers_ui_ComponentParser._nextId++;
	return s;
};
haxe_ui_parsers_ui_ComponentParser["float"] = function(value) {
	return parseFloat(value);
};
haxe_ui_parsers_ui_ComponentParser.isPercentage = function(value) {
	if(value.indexOf("%") == value.length - 1) return true;
	return false;
};
haxe_ui_parsers_ui_ComponentParser.prototype = {
	_resourceResolver: null
	,parse: function(data,resourceResolver) {
		throw new js__$Boot_HaxeError("Component parser not implemented!");
	}
	,__class__: haxe_ui_parsers_ui_ComponentParser
};
var haxe_ui_parsers_ui_ObjectParser = function() {
	haxe_ui_parsers_ui_ComponentParser.call(this);
};
$hxClasses["haxe.ui.parsers.ui.ObjectParser"] = haxe_ui_parsers_ui_ObjectParser;
haxe_ui_parsers_ui_ObjectParser.__name__ = ["haxe","ui","parsers","ui","ObjectParser"];
haxe_ui_parsers_ui_ObjectParser.parseComponent = function(component,obj,resourceResolver) {
	var type = Reflect.fields(obj)[0];
	component.type = type;
	var details = Reflect.field(obj,type);
	if(type == "import") {
		haxe_ui_parsers_ui_ObjectParser.parseImport(component.parent,details,resourceResolver);
		return;
	}
	var _g = 0;
	var _g1 = Reflect.fields(details);
	while(_g < _g1.length) {
		var propName = _g1[_g];
		++_g;
		var propValue = Reflect.field(details,propName);
		switch(propName) {
		case "id":
			component.id = propValue;
			break;
		case "left":
			component.left = haxe_ui_parsers_ui_ComponentParser["float"](propValue);
			break;
		case "top":
			component.top = haxe_ui_parsers_ui_ComponentParser["float"](propValue);
			break;
		case "width":
			if(haxe_ui_parsers_ui_ComponentParser.isPercentage("" + propValue) == true) component.percentWidth = haxe_ui_parsers_ui_ComponentParser["float"]("" + propValue); else component.width = haxe_ui_parsers_ui_ComponentParser["float"]("" + propValue);
			break;
		case "height":
			if(haxe_ui_parsers_ui_ComponentParser.isPercentage("" + propValue) == true) component.percentHeight = haxe_ui_parsers_ui_ComponentParser["float"]("" + propValue); else component.height = haxe_ui_parsers_ui_ComponentParser["float"]("" + propValue);
			break;
		case "text":
			component.text = propValue;
			break;
		case "style":
			component.style = propValue;
			break;
		case "styleNames":
			component.styleNames = propValue;
			break;
		case "bindTo":case "bindTransform":
			break;
		case "children":
			var children = Reflect.field(details,"children");
			var _g2 = 0;
			while(_g2 < children.length) {
				var childObj = children[_g2];
				++_g2;
				var child = new haxe_ui_parsers_ui_ComponentInfo();
				child.parent = component;
				haxe_ui_parsers_ui_ObjectParser.parseComponent(child,childObj,resourceResolver);
				if(child.type != "import") component.children.push(child);
			}
			break;
		default:
			component.properties.set(propName,propValue);
		}
	}
	var bindTo = Reflect.field(details,"bindTo");
	if(bindTo != null) {
		if(component.id == null) component.id = haxe_ui_parsers_ui_ComponentParser.nextId();
		var binding = new haxe_ui_parsers_ui_ComponentBindingInfo();
		binding.source = bindTo;
		binding.target = component.id;
		binding.transform = Reflect.field(details,"bindTransform");
		component.findRootComponent().bindings.push(binding);
	}
};
haxe_ui_parsers_ui_ObjectParser.parseImport = function(component,obj,resourceResolver) {
	if(obj.source != null) {
		var source = obj.source;
		var sourceData = resourceResolver.getResourceData(source);
		if(sourceData != null) {
			var extension = resourceResolver.extension(source);
			var c = haxe_ui_parsers_ui_ComponentParser.get(extension).parse(sourceData,resourceResolver);
			component.findRootComponent().styles = component.findRootComponent().styles.concat(c.styles);
			c.styles = [];
			component.findRootComponent().scriptlets = component.findRootComponent().scriptlets.concat(c.scriptlets);
			c.scriptlets = [];
			component.findRootComponent().bindings = component.findRootComponent().bindings.concat(c.bindings);
			c.bindings = [];
			c.parent = component;
			component.children.push(c);
		}
	}
};
haxe_ui_parsers_ui_ObjectParser.__super__ = haxe_ui_parsers_ui_ComponentParser;
haxe_ui_parsers_ui_ObjectParser.prototype = $extend(haxe_ui_parsers_ui_ComponentParser.prototype,{
	fromObject: function(obj,resourceResolver) {
		var component = new haxe_ui_parsers_ui_ComponentInfo();
		haxe_ui_parsers_ui_ObjectParser.parseComponent(component,obj,resourceResolver);
		return component;
	}
	,__class__: haxe_ui_parsers_ui_ObjectParser
});
var haxe_ui_parsers_ui_JSONParser = function() {
	haxe_ui_parsers_ui_ObjectParser.call(this);
};
$hxClasses["haxe.ui.parsers.ui.JSONParser"] = haxe_ui_parsers_ui_JSONParser;
haxe_ui_parsers_ui_JSONParser.__name__ = ["haxe","ui","parsers","ui","JSONParser"];
haxe_ui_parsers_ui_JSONParser.__super__ = haxe_ui_parsers_ui_ObjectParser;
haxe_ui_parsers_ui_JSONParser.prototype = $extend(haxe_ui_parsers_ui_ObjectParser.prototype,{
	__class__: haxe_ui_parsers_ui_JSONParser
});
var haxe_ui_parsers_ui_XMLParser = function() {
	haxe_ui_parsers_ui_ComponentParser.call(this);
};
$hxClasses["haxe.ui.parsers.ui.XMLParser"] = haxe_ui_parsers_ui_XMLParser;
haxe_ui_parsers_ui_XMLParser.__name__ = ["haxe","ui","parsers","ui","XMLParser"];
haxe_ui_parsers_ui_XMLParser.parseComponent = function(component,xml,resourceResolver) {
	var isComponent = true;
	var nodeName;
	if(xml.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + xml.nodeType);
	nodeName = xml.nodeName;
	if(nodeName == "import") {
		haxe_ui_parsers_ui_XMLParser.parseImportNode(component.parent,xml,resourceResolver);
		isComponent = false;
	} else if(nodeName == "script") {
		haxe_ui_parsers_ui_XMLParser.parseScriptNode(component,xml,resourceResolver);
		isComponent = false;
	} else if(nodeName == "style") {
		haxe_ui_parsers_ui_XMLParser.parseStyleNode(component,xml,resourceResolver);
		isComponent = false;
	} else if(nodeName == "bind") {
		haxe_ui_parsers_ui_XMLParser.parseBindNode(component,xml);
		isComponent = false;
	} else {
		haxe_ui_parsers_ui_XMLParser.parseDetails(component,xml);
		haxe_ui_parsers_ui_XMLParser.parseAttributes(component,xml);
		var $it0 = xml.elements();
		while( $it0.hasNext() ) {
			var childXml = $it0.next();
			var child = new haxe_ui_parsers_ui_ComponentInfo();
			child.parent = component;
			if(haxe_ui_parsers_ui_XMLParser.parseComponent(child,childXml,resourceResolver) == true) component.children.push(child);
		}
	}
	return isComponent;
};
haxe_ui_parsers_ui_XMLParser.parseImportNode = function(component,xml,resourceResolver) {
	if(xml.get("source") != null) {
		var source = xml.get("source");
		var sourceData = resourceResolver.getResourceData(source);
		if(sourceData != null) {
			var extension = resourceResolver.extension(source);
			var c = haxe_ui_parsers_ui_ComponentParser.get(extension).parse(sourceData,resourceResolver);
			component.findRootComponent().styles = component.findRootComponent().styles.concat(c.styles);
			c.styles = [];
			component.findRootComponent().scriptlets = component.findRootComponent().scriptlets.concat(c.scriptlets);
			c.scriptlets = [];
			component.findRootComponent().bindings = component.findRootComponent().bindings.concat(c.bindings);
			c.bindings = [];
			c.parent = component;
			component.children.push(c);
		}
	}
};
haxe_ui_parsers_ui_XMLParser.parseScriptNode = function(component,xml,resourceResolver) {
	var scriptText = null;
	if((function($this) {
		var $r;
		if(xml.nodeType != Xml.Document && xml.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + xml.nodeType);
		$r = xml.children[0];
		return $r;
	}(this)) != null) scriptText = ((function($this) {
		var $r;
		if(xml.nodeType != Xml.Document && xml.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + xml.nodeType);
		$r = xml.children[0];
		return $r;
	}(this))).get_nodeValue();
	if(xml.get("source") != null) {
		var source = xml.get("source");
		var sourceData = resourceResolver.getResourceData(source);
		if(sourceData != null) {
			if(scriptText == null) scriptText = "";
			scriptText += "\n" + sourceData;
		}
	}
	if(scriptText != null) {
		var scope = "global";
		if(scope == "global") component.findRootComponent().scriptlets.push(scriptText);
	}
};
haxe_ui_parsers_ui_XMLParser.parseStyleNode = function(component,xml,resourceResolver) {
	var styleText = null;
	if((function($this) {
		var $r;
		if(xml.nodeType != Xml.Document && xml.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + xml.nodeType);
		$r = xml.children[0];
		return $r;
	}(this)) != null) styleText = ((function($this) {
		var $r;
		if(xml.nodeType != Xml.Document && xml.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + xml.nodeType);
		$r = xml.children[0];
		return $r;
	}(this))).get_nodeValue();
	if(xml.get("source") != null) {
		var source = xml.get("source");
		var sourceData = resourceResolver.getResourceData(source);
		if(sourceData != null) {
			if(styleText == null) styleText = "";
			styleText += "\n" + sourceData;
		}
	}
	if(styleText != null) {
		var scope = "global";
		if(scope == "global") component.findRootComponent().styles.push(styleText);
	}
};
haxe_ui_parsers_ui_XMLParser.parseBindNode = function(component,xml) {
	var binding = new haxe_ui_parsers_ui_ComponentBindingInfo();
	binding.source = xml.get("source");
	binding.target = xml.get("target");
	binding.transform = xml.get("transform");
	component.findRootComponent().bindings.push(binding);
};
haxe_ui_parsers_ui_XMLParser.parseDetails = function(component,xml) {
	if(xml.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + xml.nodeType);
	component.type = xml.nodeName;
};
haxe_ui_parsers_ui_XMLParser.parseAttributes = function(component,xml) {
	var $it0 = xml.attributes();
	while( $it0.hasNext() ) {
		var attrName = $it0.next();
		var attrValue = xml.get(attrName);
		switch(attrName) {
		case "id":
			component.id = attrValue;
			break;
		case "left":
			component.left = haxe_ui_parsers_ui_ComponentParser["float"](attrValue);
			break;
		case "top":
			component.top = haxe_ui_parsers_ui_ComponentParser["float"](attrValue);
			break;
		case "width":
			if(haxe_ui_parsers_ui_ComponentParser.isPercentage(attrValue) == true) component.percentWidth = haxe_ui_parsers_ui_ComponentParser["float"](attrValue); else component.width = haxe_ui_parsers_ui_ComponentParser["float"](attrValue);
			break;
		case "height":
			if(haxe_ui_parsers_ui_ComponentParser.isPercentage(attrValue) == true) component.percentHeight = haxe_ui_parsers_ui_ComponentParser["float"](attrValue); else component.height = haxe_ui_parsers_ui_ComponentParser["float"](attrValue);
			break;
		case "text":
			component.text = attrValue;
			break;
		case "style":
			component.style = attrValue;
			break;
		case "styleNames":
			component.styleNames = attrValue;
			break;
		case "composite":
			component.composite = attrValue == "true";
			break;
		case "bindTo":case "bindTransform":
			break;
		default:
			component.properties.set(attrName,attrValue);
		}
	}
	var bindTo = xml.get("bindTo");
	if(bindTo != null) {
		if(component.id == null) component.id = haxe_ui_parsers_ui_ComponentParser.nextId();
		var binding = new haxe_ui_parsers_ui_ComponentBindingInfo();
		binding.source = bindTo;
		binding.target = component.id;
		binding.transform = xml.get("bindTransform");
		component.findRootComponent().bindings.push(binding);
	}
};
haxe_ui_parsers_ui_XMLParser.__super__ = haxe_ui_parsers_ui_ComponentParser;
haxe_ui_parsers_ui_XMLParser.prototype = $extend(haxe_ui_parsers_ui_ComponentParser.prototype,{
	parse: function(data,resourceResolver) {
		this._resourceResolver = resourceResolver;
		var component = new haxe_ui_parsers_ui_ComponentInfo();
		var xml = Xml.parse(data).firstElement();
		haxe_ui_parsers_ui_XMLParser.parseComponent(component,xml,resourceResolver);
		return component;
	}
	,__class__: haxe_ui_parsers_ui_XMLParser
});
var haxe_ui_parsers_ui_resolvers_ResourceResolver = function() {
};
$hxClasses["haxe.ui.parsers.ui.resolvers.ResourceResolver"] = haxe_ui_parsers_ui_resolvers_ResourceResolver;
haxe_ui_parsers_ui_resolvers_ResourceResolver.__name__ = ["haxe","ui","parsers","ui","resolvers","ResourceResolver"];
haxe_ui_parsers_ui_resolvers_ResourceResolver.prototype = {
	getResourceData: function(r) {
		return null;
	}
	,extension: function(path) {
		if(path.indexOf(".") == -1) return null;
		var arr = path.split(".");
		var extension = arr[arr.length - 1];
		return extension;
	}
	,__class__: haxe_ui_parsers_ui_resolvers_ResourceResolver
};
var haxe_ui_parsers_ui_resolvers_FileResourceResolver = function(rootFile) {
	haxe_ui_parsers_ui_resolvers_ResourceResolver.call(this);
	this._rootFile = rootFile;
	var arr = this._rootFile.split("/");
	arr.pop();
	this._rootDir = arr.join("/");
	if(arr.length > 1) this._rootDir += "/";
};
$hxClasses["haxe.ui.parsers.ui.resolvers.FileResourceResolver"] = haxe_ui_parsers_ui_resolvers_FileResourceResolver;
haxe_ui_parsers_ui_resolvers_FileResourceResolver.__name__ = ["haxe","ui","parsers","ui","resolvers","FileResourceResolver"];
haxe_ui_parsers_ui_resolvers_FileResourceResolver.__super__ = haxe_ui_parsers_ui_resolvers_ResourceResolver;
haxe_ui_parsers_ui_resolvers_FileResourceResolver.prototype = $extend(haxe_ui_parsers_ui_resolvers_ResourceResolver.prototype,{
	_rootFile: null
	,_rootDir: null
	,__class__: haxe_ui_parsers_ui_resolvers_FileResourceResolver
});
var haxe_ui_remoting_client_Client = function() {
	this.connect();
};
$hxClasses["haxe.ui.remoting.client.Client"] = haxe_ui_remoting_client_Client;
haxe_ui_remoting_client_Client.__name__ = ["haxe","ui","remoting","client","Client"];
haxe_ui_remoting_client_Client.prototype = {
	_socket: null
	,connect: function(host,port) {
		if(port == null) port = 1234;
		if(host == null) host = "localhost";
		this._socket = new haxe_ui_remoting_client_ClientSocket();
		this._socket.onMessage = $bind(this,this.onMessage);
		this._socket.onError = $bind(this,this.onError);
		this._socket.connect(host,port);
	}
	,onMessage: function(msg) {
		var call = haxe_ui_remoting_client_calls_Call.create(msg.id);
		if(msg.id == "client.connected") return;
		if(msg.id == "client.disconnect") {
			this._socket.disconnect();
			return;
		}
		if(call == null) {
			haxe_Log.trace("WARNING: message unrecognised, id=" + msg.id,{ fileName : "Client.hx", lineNumber : 37, className : "haxe.ui.remoting.client.Client", methodName : "onMessage"});
			return;
		}
		var details = call.execute(msg.details);
		if(details != null) {
			var response = { id : msg.id, details : details};
			this._socket.sendMessage(response);
		}
	}
	,onError: function(error) {
		var _g = this;
		var timer = new haxe_Timer(5000);
		timer.run = function() {
			timer.stop();
			_g._socket.disconnect();
			_g._socket = null;
			_g.connect();
		};
	}
	,__class__: haxe_ui_remoting_client_Client
};
var haxe_ui_remoting_client_ClientSocket = function() {
};
$hxClasses["haxe.ui.remoting.client.ClientSocket"] = haxe_ui_remoting_client_ClientSocket;
haxe_ui_remoting_client_ClientSocket.__name__ = ["haxe","ui","remoting","client","ClientSocket"];
haxe_ui_remoting_client_ClientSocket.unserializeMsg = function(data) {
	var unserializer = new haxe_Unserializer(data);
	var msg = unserializer.unserialize();
	return msg;
};
haxe_ui_remoting_client_ClientSocket.serializeMsg = function(msg) {
	var serializer = new haxe_Serializer();
	serializer.serialize(msg);
	return serializer.toString();
};
haxe_ui_remoting_client_ClientSocket.prototype = {
	_socket: null
	,onMessage: null
	,onError: null
	,onMessageInternal: function(msg) {
		if(this.onMessage != null) this.onMessage(msg);
	}
	,connect: function(host,port) {
		this._socket = new haxe_ui_remoting_client_impl_JavaScriptSocket();
		this._socket.onMessage = $bind(this,this.onMessageInternal);
		this._socket.onError = this.onError;
		this._socket.connect(host,port);
	}
	,disconnect: function() {
		if(this._socket != null) {
			this._socket.disconnect();
			this._socket.onMessage = null;
			this._socket.onError = null;
			this._socket = null;
		}
	}
	,sendMessage: function(msg) {
		this._socket.sendMessage(msg);
	}
	,__class__: haxe_ui_remoting_client_ClientSocket
};
var haxe_ui_remoting_client_calls_Call = function() {
};
$hxClasses["haxe.ui.remoting.client.calls.Call"] = haxe_ui_remoting_client_calls_Call;
haxe_ui_remoting_client_calls_Call.__name__ = ["haxe","ui","remoting","client","calls","Call"];
haxe_ui_remoting_client_calls_Call.create = function(name) {
	switch(name) {
	case "components.list":
		return new haxe_ui_remoting_client_calls_ListComponents();
	case "component.highlight":
		return new haxe_ui_remoting_client_calls_HighlightComponent();
	}
	return null;
};
haxe_ui_remoting_client_calls_Call.prototype = {
	execute: function(details) {
		throw new js__$Boot_HaxeError("Not implemented");
	}
	,__class__: haxe_ui_remoting_client_calls_Call
};
var haxe_ui_remoting_client_calls_HighlightComponent = function() {
	haxe_ui_remoting_client_calls_Call.call(this);
};
$hxClasses["haxe.ui.remoting.client.calls.HighlightComponent"] = haxe_ui_remoting_client_calls_HighlightComponent;
haxe_ui_remoting_client_calls_HighlightComponent.__name__ = ["haxe","ui","remoting","client","calls","HighlightComponent"];
haxe_ui_remoting_client_calls_HighlightComponent.__super__ = haxe_ui_remoting_client_calls_Call;
haxe_ui_remoting_client_calls_HighlightComponent.prototype = $extend(haxe_ui_remoting_client_calls_Call.prototype,{
	execute: function(details) {
		var id;
		id = __map_reserved.id != null?details.getReserved("id"):details.h["id"];
		var hightlight;
		hightlight = (__map_reserved.highlight != null?details.getReserved("highlight"):details.h["highlight"]) == "true";
		var component = haxe_ui_core_Screen.get_instance().rootComponents[0].findComponent(id,haxe_ui_core_Component,true);
		if(component != null) {
			if(hightlight == true) {
				if(haxe_ui_remoting_client_calls_HighlightComponent.overlay == null) {
					haxe_ui_remoting_client_calls_HighlightComponent.overlay = new haxe_ui_core_Component();
					haxe_ui_remoting_client_calls_HighlightComponent.overlay.set_includeInLayout(false);
					haxe_ui_remoting_client_calls_HighlightComponent.overlay.set_styleString("border: 2px solid #FF0000;background-color: #FFCCCC; border-radius:2px;opacity: 0.5");
					haxe_ui_core_Screen.get_instance().addComponent(haxe_ui_remoting_client_calls_HighlightComponent.overlay);
				}
				haxe_ui_remoting_client_calls_HighlightComponent.overlay.set_left(component.get_screenLeft());
				haxe_ui_remoting_client_calls_HighlightComponent.overlay.set_top(component.get_screenTop());
				haxe_ui_remoting_client_calls_HighlightComponent.overlay.set_width(component.get_componentWidth());
				haxe_ui_remoting_client_calls_HighlightComponent.overlay.set_height(component.get_componentHeight());
				haxe_ui_remoting_client_calls_HighlightComponent.overlay.show();
			} else if(haxe_ui_remoting_client_calls_HighlightComponent.overlay != null) haxe_ui_remoting_client_calls_HighlightComponent.overlay.hide();
		}
		return null;
	}
	,__class__: haxe_ui_remoting_client_calls_HighlightComponent
});
var haxe_ui_remoting_client_calls_ListComponents = function() {
	haxe_ui_remoting_client_calls_Call.call(this);
};
$hxClasses["haxe.ui.remoting.client.calls.ListComponents"] = haxe_ui_remoting_client_calls_ListComponents;
haxe_ui_remoting_client_calls_ListComponents.__name__ = ["haxe","ui","remoting","client","calls","ListComponents"];
haxe_ui_remoting_client_calls_ListComponents.buildComponentTree = function(c,i) {
	if(c.get_id() == null) c.set_id("__" + haxe_ui_util_GUID.uuid());
	if(c.get_id() != null) i.id = c.get_id();
	if(c.get_left() != null) i.left = c.get_left();
	if(c.get_top() != null) i.top = c.get_top();
	if(c.get_left() != null) i.screenLeft = c.get_screenLeft();
	if(c.get_top() != null) i.screenTop = c.get_screenTop();
	if(c.get_componentWidth() != null) i.width = c.get_componentWidth();
	if(c.get_componentHeight() != null) i.height = c.get_componentHeight();
	if(c.get_percentWidth() != null) i.percentWidth = c.get_percentWidth();
	if(c.get_percentHeight() != null) i.percentHeight = c.get_percentHeight();
	if(c.get_text() != null) i.text = c.get_text();
	var _g = 0;
	var _g1 = c.get_childComponents();
	while(_g < _g1.length) {
		var child = _g1[_g];
		++_g;
		var childInfo = { className : Type.getClassName(child == null?null:js_Boot.getClass(child))};
		haxe_ui_remoting_client_calls_ListComponents.buildComponentTree(child,childInfo);
		if(i.children == null) i.children = [];
		i.children.push(childInfo);
	}
};
haxe_ui_remoting_client_calls_ListComponents.__super__ = haxe_ui_remoting_client_calls_Call;
haxe_ui_remoting_client_calls_ListComponents.prototype = $extend(haxe_ui_remoting_client_calls_Call.prototype,{
	execute: function(details) {
		var components = [];
		var _g = 0;
		var _g1 = haxe_ui_core_Screen.get_instance().rootComponents;
		while(_g < _g1.length) {
			var component = _g1[_g];
			++_g;
			var className = Type.getClassName(component == null?null:js_Boot.getClass(component));
			var componentInfo = { className : className};
			haxe_ui_remoting_client_calls_ListComponents.buildComponentTree(component,componentInfo);
			components.push(componentInfo);
		}
		return components;
	}
	,__class__: haxe_ui_remoting_client_calls_ListComponents
});
var haxe_ui_remoting_client_impl_JavaScriptSocket = function() {
};
$hxClasses["haxe.ui.remoting.client.impl.JavaScriptSocket"] = haxe_ui_remoting_client_impl_JavaScriptSocket;
haxe_ui_remoting_client_impl_JavaScriptSocket.__name__ = ["haxe","ui","remoting","client","impl","JavaScriptSocket"];
haxe_ui_remoting_client_impl_JavaScriptSocket.prototype = {
	onMessage: null
	,onError: null
	,_socket: null
	,connect: function(host,port) {
		var _g = this;
		this.disconnect();
		this._socket = new WebSocket("ws://" + host + ":" + (port + 1));
		this._socket.onopen = function() {
			_g._socket.send("ready");
		};
		this._socket.onmessage = function(m) {
			var msg = haxe_ui_remoting_client_ClientSocket.unserializeMsg(m.data);
			if(_g.onMessage != null) _g.onMessage(msg);
		};
		this._socket.onerror = function(e) {
			if(_g.onError != null) _g.onError(e);
		};
		this._socket.onclose = function() {
			if(_g.onError != null) _g.onError(null);
		};
	}
	,disconnect: function() {
		if(this._socket != null) {
			this._socket.onopen = null;
			this._socket.onmessage = null;
			this._socket.onerror = null;
			this._socket.onclose = null;
			this._socket.close();
			this._socket = null;
		}
	}
	,sendMessage: function(msg) {
		var data = haxe_ui_remoting_client_ClientSocket.serializeMsg(msg);
		this._socket.send(data);
	}
	,__class__: haxe_ui_remoting_client_impl_JavaScriptSocket
};
var hscript_Interp = function() {
	this.variables = new haxe_ds_StringMap();
	this.locals = new haxe_ds_StringMap();
	this.declared = [];
	this.variables.set("null",null);
	this.variables.set("true",true);
	this.variables.set("false",false);
	this.variables.set("trace",function(e) {
		haxe_Log.trace(Std.string(e),{ fileName : "hscript", lineNumber : 0});
	});
	this.initOps();
};
$hxClasses["hscript.Interp"] = hscript_Interp;
hscript_Interp.__name__ = ["hscript","Interp"];
hscript_Interp.prototype = {
	variables: null
	,locals: null
	,binops: null
	,depth: null
	,inTry: null
	,declared: null
	,initOps: function() {
		var me = this;
		this.binops = new haxe_ds_StringMap();
		this.binops.set("+",function(e1,e2) {
			return me.expr(e1) + me.expr(e2);
		});
		this.binops.set("-",function(e11,e21) {
			return me.expr(e11) - me.expr(e21);
		});
		this.binops.set("*",function(e12,e22) {
			return me.expr(e12) * me.expr(e22);
		});
		this.binops.set("/",function(e13,e23) {
			return me.expr(e13) / me.expr(e23);
		});
		this.binops.set("%",function(e14,e24) {
			return me.expr(e14) % me.expr(e24);
		});
		this.binops.set("&",function(e15,e25) {
			return me.expr(e15) & me.expr(e25);
		});
		this.binops.set("|",function(e16,e26) {
			return me.expr(e16) | me.expr(e26);
		});
		this.binops.set("^",function(e17,e27) {
			return me.expr(e17) ^ me.expr(e27);
		});
		this.binops.set("<<",function(e18,e28) {
			return me.expr(e18) << me.expr(e28);
		});
		this.binops.set(">>",function(e19,e29) {
			return me.expr(e19) >> me.expr(e29);
		});
		this.binops.set(">>>",function(e110,e210) {
			return me.expr(e110) >>> me.expr(e210);
		});
		this.binops.set("==",function(e111,e211) {
			return me.expr(e111) == me.expr(e211);
		});
		this.binops.set("!=",function(e112,e212) {
			return me.expr(e112) != me.expr(e212);
		});
		this.binops.set(">=",function(e113,e213) {
			return me.expr(e113) >= me.expr(e213);
		});
		this.binops.set("<=",function(e114,e214) {
			return me.expr(e114) <= me.expr(e214);
		});
		this.binops.set(">",function(e115,e215) {
			return me.expr(e115) > me.expr(e215);
		});
		this.binops.set("<",function(e116,e216) {
			return me.expr(e116) < me.expr(e216);
		});
		this.binops.set("||",function(e117,e217) {
			return me.expr(e117) == true || me.expr(e217) == true;
		});
		this.binops.set("&&",function(e118,e218) {
			return me.expr(e118) == true && me.expr(e218) == true;
		});
		this.binops.set("=",$bind(this,this.assign));
		this.binops.set("...",function(e119,e219) {
			return new IntIterator(me.expr(e119),me.expr(e219));
		});
		this.assignOp("+=",function(v1,v2) {
			return v1 + v2;
		});
		this.assignOp("-=",function(v11,v21) {
			return v11 - v21;
		});
		this.assignOp("*=",function(v12,v22) {
			return v12 * v22;
		});
		this.assignOp("/=",function(v13,v23) {
			return v13 / v23;
		});
		this.assignOp("%=",function(v14,v24) {
			return v14 % v24;
		});
		this.assignOp("&=",function(v15,v25) {
			return v15 & v25;
		});
		this.assignOp("|=",function(v16,v26) {
			return v16 | v26;
		});
		this.assignOp("^=",function(v17,v27) {
			return v17 ^ v27;
		});
		this.assignOp("<<=",function(v18,v28) {
			return v18 << v28;
		});
		this.assignOp(">>=",function(v19,v29) {
			return v19 >> v29;
		});
		this.assignOp(">>>=",function(v110,v210) {
			return v110 >>> v210;
		});
	}
	,assign: function(e1,e2) {
		var v = this.expr(e2);
		switch(e1[1]) {
		case 1:
			var id = e1[2];
			var l = this.locals.get(id);
			if(l == null) this.variables.set(id,v); else l.r = v;
			break;
		case 5:
			var f = e1[3];
			var e = e1[2];
			v = this.set(this.expr(e),f,v);
			break;
		case 16:
			var index = e1[3];
			var e3 = e1[2];
			this.expr(e3)[this.expr(index)] = v;
			break;
		default:
			this.error(hscript_Error.EInvalidOp("="));
		}
		return v;
	}
	,assignOp: function(op,fop) {
		var me = this;
		this.binops.set(op,function(e1,e2) {
			return me.evalAssignOp(op,fop,e1,e2);
		});
	}
	,evalAssignOp: function(op,fop,e1,e2) {
		var v;
		switch(e1[1]) {
		case 1:
			var id = e1[2];
			var l = this.locals.get(id);
			v = fop(this.expr(e1),this.expr(e2));
			if(l == null) this.variables.set(id,v); else l.r = v;
			break;
		case 5:
			var f = e1[3];
			var e = e1[2];
			var obj = this.expr(e);
			v = fop(this.get(obj,f),this.expr(e2));
			v = this.set(obj,f,v);
			break;
		case 16:
			var index = e1[3];
			var e3 = e1[2];
			var arr = this.expr(e3);
			var index1 = this.expr(index);
			v = fop(arr[index1],this.expr(e2));
			arr[index1] = v;
			break;
		default:
			return this.error(hscript_Error.EInvalidOp(op));
		}
		return v;
	}
	,increment: function(e,prefix,delta) {
		switch(e[1]) {
		case 1:
			var id = e[2];
			var l = this.locals.get(id);
			var v;
			if(l == null) v = this.variables.get(id); else v = l.r;
			if(prefix) {
				v += delta;
				if(l == null) {
					var value = v;
					this.variables.set(id,value);
				} else l.r = v;
			} else if(l == null) {
				var value1 = v + delta;
				this.variables.set(id,value1);
			} else l.r = v + delta;
			return v;
		case 5:
			var f = e[3];
			var e1 = e[2];
			var obj = this.expr(e1);
			var v1 = this.get(obj,f);
			if(prefix) {
				v1 += delta;
				this.set(obj,f,v1);
			} else this.set(obj,f,v1 + delta);
			return v1;
		case 16:
			var index = e[3];
			var e2 = e[2];
			var arr = this.expr(e2);
			var index1 = this.expr(index);
			var v2 = arr[index1];
			if(prefix) {
				v2 += delta;
				arr[index1] = v2;
			} else arr[index1] = v2 + delta;
			return v2;
		default:
			return this.error(hscript_Error.EInvalidOp(delta > 0?"++":"--"));
		}
	}
	,execute: function(expr) {
		this.depth = 0;
		this.locals = new haxe_ds_StringMap();
		this.declared = [];
		return this.exprReturn(expr);
	}
	,exprReturn: function(e) {
		try {
			return this.expr(e);
		} catch( e1 ) {
			haxe_CallStack.lastException = e1;
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			if( js_Boot.__instanceof(e1,hscript__$Interp_Stop) ) {
				switch(e1[1]) {
				case 0:
					throw new js__$Boot_HaxeError("Invalid break");
					break;
				case 1:
					throw new js__$Boot_HaxeError("Invalid continue");
					break;
				case 2:
					var v = e1[2];
					return v;
				}
			} else throw(e1);
		}
		return null;
	}
	,duplicate: function(h) {
		var h2 = new haxe_ds_StringMap();
		var $it0 = h.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			var value;
			value = __map_reserved[k] != null?h.getReserved(k):h.h[k];
			if(__map_reserved[k] != null) h2.setReserved(k,value); else h2.h[k] = value;
		}
		return h2;
	}
	,restore: function(old) {
		while(this.declared.length > old) {
			var d = this.declared.pop();
			this.locals.set(d.n,d.old);
		}
	}
	,edef: function(e) {
		return e;
	}
	,error: function(e) {
		throw new js__$Boot_HaxeError(e);
		return null;
	}
	,resolve: function(id) {
		var l = this.locals.get(id);
		if(l != null) return l.r;
		var v = this.variables.get(id);
		if(v == null && !this.variables.exists(id)) this.error(hscript_Error.EUnknownVariable(id));
		return v;
	}
	,expr: function(e) {
		var _g = this;
		switch(e[1]) {
		case 0:
			var c = e[2];
			switch(c[1]) {
			case 0:
				var v = c[2];
				return v;
			case 1:
				var f = c[2];
				return f;
			case 2:
				var s = c[2];
				return s;
			}
			break;
		case 1:
			var id = e[2];
			return this.resolve(id);
		case 2:
			var e1 = e[4];
			var n = e[2];
			this.declared.push({ n : n, old : this.locals.get(n)});
			var value = { r : e1 == null?null:this.expr(e1)};
			this.locals.set(n,value);
			return null;
		case 3:
			var e2 = e[2];
			return this.expr(e2);
		case 4:
			var exprs = e[2];
			var old = this.declared.length;
			var v1 = null;
			var _g1 = 0;
			while(_g1 < exprs.length) {
				var e3 = exprs[_g1];
				++_g1;
				v1 = this.expr(e3);
			}
			this.restore(old);
			return v1;
		case 5:
			var f1 = e[3];
			var e4 = e[2];
			return this.get(this.expr(e4),f1);
		case 6:
			var e21 = e[4];
			var e11 = e[3];
			var op = e[2];
			var fop = this.binops.get(op);
			if(fop == null) this.error(hscript_Error.EInvalidOp(op));
			return fop(e11,e21);
		case 7:
			var e5 = e[4];
			var prefix = e[3];
			var op1 = e[2];
			switch(op1) {
			case "!":
				return this.expr(e5) != true;
			case "-":
				return -this.expr(e5);
			case "++":
				return this.increment(e5,prefix,1);
			case "--":
				return this.increment(e5,prefix,-1);
			case "~":
				return ~this.expr(e5);
			default:
				this.error(hscript_Error.EInvalidOp(op1));
			}
			break;
		case 8:
			var params = e[3];
			var e6 = e[2];
			var args = [];
			var _g2 = 0;
			while(_g2 < params.length) {
				var p = params[_g2];
				++_g2;
				args.push(this.expr(p));
			}
			switch(e6[1]) {
			case 5:
				var f2 = e6[3];
				var e7 = e6[2];
				var obj = this.expr(e7);
				if(obj == null) this.error(hscript_Error.EInvalidAccess(f2));
				return this.fcall(obj,f2,args);
			default:
				return this.call(null,this.expr(e6),args);
			}
			break;
		case 9:
			var e22 = e[4];
			var e12 = e[3];
			var econd = e[2];
			if(this.expr(econd) == true) return this.expr(e12); else if(e22 == null) return null; else return this.expr(e22);
			break;
		case 10:
			var e8 = e[3];
			var econd1 = e[2];
			this.whileLoop(econd1,e8);
			return null;
		case 11:
			var e9 = e[4];
			var it = e[3];
			var v2 = e[2];
			this.forLoop(v2,it,e9);
			return null;
		case 12:
			throw new js__$Boot_HaxeError(hscript__$Interp_Stop.SBreak);
			break;
		case 13:
			throw new js__$Boot_HaxeError(hscript__$Interp_Stop.SContinue);
			break;
		case 15:
			var e10 = e[2];
			throw new js__$Boot_HaxeError(hscript__$Interp_Stop.SReturn(e10 == null?null:this.expr(e10)));
			break;
		case 14:
			var name = e[4];
			var fexpr = e[3];
			var params1 = e[2];
			var capturedLocals = this.duplicate(this.locals);
			var me = this;
			var hasOpt = false;
			var minParams = 0;
			var _g5 = 0;
			while(_g5 < params1.length) {
				var p2 = params1[_g5];
				++_g5;
				if(p2.opt) hasOpt = true; else minParams++;
			}
			var f3 = function(args1) {
				if(args1.length != params1.length) {
					if(args1.length < minParams) {
						var str = "Invalid number of parameters. Got " + args1.length + ", required " + minParams;
						if(name != null) str += " for function '" + name + "'";
						throw new js__$Boot_HaxeError(str);
					}
					var args2 = [];
					var extraParams = args1.length - minParams;
					var pos = 0;
					var _g3 = 0;
					while(_g3 < params1.length) {
						var p1 = params1[_g3];
						++_g3;
						if(p1.opt) {
							if(extraParams > 0) {
								args2.push(args1[pos++]);
								extraParams--;
							} else args2.push(null);
						} else args2.push(args1[pos++]);
					}
					args1 = args2;
				}
				var old1 = me.locals;
				var depth = me.depth;
				me.depth++;
				me.locals = me.duplicate(capturedLocals);
				var _g11 = 0;
				var _g4 = params1.length;
				while(_g11 < _g4) {
					var i = _g11++;
					me.locals.set(params1[i].name,{ r : args1[i]});
				}
				var r = null;
				if(_g.inTry) try {
					r = me.exprReturn(fexpr);
				} catch( e13 ) {
					haxe_CallStack.lastException = e13;
					if (e13 instanceof js__$Boot_HaxeError) e13 = e13.val;
					me.locals = old1;
					me.depth = depth;
					throw new js__$Boot_HaxeError(e13);
				} else r = me.exprReturn(fexpr);
				me.locals = old1;
				me.depth = depth;
				return r;
			};
			var f4 = Reflect.makeVarArgs(f3);
			if(name != null) {
				if(this.depth == 0) this.variables.set(name,f4); else {
					this.declared.push({ n : name, old : this.locals.get(name)});
					var ref = { r : f4};
					this.locals.set(name,ref);
					if(__map_reserved[name] != null) capturedLocals.setReserved(name,ref); else capturedLocals.h[name] = ref;
				}
			}
			return f4;
		case 17:
			var arr = e[2];
			var a = [];
			var _g6 = 0;
			while(_g6 < arr.length) {
				var e14 = arr[_g6];
				++_g6;
				a.push(this.expr(e14));
			}
			return a;
		case 16:
			var index = e[3];
			var e15 = e[2];
			return this.expr(e15)[this.expr(index)];
		case 18:
			var params2 = e[3];
			var cl = e[2];
			var a1 = [];
			var _g7 = 0;
			while(_g7 < params2.length) {
				var e16 = params2[_g7];
				++_g7;
				a1.push(this.expr(e16));
			}
			return this.cnew(cl,a1);
		case 19:
			var e17 = e[2];
			throw new js__$Boot_HaxeError(this.expr(e17));
			break;
		case 20:
			var ecatch = e[5];
			var n1 = e[3];
			var e18 = e[2];
			var old2 = this.declared.length;
			var oldTry = this.inTry;
			try {
				this.inTry = true;
				var v3 = this.expr(e18);
				this.restore(old2);
				this.inTry = oldTry;
				return v3;
			} catch( $e0 ) {
				haxe_CallStack.lastException = $e0;
				if ($e0 instanceof js__$Boot_HaxeError) $e0 = $e0.val;
				if( js_Boot.__instanceof($e0,hscript__$Interp_Stop) ) {
					var err = $e0;
					this.inTry = oldTry;
					throw new js__$Boot_HaxeError(err);
				} else {
				var err1 = $e0;
				this.restore(old2);
				this.inTry = oldTry;
				this.declared.push({ n : n1, old : this.locals.get(n1)});
				this.locals.set(n1,{ r : err1});
				var v4 = this.expr(ecatch);
				this.restore(old2);
				return v4;
				}
			}
			break;
		case 21:
			var fl = e[2];
			var o = { };
			var _g8 = 0;
			while(_g8 < fl.length) {
				var f5 = fl[_g8];
				++_g8;
				this.set(o,f5.name,this.expr(f5.e));
			}
			return o;
		case 22:
			var e23 = e[4];
			var e19 = e[3];
			var econd2 = e[2];
			if(this.expr(econd2) == true) return this.expr(e19); else return this.expr(e23);
			break;
		case 23:
			var def = e[4];
			var cases = e[3];
			var e20 = e[2];
			var val = this.expr(e20);
			var match = false;
			var _g9 = 0;
			while(_g9 < cases.length) {
				var c1 = cases[_g9];
				++_g9;
				var _g12 = 0;
				var _g21 = c1.values;
				while(_g12 < _g21.length) {
					var v5 = _g21[_g12];
					++_g12;
					if(this.expr(v5) == val) {
						match = true;
						break;
					}
				}
				if(match) {
					val = this.expr(c1.expr);
					break;
				}
			}
			if(!match) if(def == null) val = null; else val = this.expr(def);
			return val;
		}
		return null;
	}
	,whileLoop: function(econd,e) {
		var old = this.declared.length;
		try {
			while(this.expr(econd) == true) try {
				this.expr(e);
			} catch( err ) {
				haxe_CallStack.lastException = err;
				if (err instanceof js__$Boot_HaxeError) err = err.val;
				if( js_Boot.__instanceof(err,hscript__$Interp_Stop) ) {
					switch(err[1]) {
					case 1:
						break;
					case 0:
						throw "__break__";
						break;
					case 2:
						throw new js__$Boot_HaxeError(err);
						break;
					}
				} else throw(err);
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		this.restore(old);
	}
	,makeIterator: function(v) {
		try {
			v = $iterator(v)();
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
		}
		if(v.hasNext == null || v.next == null) this.error(hscript_Error.EInvalidIterator(v));
		return v;
	}
	,forLoop: function(n,it,e) {
		var old = this.declared.length;
		this.declared.push({ n : n, old : this.locals.get(n)});
		var it1 = this.makeIterator(this.expr(it));
		try {
			while(it1.hasNext()) {
				var value = { r : it1.next()};
				this.locals.set(n,value);
				try {
					this.expr(e);
				} catch( err ) {
					haxe_CallStack.lastException = err;
					if (err instanceof js__$Boot_HaxeError) err = err.val;
					if( js_Boot.__instanceof(err,hscript__$Interp_Stop) ) {
						switch(err[1]) {
						case 1:
							break;
						case 0:
							throw "__break__";
							break;
						case 2:
							throw new js__$Boot_HaxeError(err);
							break;
						}
					} else throw(err);
				}
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		this.restore(old);
	}
	,get: function(o,f) {
		if(o == null) this.error(hscript_Error.EInvalidAccess(f));
		return Reflect.getProperty(o,f);
	}
	,set: function(o,f,v) {
		if(o == null) this.error(hscript_Error.EInvalidAccess(f));
		Reflect.setProperty(o,f,v);
		return v;
	}
	,fcall: function(o,f,args) {
		return this.call(o,this.get(o,f),args);
	}
	,call: function(o,f,args) {
		return Reflect.callMethod(o,f,args);
	}
	,cnew: function(cl,args) {
		var c = Type.resolveClass(cl);
		if(c == null) c = this.resolve(cl);
		return Type.createInstance(c,args);
	}
	,__class__: hscript_Interp
};
var haxe_ui_scripting_ScriptInterp = function() {
	hscript_Interp.call(this);
	if(haxe_ui_scripting_ScriptInterp._staticClasses != null) {
		var $it0 = haxe_ui_scripting_ScriptInterp._staticClasses.keys();
		while( $it0.hasNext() ) {
			var name = $it0.next();
			var c = haxe_ui_scripting_ScriptInterp._staticClasses.get(name);
			var value = c;
			this.variables.set(name,value);
		}
	}
};
$hxClasses["haxe.ui.scripting.ScriptInterp"] = haxe_ui_scripting_ScriptInterp;
haxe_ui_scripting_ScriptInterp.__name__ = ["haxe","ui","scripting","ScriptInterp"];
haxe_ui_scripting_ScriptInterp.addClassAlias = function(alias,classPath) {
	if(haxe_ui_scripting_ScriptInterp._classAliases == null) haxe_ui_scripting_ScriptInterp._classAliases = new haxe_ds_StringMap();
	haxe_ui_scripting_ScriptInterp._classAliases.set(alias,classPath);
};
haxe_ui_scripting_ScriptInterp.addStaticClass = function(alias,c) {
	if(haxe_ui_scripting_ScriptInterp._staticClasses == null) haxe_ui_scripting_ScriptInterp._staticClasses = new haxe_ds_StringMap();
	var value = c;
	haxe_ui_scripting_ScriptInterp._staticClasses.set(alias,value);
};
haxe_ui_scripting_ScriptInterp.__super__ = hscript_Interp;
haxe_ui_scripting_ScriptInterp.prototype = $extend(hscript_Interp.prototype,{
	cnew: function(cl,args) {
		if(haxe_ui_scripting_ScriptInterp._classAliases != null && haxe_ui_scripting_ScriptInterp._classAliases.exists(cl)) cl = haxe_ui_scripting_ScriptInterp._classAliases.get(cl);
		return hscript_Interp.prototype.cnew.call(this,cl,args);
	}
	,get: function(o,f) {
		if(o == null) throw new js__$Boot_HaxeError(this.error(hscript_Error.EInvalidAccess(f)));
		return Reflect.getProperty(o,f);
	}
	,set: function(o,f,v) {
		if(o == null) throw new js__$Boot_HaxeError(this.error(hscript_Error.EInvalidAccess(f)));
		Reflect.setProperty(o,f,v);
		return v;
	}
	,__class__: haxe_ui_scripting_ScriptInterp
});
var haxe_ui_styles_Unit = $hxClasses["haxe.ui.styles.Unit"] = { __ename__ : ["haxe","ui","styles","Unit"], __constructs__ : ["Pix","Percent","EM"] };
haxe_ui_styles_Unit.Pix = function(v) { var $x = ["Pix",0,v]; $x.__enum__ = haxe_ui_styles_Unit; $x.toString = $estr; return $x; };
haxe_ui_styles_Unit.Percent = function(v) { var $x = ["Percent",1,v]; $x.__enum__ = haxe_ui_styles_Unit; $x.toString = $estr; return $x; };
haxe_ui_styles_Unit.EM = function(v) { var $x = ["EM",2,v]; $x.__enum__ = haxe_ui_styles_Unit; $x.toString = $estr; return $x; };
var haxe_ui_styles_FillStyle = $hxClasses["haxe.ui.styles.FillStyle"] = { __ename__ : ["haxe","ui","styles","FillStyle"], __constructs__ : ["Transparent","Color","Gradient"] };
haxe_ui_styles_FillStyle.Transparent = ["Transparent",0];
haxe_ui_styles_FillStyle.Transparent.toString = $estr;
haxe_ui_styles_FillStyle.Transparent.__enum__ = haxe_ui_styles_FillStyle;
haxe_ui_styles_FillStyle.Color = function(c) { var $x = ["Color",1,c]; $x.__enum__ = haxe_ui_styles_FillStyle; $x.toString = $estr; return $x; };
haxe_ui_styles_FillStyle.Gradient = function(a,b,c,d) { var $x = ["Gradient",2,a,b,c,d]; $x.__enum__ = haxe_ui_styles_FillStyle; $x.toString = $estr; return $x; };
var haxe_ui_styles_Layout = $hxClasses["haxe.ui.styles.Layout"] = { __ename__ : ["haxe","ui","styles","Layout"], __constructs__ : ["Horizontal","Vertical","Absolute","Dock","Inline"] };
haxe_ui_styles_Layout.Horizontal = ["Horizontal",0];
haxe_ui_styles_Layout.Horizontal.toString = $estr;
haxe_ui_styles_Layout.Horizontal.__enum__ = haxe_ui_styles_Layout;
haxe_ui_styles_Layout.Vertical = ["Vertical",1];
haxe_ui_styles_Layout.Vertical.toString = $estr;
haxe_ui_styles_Layout.Vertical.__enum__ = haxe_ui_styles_Layout;
haxe_ui_styles_Layout.Absolute = ["Absolute",2];
haxe_ui_styles_Layout.Absolute.toString = $estr;
haxe_ui_styles_Layout.Absolute.__enum__ = haxe_ui_styles_Layout;
haxe_ui_styles_Layout.Dock = ["Dock",3];
haxe_ui_styles_Layout.Dock.toString = $estr;
haxe_ui_styles_Layout.Dock.__enum__ = haxe_ui_styles_Layout;
haxe_ui_styles_Layout.Inline = ["Inline",4];
haxe_ui_styles_Layout.Inline.toString = $estr;
haxe_ui_styles_Layout.Inline.__enum__ = haxe_ui_styles_Layout;
var haxe_ui_styles_DockStyle = $hxClasses["haxe.ui.styles.DockStyle"] = { __ename__ : ["haxe","ui","styles","DockStyle"], __constructs__ : ["Top","Left","Right","Bottom","Full"] };
haxe_ui_styles_DockStyle.Top = ["Top",0];
haxe_ui_styles_DockStyle.Top.toString = $estr;
haxe_ui_styles_DockStyle.Top.__enum__ = haxe_ui_styles_DockStyle;
haxe_ui_styles_DockStyle.Left = ["Left",1];
haxe_ui_styles_DockStyle.Left.toString = $estr;
haxe_ui_styles_DockStyle.Left.__enum__ = haxe_ui_styles_DockStyle;
haxe_ui_styles_DockStyle.Right = ["Right",2];
haxe_ui_styles_DockStyle.Right.toString = $estr;
haxe_ui_styles_DockStyle.Right.__enum__ = haxe_ui_styles_DockStyle;
haxe_ui_styles_DockStyle.Bottom = ["Bottom",3];
haxe_ui_styles_DockStyle.Bottom.toString = $estr;
haxe_ui_styles_DockStyle.Bottom.__enum__ = haxe_ui_styles_DockStyle;
haxe_ui_styles_DockStyle.Full = ["Full",4];
haxe_ui_styles_DockStyle.Full.toString = $estr;
haxe_ui_styles_DockStyle.Full.__enum__ = haxe_ui_styles_DockStyle;
var haxe_ui_styles_TextAlign = $hxClasses["haxe.ui.styles.TextAlign"] = { __ename__ : ["haxe","ui","styles","TextAlign"], __constructs__ : ["Left","Right","Center"] };
haxe_ui_styles_TextAlign.Left = ["Left",0];
haxe_ui_styles_TextAlign.Left.toString = $estr;
haxe_ui_styles_TextAlign.Left.__enum__ = haxe_ui_styles_TextAlign;
haxe_ui_styles_TextAlign.Right = ["Right",1];
haxe_ui_styles_TextAlign.Right.toString = $estr;
haxe_ui_styles_TextAlign.Right.__enum__ = haxe_ui_styles_TextAlign;
haxe_ui_styles_TextAlign.Center = ["Center",2];
haxe_ui_styles_TextAlign.Center.toString = $estr;
haxe_ui_styles_TextAlign.Center.__enum__ = haxe_ui_styles_TextAlign;
var haxe_ui_styles_CssClass = function() {
};
$hxClasses["haxe.ui.styles.CssClass"] = haxe_ui_styles_CssClass;
haxe_ui_styles_CssClass.__name__ = ["haxe","ui","styles","CssClass"];
haxe_ui_styles_CssClass.prototype = {
	parent: null
	,node: null
	,className: null
	,pseudoClass: null
	,id: null
	,__class__: haxe_ui_styles_CssClass
};
var haxe_ui_styles_Rule = function() {
};
$hxClasses["haxe.ui.styles.Rule"] = haxe_ui_styles_Rule;
haxe_ui_styles_Rule.__name__ = ["haxe","ui","styles","Rule"];
haxe_ui_styles_Rule.prototype = {
	id: null
	,c: null
	,priority: null
	,s: null
	,__class__: haxe_ui_styles_Rule
};
var haxe_ui_styles_Token = $hxClasses["haxe.ui.styles.Token"] = { __ename__ : ["haxe","ui","styles","Token"], __constructs__ : ["TIdent","TString","TInt","TFloat","TDblDot","TSharp","TPOpen","TPClose","TExclam","TComma","TEof","TPercent","TSemicolon","TBrOpen","TBrClose","TDot","TSpaces","TSlash","TStar"] };
haxe_ui_styles_Token.TIdent = function(i) { var $x = ["TIdent",0,i]; $x.__enum__ = haxe_ui_styles_Token; $x.toString = $estr; return $x; };
haxe_ui_styles_Token.TString = function(s) { var $x = ["TString",1,s]; $x.__enum__ = haxe_ui_styles_Token; $x.toString = $estr; return $x; };
haxe_ui_styles_Token.TInt = function(i) { var $x = ["TInt",2,i]; $x.__enum__ = haxe_ui_styles_Token; $x.toString = $estr; return $x; };
haxe_ui_styles_Token.TFloat = function(f) { var $x = ["TFloat",3,f]; $x.__enum__ = haxe_ui_styles_Token; $x.toString = $estr; return $x; };
haxe_ui_styles_Token.TDblDot = ["TDblDot",4];
haxe_ui_styles_Token.TDblDot.toString = $estr;
haxe_ui_styles_Token.TDblDot.__enum__ = haxe_ui_styles_Token;
haxe_ui_styles_Token.TSharp = ["TSharp",5];
haxe_ui_styles_Token.TSharp.toString = $estr;
haxe_ui_styles_Token.TSharp.__enum__ = haxe_ui_styles_Token;
haxe_ui_styles_Token.TPOpen = ["TPOpen",6];
haxe_ui_styles_Token.TPOpen.toString = $estr;
haxe_ui_styles_Token.TPOpen.__enum__ = haxe_ui_styles_Token;
haxe_ui_styles_Token.TPClose = ["TPClose",7];
haxe_ui_styles_Token.TPClose.toString = $estr;
haxe_ui_styles_Token.TPClose.__enum__ = haxe_ui_styles_Token;
haxe_ui_styles_Token.TExclam = ["TExclam",8];
haxe_ui_styles_Token.TExclam.toString = $estr;
haxe_ui_styles_Token.TExclam.__enum__ = haxe_ui_styles_Token;
haxe_ui_styles_Token.TComma = ["TComma",9];
haxe_ui_styles_Token.TComma.toString = $estr;
haxe_ui_styles_Token.TComma.__enum__ = haxe_ui_styles_Token;
haxe_ui_styles_Token.TEof = ["TEof",10];
haxe_ui_styles_Token.TEof.toString = $estr;
haxe_ui_styles_Token.TEof.__enum__ = haxe_ui_styles_Token;
haxe_ui_styles_Token.TPercent = ["TPercent",11];
haxe_ui_styles_Token.TPercent.toString = $estr;
haxe_ui_styles_Token.TPercent.__enum__ = haxe_ui_styles_Token;
haxe_ui_styles_Token.TSemicolon = ["TSemicolon",12];
haxe_ui_styles_Token.TSemicolon.toString = $estr;
haxe_ui_styles_Token.TSemicolon.__enum__ = haxe_ui_styles_Token;
haxe_ui_styles_Token.TBrOpen = ["TBrOpen",13];
haxe_ui_styles_Token.TBrOpen.toString = $estr;
haxe_ui_styles_Token.TBrOpen.__enum__ = haxe_ui_styles_Token;
haxe_ui_styles_Token.TBrClose = ["TBrClose",14];
haxe_ui_styles_Token.TBrClose.toString = $estr;
haxe_ui_styles_Token.TBrClose.__enum__ = haxe_ui_styles_Token;
haxe_ui_styles_Token.TDot = ["TDot",15];
haxe_ui_styles_Token.TDot.toString = $estr;
haxe_ui_styles_Token.TDot.__enum__ = haxe_ui_styles_Token;
haxe_ui_styles_Token.TSpaces = ["TSpaces",16];
haxe_ui_styles_Token.TSpaces.toString = $estr;
haxe_ui_styles_Token.TSpaces.__enum__ = haxe_ui_styles_Token;
haxe_ui_styles_Token.TSlash = ["TSlash",17];
haxe_ui_styles_Token.TSlash.toString = $estr;
haxe_ui_styles_Token.TSlash.__enum__ = haxe_ui_styles_Token;
haxe_ui_styles_Token.TStar = ["TStar",18];
haxe_ui_styles_Token.TStar.toString = $estr;
haxe_ui_styles_Token.TStar.__enum__ = haxe_ui_styles_Token;
var haxe_ui_styles_Value = $hxClasses["haxe.ui.styles.Value"] = { __ename__ : ["haxe","ui","styles","Value"], __constructs__ : ["VIdent","VString","VUnit","VFloat","VInt","VHex","VList","VGroup","VCall","VLabel","VSlash"] };
haxe_ui_styles_Value.VIdent = function(i) { var $x = ["VIdent",0,i]; $x.__enum__ = haxe_ui_styles_Value; $x.toString = $estr; return $x; };
haxe_ui_styles_Value.VString = function(s) { var $x = ["VString",1,s]; $x.__enum__ = haxe_ui_styles_Value; $x.toString = $estr; return $x; };
haxe_ui_styles_Value.VUnit = function(v,unit) { var $x = ["VUnit",2,v,unit]; $x.__enum__ = haxe_ui_styles_Value; $x.toString = $estr; return $x; };
haxe_ui_styles_Value.VFloat = function(v) { var $x = ["VFloat",3,v]; $x.__enum__ = haxe_ui_styles_Value; $x.toString = $estr; return $x; };
haxe_ui_styles_Value.VInt = function(v) { var $x = ["VInt",4,v]; $x.__enum__ = haxe_ui_styles_Value; $x.toString = $estr; return $x; };
haxe_ui_styles_Value.VHex = function(v) { var $x = ["VHex",5,v]; $x.__enum__ = haxe_ui_styles_Value; $x.toString = $estr; return $x; };
haxe_ui_styles_Value.VList = function(l) { var $x = ["VList",6,l]; $x.__enum__ = haxe_ui_styles_Value; $x.toString = $estr; return $x; };
haxe_ui_styles_Value.VGroup = function(l) { var $x = ["VGroup",7,l]; $x.__enum__ = haxe_ui_styles_Value; $x.toString = $estr; return $x; };
haxe_ui_styles_Value.VCall = function(f,vl) { var $x = ["VCall",8,f,vl]; $x.__enum__ = haxe_ui_styles_Value; $x.toString = $estr; return $x; };
haxe_ui_styles_Value.VLabel = function(v,val) { var $x = ["VLabel",9,v,val]; $x.__enum__ = haxe_ui_styles_Value; $x.toString = $estr; return $x; };
haxe_ui_styles_Value.VSlash = ["VSlash",10];
haxe_ui_styles_Value.VSlash.toString = $estr;
haxe_ui_styles_Value.VSlash.__enum__ = haxe_ui_styles_Value;
var haxe_ui_styles_Parser = function() {
};
$hxClasses["haxe.ui.styles.Parser"] = haxe_ui_styles_Parser;
haxe_ui_styles_Parser.__name__ = ["haxe","ui","styles","Parser"];
haxe_ui_styles_Parser.prototype = {
	css: null
	,s: null
	,simp: null
	,pos: null
	,spacesTokens: null
	,tokens: null
	,notImplemented: function() {
	}
	,applyStyle: function(r,v,s) {
		switch(r) {
		case "padding":
			switch(v[1]) {
			case 7:
				switch(v[2].length) {
				case 2:
					var b = v[2][1];
					var a = v[2][0];
					var a1 = this.getVal(a);
					var b1 = this.getVal(b);
					if(a1 != null && b1 != null) {
						s.paddingTop = s.paddingBottom = a1;
						s.paddingLeft = s.paddingRight = b1;
						return true;
					}
					break;
				default:
					var i = this.getVal(v);
					if(i != null) {
						s.padding(i);
						return true;
					}
				}
				break;
			default:
				var i1 = this.getVal(v);
				if(i1 != null) {
					s.padding(i1);
					return true;
				}
			}
			break;
		case "padding-top":
			var i2 = this.getVal(v);
			if(i2 != null) {
				s.paddingTop = i2;
				return true;
			}
			break;
		case "padding-left":
			var i3 = this.getVal(v);
			if(i3 != null) {
				s.paddingLeft = i3;
				return true;
			}
			break;
		case "padding-right":
			var i4 = this.getVal(v);
			if(i4 != null) {
				s.paddingRight = i4;
				return true;
			}
			break;
		case "padding-bottom":
			var i5 = this.getVal(v);
			if(i5 != null) {
				s.paddingBottom = i5;
				return true;
			}
			break;
		case "margin":
			switch(v[1]) {
			case 7:
				switch(v[2].length) {
				case 2:
					var b2 = v[2][1];
					var a2 = v[2][0];
					var a3 = this.getVal(a2);
					var b3 = this.getVal(b2);
					if(a3 != null && b3 != null) {
						s.marginTop = s.marginBottom = a3;
						s.marginLeft = s.marginRight = b3;
						return true;
					}
					break;
				default:
					var i6 = this.getVal(v);
					if(i6 != null) {
						s.margin(i6);
						return true;
					}
				}
				break;
			default:
				var i7 = this.getVal(v);
				if(i7 != null) {
					s.margin(i7);
					return true;
				}
			}
			break;
		case "margin-top":
			var i8 = this.getVal(v);
			if(i8 != null) {
				s.marginTop = i8;
				return true;
			}
			break;
		case "margin-left":
			var i9 = this.getVal(v);
			if(i9 != null) {
				s.marginLeft = i9;
				return true;
			}
			break;
		case "margin-right":
			var i10 = this.getVal(v);
			if(i10 != null) {
				s.marginRight = i10;
				return true;
			}
			break;
		case "margin-bottom":
			var i11 = this.getVal(v);
			if(i11 != null) {
				s.marginBottom = i11;
				return true;
			}
			break;
		case "width":
			var i12 = this.getVal(v);
			if(this.getIdent(v) == "auto") {
				s.width = null;
				s.percentWidth = null;
				s.autoWidth = true;
				return true;
			} else if(i12 != null) {
				s.width = i12;
				return true;
			} else {
				var p = this.getUnit(v);
				if(p != null) switch(p[1]) {
				case 1:
					var x = p[2];
					s.percentWidth = x * 100;
					return true;
				default:
				}
			}
			break;
		case "height":
			var i13 = this.getVal(v);
			if(this.getIdent(v) == "auto") {
				s.height = null;
				s.percentHeight = null;
				s.autoHeight = true;
				return true;
			} else if(i13 != null) {
				s.height = i13;
				return true;
			} else {
				var p1 = this.getUnit(v);
				if(p1 != null) switch(p1[1]) {
				case 1:
					var x1 = p1[2];
					s.percentHeight = x1 * 100;
					return true;
				default:
				}
			}
			break;
		case "background-color":
			if(this.getIdent(v) == "none" || this.getIdent(v) == "transparent") {
				s.backgroundColor = -2147483648;
				s.backgroundColorEnd = -2147483648;
				return true;
			}
			var f = this.getCol(v);
			if(f != null) {
				s.backgroundColor = f;
				s.backgroundColorEnd = null;
				return true;
			}
			break;
		case "background-color-end":
			var f1 = this.getCol(v);
			if(f1 != null) {
				s.backgroundColorEnd = f1;
				return true;
			}
			break;
		case "background-gradient-style":
			var v1 = this.getIdent(v);
			if(v1 != null) {
				if(v1 == "vertical" || v1 == "horizontal") {
					s.backgroundGradientStyle = v1;
					return true;
				}
				return true;
			}
			break;
		case "background":
			if(this.applyComposite(["background-color","background-color-end","background-gradient-style"],v,s)) return true;
			if(this.getIdent(v) == "none") {
				s.backgroundColor = -2147483648;
				s.backgroundColorEnd = -2147483648;
				return true;
			}
			break;
		case "background-image":
			var x2 = this.getString(v);
			if(x2 != null) {
				s.backgroundImage = x2;
				return true;
			}
			break;
		case "background-image-repeat":
			var v2 = this.getIdent(v);
			if(v2 != null) {
				if(v2 == "repeat" || v2 == "stretch" || v2 == "none") {
					if(v2 == "none") s.backgroundImageRepeat = null; else s.backgroundImageRepeat = v2;
					return true;
				}
			}
			break;
		case "background-image-clip-top":
			var i14 = this.getVal(v);
			if(i14 != null) {
				s.backgroundImageClipTop = i14;
				return true;
			}
			break;
		case "background-image-clip-left":
			var i15 = this.getVal(v);
			if(i15 != null) {
				s.backgroundImageClipLeft = i15;
				return true;
			}
			break;
		case "background-image-clip-bottom":
			var i16 = this.getVal(v);
			if(i16 != null) {
				s.backgroundImageClipBottom = i16;
				return true;
			}
			break;
		case "background-image-clip-right":
			var i17 = this.getVal(v);
			if(i17 != null) {
				s.backgroundImageClipRight = i17;
				return true;
			}
			break;
		case "background-image-clip":
			if(this.applyComposite(["background-image-clip-top","background-image-clip-left","background-image-clip-bottom","background-image-clip-right"],v,s)) return true;
			if(this.getIdent(v) == "none") {
				s.backgroundImageClipTop = null;
				s.backgroundImageClipLeft = null;
				s.backgroundImageClipBottom = null;
				s.backgroundImageClipRight = null;
				return true;
			}
			break;
		case "background-image-slice-top":
			var i18 = this.getVal(v);
			if(i18 != null) {
				s.backgroundImageSliceTop = i18;
				return true;
			}
			break;
		case "background-image-slice-left":
			var i19 = this.getVal(v);
			if(i19 != null) {
				s.backgroundImageSliceLeft = i19;
				return true;
			}
			break;
		case "background-image-slice-bottom":
			var i20 = this.getVal(v);
			if(i20 != null) {
				s.backgroundImageSliceBottom = i20;
				return true;
			}
			break;
		case "background-image-slice-right":
			var i21 = this.getVal(v);
			if(i21 != null) {
				s.backgroundImageSliceRight = i21;
				return true;
			}
			break;
		case "background-image-slice":
			if(this.applyComposite(["background-image-slice-top","background-image-slice-left","background-image-slice-bottom","background-image-slice-right"],v,s)) return true;
			if(this.getIdent(v) == "none") {
				s.backgroundImageSliceTop = null;
				s.backgroundImageSliceLeft = null;
				s.backgroundImageSliceBottom = null;
				s.backgroundImageSliceRight = null;
				return true;
			}
			break;
		case "color":
			if(this.getIdent(v) == "none") {
				s.color = -2147483648;
				return true;
			}
			var c = this.getCol(v);
			if(c != null) {
				s.color = c;
				return true;
			}
			break;
		case "border-radius":
			if(this.getIdent(v) == "none") {
				s.borderRadius = -2147483648;
				return true;
			}
			var i22 = this.getVal(v);
			if(i22 != null) {
				s.borderRadius = i22;
				return true;
			}
			break;
		case "border":
			if(this.applyComposite(["border-width","border-style","border-color"],v,s)) return true;
			if(this.getIdent(v) == "none") {
				s.borderTopSize = -2147483648;
				s.borderLeftSize = -2147483648;
				s.borderBottomSize = -2147483648;
				s.borderRightSize = -2147483648;
				s.borderTopColor = -2147483648;
				s.borderLeftColor = -2147483648;
				s.borderBottomColor = -2147483648;
				s.borderRightColor = -2147483648;
				return true;
			}
			break;
		case "border-width":case "border-size":
			var i23 = this.getVal(v);
			if(i23 != null) {
				s.borderTopSize = i23;
				s.borderLeftSize = i23;
				s.borderBottomSize = i23;
				s.borderRightSize = i23;
				return true;
			}
			break;
		case "border-top-width":case "border-top-size":
			var i24 = this.getVal(v);
			if(i24 != null) {
				s.borderTopSize = i24;
				return true;
			}
			break;
		case "border-left-width":case "border-left-size":
			var i25 = this.getVal(v);
			if(i25 != null) {
				s.borderLeftSize = i25;
				return true;
			}
			break;
		case "border-bottom-width":case "border-bottom-size":
			var i26 = this.getVal(v);
			if(i26 != null) {
				s.borderBottomSize = i26;
				return true;
			}
			break;
		case "border-right-width":case "border-right-size":
			var i27 = this.getVal(v);
			if(i27 != null) {
				s.borderRightSize = i27;
				return true;
			}
			break;
		case "border-style":
			if(this.getIdent(v) == "solid") return true;
			break;
		case "border-color":
			var c1 = this.getCol(v);
			if(c1 != null) {
				s.borderTopColor = c1;
				s.borderLeftColor = c1;
				s.borderBottomColor = c1;
				s.borderRightColor = c1;
				return true;
			}
			break;
		case "border-top-color":
			var c2 = this.getCol(v);
			if(c2 != null) {
				s.borderTopColor = c2;
				return true;
			}
			break;
		case "border-left-color":
			var c3 = this.getCol(v);
			if(c3 != null) {
				s.borderLeftColor = c3;
				return true;
			}
			break;
		case "border-bottom-color":
			var c4 = this.getCol(v);
			if(c4 != null) {
				s.borderBottomColor = c4;
				return true;
			}
			break;
		case "border-right-color":
			var c5 = this.getCol(v);
			if(c5 != null) {
				s.borderRightColor = c5;
				return true;
			}
			break;
		case "cursor":
			var v3 = this.getIdent(v);
			if(v3 != null) {
				if(v3 == "pointer" || v3 == "default") {
					s.cursor = v3;
					return true;
				}
				return false;
			}
			break;
		case "filter":
			var arr = this.getCall(v);
			if(arr != null) {
				s.filter = arr;
				return true;
			} else {
				var i28 = this.getIdent(v);
				if(i28 != null) {
					if(i28 == "none") s.filter = ["none"]; else s.filter = [i28];
					return true;
				}
			}
			return false;
		case "spacing":
			return this.applyComposite(["vertical-spacing","horizontal-spacing"],v,s);
		case "horizontal-spacing":
			var i29 = this.getVal(v);
			if(i29 != null) {
				s.horizontalSpacing = i29;
				return true;
			}
			break;
		case "vertical-spacing":
			var i30 = this.getVal(v);
			if(i30 != null) {
				s.verticalSpacing = i30;
				return true;
			}
			break;
		case "icon-position":
			var x3 = this.getIdent(v);
			switch(x3) {
			case "top":case "left":case "bottom":case "right":
				s.iconPosition = x3;
				return true;
			default:
			}
			break;
		case "icon":
			var x4 = this.getString(v);
			if(this.getIdent(v) == "none") {
				s.icon = null;
				return true;
			}
			if(x4 != null) {
				s.icon = x4;
				return true;
			}
			break;
		case "hidden":
			var b4 = this.getBool(v);
			if(b4 != null) {
				s.hidden = b4;
				return true;
			}
			break;
		case "clip":
			var b5 = this.getBool(v);
			if(b5 != null) {
				s.clip = b5;
				return true;
			}
			break;
		case "native":
			var b6 = this.getBool(v);
			if(b6 != null) {
				s["native"] = b6;
				return true;
			}
			break;
		case "horizontal-align":
			var x5 = this.getIdent(v);
			switch(x5) {
			case "left":case "right":case "center":
				s.horizontalAlign = x5;
				return true;
			default:
			}
			break;
		case "vertical-align":
			var x6 = this.getIdent(v);
			switch(x6) {
			case "top":case "bottom":case "center":
				s.verticalAlign = x6;
				return true;
			default:
			}
			break;
		case "opacity":
			var i31 = this.getVal(v);
			if(i31 != null) {
				s.opacity = i31;
				return true;
			}
			break;
		case "offset":
			return this.applyComposite(["offset-left","offset-top"],v,s);
		case "offset-left":
			var i32 = this.getVal(v);
			if(i32 != null) {
				s.offsetLeft = i32;
				return true;
			}
			break;
		case "offset-top":
			var i33 = this.getVal(v);
			if(i33 != null) {
				s.offsetTop = i33;
				return true;
			}
			break;
		case "font":
			return this.applyComposite(["font-name","font-size","font-style"],v,s);
		case "font-name":
			var x7 = this.getString(v);
			if(x7 != null) {
				s.fontName = x7;
				return true;
			}
			break;
		case "font-size":
			var i34 = this.getVal(v);
			if(i34 != null) {
				s.fontSize = i34;
				return true;
			}
			break;
		case "font-style":
			var x8 = this.getIdent(v);
			if(x8 == "bold") s.fontBold = true;
			return true;
		default:
		}
		return false;
	}
	,applyComposite: function(names,v,s) {
		var vl;
		switch(v[1]) {
		case 7:
			var l = v[2];
			vl = l;
			break;
		default:
			vl = [v];
		}
		if(names.length > vl.length) {
			var last = vl[vl.length - 1];
			var _g1 = 0;
			var _g = names.length - vl.length;
			while(_g1 < _g) {
				var i = _g1++;
				vl.push(last);
			}
		}
		while(vl.length > 0) {
			var found = false;
			var _g2 = 0;
			while(_g2 < names.length) {
				var n = names[_g2];
				++_g2;
				var count = 1;
				if(count > vl.length) count = vl.length;
				while(count > 0) {
					var v1;
					if(count == 1) v1 = vl[0]; else v1 = haxe_ui_styles_Value.VGroup(vl.slice(0,count));
					if(this.applyStyle(n,v1,s)) {
						found = true;
						HxOverrides.remove(names,n);
						var _g11 = 0;
						while(_g11 < count) {
							var i1 = _g11++;
							vl.shift();
						}
						break;
					}
					count--;
				}
				if(found) break;
			}
			if(!found) return false;
		}
		return true;
	}
	,getGroup: function(v,f) {
		switch(v[1]) {
		case 7:
			var l = v[2];
			var a = [];
			var _g = 0;
			while(_g < l.length) {
				var v1 = l[_g];
				++_g;
				var v2 = f(v1);
				if(v2 == null) return null;
				a.push(v2);
			}
			return a;
		default:
			var v3 = f(v);
			if(v3 == null) return null; else return [v3];
		}
	}
	,getList: function(v,f) {
		switch(v[1]) {
		case 6:
			var l = v[2];
			var a = [];
			var _g = 0;
			while(_g < l.length) {
				var v1 = l[_g];
				++_g;
				var v2 = f(v1);
				if(v2 == null) return null;
				a.push(v2);
			}
			return a;
		default:
			var v3 = f(v);
			if(v3 == null) return null; else return [v3];
		}
	}
	,getInt: function(v) {
		switch(v[1]) {
		case 2:
			var u = v[3];
			var f = v[2];
			switch(u) {
			case "px":
				return f | 0;
			case "pt":
				return f * 4 / 3 | 0;
			default:
				return null;
			}
			break;
		case 4:
			var v1 = v[2];
			return v1 | 0;
		default:
			return null;
		}
	}
	,getBool: function(v) {
		switch(v[1]) {
		case 4:
			var v1 = v[2];
			return (v1 | 0) == 1;
		case 0:
			var v2 = v[2];
			return v2 == "true" || v2 == "yes";
		default:
			return null;
		}
	}
	,getString: function(v) {
		switch(v[1]) {
		case 1:
			var v1 = v[2];
			return v1;
		default:
			return null;
		}
	}
	,getCall: function(v) {
		switch(v[1]) {
		case 8:
			var params = v[3];
			var v1 = v[2];
			var arr = [];
			arr.push(v1);
			var _g = 0;
			while(_g < params.length) {
				var p = params[_g];
				++_g;
				var c = this.getCol(p);
				if(c != null) arr.push(c); else switch(p[1]) {
				case 4:
					var x = p[2];
					arr.push(x);
					break;
				case 3:
					var x1 = p[2];
					arr.push(x1);
					break;
				case 0:
					var x2 = p[2];
					if(x2 == "true") arr.push(true); else if(x2 == "false") arr.push(false); else arr.push(x2);
					break;
				default:
				}
			}
			return arr;
		default:
			return null;
		}
	}
	,getVal: function(v) {
		switch(v[1]) {
		case 2:
			var u = v[3];
			var f = v[2];
			switch(u) {
			case "px":
				return f;
			case "pt":
				return f * 4 / 3;
			default:
				return null;
			}
			break;
		case 4:
			var v1 = v[2];
			return v1;
		case 3:
			var v2 = v[2];
			return v2;
		default:
			return null;
		}
	}
	,getUnit: function(v) {
		switch(v[1]) {
		case 2:
			var u = v[3];
			var f = v[2];
			switch(u) {
			case "px":
				return haxe_ui_styles_Unit.Pix(f);
			case "pt":
				return haxe_ui_styles_Unit.Pix(f * 4 / 3);
			case "%":
				return haxe_ui_styles_Unit.Percent(f / 100);
			default:
				return null;
			}
			break;
		case 4:
			var v1 = v[2];
			return haxe_ui_styles_Unit.Pix(v1);
		case 3:
			var v2 = v[2];
			return haxe_ui_styles_Unit.Pix(v2);
		default:
			return null;
		}
	}
	,mapIdent: function(v,vals) {
		var i = this.getIdent(v);
		if(i == null) return null;
		var _g = 0;
		while(_g < vals.length) {
			var v1 = vals[_g];
			++_g;
			if(v1[0].toLowerCase() == i) return v1;
		}
		return null;
	}
	,getIdent: function(v) {
		switch(v[1]) {
		case 0:
			var v1 = v[2];
			return v1;
		default:
			return null;
		}
	}
	,getColAlpha: function(v) {
		var c = this.getCol(v);
		if(c != null && c >>> 24 == 0) c |= -16777216;
		return c;
	}
	,getFill: function(v) {
		var c = this.getColAlpha(v);
		if(c != null) return haxe_ui_styles_FillStyle.Color(c);
		switch(v[1]) {
		case 8:
			switch(v[2]) {
			case "gradient":
				switch(v[3].length) {
				case 4:
					var d = v[3][3];
					var c1 = v[3][2];
					var b = v[3][1];
					var a = v[3][0];
					var ca = this.getColAlpha(a);
					var cb = this.getColAlpha(b);
					var cc = this.getColAlpha(c1);
					var cd = this.getColAlpha(d);
					if(ca != null && cb != null && cc != null && cd != null) return haxe_ui_styles_FillStyle.Gradient(ca,cb,cc,cd);
					break;
				default:
				}
				break;
			default:
			}
			break;
		case 0:
			switch(v[2]) {
			case "transparent":
				return haxe_ui_styles_FillStyle.Transparent;
			default:
			}
			break;
		default:
		}
		return null;
	}
	,getCol: function(v) {
		switch(v[1]) {
		case 5:
			var v1 = v[2];
			if(v1.length == 6) return Std.parseInt("0x" + v1); else if(v1.length == 3) return Std.parseInt("0x" + v1.charAt(0) + v1.charAt(0) + v1.charAt(1) + v1.charAt(1) + v1.charAt(2) + v1.charAt(2)); else return null;
			break;
		case 0:
			var i = v[2];
			switch(i) {
			case "black":
				return 0;
			case "red":
				return 16711680;
			case "lime":
				return 65280;
			case "blue":
				return 255;
			case "white":
				return 16777215;
			case "aqua":
				return 65535;
			case "fuchsia":
				return 16711935;
			case "yellow":
				return 16776960;
			case "maroon":
				return 8388608;
			case "green":
				return 32768;
			case "navy":
				return 128;
			case "olive":
				return 8421376;
			case "purple":
				return 8388736;
			case "teal":
				return 32896;
			case "silver":
				return 12632256;
			case "gray":case "grey":
				return 8421504;
			default:
				return null;
			}
			break;
		case 8:
			switch(v[2]) {
			case "rgba":
				switch(v[3].length) {
				case 4:
					var a = v[3][3];
					var b = v[3][2];
					var g = v[3][1];
					var r = v[3][0];
					var r1 = this.getVal(r);
					var g1 = this.getVal(g);
					var b1 = this.getVal(b);
					var a1 = this.getVal(a);
					if(r1 != null && g1 != null && b1 != null && a1 != null) {
						var a2;
						var v2 = a1 * 255 | 0;
						if(v2 < 0) v2 = 0;
						if(v2 > 255) v2 = 255;
						a2 = v2;
						if(a2 == 0) a2 = 1;
						return a2 << 24 | (function($this) {
							var $r;
							var v3 = r1 | 0;
							if(v3 < 0) v3 = 0;
							if(v3 > 255) v3 = 255;
							$r = v3;
							return $r;
						}(this)) << 16 | (function($this) {
							var $r;
							var v4 = g1 | 0;
							if(v4 < 0) v4 = 0;
							if(v4 > 255) v4 = 255;
							$r = v4;
							return $r;
						}(this)) << 8 | (function($this) {
							var $r;
							var v5 = b1 | 0;
							if(v5 < 0) v5 = 0;
							if(v5 > 255) v5 = 255;
							$r = v5;
							return $r;
						}(this));
					} else return null;
					break;
				default:
					return null;
				}
				break;
			default:
				return null;
			}
			break;
		default:
			return null;
		}
	}
	,getFontName: function(v) {
		switch(v[1]) {
		case 1:
			var s = v[2];
			return s;
		case 7:
			var g = this.getGroup(v,$bind(this,this.getIdent));
			if(g == null) return null; else return g.join(" ");
			break;
		case 0:
			var i = v[2];
			return i;
		default:
			return null;
		}
	}
	,unexpected: function(t) {
		return null;
	}
	,expect: function(t) {
		var tk = this.readToken();
		if(tk != t) this.unexpected(tk);
	}
	,push: function(t) {
		this.tokens.push(t);
	}
	,isToken: function(t) {
		var tk = this.readToken();
		if(tk == t) return true;
		this.tokens.push(tk);
		return false;
	}
	,parse: function(css,s) {
		this.css = css;
		this.s = s;
		this.pos = 0;
		this.tokens = [];
		this.parseStyle(haxe_ui_styles_Token.TEof);
	}
	,valueStr: function(v) {
		switch(v[1]) {
		case 0:
			var i = v[2];
			return i;
		case 1:
			var s = v[2];
			return "\"" + s + "\"";
		case 2:
			var unit = v[3];
			var f = v[2];
			return f + unit;
		case 3:
			var f1 = v[2];
			if(f1 == null) return "null"; else return "" + f1;
			break;
		case 4:
			var v1 = v[2];
			if(v1 == null) return "null"; else return "" + v1;
			break;
		case 5:
			var v2 = v[2];
			return "#" + v2;
		case 6:
			var l = v[2];
			return ((function($this) {
				var $r;
				var _g = [];
				{
					var _g1 = 0;
					while(_g1 < l.length) {
						var v3 = l[_g1];
						++_g1;
						_g.push($this.valueStr(v3));
					}
				}
				$r = _g;
				return $r;
			}(this))).join(", ");
		case 7:
			var l1 = v[2];
			return ((function($this) {
				var $r;
				var _g2 = [];
				{
					var _g11 = 0;
					while(_g11 < l1.length) {
						var v4 = l1[_g11];
						++_g11;
						_g2.push($this.valueStr(v4));
					}
				}
				$r = _g2;
				return $r;
			}(this))).join(" ");
		case 8:
			var args = v[3];
			var f2 = v[2];
			return f2 + "(" + ((function($this) {
				var $r;
				var _g3 = [];
				{
					var _g12 = 0;
					while(_g12 < args.length) {
						var v5 = args[_g12];
						++_g12;
						_g3.push($this.valueStr(v5));
					}
				}
				$r = _g3;
				return $r;
			}(this))).join(", ") + ")";
		case 9:
			var v6 = v[3];
			var label = v[2];
			return this.valueStr(v6) + " !" + label;
		case 10:
			return "/";
		}
	}
	,parseStyle: function(eof) {
		while(true) {
			if(this.isToken(eof)) break;
			var r = this.readIdent();
			if(r == null) break;
			this.expect(haxe_ui_styles_Token.TDblDot);
			var v = this.readValue();
			if(v == null) break;
			var s = this.s;
			switch(v[1]) {
			case 9:
				var val = v[3];
				var label = v[2];
				if(label == "important") {
					v = val;
					if(this.simp == null) this.simp = new haxe_ui_styles_Style();
					s = this.simp;
				}
				break;
			default:
			}
			if(!this.applyStyle(r,v,s)) {
				if(this.isToken(eof)) break;
			}
			this.expect(haxe_ui_styles_Token.TSemicolon);
		}
	}
	,parseRules: function(css) {
		this.css = css;
		this.pos = 0;
		this.tokens = [];
		var rules = [];
		while(true) {
			if(this.isToken(haxe_ui_styles_Token.TEof)) break;
			var classes = this.readClasses();
			this.expect(haxe_ui_styles_Token.TBrOpen);
			this.s = new haxe_ui_styles_Style();
			this.simp = null;
			this.parseStyle(haxe_ui_styles_Token.TBrClose);
			var _g = 0;
			while(_g < classes.length) {
				var c = classes[_g];
				++_g;
				rules.push({ c : c, s : this.s, imp : false});
			}
			if(this.simp != null) {
				var _g1 = 0;
				while(_g1 < classes.length) {
					var c1 = classes[_g1];
					++_g1;
					rules.push({ c : c1, s : this.simp, imp : true});
				}
			}
		}
		return rules;
	}
	,parseClasses: function(css) {
		this.css = css;
		this.pos = 0;
		this.tokens = [];
		var c = this.readClasses();
		this.expect(haxe_ui_styles_Token.TEof);
		return c;
	}
	,readClasses: function() {
		var classes = [];
		while(true) {
			this.spacesTokens = true;
			this.isToken(haxe_ui_styles_Token.TSpaces);
			var c = this.readClass(null);
			this.spacesTokens = false;
			if(c == null) break;
			this.updateClass(c);
			classes.push(c);
			if(!this.isToken(haxe_ui_styles_Token.TComma)) break;
		}
		if(classes.length == 0) this.unexpected(this.readToken());
		return classes;
	}
	,updateClass: function(c) {
		var _g = c.node;
		if(_g != null) switch(_g) {
		case "div":
			c.node = "box";
			break;
		case "span":
			c.node = "label";
			break;
		case "h1":case "h2":case "h3":case "h4":
			c.pseudoClass = c.node;
			c.node = "label";
			break;
		}
		if(c.parent != null) this.updateClass(c.parent);
	}
	,readClass: function(parent) {
		var c = new haxe_ui_styles_CssClass();
		c.parent = parent;
		var def = false;
		var last = null;
		try {
			while(true) {
				var t = this.readToken();
				if(last == null) switch(t[1]) {
				case 18:
					def = true;
					break;
				case 15:case 5:case 4:
					last = t;
					break;
				case 0:
					var i = t[2];
					c.node = i;
					def = true;
					break;
				case 16:
					if(def) return this.readClass(c); else return null;
					break;
				case 13:case 9:case 10:
					this.tokens.push(t);
					throw "__break__";
					break;
				default:
					this.unexpected(t);
				} else switch(t[1]) {
				case 0:
					var i1 = t[2];
					switch(last[1]) {
					case 15:
						c.className = i1;
						def = true;
						break;
					case 5:
						c.id = i1;
						def = true;
						break;
					case 4:
						c.pseudoClass = i1;
						def = true;
						break;
					default:
						throw new js__$Boot_HaxeError("assert");
					}
					last = null;
					break;
				default:
					this.unexpected(t);
				}
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		if(def) return c; else return parent;
	}
	,readIdent: function() {
		var t = this.readToken();
		switch(t[1]) {
		case 0:
			var i = t[2];
			return i;
		default:
			return this.unexpected(t);
		}
	}
	,readValue: function(opt) {
		var t = this.readToken();
		var v;
		switch(t[1]) {
		case 5:
			v = haxe_ui_styles_Value.VHex(this.readHex());
			break;
		case 0:
			var i = t[2];
			v = haxe_ui_styles_Value.VIdent(i);
			break;
		case 1:
			var s = t[2];
			v = haxe_ui_styles_Value.VString(s);
			break;
		case 2:
			var i1 = t[2];
			v = this.readValueUnit(i1,i1);
			break;
		case 3:
			var f = t[2];
			v = this.readValueUnit(f,null);
			break;
		case 17:
			v = haxe_ui_styles_Value.VSlash;
			break;
		default:
			if(!opt) this.unexpected(t);
			this.tokens.push(t);
			v = null;
		}
		if(v != null) v = this.readValueNext(v);
		return v;
	}
	,readHex: function() {
		var start = this.pos;
		while(true) {
			var c = StringTools.fastCodeAt(this.css,this.pos++);
			if(c >= 65 && c <= 70 || c >= 97 && c <= 102 || c >= 48 && c <= 57) continue;
			this.pos--;
			break;
		}
		return HxOverrides.substr(this.css,start,this.pos - start);
	}
	,readValueUnit: function(f,i) {
		var t = this.readToken();
		switch(t[1]) {
		case 0:
			var i1 = t[2];
			return haxe_ui_styles_Value.VUnit(f,i1);
		case 11:
			return haxe_ui_styles_Value.VUnit(f,"%");
		default:
			this.tokens.push(t);
			if(i != null) return haxe_ui_styles_Value.VInt(i); else return haxe_ui_styles_Value.VFloat(f);
		}
	}
	,readValueNext: function(v) {
		var t = this.readToken();
		switch(t[1]) {
		case 6:
			switch(v[1]) {
			case 0:
				var i = v[2];
				switch(i) {
				case "url":
					return this.readValueNext(haxe_ui_styles_Value.VCall("url",[haxe_ui_styles_Value.VString(this.readUrl())]));
				default:
					var args;
					{
						var _g = this.readValue();
						var x = _g;
						switch(_g[1]) {
						case 6:
							var l = _g[2];
							args = l;
							break;
						default:
							args = [x];
						}
					}
					this.expect(haxe_ui_styles_Token.TPClose);
					return this.readValueNext(haxe_ui_styles_Value.VCall(i,args));
				}
				break;
			default:
				this.tokens.push(t);
				return v;
			}
			break;
		case 8:
			var t1 = this.readToken();
			switch(t1[1]) {
			case 0:
				var i1 = t1[2];
				return haxe_ui_styles_Value.VLabel(i1,v);
			default:
				return this.unexpected(t1);
			}
			break;
		case 9:
			return this.loopComma(v,this.readValue());
		default:
			this.tokens.push(t);
			var v2 = this.readValue(true);
			if(v2 == null) return v; else return this.loopNext(v,v2);
		}
	}
	,loopNext: function(v,v2) {
		switch(v2[1]) {
		case 7:
			var l = v2[2];
			l.unshift(v);
			return v2;
		case 6:
			var l1 = v2[2];
			l1[0] = this.loopNext(v,l1[0]);
			return v2;
		case 9:
			var v21 = v2[3];
			var lab = v2[2];
			return haxe_ui_styles_Value.VLabel(lab,this.loopNext(v,v21));
		default:
			return haxe_ui_styles_Value.VGroup([v,v2]);
		}
	}
	,loopComma: function(v,v2) {
		switch(v2[1]) {
		case 6:
			var l = v2[2];
			l.unshift(v);
			return v2;
		case 9:
			var v21 = v2[3];
			var lab = v2[2];
			return haxe_ui_styles_Value.VLabel(lab,this.loopComma(v,v21));
		default:
			return haxe_ui_styles_Value.VList([v,v2]);
		}
	}
	,isSpace: function(c) {
		return c == 32 || c == 10 || c == 13 || c == 9;
	}
	,isIdentChar: function(c) {
		return c >= 97 && c <= 122 || c >= 65 && c <= 90 || c == 45 || c == 95;
	}
	,isNum: function(c) {
		return c >= 48 && c <= 57;
	}
	,next: function() {
		return StringTools.fastCodeAt(this.css,this.pos++);
	}
	,readUrl: function() {
		var c0 = StringTools.fastCodeAt(this.css,this.pos++);
		while(c0 == 32 || c0 == 10 || c0 == 13 || c0 == 9) c0 = StringTools.fastCodeAt(this.css,this.pos++);
		var quote = c0;
		if(quote == 39 || quote == 34) {
			this.pos--;
			{
				var _g = this.readToken();
				switch(_g[1]) {
				case 1:
					var s = _g[2];
					var c01 = StringTools.fastCodeAt(this.css,this.pos++);
					while(c01 == 32 || c01 == 10 || c01 == 13 || c01 == 9) c01 = StringTools.fastCodeAt(this.css,this.pos++);
					if(c01 != 41) throw new js__$Boot_HaxeError("Invalid char " + String.fromCharCode(c01));
					return s;
				default:
					throw new js__$Boot_HaxeError("assert");
				}
			}
		}
		var start = this.pos - 1;
		while(true) {
			if(c0 != c0) break;
			c0 = StringTools.fastCodeAt(this.css,this.pos++);
			if(c0 == 41) break;
		}
		return StringTools.trim(HxOverrides.substr(this.css,start,this.pos - start - 1));
	}
	,readToken: function() {
		var t = this.tokens.pop();
		if(t != null) return t;
		while(true) {
			var c = StringTools.fastCodeAt(this.css,this.pos++);
			if(c != c) return haxe_ui_styles_Token.TEof;
			if(c == 32 || c == 10 || c == 13 || c == 9) {
				if(this.spacesTokens) {
					while(this.isSpace(StringTools.fastCodeAt(this.css,this.pos++))) {
					}
					this.pos--;
					return haxe_ui_styles_Token.TSpaces;
				}
				continue;
			}
			if(c >= 48 && c <= 57 || c == 45) {
				var i = 0;
				var neg = false;
				if(c == 45) {
					c = 48;
					neg = true;
				}
				do {
					i = i * 10 + (c - 48);
					c = StringTools.fastCodeAt(this.css,this.pos++);
				} while(c >= 48 && c <= 57);
				if(c == 46) {
					var f = i;
					var k = 0.1;
					while(this.isNum(c = StringTools.fastCodeAt(this.css,this.pos++))) {
						f += (c - 48) * k;
						k *= 0.1;
					}
					this.pos--;
					return haxe_ui_styles_Token.TFloat(neg?-f:f);
				}
				this.pos--;
				return haxe_ui_styles_Token.TInt(neg?-i:i);
			}
			if(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c == 45 || c == 95) {
				var pos = this.pos - 1;
				do c = StringTools.fastCodeAt(this.css,this.pos++); while(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c == 45 || c == 95 || c >= 48 && c <= 57);
				this.pos--;
				return haxe_ui_styles_Token.TIdent(HxOverrides.substr(this.css,pos,this.pos - pos));
			}
			switch(c) {
			case 58:
				return haxe_ui_styles_Token.TDblDot;
			case 35:
				return haxe_ui_styles_Token.TSharp;
			case 40:
				return haxe_ui_styles_Token.TPOpen;
			case 41:
				return haxe_ui_styles_Token.TPClose;
			case 33:
				return haxe_ui_styles_Token.TExclam;
			case 37:
				return haxe_ui_styles_Token.TPercent;
			case 59:
				return haxe_ui_styles_Token.TSemicolon;
			case 46:
				return haxe_ui_styles_Token.TDot;
			case 123:
				return haxe_ui_styles_Token.TBrOpen;
			case 125:
				return haxe_ui_styles_Token.TBrClose;
			case 44:
				return haxe_ui_styles_Token.TComma;
			case 42:
				return haxe_ui_styles_Token.TStar;
			case 47:
				if((c = StringTools.fastCodeAt(this.css,this.pos++)) != 42) {
					this.pos--;
					return haxe_ui_styles_Token.TSlash;
				}
				while(true) {
					while((c = StringTools.fastCodeAt(this.css,this.pos++)) != 42) if(c != c) throw new js__$Boot_HaxeError("Unclosed comment");
					c = StringTools.fastCodeAt(this.css,this.pos++);
					if(c == 47) break;
					if(c != c) throw new js__$Boot_HaxeError("Unclosed comment");
				}
				return this.readToken();
			case 39:case 34:
				var pos1 = this.pos;
				var k1;
				while((k1 = StringTools.fastCodeAt(this.css,this.pos++)) != c) {
					if(k1 != k1) throw new js__$Boot_HaxeError("Unclosed string constant");
					if(k1 == 92) {
						throw new js__$Boot_HaxeError("todo");
						continue;
					}
				}
				return haxe_ui_styles_Token.TString(HxOverrides.substr(this.css,pos1,this.pos - pos1 - 1));
			default:
			}
			this.pos--;
			throw new js__$Boot_HaxeError("Invalid char " + this.css.charAt(this.pos));
		}
		return null;
	}
	,__class__: haxe_ui_styles_Parser
};
var haxe_ui_styles_Style = function() {
};
$hxClasses["haxe.ui.styles.Style"] = haxe_ui_styles_Style;
haxe_ui_styles_Style.__name__ = ["haxe","ui","styles","Style"];
haxe_ui_styles_Style.prototype = {
	cursor: null
	,hidden: null
	,autoWidth: null
	,autoHeight: null
	,verticalSpacing: null
	,horizontalSpacing: null
	,offsetLeft: null
	,offsetTop: null
	,width: null
	,height: null
	,percentWidth: null
	,percentHeight: null
	,paddingTop: null
	,paddingLeft: null
	,paddingRight: null
	,paddingBottom: null
	,marginTop: null
	,marginLeft: null
	,marginRight: null
	,marginBottom: null
	,color: null
	,backgroundColor: null
	,backgroundColorEnd: null
	,backgroundGradientStyle: null
	,backgroundOpacity: null
	,backgroundImage: null
	,backgroundImageRepeat: null
	,backgroundImageClipTop: null
	,backgroundImageClipLeft: null
	,backgroundImageClipBottom: null
	,backgroundImageClipRight: null
	,backgroundImageSliceTop: null
	,backgroundImageSliceLeft: null
	,backgroundImageSliceBottom: null
	,backgroundImageSliceRight: null
	,borderColor: null
	,borderTopColor: null
	,borderLeftColor: null
	,borderBottomColor: null
	,borderRightColor: null
	,borderSize: null
	,borderTopSize: null
	,borderLeftSize: null
	,borderBottomSize: null
	,borderRightSize: null
	,borderRadius: null
	,borderOpacity: null
	,filter: null
	,icon: null
	,iconPosition: null
	,horizontalAlign: null
	,verticalAlign: null
	,opacity: null
	,clip: null
	,'native': null
	,fontName: null
	,fontSize: null
	,fontBold: null
	,fontUnderline: null
	,fontItalic: null
	,apply: function(s) {
		if(s.cursor != null) this.cursor = s.cursor;
		if(s.hidden != null) this.hidden = s.hidden;
		if(s.autoWidth != null) this.autoWidth = s.autoWidth;
		if(s.autoHeight != null) this.autoHeight = s.autoHeight;
		if(s.verticalSpacing != null) this.verticalSpacing = s.verticalSpacing;
		if(s.horizontalSpacing != null) this.horizontalSpacing = s.horizontalSpacing;
		if(s.offsetLeft != null) this.offsetLeft = s.offsetLeft;
		if(s.offsetTop != null) this.offsetTop = s.offsetTop;
		if(s.width != null) {
			this.width = s.width;
			this.autoWidth = false;
		}
		if(s.height != null) {
			this.height = s.height;
			this.autoHeight = false;
		}
		if(s.percentWidth != null) {
			this.percentWidth = s.percentWidth;
			this.autoWidth = false;
		}
		if(s.percentHeight != null) {
			this.percentHeight = s.percentHeight;
			this.autoHeight = false;
		}
		if(s.paddingTop != null) this.paddingTop = s.paddingTop;
		if(s.paddingLeft != null) this.paddingLeft = s.paddingLeft;
		if(s.paddingRight != null) this.paddingRight = s.paddingRight;
		if(s.paddingBottom != null) this.paddingBottom = s.paddingBottom;
		if(s.marginTop != null) this.marginTop = s.marginTop;
		if(s.marginLeft != null) this.marginLeft = s.marginLeft;
		if(s.marginRight != null) this.marginRight = s.marginRight;
		if(s.marginBottom != null) this.marginBottom = s.marginBottom;
		if(s.color != null) this.color = s.color;
		if(s.backgroundColor != null) {
			this.backgroundColor = s.backgroundColor;
			this.backgroundColorEnd = null;
		}
		if(s.backgroundColorEnd != null) this.backgroundColorEnd = s.backgroundColorEnd;
		if(s.backgroundGradientStyle != null) this.backgroundGradientStyle = s.backgroundGradientStyle;
		if(s.backgroundOpacity != null) this.backgroundOpacity = s.backgroundOpacity;
		if(s.backgroundImage != null) this.backgroundImage = s.backgroundImage;
		if(s.backgroundImageRepeat != null) this.backgroundImageRepeat = s.backgroundImageRepeat;
		if(s.backgroundImageClipTop != null) this.backgroundImageClipTop = s.backgroundImageClipTop;
		if(s.backgroundImageClipLeft != null) this.backgroundImageClipLeft = s.backgroundImageClipLeft;
		if(s.backgroundImageClipBottom != null) this.backgroundImageClipBottom = s.backgroundImageClipBottom;
		if(s.backgroundImageClipRight != null) this.backgroundImageClipRight = s.backgroundImageClipRight;
		if(s.backgroundImageSliceTop != null) this.backgroundImageSliceTop = s.backgroundImageSliceTop;
		if(s.backgroundImageSliceLeft != null) this.backgroundImageSliceLeft = s.backgroundImageSliceLeft;
		if(s.backgroundImageSliceBottom != null) this.backgroundImageSliceBottom = s.backgroundImageSliceBottom;
		if(s.backgroundImageSliceRight != null) this.backgroundImageSliceRight = s.backgroundImageSliceRight;
		if(s.borderColor != null) this.borderColor = s.borderColor;
		if(s.borderTopColor != null) this.borderTopColor = s.borderTopColor;
		if(s.borderLeftColor != null) this.borderLeftColor = s.borderLeftColor;
		if(s.borderBottomColor != null) this.borderBottomColor = s.borderBottomColor;
		if(s.borderRightColor != null) this.borderRightColor = s.borderRightColor;
		if(s.borderSize != null) this.borderSize = s.borderSize;
		if(s.borderTopSize != null) this.borderTopSize = s.borderTopSize;
		if(s.borderLeftSize != null) this.borderLeftSize = s.borderLeftSize;
		if(s.borderBottomSize != null) this.borderBottomSize = s.borderBottomSize;
		if(s.borderRightSize != null) this.borderRightSize = s.borderRightSize;
		if(s.borderRadius != null) this.borderRadius = s.borderRadius;
		if(s.borderOpacity != null) this.borderOpacity = s.borderOpacity;
		if(s.filter != null) this.filter = s.filter.slice();
		if(s.icon != null) this.icon = s.icon;
		if(s.iconPosition != null) this.iconPosition = s.iconPosition;
		if(s.horizontalAlign != null) this.horizontalAlign = s.horizontalAlign;
		if(s.verticalAlign != null) this.verticalAlign = s.verticalAlign;
		if(s.opacity != null) this.opacity = s.opacity;
		if(s.clip != null) this.clip = s.clip;
		if(s["native"] != null) this["native"] = s["native"];
		if(s.fontName != null) this.fontName = s.fontName;
		if(s.fontSize != null) this.fontSize = s.fontSize;
		if(s.fontBold != null) this.fontBold = s.fontBold;
		if(s.fontUnderline != null) this.fontUnderline = s.fontUnderline;
		if(s.fontItalic != null) this.fontItalic = s.fontItalic;
		this.assignNulls();
	}
	,equalTo: function(s) {
		if(s.cursor != this.cursor) return false;
		if(s.hidden != this.hidden) return false;
		if(s.autoWidth != this.autoWidth) return false;
		if(s.autoHeight != this.autoHeight) return false;
		if(s.verticalSpacing != this.verticalSpacing) return false;
		if(s.horizontalSpacing != this.horizontalSpacing) return false;
		if(s.offsetLeft != this.offsetLeft) return false;
		if(s.offsetTop != this.offsetTop) return false;
		if(s.width != this.width) return false;
		if(s.height != this.height) return false;
		if(s.percentWidth != this.percentWidth) return false;
		if(s.percentHeight != this.percentHeight) return false;
		if(s.paddingTop != this.paddingTop) return false;
		if(s.paddingLeft != this.paddingLeft) return false;
		if(s.paddingRight != this.paddingRight) return false;
		if(s.paddingBottom != this.paddingBottom) return false;
		if(s.marginTop != this.marginTop) return false;
		if(s.marginLeft != this.marginLeft) return false;
		if(s.marginRight != this.marginRight) return false;
		if(s.marginBottom != this.marginBottom) return false;
		if(s.color != this.color) return false;
		if(s.backgroundColor != this.backgroundColor) return false;
		if(s.backgroundColorEnd != this.backgroundColorEnd) return false;
		if(s.backgroundGradientStyle != this.backgroundGradientStyle) return false;
		if(s.backgroundOpacity != this.backgroundOpacity) return false;
		if(s.backgroundImage != this.backgroundImage) return false;
		if(s.backgroundImageRepeat != this.backgroundImageRepeat) return false;
		if(s.backgroundImageClipTop != this.backgroundImageClipTop) return false;
		if(s.backgroundImageClipLeft != this.backgroundImageClipLeft) return false;
		if(s.backgroundImageClipBottom != this.backgroundImageClipBottom) return false;
		if(s.backgroundImageClipRight != this.backgroundImageClipRight) return false;
		if(s.backgroundImageSliceTop != this.backgroundImageSliceTop) return false;
		if(s.backgroundImageSliceLeft != this.backgroundImageSliceLeft) return false;
		if(s.backgroundImageSliceBottom != this.backgroundImageSliceBottom) return false;
		if(s.backgroundImageSliceRight != this.backgroundImageSliceRight) return false;
		if(s.borderColor != this.borderColor) return false;
		if(s.borderTopColor != this.borderTopColor) return false;
		if(s.borderLeftColor != this.borderLeftColor) return false;
		if(s.borderBottomColor != this.borderBottomColor) return false;
		if(s.borderRightColor != this.borderRightColor) return false;
		if(s.borderSize != this.borderSize) return false;
		if(s.borderTopSize != this.borderTopSize) return false;
		if(s.borderLeftSize != this.borderLeftSize) return false;
		if(s.borderBottomSize != this.borderBottomSize) return false;
		if(s.borderRightSize != this.borderRightSize) return false;
		if(s.borderRadius != this.borderRadius) return false;
		if(s.borderOpacity != this.borderOpacity) return false;
		if(s.filter != this.filter) return false;
		if(s.icon != this.icon) return false;
		if(s.iconPosition != this.iconPosition) return false;
		if(s.horizontalAlign != this.horizontalAlign) return false;
		if(s.verticalAlign != this.verticalAlign) return false;
		if(s.opacity != this.opacity) return false;
		if(s.clip != this.clip) return false;
		if(s["native"] != this["native"]) return false;
		if(s.fontName != this.fontName) return false;
		if(s.fontSize != this.fontSize) return false;
		if(s.fontBold != this.fontBold) return false;
		if(s.fontUnderline != this.fontUnderline) return false;
		if(s.fontItalic != this.fontItalic) return false;
		return true;
	}
	,assignNulls: function() {
		if(this.color == -2147483648) this.color = null;
		if(this.backgroundColor == -2147483648) {
			this.backgroundColor = null;
			this.backgroundColorEnd = null;
		}
		if(this.backgroundColorEnd == -2147483648) {
			this.backgroundColor = null;
			this.backgroundColorEnd = null;
		}
		if(this.borderSize == -2147483648) this.borderSize = null;
		if(this.borderTopSize == -2147483648) this.borderTopSize = null;
		if(this.borderLeftSize == -2147483648) this.borderLeftSize = null;
		if(this.borderBottomSize == -2147483648) this.borderBottomSize = null;
		if(this.borderRightSize == -2147483648) this.borderRightSize = null;
		if(this.borderRadius == -2147483648) this.borderRadius = null;
		if(this.borderColor == -2147483648) this.borderColor = null;
		if(this.borderTopColor == -2147483648) this.borderTopColor = null;
		if(this.borderLeftColor == -2147483648) this.borderLeftColor = null;
		if(this.borderBottomColor == -2147483648) this.borderBottomColor = null;
		if(this.borderRightColor == -2147483648) this.borderRightColor = null;
		if(this.filter != null && this.filter[0] == "none") this.filter = null;
		if(this.icon == "none") this.icon = null;
	}
	,padding: function(v) {
		this.paddingTop = v;
		this.paddingLeft = v;
		this.paddingRight = v;
		this.paddingBottom = v;
	}
	,margin: function(v) {
		this.marginTop = v;
		this.marginLeft = v;
		this.marginRight = v;
		this.marginBottom = v;
	}
	,toString: function() {
		var fields = [];
		var _g = 0;
		var _g1 = Type.getInstanceFields(haxe_ui_styles_Style);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			var v = Reflect.field(this,f);
			if(v == null || Reflect.isFunction(v) || f == "toString" || f == "apply") continue;
			if(f.toLowerCase().indexOf("color") >= 0 && ((v | 0) === v)) v = "#" + StringTools.hex(v,6);
			fields.push(f + ": " + Std.string(v));
		}
		return "{" + fields.join(", ") + "}";
	}
	,__class__: haxe_ui_styles_Style
};
var haxe_ui_themes_Theme = function() {
	this.styles = [];
	this.parent = null;
};
$hxClasses["haxe.ui.themes.Theme"] = haxe_ui_themes_Theme;
haxe_ui_themes_Theme.__name__ = ["haxe","ui","themes","Theme"];
haxe_ui_themes_Theme.prototype = {
	parent: null
	,styles: null
	,__class__: haxe_ui_themes_Theme
};
var haxe_ui_themes_ThemeManager = function() {
	this._themes = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.themes.ThemeManager"] = haxe_ui_themes_ThemeManager;
haxe_ui_themes_ThemeManager.__name__ = ["haxe","ui","themes","ThemeManager"];
haxe_ui_themes_ThemeManager.__properties__ = {get_instance:"get_instance"}
haxe_ui_themes_ThemeManager.get_instance = function() {
	if(haxe_ui_themes_ThemeManager._instance == null) haxe_ui_themes_ThemeManager._instance = new haxe_ui_themes_ThemeManager();
	return haxe_ui_themes_ThemeManager._instance;
};
haxe_ui_themes_ThemeManager.prototype = {
	_themes: null
	,getTheme: function(themeName) {
		var theme = this._themes.get(themeName);
		if(theme == null) {
			theme = new haxe_ui_themes_Theme();
			this._themes.set(themeName,theme);
		}
		return theme;
	}
	,addStyleResource: function(themeName,resourceId) {
		this.getTheme(themeName).styles.push(resourceId);
	}
	,applyTheme: function(themeName) {
		this.applyThemeStyles("global");
		this.applyThemeStyles(themeName);
	}
	,applyThemeStyles: function(themeName) {
		var theme = this._themes.get(themeName);
		if(theme.parent != null) this.applyThemeStyles(theme.parent);
		var styles = theme.styles;
		styles.reverse();
		var _g = 0;
		while(_g < styles.length) {
			var s = styles[_g];
			++_g;
			var css = haxe_ui_Toolkit.get_assets().getText(s);
			if(css != null) haxe_ui_Toolkit.styleSheet.addRules(css); else {
			}
		}
	}
	,__class__: haxe_ui_themes_ThemeManager
};
var haxe_ui_util_CallStackHelper = function() { };
$hxClasses["haxe.ui.util.CallStackHelper"] = haxe_ui_util_CallStackHelper;
haxe_ui_util_CallStackHelper.__name__ = ["haxe","ui","util","CallStackHelper"];
haxe_ui_util_CallStackHelper.traceCallStack = function() {
	var arr = haxe_CallStack.callStack();
	if(arr == null) {
		haxe_Log.trace("Callstack is null!",{ fileName : "CallStackHelper.hx", lineNumber : 9, className : "haxe.ui.util.CallStackHelper", methodName : "traceCallStack"});
		return;
	}
	haxe_Log.trace(haxe_CallStack.toString(arr),{ fileName : "CallStackHelper.hx", lineNumber : 12, className : "haxe.ui.util.CallStackHelper", methodName : "traceCallStack"});
	haxe_Log.trace(">>>>>>>>>>>>>>>>>>>>>>>>>>>> END >>>>>>>>>>>>>>>>>>>>>>>>>>>>",{ fileName : "CallStackHelper.hx", lineNumber : 13, className : "haxe.ui.util.CallStackHelper", methodName : "traceCallStack"});
};
haxe_ui_util_CallStackHelper.traceExceptionStack = function() {
	var arr = haxe_CallStack.exceptionStack();
	if(arr == null) {
		haxe_Log.trace("Callstack is null!",{ fileName : "CallStackHelper.hx", lineNumber : 19, className : "haxe.ui.util.CallStackHelper", methodName : "traceExceptionStack"});
		return;
	}
	haxe_Log.trace(haxe_CallStack.toString(arr),{ fileName : "CallStackHelper.hx", lineNumber : 22, className : "haxe.ui.util.CallStackHelper", methodName : "traceExceptionStack"});
	haxe_Log.trace(">>>>>>>>>>>>>>>>>>>>>>>>>>>> END >>>>>>>>>>>>>>>>>>>>>>>>>>>>",{ fileName : "CallStackHelper.hx", lineNumber : 23, className : "haxe.ui.util.CallStackHelper", methodName : "traceExceptionStack"});
};
haxe_ui_util_CallStackHelper.getCallStackString = function() {
	var arr = haxe_CallStack.callStack();
	if(arr == null) throw new js__$Boot_HaxeError("Callstack is null!");
	return haxe_CallStack.toString(arr);
};
var haxe_ui_util_CallbackMap = function() {
	this._map = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.util.CallbackMap"] = haxe_ui_util_CallbackMap;
haxe_ui_util_CallbackMap.__name__ = ["haxe","ui","util","CallbackMap"];
haxe_ui_util_CallbackMap.prototype = {
	_map: null
	,add: function(key,callback) {
		var b = false;
		var arr = this._map.get(key);
		if(arr == null) {
			arr = new haxe_ui_util_FunctionArray();
			arr.push(callback);
			this._map.set(key,arr);
			b = true;
		} else if(arr.contains(callback) == false) arr.push(callback);
		return b;
	}
	,remove: function(key,callback) {
		var b = false;
		var arr = this._map.get(key);
		if(arr != null) {
			arr.remove(callback);
			if(arr.get_length() == 0) {
				this._map.remove(key);
				b = true;
			}
		}
		return b;
	}
	,removeAll: function(key) {
		var arr = this._map.get(key);
		if(arr != null) {
			while(arr.get_length() > 0) arr.remove(arr.get(0));
			this._map.remove(key);
		}
	}
	,invoke: function(key,param) {
		var arr = this._map.get(key);
		if(arr != null) {
			arr = arr.copy();
			var $it0 = arr.iterator();
			while( $it0.hasNext() ) {
				var fn = $it0.next();
				fn(param);
			}
		}
	}
	,invokeAndRemove: function(key,param) {
		var arr = this._map.get(key);
		if(arr != null) {
			arr = arr.copy();
			this.removeAll(key);
			var $it0 = arr.iterator();
			while( $it0.hasNext() ) {
				var fn = $it0.next();
				fn(param);
			}
		}
	}
	,count: function(key) {
		var n = 0;
		var arr = this._map.get(key);
		if(arr != null) n = arr.get_length();
		return n;
	}
	,__class__: haxe_ui_util_CallbackMap
};
var haxe_ui_util_ColorUtil = function() { };
$hxClasses["haxe.ui.util.ColorUtil"] = haxe_ui_util_ColorUtil;
haxe_ui_util_ColorUtil.__name__ = ["haxe","ui","util","ColorUtil"];
haxe_ui_util_ColorUtil.buildColorArray = function(startColor,endColor,size) {
	var array = [];
	var r1 = startColor >> 16 & 255;
	var g1 = startColor >> 8 & 255;
	var b1 = startColor & 255;
	var r2 = endColor >> 16 & 255;
	var g2 = endColor >> 8 & 255;
	var b2 = endColor & 255;
	var rd = r2 - r1;
	var gd = g2 - g1;
	var bd = b2 - b1;
	var ri = rd / (size - 1);
	var gi = gd / (size - 1);
	var bi = bd / (size - 1);
	var r = r1;
	var g = g1;
	var b = b1;
	var _g1 = 0;
	var _g = size;
	while(_g1 < _g) {
		var n = _g1++;
		var c = Math.round(r) << 16 | Math.round(g) << 8 | Math.round(b);
		array.push(c);
		r += ri;
		g += gi;
		b += bi;
	}
	return array;
};
haxe_ui_util_ColorUtil.parseColor = function(s) {
	if(StringTools.startsWith(s,"#")) s = s.substring(1,s.length); else if(StringTools.startsWith(s,"0x")) s = s.substring(2,s.length);
	return Std.parseInt("0xFF" + s);
};
haxe_ui_util_ColorUtil.color = function(r,g,b) {
	return Math.round(r) << 16 | Math.round(g) << 8 | Math.round(b);
};
haxe_ui_util_ColorUtil.r = function(c) {
	return c >> 16 & 255;
};
haxe_ui_util_ColorUtil.g = function(c) {
	return c >> 8 & 255;
};
haxe_ui_util_ColorUtil.b = function(c) {
	return c & 255;
};
var haxe_ui_util_EventMap = function() {
	this._map = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.util.EventMap"] = haxe_ui_util_EventMap;
haxe_ui_util_EventMap.__name__ = ["haxe","ui","util","EventMap"];
haxe_ui_util_EventMap.prototype = {
	_map: null
	,add: function(type,listener) {
		var b = false;
		var arr = this._map.get(type);
		if(arr == null) {
			arr = new haxe_ui_util_FunctionArray();
			arr.push(listener);
			this._map.set(type,arr);
			b = true;
		} else if(arr.contains(listener) == false) arr.push(listener);
		return b;
	}
	,remove: function(type,listener) {
		var b = false;
		var arr = this._map.get(type);
		if(arr != null) {
			arr.remove(listener);
			if(arr.get_length() == 0) {
				this._map.remove(type);
				b = true;
			}
		}
		return b;
	}
	,invoke: function(type,event,target) {
		var arr = this._map.get(type);
		if(arr != null) {
			arr = arr.copy();
			var $it0 = arr.iterator();
			while( $it0.hasNext() ) {
				var fn = $it0.next();
				var c = event.clone();
				c.target = target;
				fn(c);
			}
		}
	}
	,listenerCount: function(type) {
		var n = 0;
		var arr = this._map.get(type);
		if(arr != null) n = arr.get_length();
		return n;
	}
	,__class__: haxe_ui_util_EventMap
};
var haxe_ui_util_FunctionArray = function(array) {
	if(array == null) this._array = []; else this._array = array;
};
$hxClasses["haxe.ui.util.FunctionArray"] = haxe_ui_util_FunctionArray;
haxe_ui_util_FunctionArray.__name__ = ["haxe","ui","util","FunctionArray"];
haxe_ui_util_FunctionArray.prototype = {
	_array: null
	,get: function(index) {
		return this._array[index];
	}
	,length: null
	,get_length: function() {
		return this._array.length;
	}
	,push: function(x) {
		return this._array.push(x);
	}
	,pop: function() {
		return this._array.pop();
	}
	,indexOf: function(x,fromIndex) {
		if(fromIndex == null) fromIndex = 0;
		return HxOverrides.indexOf(this._array,x,fromIndex != null?fromIndex:0);
	}
	,remove: function(x) {
		return HxOverrides.remove(this._array,x);
	}
	,contains: function(x) {
		return this.indexOf(x) != -1;
	}
	,iterator: function() {
		return HxOverrides.iter(this._array);
	}
	,copy: function() {
		return new haxe_ui_util_FunctionArray(this._array.slice());
	}
	,toString: function() {
		var s = "[";
		var iter = this.iterator();
		while(iter.hasNext()) {
			s += Std.string(iter.next());
			if(iter.hasNext()) s += ", ";
		}
		s += "]";
		return s;
	}
	,__class__: haxe_ui_util_FunctionArray
	,__properties__: {get_length:"get_length"}
};
var haxe_ui_util_GUID = function() { };
$hxClasses["haxe.ui.util.GUID"] = haxe_ui_util_GUID;
haxe_ui_util_GUID.__name__ = ["haxe","ui","util","GUID"];
haxe_ui_util_GUID.randomIntegerWithinRange = function(min,max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
};
haxe_ui_util_GUID.createRandomIdentifier = function(length,radix) {
	if(radix == null) radix = 61;
	var characters = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	var id = [];
	if(radix > 61) radix = 61; else radix = radix;
	while(length-- > 0) id.push(characters[Math.floor(Math.random() * (1 + radix))]);
	return id.join("");
};
haxe_ui_util_GUID.uuid = function() {
	var specialChars = ["8","9","A","B"];
	return haxe_ui_util_GUID.createRandomIdentifier(8,15) + "-" + haxe_ui_util_GUID.createRandomIdentifier(4,15) + "-4" + haxe_ui_util_GUID.createRandomIdentifier(3,15) + "-" + specialChars[Math.floor(Math.random() * 4)] + haxe_ui_util_GUID.createRandomIdentifier(3,15) + "-" + haxe_ui_util_GUID.createRandomIdentifier(12,15);
};
var haxe_ui_util_MathUtil = function() { };
$hxClasses["haxe.ui.util.MathUtil"] = haxe_ui_util_MathUtil;
haxe_ui_util_MathUtil.__name__ = ["haxe","ui","util","MathUtil"];
var haxe_ui_util_Rectangle = function(left,top,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(top == null) top = 0;
	if(left == null) left = 0;
	this.left = left;
	this.top = top;
	this.width = width;
	this.height = height;
};
$hxClasses["haxe.ui.util.Rectangle"] = haxe_ui_util_Rectangle;
haxe_ui_util_Rectangle.__name__ = ["haxe","ui","util","Rectangle"];
haxe_ui_util_Rectangle.prototype = {
	left: null
	,top: null
	,width: null
	,height: null
	,get_right: function() {
		return this.left + this.width;
	}
	,set_right: function(value) {
		this.width = value - this.left;
		return value;
	}
	,get_bottom: function() {
		return this.top + this.height;
	}
	,set_bottom: function(value) {
		this.height = value - this.top;
		return value;
	}
	,inflate: function(dx,dy) {
		this.left -= dx;
		this.width += dx * 2;
		this.top -= dy;
		this.height += dy * 2;
	}
	,toString: function() {
		return "{left: " + this.left + ", top: " + this.top + ", width: " + this.width + ", height: " + this.height + "}";
	}
	,__class__: haxe_ui_util_Rectangle
	,__properties__: {set_bottom:"set_bottom",get_bottom:"get_bottom",set_right:"set_right",get_right:"get_right"}
};
var haxe_ui_util_Size = function(width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	this.width = width;
	this.height = height;
};
$hxClasses["haxe.ui.util.Size"] = haxe_ui_util_Size;
haxe_ui_util_Size.__name__ = ["haxe","ui","util","Size"];
haxe_ui_util_Size.prototype = {
	width: null
	,height: null
	,toString: function() {
		return "[" + this.width + "x" + this.height + "]";
	}
	,__class__: haxe_ui_util_Size
};
var haxe_ui_util_Slice9 = function() { };
$hxClasses["haxe.ui.util.Slice9"] = haxe_ui_util_Slice9;
haxe_ui_util_Slice9.__name__ = ["haxe","ui","util","Slice9"];
haxe_ui_util_Slice9.buildRects = function(w,h,bitmapWidth,bitmapHeight,slice) {
	var srcRects = haxe_ui_util_Slice9.buildSrcRects(bitmapWidth,bitmapHeight,slice);
	var dstRects = haxe_ui_util_Slice9.buildDstRects(w,h,srcRects);
	return { src : srcRects, dst : dstRects};
};
haxe_ui_util_Slice9.buildSrcRects = function(bitmapWidth,bitmapHeight,slice) {
	var x1 = slice.left;
	var y1 = slice.top;
	var x2 = slice.get_right();
	var y2 = slice.get_bottom();
	var srcRects = [];
	srcRects.push(new haxe_ui_util_Rectangle(0,0,x1,y1));
	srcRects.push(new haxe_ui_util_Rectangle(x1,0,x2 - x1,y1));
	srcRects.push(new haxe_ui_util_Rectangle(x2,0,bitmapWidth - x2,y1));
	srcRects.push(new haxe_ui_util_Rectangle(0,y1,x1,y2 - y1));
	srcRects.push(new haxe_ui_util_Rectangle(x1,y1,x2 - x1,y2 - y1));
	srcRects.push(new haxe_ui_util_Rectangle(x2,y1,bitmapWidth - x2,y2 - y1));
	srcRects.push(new haxe_ui_util_Rectangle(0,y2,x1,bitmapHeight - y2));
	srcRects.push(new haxe_ui_util_Rectangle(x1,y2,x2 - x1,bitmapHeight - y2));
	srcRects.push(new haxe_ui_util_Rectangle(x2,y2,bitmapWidth - x2,bitmapHeight - y2));
	return srcRects;
};
haxe_ui_util_Slice9.buildDstRects = function(w,h,srcRects) {
	var dstRects = [];
	dstRects.push(srcRects[0]);
	dstRects.push(new haxe_ui_util_Rectangle(srcRects[0].width,0,w - srcRects[0].width - srcRects[2].width,srcRects[1].height));
	dstRects.push(new haxe_ui_util_Rectangle(w - srcRects[2].width,0,srcRects[2].width,srcRects[2].height));
	dstRects.push(new haxe_ui_util_Rectangle(0,srcRects[0].height,srcRects[3].width,h - srcRects[0].height - srcRects[6].height));
	dstRects.push(new haxe_ui_util_Rectangle(srcRects[3].width,srcRects[0].height,w - srcRects[3].width - srcRects[5].width,h - srcRects[1].height - srcRects[7].height));
	dstRects.push(new haxe_ui_util_Rectangle(w - srcRects[5].width,srcRects[2].height,srcRects[5].width,h - srcRects[2].height - srcRects[8].height));
	dstRects.push(new haxe_ui_util_Rectangle(0,h - srcRects[6].height,srcRects[6].width,srcRects[6].height));
	dstRects.push(new haxe_ui_util_Rectangle(srcRects[6].width,h - srcRects[7].height,w - srcRects[6].width - srcRects[8].width,srcRects[7].height));
	dstRects.push(new haxe_ui_util_Rectangle(w - srcRects[8].width,h - srcRects[8].height,srcRects[8].width,srcRects[8].height));
	return dstRects;
};
var haxe_ui_util_StringUtil = function() { };
$hxClasses["haxe.ui.util.StringUtil"] = haxe_ui_util_StringUtil;
haxe_ui_util_StringUtil.__name__ = ["haxe","ui","util","StringUtil"];
haxe_ui_util_StringUtil.capitalizeFirstLetter = function(s) {
	s = HxOverrides.substr(s,0,1).toUpperCase() + HxOverrides.substr(s,1,s.length);
	return s;
};
haxe_ui_util_StringUtil.capitalizeHyphens = function(s) {
	var r = s;
	var n = r.indexOf("-");
	while(n != -1) {
		var before = HxOverrides.substr(r,0,n);
		var after = HxOverrides.substr(r,n + 1,r.length);
		r = before + haxe_ui_util_StringUtil.capitalizeFirstLetter(after);
		n = r.indexOf("-",n + 1);
	}
	return r;
};
var haxe_ui_util_Timer = function(delay,callback) {
	haxe_ui_backend_TimerBase.call(this,delay,callback);
};
$hxClasses["haxe.ui.util.Timer"] = haxe_ui_util_Timer;
haxe_ui_util_Timer.__name__ = ["haxe","ui","util","Timer"];
haxe_ui_util_Timer.__super__ = haxe_ui_backend_TimerBase;
haxe_ui_util_Timer.prototype = $extend(haxe_ui_backend_TimerBase.prototype,{
	stop: function() {
		haxe_ui_backend_TimerBase.prototype.stop.call(this);
	}
	,__class__: haxe_ui_util_Timer
});
var haxe_ui_util_VariantType = $hxClasses["haxe.ui.util.VariantType"] = { __ename__ : ["haxe","ui","util","VariantType"], __constructs__ : ["Int","Float","String","Bool"] };
haxe_ui_util_VariantType.Int = function(s) { var $x = ["Int",0,s]; $x.__enum__ = haxe_ui_util_VariantType; $x.toString = $estr; return $x; };
haxe_ui_util_VariantType.Float = function(s) { var $x = ["Float",1,s]; $x.__enum__ = haxe_ui_util_VariantType; $x.toString = $estr; return $x; };
haxe_ui_util_VariantType.String = function(s) { var $x = ["String",2,s]; $x.__enum__ = haxe_ui_util_VariantType; $x.toString = $estr; return $x; };
haxe_ui_util_VariantType.Bool = function(s) { var $x = ["Bool",3,s]; $x.__enum__ = haxe_ui_util_VariantType; $x.toString = $estr; return $x; };
var haxe_ui_util__$Variant_Variant_$Impl_$ = {};
$hxClasses["haxe.ui.util._Variant.Variant_Impl_"] = haxe_ui_util__$Variant_Variant_$Impl_$;
haxe_ui_util__$Variant_Variant_$Impl_$.__name__ = ["haxe","ui","util","_Variant","Variant_Impl_"];
haxe_ui_util__$Variant_Variant_$Impl_$.__properties__ = {get_isNull:"get_isNull",get_isBool:"get_isBool",get_isNumber:"get_isNumber",get_isFloat:"get_isFloat",get_isInt:"get_isInt",get_isString:"get_isString"}
haxe_ui_util__$Variant_Variant_$Impl_$.fromString = function(s) {
	return haxe_ui_util_VariantType.String(s);
};
haxe_ui_util__$Variant_Variant_$Impl_$.toString = function(this1) {
	switch(this1[1]) {
	case 2:
		var s = this1[2];
		return s;
	case 0:
		var s1 = this1[2];
		if(s1 == null) return "null"; else return "" + s1;
		break;
	case 1:
		var s2 = this1[2];
		if(s2 == null) return "null"; else return "" + s2;
		break;
	case 3:
		var s3 = this1[2];
		if(s3 == null) return "null"; else return "" + s3;
		break;
	}
};
haxe_ui_util__$Variant_Variant_$Impl_$.get_isString = function(this1) {
	switch(this1[1]) {
	case 2:
		return true;
	default:
		return false;
	}
};
haxe_ui_util__$Variant_Variant_$Impl_$.fromInt = function(s) {
	return haxe_ui_util_VariantType.Int(s);
};
haxe_ui_util__$Variant_Variant_$Impl_$.toInt = function(this1) {
	switch(this1[1]) {
	case 0:
		var s = this1[2];
		return s;
	case 1:
		var s1 = this1[2];
		return s1 | 0;
	default:
		throw new js__$Boot_HaxeError("Variant Type Error");
	}
};
haxe_ui_util__$Variant_Variant_$Impl_$.get_isInt = function(this1) {
	switch(this1[1]) {
	case 0:
		return true;
	default:
		return false;
	}
};
haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat = function(s) {
	return haxe_ui_util_VariantType.Float(s);
};
haxe_ui_util__$Variant_Variant_$Impl_$.toFloat = function(this1) {
	switch(this1[1]) {
	case 1:
		var s = this1[2];
		return s;
	default:
		throw new js__$Boot_HaxeError("Variant Type Error");
	}
};
haxe_ui_util__$Variant_Variant_$Impl_$.get_isFloat = function(this1) {
	switch(this1[1]) {
	case 1:
		return true;
	default:
		return false;
	}
};
haxe_ui_util__$Variant_Variant_$Impl_$.get_isNumber = function(this1) {
	switch(this1[1]) {
	case 0:case 1:
		return true;
	default:
		return false;
	}
};
haxe_ui_util__$Variant_Variant_$Impl_$.toNumber = function(this1) {
	switch(this1[1]) {
	case 0:
		var s = this1[2];
		return s;
	case 1:
		var s1 = this1[2];
		return s1;
	default:
		throw new js__$Boot_HaxeError("Variant Type Error");
	}
};
haxe_ui_util__$Variant_Variant_$Impl_$.fromBool = function(s) {
	return haxe_ui_util_VariantType.Bool(s);
};
haxe_ui_util__$Variant_Variant_$Impl_$.toBool = function(this1) {
	switch(this1[1]) {
	case 3:
		var s = this1[2];
		return s;
	default:
		throw new js__$Boot_HaxeError("Variant Type Error");
	}
};
haxe_ui_util__$Variant_Variant_$Impl_$.get_isBool = function(this1) {
	switch(this1[1]) {
	case 3:
		return true;
	default:
	}
	return false;
};
haxe_ui_util__$Variant_Variant_$Impl_$.add = function(this1,rhs) {
	if((function($this) {
		var $r;
		switch(this1[1]) {
		case 0:case 1:
			$r = true;
			break;
		default:
			$r = false;
		}
		return $r;
	}(this)) && (function($this) {
		var $r;
		switch(rhs[1]) {
		case 0:case 1:
			$r = true;
			break;
		default:
			$r = false;
		}
		return $r;
	}(this))) return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(haxe_ui_util__$Variant_Variant_$Impl_$.toNumber(this1) + haxe_ui_util__$Variant_Variant_$Impl_$.toNumber(rhs)); else if(haxe_ui_util__$Variant_Variant_$Impl_$.get_isString(this1) && haxe_ui_util__$Variant_Variant_$Impl_$.get_isString(rhs)) return haxe_ui_util__$Variant_Variant_$Impl_$.fromString(haxe_ui_util__$Variant_Variant_$Impl_$.toString(this1) + haxe_ui_util__$Variant_Variant_$Impl_$.toString(rhs));
	throw new js__$Boot_HaxeError("Variant operation error");
};
haxe_ui_util__$Variant_Variant_$Impl_$.postInc = function(this1) {
	if((function($this) {
		var $r;
		switch(this1[1]) {
		case 0:case 1:
			$r = true;
			break;
		default:
			$r = false;
		}
		return $r;
	}(this))) {
		var v = haxe_ui_util__$Variant_Variant_$Impl_$.toNumber(this1);
		v++;
		this1 = haxe_ui_util_VariantType.Float(v);
		return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(v);
	}
	throw new js__$Boot_HaxeError("Variant operation error");
};
haxe_ui_util__$Variant_Variant_$Impl_$.preInc = function(this1) {
	if((function($this) {
		var $r;
		switch(this1[1]) {
		case 0:case 1:
			$r = true;
			break;
		default:
			$r = false;
		}
		return $r;
	}(this))) {
		var v = haxe_ui_util__$Variant_Variant_$Impl_$.toNumber(this1);
		++v;
		this1 = haxe_ui_util_VariantType.Float(v);
		return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(v);
	}
	throw new js__$Boot_HaxeError("Variant operation error");
};
haxe_ui_util__$Variant_Variant_$Impl_$.subtract = function(this1,rhs) {
	if((function($this) {
		var $r;
		switch(this1[1]) {
		case 0:case 1:
			$r = true;
			break;
		default:
			$r = false;
		}
		return $r;
	}(this)) && (function($this) {
		var $r;
		switch(rhs[1]) {
		case 0:case 1:
			$r = true;
			break;
		default:
			$r = false;
		}
		return $r;
	}(this))) return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(haxe_ui_util__$Variant_Variant_$Impl_$.toNumber(this1) - haxe_ui_util__$Variant_Variant_$Impl_$.toNumber(rhs)); else if(haxe_ui_util__$Variant_Variant_$Impl_$.get_isString(this1) && haxe_ui_util__$Variant_Variant_$Impl_$.get_isString(rhs)) return haxe_ui_util__$Variant_Variant_$Impl_$.fromString(StringTools.replace(haxe_ui_util__$Variant_Variant_$Impl_$.toString(this1),haxe_ui_util__$Variant_Variant_$Impl_$.toString(rhs),""));
	throw new js__$Boot_HaxeError("Variant operation error");
};
haxe_ui_util__$Variant_Variant_$Impl_$.postDeinc = function(this1) {
	if((function($this) {
		var $r;
		switch(this1[1]) {
		case 0:case 1:
			$r = true;
			break;
		default:
			$r = false;
		}
		return $r;
	}(this))) {
		var v = haxe_ui_util__$Variant_Variant_$Impl_$.toNumber(this1);
		v--;
		this1 = haxe_ui_util_VariantType.Float(v);
		return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(v);
	}
	throw new js__$Boot_HaxeError("Variant operation error");
};
haxe_ui_util__$Variant_Variant_$Impl_$.preDeinc = function(this1) {
	if((function($this) {
		var $r;
		switch(this1[1]) {
		case 0:case 1:
			$r = true;
			break;
		default:
			$r = false;
		}
		return $r;
	}(this))) {
		var v = haxe_ui_util__$Variant_Variant_$Impl_$.toNumber(this1);
		--v;
		this1 = haxe_ui_util_VariantType.Float(v);
		return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(v);
	}
	throw new js__$Boot_HaxeError("Variant operation error");
};
haxe_ui_util__$Variant_Variant_$Impl_$.multiply = function(this1,rhs) {
	if((function($this) {
		var $r;
		switch(this1[1]) {
		case 0:case 1:
			$r = true;
			break;
		default:
			$r = false;
		}
		return $r;
	}(this)) && (function($this) {
		var $r;
		switch(rhs[1]) {
		case 0:case 1:
			$r = true;
			break;
		default:
			$r = false;
		}
		return $r;
	}(this))) return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(haxe_ui_util__$Variant_Variant_$Impl_$.toNumber(this1) * haxe_ui_util__$Variant_Variant_$Impl_$.toNumber(rhs));
	throw new js__$Boot_HaxeError("Variant operation error");
};
haxe_ui_util__$Variant_Variant_$Impl_$.divide = function(this1,rhs) {
	if((function($this) {
		var $r;
		switch(this1[1]) {
		case 0:case 1:
			$r = true;
			break;
		default:
			$r = false;
		}
		return $r;
	}(this)) && (function($this) {
		var $r;
		switch(rhs[1]) {
		case 0:case 1:
			$r = true;
			break;
		default:
			$r = false;
		}
		return $r;
	}(this))) return haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(haxe_ui_util__$Variant_Variant_$Impl_$.toNumber(this1) / haxe_ui_util__$Variant_Variant_$Impl_$.toNumber(rhs));
	throw new js__$Boot_HaxeError("Variant operation error");
};
haxe_ui_util__$Variant_Variant_$Impl_$.invert = function(this1) {
	if(haxe_ui_util__$Variant_Variant_$Impl_$.get_isBool(this1)) {
		var v = haxe_ui_util__$Variant_Variant_$Impl_$.toBool(this1);
		v = !v;
		return haxe_ui_util__$Variant_Variant_$Impl_$.fromBool(v);
	}
	throw new js__$Boot_HaxeError("Variant operation error");
};
haxe_ui_util__$Variant_Variant_$Impl_$.get_isNull = function(this1) {
	return haxe_ui_util__$Variant_Variant_$Impl_$.toString(this1) == null;
};
haxe_ui_util__$Variant_Variant_$Impl_$.fromDynamic = function(r) {
	var v = null;
	if(r != null) {
		if((function($this) {
			var $r;
			var f = parseFloat("" + Std.string(r));
			$r = isNaN(f);
			return $r;
		}(this)) == false) {
			if(Std.string(r).indexOf(".") != -1) v = haxe_ui_util__$Variant_Variant_$Impl_$.fromFloat(parseFloat("" + Std.string(r))); else v = haxe_ui_util__$Variant_Variant_$Impl_$.fromInt(Std.parseInt("" + Std.string(r)));
		} else if("" + Std.string(r) == "true" || Std.string(r) + "" == "false") v = haxe_ui_util__$Variant_Variant_$Impl_$.fromBool("" + Std.string(r) == "true"); else v = haxe_ui_util__$Variant_Variant_$Impl_$.fromString(Std.string(r));
	}
	return v;
};
haxe_ui_util__$Variant_Variant_$Impl_$.toDynamic = function(v) {
	var d = null;
	if(v != null) switch(v[1]) {
	case 0:
		var y = v[2];
		d = y;
		break;
	case 1:
		var y1 = v[2];
		d = y1;
		break;
	case 2:
		var y2 = v[2];
		d = y2;
		break;
	case 3:
		var y3 = v[2];
		d = y3;
		break;
	}
	return d;
};
var haxe_ui_util_filters_Filter = function() {
};
$hxClasses["haxe.ui.util.filters.Filter"] = haxe_ui_util_filters_Filter;
haxe_ui_util_filters_Filter.__name__ = ["haxe","ui","util","filters","Filter"];
haxe_ui_util_filters_Filter.prototype = {
	__class__: haxe_ui_util_filters_Filter
};
var haxe_ui_util_filters_Blur = function() {
	haxe_ui_util_filters_Filter.call(this);
};
$hxClasses["haxe.ui.util.filters.Blur"] = haxe_ui_util_filters_Blur;
haxe_ui_util_filters_Blur.__name__ = ["haxe","ui","util","filters","Blur"];
haxe_ui_util_filters_Blur.__super__ = haxe_ui_util_filters_Filter;
haxe_ui_util_filters_Blur.prototype = $extend(haxe_ui_util_filters_Filter.prototype,{
	amount: null
	,__class__: haxe_ui_util_filters_Blur
});
var haxe_ui_util_filters_DropShadow = function() {
	haxe_ui_util_filters_Filter.call(this);
};
$hxClasses["haxe.ui.util.filters.DropShadow"] = haxe_ui_util_filters_DropShadow;
haxe_ui_util_filters_DropShadow.__name__ = ["haxe","ui","util","filters","DropShadow"];
haxe_ui_util_filters_DropShadow.__super__ = haxe_ui_util_filters_Filter;
haxe_ui_util_filters_DropShadow.prototype = $extend(haxe_ui_util_filters_Filter.prototype,{
	distance: null
	,angle: null
	,color: null
	,alpha: null
	,blurX: null
	,blurY: null
	,strength: null
	,quality: null
	,inner: null
	,__class__: haxe_ui_util_filters_DropShadow
});
var haxe_ui_util_filters_FilterParser = function() { };
$hxClasses["haxe.ui.util.filters.FilterParser"] = haxe_ui_util_filters_FilterParser;
haxe_ui_util_filters_FilterParser.__name__ = ["haxe","ui","util","filters","FilterParser"];
haxe_ui_util_filters_FilterParser.parseFilter = function(filterDetails) {
	var filter = null;
	if(filterDetails[0] == "drop-shadow") filter = haxe_ui_util_filters_FilterParser.parseDropShadow(filterDetails); else if(filterDetails[0] == "blur") filter = haxe_ui_util_filters_FilterParser.parseBlur(filterDetails);
	return filter;
};
haxe_ui_util_filters_FilterParser.parseDropShadow = function(filterDetails) {
	if(filterDetails == null || filterDetails.length == 0) return null;
	var copy = filterDetails.slice();
	haxe_ui_util_filters_FilterParser.buildDefaults();
	var filterName = copy[0];
	HxOverrides.remove(copy,filterName);
	copy = haxe_ui_util_filters_FilterParser.copyFilterDefaults(filterName,copy);
	var dropShadow = new haxe_ui_util_filters_DropShadow();
	dropShadow.distance = copy[0];
	dropShadow.angle = copy[1];
	dropShadow.color = copy[2];
	dropShadow.alpha = copy[3];
	dropShadow.blurX = copy[4];
	dropShadow.blurY = copy[5];
	dropShadow.strength = copy[6];
	dropShadow.quality = copy[7];
	dropShadow.inner = copy[8];
	return dropShadow;
};
haxe_ui_util_filters_FilterParser.parseBlur = function(filterDetails) {
	if(filterDetails == null || filterDetails.length == 0) return null;
	var copy = filterDetails.slice();
	haxe_ui_util_filters_FilterParser.buildDefaults();
	var filterName = copy[0];
	HxOverrides.remove(copy,filterName);
	copy = haxe_ui_util_filters_FilterParser.copyFilterDefaults(filterName,copy);
	var blur = new haxe_ui_util_filters_Blur();
	blur.amount = copy[0];
	return blur;
};
haxe_ui_util_filters_FilterParser.copyFilterDefaults = function(filterName,params) {
	var copy = [];
	var defaultParams = haxe_ui_util_filters_FilterParser.filterParamDefaults.get(filterName);
	if(defaultParams != null) {
		var _g = 0;
		while(_g < defaultParams.length) {
			var p = defaultParams[_g];
			++_g;
			copy.push(p);
		}
	}
	if(params != null) {
		var n = 0;
		var _g1 = 0;
		while(_g1 < params.length) {
			var p1 = params[_g1];
			++_g1;
			copy[n] = p1;
			n++;
		}
	}
	return copy;
};
haxe_ui_util_filters_FilterParser.buildDefaults = function() {
	if(haxe_ui_util_filters_FilterParser.filterParamDefaults != null) return;
	haxe_ui_util_filters_FilterParser.filterParamDefaults = new haxe_ds_StringMap();
	var v = [];
	haxe_ui_util_filters_FilterParser.filterParamDefaults.set("drop-shadow",v);
	v;
	var v1 = haxe_ui_util_filters_FilterParser.filterParamDefaults.get("drop-shadow").concat([4,45,0,1,4,4,1,1,false,false,false]);
	haxe_ui_util_filters_FilterParser.filterParamDefaults.set("drop-shadow",v1);
	v1;
	var v2 = [];
	haxe_ui_util_filters_FilterParser.filterParamDefaults.set("blur",v2);
	v2;
	var v3 = haxe_ui_util_filters_FilterParser.filterParamDefaults.get("blur").concat([1]);
	haxe_ui_util_filters_FilterParser.filterParamDefaults.set("blur",v3);
	v3;
};
var haxe_xml_Parser = function() { };
$hxClasses["haxe.xml.Parser"] = haxe_xml_Parser;
haxe_xml_Parser.__name__ = ["haxe","xml","Parser"];
haxe_xml_Parser.parse = function(str,strict) {
	if(strict == null) strict = false;
	var doc = Xml.createDocument();
	haxe_xml_Parser.doParse(str,strict,0,doc);
	return doc;
};
haxe_xml_Parser.doParse = function(str,strict,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = str.charCodeAt(p);
	var buf = new StringBuf();
	var escapeNext = 1;
	var attrValQuote = -1;
	while(!(c != c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				buf.addSub(str,start,p - start);
				var child = Xml.createPCData(buf.b);
				buf = new StringBuf();
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			} else if(c == 38) {
				buf.addSub(str,start,p - start);
				state = 18;
				escapeNext = 13;
				start = p + 1;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child1 = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw new js__$Boot_HaxeError("Expected <![CDATA[");
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw new js__$Boot_HaxeError("Expected <!DOCTYPE");
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) throw new js__$Boot_HaxeError("Expected <!--"); else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw new js__$Boot_HaxeError("Expected node name");
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) throw new js__$Boot_HaxeError("Expected node name");
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				nsubs++;
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				break;
			case 62:
				state = 9;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				var tmp;
				if(start == p) throw new js__$Boot_HaxeError("Expected attribute name");
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw new js__$Boot_HaxeError("Duplicate attribute");
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected =");
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				buf = new StringBuf();
				state = 8;
				start = p + 1;
				attrValQuote = c;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected \"");
			}
			break;
		case 8:
			switch(c) {
			case 38:
				buf.addSub(str,start,p - start);
				state = 18;
				escapeNext = 8;
				start = p + 1;
				break;
			case 62:
				if(strict) throw new js__$Boot_HaxeError("Invalid unescaped " + String.fromCharCode(c) + " in attribute value"); else if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val = buf.b;
					buf = new StringBuf();
					xml.set(aname,val);
					state = 0;
					next = 4;
				}
				break;
			case 60:
				if(strict) throw new js__$Boot_HaxeError("Invalid unescaped " + String.fromCharCode(c) + " in attribute value"); else if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val1 = buf.b;
					buf = new StringBuf();
					xml.set(aname,val1);
					state = 0;
					next = 4;
				}
				break;
			default:
				if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val2 = buf.b;
					buf = new StringBuf();
					xml.set(aname,val2);
					state = 0;
					next = 4;
				}
			}
			break;
		case 9:
			p = haxe_xml_Parser.doParse(str,strict,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected >");
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw new js__$Boot_HaxeError("Expected >");
			}
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) throw new js__$Boot_HaxeError("Expected node name");
				var v = HxOverrides.substr(str,start,p - start);
				if(v != (function($this) {
					var $r;
					if(parent.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + parent.nodeType);
					$r = parent.nodeName;
					return $r;
				}(this))) throw new js__$Boot_HaxeError("Expected </" + (function($this) {
					var $r;
					if(parent.nodeType != Xml.Element) throw "Bad node type, expected Element but found " + parent.nodeType;
					$r = parent.nodeName;
					return $r;
				}(this)) + ">");
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				var xml1 = Xml.createComment(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				var xml2 = Xml.createDocType(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml2);
				nsubs++;
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				var xml3 = Xml.createProcessingInstruction(str1);
				parent.addChild(xml3);
				nsubs++;
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(s.charCodeAt(0) == 35) {
					var c1;
					if(s.charCodeAt(1) == 120) c1 = Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)); else c1 = Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.b += String.fromCharCode(c1);
				} else if(!haxe_xml_Parser.escapes.exists(s)) {
					if(strict) throw new js__$Boot_HaxeError("Undefined entity: " + s);
					buf.b += Std.string("&" + s + ";");
				} else buf.add(haxe_xml_Parser.escapes.get(s));
				start = p + 1;
				state = escapeNext;
			} else if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45) && c != 35) {
				if(strict) throw new js__$Boot_HaxeError("Invalid character in entity: " + String.fromCharCode(c));
				buf.b += "&";
				buf.addSub(str,start,p - start);
				p--;
				start = p + 1;
				state = escapeNext;
			}
			break;
		}
		c = StringTools.fastCodeAt(str,++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) {
			buf.addSub(str,start,p - start);
			var xml4 = Xml.createPCData(buf.b);
			parent.addChild(xml4);
			nsubs++;
		}
		return p;
	}
	if(!strict && state == 18 && escapeNext == 13) {
		buf.b += "&";
		buf.addSub(str,start,p - start);
		var xml5 = Xml.createPCData(buf.b);
		parent.addChild(xml5);
		nsubs++;
		return p;
	}
	throw new js__$Boot_HaxeError("Unexpected end");
};
var hscript_Const = $hxClasses["hscript.Const"] = { __ename__ : ["hscript","Const"], __constructs__ : ["CInt","CFloat","CString"] };
hscript_Const.CInt = function(v) { var $x = ["CInt",0,v]; $x.__enum__ = hscript_Const; $x.toString = $estr; return $x; };
hscript_Const.CFloat = function(f) { var $x = ["CFloat",1,f]; $x.__enum__ = hscript_Const; $x.toString = $estr; return $x; };
hscript_Const.CString = function(s) { var $x = ["CString",2,s]; $x.__enum__ = hscript_Const; $x.toString = $estr; return $x; };
var hscript_Expr = $hxClasses["hscript.Expr"] = { __ename__ : ["hscript","Expr"], __constructs__ : ["EConst","EIdent","EVar","EParent","EBlock","EField","EBinop","EUnop","ECall","EIf","EWhile","EFor","EBreak","EContinue","EFunction","EReturn","EArray","EArrayDecl","ENew","EThrow","ETry","EObject","ETernary","ESwitch"] };
hscript_Expr.EConst = function(c) { var $x = ["EConst",0,c]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EIdent = function(v) { var $x = ["EIdent",1,v]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EVar = function(n,t,e) { var $x = ["EVar",2,n,t,e]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EParent = function(e) { var $x = ["EParent",3,e]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EBlock = function(e) { var $x = ["EBlock",4,e]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EField = function(e,f) { var $x = ["EField",5,e,f]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EBinop = function(op,e1,e2) { var $x = ["EBinop",6,op,e1,e2]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EUnop = function(op,prefix,e) { var $x = ["EUnop",7,op,prefix,e]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.ECall = function(e,params) { var $x = ["ECall",8,e,params]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EIf = function(cond,e1,e2) { var $x = ["EIf",9,cond,e1,e2]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EWhile = function(cond,e) { var $x = ["EWhile",10,cond,e]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EFor = function(v,it,e) { var $x = ["EFor",11,v,it,e]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EBreak = ["EBreak",12];
hscript_Expr.EBreak.toString = $estr;
hscript_Expr.EBreak.__enum__ = hscript_Expr;
hscript_Expr.EContinue = ["EContinue",13];
hscript_Expr.EContinue.toString = $estr;
hscript_Expr.EContinue.__enum__ = hscript_Expr;
hscript_Expr.EFunction = function(args,e,name,ret) { var $x = ["EFunction",14,args,e,name,ret]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EReturn = function(e) { var $x = ["EReturn",15,e]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EArray = function(e,index) { var $x = ["EArray",16,e,index]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EArrayDecl = function(e) { var $x = ["EArrayDecl",17,e]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.ENew = function(cl,params) { var $x = ["ENew",18,cl,params]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EThrow = function(e) { var $x = ["EThrow",19,e]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.ETry = function(e,v,t,ecatch) { var $x = ["ETry",20,e,v,t,ecatch]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EObject = function(fl) { var $x = ["EObject",21,fl]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.ETernary = function(cond,e1,e2) { var $x = ["ETernary",22,cond,e1,e2]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.ESwitch = function(e,cases,defaultExpr) { var $x = ["ESwitch",23,e,cases,defaultExpr]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
var hscript_CType = $hxClasses["hscript.CType"] = { __ename__ : ["hscript","CType"], __constructs__ : ["CTPath","CTFun","CTAnon","CTParent"] };
hscript_CType.CTPath = function(path,params) { var $x = ["CTPath",0,path,params]; $x.__enum__ = hscript_CType; $x.toString = $estr; return $x; };
hscript_CType.CTFun = function(args,ret) { var $x = ["CTFun",1,args,ret]; $x.__enum__ = hscript_CType; $x.toString = $estr; return $x; };
hscript_CType.CTAnon = function(fields) { var $x = ["CTAnon",2,fields]; $x.__enum__ = hscript_CType; $x.toString = $estr; return $x; };
hscript_CType.CTParent = function(t) { var $x = ["CTParent",3,t]; $x.__enum__ = hscript_CType; $x.toString = $estr; return $x; };
var hscript_Error = $hxClasses["hscript.Error"] = { __ename__ : ["hscript","Error"], __constructs__ : ["EInvalidChar","EUnexpected","EUnterminatedString","EUnterminatedComment","EUnknownVariable","EInvalidIterator","EInvalidOp","EInvalidAccess"] };
hscript_Error.EInvalidChar = function(c) { var $x = ["EInvalidChar",0,c]; $x.__enum__ = hscript_Error; $x.toString = $estr; return $x; };
hscript_Error.EUnexpected = function(s) { var $x = ["EUnexpected",1,s]; $x.__enum__ = hscript_Error; $x.toString = $estr; return $x; };
hscript_Error.EUnterminatedString = ["EUnterminatedString",2];
hscript_Error.EUnterminatedString.toString = $estr;
hscript_Error.EUnterminatedString.__enum__ = hscript_Error;
hscript_Error.EUnterminatedComment = ["EUnterminatedComment",3];
hscript_Error.EUnterminatedComment.toString = $estr;
hscript_Error.EUnterminatedComment.__enum__ = hscript_Error;
hscript_Error.EUnknownVariable = function(v) { var $x = ["EUnknownVariable",4,v]; $x.__enum__ = hscript_Error; $x.toString = $estr; return $x; };
hscript_Error.EInvalidIterator = function(v) { var $x = ["EInvalidIterator",5,v]; $x.__enum__ = hscript_Error; $x.toString = $estr; return $x; };
hscript_Error.EInvalidOp = function(op) { var $x = ["EInvalidOp",6,op]; $x.__enum__ = hscript_Error; $x.toString = $estr; return $x; };
hscript_Error.EInvalidAccess = function(f) { var $x = ["EInvalidAccess",7,f]; $x.__enum__ = hscript_Error; $x.toString = $estr; return $x; };
var hscript__$Interp_Stop = $hxClasses["hscript._Interp.Stop"] = { __ename__ : ["hscript","_Interp","Stop"], __constructs__ : ["SBreak","SContinue","SReturn"] };
hscript__$Interp_Stop.SBreak = ["SBreak",0];
hscript__$Interp_Stop.SBreak.toString = $estr;
hscript__$Interp_Stop.SBreak.__enum__ = hscript__$Interp_Stop;
hscript__$Interp_Stop.SContinue = ["SContinue",1];
hscript__$Interp_Stop.SContinue.toString = $estr;
hscript__$Interp_Stop.SContinue.__enum__ = hscript__$Interp_Stop;
hscript__$Interp_Stop.SReturn = function(v) { var $x = ["SReturn",2,v]; $x.__enum__ = hscript__$Interp_Stop; $x.toString = $estr; return $x; };
var hscript_Token = $hxClasses["hscript.Token"] = { __ename__ : ["hscript","Token"], __constructs__ : ["TEof","TConst","TId","TOp","TPOpen","TPClose","TBrOpen","TBrClose","TDot","TComma","TSemicolon","TBkOpen","TBkClose","TQuestion","TDoubleDot"] };
hscript_Token.TEof = ["TEof",0];
hscript_Token.TEof.toString = $estr;
hscript_Token.TEof.__enum__ = hscript_Token;
hscript_Token.TConst = function(c) { var $x = ["TConst",1,c]; $x.__enum__ = hscript_Token; $x.toString = $estr; return $x; };
hscript_Token.TId = function(s) { var $x = ["TId",2,s]; $x.__enum__ = hscript_Token; $x.toString = $estr; return $x; };
hscript_Token.TOp = function(s) { var $x = ["TOp",3,s]; $x.__enum__ = hscript_Token; $x.toString = $estr; return $x; };
hscript_Token.TPOpen = ["TPOpen",4];
hscript_Token.TPOpen.toString = $estr;
hscript_Token.TPOpen.__enum__ = hscript_Token;
hscript_Token.TPClose = ["TPClose",5];
hscript_Token.TPClose.toString = $estr;
hscript_Token.TPClose.__enum__ = hscript_Token;
hscript_Token.TBrOpen = ["TBrOpen",6];
hscript_Token.TBrOpen.toString = $estr;
hscript_Token.TBrOpen.__enum__ = hscript_Token;
hscript_Token.TBrClose = ["TBrClose",7];
hscript_Token.TBrClose.toString = $estr;
hscript_Token.TBrClose.__enum__ = hscript_Token;
hscript_Token.TDot = ["TDot",8];
hscript_Token.TDot.toString = $estr;
hscript_Token.TDot.__enum__ = hscript_Token;
hscript_Token.TComma = ["TComma",9];
hscript_Token.TComma.toString = $estr;
hscript_Token.TComma.__enum__ = hscript_Token;
hscript_Token.TSemicolon = ["TSemicolon",10];
hscript_Token.TSemicolon.toString = $estr;
hscript_Token.TSemicolon.__enum__ = hscript_Token;
hscript_Token.TBkOpen = ["TBkOpen",11];
hscript_Token.TBkOpen.toString = $estr;
hscript_Token.TBkOpen.__enum__ = hscript_Token;
hscript_Token.TBkClose = ["TBkClose",12];
hscript_Token.TBkClose.toString = $estr;
hscript_Token.TBkClose.__enum__ = hscript_Token;
hscript_Token.TQuestion = ["TQuestion",13];
hscript_Token.TQuestion.toString = $estr;
hscript_Token.TQuestion.__enum__ = hscript_Token;
hscript_Token.TDoubleDot = ["TDoubleDot",14];
hscript_Token.TDoubleDot.toString = $estr;
hscript_Token.TDoubleDot.__enum__ = hscript_Token;
var hscript_Parser = function() {
	this.uid = 0;
	this.line = 1;
	this.opChars = "+*/-=!><&|^%~";
	this.identChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
	var priorities = [["%"],["*","/"],["+","-"],["<<",">>",">>>"],["|","&","^"],["==","!=",">","<",">=","<="],["..."],["&&"],["||"],["=","+=","-=","*=","/=","%=","<<=",">>=",">>>=","|=","&=","^="]];
	this.opPriority = new haxe_ds_StringMap();
	this.opRightAssoc = new haxe_ds_StringMap();
	this.unops = new haxe_ds_StringMap();
	var _g1 = 0;
	var _g = priorities.length;
	while(_g1 < _g) {
		var i = _g1++;
		var _g2 = 0;
		var _g3 = priorities[i];
		while(_g2 < _g3.length) {
			var x = _g3[_g2];
			++_g2;
			this.opPriority.set(x,i);
			if(i == 9) this.opRightAssoc.set(x,true);
		}
	}
	var _g4 = 0;
	var _g11 = ["!","++","--","-","~"];
	while(_g4 < _g11.length) {
		var x1 = _g11[_g4];
		++_g4;
		this.unops.set(x1,x1 == "++" || x1 == "--");
	}
};
$hxClasses["hscript.Parser"] = hscript_Parser;
hscript_Parser.__name__ = ["hscript","Parser"];
hscript_Parser.prototype = {
	line: null
	,opChars: null
	,identChars: null
	,opPriority: null
	,opRightAssoc: null
	,unops: null
	,allowJSON: null
	,allowTypes: null
	,input: null
	,'char': null
	,ops: null
	,idents: null
	,uid: null
	,tokens: null
	,error: function(err,pmin,pmax) {
		throw new js__$Boot_HaxeError(err);
	}
	,invalidChar: function(c) {
		this.error(hscript_Error.EInvalidChar(c),0,0);
	}
	,parseString: function(s) {
		this.line = 1;
		this.uid = 0;
		return this.parse(new haxe_io_StringInput(s));
	}
	,parse: function(s) {
		this.tokens = new haxe_ds_GenericStack();
		this["char"] = -1;
		this.input = s;
		this.ops = [];
		this.idents = [];
		var _g1 = 0;
		var _g = this.opChars.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.ops[HxOverrides.cca(this.opChars,i)] = true;
		}
		var _g11 = 0;
		var _g2 = this.identChars.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			this.idents[HxOverrides.cca(this.identChars,i1)] = true;
		}
		var a = [];
		while(true) {
			var tk = this.token();
			if(tk == hscript_Token.TEof) break;
			this.tokens.add(tk);
			a.push(this.parseFullExpr());
		}
		if(a.length == 1) return a[0]; else return this.mk(hscript_Expr.EBlock(a),0,null);
	}
	,unexpected: function(tk) {
		this.error(hscript_Error.EUnexpected(this.tokenString(tk)),0,0);
		return null;
	}
	,push: function(tk) {
		this.tokens.add(tk);
	}
	,ensure: function(tk) {
		var t = this.token();
		if(t != tk) this.unexpected(t);
	}
	,expr: function(e) {
		return e;
	}
	,pmin: function(e) {
		return 0;
	}
	,pmax: function(e) {
		return 0;
	}
	,mk: function(e,pmin,pmax) {
		return e;
	}
	,isBlock: function(e) {
		switch(e[1]) {
		case 4:case 21:case 23:
			return true;
		case 14:
			var e1 = e[3];
			return this.isBlock(e1);
		case 2:
			var e2 = e[4];
			return e2 != null && this.isBlock(e2);
		case 9:
			var e21 = e[4];
			var e11 = e[3];
			if(e21 != null) return this.isBlock(e21); else return this.isBlock(e11);
			break;
		case 6:
			var e3 = e[4];
			return this.isBlock(e3);
		case 7:
			var e4 = e[4];
			var prefix = e[3];
			return !prefix && this.isBlock(e4);
		case 10:
			var e5 = e[3];
			return this.isBlock(e5);
		case 11:
			var e6 = e[4];
			return this.isBlock(e6);
		case 15:
			var e7 = e[2];
			return e7 != null && this.isBlock(e7);
		case 20:
			var e8 = e[5];
			return this.isBlock(e8);
		default:
			return false;
		}
	}
	,parseFullExpr: function() {
		var e = this.parseExpr();
		var tk = this.token();
		if(tk != hscript_Token.TSemicolon && tk != hscript_Token.TEof) {
			if(this.isBlock(e)) this.tokens.add(tk); else this.unexpected(tk);
		}
		return e;
	}
	,parseObject: function(p1) {
		var fl = [];
		try {
			while(true) {
				var tk = this.token();
				var id = null;
				switch(tk[1]) {
				case 2:
					var i = tk[2];
					id = i;
					break;
				case 1:
					var c = tk[2];
					if(!this.allowJSON) this.unexpected(tk);
					switch(c[1]) {
					case 2:
						var s = c[2];
						id = s;
						break;
					default:
						this.unexpected(tk);
					}
					break;
				case 7:
					throw "__break__";
					break;
				default:
					this.unexpected(tk);
				}
				this.ensure(hscript_Token.TDoubleDot);
				fl.push({ name : id, e : this.parseExpr()});
				tk = this.token();
				switch(tk[1]) {
				case 7:
					throw "__break__";
					break;
				case 9:
					break;
				default:
					this.unexpected(tk);
				}
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		return this.parseExprNext(this.mk(hscript_Expr.EObject(fl),p1,null));
	}
	,parseExpr: function() {
		var tk = this.token();
		switch(tk[1]) {
		case 2:
			var id = tk[2];
			var e = this.parseStructure(id);
			if(e == null) e = this.mk(hscript_Expr.EIdent(id),null,null);
			return this.parseExprNext(e);
		case 1:
			var c = tk[2];
			return this.parseExprNext(this.mk(hscript_Expr.EConst(c),null,null));
		case 4:
			var e1 = this.parseExpr();
			this.ensure(hscript_Token.TPClose);
			return this.parseExprNext(this.mk(hscript_Expr.EParent(e1),0,0));
		case 6:
			tk = this.token();
			switch(tk[1]) {
			case 7:
				return this.parseExprNext(this.mk(hscript_Expr.EObject([]),0,null));
			case 2:
				var tk2 = this.token();
				this.tokens.add(tk2);
				this.tokens.add(tk);
				switch(tk2[1]) {
				case 14:
					return this.parseExprNext(this.parseObject(0));
				default:
				}
				break;
			case 1:
				var c1 = tk[2];
				if(this.allowJSON) switch(c1[1]) {
				case 2:
					var tk21 = this.token();
					this.tokens.add(tk21);
					this.tokens.add(tk);
					switch(tk21[1]) {
					case 14:
						return this.parseExprNext(this.parseObject(0));
					default:
					}
					break;
				default:
					this.tokens.add(tk);
				} else this.tokens.add(tk);
				break;
			default:
				this.tokens.add(tk);
			}
			var a = [];
			while(true) {
				a.push(this.parseFullExpr());
				tk = this.token();
				if(tk == hscript_Token.TBrClose) break;
				this.tokens.add(tk);
			}
			return this.mk(hscript_Expr.EBlock(a),0,null);
		case 3:
			var op = tk[2];
			if(this.unops.exists(op)) return this.makeUnop(op,this.parseExpr());
			return this.unexpected(tk);
		case 11:
			var a1 = [];
			tk = this.token();
			while(tk != hscript_Token.TBkClose) {
				this.tokens.add(tk);
				a1.push(this.parseExpr());
				tk = this.token();
				if(tk == hscript_Token.TComma) tk = this.token();
			}
			if(a1.length == 1) {
				var _g = a1[0];
				switch(_g[1]) {
				case 11:case 10:
					var tmp = "__a_" + this.uid++;
					var e2 = this.mk(hscript_Expr.EBlock([this.mk(hscript_Expr.EVar(tmp,null,this.mk(hscript_Expr.EArrayDecl([]),0,null)),0,null),this.mapCompr(tmp,a1[0]),this.mk(hscript_Expr.EIdent(tmp),0,null)]),0,null);
					return this.parseExprNext(e2);
				default:
				}
			}
			return this.parseExprNext(this.mk(hscript_Expr.EArrayDecl(a1),0,null));
		default:
			return this.unexpected(tk);
		}
	}
	,mapCompr: function(tmp,e) {
		var edef;
		switch(e[1]) {
		case 11:
			var e2 = e[4];
			var it = e[3];
			var v = e[2];
			edef = hscript_Expr.EFor(v,it,this.mapCompr(tmp,e2));
			break;
		case 10:
			var e21 = e[3];
			var cond = e[2];
			edef = hscript_Expr.EWhile(cond,this.mapCompr(tmp,e21));
			break;
		case 9:
			var e22 = e[4];
			var e1 = e[3];
			var cond1 = e[2];
			if(e22 == null) edef = hscript_Expr.EIf(cond1,this.mapCompr(tmp,e1),null); else edef = hscript_Expr.ECall(this.mk(hscript_Expr.EField(this.mk(hscript_Expr.EIdent(tmp),0,0),"push"),0,0),[e]);
			break;
		case 4:
			switch(e[2].length) {
			case 1:
				var e3 = e[2][0];
				edef = hscript_Expr.EBlock([this.mapCompr(tmp,e3)]);
				break;
			default:
				edef = hscript_Expr.ECall(this.mk(hscript_Expr.EField(this.mk(hscript_Expr.EIdent(tmp),0,0),"push"),0,0),[e]);
			}
			break;
		case 3:
			var e23 = e[2];
			edef = hscript_Expr.EParent(this.mapCompr(tmp,e23));
			break;
		default:
			edef = hscript_Expr.ECall(this.mk(hscript_Expr.EField(this.mk(hscript_Expr.EIdent(tmp),0,0),"push"),0,0),[e]);
		}
		return edef;
	}
	,makeUnop: function(op,e) {
		switch(e[1]) {
		case 6:
			var e2 = e[4];
			var e1 = e[3];
			var bop = e[2];
			return this.mk(hscript_Expr.EBinop(bop,this.makeUnop(op,e1),e2),0,0);
		case 22:
			var e3 = e[4];
			var e21 = e[3];
			var e11 = e[2];
			return this.mk(hscript_Expr.ETernary(this.makeUnop(op,e11),e21,e3),0,0);
		default:
			return this.mk(hscript_Expr.EUnop(op,true,e),0,0);
		}
	}
	,makeBinop: function(op,e1,e) {
		switch(e[1]) {
		case 6:
			var e3 = e[4];
			var e2 = e[3];
			var op2 = e[2];
			if(this.opPriority.get(op) <= this.opPriority.get(op2) && !this.opRightAssoc.exists(op)) return this.mk(hscript_Expr.EBinop(op2,this.makeBinop(op,e1,e2),e3),0,0); else return this.mk(hscript_Expr.EBinop(op,e1,e),0,0);
			break;
		case 22:
			var e4 = e[4];
			var e31 = e[3];
			var e21 = e[2];
			if(this.opRightAssoc.exists(op)) return this.mk(hscript_Expr.EBinop(op,e1,e),0,0); else return this.mk(hscript_Expr.ETernary(this.makeBinop(op,e1,e21),e31,e4),0,0);
			break;
		default:
			return this.mk(hscript_Expr.EBinop(op,e1,e),0,0);
		}
	}
	,parseStructure: function(id) {
		switch(id) {
		case "if":
			this.ensure(hscript_Token.TPOpen);
			var cond = this.parseExpr();
			this.ensure(hscript_Token.TPClose);
			var e1 = this.parseExpr();
			var e2 = null;
			var semic = false;
			var tk = this.token();
			if(tk == hscript_Token.TSemicolon) {
				semic = true;
				tk = this.token();
			}
			if(Type.enumEq(tk,hscript_Token.TId("else"))) e2 = this.parseExpr(); else {
				this.tokens.add(tk);
				if(semic) this.tokens.add(hscript_Token.TSemicolon);
			}
			return this.mk(hscript_Expr.EIf(cond,e1,e2),0,e2 == null?0:0);
		case "var":
			var tk1 = this.token();
			var ident = null;
			switch(tk1[1]) {
			case 2:
				var id1 = tk1[2];
				ident = id1;
				break;
			default:
				this.unexpected(tk1);
			}
			tk1 = this.token();
			var t = null;
			if(tk1 == hscript_Token.TDoubleDot && this.allowTypes) {
				t = this.parseType();
				tk1 = this.token();
			}
			var e = null;
			if(Type.enumEq(tk1,hscript_Token.TOp("="))) e = this.parseExpr(); else this.tokens.add(tk1);
			return this.mk(hscript_Expr.EVar(ident,t,e),0,e == null?0:0);
		case "while":
			var econd = this.parseExpr();
			var e3 = this.parseExpr();
			return this.mk(hscript_Expr.EWhile(econd,e3),0,0);
		case "for":
			this.ensure(hscript_Token.TPOpen);
			var tk2 = this.token();
			var vname = null;
			switch(tk2[1]) {
			case 2:
				var id2 = tk2[2];
				vname = id2;
				break;
			default:
				this.unexpected(tk2);
			}
			tk2 = this.token();
			if(!Type.enumEq(tk2,hscript_Token.TId("in"))) this.unexpected(tk2);
			var eiter = this.parseExpr();
			this.ensure(hscript_Token.TPClose);
			var e4 = this.parseExpr();
			return this.mk(hscript_Expr.EFor(vname,eiter,e4),0,0);
		case "break":
			return hscript_Expr.EBreak;
		case "continue":
			return hscript_Expr.EContinue;
		case "else":
			return this.unexpected(hscript_Token.TId(id));
		case "function":
			var tk3 = this.token();
			var name = null;
			switch(tk3[1]) {
			case 2:
				var id3 = tk3[2];
				name = id3;
				break;
			default:
				this.tokens.add(tk3);
			}
			this.ensure(hscript_Token.TPOpen);
			var args = [];
			tk3 = this.token();
			if(tk3 != hscript_Token.TPClose) {
				var done = false;
				while(!done) {
					var name1 = null;
					var opt = false;
					switch(tk3[1]) {
					case 13:
						opt = true;
						tk3 = this.token();
						break;
					default:
					}
					switch(tk3[1]) {
					case 2:
						var id4 = tk3[2];
						name1 = id4;
						break;
					default:
						this.unexpected(tk3);
					}
					tk3 = this.token();
					var arg = { name : name1};
					args.push(arg);
					if(opt) arg.opt = true;
					if(tk3 == hscript_Token.TDoubleDot && this.allowTypes) {
						arg.t = this.parseType();
						tk3 = this.token();
					}
					switch(tk3[1]) {
					case 9:
						tk3 = this.token();
						break;
					case 5:
						done = true;
						break;
					default:
						this.unexpected(tk3);
					}
				}
			}
			var ret = null;
			if(this.allowTypes) {
				tk3 = this.token();
				if(tk3 != hscript_Token.TDoubleDot) this.tokens.add(tk3); else ret = this.parseType();
			}
			var body = this.parseExpr();
			return this.mk(hscript_Expr.EFunction(args,body,name,ret),0,0);
		case "return":
			var tk4 = this.token();
			this.tokens.add(tk4);
			var e5;
			if(tk4 == hscript_Token.TSemicolon) e5 = null; else e5 = this.parseExpr();
			return this.mk(hscript_Expr.EReturn(e5),0,e5 == null?0:0);
		case "new":
			var a = [];
			var tk5 = this.token();
			switch(tk5[1]) {
			case 2:
				var id5 = tk5[2];
				a.push(id5);
				break;
			default:
				this.unexpected(tk5);
			}
			var next = true;
			while(next) {
				tk5 = this.token();
				switch(tk5[1]) {
				case 8:
					tk5 = this.token();
					switch(tk5[1]) {
					case 2:
						var id6 = tk5[2];
						a.push(id6);
						break;
					default:
						this.unexpected(tk5);
					}
					break;
				case 4:
					next = false;
					break;
				default:
					this.unexpected(tk5);
				}
			}
			var args1 = this.parseExprList(hscript_Token.TPClose);
			return this.mk(hscript_Expr.ENew(a.join("."),args1),0,null);
		case "throw":
			var e6 = this.parseExpr();
			return this.mk(hscript_Expr.EThrow(e6),0,0);
		case "try":
			var e7 = this.parseExpr();
			var tk6 = this.token();
			if(!Type.enumEq(tk6,hscript_Token.TId("catch"))) this.unexpected(tk6);
			this.ensure(hscript_Token.TPOpen);
			tk6 = this.token();
			var vname1;
			switch(tk6[1]) {
			case 2:
				var id7 = tk6[2];
				vname1 = id7;
				break;
			default:
				vname1 = this.unexpected(tk6);
			}
			this.ensure(hscript_Token.TDoubleDot);
			var t1 = null;
			if(this.allowTypes) t1 = this.parseType(); else {
				tk6 = this.token();
				if(!Type.enumEq(tk6,hscript_Token.TId("Dynamic"))) this.unexpected(tk6);
			}
			this.ensure(hscript_Token.TPClose);
			var ec = this.parseExpr();
			return this.mk(hscript_Expr.ETry(e7,vname1,t1,ec),0,0);
		case "switch":
			var e8 = this.parseExpr();
			var def = null;
			var cases = [];
			this.ensure(hscript_Token.TBrOpen);
			try {
				while(true) {
					var tk7 = this.token();
					switch(tk7[1]) {
					case 2:
						switch(tk7[2]) {
						case "case":
							var c = { values : [], expr : null};
							cases.push(c);
							try {
								while(true) {
									var e9 = this.parseExpr();
									c.values.push(e9);
									tk7 = this.token();
									switch(tk7[1]) {
									case 9:
										break;
									case 14:
										throw "__break__";
										break;
									default:
										this.unexpected(tk7);
									}
								}
							} catch( e ) { if( e != "__break__" ) throw e; }
							var exprs = [];
							try {
								while(true) {
									tk7 = this.token();
									this.tokens.add(tk7);
									switch(tk7[1]) {
									case 2:
										switch(tk7[2]) {
										case "case":case "default":
											throw "__break__";
											break;
										default:
											exprs.push(this.parseFullExpr());
										}
										break;
									case 7:
										throw "__break__";
										break;
									default:
										exprs.push(this.parseFullExpr());
									}
								}
							} catch( e ) { if( e != "__break__" ) throw e; }
							if(exprs.length == 1) c.expr = exprs[0]; else if(exprs.length == 0) c.expr = this.mk(hscript_Expr.EBlock([]),0,0); else c.expr = this.mk(hscript_Expr.EBlock(exprs),0,0);
							break;
						case "default":
							if(def != null) this.unexpected(tk7);
							this.ensure(hscript_Token.TDoubleDot);
							var exprs1 = [];
							try {
								while(true) {
									tk7 = this.token();
									this.tokens.add(tk7);
									switch(tk7[1]) {
									case 2:
										switch(tk7[2]) {
										case "case":case "default":
											throw "__break__";
											break;
										default:
											exprs1.push(this.parseFullExpr());
										}
										break;
									case 7:
										throw "__break__";
										break;
									default:
										exprs1.push(this.parseFullExpr());
									}
								}
							} catch( e ) { if( e != "__break__" ) throw e; }
							if(exprs1.length == 1) def = exprs1[0]; else if(exprs1.length == 0) def = this.mk(hscript_Expr.EBlock([]),0,0); else def = this.mk(hscript_Expr.EBlock(exprs1),0,0);
							break;
						default:
							this.unexpected(tk7);
						}
						break;
					case 7:
						throw "__break__";
						break;
					default:
						this.unexpected(tk7);
					}
				}
			} catch( e ) { if( e != "__break__" ) throw e; }
			return this.mk(hscript_Expr.ESwitch(e8,cases,def),0,0);
		default:
			return null;
		}
	}
	,parseExprNext: function(e1) {
		var tk = this.token();
		switch(tk[1]) {
		case 3:
			var op = tk[2];
			if(this.unops.get(op)) {
				if(this.isBlock(e1) || (function($this) {
					var $r;
					switch(e1[1]) {
					case 3:
						$r = true;
						break;
					default:
						$r = false;
					}
					return $r;
				}(this))) {
					this.tokens.add(tk);
					return e1;
				}
				return this.parseExprNext(this.mk(hscript_Expr.EUnop(op,false,e1),0,null));
			}
			return this.makeBinop(op,e1,this.parseExpr());
		case 8:
			tk = this.token();
			var field = null;
			switch(tk[1]) {
			case 2:
				var id = tk[2];
				field = id;
				break;
			default:
				this.unexpected(tk);
			}
			return this.parseExprNext(this.mk(hscript_Expr.EField(e1,field),0,null));
		case 4:
			return this.parseExprNext(this.mk(hscript_Expr.ECall(e1,this.parseExprList(hscript_Token.TPClose)),0,null));
		case 11:
			var e2 = this.parseExpr();
			this.ensure(hscript_Token.TBkClose);
			return this.parseExprNext(this.mk(hscript_Expr.EArray(e1,e2),0,null));
		case 13:
			var e21 = this.parseExpr();
			this.ensure(hscript_Token.TDoubleDot);
			var e3 = this.parseExpr();
			return this.mk(hscript_Expr.ETernary(e1,e21,e3),0,0);
		default:
			this.tokens.add(tk);
			return e1;
		}
	}
	,parseType: function() {
		var t = this.token();
		switch(t[1]) {
		case 2:
			var v = t[2];
			var path = [v];
			while(true) {
				t = this.token();
				if(t != hscript_Token.TDot) break;
				t = this.token();
				switch(t[1]) {
				case 2:
					var v1 = t[2];
					path.push(v1);
					break;
				default:
					this.unexpected(t);
				}
			}
			var params = null;
			switch(t[1]) {
			case 3:
				var op = t[2];
				if(op == "<") {
					params = [];
					try {
						while(true) {
							params.push(this.parseType());
							t = this.token();
							switch(t[1]) {
							case 9:
								continue;
								break;
							case 3:
								var op1 = t[2];
								if(op1 == ">") throw "__break__";
								if(HxOverrides.cca(op1,0) == 62) {
									this.tokens.add(hscript_Token.TOp(HxOverrides.substr(op1,1,null)));
									throw "__break__";
								}
								break;
							default:
							}
							this.unexpected(t);
						}
					} catch( e ) { if( e != "__break__" ) throw e; }
				} else this.tokens.add(t);
				break;
			default:
				this.tokens.add(t);
			}
			return this.parseTypeNext(hscript_CType.CTPath(path,params));
		case 4:
			var t1 = this.parseType();
			this.ensure(hscript_Token.TPClose);
			return this.parseTypeNext(hscript_CType.CTParent(t1));
		case 6:
			var fields = [];
			try {
				while(true) {
					t = this.token();
					switch(t[1]) {
					case 7:
						throw "__break__";
						break;
					case 2:
						var name = t[2];
						this.ensure(hscript_Token.TDoubleDot);
						fields.push({ name : name, t : this.parseType()});
						t = this.token();
						switch(t[1]) {
						case 9:
							break;
						case 7:
							throw "__break__";
							break;
						default:
							this.unexpected(t);
						}
						break;
					default:
						this.unexpected(t);
					}
				}
			} catch( e ) { if( e != "__break__" ) throw e; }
			return this.parseTypeNext(hscript_CType.CTAnon(fields));
		default:
			return this.unexpected(t);
		}
	}
	,parseTypeNext: function(t) {
		var tk = this.token();
		switch(tk[1]) {
		case 3:
			var op = tk[2];
			if(op != "->") {
				this.tokens.add(tk);
				return t;
			}
			break;
		default:
			this.tokens.add(tk);
			return t;
		}
		var t2 = this.parseType();
		switch(t2[1]) {
		case 1:
			var args = t2[2];
			args.unshift(t);
			return t2;
		default:
			return hscript_CType.CTFun([t],t2);
		}
	}
	,parseExprList: function(etk) {
		var args = [];
		var tk = this.token();
		if(tk == etk) return args;
		this.tokens.add(tk);
		try {
			while(true) {
				args.push(this.parseExpr());
				tk = this.token();
				switch(tk[1]) {
				case 9:
					break;
				default:
					if(tk == etk) throw "__break__";
					this.unexpected(tk);
				}
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		return args;
	}
	,incPos: function() {
	}
	,readChar: function() {
		try {
			return this.input.readByte();
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return 0;
		}
	}
	,readString: function(until) {
		var c = 0;
		var b = new haxe_io_BytesOutput();
		var esc = false;
		var old = this.line;
		var s = this.input;
		while(true) {
			try {
				c = s.readByte();
			} catch( e ) {
				haxe_CallStack.lastException = e;
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				this.line = old;
				throw new js__$Boot_HaxeError(hscript_Error.EUnterminatedString);
			}
			if(esc) {
				esc = false;
				switch(c) {
				case 110:
					b.writeByte(10);
					break;
				case 114:
					b.writeByte(13);
					break;
				case 116:
					b.writeByte(9);
					break;
				case 39:case 34:case 92:
					b.writeByte(c);
					break;
				case 47:
					if(this.allowJSON) b.writeByte(c); else this.invalidChar(c);
					break;
				case 117:
					if(!this.allowJSON) this.invalidChar(c);
					var code = null;
					try {
						code = s.readString(4);
					} catch( e1 ) {
						haxe_CallStack.lastException = e1;
						if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
						this.line = old;
						throw new js__$Boot_HaxeError(hscript_Error.EUnterminatedString);
					}
					var k = 0;
					var _g = 0;
					while(_g < 4) {
						var i = _g++;
						k <<= 4;
						var $char = HxOverrides.cca(code,i);
						if($char != null) switch($char) {
						case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
							k += $char - 48;
							break;
						case 65:case 66:case 67:case 68:case 69:case 70:
							k += $char - 55;
							break;
						case 97:case 98:case 99:case 100:case 101:case 102:
							k += $char - 87;
							break;
						default:
							this.invalidChar($char);
						} else this.invalidChar($char);
					}
					if(k <= 127) b.writeByte(k); else if(k <= 2047) {
						b.writeByte(192 | k >> 6);
						b.writeByte(128 | k & 63);
					} else {
						b.writeByte(224 | k >> 12);
						b.writeByte(128 | k >> 6 & 63);
						b.writeByte(128 | k & 63);
					}
					break;
				default:
					this.invalidChar(c);
				}
			} else if(c == 92) esc = true; else if(c == until) break; else {
				if(c == 10) this.line++;
				b.writeByte(c);
			}
		}
		return b.getBytes().toString();
	}
	,token: function() {
		if(!(this.tokens.head == null)) return this.tokens.pop();
		var $char;
		if(this["char"] < 0) $char = this.readChar(); else {
			$char = this["char"];
			this["char"] = -1;
		}
		while(true) {
			switch($char) {
			case 0:
				return hscript_Token.TEof;
			case 32:case 9:case 13:
				break;
			case 10:
				this.line++;
				break;
			case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
				var n = ($char - 48) * 1.0;
				var exp = 0.;
				while(true) {
					$char = this.readChar();
					exp *= 10;
					switch($char) {
					case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
						n = n * 10 + ($char - 48);
						break;
					case 46:
						if(exp > 0) {
							if(exp == 10 && this.readChar() == 46) {
								this.push(hscript_Token.TOp("..."));
								var i = n | 0;
								return hscript_Token.TConst(i == n?hscript_Const.CInt(i):hscript_Const.CFloat(n));
							}
							this.invalidChar($char);
						}
						exp = 1.;
						break;
					case 120:
						if(n > 0 || exp > 0) this.invalidChar($char);
						var n1 = 0;
						while(true) {
							$char = this.readChar();
							switch($char) {
							case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
								n1 = (n1 << 4) + $char - 48;
								break;
							case 65:case 66:case 67:case 68:case 69:case 70:
								n1 = (n1 << 4) + ($char - 55);
								break;
							case 97:case 98:case 99:case 100:case 101:case 102:
								n1 = (n1 << 4) + ($char - 87);
								break;
							default:
								this["char"] = $char;
								return hscript_Token.TConst(hscript_Const.CInt(n1));
							}
						}
						break;
					default:
						this["char"] = $char;
						var i1 = n | 0;
						return hscript_Token.TConst(exp > 0?hscript_Const.CFloat(n * 10 / exp):i1 == n?hscript_Const.CInt(i1):hscript_Const.CFloat(n));
					}
				}
				break;
			case 59:
				return hscript_Token.TSemicolon;
			case 40:
				return hscript_Token.TPOpen;
			case 41:
				return hscript_Token.TPClose;
			case 44:
				return hscript_Token.TComma;
			case 46:
				$char = this.readChar();
				switch($char) {
				case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
					var n2 = $char - 48;
					var exp1 = 1;
					while(true) {
						$char = this.readChar();
						exp1 *= 10;
						switch($char) {
						case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
							n2 = n2 * 10 + ($char - 48);
							break;
						default:
							this["char"] = $char;
							return hscript_Token.TConst(hscript_Const.CFloat(n2 / exp1));
						}
					}
					break;
				case 46:
					$char = this.readChar();
					if($char != 46) this.invalidChar($char);
					return hscript_Token.TOp("...");
				default:
					this["char"] = $char;
					return hscript_Token.TDot;
				}
				break;
			case 123:
				return hscript_Token.TBrOpen;
			case 125:
				return hscript_Token.TBrClose;
			case 91:
				return hscript_Token.TBkOpen;
			case 93:
				return hscript_Token.TBkClose;
			case 39:
				return hscript_Token.TConst(hscript_Const.CString(this.readString(39)));
			case 34:
				return hscript_Token.TConst(hscript_Const.CString(this.readString(34)));
			case 63:
				return hscript_Token.TQuestion;
			case 58:
				return hscript_Token.TDoubleDot;
			case 61:
				$char = this.readChar();
				if($char == 61) return hscript_Token.TOp("==");
				this["char"] = $char;
				return hscript_Token.TOp("=");
			default:
				if(this.ops[$char]) {
					var op = String.fromCharCode($char);
					var prev = -1;
					while(true) {
						$char = this.readChar();
						if(!this.ops[$char] || prev == 61) {
							if(HxOverrides.cca(op,0) == 47) return this.tokenComment(op,$char);
							this["char"] = $char;
							return hscript_Token.TOp(op);
						}
						prev = $char;
						op += String.fromCharCode($char);
					}
				}
				if(this.idents[$char]) {
					var id = String.fromCharCode($char);
					while(true) {
						$char = this.readChar();
						if(!this.idents[$char]) {
							this["char"] = $char;
							return hscript_Token.TId(id);
						}
						id += String.fromCharCode($char);
					}
				}
				this.invalidChar($char);
			}
			$char = this.readChar();
		}
		return null;
	}
	,tokenComment: function(op,$char) {
		var c = HxOverrides.cca(op,1);
		var s = this.input;
		if(c == 47) {
			try {
				while($char != 13 && $char != 10) $char = s.readByte();
				this["char"] = $char;
			} catch( e ) {
				haxe_CallStack.lastException = e;
				if (e instanceof js__$Boot_HaxeError) e = e.val;
			}
			return this.token();
		}
		if(c == 42) {
			var old = this.line;
			if(op == "/**/") {
				this["char"] = $char;
				return this.token();
			}
			try {
				while(true) {
					while($char != 42) {
						if($char == 10) this.line++;
						$char = s.readByte();
					}
					$char = s.readByte();
					if($char == 47) break;
				}
			} catch( e1 ) {
				haxe_CallStack.lastException = e1;
				if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
				this.line = old;
				throw new js__$Boot_HaxeError(hscript_Error.EUnterminatedComment);
			}
			return this.token();
		}
		this["char"] = $char;
		return hscript_Token.TOp(op);
	}
	,constString: function(c) {
		switch(c[1]) {
		case 0:
			var v = c[2];
			if(v == null) return "null"; else return "" + v;
			break;
		case 1:
			var f = c[2];
			if(f == null) return "null"; else return "" + f;
			break;
		case 2:
			var s = c[2];
			return s;
		}
	}
	,tokenString: function(t) {
		switch(t[1]) {
		case 0:
			return "<eof>";
		case 1:
			var c = t[2];
			return this.constString(c);
		case 2:
			var s = t[2];
			return s;
		case 3:
			var s1 = t[2];
			return s1;
		case 4:
			return "(";
		case 5:
			return ")";
		case 6:
			return "{";
		case 7:
			return "}";
		case 8:
			return ".";
		case 9:
			return ",";
		case 10:
			return ";";
		case 11:
			return "[";
		case 12:
			return "]";
		case 13:
			return "?";
		case 14:
			return ":";
		}
	}
	,__class__: hscript_Parser
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	val: null
	,__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js_Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
$hxClasses["js.html.compat.ArrayBuffer"] = js_html_compat_ArrayBuffer;
js_html_compat_ArrayBuffer.__name__ = ["js","html","compat","ArrayBuffer"];
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	byteLength: null
	,a: null
	,slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
$hxClasses["js.html.compat.DataView"] = js_html_compat_DataView;
js_html_compat_DataView.__name__ = ["js","html","compat","DataView"];
js_html_compat_DataView.prototype = {
	buf: null
	,offset: null
	,length: null
	,getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
$hxClasses["js.html.compat.Uint8Array"] = js_html_compat_Uint8Array;
js_html_compat_Uint8Array.__name__ = ["js","html","compat","Uint8Array"];
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
haxe_Resource.content = [{ name : "styles/default/main.css", data : ""},{ name : "haxeui-core/styles/default/dialogs/question-small.png", data : "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAz5JREFUeNpMVG1IU1EYfrZ7d6denVa26WItHaVlrSDLoi+WFRGpRflHWgXVjyAq+vgTEdXffkRQRH8CIdwPjSlBQRR9UTEzmgm1tpZu1XKT6bzb3If3zt5zi/LAc8+597zP877nPe97NW1tbdBoNNBqtepMmE9YCsBEMODPkAjRmZmZz4QxAgqFAtjM4//QE9ZardYN7e3tHbW1tStkWVY3eJ5HMBgc6u7u7gqFQq/pUz8hx/a4+vp65pWRd7S0tBxwOp1nB77A5H6WwN0HEh68SiEQSoMXRFPH/i3bKFLO7/czcoigcHV1dSyUja2trQccDsfBi7ej8EVKUFRWjaoqEyorK5EtiPhAnBfv4ji0t24lx3EyiYwxEV5RFFNNTc2m5uatzgu3otAbzEAmjxun5sw6nYjLd9IIRnS4dCeKS0e2OL1erz8cDvs4m83WdOzY0fNvhqaNgWgZBEGPiYkk4vE4PB/HMC7JWGwtQzCcwLdflM2pArSFJNbYzSaPp/89i8BssVgaup7+RGmpEaOjcdVn38ss0ukpbLbHYSyJIBBIoL9/EmazEYMBBev2VDcwrpYeFclkCp+GZShKAblcHtHYOH5EYqitltGxsxxfwtO4/3wKGk5AKp1XbTOZLBiXp6tiIpBlBVIqi9j4FEgH0Ohw9bhVjebK3VFwgqiu5RmebFUyGJcJJDmOxxILpTSRp0svAfc3dbvPjPypg6KKf+ksQFZtAS0TSDLvkUDgq2+5TY+klECxWE7eSlWDt52rVbA1+8agTGfQUCNgeHjEx7hM4KPL5XJvb6rEvOIU5OwkdHoy1hX988rWnI7IuSQWVGTgaJyDvj63m3E5o9GYmpgY19Ghi08fcSx78sqP0ViCTjIX955x6HwsU6h5SLEAqsQ4rp9rQG9vz32P542bCtDLBFhj/Bwc/KCl/tBePNlaX16UQzo+jCHvO0xGfVi1MIt9jvk4d3gZXK7O3p6eLjeV9COWU43dblc7S5Kk4lwut8NmW9J84sT5XY2N622zShEDA2+DN29eexgM+p/q9frHBoMho3bwLAEqnDTy+byF3puIs4gw7y+fVdcIETyCIHwXRREkoP4CfgswAD0VkVFpyDl9AAAAAElFTkSuQmCC"},{ name : "haxeui-core/styles/native/main.min.css", data : "KntuYXRpdmU6dHJ1ZTt9Ci5oc2xpZGVyOm5hdGl2ZSwudnNsaWRlcjpuYXRpdmUsLmhwcm9ncmVzczpuYXRpdmUsLnZwcm9ncmVzczpuYXRpdmV7d2lkdGg6YXV0bztoZWlnaHQ6YXV0bztiYWNrZ3JvdW5kOm5vbmU7Ym9yZGVyOm5vbmU7Ym9yZGVyLXJhZGl1czpub25lO30KLmJ1dHRvbjpuYXRpdmV7YmFja2dyb3VuZDpub25lO2JvcmRlcjpub25lO2JvcmRlci1yYWRpdXM6bm9uZTtjb2xvcjpub25lO30KLnRleHRmaWVsZDpuYXRpdmV7YmFja2dyb3VuZDpub25lO2JvcmRlcjpub25lO2JvcmRlci1yYWRpdXM6bm9uZTtjb2xvcjpub25lO2ZpbHRlcjpub25lO30KLmRpYWxvZzpuYXRpdmV7cGFkZGluZy10b3A6MHB4IWltcG9ydGFudDt9"},{ name : "haxeui-core/styles/default/right_arrow_white.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wcMBgEIxAeiMwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAOUlEQVQI12P8/////3eyqowMUMDEwMDAIPT49n8UAWRBxv///8NlUVQwMDAwvJNVZWRC5sBVINsCAJMjEmd7MjYNAAAAAElFTkSuQmCC"},{ name : "haxeui-core/styles/default/up_arrow.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAYAAABCxiV9AAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB98KChUfKOizO2AAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAACNJREFUCNdjYEACAQEB/5H5jNgkNmzYwAiXRNcBU8CITQIGALSTC+IXz7eLAAAAAElFTkSuQmCC"},{ name : "haxeui-core/styles/global.css", data : ""},{ name : "haxeui-core/styles/global.min.css", data : ""},{ name : "haxeui-core/styles/default/dialogs/cross-circle.png", data : "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA61pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcFJpZ2h0czpNYXJrZWQ9IkZhbHNlIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InV1aWQ6NzBDQkJENjFFODMxREYxMTlCMjJGQkJBMDE3QTBERTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzgzMTgzMzI4NDM0MTFFMDkyMTU5REUxMDUzQTBFMjciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzgzMTgzMzE4NDM0MTFFMDkyMTU5REUxMDUzQTBFMjciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTI1NDYxQUQyRjg0RTAxMTg1RkJBOTI1NDUxRDI5NkIiIHN0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"},{ name : "haxeui-core/styles/default/left_arrow.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wcMBQEeMpWpOwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAKElEQVQI12NgQAIBAQH/GZE5DAwMDIzIHAYGBgZGZA52FehmMKDbAgAUiA2PlOfODgAAAABJRU5ErkJggg"},{ name : "haxeui-core/styles/default/dialogs/exclamation-small.png", data : "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgdJREFUeNqkk8tu00AUho9nfKnDJU5j5NoJkTB20+JU3ZR1F+xaKhZIkRCSAYkdL9CqEgtW9B14BVa8AiyQQCELJCRUFUgXMZAKqOPY8WWYsZISaFohdaTPnjnz/2c84zMcIQTO0rg3L7iT5oqUZ6P+Q8rPaSJ0SvKmbt2zdcu1Wf8kEcoygH+hu7qMhdKaVru5qNXWF7GgrLHYNO3UBBTXsN0GCT+JJPwsGtbdBov9VwK60rJ0rrZaKjfM7Z2vsL3zDZTyNVMqVFfZ3LEEKX1MwMYPKtYdJ/I/oiAIgDHs7yH9yi2HzY00Rx6UpTTTCJLBjQuKsyLLRSONf4Hv+zlp7EOhoBjnL1orTDPp4dP06EBlDnGucXXdiYMvMExDaLVa4Hke7D9ahozsAj9bd9Lerksy8pLqB/lfiBMABv2c2+W560sIRUpv0AGvvwftdhu63S6kQghEjADESJGK1SWmHfsQK0SKCpzYVKuN+d7hW4izHgg4gu/ekxwRD3Mw50NR1+YJ4CbzMC9K6BboNu6rlfpCnH2QeeSDhMMcVXucMx4zZCmRS3OXFpiHeVGSgIUFaUOrzJgC/IAZutKYcZuMMfSqYiKe32BePgjIlllXbREfYkLYif65XMHBZv7uHzz/u34xYKM2a79/523xwQCi16/2OzTcOV7pT0+/iRxE3Fmv828BBgCYsyym9ECFNgAAAABJRU5ErkJggg"},{ name : "haxeui-core/styles/default/down_arrow.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAYAAABCxiV9AAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB98KChUgEnZhyO4AAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAClJREFUCNdjDAgI+M+AAzAyMDAwYFOwYcMGRkYYB1nBhg0bGDGMQTcBALTqC+LBRYBOAAAAAElFTkSuQmCC"},{ name : "haxeui-core/styles/test/main.css", data : "LmNvbXBvbmVudCB7DQp9DQoNCi52Ym94LCAuaGJveCwgLmFic29sdXRlIHsNCiAgICBzcGFjaW5nOiA1cHggNXB4Ow0KfQ0K"},{ name : "styles/default/app.min.css", data : ""},{ name : "haxeui-core/styles/default/small-close-button.png", data : "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACC0lEQVR42qSTzWoTURiGn5kmTav2x+ZkccJAhkCDdZvm5wrcFIobNxVFIiIiQegUai8g3bYX4RWIi95BID+4cOWs3NQM2DgTnZicMslxk4Y2LQj2g7P5+M738/C+ptaa2zxDa81tIjabMAxjDtgEHgASGAOnwFfgs9Z6dKX+8gaGYSwDO8B9YAAoILo07BfwUWv9++KPOTP5KbC8v7/ftW27B/SBvpSyX6vVhkAC2JrUXjthE1g9ODjoHh4eph3H6ReLxa5Satxut1NSypWFhYVTx3HuAQ+BL1dOMAzjBbBq23av2WwKIcRdz/P+RFE0sixrKQiCYalUGriuOwROtdafZhu8B3pA37btWKPREKlU6g6A7/uqXC5HrutqIACGWusPVxiYpqknwCKl1LlSakp7MBiMwzBkwkTF4/HoGsRkMukDSClpt9spy7KWfN9XnucN0+n0YqvVMjOZzBjQQoj+tQYbGxvfgJjjOAkp5UoQBMNyuRzl8/mR53kDKeXi7u7uHJAoFAo/p+gvJNnpdKy1tbWXQOXo6OhVLpd7B+wBbzKZzOvj4+O3wJ4Q4pnnedZNUjbr9Xpxe3s7d3Z2Ng/MAaOJmADmhRDnJycnbj6fb04Uyqw5EmEYFiqVylY2m30CPAd21tfXH1er1UdhGBa01ol/mckE0oAAVie5HvAD+D6dfJMX/if+DgC3ySh13L0wFwAAAABJRU5ErkJggg"},{ name : "styles/default/main.min.css", data : "LnRhYmJhci1idXR0b24tc2VsZWN0ZWQgLmxhYmVse29mZnNldC10b3A6LTFweDt9Ci5sYWJlbCwudGV4dGZpZWxke2ZvbnQtbmFtZToiQXJpYWwiO30KCg"},{ name : "haxeui-core/styles/default/dialogs/cross-circle-small.png", data : "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxtJREFUeNpUVF9IU2EU/213c+XmyjJtDV1NmytTK6YhaaJWlKBCYUW4nqKHqKfwVane8lUEoRcRHOVSh5GZBDaM0FaxCtS1uznMf6iIW7o/XbVzbkL2we9+373n/H7nO98531XU1dVBoVBAqVTKM+EA4RiADIIef0eYsLC1tTVOWCRgc3MTPKvwb2gIxSaT6Wx9ff1Ns9mcL0mSbFCpVBBF8Vt3d3dXKBR6T5/GCHG2CVarlaMy+WJNTU2D3W5/IHm9GfPPn2OurQ1LPT2IiCJ0Wm1G5fVr52mngs/nY3KIsCHk5ubyVkpra2sbKioqbgWbm6EeGYGJopoMBhjT0qALh7HqdmPe8wn59oZCQRAkEllkEeXGxkZGVlZWWVVVpV1sbsJBcj45MIC1tTUsLS3JWF9fx6nBQaQtL2Pq0SOUl5fbjUZjGXNZIO/q1Ss3fg4NQT8zC4vTKed95NkzrKysyOA1j+MuFzTBKSy+G0Z19eUbzGWBQ5mZmXnh0THodDo4c3Jk51gsBmNnJ1Lb2+H3+xEIBPB03z5EVlcR+eiBwWDIYy4L7I1EfiHq9UL6/RspWi06KO/x8XEsLCzIQlxet80mlylGAuwbjcbAXBWVikUgUV2jZFyfnYWO1nRQUKvVSEpKkpGyXWshkUCM7DKHuEp6RARBBXXeCcQo32QyHB0e/o/MfXBuchI6FiAy+wJKFohw9NkfP/wTOlsxVmi7hh3k70VF+FxYKAswiqkforSz5NNFCAanJpjLAl8dDkdvWmk54icK4L1wQSb7iHyY4jA81Cs8Xlos2KRAqSWlcLl6e5nLKcwFAn53X1/PC+vjFihsZ/CaDmwPt/A2eN1lNkNRXALLwyfo73e9CAYDbuYK6enpfDFmvN4vSkpPeamxyborx4KQoManmWn4VGpIlZdgvn0Xljv34XB09DmdXb3U0gOkKykKCgrkmxUOh3fH4/GL2dmWqnv3GqtttpLsHRcNHs8HsbW15ZUo+t5qNJo3er0+Kt/gHQJy+yYSiUx6P7Od/v5t/jJhigijdD7TWuoVEpB/AX8EGAD9/4gGGMr1dAAAAABJRU5ErkJggg"},{ name : "haxeui-core/styles/default/up_arrow_white.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAYAAABCxiV9AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wkMBhUMUvQPHgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAK0lEQVQI12N8K6PCAANCj2//fyerygjjMyFLINNwSWQBZD7j////USSQAQAKMRRsCchObQAAAABJRU5ErkJggg"},{ name : "haxeui-core/styles/default/up_down_arrows.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAcAAAAJCAYAAAD+WDajAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gMNEQ4TVvPQ5QAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAALklEQVQY02NgQAKurq7/kfmM2CR2797NCJdE1wFTwIhNgiiAVyd+O/G5lgGfPwHVkBc/CRjuawAAAABJRU5ErkJggg"},{ name : "haxeui-core/styles/default/dialogs/information-small.png", data : "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNJREFUeNpMlF9sS1Ecx7+997Zdd2uKamdLO7ZERxkPiz9BlhoSS7ZhFiKKxBMRkeCJePJG4kWIF4kH68MmnQgSIYIgYwkjYVrNNP5tlW7dbau9dXvr9zsTnOTbc+455/M95/x+59TS3d0Ni8UCSZJETZpPWgLAS6rBTNFIE5VK5T3pBwmmaYJrBf+KnbSqoaFhXW9v757GxsblhmGIAUVRkEgk3vb39/clk8mn1PWCpPOY3NzczKsyvKWzs3NvOBw+PvwB3ujDDK7e0nDrSQ7xZB6KTfXu2dm2iXYqx2IxhpOkshwIBHgr67u6uvaGQqF9py9PYPRbNapmLUBtrRdutxtFU8UrYh69TGP/9sAKWZYNMvnBJlK5XPb6/f4N7e0bw6cuTUCu9sLlcmFs7DvOHVJx/rCKZHJc9JlWN85cSaOtrS1cX1+/gVk2CPb07Nh9+3EKxcosCg4wPp5GsVj8Gxxup1KTYkzTHbg/NIWOjq27mVXop87n8wX7HnyF0+kRMBfqR2BrlGpTBJG/udTVeTASL2PNtgVBZtnAlc3m8G7MwMJGE7peQmY6h/zPPCJn/SK1u059gUW2CYNcvkRzKygUimzqUihVfAwYRhlajrY6+RO0KCySXcAOhwOSXEUGMxk3KgrNFTCYZYOsTIOLfRTSTImSXg2ZJpqGLmCn0wnJSiaKXRiYMMRcQGKDLK/+LR7/OLqsyY6sloFDnQ3ZRpAyA6uqKtrcxyr/KiC4yEZZ+jTKLBu8iUQi0c2r3ZjnyMEoTsNqp8nWKgHzMbgtWwnWs6h3FRBqnYObN6NRZmWPx5Obmpq00qkdxw6Glt5/EsN4KkMnmYvrDxVcu2fQVkvQUnHUqmlcOBHE4ODAjaGhZ1G6gK/ZgB/G15GRVxLlWTp9tKt5dpWOfHoMb1+/xPTEKFb6i+gJzceJA0sRiVwbHBjoi9KVvssxtbS0tIiXpWmaQ9f1LU1Ni9uPHDnZ0dq6tum/h4bh4eeJixfP3UkkYg/sdvu9mpqagnjB/xkgn8+jVCr56Hs1MQtJ8/7wfLs+ETBks9k+c2zIQPwF/BZgAGlYhQuEH1lJAAAAAElFTkSuQmCC"},{ name : "haxeui-core/styles/default/haxeui.png", data : "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"},{ name : "styles/main.min.css", data : ""},{ name : "haxeui-core/styles/default/dialogs/information.png", data : "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"},{ name : "haxeui-core/styles/default/main.css", data : "LmNvbXBvbmVudCB7DQp9DQoNCi5jdXN0b20tY29tcG9uZW50IHsNCiAgICB3aWR0aDogYXV0bzsNCiAgICBoZWlnaHQ6IGF1dG87DQp9DQoNCi5tb2RhbC1iYWNrZ3JvdW5kIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjazsNCiAgICBvcGFjaXR5OiAwLjI7DQp9DQoNCi5tb2RhbC1jb21wb25lbnQgew0KICAgIGZpbHRlcjogYmx1cigxKTsNCn0NCg0KLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogRElBTE9HUw0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5kaWFsb2cgew0KICAgIGJvcmRlcjogMXB4IHNvbGlkICNBQkFCQUI7DQogICAgZmlsdGVyOiBkcm9wLXNoYWRvdygxLCA0NSwgIzAwMDAwMCwgMC4yLCAyLCAyLCAxLCAzLCBmYWxzZSk7DQogICAgYm9yZGVyLXJhZGl1czogMnB4Ow0KICAgIGhlaWdodDogYXV0bzsNCiAgICB3aWR0aDogMzAwcHg7DQogICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7DQogICAgcGFkZGluZzogMXB4Ow0KfQ0KDQouZGlhbG9nLXRpdGxlLWJhciB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI0VFRUVFRTsNCiAgICBwYWRkaW5nOiA1cHg7DQogICAgd2lkdGg6IDEwMCU7DQogICAgYm9yZGVyLWJvdHRvbS13aWR0aDogMXB4Ow0KICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICNBQkFCQUI7DQp9DQoNCi5kaWFsb2ctdGl0bGUgew0KICAgIHdpZHRoOiAxMDAlOw0KICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7DQogICAgZm9udC1zdHlsZTogYm9sZDsNCiAgICBjb2xvcjogIzg4ODg4ODsNCn0NCg0KLmRpYWxvZy1jb250ZW50IHsNCiAgICBwYWRkaW5nOiAxMHB4Ow0KfQ0KDQouZGlhbG9nLWNsb3NlLWJ1dHRvbiB7DQogICAgaWNvbjogImhheGV1aS1jb3JlL3N0eWxlcy9kZWZhdWx0L3NtYWxsLWNsb3NlLWJ1dHRvbi5wbmciOw0KICAgIHBhZGRpbmc6IDAgIWltcG9ydGFudDsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyOw0KICAgIGJvcmRlcjogbm9uZSAhaW1wb3J0YW50Ow0KICAgIGJhY2tncm91bmQtY29sb3I6IG5vbmUgIWltcG9ydGFudDsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyOw0KfQ0KDQouZGlhbG9nLWJ1dHRvbnMgew0KICAgIGhvcml6b250YWwtYWxpZ246IHJpZ2h0Ow0KICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7DQogICAgcGFkZGluZy1ib3R0b206IDEwcHg7DQogICAgcGFkZGluZy1sZWZ0OiAxMHB4Ow0KICAgIHBhZGRpbmctdG9wOiAxMHB4Ow0KfQ0KDQoubWVzc2FnZS1kaWFsb2ctbWVzc2FnZSB7DQogICAgdmVydGljYWwtYWxpZ246IGNlbnRlcjsNCn0NCg0KLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogTEFCRUwNCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQoubGFiZWwgew0KICAgIHdpZHRoOiBhdXRvOw0KICAgIGhlaWdodDogYXV0bzsNCn0NCg0KLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogSU1BR0UNCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQouaW1hZ2Ugew0KICAgIHdpZHRoOiBhdXRvOw0KICAgIGhlaWdodDogYXV0bzsNCn0NCg0KLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogQlVUVE9ODQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLw0KLmJ1dHRvbiB7DQogICAgYmFja2dyb3VuZDogI0VERURFRCAjRTZFNkU2Ow0KICAgIGNvbG9yOiAjMjIyMjIyOw0KICAgIGJvcmRlcjogMXB4IHNvbGlkICNBQkFCQUI7DQogICAgYm9yZGVyLXJhZGl1czogMnB4Ow0KICAgIHBhZGRpbmc6IDVweCA1cHg7DQogICAgY3Vyc29yOiBwb2ludGVyOw0KICAgIHdpZHRoOiBhdXRvOw0KICAgIGhlaWdodDogYXV0bzsNCiAgICBzcGFjaW5nOiA1cHggNXB4Ow0KfQ0KDQouYnV0dG9uOmhvdmVyIHsNCiAgICBiYWNrZ3JvdW5kOiAjRjVGNUY1ICNGMUYxRjE7DQogICAgY29sb3I6ICMwMDAwMDA7DQp9DQoNCi5idXR0b246ZG93biB7DQogICAgYmFja2dyb3VuZDogI0QyRDJEMiAjQzJDMkMyOw0KICAgIGNvbG9yOiAjMDAwMDAwOw0KICAgIGJvcmRlci1jb2xvcjogIzdGN0Y3RjsNCn0NCg0KLmJ1dHRvbjphY3RpdmUgew0KICAgIGJvcmRlcjogMnB4IHNvbGlkICM3N0M2RkY7DQp9DQoNCi5idXR0b24uZW1waGFzaXplZCB7DQogICAgYmFja2dyb3VuZDogI0RBRTRFRSAjRDRERUU4Ow0KICAgIGJvcmRlci1jb2xvcjogIzZDQTFENzsNCn0NCg0KLmJ1dHRvbi5lbXBoYXNpemVkOmhvdmVyIHsNCiAgICBiYWNrZ3JvdW5kOiAjRTJFQ0Y2ICNERUU4RjI7DQogICAgYm9yZGVyLWNvbG9yOiAjNkNBMUQ3Ow0KfQ0KDQouYnV0dG9uLmVtcGhhc2l6ZWQ6ZG93biB7DQogICAgYmFja2dyb3VuZDogI0MyQ0NENiAjQjRCRUM4Ow0KICAgIGJvcmRlci1jb2xvcjogIzU2OENDMTsNCn0NCg0KLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogVEVYVCBGSUVMRA0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi50ZXh0ZmllbGQgew0KICAgIGJhY2tncm91bmQ6ICNGRkZGRkY7DQogICAgY29sb3I6ICM0NDQ0NDQ7DQogICAgYm9yZGVyOiAxcHggc29saWQgI0FCQUJBQjsNCiAgICBib3JkZXItcmFkaXVzOiAycHg7DQogICAgcGFkZGluZzogNXB4IDVweDsNCiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDEsIDQ1LCAjODg4ODg4LCAwLjIsIDEsIDEsIDEsIDMsIHRydWUpOw0KICAgIGhlaWdodDogYXV0bzsNCiAgICBzcGFjaW5nOiA1cHg7DQogICAgaWNvbi1wb3NpdGlvbjogcmlnaHQ7DQp9DQoNCi50ZXh0ZmllbGQ6YWN0aXZlIHsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjMjE2QUFFOw0KfQ0KDQovKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqDQoqKiBDT05UQUlORVJTDQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLw0KLnZib3gsIC5oYm94LCAuYWJzb2x1dGUgew0KICAgIHNwYWNpbmc6IDVweCA1cHg7DQogICAgc3BhY2luZzogNXB4IDVweDsNCn0NCg0KLnZib3gsIC5oYm94IHsNCiAgICB3aWR0aDogYXV0bzsNCiAgICBoZWlnaHQ6IGF1dG87DQp9DQoNCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCioqIFNDUk9MTA0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5zY3JvbGwgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICNFOUU5RTk7DQp9DQoNCi5zY3JvbGwgLmJ1dHRvbiB7DQogICAgYm9yZGVyLXJhZGl1czogMDsNCiAgICBib3JkZXI6IG5vbmU7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI0U5RTlFOTsNCiAgICBwYWRkaW5nOiAwOw0KICAgIGZpbHRlcjogbm9uZTsNCn0NCg0KLnNjcm9sbCAuYnV0dG9uOmhvdmVyIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRDdEN0Q3Ow0KfQ0KDQouc2Nyb2xsIC5idXR0b246ZG93biB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzUyNTI1MjsNCiAgICBmaWx0ZXI6IG5vbmU7DQp9DQoNCi5zY3JvbGwgLmJ1dHRvbi5kZWluYyB7DQogICAgaGVpZ2h0OiAxN3B4Ow0KICAgIHdpZHRoOiAxN3B4Ow0KfQ0KDQouc2Nyb2xsIC5idXR0b24uZGVpbmM6ZG93biB7DQp9DQoNCi5zY3JvbGwgLmJ1dHRvbi5pbmMgew0KICAgIGhlaWdodDogMTdweDsNCiAgICB3aWR0aDogMTdweDsNCn0NCg0KLnNjcm9sbCAuYnV0dG9uLmluYzpkb3duIHsNCn0NCg0KLnNjcm9sbCAuYnV0dG9uLnRodW1iIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjQzZDNkM2Ow0KfQ0KDQouc2Nyb2xsIC5idXR0b24udGh1bWI6aG92ZXIgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICNBQUFBQUE7DQp9DQoNCi5zY3JvbGwgLmJ1dHRvbi50aHVtYjpkb3duIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTI1MjUyOw0KfQ0KDQovKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqDQoqKiBWU0NST0xMDQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLw0KLnZzY3JvbGwgew0KICAgIHdpZHRoOiAxN3B4Ow0KfQ0KDQoudnNjcm9sbCAuYnV0dG9uLnRodW1iIHsNCiAgICB3aWR0aDogMTdweDsNCiAgICBoZWlnaHQ6IDE3cHg7DQp9DQoNCi52c2Nyb2xsIC5idXR0b24uZGVpbmMgew0KICAgIGljb246ICJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC91cF9hcnJvdy5wbmciOw0KfQ0KDQoudnNjcm9sbCAuYnV0dG9uLmRlaW5jOmRvd24gew0KICAgIGljb246ICJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC91cF9hcnJvd193aGl0ZS5wbmciOw0KfQ0KDQoudnNjcm9sbCAuYnV0dG9uLmluYyB7DQogICAgaWNvbjogImhheGV1aS1jb3JlL3N0eWxlcy9kZWZhdWx0L2Rvd25fYXJyb3cucG5nIjsNCn0NCg0KLnZzY3JvbGwgLmJ1dHRvbi5pbmM6ZG93biB7DQogICAgaWNvbjogImhheGV1aS1jb3JlL3N0eWxlcy9kZWZhdWx0L2Rvd25fYXJyb3dfd2hpdGUucG5nIjsNCn0NCg0KLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogSFNDUk9MTA0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5oc2Nyb2xsIHsNCiAgICBoZWlnaHQ6IDE3cHg7DQp9DQoNCi5oc2Nyb2xsIC5idXR0b24udGh1bWIgew0KICAgIHdpZHRoOiAxN3B4Ow0KICAgIGhlaWdodDogMTdweDsNCn0NCg0KLmhzY3JvbGwgLmJ1dHRvbi5kZWluYyB7DQogICAgaWNvbjogImhheGV1aS1jb3JlL3N0eWxlcy9kZWZhdWx0L2xlZnRfYXJyb3cucG5nIjsNCn0NCg0KLmhzY3JvbGwgLmJ1dHRvbi5kZWluYzpkb3duIHsNCiAgICBpY29uOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvbGVmdF9hcnJvd193aGl0ZS5wbmciOw0KfQ0KDQouaHNjcm9sbCAuYnV0dG9uLmluYyB7DQogICAgaWNvbjogImhheGV1aS1jb3JlL3N0eWxlcy9kZWZhdWx0L3JpZ2h0X2Fycm93LnBuZyI7DQp9DQoNCi5oc2Nyb2xsIC5idXR0b24uaW5jOmRvd24gew0KICAgIGljb246ICJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC9yaWdodF9hcnJvd193aGl0ZS5wbmciOw0KfQ0KDQovKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqDQoqKiBTQ1JPTExWSUVXDQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLw0KLnNjcm9sbHZpZXcgew0KICAgIGJvcmRlcjogMXB4IHNvbGlkICNBQkFCQUI7DQogICAgYm9yZGVyLXJhZGl1czogMXB4Ow0KICAgIHBhZGRpbmc6IDFweDsNCiAgICB3aWR0aDogYXV0bzsNCiAgICBoZWlnaHQ6IGF1dG87DQp9DQoNCi5zY3JvbGx2aWV3IC5zY3JvbGx2aWV3LWNvbnRlbnRzIHsNCiAgICBoZWlnaHQ6IGF1dG87DQogICAgc3BhY2luZzogNXB4Ow0KICAgIHBhZGRpbmc6IDVweDsNCiAgICBib3JkZXI6IG5vbmU7DQp9DQoNCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCioqIENIRUNLQk9YDQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLw0KLmNoZWNrYm94IHsNCiAgICB3aWR0aDogYXV0bzsNCiAgICBoZWlnaHQ6IGF1dG87DQogICAgaG9yaXpvbnRhbC1zcGFjaW5nOiA0cHg7DQogICAgY3Vyc29yOiBwb2ludGVyOw0KICAgIGNvbG9yOiAjMDAwMDAwOw0KfQ0KDQouY2hlY2tib3g6aG92ZXIgew0KfQ0KDQouY2hlY2tib3gtdmFsdWUgew0KICAgIGJvcmRlcjogMXB4IHNvbGlkICNBQkFCQUI7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjsNCiAgICB3aWR0aDogMTZweDsNCiAgICBoZWlnaHQ6IDE2cHg7DQogICAgdmVydGljYWwtYWxpZ246IGNlbnRlcjsNCiAgICBib3JkZXItcmFkaXVzOiAycHg7DQogICAgaWNvbjogbm9uZTsNCiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDEsIDQ1LCAjODg4ODg4LCAwLjIsIDIsIDIsIDEsIDMsIHRydWUpOw0KICAgIGN1cnNvcjogcG9pbnRlcjsNCn0NCg0KLmNoZWNrYm94LXZhbHVlOmhvdmVyIHsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjMjE2QUFFOw0KfQ0KDQouY2hlY2tib3gtdmFsdWU6c2VsZWN0ZWQgew0KICAgIGljb246ICJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC9jaGVjay5wbmciOw0KfQ0KDQouY2hlY2tib3gtbGFiZWwgew0KICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7DQp9DQoNCi5jaGVja2JveC1pY29uIHsNCiAgICBob3Jpem9udGFsLWFsaWduOiBjZW50ZXI7DQogICAgdmVydGljYWwtYWxpZ246IGNlbnRlcjsNCiAgICBjdXJzb3I6IHBvaW50ZXI7DQp9DQoNCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCioqIE9QVElPTkJPWA0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5vcHRpb25ib3ggew0KICAgIHdpZHRoOiBhdXRvOw0KICAgIGhlaWdodDogYXV0bzsNCiAgICBob3Jpem9udGFsLXNwYWNpbmc6IDRweDsNCiAgICBjdXJzb3I6IHBvaW50ZXI7DQogICAgY29sb3I6ICMwMDAwMDA7DQp9DQoNCi5vcHRpb25ib3g6aG92ZXIgew0KfQ0KDQoub3B0aW9uYm94LXZhbHVlIHsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQUJBQkFCOw0KICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7DQogICAgd2lkdGg6IDE2cHg7DQogICAgaGVpZ2h0OiAxNnB4Ow0KICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7DQogICAgYm9yZGVyLXJhZGl1czogMThweDsNCiAgICBpY29uOiBub25lOw0KICAgIGZpbHRlcjogZHJvcC1zaGFkb3coMSwgNDUsICM4ODg4ODgsIDAuMiwgMiwgMiwgMSwgMywgdHJ1ZSk7DQogICAgcGFkZGluZy10b3A6IDFweDsNCiAgICBjdXJzb3I6IHBvaW50ZXI7DQp9DQoNCi5vcHRpb25ib3gtdmFsdWU6aG92ZXIgew0KICAgIGJvcmRlcjogMXB4IHNvbGlkICMyMTZBQUU7DQp9DQoNCi5vcHRpb25ib3gtdmFsdWU6c2VsZWN0ZWQgew0KICAgIGljb246ICJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC9vcHRpb24ucG5nIjsNCn0NCg0KLm9wdGlvbmJveC1sYWJlbCB7DQogICAgdmVydGljYWwtYWxpZ246IGNlbnRlcjsNCiAgICBjdXJzb3I6IHBvaW50ZXI7DQp9DQoNCi5vcHRpb25ib3gtaWNvbiB7DQogICAgaG9yaXpvbnRhbC1hbGlnbjogY2VudGVyOw0KICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7DQogICAgY3Vyc29yOiBwb2ludGVyOw0KfQ0KDQovKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqDQoqKiBIUFJPR1JFU1MNCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQouaHByb2dyZXNzIHsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQUJBQkFCOw0KICAgIHBhZGRpbmc6IDJweDsNCiAgICBib3JkZXItcmFkaXVzOiAycHg7DQogICAgYmFja2dyb3VuZDogI0YxRjFGMSAjRkZGRkZGIHZlcnRpY2FsOw0KICAgIGZpbHRlcjogZHJvcC1zaGFkb3coMSwgNDUsICM4ODg4ODgsIDAuMiwgMiwgMiwgMSwgMywgdHJ1ZSk7DQp9DQoNCi5ocHJvZ3Jlc3MgLnByb2dyZXNzLXZhbHVlIHsNCiAgICBib3JkZXI6IG5vbmU7DQogICAgYmFja2dyb3VuZDogIzZDQUFEQiAjMjE2QUFFIHZlcnRpY2FsOw0KICAgIGhlaWdodDogMTAwJTsNCiAgICBib3JkZXItcmFkaXVzOiAycHg7DQp9DQoNCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCioqIFZQUk9HUkVTUw0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi52cHJvZ3Jlc3Mgew0KICAgIGJvcmRlcjogMXB4IHNvbGlkICNBQkFCQUI7DQogICAgcGFkZGluZzogMnB4Ow0KICAgIGJvcmRlci1yYWRpdXM6IDJweDsNCiAgICBiYWNrZ3JvdW5kOiAjRjFGMUYxICNGRkZGRkYgaG9yaXpvbnRhbDsNCiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDEsIDQ1LCAjODg4ODg4LCAwLjIsIDIsIDIsIDEsIDMsIHRydWUpOw0KfQ0KDQoudnByb2dyZXNzIC5wcm9ncmVzcy12YWx1ZSB7DQogICAgYm9yZGVyOiBub25lOw0KICAgIGJhY2tncm91bmQ6ICM2Q0FBREIgIzIxNkFBRSBob3Jpem9udGFsOw0KICAgIHdpZHRoOiAxMDAlOw0KICAgIGJvcmRlci1yYWRpdXM6IDJweDsNCn0NCg0KLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogSFNMSURFUg0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5oc2xpZGVyIHsNCiAgICBwYWRkaW5nLWxlZnQ6IDVweDsNCiAgICBwYWRkaW5nLXJpZ2h0OiA1cHg7DQp9DQoNCi5oc2xpZGVyIC5zbGlkZXItdmFsdWUtYmFja2dyb3VuZCB7DQogICAgYm9yZGVyOiAxcHggc29saWQgI0FCQUJBQjsNCiAgICBwYWRkaW5nOiAycHg7DQogICAgYm9yZGVyLXJhZGl1czogNHB4Ow0KICAgIGJhY2tncm91bmQ6ICNGMUYxRjEgI0ZGRkZGRiB2ZXJ0aWNhbDsNCiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDEsIDQ1LCAjODg4ODg4LCAwLjIsIDIsIDIsIDEsIDMsIHRydWUpOw0KICAgIHdpZHRoOiAxMDAlOw0KICAgIGhlaWdodDogOHB4Ow0KICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7DQogICAgY3Vyc29yOiBwb2ludGVyOw0KfQ0KDQouaHNsaWRlciAuc2xpZGVyLXZhbHVlIHsNCiAgICBib3JkZXI6IG5vbmU7DQogICAgYmFja2dyb3VuZDogIzZDQUFEQiAjMjE2QUFFIHZlcnRpY2FsOw0KICAgIGhlaWdodDogMTAwJTsNCiAgICBib3JkZXItcmFkaXVzOiAycHg7DQogICAgY3Vyc29yOiBwb2ludGVyOw0KfQ0KDQouaHNsaWRlciAuc2xpZGVyLWJ1dHRvbiB7DQogICAgdmVydGljYWwtYWxpZ246IGNlbnRlcjsNCiAgICBoZWlnaHQ6IDE0cHg7DQogICAgd2lkdGg6IDE0cHg7DQogICAgYm9yZGVyLXJhZGl1czogMTZweDsNCn0NCg0KLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogVlNMSURFUg0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi52c2xpZGVyIHsNCiAgICBwYWRkaW5nLXRvcDogNXB4Ow0KICAgIHBhZGRpbmctYm90dG9tOiA1cHg7DQp9DQoNCi52c2xpZGVyIC5zbGlkZXItdmFsdWUtYmFja2dyb3VuZCB7DQogICAgYm9yZGVyOiAxcHggc29saWQgI0FCQUJBQjsNCiAgICBwYWRkaW5nOiAycHg7DQogICAgYm9yZGVyLXJhZGl1czogNHB4Ow0KICAgIGJhY2tncm91bmQ6ICNGMUYxRjEgI0ZGRkZGRiBob3Jpem9udGFsOw0KICAgIGZpbHRlcjogZHJvcC1zaGFkb3coMSwgNDUsICM4ODg4ODgsIDAuMiwgMiwgMiwgMSwgMywgdHJ1ZSk7DQogICAgaGVpZ2h0OiAxMDAlOw0KICAgIHdpZHRoOiA4cHg7DQogICAgaG9yaXpvbnRhbC1hbGlnbjogY2VudGVyOw0KICAgIGN1cnNvcjogcG9pbnRlcjsNCn0NCg0KLnZzbGlkZXIgLnNsaWRlci12YWx1ZSB7DQogICAgYm9yZGVyOiBub25lOw0KICAgIGJhY2tncm91bmQ6ICM2Q0FBREIgIzIxNkFBRSBob3Jpem9udGFsOw0KICAgIHdpZHRoOiAxMDAlOw0KICAgIGJvcmRlci1yYWRpdXM6IDJweDsNCiAgICBjdXJzb3I6IHBvaW50ZXI7DQp9DQoNCi52c2xpZGVyIC5zbGlkZXItYnV0dG9uIHsNCiAgICBob3Jpem9udGFsLWFsaWduOiBjZW50ZXI7DQogICAgaGVpZ2h0OiAxNHB4Ow0KICAgIHdpZHRoOiAxNHB4Ow0KICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7DQp9DQoNCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCioqIFRBQlMNCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQoudGFiYmFyIHsNCiAgICBob3Jpem9udGFsLXNwYWNpbmc6IDVweDsNCiAgICBwYWRkaW5nLWxlZnQ6IDVweDsNCiAgICBwYWRkaW5nLXJpZ2h0OiA1cHg7DQogICAgaGVpZ2h0OiBhdXRvOw0KICAgIHdpZHRoOiBhdXRvOw0KICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlOw0KICAgIGJvcmRlci1ib3R0b20td2lkdGg6IDFweDsNCiAgICBib3JkZXItYm90dG9tLWNvbG9yOiAjQUJBQkFCOw0KfQ0KDQovKg0KLnRhYmJhciAudGFiYmFyLWJhY2tncm91bmQgew0KICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlOw0KICAgIGJvcmRlcjogbm9uZTsNCn0NCiovDQoNCi50YWJiYXItYnV0dG9uIHsNCiAgICBib3JkZXItcmFkaXVzOiAwcHg7DQogICAgYmFja2dyb3VuZDogI0VERURFRCAjRTZFNkU2Ow0KICAgIHBhZGRpbmc6IDZweDsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tOw0KfQ0KDQoudGFiYmFyLWJ1dHRvbjpkb3duIHsNCn0NCg0KLnRhYmJhci1idXR0b24tc2VsZWN0ZWQsIC50YWJiYXItYnV0dG9uLXNlbGVjdGVkOmhvdmVyLCAudGFiYmFyLWJ1dHRvbi1zZWxlY3RlZDpkb3duIHsNCiAgICBib3JkZXItcmFkaXVzOiAwcHg7DQoNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQUJBQkFCOw0KICAgIGJvcmRlci1ib3R0b20td2lkdGg6IDFweDsNCiAgICBib3JkZXItYm90dG9tLWNvbG9yOiB3aGl0ZTsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsNCn0NCg0KLnRhYmJhci1idXR0b24tc2VsZWN0ZWQgLmxhYmVsIHsNCn0NCg0KLnRhYmJhci1idXR0b24tc2VsZWN0ZWQgLmljb24gew0KfQ0KDQoudGFidmlldyB7DQogICAgYm9yZGVyOiBub25lOw0KICAgIHdpZHRoOiBhdXRvOw0KICAgIGhlaWdodDogYXV0bzsNCn0NCg0KLnRhYnZpZXcgLnRhYnZpZXctdGFicyB7DQp9DQoNCi50YWJ2aWV3IC50YWJ2aWV3LWNvbnRlbnQgew0KICAgIGJvcmRlcjogMXB4IHNvbGlkICNBQkFCQUI7DQogICAgcGFkZGluZzogNXB4Ow0KICAgIHdpZHRoOiAxMDAlOw0KICAgIGhlaWdodDogMTAwJTsNCn0NCg"},{ name : "haxeui-core/styles/default/right_arrow.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wcMBQExmUSUYgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAALUlEQVQI122MwQkAMBDCck7oqG7Yvg6kNC8NKLYPhQBaasPK+U6WJKMuvIcAF0CaDdeJj/KWAAAAAElFTkSuQmCC"},{ name : "styles/main.css", data : ""},{ name : "styles/default/app.css", data : ""},{ name : "haxeui-core/styles/default/down_arrow_white.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAYAAABCxiV9AAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB98KChcWJt1NeUAAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAClJREFUCNdj/P///38GHIDpnawqIzaJd7KqjEwwBroEAwMDAxO6ALJCAAXdCyoVfrojAAAAAElFTkSuQmCC"},{ name : "haxeui-core/styles/default/transparent_px.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEX/AP804Oa6AAAAAXRSTlMAQObYZgAAAApJREFUeJxjYgAAAAYAAzY3fKgAAAAASUVORK5CYII"},{ name : "styles/native/main.css", data : "LmJ1dHRvbiB7DQp9DQoNCi50YWJiYXItYnV0dG9uIHsNCiAgICBuYXRpdmU6IGZhbHNlOw0KfQ0KDQoudGFiYmFyLWJ1dHRvbiB7DQogICAgYm9yZGVyLXJhZGl1czogMHB4Ow0KICAgIGJhY2tncm91bmQ6ICNFREVERUQgI0U2RTZFNjsNCiAgICBwYWRkaW5nOiA2cHg7DQogICAgdmVydGljYWwtYWxpZ246IGJvdHRvbTsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQUJBQkFCOw0KfQ0KDQoudGFiYmFyLWJ1dHRvbjpkb3duIHsNCn0NCg0KLnRhYmJhci1idXR0b24tc2VsZWN0ZWQsIC50YWJiYXItYnV0dG9uLXNlbGVjdGVkOmhvdmVyLCAudGFiYmFyLWJ1dHRvbi1zZWxlY3RlZDpkb3duIHsNCiAgICBib3JkZXItcmFkaXVzOiAwcHg7DQoNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQUJBQkFCOw0KICAgIGJvcmRlci1ib3R0b20td2lkdGg6IDFweDsNCiAgICBib3JkZXItYm90dG9tLWNvbG9yOiB3aGl0ZTsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsNCg0KfQ0K"},{ name : "haxeui-core/styles/default/left_arrow_white.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AESCxUGz2OrRgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAOklEQVQI11XMoRWAQAxEwUlKQIPj+i8IiYYWgrp7Yd18sfHsp7ntvio7IDsgqmoB8j1G/AL0uE5n/AD4RBE2xaxDjQAAAABJRU5ErkJggg"},{ name : "haxeui-core/styles/default/main.min.css", data : "LmNvbXBvbmVudHt9Ci5jdXN0b20tY29tcG9uZW50e3dpZHRoOmF1dG87aGVpZ2h0OmF1dG87fQoubW9kYWwtYmFja2dyb3VuZHtiYWNrZ3JvdW5kLWNvbG9yOmJsYWNrO29wYWNpdHk6MC4yO30KLm1vZGFsLWNvbXBvbmVudHtmaWx0ZXI6Ymx1cigxKTt9Ci5kaWFsb2d7Ym9yZGVyOjFweCBzb2xpZCAjQUJBQkFCO2ZpbHRlcjpkcm9wLXNoYWRvdygxLDQ1LCMwMDAwMDAsMC4yLDIsMiwxLDMsZmFsc2UpO2JvcmRlci1yYWRpdXM6MnB4O2hlaWdodDphdXRvO3dpZHRoOjMwMHB4O2JhY2tncm91bmQtY29sb3I6d2hpdGU7cGFkZGluZzoxcHg7fQouZGlhbG9nLXRpdGxlLWJhcntiYWNrZ3JvdW5kLWNvbG9yOiNFRUVFRUU7cGFkZGluZzo1cHg7d2lkdGg6MTAwJTtib3JkZXItYm90dG9tLXdpZHRoOjFweDtib3JkZXItYm90dG9tLWNvbG9yOiNBQkFCQUI7fQouZGlhbG9nLXRpdGxle3dpZHRoOjEwMCU7dmVydGljYWwtYWxpZ246Y2VudGVyO2ZvbnQtc3R5bGU6Ym9sZDtjb2xvcjojODg4ODg4O30KLmRpYWxvZy1jb250ZW50e3BhZGRpbmc6MTBweDt9Ci5kaWFsb2ctY2xvc2UtYnV0dG9ue2ljb246ImhheGV1aS1jb3JlL3N0eWxlcy9kZWZhdWx0L3NtYWxsLWNsb3NlLWJ1dHRvbi5wbmciO3BhZGRpbmc6MCFpbXBvcnRhbnQ7dmVydGljYWwtYWxpZ246Y2VudGVyO2JvcmRlcjpub25lIWltcG9ydGFudDtiYWNrZ3JvdW5kLWNvbG9yOm5vbmUhaW1wb3J0YW50O3ZlcnRpY2FsLWFsaWduOmNlbnRlcjt9Ci5kaWFsb2ctYnV0dG9uc3tob3Jpem9udGFsLWFsaWduOnJpZ2h0O3BhZGRpbmctcmlnaHQ6MTBweDtwYWRkaW5nLWJvdHRvbToxMHB4O3BhZGRpbmctbGVmdDoxMHB4O3BhZGRpbmctdG9wOjEwcHg7fQoubWVzc2FnZS1kaWFsb2ctbWVzc2FnZXt2ZXJ0aWNhbC1hbGlnbjpjZW50ZXI7fQoubGFiZWx7d2lkdGg6YXV0bztoZWlnaHQ6YXV0bzt9Ci5pbWFnZXt3aWR0aDphdXRvO2hlaWdodDphdXRvO30KLmJ1dHRvbntiYWNrZ3JvdW5kOiNFREVERUQgI0U2RTZFNjtjb2xvcjojMjIyMjIyO2JvcmRlcjoxcHggc29saWQgI0FCQUJBQjtib3JkZXItcmFkaXVzOjJweDtwYWRkaW5nOjVweCA1cHg7Y3Vyc29yOnBvaW50ZXI7d2lkdGg6YXV0bztoZWlnaHQ6YXV0bztzcGFjaW5nOjVweCA1cHg7fQouYnV0dG9uOmhvdmVye2JhY2tncm91bmQ6I0Y1RjVGNSAjRjFGMUYxO2NvbG9yOiMwMDAwMDA7fQouYnV0dG9uOmRvd257YmFja2dyb3VuZDojRDJEMkQyICNDMkMyQzI7Y29sb3I6IzAwMDAwMDtib3JkZXItY29sb3I6IzdGN0Y3Rjt9Ci5idXR0b246YWN0aXZle2JvcmRlcjoycHggc29saWQgIzc3QzZGRjt9Ci5idXR0b24uZW1waGFzaXplZHtiYWNrZ3JvdW5kOiNEQUU0RUUgI0Q0REVFODtib3JkZXItY29sb3I6IzZDQTFENzt9Ci5idXR0b24uZW1waGFzaXplZDpob3ZlcntiYWNrZ3JvdW5kOiNFMkVDRjYgI0RFRThGMjtib3JkZXItY29sb3I6IzZDQTFENzt9Ci5idXR0b24uZW1waGFzaXplZDpkb3due2JhY2tncm91bmQ6I0MyQ0NENiAjQjRCRUM4O2JvcmRlci1jb2xvcjojNTY4Q0MxO30KLnRleHRmaWVsZHtiYWNrZ3JvdW5kOiNGRkZGRkY7Y29sb3I6IzQ0NDQ0NDtib3JkZXI6MXB4IHNvbGlkICNBQkFCQUI7Ym9yZGVyLXJhZGl1czoycHg7cGFkZGluZzo1cHggNXB4O2ZpbHRlcjpkcm9wLXNoYWRvdygxLDQ1LCM4ODg4ODgsMC4yLDEsMSwxLDMsdHJ1ZSk7aGVpZ2h0OmF1dG87c3BhY2luZzo1cHg7aWNvbi1wb3NpdGlvbjpyaWdodDt9Ci50ZXh0ZmllbGQ6YWN0aXZle2JvcmRlcjoxcHggc29saWQgIzIxNkFBRTt9Ci52Ym94LC5oYm94LC5hYnNvbHV0ZXtzcGFjaW5nOjVweCA1cHg7c3BhY2luZzo1cHggNXB4O30KLnZib3gsLmhib3h7d2lkdGg6YXV0bztoZWlnaHQ6YXV0bzt9Ci5zY3JvbGx7YmFja2dyb3VuZC1jb2xvcjojRTlFOUU5O30KLnNjcm9sbCAuYnV0dG9ue2JvcmRlci1yYWRpdXM6MDtib3JkZXI6bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOiNFOUU5RTk7cGFkZGluZzowO2ZpbHRlcjpub25lO30KLnNjcm9sbCAuYnV0dG9uOmhvdmVye2JhY2tncm91bmQtY29sb3I6I0Q3RDdENzt9Ci5zY3JvbGwgLmJ1dHRvbjpkb3due2JhY2tncm91bmQtY29sb3I6IzUyNTI1MjtmaWx0ZXI6bm9uZTt9Ci5zY3JvbGwgLmJ1dHRvbi5kZWluY3toZWlnaHQ6MTdweDt3aWR0aDoxN3B4O30KLnNjcm9sbCAuYnV0dG9uLmRlaW5jOmRvd257fQouc2Nyb2xsIC5idXR0b24uaW5je2hlaWdodDoxN3B4O3dpZHRoOjE3cHg7fQouc2Nyb2xsIC5idXR0b24uaW5jOmRvd257fQouc2Nyb2xsIC5idXR0b24udGh1bWJ7YmFja2dyb3VuZC1jb2xvcjojQzZDNkM2O30KLnNjcm9sbCAuYnV0dG9uLnRodW1iOmhvdmVye2JhY2tncm91bmQtY29sb3I6I0FBQUFBQTt9Ci5zY3JvbGwgLmJ1dHRvbi50aHVtYjpkb3due2JhY2tncm91bmQtY29sb3I6IzUyNTI1Mjt9Ci52c2Nyb2xse3dpZHRoOjE3cHg7fQoudnNjcm9sbCAuYnV0dG9uLnRodW1ie3dpZHRoOjE3cHg7aGVpZ2h0OjE3cHg7fQoudnNjcm9sbCAuYnV0dG9uLmRlaW5je2ljb246ImhheGV1aS1jb3JlL3N0eWxlcy9kZWZhdWx0L3VwX2Fycm93LnBuZyI7fQoudnNjcm9sbCAuYnV0dG9uLmRlaW5jOmRvd257aWNvbjoiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvdXBfYXJyb3dfd2hpdGUucG5nIjt9Ci52c2Nyb2xsIC5idXR0b24uaW5je2ljb246ImhheGV1aS1jb3JlL3N0eWxlcy9kZWZhdWx0L2Rvd25fYXJyb3cucG5nIjt9Ci52c2Nyb2xsIC5idXR0b24uaW5jOmRvd257aWNvbjoiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvZG93bl9hcnJvd193aGl0ZS5wbmciO30KLmhzY3JvbGx7aGVpZ2h0OjE3cHg7fQouaHNjcm9sbCAuYnV0dG9uLnRodW1ie3dpZHRoOjE3cHg7aGVpZ2h0OjE3cHg7fQouaHNjcm9sbCAuYnV0dG9uLmRlaW5je2ljb246ImhheGV1aS1jb3JlL3N0eWxlcy9kZWZhdWx0L2xlZnRfYXJyb3cucG5nIjt9Ci5oc2Nyb2xsIC5idXR0b24uZGVpbmM6ZG93bntpY29uOiJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC9sZWZ0X2Fycm93X3doaXRlLnBuZyI7fQouaHNjcm9sbCAuYnV0dG9uLmluY3tpY29uOiJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC9yaWdodF9hcnJvdy5wbmciO30KLmhzY3JvbGwgLmJ1dHRvbi5pbmM6ZG93bntpY29uOiJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC9yaWdodF9hcnJvd193aGl0ZS5wbmciO30KLnNjcm9sbHZpZXd7Ym9yZGVyOjFweCBzb2xpZCAjQUJBQkFCO2JvcmRlci1yYWRpdXM6MXB4O3BhZGRpbmc6MXB4O3dpZHRoOmF1dG87aGVpZ2h0OmF1dG87fQouc2Nyb2xsdmlldyAuc2Nyb2xsdmlldy1jb250ZW50c3toZWlnaHQ6YXV0bztzcGFjaW5nOjVweDtwYWRkaW5nOjVweDtib3JkZXI6bm9uZTt9Ci5jaGVja2JveHt3aWR0aDphdXRvO2hlaWdodDphdXRvO2hvcml6b250YWwtc3BhY2luZzo0cHg7Y3Vyc29yOnBvaW50ZXI7Y29sb3I6IzAwMDAwMDt9Ci5jaGVja2JveDpob3Zlcnt9Ci5jaGVja2JveC12YWx1ZXtib3JkZXI6MXB4IHNvbGlkICNBQkFCQUI7YmFja2dyb3VuZC1jb2xvcjojRkZGRkZGO3dpZHRoOjE2cHg7aGVpZ2h0OjE2cHg7dmVydGljYWwtYWxpZ246Y2VudGVyO2JvcmRlci1yYWRpdXM6MnB4O2ljb246bm9uZTtmaWx0ZXI6ZHJvcC1zaGFkb3coMSw0NSwjODg4ODg4LDAuMiwyLDIsMSwzLHRydWUpO2N1cnNvcjpwb2ludGVyO30KLmNoZWNrYm94LXZhbHVlOmhvdmVye2JvcmRlcjoxcHggc29saWQgIzIxNkFBRTt9Ci5jaGVja2JveC12YWx1ZTpzZWxlY3RlZHtpY29uOiJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC9jaGVjay5wbmciO30KLmNoZWNrYm94LWxhYmVse3ZlcnRpY2FsLWFsaWduOmNlbnRlcjt9Ci5jaGVja2JveC1pY29ue2hvcml6b250YWwtYWxpZ246Y2VudGVyO3ZlcnRpY2FsLWFsaWduOmNlbnRlcjtjdXJzb3I6cG9pbnRlcjt9Ci5vcHRpb25ib3h7d2lkdGg6YXV0bztoZWlnaHQ6YXV0bztob3Jpem9udGFsLXNwYWNpbmc6NHB4O2N1cnNvcjpwb2ludGVyO2NvbG9yOiMwMDAwMDA7fQoub3B0aW9uYm94OmhvdmVye30KLm9wdGlvbmJveC12YWx1ZXtib3JkZXI6MXB4IHNvbGlkICNBQkFCQUI7YmFja2dyb3VuZC1jb2xvcjojRkZGRkZGO3dpZHRoOjE2cHg7aGVpZ2h0OjE2cHg7dmVydGljYWwtYWxpZ246Y2VudGVyO2JvcmRlci1yYWRpdXM6MThweDtpY29uOm5vbmU7ZmlsdGVyOmRyb3Atc2hhZG93KDEsNDUsIzg4ODg4OCwwLjIsMiwyLDEsMyx0cnVlKTtwYWRkaW5nLXRvcDoxcHg7Y3Vyc29yOnBvaW50ZXI7fQoub3B0aW9uYm94LXZhbHVlOmhvdmVye2JvcmRlcjoxcHggc29saWQgIzIxNkFBRTt9Ci5vcHRpb25ib3gtdmFsdWU6c2VsZWN0ZWR7aWNvbjoiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvb3B0aW9uLnBuZyI7fQoub3B0aW9uYm94LWxhYmVse3ZlcnRpY2FsLWFsaWduOmNlbnRlcjtjdXJzb3I6cG9pbnRlcjt9Ci5vcHRpb25ib3gtaWNvbntob3Jpem9udGFsLWFsaWduOmNlbnRlcjt2ZXJ0aWNhbC1hbGlnbjpjZW50ZXI7Y3Vyc29yOnBvaW50ZXI7fQouaHByb2dyZXNze2JvcmRlcjoxcHggc29saWQgI0FCQUJBQjtwYWRkaW5nOjJweDtib3JkZXItcmFkaXVzOjJweDtiYWNrZ3JvdW5kOiNGMUYxRjEgI0ZGRkZGRiB2ZXJ0aWNhbDtmaWx0ZXI6ZHJvcC1zaGFkb3coMSw0NSwjODg4ODg4LDAuMiwyLDIsMSwzLHRydWUpO30KLmhwcm9ncmVzcyAucHJvZ3Jlc3MtdmFsdWV7Ym9yZGVyOm5vbmU7YmFja2dyb3VuZDojNkNBQURCICMyMTZBQUUgdmVydGljYWw7aGVpZ2h0OjEwMCU7Ym9yZGVyLXJhZGl1czoycHg7fQoudnByb2dyZXNze2JvcmRlcjoxcHggc29saWQgI0FCQUJBQjtwYWRkaW5nOjJweDtib3JkZXItcmFkaXVzOjJweDtiYWNrZ3JvdW5kOiNGMUYxRjEgI0ZGRkZGRiBob3Jpem9udGFsO2ZpbHRlcjpkcm9wLXNoYWRvdygxLDQ1LCM4ODg4ODgsMC4yLDIsMiwxLDMsdHJ1ZSk7fQoudnByb2dyZXNzIC5wcm9ncmVzcy12YWx1ZXtib3JkZXI6bm9uZTtiYWNrZ3JvdW5kOiM2Q0FBREIgIzIxNkFBRSBob3Jpem9udGFsO3dpZHRoOjEwMCU7Ym9yZGVyLXJhZGl1czoycHg7fQouaHNsaWRlcntwYWRkaW5nLWxlZnQ6NXB4O3BhZGRpbmctcmlnaHQ6NXB4O30KLmhzbGlkZXIgLnNsaWRlci12YWx1ZS1iYWNrZ3JvdW5ke2JvcmRlcjoxcHggc29saWQgI0FCQUJBQjtwYWRkaW5nOjJweDtib3JkZXItcmFkaXVzOjRweDtiYWNrZ3JvdW5kOiNGMUYxRjEgI0ZGRkZGRiB2ZXJ0aWNhbDtmaWx0ZXI6ZHJvcC1zaGFkb3coMSw0NSwjODg4ODg4LDAuMiwyLDIsMSwzLHRydWUpO3dpZHRoOjEwMCU7aGVpZ2h0OjhweDt2ZXJ0aWNhbC1hbGlnbjpjZW50ZXI7Y3Vyc29yOnBvaW50ZXI7fQouaHNsaWRlciAuc2xpZGVyLXZhbHVle2JvcmRlcjpub25lO2JhY2tncm91bmQ6IzZDQUFEQiAjMjE2QUFFIHZlcnRpY2FsO2hlaWdodDoxMDAlO2JvcmRlci1yYWRpdXM6MnB4O2N1cnNvcjpwb2ludGVyO30KLmhzbGlkZXIgLnNsaWRlci1idXR0b257dmVydGljYWwtYWxpZ246Y2VudGVyO2hlaWdodDoxNHB4O3dpZHRoOjE0cHg7Ym9yZGVyLXJhZGl1czoxNnB4O30KLnZzbGlkZXJ7cGFkZGluZy10b3A6NXB4O3BhZGRpbmctYm90dG9tOjVweDt9Ci52c2xpZGVyIC5zbGlkZXItdmFsdWUtYmFja2dyb3VuZHtib3JkZXI6MXB4IHNvbGlkICNBQkFCQUI7cGFkZGluZzoycHg7Ym9yZGVyLXJhZGl1czo0cHg7YmFja2dyb3VuZDojRjFGMUYxICNGRkZGRkYgaG9yaXpvbnRhbDtmaWx0ZXI6ZHJvcC1zaGFkb3coMSw0NSwjODg4ODg4LDAuMiwyLDIsMSwzLHRydWUpO2hlaWdodDoxMDAlO3dpZHRoOjhweDtob3Jpem9udGFsLWFsaWduOmNlbnRlcjtjdXJzb3I6cG9pbnRlcjt9Ci52c2xpZGVyIC5zbGlkZXItdmFsdWV7Ym9yZGVyOm5vbmU7YmFja2dyb3VuZDojNkNBQURCICMyMTZBQUUgaG9yaXpvbnRhbDt3aWR0aDoxMDAlO2JvcmRlci1yYWRpdXM6MnB4O2N1cnNvcjpwb2ludGVyO30KLnZzbGlkZXIgLnNsaWRlci1idXR0b257aG9yaXpvbnRhbC1hbGlnbjpjZW50ZXI7aGVpZ2h0OjE0cHg7d2lkdGg6MTRweDtib3JkZXItcmFkaXVzOjE2cHg7fQoudGFiYmFye2hvcml6b250YWwtc3BhY2luZzo1cHg7cGFkZGluZy1sZWZ0OjVweDtwYWRkaW5nLXJpZ2h0OjVweDtoZWlnaHQ6YXV0bzt3aWR0aDphdXRvO2JhY2tncm91bmQtY29sb3I6d2hpdGU7Ym9yZGVyLWJvdHRvbS13aWR0aDoxcHg7Ym9yZGVyLWJvdHRvbS1jb2xvcjojQUJBQkFCO30KLnRhYmJhci1idXR0b257Ym9yZGVyLXJhZGl1czowcHg7YmFja2dyb3VuZDojRURFREVEICNFNkU2RTY7cGFkZGluZzo2cHg7dmVydGljYWwtYWxpZ246Ym90dG9tO30KLnRhYmJhci1idXR0b246ZG93bnt9Ci50YWJiYXItYnV0dG9uLXNlbGVjdGVkLC50YWJiYXItYnV0dG9uLXNlbGVjdGVkOmhvdmVyLC50YWJiYXItYnV0dG9uLXNlbGVjdGVkOmRvd257Ym9yZGVyLXJhZGl1czowcHg7Ym9yZGVyOjFweCBzb2xpZCAjQUJBQkFCO2JvcmRlci1ib3R0b20td2lkdGg6MXB4O2JvcmRlci1ib3R0b20tY29sb3I6d2hpdGU7YmFja2dyb3VuZC1jb2xvcjp3aGl0ZTt9Ci50YWJiYXItYnV0dG9uLXNlbGVjdGVkIC5sYWJlbHt9Ci50YWJiYXItYnV0dG9uLXNlbGVjdGVkIC5pY29ue30KLnRhYnZpZXd7Ym9yZGVyOm5vbmU7d2lkdGg6YXV0bztoZWlnaHQ6YXV0bzt9Ci50YWJ2aWV3IC50YWJ2aWV3LXRhYnN7fQoudGFidmlldyAudGFidmlldy1jb250ZW50e2JvcmRlcjoxcHggc29saWQgI0FCQUJBQjtwYWRkaW5nOjVweDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO30KCg"},{ name : "haxeui-core/styles/native/main.css", data : "KiB7DQogICAgbmF0aXZlOiB0cnVlOw0KfQ0KDQouaHNsaWRlcjpuYXRpdmUsIC52c2xpZGVyOm5hdGl2ZSwgLmhwcm9ncmVzczpuYXRpdmUsIC52cHJvZ3Jlc3M6bmF0aXZlIHsNCiAgICB3aWR0aDogYXV0bzsNCiAgICBoZWlnaHQ6IGF1dG87DQogICAgYmFja2dyb3VuZDogbm9uZTsNCiAgICBib3JkZXI6IG5vbmU7DQogICAgYm9yZGVyLXJhZGl1czogbm9uZTsNCn0NCg0KLmJ1dHRvbjpuYXRpdmUgew0KICAgIGJhY2tncm91bmQ6IG5vbmU7DQogICAgYm9yZGVyOiBub25lOw0KICAgIGJvcmRlci1yYWRpdXM6IG5vbmU7DQogICAgY29sb3I6IG5vbmU7DQp9DQoNCi50ZXh0ZmllbGQ6bmF0aXZlIHsNCiAgICBiYWNrZ3JvdW5kOiBub25lOw0KICAgIGJvcmRlcjogbm9uZTsNCiAgICBib3JkZXItcmFkaXVzOiBub25lOw0KICAgIGNvbG9yOiBub25lOw0KICAgIGZpbHRlcjogbm9uZTsNCn0NCg0KLmRpYWxvZzpuYXRpdmUgew0KICAgIHBhZGRpbmctdG9wOiAwcHggIWltcG9ydGFudDsNCn0"},{ name : "haxeui-core/styles/default/dialogs/exclamation.png", data : "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABUJJREFUeNrkV0tsG1UUvfOxHcfxJ3YTT8dOUzueprFJS8PCEUKtCv1QVEFb1CoVbVFKxAJ1x54NEhICVsCmEgiJDbsiFkilYsGqEqB+QGoqmrRJayel+fs/nnnzeHfsuEk6/qRCdMGTjnV933333nfefZ/hKKXwLBsPz7iJ+OMcGFinRFaoYZjyUKwI7xxehD19xY1j3QxfV+XzDNm1ndcnnfDVZT9cm3Ca/zmeB47j1jkojo83ZgADf/Fe2io4thNS7FwMgfLGThyDY9FHUwbOH1qADRQwB4V6gbF1iTbPUanvLKOOwvz090d1LfMj089ZTQJZvD7Zzmjg6iRwcH6zSzfCZp4QqObABKTY2URq/MsRpv/cyhgnUm8yfHXCm0Gvra37YFfvcYXkx4Hkb0PXtmMK6rBvM76eNoG3ZGU0TrVFUVfnAYGyHDsXx76nSsCgrYENSrR1RPb55QNRPXsLDEM3oWVvg19+OdrW0bsPbVr1t1kGOIazof7RBCk+4PTyci0Boi2DXkxzIeVcAm2qti0xIK4m0Kyx+h12+RNJ75ahUHH+F/j2Eg9TqcoujoQNOHPiL/AEkiGXbyCZWxofZi6vtnwSUqMpBJbkmfCOtxNabpLNOAf30zqUy2UTKKNOy9+DUOw0snDGHNPEb+tLAHDA253c4/Js71Kzd5jOAJ4rQalUAcdk1JXzU9Du7uliLO3BMf9WEToo5U+HldPxcm6CrblqBrMJai0BUajoDKMMWmEK5NjxOI7Bsa0VYSOqKLy+JbR30OHs9GqF+7W1c9g1KBaLJtpsWk2vlx6Cw+HzBqThQRzbbAnMIiRGncLjwCPw9pPh2Js7ce0pJY+Lh8vD9HQaFhYWwN3uhNmlHiCEmEy05XLQIQ3vnJv59aRB9csskUzj65hagw08Few9GBdFsV1THwJhCWTLKzCbS0F67k+4e/cmrKykwNlRBJUvg24jQOwU8jqzFUm7W3oBD6dT9fzXGDCo5bbrFkXXsVD0iFJghbdc/BvyWpbZVujaKtlBkhxV2cEYWU9jgRWkTx5SVmZvHDN09QcW4lFdBvDqfwLsQJH7DvcXtTn77PI1FhyvVY0FIiakoA3krQ4TKK/qV0H0RTAgb/fJz/ejL6sYdXcBoy0i2n1HvPJgZGn5N8ZGGQTmdC36og4IssDBoN2UN/YjNDUN3q2xiGBzHUGfVrtAXN0F654DHIwGoy8qZW1GIGQReItnS2T7Tvjsk6NVuicgn7/zpBHNs0gZwR8eUGYnfh9l6/6B5XvAMNZV/i6nK7A/ICs9ucwNcyZWrVS4bWK1CZx1lRMyD75uqWch5d6vFrK7GBN/NKoBjmFMVpKKrqU5oBkQeN0SV35egFdevWkC5Xp2PJRYhBUu2BtV0Hc1hnUNsOxecnmDSX9XMEhKUyCy2dfDx5+m4EFKNYFyI1uOZMEbcAedbk8SYzxxEmoaRYg6oWO9/bsVoqXNs17gjboQbYHH68jkRrYVJvIQisoKxsBYGLOWgKoCu9XgNY9fHvJ2dnRSfcayqtfiow+PQzQaMoFyM3tcCp/P1un2eYYwFsasFaFahjZB4MaURH8Eg/Ns2wHX+B4/tPcuvHHj/cr7fuUKaCXSwu1vQHRHIDKTyo4RQn/CWjYT0HUYCW+X4x4v7yIqKyiu+QvFUNnWezTRdBdsbF6v6JJkd3z6XgZf0d+sJnDhud3bwhw760W7VL0IDPZrmFlXDgpak2lNpo/1ppauOVTWHPgbWmLQH568k7lQS4D5uXjpu6vv/sefhRfNc+d//3X8jwADAHWOFkaFGOstAAAAAElFTkSuQmCC"},{ name : "styles/native/main.min.css", data : "LmJ1dHRvbnt9Ci50YWJiYXItYnV0dG9ue25hdGl2ZTpmYWxzZTt9Ci50YWJiYXItYnV0dG9ue2JvcmRlci1yYWRpdXM6MHB4O2JhY2tncm91bmQ6I0VERURFRCAjRTZFNkU2O3BhZGRpbmc6NnB4O3ZlcnRpY2FsLWFsaWduOmJvdHRvbTtib3JkZXI6MXB4IHNvbGlkICNBQkFCQUI7fQoudGFiYmFyLWJ1dHRvbjpkb3due30KLnRhYmJhci1idXR0b24tc2VsZWN0ZWQsLnRhYmJhci1idXR0b24tc2VsZWN0ZWQ6aG92ZXIsLnRhYmJhci1idXR0b24tc2VsZWN0ZWQ6ZG93bntib3JkZXItcmFkaXVzOjBweDtib3JkZXI6MXB4IHNvbGlkICNBQkFCQUI7Ym9yZGVyLWJvdHRvbS13aWR0aDoxcHg7Ym9yZGVyLWJvdHRvbS1jb2xvcjp3aGl0ZTtiYWNrZ3JvdW5kLWNvbG9yOndoaXRlO30KCg"},{ name : "haxeui-core/styles/default/dialogs/question.png", data : "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA61pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcFJpZ2h0czpNYXJrZWQ9IkZhbHNlIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InV1aWQ6NzBDQkJENjFFODMxREYxMTlCMjJGQkJBMDE3QTBERTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTkxRDlCRjg4NDM0MTFFMDk1NDQ5NjM2NUYzMUQ5NjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTkxRDlCRjc4NDM0MTFFMDk1NDQ5NjM2NUYzMUQ5NjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTI1NDYxQUQyRjg0RTAxMTg1RkJBOTI1NDUxRDI5NkIiIHN0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"},{ name : "haxeui-core/styles/test/main.min.css", data : "LmNvbXBvbmVudHt9Ci52Ym94LC5oYm94LC5hYnNvbHV0ZXtzcGFjaW5nOjVweCA1cHg7fQoK"},{ name : "haxeui-core/styles/default/check.png", data : "iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3woKFDgxV99L8gAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAACRUlEQVQoFQE6AsX9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADVm1gAAAAAAAAAAADclUeEl663/3O89DEAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANmdWGy42gCTvNLv/iVchwJXRSwpAgAAAAAAAAAAAAAAAAAAAAAAAAAAfLvqANWbWAAAAAAA1pxYXcPgAJO72///CAgLAu/b5QAbEAK3BAAAAAD347ZXcGST+gRMZgUfTVC9diAB7YQAAADfoFhcwt8Aoq7U//8KAf4AFSI+AExgQcscBgQ2Avv4z4TJtc6o9wkHrvbi1Knu0NqaAAAAAOynWGW/3QCjqtL//wsB/gAXIzkBQ2JexkkfCzwAAAAABAH+/gD79O4A5v0C/xPdzADsAwRSV2NunKfR6mO82wAACwT/AREZMwA9WlvKQSoRTgEBAfq76v8AAQAAAAD51Jt3rb7ciKO72/8OCAIAAQIDAfv+AQAFAv4ABgonAExwbtlALhQ+FgEB6rvq/wBFFgEABAAAAAAHLGWJ+9KZCvX4/H6zxuH/CggBAAUD/QD9/B0AUnh07z0mDjgTAQHwu+r/AEUWAQAAAAAAAP/VmwAAAAAAAAAAAP/YnJeIfGv/VFVT/1BMbP+04Pb//f//BgAAAAC76v8AAAAAAAAAAAAAAAAAAAAAAAD/1ZsAAAAAAAAAAAD/35yvb2V4/7Tg9v8AAAAAAAAAALvq/wAAAAAAAAAAAAAAAAAAAAAA6MK1OUXq0R0AAAAASUVORK5CYII"},{ name : "haxeui-core/styles/default/option.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wkMBhgPflMg6QAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABB0lEQVQY043MQSsEYRyA8ef/zhtK2WTWpkSSjMbWnqQNN5vWkVrOfAcX5exDODOa87ZxW9ritLVNu5SUXJaRVgjNzuuw5TblOf96BMC8+6Pbu/5wYYZW5RYUMfbiBuFV09k/PnidF3nSxhz2X5w2A8Au32C0QkDxXPOMWOnWZbkRVoyZVC/B9NfRSd0G6KFeYvUJdDjzPTvT/rhWreo5b5YmKd1p4NUeXVWvddBaEqGyNPcPbRT/TOXyKaLIJIK4GzE1kUE5K6sMdaNEGKWylPLjgRpx7wZ2tnIhQBTztzbdHwMpCpulsJ0ZXFAie9/L63Mu4BRnkdgAJiadLwmMOUvFrLsm8vkLmFpcqEjhuWQAAAAASUVORK5CYII"}];
var __map_reserved = {}
var ArrayBuffer = $global.ArrayBuffer || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = $global.DataView || js_html_compat_DataView;
var Uint8Array = $global.Uint8Array || js_html_compat_Uint8Array._new;
Xml.Element = 0;
Xml.PCData = 1;
Xml.CData = 2;
Xml.Comment = 3;
Xml.DocType = 4;
Xml.ProcessingInstruction = 5;
Xml.Document = 6;
haxe_Serializer.USE_CACHE = false;
haxe_Serializer.USE_ENUM_INDEX = false;
haxe_Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_Unserializer.DEFAULT_RESOLVER = Type;
haxe_Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
haxe_ds_ObjectMap.count = 0;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
haxe_ui_Toolkit.styleSheet = new haxe_ui_styles_Engine();
haxe_ui_Toolkit.theme = "default";
haxe_ui_Toolkit.properties = new haxe_ds_StringMap();
haxe_ui_Toolkit.backendProperties = new haxe_ui_util_Properties();
haxe_ui_Toolkit.nativeConfig = new haxe_ui_util_GenericConfig();
haxe_ui_Toolkit._built = false;
haxe_ui_backend_PlatformBase._vscrollWidth = -1;
haxe_ui_backend_PlatformBase._hscrollHeight = -1;
haxe_ui_backend_TextDisplayBase.ADDED_FONTS = new haxe_ds_StringMap();
haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	if(__map_reserved.MouseMove != null) _g.setReserved("MouseMove","mousemove"); else _g.h["MouseMove"] = "mousemove";
	if(__map_reserved.MouseOver != null) _g.setReserved("MouseOver","mouseover"); else _g.h["MouseOver"] = "mouseover";
	if(__map_reserved.MouseOut != null) _g.setReserved("MouseOut","mouseout"); else _g.h["MouseOut"] = "mouseout";
	if(__map_reserved.MouseDown != null) _g.setReserved("MouseDown","mousedown"); else _g.h["MouseDown"] = "mousedown";
	if(__map_reserved.MouseUp != null) _g.setReserved("MouseUp","mouseup"); else _g.h["MouseUp"] = "mouseup";
	if(__map_reserved.Click != null) _g.setReserved("Click","click"); else _g.h["Click"] = "click";
	$r = _g;
	return $r;
}(this));
haxe_ui_backend_html5_EventMapper.DOM_TO_HAXEUI = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	if(__map_reserved.mousemove != null) _g.setReserved("mousemove","MouseMove"); else _g.h["mousemove"] = "MouseMove";
	if(__map_reserved.mouseover != null) _g.setReserved("mouseover","MouseOver"); else _g.h["mouseover"] = "MouseOver";
	if(__map_reserved.mouseout != null) _g.setReserved("mouseout","MouseOut"); else _g.h["mouseout"] = "MouseOut";
	if(__map_reserved.mousedown != null) _g.setReserved("mousedown","MouseDown"); else _g.h["mousedown"] = "MouseDown";
	if(__map_reserved.mouseup != null) _g.setReserved("mouseup","MouseUp"); else _g.h["mouseup"] = "MouseUp";
	if(__map_reserved.click != null) _g.setReserved("click","Click"); else _g.h["click"] = "Click";
	$r = _g;
	return $r;
}(this));
haxe_ui_core_Component.__meta__ = { fields : { _id : { clonable : null}, id : { clonable : null}, text : { clonable : null}, value : { clonable : null}, _backgroundColor : { style : null}, _borderColor : { style : null}, _borderSize : { style : null}, _borderRadius : { style : null}, _paddingLeft : { style : null}, _paddingRight : { style : null}, _paddingTop : { style : null}, _paddingBottom : { style : null}, _marginLeft : { style : null}, _marginRight : { style : null}, _marginTop : { style : null}, _marginBottom : { style : null}, _clip : { style : null}, _opacity : { style : null}, _percentWidth : { clonable : null}, percentWidth : { clonable : null, bindable : null}, _percentHeight : { clonable : null}, percentHeight : { clonable : null, bindable : null}, width : { clonable : null, bindable : null}, height : { clonable : null, bindable : null}}};
haxe_ui_components_Progress.__meta__ = { fields : { pos : { bindable : null, clonable : null}, min : { bindable : null, clonable : null}, max : { bindable : null, clonable : null}, rangeStart : { bindable : null, clonable : null}, rangeEnd : { bindable : null, clonable : null}, indeterminate : { bindable : null, clonable : null}}};
haxe_ui_components_Scroll.__meta__ = { fields : { pos : { bindable : null, clonable : null}, min : { bindable : null, clonable : null}, max : { bindable : null, clonable : null}, pageSize : { bindable : null, clonable : null}, incrementSize : { bindable : null, clonable : null}}};
haxe_ui_components_Slider.__meta__ = { fields : { pos : { bindable : null, clonable : null}, min : { bindable : null, clonable : null}, max : { bindable : null, clonable : null}, rangeStart : { bindable : null, clonable : null}, rangeEnd : { bindable : null, clonable : null}}};
haxe_ui_components_TabBar.__meta__ = { fields : { selectedIndex : { bindable : null}}};
haxe_ui_containers_ScrollView.__meta__ = { fields : { vscrollPos : { bindable : null}, hscrollPos : { bindable : null}}};
haxe_ui_containers_dialogs_DialogButton.OK = 1;
haxe_ui_containers_dialogs_DialogButton.CANCEL = 2;
haxe_ui_containers_dialogs_DialogButton.CLOSE = 4;
haxe_ui_containers_dialogs_DialogButton.CONFIRM = 8;
haxe_ui_containers_dialogs_DialogButton.YES = 16;
haxe_ui_containers_dialogs_DialogButton.NO = 32;
haxe_ui_containers_dialogs_DialogButton.YES_NO = 48;
haxe_ui_containers_dialogs_DialogButton.YES_NO_CANCEL = 50;
haxe_ui_containers_dialogs_DialogOptions.ICON_ERROR = 256;
haxe_ui_containers_dialogs_DialogOptions.ICON_INFO = 512;
haxe_ui_containers_dialogs_DialogOptions.ICON_WARNING = 1024;
haxe_ui_containers_dialogs_DialogOptions.ICON_QUESTION = 2048;
haxe_ui_core_UIEvent.READY = "Ready";
haxe_ui_core_UIEvent.RESIZE = "Resize";
haxe_ui_core_UIEvent.CHANGE = "Change";
haxe_ui_core_KeyboardEvent.KEY_TAB = 9;
haxe_ui_core_KeyboardEvent.KEY_DOWN = "KeyDown";
haxe_ui_core_KeyboardEvent.KEY_UP = "KeyUp";
haxe_ui_core_MouseEvent.MOUSE_MOVE = "MouseMove";
haxe_ui_core_MouseEvent.MOUSE_OVER = "MouseOver";
haxe_ui_core_MouseEvent.MOUSE_OUT = "MouseOut";
haxe_ui_core_MouseEvent.MOUSE_DOWN = "MouseDown";
haxe_ui_core_MouseEvent.MOUSE_UP = "MouseUp";
haxe_ui_core_MouseEvent.MOUSE_WHEEL = "MouseWheel";
haxe_ui_core_MouseEvent.CLICK = "Click";
haxe_ui_core_Platform.METRIC_VSCROLL_WIDTH = "patform.metrics.vscroll.width";
haxe_ui_core_Platform.METRIC_HSCROLL_HEIGHT = "patform.metrics.hscroll.height";
haxe_ui_macros_BackendMacros.properties = new haxe_ui_util_Properties();
haxe_ui_macros_ModuleMacros._modules = [];
haxe_ui_macros_ModuleMacros._modulesProcessed = false;
haxe_ui_macros_NativeMacros._nativeProcessed = false;
haxe_ui_parsers_ui_ComponentParser._nextId = 0;
haxe_ui_styles_Style.__meta__ = { fields : { cursor : { style : null}, hidden : { style : null}, autoWidth : { style : null}, autoHeight : { style : null}, verticalSpacing : { style : null}, horizontalSpacing : { style : null}, offsetLeft : { style : null}, offsetTop : { style : null}, width : { style : null}, height : { style : null}, percentWidth : { style : null}, percentHeight : { style : null}, paddingTop : { style : null}, paddingLeft : { style : null}, paddingRight : { style : null}, paddingBottom : { style : null}, marginTop : { style : null}, marginLeft : { style : null}, marginRight : { style : null}, marginBottom : { style : null}, color : { style : null}, backgroundColor : { style : null}, backgroundColorEnd : { style : null}, backgroundGradientStyle : { style : null}, backgroundOpacity : { style : null}, backgroundImage : { style : null}, backgroundImageRepeat : { style : null}, backgroundImageClipTop : { style : null}, backgroundImageClipLeft : { style : null}, backgroundImageClipBottom : { style : null}, backgroundImageClipRight : { style : null}, backgroundImageSliceTop : { style : null}, backgroundImageSliceLeft : { style : null}, backgroundImageSliceBottom : { style : null}, backgroundImageSliceRight : { style : null}, borderColor : { style : null}, borderTopColor : { style : null}, borderLeftColor : { style : null}, borderBottomColor : { style : null}, borderRightColor : { style : null}, borderSize : { style : null}, borderTopSize : { style : null}, borderLeftSize : { style : null}, borderBottomSize : { style : null}, borderRightSize : { style : null}, borderRadius : { style : null}, borderOpacity : { style : null}, filter : { style : null}, icon : { style : null}, iconPosition : { style : null}, horizontalAlign : { style : null}, verticalAlign : { style : null}, opacity : { style : null}, clip : { style : null}, 'native' : { style : null}, fontName : { style : null}, fontSize : { style : null}, fontBold : { style : null}, fontUnderline : { style : null}, fontItalic : { style : null}}};
haxe_ui_util_MathUtil.MAX_INT = 2147483647;
haxe_ui_util_MathUtil.MIN_INT = -2147483648;
haxe_xml_Parser.escapes = (function($this) {
	var $r;
	var h = new haxe_ds_StringMap();
	if(__map_reserved.lt != null) h.setReserved("lt","<"); else h.h["lt"] = "<";
	if(__map_reserved.gt != null) h.setReserved("gt",">"); else h.h["gt"] = ">";
	if(__map_reserved.amp != null) h.setReserved("amp","&"); else h.h["amp"] = "&";
	if(__map_reserved.quot != null) h.setReserved("quot","\""); else h.h["quot"] = "\"";
	if(__map_reserved.apos != null) h.setReserved("apos","'"); else h.h["apos"] = "'";
	$r = h;
	return $r;
}(this));
hscript_Parser.p1 = 0;
hscript_Parser.readPos = 0;
hscript_Parser.tokenMin = 0;
hscript_Parser.tokenMax = 0;
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
