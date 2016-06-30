/**
 * @fileoverview Defines tests for Technology Extractor widget.
 * Success criterias:
 * - Element with id 'content-technology-container' should exist;
 * - Result table with id 'technology-data-table' or element with classes
 *   'rule true' should exist;
 * - Result table should contain string with technology name and a counter.
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/** @const {!RegExp} */ var PATTERN = /^\d([,\.]*\d)*$/;


/**
 * @return {boolean} Returns "true" if test failed..
 */
function testTechnologyExtractor() {
  /** @type {boolean} */ var result = true;
  /** @type {Element} */
  var element = document.getElementById('content-technology-container');
  /** @type {Element} */
  var table = document.getElementById('technology-data-table');
  /** @type {Element} */
  var failClass = element.getElementsByClassName('rule true');
  /** @type {NodeList} */
  var elements = element.getElementsByTagName('tr');
  /** @type {Node} */ var parentNode = table && table.parentNode;
  /** @type {number} */ var length = elements.length;
  /** @type {NodeList} */ var cells;
  /** @type {string} */ var content;

  console.log(element, 'elem');
  console.log(table, 'tab');
  console.log(failClass, 'failClass');
  console.log(elements);
  console.log(length);
  if (element && table || failClass) {
    console.log(1);
    for (; length;) {
      console.log(2);
      cells = elements[length--].querySelectorAll('th,td');
      content = cells[1].textContent.trim();
      console.log(content);
      if (!(cells[0].textContent.trim() &&
          (PATTERN.test(content) || 'N/A' !== content))) {
            console.log(3);
        result = false;
      }
    }
  }
  return result;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testtechnologyextractor = testTechnologyExtractor;
