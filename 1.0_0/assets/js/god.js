var GodJS = {
  religions: [],
  injectCode: function(tabid) {
    chrome.tabs.executeScript(tabid, { code: GodJS.codeToInject() });
  },

  codeToInject: function() {
    var code = "var s = document.createElement('script');\
    s.src = chrome.extension.getURL(\"assets/js/wrapper.js\"); \
    s.onload = function() { \
      this.parentNode.removeChild(this); \
    }; \
    (document.head||document.documentElement).appendChild(s); \
    "

    GodJS.religions.forEach(function(religion) {
      if(religion.active && religion.scripture.script) {
        code += religion.scripture.script;
      }
    });

    return code;
  }
}