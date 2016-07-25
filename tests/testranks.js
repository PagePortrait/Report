/**
 * @fileoverview Defines tests for Alexa ranks and Moz authority.
 * Success criteria:
 * - Element with ID 'alexa-global-rank' should exist;
 * - Element with ID 'alexa-country-rank' should exist;
 * - Element with ID 'mozdata-domain-authority' should exist;
 * - Elements with ID 'alexa-global-rank', 'alexa-country-rank',
 *   'mozdata-domain-authority' should contain one of following string:
 *   '10', '10,1', '10.1' or '-' or 'N/A'.
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/** @const {!RegExp} */ var PATTERN = /^\d([,\.]*\d)*$/;


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testRanks() {
  /** @type {!Array.<string>} */ var nodes = [
    'alexa-global-rank',
    'alexa-country-rank',
    'mozdata-domain-authority'
  ];
  /** @type {boolean} */ var result = false;
  /** @type {number} */ var nodesLength = nodes.length;

  // Element with ID 'alexa-global-rank' should exist.
  // Element with ID 'alexa-country-rank' should exist.
  // Element with ID 'mozdata-domain-authority' should exist.
  for (; nodesLength;) {
    /** @type {Element} */
    var element = document.getElementById(nodes[--nodesLength]);
    /** @type {string} */
    var content = element.textContent.trim();

    // Elements with ID 'alexa-global-rank', 'alexa-country-rank',
    // 'mozdata-domain-authority' should contain one of following string:
    // '10', '10,1', '10.1' or '-' or 'N/A'.
    if (!(content &&
        (PATTERN.test(content) || 'N/A' == content || '-' == content))) {
      result = true;
      break;
    }
  }
  return result;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testranks = testRanks;
