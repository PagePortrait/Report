/**
 * @fileoverview Defines test for Microdata widget.
 * Success criteria:
 * - Element with ID 'microdata-container' should exist;
 * - Element with ID 'microdata-container' should contain element with CSS
 *   class 'widget-subheader';
 * - Element with CSS class 'widget-subheader' should contain string;
 * - Element with ID 'microdata-container' should contain element with CSS
 *   class 'widget-content';
 * - If element with ID 'microdata-container' isn't empty, element with CSS
 *   class 'widget-content' should contain ul>li and shouldn't contain
 *   element with CSS class 'no-data';
 * - If element with ID 'microdata-container' is empty it should contain element
 *   with CSS class 'no-data'.
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/** @const {string} */ var WIDGET_ID = 'microdata-container';
/** @const {string} */ var SUBHEADER_SELECTOR = '.widget-subheader';
/** @const {string} */ var CONTENT_SELECTOR = '.widget-content';
/** @const {string} */ var NODATA_SELECTOR = '.no-data';


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
  /** @type {string} */
  var subheader = widget.querySelector(SUBHEADER_SELECTOR).textContent.trim();

  // Element with ID 'microdata-container' should contain element with CSS
  // class 'widget-content'.
  /** @type {Node} */
  var content = widget.querySelector(CONTENT_SELECTOR);
  /** @type {Node} */
  var listItems = content.querySelector('ul > li');
  /** @type {Node} */
  var noData = widget.querySelector(NODATA_SELECTOR);

  // Element with CSS class 'widget-subheader' should contain string;
  // If element with ID 'microdata-container' isn't empty, element with CSS
  // class 'widget-content' should contain ul>li and shouldn't contain
  // element with CSS class 'no-data';
  // If element with ID 'microdata-container' is empty it should contain
  // element with CSS class 'no-data'.
  if (content && subheader && listItems || noData) {
    result = false;
  }
  return result;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testmicrodata = testMicrodata;
