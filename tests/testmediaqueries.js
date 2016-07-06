/**
 * @fileoverview Defines test for Media Queries widget.
 * Success criterias:
 * - Element with ID 'media-widget' should exist;
 * - Element with ID 'media-widget' should contain element
 *   with ID 'media-data-table';
 * - If element with ID 'media-widget' is not empty it shouldn't contain
 *   element with CSS classes '.rule.media-none' and rows in element with ID
 *   'media-data-table' should start with text string '@media';
 * - If element with ID 'media-widget' is empty it should contain element with
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
  // Element with ID 'media-widget' should exist.
  /** @type {Element} */ var element = document.getElementById(WIDGET_ID);

  // Element with ID 'media-widget' should contain element
  // with ID 'media-data-table'.
  /** @type {Element} */ var table = document.getElementById(TABLE_ID);

  // If element with ID 'media-widget' is not empty it shouldn't contain
  // element with CSS classes '.rule.media-none'.
  /** @type {boolean} */ var result = !!(element && table &&
                                         element.querySelector(CSS_RULE));

  /** @type {NodeList} */ var rows;
  /** @type {number} */ var length;

  if (!result) {
    rows = element.getElementsByTagName('TR');
    length = rows.length;
    for (; length;) {
      // rows in element with ID 'media-data-table' should start with text
      // string '@media'.
      if (!MEDIA_PATTERN.test(rows[--length].textContent.trim())) {
        result = true;
        break;
      }
    }
  } else if (result) {
    // If element with ID 'media-widget' is empty it should contain element
    // with CSS classes '.rule.media-none'.
    result = false;
  }

  return result;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testmediaqueries = testMediaQueries;
