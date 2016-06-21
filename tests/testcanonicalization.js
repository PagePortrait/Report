/**
 * @fileoverview Defines tests for URL and IP canonalization.
 */


/** @const {!Object.<string, function(string):boolean>} */ var VALIDATORS = {
  /** @return {boolean} */ 'canonical-url': function(content) {
    return typeof content == 'string';
  },
  /** @return {boolean} */ 'canonical-ip': function(content) {
    return typeof content == 'string';
  }
};


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testCanonicalization() {
  for (/** @type {string} */ var metric in VALIDATORS) {
    /** @type {Element} */ var element = document.getElementById(metric);
    /** @type {Element} */
    var passClass = element && element.getElementsByClassName('pass')[0];
    /** @type {Element} */
    var failClass = element && element.getElementsByClassName('fail')[0];
    /** @type {string} */
    var content = element && element.childNodes[3].textContent.trim();
    /** @type {function(string):boolean} */ var validator = VALIDATORS[metric];

    if (!element || !content || !validator(content)) {
      return true;
    } else if ((passClass.style.display == 'block' &&
        failClass.style.display != 'none') ||
        (getComputedStyle(passClass).getPropertyValue('display') == 'none' &&
        getComputedStyle(failClass).getPropertyValue('display') !=
        'inline-block')) {
      return true;
    }
  }
  return false;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testcanonicalization = testCanonicalization;
