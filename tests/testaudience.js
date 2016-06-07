/**
 * @fileoverview Defines tests for audience engagement.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/** @const {!RegExp} */ var PATTERN = /^\d([,\.:]*\d)*[%km]?$/;

/**
 * @return {boolean} Returns "true" if test failed.
 */
function testAudience() {
  /** @type {Array.<string>} */ var nodes = [
   'audience-engagement-visitors-value',
   'audience-engagement-pageviews-value',
   'audience-engagement-pageviews-delta',
   'audience-engagement-time-on-site-value',
   'audience-engagement-time-on-site-delta',
   'audience-engagement-search-visits-value',
   'audience-engagement-search-visits-delta',
   'audience-engagement-bounce-rate-value',
   'audience-engagement-bounce-rate-delta'
  ];
  /** @type {number} */ var length = nodes.length;
  /** @type {Element} */ var element;
  /** @type {string} */ var content;
  for (; length;) {
    element = document.getElementById(nodes[--length]);
    content = element && element.textContent.trim();

    if (!element || !(PATTERN.test(content) || 'N/A' == content)) {
      return true;
    }
  }
  return false;
}

// Export for phantomjs.
window.testaudience = testAudience;
