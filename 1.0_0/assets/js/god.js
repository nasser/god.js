var GodJS = {
  religions: [],
  injectCode: function(tabid) {
    chrome.tabs.executeScript(tabid, { code: GodJS.codeToInject() });
  },

  codeToInject: function() {
    var code = helpersText();

    var religionCode = ""

    GodJS.religions.forEach(function(religion) {
      if(religion.active && religion.scripture.script) {
        religionCode += religion.scripture.script;
      }
    });

    code += religionCode;
    console.log(religionCode)
    return code;
  },

  injectFileCode: function(name) {
    return "s = document.createElement('script');\
    s.src = chrome.extension.getURL(\"" + name +  "\"); \
    s.onload = function() { \
      this.parentNode.removeChild(this); \
    }; \
    (document.head||document.documentElement).appendChild(s); \
    ";
  }
}