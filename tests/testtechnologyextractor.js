/**
 * @fileoverview Defines tests for Technology Extractor widget.
 * Success criterias:
 * - Element with id 'content-technology-container' should exist;
 * - Result table with id 'technology-data-table' or element with class
 *  'rule true' should exist;
 * - Result table should contain string with technology name and a counter.
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/** @const {!RegExp} */ var PATTERN = /^\d([,\.]*\d)*$/;


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testTechnologyExtractor() {
  /** @type {Element} */
  var element = document.getElementById('content-technology-container');
  /** @type {Element} */
  var table = document.getElementById('technology-data-table');
  /** @type {Element} */
  var failClass = element && element.getElementsByClassName('rule true');
  /** @type {NodeList} */
  var elements = element && element.getElementsByTagName('tr');
  /** @type {Node} */ var parentNode = table && table.parentNode;
  /** @type {number} */ var length = element && elements.length;
  /** @type {NodeList} */ var cells;
  /** @type {string} */ var content;

  if (parentNode && ~parentNode.className.indexOf('true') &&
      elements.length) {
    return true;
  }

  if (table) {
    for (; length;) {
      cells = elements[--length].querySelectorAll('th,td');
      content = cells[1].textContent.trim();

      if (!(cells[0].textContent.trim() &&
          (PATTERN.test(content) || 'N/A' == content))) {
        return false;
      }
    }
  } else if (!failClass) {
    return true;
  }

  return false;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testtechnologyextractor = testTechnologyExtractor;
