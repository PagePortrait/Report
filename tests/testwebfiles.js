/**
 * @fileoverview Defines test for Web files.
 * Success criteria:
 * - Element with ID 'webfiles-container' should exist;
 * - Element with ID 'webfiles-container' should contain elements with tag
 *   name 'h4';
 * - In element with tag name 'h4' should be one of the next HTTP status code:
 *   0, 100, 101, 102, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300,
 *   301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404, 405, 406,
 *   407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 420, 421, 422,
 *   423, 424, 426, 428, 429, 431, 440, 444, 449, 450, 451, 495, 496, 497, 498,
 *   499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 520, 521,
 *   522, 523, 524, 525, 526, 530;
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
/** @const {string} */ var WIDGET_ID = 'webfiles-container';


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testWebFiles() {
  /** @type {boolean} */ var result = true;
  /** @type {Element} */
  var container = document.getElementById(WIDGET_ID);
  /** @type {NodeList} */
  var elements = container && container.querySelectorAll('h5');
  /** @type {number} */ var length = container && elements.length;
  /** @type {number} */ var code;
  /** @type {string} */ var text;

  // Element with ID 'webfiles-container' should exist;
  // Element with ID 'webfiles-container' should contain elements with
  // tag name 'h4'.
  if (container && length) {
    for (; length;) {
      text = elements[--length].textContent.trim();
      code = +text.split(': ')[1];
      // In element with tag name 'h4' should be one of the next HTTP status
      // code: 0, 100, 101, 102, 200, 201, 202, 203, 204, 205, 206, 207, 208,
      // 226, 300, 301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403,
      // 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417,
      // 418, 420, 421, 422, 423, 424, 426, 428, 429, 431, 440, 444, 449, 450,
      // 451, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507,
      // 508, 509, 510, 511, 520, 521, 522, 523, 524, 525, 526, 530.
      if (!isNaN(code) || ~HTTP_STATUS_CODES.indexOf(code)) {
        result = false;
      }
      // console.log('testwebfiles:status:' + code);
    }
  }
  return result;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testwebfiles = testWebFiles;
