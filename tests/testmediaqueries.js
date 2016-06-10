/**
 * @fileoverview Defines tests for testMediaQueries.
 */


/**
 * @return {boolean} Returns "true" if test failed.
 */

/** @const {!RegExp} */ var MEDIA_PATTERN = /@media([^{]*)/;

function testMediaQueries() {
  /** @type {Element} */ 
  var element = document.getElementById('media-widget');
  /** @type {NodeList} */ var rule = element && 
      element.getElementsByClassName('rule media-none');
  /** @type {Element} */ 
  var table = document.getElementById('media-data-table');
  /** @type {number} */ var i = 0;
  /** @type {NodeList} */ var rows;
  /** @type {number} */ var length;

  if (!element) {
    return true;
  }
  if (table) {
    rows = element && element.getElementsByTagName('tr');
    length = rows.length;

    for (; i < length;) {
      if (!MEDIA_PATTERN.test(rows[i++].textContent.trim())) {
        return true;
      }
    }
  } else if (!rule) {
    return true;
  }
  return false;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testmediaqueries = testMediaQueries;
