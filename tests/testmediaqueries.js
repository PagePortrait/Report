/**
 * @fileoverview Defines tests for testMediaQueries.
 * Success criterias:
 * - Element with id 'media-widget' should exist;
 * - If widget is not empty it should contain element with id
 *  'media-data-table';
 * - Rows in 'media-data-table' should contain text string '@media';
 * - If widget is empty it should contain class '.rule.media-none'.
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
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


  if (element && table) {
    rows = element.getElementsByTagName('TR');
    length = rows.length;

    for (; length;) {
      if (MEDIA_PATTERN.test(rows[--length].textContent.trim()) || rule) {
        return false;
      }
    }
  }
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testmediaqueries = testMediaQueries;
