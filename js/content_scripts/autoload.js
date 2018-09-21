var manifestData = chrome.runtime.getManifest();
var scripts = manifestData.web_accessible_resources;

scripts.forEach(function(script) {
    console.log("Loading " + script);
    injectJs(chrome.extension.getURL(script));
});