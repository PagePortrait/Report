/**
 * @fileoverview Defines tests for Options button.
 * Success criteria:
 * - Element with CSS class 'report-actions' should exist;
 * - Element with CSS class 'report-actions' should contain element with
 *   tag name 'li';
 * - Element with tag name 'li' should have CSS class 'closed' by default;
 * - Element with CSS class 'report-actions' should contain element with
 *   ID 'toggle-widgets-view';
 * - Element with CSS class 'report-actions' should be clickable;
 * - Upon click on element with CSS class 'report-actions' to all elements 
 *   with CSS class 'is-expandable' should be added CSS class 'expanded';
 * - On second click on element with CSS class 'report-actions' in all elements
 *   with CSS class 'is-expandable' should be removed CSS class 'expanded'.
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/** @const {string} */ var BUTTON_CLASS_NAME = '.report-actions';
/** @const {string} */ var BUTTON_CLOSED_CLASS_NAME = '.closed';
/** @const {string} */ var TOGGLE_BUTTON_ID = 'toggle-widgets-view';
/** @const {string} */ var EXPANDABLE_CLASS_NAME = 'is-expandable';
/** @const {string} */ var EXPANDED_CLASS_NAME = 'expanded';


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testOptionsButton() {
  /** @type {boolean} */ var result = true;

  // Element with CSS class 'report-actions' should exist.
  /** @type {Element} */
  var optionsButton = document.querySelector(BUTTON_CLASS_NAME);

  // Element with CSS class 'report-actions' should contain element with
  // tag name'li'.
  /** @type {?Element} */
  var element = optionsButton.getElementsByTagName('li')[0];

  // Element with tag name 'li' should have CSS class 'closed' by default.
  /** @type {Node} */
  var buttonClosed = element &&
      element.getElementsByClassName(BUTTON_CLOSED_CLASS_NAME);

  // Element with CSS class 'report-actions' should contain element with
  // ID 'toggle-widgets-view'.
  /** @type {Element} */
  var toggleButton = document.getElementById(TOGGLE_BUTTON_ID);
  /** @type {NodeList} */
  var expandable = document.querySelectorAll(EXPANDABLE_CLASS_NAME);
  /** @type {NodeList} */ var expanded;

  if (optionsButton && buttonClosed && toggleButton) {
    // Element with CSS class 'report-actions' should be clickable.
    if (optionsButton.dispatchEvent(new Event('click'))) {
      toggleButton.dispatchEvent(new Event('click'));
      expanded = document.querySelectorAll(EXPANDED_CLASS_NAME);
      // Upon click on element with CSS class 'report-actions' to all elements
      // with CSS class 'is-expandable' should be added CSS class 'expanded'.
      if (expanded) {
        toggleButton.dispatchEvent(new Event('click'));
        // On second click on element with CSS class 'report-actions' in all
        // elements with CSS class 'is-expandable' should be removed CSS class
        // 'expanded'.
        result = !!expanded.length;
      }
    }
  }
  return result;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testoptionsbutton = testOptionsButton;
