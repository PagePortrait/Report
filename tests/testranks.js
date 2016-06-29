/**
 * @fileoverview Defines tests for Alexa ranks and Moz authority.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/** @const {!RegExp} */ var PATTERN = /^\d([,\.]*\d)*$/;

/** @const {!Object.<string, function(string):boolean>} */ var VALIDATORS = {
  /** @return {boolean} */ 'alexa-global-rank': validateAlexaData_,
  /** @return {boolean} */ 'alexa-country-rank': validateAlexaData_,
  /** @return {boolean} */ 'mozdata-domain-authority': function(content) {
    return !isNaN(content) && content >= 0 && content <= 100;
  }
};


/**
 * @param {string} value The alexa data value to validate.
 * @return {boolean} Returns "true" if value is valid.
 */
function validateAlexaData_(value) {
  return PATTERN.test(value) || 'N/A' == value || '-' == value;
}


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testRanks() {
  for (/** @type {string} */ var metric in VALIDATORS) {
    /** @type {Element} */ var element = document.getElementById(metric);
    /** @type {string} */ var content = element && element.textContent.trim();
    /** @type {function(string):boolean} */ var validator = VALIDATORS[metric];

    if (content && !validator(content)) {
      return true;
    }
  }
  return false;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testranks = testRanks;
