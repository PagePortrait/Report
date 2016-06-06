/**
 * @fileoverview Defines tests for Alexa ranks and Moz authority.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/** @const {!RegExp} */ var PATTERN = /^\d([,\.]*\d)*$/;

/** @const {!Object.<string, function(string):boolean>} */ var VALIDATORS = {
  'alexa-global-rank': function(content) {
    return PATTERN.test(content) || 'N/A' == content || '-' == content;
  },
  'alexa-country-rank': function(content) {
    return PATTERN.test(content) || 'N/A' == content;
  },
  'mozdata-domain-authority': function(content) {
    return !isNaN(content) && content >= 0 && content <= 100;
  }
};

/**
 * @return {boolean} Returns "true" if test failed.
 */
function testRanks() {
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
window.testranks = testRanks;
