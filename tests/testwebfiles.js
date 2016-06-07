/**
 * @fileoverview Defines tests for web files.
 */


/** @const {!RegExp} */ var PATTERN = /^Status: [\d]{1,3}$/;

/**
 * @return {boolean} Returns "true" if test failed.
 */
function testWebFiles() {
  var container = document.getElementById('webfiles-container');
  var elements = container && container.querySelectorAll('h4');
  var length = elements && elements.length;
  var content;
  for(; length;){
    if(!PATTERN.test(elements[--length].textContent.trim())){
      return true;
    }
  }
  return false;
}

// Export for phantomjs.
window.testwebfiles = testWebFiles;
