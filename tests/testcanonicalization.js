/**
 * @fileoverview Defines tests for URL and IP canonalization.
 * Successful criteria:
 * -Canonicalization widget should exist
 * -Widget should contain elements with 'canonical-url' and 'canonical-ip' id's
 * -tag with "passClass" should contain inner text "Yes" and have style
 *  "display: none"
 * -tag with "failClass" should contain inner text "No" and have style
 *  "display: block" or "display: inline-block"
 */


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testCanonicalization() {
  /** @type {string} */ var elements = ['canonical-url', 'canonical-ip'];
  /** @type {number} */ var length = elements.length;
  /** @type {Element} */ var element;
  /** @type {Element} */ var passClass;
  /** @type {Element} */ var failClass;

  for (; length;) {
    element = document.getElementById(elements[--length]);
    passClass = element && element.getElementsByClassName('pass')[0];
    failClass = element && element.getElementsByClassName('fail')[0];

    if (!element) {
      return true;
    }

    if (passClass.style.display == 'block' &&
        failClass.style.display != 'none' && 
        passClass.textContent.trim() != 'Yes') {
      return true;
    }

    if (getComputedStyle(passClass).getPropertyValue('display') == 'none' &&
        getComputedStyle(failClass).getPropertyValue('display') !=
        'inline-block' && failClass.textContent.trim() != 'No') {
      return true;
    }
  }
  return false;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testcanonicalization = testCanonicalization;
