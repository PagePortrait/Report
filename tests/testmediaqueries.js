/**
 * @fileoverview Defines tests for testMediaQueries.
 */


/**
 * @return {boolean} return true if test failed
 */
function testMediaQueries() {
  /** @const {!RegExp} */ var MEDIA_PATTERN = /@media([^{]*)/;
  /** @type {string} */ var node = 'media-widget';
  /** @type {Element} */ var element = document.getElementById(node);
  /** @type {Element} */
  var failClass = document.getElementsByClassName('rule media-none');
  /** @type {Node} */ var table = document.getElementById('media-data-table');
  /** @type {number} */ var i = 0;
  /** @type {Element} */ var tableRows;
  /** @type {number} */ var length;

  if (!node) {
    return true;
  }
  if (table) {
    tableRows = element.getElementsByTagName('tr');
    length = tableRows.length;

    for (; i < length; i++) {
      if (!MEDIA_PATTERN.test(tableRows[i].textContent.trim())) {
        return true;
      }
    }
  } else if (!failClass) {
    return true;
  }
  return false;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testmediaqueries = testMediaQueries;
