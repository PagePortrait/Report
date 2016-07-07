/**
 * @fileoverview Defines test for Microdata widget.
 * Success criteria:
 * - Element with ID 'microdata-container' should exist;
 * - Element with ID 'microdata-container' should contain element with CSS
 *   class 'widget-subheader';
 * - Element with CSS class 'widget-subheader' should contain string adhere to
 *   the following examples: 'found 101 unique links out of 110 total.';
 * - Element with ID 'microdata-container' should contain element with CSS
 *   class 'widget-content';
 * - If element with ID 'microdata-container' isn't empty element with CSS
 *   class 'widget-content' should contain ul>li and shouldn't contain
 *   element with CSS class 'no-data';
 * - If element with ID 'microdata-container' is empty it should contain element
 *   with CSS class 'no-data'.
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/** @const {!RegExp} */ var PATTERN = new RegExp('\\w*\\s[0-9]*\\s\\w*\\s\\w*' +
    '\\s[0-9]*\\s(\\w*\\s){3}[0-9]*\\s\\w*\\.', 'gmi');
/** @const {string} */ var WIDGET_ID = 'microdata-container';
/** @const {string} */ var SUBHEADER_CLASS_NAME = '.widget-subheader';
/** @const {string} */ var CONTENT_CLASS_NAME = '.widget-content';
/** @const {string} */ var NODATA_CLASS_NAME = '.no-data';


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testMicrodata() {
  /** @type {boolean} */ var result = true;
  // Element with ID 'microdata-container' should exist.
  /** @type {Element} */
  var widget = document.getElementById(WIDGET_ID);
  // Element with ID 'microdata-container' should contain element with CSS
  // class 'widget-subheader'
  /** @type {Node} */
  var subheader = widget.querySelector(SUBHEADER_CLASS_NAME).textContent;
  // Element with ID 'microdata-container' should contain element with CSS
  // class 'widget-content'.
  /** @type {Node} */
  var content = widget.querySelector(CONTENT_CLASS_NAME);
  /** @type {Node} */
  var list = content.getElementsByTagName('ul');
  /** @type {Node} */
  var listItems = content.querySelector('ul > li');
  /** @type {Node} */
  var noData = widget.querySelector(NODATA_CLASS_NAME);

  subheader = subheader.replace(/\s+/g, ' ');
  //  If element with ID 'microdata-container' isn't empty element with CSS
  //  class 'widget-content' should contain ul>li and shouldn't contain
  //  element with CSS class 'no-data';
  //  If element with ID 'microdata-container' is empty it should contain
  //  element with CSS class 'no-data'.
  if (content && PATTERN.test(subheader) && listItems || noData) {
    result = false;
  }
  return result;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testmicrodata = testMicrodata;
