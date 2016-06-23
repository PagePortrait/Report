/**
 * @fileoverview Defines tests for options button.
 */


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testOptionsButton() {
  /** @type {Node} */
  var optionsButton = document.querySelector('.report-actions');
  /** @type {Node} */
  var element = document.querySelector('.report-actions > li');
  /** @type {Element} */
  var isClosed = element && element.getElementsByClassName('closed');
  /** @type {Element} */
  var toggle = document.getElementById('toggle-widgets-view');
  /** @type {Array|NodeList} */
  var expandable = document.getElementsByClassName('is-expandable');
  /** @type {Array|NodeList} */ var expanded;

  // Check if options button exists.
  if (!optionsButton) {
    return true;
  }

  // Check if options menu is closed by default.
  if (!isClosed) {
    return true;
  }

  // Check if options button is clickable.
  if (!optionsButton.dispatchEvent(new Event('click'))) {
    return true;
  }

  // Check if "toggle widgets" option exist in menu.
  if (!toggle) {
    return true;
  }

  toggle.dispatchEvent(new Event('click'));
  expanded = document.getElementsByClassName('expanded');

  // Check if after click on toggle all expandable widgets was expanded.
  if (expandable.length != expanded.length) {
    return true;
  }

  toggle.dispatchEvent(new Event('click'));

  // Check if after second click on toggle all expanded widgets was collapsed.
  if (expanded.length) {
    return true;
  }

  return false;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testoptionsbutton = testOptionsButton;
