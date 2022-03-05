# "Hello World" XUL-Based Extension
This "Hello World" extension for K-Meleon creates a toolbar button and menu item via jsbridge. XUL-based extensions often target applications like Firefox or Pale Moon where the interface is also XUL. K-Meleon uses the native Windows API for its interface. Most K-Meleon extensions use the browser's own custom macro language and configuration files. Jsbridge allows a XUL-based extension to interact with K-Meleon's interface, configurations, and macros. 

Check the comments for notes and documentation. Any xpi file can be extracted and examined. They are .zip archives designed for XUL. To compile a XUL-based extension: zip the root folder and change the extension from .zip to .xpi.

The [most recent version](
https://github.com/rjjiii/Hello-World-XUL-/releases/download/v.1.3/hello_world@extensions.kmeleonbrowser.org.xpi) should work on:
* K-Meleon 75.1
* K-Meleon 76.X
* K-Meleon 76.X.G




## K-Meleon 74 and K-Meleon for Windows 2000
K-Meleon 74's jsbridge plugin is different. The [dual version](https://github.com/rjjiii/Hello-World-XUL-/releases/download/v1.3.74G/hello_world@extensions.kmeleonbrowser.org.xpi) supports all of the above versions plus:
* K-Meleon 74.X
* K-Meleon 74.X.G for Windows 2000 (unofficial build)



## More information
For more information on XUL check out Mozilla's documentation archived and hosted by Reality Ripple Software:

https://udn.realityripple.com/

For more information on K-Meleon check out the K-Meleon wiki, especially the sections on extensions and macros:

http://kmeleonbrowser.org/wiki/Extensions
