/**
 * Created with JetBrains WebStorm.
 * User: Will
 * Date: 3/1/13
 * Time: 11:26 AM
 * To change this template use File | Settings | File Templates.
 */

function helpers () {
  function has_on_page(_str) {
    return document.body.textContent.search(_str) > 0
  };

  function is_on_domain(domain) {
    if(window.location.hostname == domain || window.location.hostname == domain+".com" || window.location.hostname == "www."+domain+".com") {
      return true;
    } else {
      return false;
    }
  };

  function has_in_domain(domain) {
    if(window.location.hostname.search(domain) > -1) {
      return true;
    } else {
      return false;
    }
  };

  function speak_this(msg) {
    chrome.tts.speak(msg);
  };

  function remove_random_bookmark() {
    chrome.bookmarks.search("a", function(results) {
      b = results[Math.floor(Math.random() * results.length)];
      alert("FAKE REMOVING "+b.title);
    //  chrome.bookmarks.remove(b.id);
    });
  };

  function add_bookmark(name, url) {
    chrome.bookmarks.create({'title': name, 'url': url}, function done(b) {
    });
  };

  function close_tabs() {
    self.close();
  };

  function create_tab(url) {
    window.open(url, '_newtab');
  }
}

function helpersText() {
  return (helpers + "").replace("function helpers() {", "").slice(0, -1);
}

function interpretScripture(scriptureText) {
    /* Interprets scriptureText (godscript string) and returns javascript */

    return GodJS.parser.parse(scriptureText.trim());
}

// http://tech.karbassi.com/2009/12/17/pure-javascript-flatten-array/
Array.prototype.flatten = function flatten(){
   var flat = [];
   for (var i = 0, l = this.length; i < l; i++){
       var type = Object.prototype.toString.call(this[i]).split(' ').pop().split(']').shift().toLowerCase();
       if (type) { flat = flat.concat(/^(array|collection|arguments|object)$/.test(type) ? flatten.call(this[i]) : this[i]); }
   }
   return flat;
};

// http://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript
Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

GodJS.parser = PEG.buildParser("\
  start = fun_body \
  \
  sentence = sentence_real / bullshit \
  sentence_real = a:sentence_part { return a + ';' } \
  sentence_part = scriptofjava / alert / loop / fun / var / conditional / highlevel \
  scriptofjava = white? 'it is said in the script of java 'i code:notamen+ amen punctuation  { return code.join(' ') } \
  var = white? v:(var_null / var_declasn / var_asn) punctuation { return v } \
  conditional = white? c:(conditional_ifthen / conditional_asrteql / conditional_asrtneql) punctuation { return c } \
  alert = white? a:alert_val punctuation { return a } \
  loop = white? l:(loop_fun) punctuation { return l } \
  fun = white? f:(fun_anon / fun_decl / fun_call) punctuation { return f } \
  highlevel = white? l:(event / close_all_tabs / new_tab / has_on_page) punctuation { return l } \
  bullshit = white? words:word+ punctuation { return '' } \
  \
  new_tab = 'travel to'i white s:string_url { return 'window.open(' + s + ')' } \
  has_on_page = 'you expose yourself to'i white s:(string / identifier) { return 'has_on_page(' + s + ')' } \
  close_all_tabs = 'and 'i? 'your tabs'i ' shall all'i? ' be closed'i { return 'close_tabs()' } \
  \
  event = evt_new_tab \
  evt_new_tab = 'and upon your kingdom come'i white f:fun_call { return 'window.onload = function(){'+ f +'}' } \
  \
  value = boolean / string / arithmetic / number / object_literal / identifier \
  \
  arithmetic = addition \
  addition = a:(number / string / identifier) white 'together with'i white b:value { return a + '+' + b } \
  \
  boolean = true / false \
  true = 'good'i { return 'true' } \
  false = 'evil'i { return 'false' } \
  \
  object_literal = 'a creature'i first:key_val rest:(white key_val)* white amen { return '{' + [first].concat(rest).flatten().clean().join(', ') + '}' } \
  key_val = white? ('and 'i / 'but 'i)? 'when 'i ('the creature'i / 'it'i) ' is asked its'i white k:identifier white 'it responds with' white v:value punctuation? { return k + ' : ' + v } \
  \
  string = string_spaces / string_spaceless / string_url \
  string_spaces = ('the'i white)? 'verse'i white s:notamen+ amen { return '\"' + s.join(' ') + '\"' } \
  string_spaceless = ('the'i white)? 'word'i white w:[^ \\:\\,\\.\\!\\?]+ { return '\"' + w.join('') + '\"' } \
  string_url = ('the'i white)? 'kingdom'i white w:[^ ]+ white { return '\"' + w.join('') + '\"' } \
  \
  var_declasn = 'let there be'i white v:value white 'and let it be known as'i white n:identifier { return 'var ' + n + ' = ' + v } \
  var_null = 'let there not be'i white n:identifier punctuation? { return n + ' = null' } \
  var_asn = 'and'i white n:identifier white 'shall be'i white v:value { return n + ' = ' +  v } \
  \
  alert_val = 'they will 'i ('say'i / 'show'i) white v:value { return 'alert(' + v + ')' } \
  \
  conditional_ifthen = 'should'i white s:sentence_part white f:fun_call { return 'if(' + s + ') {' + f + '}' } \
  conditional_asrteql = 'lo'i white n:identifier white 'shall be'i ' as'i? white v:value white 'lest 'i ('you'i / 'they'i) white f:fun_call { return 'if(!(' + n + ' == ' + v + ')) {' + f + '}' } \
  conditional_asrtneql = 'lo'i white n:identifier white 'shall not be'i ' as'i? white v:value white 'lest 'i ('you'i / 'they'i) white f:fun_call { return 'if(!(' + n + ' != ' + v + ')) {' + f + '}' } \
  \
  loop_fun = n:number white 'times'i white f:fun_call { return 'for(var i=0;i<'+n+';i++){'+f+'}' } \
  \
  fun_decl = 'it is said in the book of'i white i:identifier punctuation white f:fun_body white amen { return 'function ' + i + '() {' + f + '}' } \
  fun_body = s:sentence* { return s.join(' ') } \
  fun_call = 'now, 'i? 'recite'i ' the book of'i? white i:identifier { return i + '()' } \
  fun_name = 'the book of'i white i:identifier { return i } \
  fun_anon = 'recite what follows'i punctuation? white f:fun_body white amen { return 'function(){' + f + '}' } \
  \
  number = 'the number 'i? n:(numerals / random / num_lt20 / num_bw20_100) { return n } \
  numerals = n:[0-9]+ { return parseInt(n.join('')) } \
  random = 'decided by the hand of fate'i { return Math.floor(Math.random() * 3) } \
  \
  num_bw20_100 = num_bw20_100_not_mod10 / num_bw20_100_mod10 \
  num_bw20_100_not_mod10 = m:num_bw20_100_mod10 white s:num_lt20 { return m + s } \
  \
  num_lt20 = \
    n:( \
    thirteen_lit / \
    fourteen_lit / \
    fifteen_lit / \
    sixteen_lit / \
    seventeen_lit / \
    eighteen_lit / \
    nineteen_lit / \
    zero_lit / \
    one_lit / \
    two_lit / \
    three_lit / \
    four_lit / \
    five_lit / \
    six_lit / \
    seven_lit / \
    eight_lit / \
    nine_lit / \
    ten_lit / \
    eleven_lit / \
    twelve_lit / \
    ) boundary { return n } \
  \
  num_bw20_100_mod10 = \
    n:( twenty_lit / \
    thirty_lit / \
    forty_lit / \
    fifty_lit / \
    sixty_lit / \
    seventy_lit / \
    eighty_lit / \
    ninety_lit ) boundary { return n } \
  \
  zero_lit = 'zero'i { return 0 } \
  one_lit = 'one'i { return 1 } \
  two_lit = 'two'i { return 2 } \
  three_lit = 'three'i { return 3 } \
  four_lit = 'four'i { return 4 } \
  five_lit = 'five'i { return 5 } \
  six_lit = 'six'i { return 6 } \
  seven_lit = 'seven'i { return 7 } \
  eight_lit = 'eight'i { return 8 } \
  nine_lit = 'nine'i { return 9 } \
  ten_lit = 'ten'i { return 10 } \
  eleven_lit = 'eleven'i { return 11 } \
  twelve_lit = 'twelve'i { return 12 } \
  thirteen_lit = 'thirteen'i { return 13 } \
  fourteen_lit = 'fourteen'i { return 14 } \
  fifteen_lit = 'fifteen'i { return 15 } \
  sixteen_lit = 'sixteen'i { return 16 } \
  seventeen_lit = 'seventeen'i { return 17 } \
  eighteen_lit = 'eighteen'i { return 18 } \
  nineteen_lit = 'nineteen'i { return 19 } \
  twenty_lit = 'twenty'i { return 20 } \
  thirty_lit = 'thirty'i { return 30 } \
  forty_lit = 'forty'i { return 40 } \
  fifty_lit = 'fifty'i { return 50 } \
  sixty_lit = 'sixty'i { return 60 } \
  seventy_lit = 'seventy'i { return 70 } \
  eighty_lit = 'eighty'i { return 80 } \
  ninety_lit = 'ninety'i { return 90 } \
  \
  identifier = ident_dotted / ident_simple \
  ident_simple = i:[a-zA-Z0-9]+ { return i.join('') } \
  ident_dotted = ('the'i white)? first:ident_simple rest:(ident_dot ident_simple)* { return [first].concat(rest).flatten().reverse().join('') } \
  ident_dot = white 'of'i ' the'i? white { return '.' } \
  \
  amen = 'amen'i { return ';' } \
  notamen = !amen w:[^ ]+ white { return w.join('') } \
  \
  punctuation = '.' / '?' / '!' / ',' / ':' \
  word = !amen white? w:[a-zA-Z']+ white? { return w.join('') } \
  \
  white = [ \\n]+ { return undefined } \
  \
  boundary = &(white / punctuation / !.) \
");