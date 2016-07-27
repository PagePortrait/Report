/**
 * @fileoverview Defines tests for Alexa ranks and Moz authority.
 * Success criteria:
 * - Element with ID 'alexa-global-rank' should exist;
 * - Element with ID 'alexa-country-rank' should exist;
 * - Element with ID 'mozdata-domain-authority' should exist;
 * - Elements with ID 'alexa-global-rank', 'alexa-country-rank' should
 *   contain string formated '10.1', '10,1', '10' or '-' or 'N/A';
 * - Element with ID 'mozdata-domain-authority' should contain number between
 *   0 and 100 or one of following string: '-' or 'N/A'.
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/** @const {!RegExp} */ var PATTERN = /^\d([,\.]*\d)*$|\-/;

/** @const {!Object.<string, function(string):boolean>} */ var VALIDATORS = {
  /** @return {boolean} */ 'alexa-global-rank': validateAlexaData_,
  /** @return {boolean} */ 'alexa-country-rank': validateAlexaData_,
  /** @return {boolean} */ 'mozdata-domain-authority': function(content) {
    // Element with ID 'mozdata-domain-authority' should contain number between
    // 0 and 100 or one of following string: '-' or 'N/A'.
    return (!isNaN(content) && content >= 0 && content <= 100) ||
        content == 'N/A' || content == '-';
  }
};


/**
 * @param {string} value The alexa data value to validate.
 * @return {boolean} Returns "true" if value is valid.
 */
function validateAlexaData_(value) {
  // Elements with ID 'alexa-global-rank', 'alexa-country-rank'
  // should contain string formated '10.1', '10,1', '10' or '-' or 'N/A'.
  return PATTERN.test(value) || 'N/A' == value || '-' == value;
}


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testRanks() {
  /** @type {boolean} */ var result = false;
  // Element with ID 'alexa-global-rank' should exist.
  // Element with ID 'alexa-country-rank' should exist.
  // Element with ID 'mozdata-domain-authority' should exist.
  for (/** @type {string} */ var metric in VALIDATORS) {
    /** @type {Element} */ var element = document.getElementById(metric);
    /** @type {string} */ var content = element && element.textContent.trim();
    /** @type {function(string):boolean} */ var validator = VALIDATORS[metric];
    if (content && !validator(content)) {
      result = true;
    }
  }
  return result;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testranks = testRanks;
