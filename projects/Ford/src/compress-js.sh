#!/bin/sh


# ## Watch the files for changes
java -classpath "./lib-carve/js/js.jar;./lib-carve/js/compiler.jar" org.mozilla.javascript.tools.shell.Main lib-carve/js/build.js -watch %*

# ## Debug the code
# java -classpath lib-carve/js/js.jar;lib-carve/js/compiler.jar org.mozilla.javascript.tools.debugger.Main lib-carve/js/build.js


# ### BUILDing

# ## As part of any build
#
# java -classpath lib-carve/js/js.jar;lib-carve/js/compiler.jar org.mozilla.javascript.tools.shell.Main lib-carve/js/build.js
#
#	## As part of ANT build
# 
#	<path id="compress.classpath">
#		<pathelement location="${pathToCarve}/lib-carve/js/js.jar" />
#		<pathelement location="${pathToCarve}/lib-carve/js/compiler.jar" />
#	</path>
#
# <java fork="true" failonerror="true" dir="${pathToCarve}" classname="org.mozilla.javascript.tools.shell.Main">
# 	<classpath refid="compress.classpath" />
# 	<arg value="lib-carve/js/build.js">
# 	</arg>
# </java>