/**
 * @fileoverview Defines tests for microdata widget.
 * success criterias:
 * - 'microdata-container' shoud exist and contains ul>li;
 * - 'widget-subheader' class shuold have 'Found Number errors and
 *   Number warnings out of Number items.' expression;
 * - if widget is empty 'no-data' class should exist.
 */


/** @const {!RegExp} */ var PATTERN = new RegExp('\\w*\\s[0-9]*\\s\\w*\\s\\w*' +
    '\\s[0-9]*\\s\\w*\\s\\w*\\s\\w*\\s[0-9]*\\s\\w*\\.', 'gmi');


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testMicrodata() {
  /** @type {Element} */
  var widget = document.getElementById('microdata-container');
  /** @type {Node} */
  var subheader = widget.querySelector('.widget-subheader').textContent;
  /** @type {Node} */
  var content = widget.querySelector('.widget-content > ul');
  /** @type {Node} */
  var list = content.getElementsByTagName('ul');
  /** @type {Node} */
  var listItems = content.querySelector('ul > li');
  /** @type {Node} */
  var noData = widget.querySelector('.no-data');
  subheader = subheader.replace(/\s+/g, ' ');

  if (!content) {
    return true;
  }

  if (!PATTERN.test(subheader)) {
    return true;
  }

  if (content) {
    if (listItems) {
      return false;
    } else if (!noData) {
      return true;
    }
  }

  return false;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testmicrodata = testMicrodata;
