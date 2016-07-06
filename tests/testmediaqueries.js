/**
 * @fileoverview Defines test for Media Queries widget.
 * Success criterias:
 * - Widget with ID 'media-widget' should exist and can be empty or can
 *   return media queries;
 * - Widget should contain element with ID 'media-data-table';
 * - If widget is not empty it shouldn't contain element with
 *   CSS classes '.rule.media-none' and row in 'media-data-table' should
 *   contain text string '@media';
 * - If widget is empty it should contain element with
 *   CSS classes '.rule.media-none'.
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/** @const {!RegExp} */ var MEDIA_PATTERN = /@media([^{]*)/;
/** @const {string} */ var WIDGET_ID = 'media-widget';
/** @const {string} */ var CSS_RULE = '.rule.media-none';
/** @const {string} */ var TABLE_ID = 'media-data-table';


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testMediaQueries() {
  /** @type {Element} */ var element = document.getElementById(WIDGET_ID);
  /**  Widget with ID 'media-widget' should exist and can be empty or can
       return media queries. */
  /** @type {Element} */ var table = document.getElementById(TABLE_ID);
  /** Widget should contain element with ID 'media-data-table'. */
  /** @type {boolean} */
  var result = element && element.querySelector(CSS_RULE);
  /** @type {NodeList} */ var rows;
  /** @type {number} */ var length;

  if (!result && table) {
    /** If widget is not empty it should contain element with ID
        'media-data-table' and shouldn't contain element with
        CSS classes '.rule.media-none'. */
    rows = element.getElementsByTagName('TR');
    length = rows.length;
    for (; length;) {
      if (!MEDIA_PATTERN.test(rows[--length].textContent.trim())) {
        /** If widget is not empty then every
            row in 'media-data-table' should contain text string '@media'. */
        result = true;
        break;
      }
    }
  } else if (result) {
    /** If widget is empty it should contain element with
        CSS classes '.rule.media-none'. */
    result = false;
  }

  return result;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testmediaqueries = testMediaQueries;
