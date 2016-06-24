/**
 * @fileoverview Defines tests for microdata widget.
 * success criterias:
   - 'microdata-container' shoud exist and contains ul>li;
   - 'widget-subheader' class shuold have 'Found Number errors and
     Number warnings out of Number items.' expression;
   - if widget is empty 'no-data' class should exist;
 */


/** @const {!RegExp} */ var PATTERN = new RegExp('Found\\s[0-9]*\\serrors' +
    '\\sand\\s[0-9]*\\swarnings\\sout\\sof\\s[0-9]*\\sitems\\.', 'gmi');


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
  subheader = subheader.replace(/\s\s+/g, ' ');

  if (!content) {
    console.log('1');
    return true;
  }

  if (!PATTERN.test(subheader)) {
    console.log(2);
    return true;
  }

  if (content) {
    if (listItems) {
      console.log(3);
      return false;
    } else if (!noData) {
      console.log(4);
      return true;
    }
  }

  return false;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testmicrodata = testMicrodata;
