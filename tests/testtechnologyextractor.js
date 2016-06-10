/**
 * @fileoverview Defines tests for Technology Extractor widget.
 */


/** @const {!RegExp} */ var PATTERN = /^\d([,\.]*\d)*$/;


/**
 * @return {boolean} return "true" if test failed
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
  /** @type {number} */ var index = 0;
  /** @type {NodeList} */ var cells;
  /** @type {string} */ var content;

  if (parentNode && ~parentNode.className.indexOf('true') &&
      elements.length) {
    return true;
  }

  if (table) {
    for (; index < length; index++) {
      cells = elements[index].querySelectorAll('th,td');
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
