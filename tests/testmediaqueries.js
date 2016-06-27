/**
 * @fileoverview Defines tests for testMediaQueries.
 * success criterias:
 * - 'media-widget' should exist;
 * - if widget is not empty it should contain 'media-data-table';
 * - rows in 'media-data-table' shoud contain '@media';
 * - if widget is empty it should contain class '.rule.media-none'.
 */


/** @const {!RegExp} */ var MEDIA_PATTERN = /@media([^{]*)/;
/** @const {string} */ var CSS_RULE = '.rule.media-none';
/** @const {string} */ var TABLE_ID = 'media-data-table';


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testMediaQueries() {
  /** @type {Element} */ var element = document.getElementById('media-widget');
  /** @type {Element} */ var rule = element && element.querySelector(CSS_RULE);
  /** @type {Element} */ var table = document.getElementById(TABLE_ID);
  /** @type {NodeList} */ var rows;
  /** @type {number} */ var length;

  if (!element) {
    return true;
  }

  if (table) {
    rows = element.getElementsByTagName('TR');
    length = rows.length;

    for (; length;) {
      if (!MEDIA_PATTERN.test(rows[--length].textContent.trim())) {
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
