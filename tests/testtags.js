/**
 * @fileoverview Defines test for Deprecated tags widget.
 * Success criteria:
 * - Element with CSS class 'widget-deprecated-tags' should exist;
 * - Element with CSS class 'widget-deprecated-tags' should contain element
 *   with ID 'content-tags-container';
 * - Element with ID 'content-tags-container' should contain element with ID
 *   'tags-data-table';
 * - If element with CSS class 'widget-deprecated-tags' isn't empty, element
 *   with ID 'tags-data-table' should contain elements with tag name 'tr';
 * - If element with CSS class 'widget-deprecated-tags' is empty, it should
 *   contain element with CSS classes 'rule not true' and shouldn't contain
 *   element with CSS classes 'rule not';
 * - If element with CSS class 'widget-deprecated-tags' isn't empty, it should
 *   contain element with CSS classes 'rule not' and shouldn't contain
 *   element with CSS classes 'rule not true';
 * - If element with CSS class 'widget-deprecated-tags' isn't empty,
 *   elements with tag name 'tr' should contain elements with tag name 'th'
 *   and 'td';
 * - In element with tag name 'tr' first element should contain string,
 *   second element should contain number.
 */


/** @const {!RegExp} */ var PATTERN = /^\d*$/;
/** @const {string} */ var WIDGET_SELECTOR = '.widget-deprecated-tags';
/** @const {string} */ var CONTAINER_ID = 'content-tags-container';
/** @const {string} */ var TRUE_SELECTOR = '.rule.not.true';
/** @const {string} */ var PASS_SELECTOR = '.rule.not';
/** @const {string} */ var TABLE_ID = 'tags-data-table';


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testTags() {
  // Element with CSS class 'widget-deprecated-tags' should exist.
  /** @type {Element} */
  var widget = document.querySelector(WIDGET_SELECTOR);

  // Element with CSS class 'widget-deprecated-tags' should contain element
  //  with ID 'content-tags-container'.
  /** @type {Element} */
  var container = document.getElementById(CONTAINER_ID);

  // If element with CSS class 'widget-deprecated-tags' is empty, it should
  // contain element with CSS classes 'rule not true';
  /** @type {boolean} */
  var result = container && !container.querySelector(TRUE_SELECTOR);
  /** @type {Element} */
  var passElement = container && container.querySelector(PASS_SELECTOR);

  // Element with ID 'content-tags-container' should contain element with ID
  // 'tags-data-table'.
  /** @type {Element} */ var table = document.getElementById(TABLE_ID);

  // If element with CSS class 'widget-deprecated-tags' isn't empty, element
  // with ID 'tags-data-table' should contain elements with tag name 'tr'.
  /** @type {Element} */ var nodes = table && table.getElementsByTagName('tr');
  /** @type {number} */ var length = nodes && nodes.length;
  /** @type {NodeList} */ var cells;
  /** @type {number} */ var number;

  if (widget && container && table && result) {
    // If element with CSS class 'widget-deprecated-tags' isn't empty, it should
    // contain element with CSS classes 'rule not' and shouldn't contain
    // element with CSS classes 'rule not true'.
    if (passElement && result) {
      for (; length;) {
        result = !result;
        // If element with CSS class 'widget-deprecated-tags' isn't empty,
        // elements with tag name 'tr' should contain elements with
        // tag name 'th' and 'td'.
        cells = nodes[--length].querySelectorAll('th, td');
        number = cells[1].textContent.trim();
        // In element with tag name 'tr' first element should contain string,
        // second element should contain number.
        if (!(cells[0].textContent.trim() && number && PATTERN.test(number))) {
          result = true;
          break;
        }
      }
    }
  }

  return result;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testtags = testTags;
