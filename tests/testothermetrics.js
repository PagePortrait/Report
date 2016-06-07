/**
 * @fileoverview Defines tests for google safe browsing and linked sites.
 */


/** @const {!RegExp} */ var PATTERN = /^\d([,\.]*\d)*$/;

/** @const {!Object.<string, function(string):boolean>} */ var VALIDATORS = {
  'google-safebrowsing': function(content) {
    return !!~['ok','malware','unknown'].indexOf(content);
  },
  'mozdata-links': function(content) {
    return PATTERN.test(content) || 'N/A' == content;
  }
};

/**
 * @return {boolean} Returns "true" if test failed.
 */
function testOtherMetrics() {
  for (/** @type {string} */ var metric in VALIDATORS) {
    /** @type {Element} */ var element = document.getElementById(metric);
    /** @type {string} */ var content = element && element.textContent.trim();
    /** @type {fucntion(string):boolean} */ var validator = VALIDATORS[metric];

    if (content && !validator(content)) {
      return true;
    }
  }
  return false;
}

// Export for phantomjs.
window.testothermetrics = testOtherMetrics;
