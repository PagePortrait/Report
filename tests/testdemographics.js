/**
 * @fileoverview Defines tests for audience demographics.
 * Success criteria:
 * - Element with ID 'gender-data-table' should exist;
 * - Element with ID 'browsing-location-data-table' should exist;
 * - Element with ID 'gender-data-table' should exist;
 * - Elements with ID 'gender-data-table', 'browsing-location-data-table',
 *   'gender-data-table' should contain elements with tag name 'tr';
 * - Elements with tag name 'tr' should contain elements with tag names 'th'
 *   and 'td';
 * - In element with tag name 'tr' first element should contain string ,
 *   second element should contain one of following string: '10.1%', '10%',
 *   '10:1', '10' or 'N/A'.
 */


/** @const {!RegExp} */ var PATTERN = /^\d([,\.]*\d)*%$/;


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testDemographics() {
  /** @type {!Array.<string>} */ var nodes = [
    'gender-data-table',
    'browsing-location-data-table',
    'geo-data-table'
  ];
  /** @type {boolean} */ var result = false;
  /** @type {number} */ var nodesLength = nodes.length;

  // Element with ID 'gender-data-table' should exist.
  // Element with ID 'browsing-location-data-table' should exist.
  // Element with ID 'gender-data-table' should exist.
  for (; nodesLength;) {
    /** @type {Element} */
    var element = document.getElementById(nodes[--nodesLength]);

    // Elements with ID 'gender-data-table', 'browsing-location-data-table',
    // 'gender-data-table' should contain elements with tag name 'tr'.
    /** @type {NodeList} */ var elements =
        element && element.getElementsByTagName('tr');
    /** @type {number} */ var length = elements.length;
    /** @type {string} */ var content;
    /** @type {NodeList} */ var cells;

    for (; length;) {
      // Elements with tag name 'tr' should contain elements with tag names 'th'
      // and 'td'.
      cells = elements[--length].querySelectorAll('th,td');
      content = cells[1].textContent.trim();
      // In element with tag name 'tr' first element should contain string,
      // second element should contain one of following string: '10.1%', '10%',
      // '10:1', '10' or 'N/A'.
      if (!(cells[0].textContent.trim() &&
          (PATTERN.test(content) || 'N/A' == content))) {
        result = true;
        break;
      }
    }
  }
  return result;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testdemographics = testDemographics;
