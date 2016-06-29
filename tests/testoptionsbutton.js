/**
 * @fileoverview Defines tests for options button.
 * Successful criteria: 
 * - Options button should exist;
 * - Options button menu should be closed by default;
 * - Options button should be clickable;
 * - Element with id "toggle widgets" should exists in options button menu; 
 * - On click on toggle button all expandable widgets should be expanded;
 * - On second click on toggle button all expandable widgets should be 
 * - collapsed;
 */


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testOptionsButton() {
  /** @type {boolean} */ var result = true;
  /** @type {Node} */
  var optionsButton = document.querySelector('.report-actions');
  /** @type {Node} */
  var element = document.querySelector('.report-actions > li');
  /** @type {Element} */
  var buttonClosed = element && element.getElementsByClassName('closed');
  /** @type {Element} */
  var toggleButton = document.getElementById('toggle-widgets-view');
  /** @type {Array|NodeList} */
  var expandable = document.getElementsByClassName('is-expandable');
  /** @type {Array|NodeList} */ var expanded;

  // Check if options button exists.
  if (optionsButton) {
    if (buttonClosed) {
      if (optionsButton.dispatchEvent(new Event('click'))) {
        if (toggleButton) {
          toggleButton.dispatchEvent(new Event('click'));
          /** @type {Array|NodeList} */ 
          var expanded = document.getElementsByClassName('expanded');
          if (expandable.length = expanded.length) {
            toggleButton.dispatchEvent(new Event('click'));
            if (!expanded.length) {
              return false;
            }
          }
        }
      }
    }
  }
  
  return result;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testoptionsbutton = testOptionsButton;
