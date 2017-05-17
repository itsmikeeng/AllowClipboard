# AllowClipboard
Chrome Extension that allows clipboard read and write without user interaction. Normally Chrome does not allow JavaScript access to the Clipboard without a user interaction (e.g. click). AllowClipboard extension can be useful in situations where clipboard access is needed out of band, such as during an asynchronous method call from the server.

# Chrome Extension
<a href="https://chrome.google.com/webstore/detail/allow-clipboard/bgafccceonganlcmcojjacanoadnhmac?hl=en-US&gl=US">Allow Clipboard - Chrome Web Store</a>

# NuGet
Client TypeScript: <a hreft="https://www.nuget.org/packages/AllowClipboard.Client.TypeScript">https://www.nuget.org/packages/AllowClipboard.Client.TypeScript</a>

# Overview
This project is written primarily in TypeScript. TypeScript files are compiled to JavaScript and placed in the AllowClipboardExtension folder of the project folder.

# Debugging
<ol>
<li>Run `npm install`</li>
<li>If first run, build project so that JavaScript files are generated to AllowClipboardExtension by executing tsc in the project directory.
  <ul>
    <li>Note: To watch and auto generate JS files on save execute `tsc -w`</li>
  </ul>
</li>
<li>Download <a href="https://chrome.google.com/webstore/detail/chrome-apps-extensions-de/ohmmkhmmmpcnpikjeljgnaoabkaalbgc?hl=en">Chrome Apps & Extensions Developer Tool</a>.</li>
<li>Open Chrome Apps & Extensions Developer Tool.</li>
<li>Select Extensions Tab.</li>
<li>Click Load unpacked...</li>
<li>Choose path to AllowClipboardExtension.</li>
<li>Open a Chrome window.</li>
<li>JavaScript injected into the webpage context will be available. (allowClipboardClient.ts and common.ts)</li>
</ol>

# Example
In Webpage Context:</br>
```javascript
var clipboardClient = new AllowClipboard.Client.ClipboardClient();
clipboardClient.write("Worked!", function(success){console.log(success)});
clipboardClient.read(function(success,data){console.log(data)});
```
Should print out "Worked!"
