/**
 * @fileoverview Defines test for Canonicalization widget.
 * Success criteria:
 * - Element with ID 'widget-canonical-url' should exist;
 * - Element with ID 'widget-canonical-url' should contain elements with
 *   ID 'canonical-url' and element with ID 'canonical-ip';
 * - Element with ID 'canonical-url' and element with ID 'canonical-ip' should
 *   contain element with CSS class 'pass' or element with CSS class 'fail';
 * - Element with CSS class 'pass' should contain string 'Yes';
 * - Element with CSS class 'fail' should contain string 'No';
 * - Element with CSS class 'pass' should have CSS style 'display: block' if
 *   canonical check pass or CSS style 'display: none' if canonical
 *   check does not pass;
 * - Element with CSS class 'fail' should have CSS style 'display: block' or
 *   'display: inline-block' if canonical check does not pass or
 *   CSS style 'display: none' if check pass.
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/** @const {string} */ var PASS_SELECTOR = '.pass';
/** @const {string} */ var FAIL_SELECTOR = '.fail';
/** @const {string} */ var WIDGET_SELECTOR = '.widget-canonical-url';
/** @const {string} */ var CANONICAL_IP_ID = 'canonical-ip';
/** @const {string} */ var CANONICAL_URL_ID = 'canonical-url';


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testCanonicalization() {
  // Element with ID 'widget-canonical-url' should exist.
  /** @type {boolean} */
  var result = !document.querySelector(WIDGET_SELECTOR);
  /** @type {Array.<string>} */ var rows = [CANONICAL_URL_ID, CANONICAL_IP_ID];
  /** @type {number} */ var length = rows.length;
  /** @type {Element} */ var element;
  /** @type {Element} */ var passElement;
  /** @type {Element} */ var failElement;
  /** @type {Element} */ var passDisplay;
  /** @type {Element} */ var failDisplay;

  if (!result) {
    for (; length;) {
      // Element with ID 'widget-canonical-url' should contain elements with
      // ID 'canonical-url' and element with ID 'canonical-ip'.
      element = document.getElementById(rows[--length]);
      if (element) {
        // Element with ID 'canonical-url' and element with ID 'canonical-ip'
        // should contain element with CSS class 'pass' or element with
        // CSS class 'fail'.
        passElement = element.querySelector(PASS_SELECTOR);
        failElement = element.querySelector(FAIL_SELECTOR);
        // Element with CSS class 'pass' should contain string 'Yes';
        // Element with CSS class 'fail' should contain string 'No';
        if (passElement.textContent.trim() && failElement.textContent.trim()) {
          passDisplay =
              getComputedStyle(passElement).getPropertyValue('display');
          failDisplay =
              getComputedStyle(failElement).getPropertyValue('display');
          // Element with CSS class 'pass' should have CSS style
          // 'display: block' if canonical check pass or CSS style
          // 'display: none' if canonical check does not pass;
          // Element with CSS class 'fail' should have CSS style
          // 'display: block' or 'display: inline-block' if canonical check
          // does not pass or CSS style 'display: none' if check pass.
          if (!(('block' == passDisplay && 'none' == failDisplay) ||
              ('none' == passDisplay && ('inline-block' == failDisplay ||
              'block' == failDisplay)))) {
            result = true;
            break;
          }
        } else {
          result = true;
        }
      } else {
        result = true;
      }
    }
  }

  return result;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testcanonicalization = testCanonicalization;
