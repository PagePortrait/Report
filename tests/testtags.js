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
  var element = container && container.getElementsByClassName('true')[0];
  /** @type {number} */
  var message = container && 
      container.getElementsByClassName('pass')[0].textContent.length;
  /** @type {Element} */ var table = document.getElementById('tags-data-table');
  /** @type {Element} */ var nodes = table && table.getElementsByTagName('tr');
  /** @type {number} */ var length = nodes && nodes.length;
  /** @type {NodeList} */ var cells;
  /** @type {string} */ var txt;
  /** @type {number} */ var num;
  /** @type {number} */ var i = 0;

  if(container && table) {
    if (element && message) {
      return false;
    } else if (table) {
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
window.testtags = testTags;

          
