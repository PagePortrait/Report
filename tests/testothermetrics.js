/**
 * @fileoverview Defines tests for google safe browsing and linked sites.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/** @const {!RegExp} */ var PATTERN = /^\d([,\.]*\d)*$/;

/** @const {!Object.<string, function(string):boolean>} */ var VALIDATORS = {
  /** @return {boolean} */ 'google-safebrowsing': function(content) {
    return !!~(['ok', 'malware', 'unknown'].indexOf(content));
  },
  /** @return {boolean} */ 'mozdata-links': function(content) {
    return PATTERN.test(content) || 'N/A' == content || '-' == content;
  }
};


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testOtherMetrics() {
  for (/** @type {string} */ var metric in VALIDATORS) {
    /** @type {Element} */ var element = document.getElementById(metric);
    /** @type {string} */ var content = element && element.textContent.trim();
    /** @type {function(string):boolean} */ var validator = VALIDATORS[metric];

    if (!content || !validator(content)) {
      console.log('[othermetrics]', metric, content);
      return true;
    }
  }
  return false;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testothermetrics = testOtherMetrics;
