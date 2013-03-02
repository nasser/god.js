var GodJS = {
  religions: [],
  codeToInject: function() {
    var code = "var s = document.createElement('script');\
    s.src = chrome.extension.getURL(\"assets/js/wrapper.js\"); \
    s.onload = function() { \
      this.parentNode.removeChild(this); \
    }; \
    (document.head||document.documentElement).appendChild(s); \
    "

    GodJS.religions.forEach(function(religion) {
      console.log(religion.name + ": " + religion.active);
      if(religion.active && religion.scripture.script) {
        code += religion.scripture.script;
      }
    });

    return code;
  }
}