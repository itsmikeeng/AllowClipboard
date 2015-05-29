# AllowClipboard
Chrome Extension that allows clipboard read and write without user interaction.

# Overview
This project is written primarily in TypeScript using Visual Studio 2013. TypeScript files are compiled to JavaScript and placed in the AllowClipboardExtension folder of the project folder.

# Debugging
<ol>
<li>If first run, build project so that JavaScript files are generated to AllowClipboardExtension.
  <ul>
    <li>Note: TypeScript files are automatically compiled to JavaScript on Save.</li>
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
```
var clipboardClient = new AllowClipboard.Client.ClipboardClient();
clipboardClient.clipboardWrite("Worked!", function(success){console.log(success)});
clipboardClient.clipboardRead(function(success,data){console.log(data)});
```
Should print out "Worked!"
