/**
 * @fileoverview Defines tests for web files.
 */


/** @const {!Array.<number>} */ var RESPONSE_STATUSES = [
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
  /** @type {Element} */ var container =
      document.getElementById('webfiles-container');
  /** @type {NodeList} */ var elements =
      container && container.querySelectorAll('h4');
  /** @type {number} */ var length = elements && elements.length;
  /** @type {number} */ var content;
  for (; length;) {
    content = +elements[--length].textContent.trim().split(': ')[1];
    if (!~RESPONSE_STATUSES.indexOf(content)) {
      return true;
    }
  }
  return false;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testwebfiles = testWebFiles;
