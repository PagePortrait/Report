/**
 * @fileoverview Defines test for Media Queries widget.
 * Success criterias:
 * - Element with id 'media-widget' should exist;
 * - If widget is not empty it should contain element with id
 *   'media-data-table' and shouldn't contain '.rule.media-none';
 * - Every row in 'media-data-table' should contain text string '@media';
 * - If widget is empty it should contain classes '.rule.media-none' and
 *   shouldn't containe 'media-data-table'.
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/** @const {!RegExp} */ var MEDIA_PATTERN = /@media([^{]*)/;
/** @const {string} */ var WIDGET = 'media-widget';
/** @const {string} */ var CSS_RULE = '.rule.media-none';
/** @const {string} */ var TABLE_ID = 'media-data-table';


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testMediaQueries() {
  /** @type {Element} */ var element = document.getElementById(WIDGET);
  /** Element with id 'media-widget' should exist. */
  /** @type {Element} */ var table = document.getElementById(TABLE_ID);
  /** @type {boolean} */
  var result = element && element.querySelector(CSS_RULE) && table;
  /** If widget is empty it should contain classes '.rule.media-none' and
      shouldn't containe 'media-data-table'. */
  /** @type {NodeList} */ var rows;
  /** @type {number} */ var length;

  if (!result && table) {
    /** If widget is not empty it should contain element with id
        'media-data-table' and shouldn't contain '.rule.media-none'. */
    rows = element.getElementsByTagName('TR');
    length = rows.length;
    for (; length;) {
      if (!MEDIA_PATTERN.test(rows[--length].textContent.trim())) {
        /** Every row in 'media-data-table' should contain text
            string '@media'. */
        result = true;
        break;
      }
    }
  }

  return result;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testmediaqueries = testMediaQueries;
