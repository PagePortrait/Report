/**
 * @fileoverview Defines test for Deprecated tags widget.
 * - Element with CSS class 'widget-deprecated-tags' should exist;
 * - Element with CSS class 'widget-deprecated-tags' should contain element
 *   with ID 'content-tags-container';
 * - Element with ID 'content-tags-container' should contain element with ID
 *   'tags-data-table';
 * - If element with CSS class 'widget-deprecated-tags' isn't empty, element
 *   with ID 'tags-data-table' shuld contain elements with tag name 'tr';
 * - If element with CSS class 'widget-deprecated-tags' is empty, it should
 *   contain element with CSS classes 'rule not true' and shouldn contain
 *   element with CSS classes 'rule not';
 * - If element with CSS class 'widget-deprecated-tags' isn't empty, it should
 *   contain element with CSS classes 'rule not' and shouldn contain
 *   element with CSS classes 'rule not true';
 * - If element with CSS class 'widget-deprecated-tags' isn't empty,
 *   elements with tag name 'tr' should contain elements with tag name 'th' and
 *   'td';
 * - In element with tag name 'tr' first element should contain string,
 *   second element should contain number.
 */


/** @const {!RegExp} */ var PATTERN = /^\d*$/;
/** @const {string} */ var WIDGET_CLASS_NAME = '.widget-deprecated-tags';
/** @const {string} */ var CONTAINER_ID = 'content-tags-container';
/** @const {string} */ var TRUE_CLASS_NAME = '.rule.not.true';
/** @const {string} */ var PASS_CLASS_NAME = '.rule.not';
/** @const {string} */ var TABLE_ID = 'tags-data-table';


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testTags() {
  // Element with CSS class 'widget-deprecated-tags' should exist.
  /** @type {Element} */
  var widget = document.querySelector(WIDGET_CLASS_NAME);

  // Element with CSS class 'widget-deprecated-tags' should contain element
  //  with ID 'content-tags-container'.
  /** @type {Element} */
  var container = document.getElementById(CONTAINER_ID);

  // If element with CSS class 'widget-deprecated-tags' is empty, it should
  // contain element with CSS classes 'rule not true';
  /** @type {boolean} */
  var result = !container.querySelector(TRUE_CLASS_NAME);
  /** @type {Element} */
  var passElement = container.querySelector(PASS_CLASS_NAME);


  // Element with ID 'content-tags-container' should contain element with ID
  // 'tags-data-table'.
  /** @type {Element} */ var table = document.getElementById(TABLE_ID);

  // If element with CSS class 'widget-deprecated-tags' isn't empty, element
  // with ID 'tags-data-table' shuld contain elements with tag name 'tr'.
  /** @type {Element} */ var nodes = table && table.getElementsByTagName('tr');
  /** @type {number} */ var length = nodes && nodes.length;
  /** @type {NodeList} */ var cells;
  /** @type {string} */ var text;
  /** @type {number} */ var number;

  if (widget && container && table && result) {
    // If element with CSS class 'widget-deprecated-tags' isn't empty, it should
    // contain element with CSS classes 'rule not' and shouldn contain
    // element with CSS classes 'rule not true'.
    if (passElement && result) {
      for (; length;) {
        result = !result;
        // If element with CSS class 'widget-deprecated-tags' isn't empty,
        // elements with tag name 'tr' should contain elements with tag
        // name 'th' and 'td'.
        cells = nodes[--length].querySelectorAll('th, td');
        text = cells[0].textContent.trim();
        number = cells[1].textContent.trim();
        // In element with tag name 'tr' first element should contain string,
        // second element should contain number.
        if (!(txt.length && PATTERN.test(num))) {
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
