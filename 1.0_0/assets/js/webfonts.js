/**
 * Created with JetBrains WebStorm.
 * User: Will
 * Date: 3/1/13
 * Time: 5:29 PM
 * To change this template use File | Settings | File Templates.
 */

WebFontConfig = {
	google: { families: [ 'Goudy+Bookletter+1911::latin' ] }
};
(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
	'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
	})();