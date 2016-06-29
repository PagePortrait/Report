/**
 * @fileoverview Defines tests for microdata widget.
 * Success criterias:
 * - Element with id 'microdata-container' should exist and contain ul>li;
 * - Element with class 'widget-subheader' should have inner text that matches 
 *   regular expression;
 * - If widget is empty element with class 'no-data' should exist.
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/** @const {!RegExp} */ var PATTERN = new RegExp('\\w*\\s[0-9]*\\s\\w*\\s\\w*' +
    '\\s[0-9]*\\s(\\w*\\s){3}[0-9]*\\s\\w*\\.', 'gmi');


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testMicrodata() {
  /** @type {boolean} */ var result =false;
  /** @type {Element} */
  var widget = document.getElementById('microdata-container');
  /** @type {Node} */
  var subheader = widget.querySelector('.widget-subheader').textContent;
  /** @type {Node} */
  var content = widget.querySelector('.widget-content > ul');
  /** @type {Node} */
  var list = content.getElementsByTagName('ul');
  /** @type {Node} */
  var listItems = content.querySelector('ul > li');
  /** @type {Node} */
  var noData = widget.querySelector('.no-data');
  subheader = subheader.replace(/\s+/g, ' ');

  if (content && PATTERN.test(subheader) && listItems || noData) {
    return result;
  }
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testmicrodata = testMicrodata;
