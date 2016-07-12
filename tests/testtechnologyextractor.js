/**
 * @fileoverview Defines tests for Technology Extractor widget.
 * Success criterias:
 * - Element with CSS class 'widget-technologies' should exist;
 * - Element with CSS class 'widget-technologies' should contain element with
 *   ID 'technology-data-table';
 * - If element with CSS class 'widget-technologies' is not empty it should
 *   contain element with CSS class 'rule' and it shouldn't contain element with
 *   CSS classes 'true';
 * - If element with CSS class 'widget-technologies' is empty it should contain
 *   element with CSS class 'rule true';
 * - If element with CSS class 'widget-technologies' is not empty, element with
 *   ID 'technology-data-table' should contain elements with tag name 'tr';
 * - Elements with tag name 'tr' should contain elements with tag names 'th'
 *   and 'td';
 * - In element with tag name 'tr' first element should contain string,
 *   second element should contain number.
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/** @const {!RegExp} */ var PATTERN = /^\d*$/;
/** @const {string} */ var WIDGET_SELECTOR = '.widget-technologies';
/** @const {string} */ var TABLE_ID = 'technology-data-table';
/** @const {string} */ var FAIL_SELECTOR = '.rule.true';


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testTechnologyExtractor() {
  // Element with CSS class 'widget-technologies' should exist.
  /** @type {Element} */
  var element = document.querySelector(WIDGET_SELECTOR);

  // Element with CSS class 'widget-technologies' should contain element with
  // ID 'technology-data-table'.
  /** @type {Element} */
  var table = document.getElementById(TABLE_ID);

  // If element with CSS class 'widget-technologies' is empty it should contain
  // element with CSS class 'rule true'.
  /** @type {boolean} */ var result = !element.querySelector(FAIL_SELECTOR);

  // If element with CSS class 'widget-technologies' is not empty, element with
  // ID 'technology-data-table' should contain elements with tag name 'tr'.
  /** @type {NodeList} */
  var elements = element.getElementsByTagName('tr');
  /** @type {number} */ var length = elements.length;
  /** @type {NodeList} */ var cells;
  /** @type {string} */ var content;

  if (element && table && length && result) {
    for (; length;) {
      result = !result;
      // Elements with tag name 'tr' should contain elements with tag names
      // 'th' and 'td'.
      cells = elements[--length].querySelectorAll('th,td');
      content = cells[1].textContent.trim();
      // In element with tag name 'tr' first element should contain
      // string, second element should contain number.
      if (!(cells[0].textContent.trim() && content && PATTERN.test(content))) {
        result = true;
        break;
      }
    }
  }

  return result;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testtechnologyextractor = testTechnologyExtractor;
