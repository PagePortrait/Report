/**
 * @fileoverview Defines tests for URL and IP canonalization.
 * Successful criterias:
 * - Canonicalization widget should exist;
 * - Widget should contain elements with 'canonical-url' and
 *   'canonical-ip' id's;
 * - Tag with "passElement" should contain inner text "Yes" and have style
 *   "display: none";
 * - Tag with "failDisplay" should contain inner text "No" and have style
 *   "display: block" or "display: inline-block".
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testCanonicalization() {
  /** @type {boolean} */ var result = false;
  /** @type {Array.<string>} */ var widgets = ['canonical-url', 'canonical-ip'];
  /** @type {number} */ var length = widgets.length;
  /** @type {Element} */ var element;
  /** @type {Element} */ var passElement;
  /** @type {Element} */ var failElement;
  /** @type {Element} */ var passDisplay;
  /** @type {Element} */ var failDisplay;

  for (; length;) {
    element = document.getElementById(widgets[--length]);
    if (element) {
      passElement = element.getElementsByClassName('pass')[0];
      failElement = element.getElementsByClassName('fail')[0];
      if (passElement && failElement) {
        passDisplay = getComputedStyle(passElement).getPropertyValue('display');
        failDisplay = getComputedStyle(failElement).getPropertyValue('display');
        if ((passDisplay == 'none' && (failDisplay == 'inline-block' ||
            failDisplay == 'block')) || (passDisplay != 'none' &&
            failDisplay == 'none')) {
          return result;
        }
      }
    }
  }
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testcanonicalization = testCanonicalization;
