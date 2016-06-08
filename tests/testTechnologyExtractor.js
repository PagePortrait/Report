/**
 * @fileoverview Defines tests for testTechnologyExtractor.
 */
 
 
/** @const {!RegExp} */ var PATTERN = /^\d([,\.]*\d)*%$/;
 
/**
 * @return {boolean} return "true" if test failed
 */
function testTechnologyExtractor() {
  /** @type {Element} */ var element = document.getElementById('content-tech' + 
      'nology-container');
  /** @type {Element} */ var failClass = element.getElementsByClassName('rule' +
      ' true');
  /** @type {NodeList} */ var elements = element.getElementsByTagName('tr');
  /** @type {number} */ var length = elements.length;
  /** @type {number} */ var index = 0;
  /** @type {string} */ var content;
  /** @type {NodeList} */ var cells;
  /** @type {Node} */ var table = document.getElementById('technology-' +
      'data-table');
  /** @type {Node} */ var parentNode = table && table.parentNode;

  if (parentNode && ~parentNode.className.indexOf('true')
    && elements.length) {
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
           return true
         } 
  
    return false;
}

// Export for phantomjs.
window.testTechnologyExtractor = testTechnologyExtractor;