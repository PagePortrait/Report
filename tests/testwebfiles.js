/**
 * @fileoverview Defines tests for web files.
 * Successful criteria:
 * - Web Files widget should exist;
 * - Elements "h4" should exist in web files;
 * - In "h4" should be HTTP status code and its type should number.
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/** @const {!Array.<number>} */ var HTTP_STATUS_CODES = [
  0, 100, 101, 102, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300,
  301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404, 405, 406,
  407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 420, 421, 422,
  423, 424, 426, 428, 429, 431, 440, 444, 449, 450, 451, 495, 496, 497, 498,
  499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 520, 521,
  522, 523, 524, 525, 526, 530
];


/**
 * @return {boolean} Returns 'true' if test failed.
 */
function testWebFiles() {
  /** @type {boolean} */ var result = false;
  /** @type {Element} */
  var container = document.getElementById('webfiles-container');
  /** @type {NodeList} */
  var elements = container && container.querySelectorAll('h4');
  /** @type {number} */ var length = container && elements.length;
  /** @type {number} */ var code;
  /** @type {string} */ var text;


  if (container && length) {
    for (; length;) {
      text = elements[--length].textContent.trim();
      code = +text.split(': ')[1];
      if (!isNaN(code) || ~HTTP_STATUS_CODES.indexOf(code)) {
        return result;
      }
    }
  }
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testwebfiles = testWebFiles;
