/**
 * @fileoverview Defines tests for deprecated tags checker.
 */


/** @const {!RegExp} */ var PATTERN = /^\d*$/;


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testTags() {
  /** @type {Element} */
  var container = document.getElementById('content-tags-container');
  /** @type {Element} */
  var trueElement = container && container.getElementsByClassName('true')[0];
  /** @type {Element} */
  var passElement = container && container.getElementsByClassName('pass')[0];
  /** @type {string} */
  var message = passElement && passElement.textContent.trim();
  /** @type {Element} */ var table = document.getElementById('tags-data-table');
  /** @type {Element} */ var nodes = table && table.getElementsByTagName('tr');
  /** @type {number} */ var length = nodes && nodes.length;
  /** @type {number} */ var i = 0;
  /** @type {NodeList} */ var cells;
  /** @type {string} */ var txt;
  /** @type {number} */ var num;

  if (container && table) {
    if (trueElement && passElement && message) {
      return false;
    } else {
      for (; i < length; i++) {
        cells = nodes[i].querySelectorAll('th, td');
        txt = cells[0].textContent.trim();
        num = cells[1].textContent.trim();
        if (txt.length && PATTERN.test(num)) {
          return false;
        }
      }
    }
  }
  return true;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testtags = testTags;
