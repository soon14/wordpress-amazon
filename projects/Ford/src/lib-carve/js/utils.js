var nd = {};
nd.application = {};
nd.utils = {};

nd.utils.cmdLineHandler = function(args, option, defValue){
	if(arguments.length == 3) {
		for(var i = 0; i < args.length; i++) {
			if(args[i] === option){
				return args[++i] || defValue;
			}
		}
		return defValue;
	} else {
		for(var i = 0; i < args.length; i++) {
			if(args[i] === option){
				return true;
			}
		}
		return false
	}
};

nd.application.setArgs = function(args){
	this.args = args;
	this.coreprops = new Properties();
	System.out.println("Current directory: " + new java.io.File(".").getAbsolutePath());
	this.coreprops.load(new FileInputStream(nd.utils.cmdLineHandler(this.args, "-core", "./lib-carve/js/core.properties")));
};

nd.application.interpretThemeProperties = function(themeName, themePropertiesFile){
	var files = nd.utils.readFileListFile(new File(themePropertiesFile)),
		path = this.coreprops.getProperty("JS_PATH");
	
	for(x in files) {
		files[x] = path.replaceAll("%THEME%", themeName) + files[x] 
	}
	
	return files;
};

nd.application.getThemes = function() {
	var themes = [];
	var themesFolder = new java.io.File(this.coreprops.getProperty("THEMES_PATH"));
	
	var folders = themesFolder.listFiles() 
	for(var i = 0; i < folders.length; i++) {
		
		if(folders[i].isDirectory()) {
			var themeName = folders[i].getName()+"";
			if(!(/^[\.]/g).test(themeName)) {
				var themePropertiesFilename = this.coreprops.getProperty("JS_PROPERTIES").replaceAll("%THEME%", themeName);
				var devel = this.coreprops.getProperty("JS_LIVE_PATH").replaceAll("%THEME%", themeName);
				var prod = this.coreprops.getProperty("JS_LIVE_PATH").replaceAll("%THEME%", themeName);
				devel += this.coreprops.getProperty("JS_LIVE_DEV");
				prod += this.coreprops.getProperty("JS_LIVE_PROD");
				if((new File(themePropertiesFilename)).exists()) {
					var theme = new nd.application.Theme(themeName,devel,prod,themePropertiesFilename)
					themes.push(theme);
				} else {
					log("Theme \"" + themeName + "\" not configured.")
				}
			}
		}
	}
	return themes;
};

nd.application.intervalMessage = function(intervals){
	if(intervals % 10 === 0) {
		if(intervals % 1000 === 0) {
			log("I'm off for morning tea...");
		} else if(intervals % 700 === 0) {
			log("Get some Tunes goin!");
		} else if(intervals % 600 === 0) {
			log("I'm ok, thank's for asking.");
		} else if(intervals % 500 === 0) {
			log("What up?");
		} else if(intervals % 400 === 0) {
			log("Wake me up in 15 mins, me haz a power nap!");
		} else if(intervals % 300 === 0) {
			log("Ok, anytime you wanna code up some changes, I'll fix'em up");
		} else if(intervals % 200 === 0) {
			log("OMG I'm bored... zzzzzzz!");
		} else if(intervals % 100 === 0) {
			log("I'm bored...");
		} else {
			log("Watching for changes...");
		}			
	}
};

nd.utils.stringToArray = function(str){
	var st = new java.util.StringTokenizer(str, ",");
    var arr = [];
	while (st.hasMoreTokens()) {
		var token = st.nextToken();
		if(token.length() > 0) {
			arr.push(token);
		}
    }
	return arr;
};

nd.utils.FileChecker = function(filenames){
	this.files = [];
	for(i in filenames) {
		var file = new java.io.File(filenames[i]);
		this.files.push({file:file,lastModified:file.lastModified()});
	}
};

nd.utils.FileChecker.prototype.check = function(){
	for(var i = 0; i < this.files.length; i++) {
		var f = this.files[i];
	
		var timeStamp = f.file.lastModified();
		if( f.lastModified != timeStamp ) {
			f.lastModified = timeStamp;
			return true;
		}		
	}
	return false;
};

nd.application.Theme = function(){this.init.apply(this, arguments)};
nd.application.Theme.prototype = {
	
	init:function(name, devel, prod, propertiesFilename){
		this.name = name;
		this.filenameDev = devel;
		this.filenameProd = prod;
		this.propertiesFilename = propertiesFilename;
		this.propertiesFileChecker = new nd.utils.FileChecker([propertiesFilename]);
		this.loadProperties();
	}

	,getEngine:function(){
		return this.appEngine;
	}
	
	,loadProperties:function(){
		var filenames = nd.application.interpretThemeProperties(this.name, this.propertiesFilename);
		this.appEngine = new nd.application.EngineJavaScript(filenames);
	}
	
	,hasPropertiesChanged:function(){
		return this.propertiesFileChecker.check();
	}
		
};

nd.application.EngineJavaScript = function(){this.init.apply(this, arguments)};
var appfn = nd.application.EngineJavaScript.prototype;

appfn.init = function(filenames){
	this.files = [];
	for(i in filenames) {
		js = this.loadJsFile({file:new java.io.File(filenames[i])});
		this.files.push(js);
	}
}

appfn.whichFileHasChanged = function(){
	for(var i = 0; i < this.files.length; i++) {
		var js = this.files[i];	
		if( js.timeStamp != js.file.lastModified() ) {
			js.timeStamp = js.file.lastModified();
			this.files[i] = this.loadJsFile(js);
			return js.file.getPath();
		}		
	}
	return null;
}

appfn.writeFile = function(filename, minify){
	var allStatus = [];
	try {
		var completeStreamSequence = null;
		for(var i = 0; i < this.files.length; i++) {
			var js = this.files[i];
			var status = {filename:js.file.getPath(),jslint:0,jslintErrors:""};
			
			//var content = new java.lang.String(minify ? js.compression.content : js.raw.content);
			
			var content = this.chew(js.file.getName(),minify,js.compression.content,js.raw.content)
			
			if(content.trim().length() > 0) {
				//content =  this.commentify(js.file.getName(), content); 
				
				
				if( !(/\.min\.js$/i).test(status.filename+"") ) { 
					if(!JSLINT(js.raw.content+'',{
							//	Allow one var statement per function
							onevar:true,   
							//  Disallow bitwise operators  
							bitwise:true,
							//  Disallow dangling _ in identifiers  
							nomen:true,
							//  Disallow == and !=  
							eqeqeq:true,
							//  Require parens around immediate invocations
							immed:true,
							//  Require Initial Caps for constructors  
							newcap:true,
							//  Disallow ++ and --  
							plusplus:true,
							//  Disallow insecure . and [^...] in /RegExp/  
							regexp:true,
							// Is rhino
							rhino:false,
							// Disallow undefined variables
							undef:true,
							// Strict white space  
							white:false,
							// Assume console, aler
							devel:true,
							// Assume a browser  
							browser: true,
							// Assume Windows
							windows: true
						})) {
						status.jslint = JSLINT.errors.length
						
						for(k=0;k<JSLINT.errors.length;k+=1) {
							var e=JSLINT.errors[k];
							if(e){
								status.jslintErrors += ('<p class="error">Lint at line <strong>'+e.line+'</strong> character '+
										e.character+': '+e.reason + "</p>");
								status.jslintErrors += '<p class="error-detail">' + (e.evidence||'').replace(/^\s*(\S*(\s+\S+)*)\s*$/,"$1") + "</p>";								 
							}
						}
						
						
					}
				}
				
				var contentStream = new ByteArrayInputStream(content.getBytes());
				if(!completeStreamSequence) {
		    		//Start Sequence 
	    			completeStreamSequence = contentStream
	    		} else {
		    		//Append File to Sequence
	    			completeStreamSequence = new SequenceInputStream(completeStreamSequence, contentStream);
	    		}status.success = true;
			} else {
				status.success = false;
			}
			allStatus.push(status);
		}
		
		nd.utils.writeFile(filename, completeStreamSequence)            
		//new nd.application.StreamThread(filename, completeStreamSequence);
		
	    	
	} catch (e){
    	System.err.println("Error: " + e);
    	return [{success:false}];
    }
	return allStatus;
}

appfn.chew = function(jsfilename, minify, compressed, raw) {
	var content = "";
	if(jsfilename == "intro.js") {
		content = nd.utils.replaceDate(raw);
	} else {
		//If the file ends in .min.js then don't use the compressed version 
		if( (/\.min\.js$/i).test(jsfilename) ) { 
			minify = false;
		}		
		content = new java.lang.String(minify ? compressed : raw);
		if(content.trim().length() > 0) {
			content = "\n" + content + "\n";
		}
	}
	return typeof content != "java.lang.String" ? new java.lang.String(content) : content;
}

/*
appfn.commentify = function(jsfilename, content) {
	if(jsfilename === "intro.js") {
		content = "\/* File Build Date: " +jsfilename+" *\/\n" + content + "\n";
	} else {
		content = "\/* "+jsfilename+" *\/\n" + content + "\n";
	}
	
	return typeof content != "java.lang.String" ? new java.lang.String(content) : content;
}*/
	
appfn.getErrors = function(){
	var errs = [];
	for(var i = 0; i < this.files.length; i++) {
		if(this.files[i].compression.hasErrors) {
			errs.push({
				filename:this.files[i].file.getPath()
				,errors:this.files[i].compression.errors
			});
		}
	}
	return errs;
}

appfn.hasErrors = function(){
	return this.getErrors().length > 0;
}

appfn.loadJsFile = function(js){
	js.timeStamp = js.file.lastModified();
	js.raw = {content:nd.utils.readFile(js.file)};
	
	//If the file ends in .min.js then don't use the compressed version 
	if( ! (/\.min\.js$/i).test(js.file.getName()) ) { 
		js.compression = nd.utils.minifyContent(js.raw.content);
	} else {
		js.compression = js.raw;
		js.compression.hasErrors = false;
		js.compression.content.trim();
	}
	return js;
}

nd.application.StreamThread = function(){this.init.apply(this, arguments)};
nd.application.StreamThread.prototype = {
	
	init:function(filename, stream){
		this.stream = stream;
		this.filename = filename;
		this.run();
	}

	,run:function(){
		var self = this;
		nd.utils.timer.setTimeout(function(){
			nd.utils.writeFile(self.filename, self.stream)            
		},0);
	}

}

nd.utils.writeFile = function( file, stream ) {
	try {
		file = typeof file != "java.io.File" ? new File(file) : file;
		file.getParentFile().mkdir();
		chunk = null;
        var out = new BufferedWriter(new FileWriter(file));
        while ((chunk = stream.read()) != -1)
        	out.write(chunk);
        stream.close();
        out.close();
	} catch(e) {
		log("Can't write file");
		log(e)
	}
}

nd.utils.readFile = function(file) {
	try {
		file = typeof file == "String" ? new File(file) : file;
		if(file.exists()) {
			var filereader = new FileReader(file);
			var reader = new BufferedReader(filereader);
			var line = null;
			var buffer = new java.lang.StringBuffer(file.length());
			var encodingCheck = false;
			while( (line = reader.readLine()) != null) {
				if(!encodingCheck) {
					encodingCheck = true;
					var chars = line.toCharArray();
					if(chars.length > 3 && Integer.valueOf(chars[0]) == 239 && Integer.valueOf(chars[1]) == 187) {
						throw new Error("Encoding issue with " + file);
					}
				}
				buffer.append(line);
				buffer.append("\n");
			}
			return buffer.toString();
		}
	} catch(e) {
		log("Configuration Error! Can't read file");
		log(e);
	}
	return "";
};

nd.utils.readFileListFile = function(file) {
	try {
		file = typeof file == "String" ? new File(file) : file;
		if(file.exists()) {
			var reader = new BufferedReader(new FileReader(file));
			var line = null;
			var buffer = new java.lang.StringBuffer(file.length());
			var list = [];
			while( (line = reader.readLine()) != null) {
				if(!line.startsWith("#") && line.trim().length() > 0) {
					list.push(line);
				}
			}
			return list;
		}
	} catch(e) {
		log("Configuration Error! Can't read file");
		log(e);
	}
	return [];
};

nd.utils.minifyContent = function(content) {
	return closureOptimize("", content, false)
}

nd.utils.replaceDate = function(str) {
	return new java.lang.String(str).replaceAll("@DATE", new Date());
}

function log(line) {
	System.out.println(line);	
};



try {
    JSSourceFilefromCode = java.lang.Class.forName('com.google.javascript.jscomp.JSSourceFile').getMethod('fromCode', [java.lang.String, java.lang.String]);
} catch (e) {}


//Helper for closureOptimize, because of weird Java-JavaScript interactions.
function closurefromCode(filename, content) {
    return JSSourceFilefromCode.invoke(null, [filename, content]);
}

function closureOptimize(fileName, fileContents, keepLines) {
    var jscomp = Packages.com.google.javascript.jscomp,
        flags = Packages.com.google.common.flags,
        externSourceFile = closurefromCode("fakeextern.js", " "),
        jsSourceFile = closurefromCode(String(fileName), String(fileContents)),
        options, 
        FLAG_compilation_level, 
        FLAG_warning_level, 
        compiler;

    //Set up options
    options = new com.google.javascript.jscomp.CompilerOptions();
    options.prettyPrint = keepLines;
    
    FLAG_compilation_level = com.google.common.flags.Flag.value(com.google.javascript.jscomp.CompilationLevel.SIMPLE_OPTIMIZATIONS);
    FLAG_compilation_level.get().setOptionsForCompilationLevel(options);

    //Trigger the compiler
    compiler = new Packages.com.google.javascript.jscomp.Compiler();
    compiler.setLoggingLevel(java.util.logging.Level.OFF);
    
    compiler.compile(externSourceFile, jsSourceFile, options);
    
    return {
    	content:compiler.toSource()
    	,hasErrors:compiler.hasErrors()
    	,errors:compiler.getErrors()
    }
}

nd.utils.timer = {
		
		timers:[],
		
		/*
		 * setInterval From env.js by John Resig
		 */
		setInterval:function(fn, time){
			var num = this.timers.length;
		  
			this.timers[num] = new java.lang.Thread(new java.lang.Runnable({
				run: function(){
					while (true){
						java.lang.Thread.currentThread().sleep(time);
						fn();
					}
				}
			}));
		  
			this.timers[num].start();
			return num;
		},

		/*
		 * From env.js by John Resig
		 */
		clearInterval:function(num){
			if ( this.timers[num] ) {
				this.timers[num].stop();
				delete this.timers[num];
			}
		},
		
		/*
		 * From env.js by John Resig
		 */
		setTimeout:function(fn, time){
			var num;
			var self = this;
			return num = self.setInterval(function(){
				fn();
				self.clearInterval(num);
			}, time);
		}
		
		/*
		wait:function(num){
			if ( !this.timers[num] ) { return ;}
			while (this.timers[num]){
				java.lang.Thread.currentThread().sleep(100);
			}			
		}
		*/
};