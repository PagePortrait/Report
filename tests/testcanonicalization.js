/**
 * @fileoverview Defines test for Canonicalization widget.
 * Success criteria:
 * - Element with ID 'widget-canonical-url' should exist;
 * - Element with ID 'widget-canonical-url' should contain elements with
 *   ID 'canonical-url' and element with ID 'canonical-ip';
 * - Element with ID 'canonical-url' and element with ID 'canonical-ip' should
 *   contain element with CSS class 'pass' or element with CSS class 'fail';
 * - Elements with CSS class 'pass' content should not be empty, null or
 *   undefined;
 * - Elements with CSS class 'fail' content should not be empty, null or
 *   undefined;
 * - Element with CSS class 'pass' should have CSS style property
 *   'display: block' if canonical check pass or CSS style property
 *   'display: none' if canonical check does not pass;
 * - Element with CSS class 'fail' should have CSS style property
 *   'display: block' or 'display: inline-block' if canonical check does
 *   not pass or CSS style property 'display: none' if check pass.
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/** @const {string} */ var PASS_SELECTOR = '.pass';
/** @const {string} */ var FAIL_SELECTOR = '.fail';
/** @const {string} */ var WIDGET_SELECTOR = '#widget-canonical';
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
  /** @type {string} */ var passDisplay;
  /** @type {string} */ var failDisplay;
  /** @type {?string} */ var passText;
  /** @type {?string} */ var failText;

  if (!result) {
    for (; length;) {
      // Element with ID 'widget-canonical-url' should contain elements with
      // ID 'canonical-url' and element with ID 'canonical-ip'.
      element = document.getElementById(rows[--length]);
      if (element) {
        // Element with ID 'canonical-url' and element with ID 'canonical-ip'
        // should contain element with CSS class 'pass' or element with
        // CSS class 'fail'.
        passElement = element && element.querySelector(PASS_SELECTOR);
        failElement = element && element.querySelector(FAIL_SELECTOR);
        passText = passElement.textContent.trim();
        failText = failElement.textContent.trim();
        // Elements with CSS class 'pass' content should not be empty, null or
        // undefined;
        // Elements with CSS class 'fail' content should not be empty, null or
        // undefined;
        if ((passText && 'undefined' != passText && 'null' != passText) &&
            (failText && 'undefined' != failText && 'null' != failText)) {
          passDisplay =
              getComputedStyle(passElement).getPropertyValue('display');
          failDisplay =
              getComputedStyle(failElement).getPropertyValue('display');
          // Element with CSS class 'pass' should have CSS style property
          // 'display: block' if canonical check pass or CSS style property
          // 'display: none' if canonical check does not pass;
          // Element with CSS class 'fail' should have CSS style property
          // 'display: block' or 'display: inline-block' if canonical check
          // does not pass or CSS style property 'display: none' if check pass.
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
