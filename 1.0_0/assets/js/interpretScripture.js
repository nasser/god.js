/**
 * Created with JetBrains WebStorm.
 * User: Will
 * Date: 3/1/13
 * Time: 11:26 AM
 * To change this template use File | Settings | File Templates.
 */

function interpretScripture(scriptureText) {
    /* Interprets scriptureText (godscript string) and returns javascript */

    return GodJS.parser.parse(scriptureText);
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
    sentence = scriptofjava / alert / loop / fun / var / conditional / bullshit \
    scriptofjava = white? 'it is said in the script of java 'i code:notamen+ amen punctuation  { return code.join(' ') + ';' } \
    var = white? v:(var_null / var_declasn / var_asn) punctuation { return v + ';' } \
    conditional = white? c:(conditional_asrteql / conditional_asrtneql) punctuation { return c + ';' } \
    alert = white? a:alert_val punctuation { return a + ';' } \
    loop = white? l:(loop_fun) punctuation { return l + ';' } \
    fun = white? f:(fun_anon / fun_decl / fun_call) punctuation { return f + ';' } \
    bullshit = white? words:word+ punctuation { return '// ' + words.join(' ') } \
    \
    value = boolean / string / number / object_literal / identifier \
    \
    boolean = true / false \
    true = 'good'i { return 'true' } \
    false = 'evil'i { return 'false' } \
    \
    object_literal = 'a creature'i first:key_val rest:(white key_val)* white amen { return '{' + [first].concat(rest).flatten().clean().join(', ') + '}' } \
    key_val = white? ('and 'i / 'but 'i)? 'when 'i ('the creature'i / 'it'i) ' is asked its'i white k:identifier white 'it responds with' white v:value punctuation? { return k + ' : ' + v } \
    \
    string = string_spaces / string_spaceless \
    string_spaces = ('the'i white)? 'phrase'i white s:notamen+ amen { return '\"' + s.join(' ') + '\"' } \
    string_spaceless = ('the'i white)? 'word'i white w:[^ \\.\\!\\?]+ { return '\"' + w.join('') + '\"' } \
    \
    var_declasn = 'let there be'i white v:value white 'and let it be known as'i white n:identifier { return 'var ' + n + ' = ' + v } \
    var_null = 'let there not be'i white n:identifier punctuation? { return n + ' = null' } \
    var_asn = 'let'i white n:identifier white 'be'i white v:value { return n + ' = ' +  v } \
    \
    alert_val = 'they will say'i white v:value { return 'alert(' + v + ')' } \
    \
    conditional_asrteql = 'lo'i white n:identifier white 'shall be'i ' as'i? white v:value white 'lest you'i white f:fun_call { return 'if(!(' + n + ' == ' + v + ')) {' + f + '}' } \
    conditional_asrtneql = 'lo'i white n:identifier white 'shall not be'i ' as'i? white v:value white 'lest you'i white f:fun_call { return 'if(!(' + n + ' != ' + v + ')) {' + f + '}' } \
    \
    loop_fun = n:number white 'times'i white f:fun_call { return 'for(var i=0;i<'+n+';i++){'+f+'}' } \
    \
    fun_decl = 'it is said in the book of'i white i:identifier punctuation white f:fun_body white amen { return 'function ' + i + ' {\\n' + f + '\\n}' } \
    fun_body = s:sentence* { return s.join('\\n') } \
    fun_call = 'now, 'i? 'recite'i ' the book of'i? white i:identifier { return i + '()' } \
    fun_name = 'the book of'i white i:identifier { return i } \
    fun_anon = 'recite what follows'i punctuation? white f:fun_body white amen { return 'function(){' + f + '}' } \
    \
    number = 'the number 'i? n:(numerals / num_lt20 / num_bw20_100) { return n } \
    numerals = n:[0-9]+ { return parseInt(n.join('')) } \
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
    punctuation = '.' / '?' / '!' / ',' \
    word = !amen white? w:[a-zA-Z]+ white? { return w.join('') } \
    \
    white = [ \\n]+ { return undefined } \
    \
    boundary = &(white / !.) \
    ");