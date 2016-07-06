/**
 * @fileoverview Defines tests for URL and IP canonalization.
 * Successful criterias:
 * - Canonicalization widget should exist;
 * - Widget should contain elements with 'canonical-url' and
 *   'canonical-ip' id's;
 * - Tag with 'passElement' should contain inner text 'Yes' and have style
 *   'display: none';
 * - Tag with 'failDisplay' should contain inner text 'No' and have style
 *   'display: block' or 'display: inline-block'.
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/** @const {string} */ var PASS = 'pass';
/** @const {string} */ var FAIL = 'fail';
/** @const {string} */ var WIDGET = 'widget-canonical-url';
/** @const {string} */ var CANONICAL_IP = 'canonical-ip';
/** @const {string} */ var CANONICAL_URL = 'canonical-url';


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testCanonicalization() {
  /** @type {boolean} */ var result = !document.getElementsByClassName(WIDGET);
  /** @type {Array.<string>} */ var rows = [CANONICAL_URL, CANONICAL_IP];
  /** @type {number} */ var length = rows.length;
  /** @type {Element} */ var element;
  /** @type {Element} */ var passElement;
  /** @type {Element} */ var failElement;
  /** @type {Element} */ var passDisplay;
  /** @type {Element} */ var failDisplay;

  if (result) {
    for (; length;) {
      element = document.getElementById(rows[--length]);
      if (element) {
        passElement = element.getElementsByClassName(PASS)[0];
        failElement = element.getElementsByClassName(FAIL)[0];
        if (passElement && failElement) {
          passDisplay =
              getComputedStyle(passElement).getPropertyValue('display');
          failDisplay =
              getComputedStyle(failElement).getPropertyValue('display');
          if ((passDisplay == 'none' && (failDisplay !== 'inline-block' &&
              failDisplay !== 'block')) || (passDisplay != 'none' &&
              failDisplay != 'none')) {
            result = true;
            break;
          }
        }
      }
    }
  }

  return result;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testcanonicalization = testCanonicalization;
