WebTrends Tag Builder Readme File
Version: 9.4.0     
Tag Builder Version: 3.2
Created: 9/7/2011 1:58:01 AM

Contents of ZIP Archive: webtrends_dcs3e9phnuz5bdfu8tzlamfrh_8n7o.zip

tbconfig.xml
	Contains the information you need to create a tag based on the
	settings from an existing tag created by the Tag Builder. You can 
	upload this XML file directly from the Tag Builder interface and save 
	your configuration changes to the same file structure or a new tag location.

webtrends.html
	Inline HTML portion of the WebTrends tag.
	
webtrends.js
	External JavaScript portion of the WebTrends tag.

DEPLOYING THE TAG BUILDER TAG

The Tag Builder tag output supports a multi-part implementation. As shown in the steps below, 
it should be implemented differently from the JavaScript tag you can generate when you create 
a data source in WebTrends Administration. For more detailed information about the Tag Builder 
tag and how to deploy it, see the Help at https://tagbuilder.webtrends.com/Help/Help/Help.aspx.

To deploy the tag:

1. Save the webtrends.js file in a common JavaScript location on your
	web server.
2. Edit the path referenced in webtrends.html so that it points to the
	actual location of webtrends.js.
3. Paste the contents of webtrends.html on every page in your web site.
	To avoid logging hits to pages that do not load completely, and to
	ensure best performance, paste this code just before the </body>
	tag at the bottom of your web page.
	
