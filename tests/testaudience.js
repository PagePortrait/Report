/**
 * @fileoverview Defines test for Audience engagement.
 * Success criteria:
 * - Elements with ID 'audience-engagement-visitors-value',
 *   'audience-engagement-pageviews-value',
 *   'audience-engagement-pageviews-delta',
 *   'audience-engagement-time-on-site-value',
 *   'audience-engagement-time-on-site-delta',
 *   'audience-engagement-search-visits-value',
 *   'audience-engagement-search-visits-delta',
 *   'audience-engagement-bounce-rate-value',
 *   'audience-engagement-bounce-rate-delta' should exist;
 * - Elements with ID 'audience-engagement-visitors-value',
 *   'audience-engagement-pageviews-value',
 *   'audience-engagement-pageviews-delta',
 *   'audience-engagement-time-on-site-value',
 *   'audience-engagement-time-on-site-delta',
 *   'audience-engagement-search-visits-value',
 *   'audience-engagement-search-visits-delta',
 *   'audience-engagement-bounce-rate-value',
 *   'audience-engagement-bounce-rate-delta' should contain content and
 *   the format should adhere to the following examples: 10.1% or 10% or
 *   10:1 or 10”;
 * - Content of elements with ID 'audience-engagement-visitors-value',
 *   'audience-engagement-pageviews-value',
 *   'audience-engagement-pageviews-delta',
 *   'audience-engagement-time-on-site-value',
 *   'audience-engagement-time-on-site-delta',
 *   'audience-engagement-search-visits-value',
 *   'audience-engagement-search-visits-delta',
 *   'audience-engagement-bounce-rate-value',
 *   'audience-engagement-bounce-rate-delta' can't equal 'N/A'.
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/** @const {!RegExp} */ var PATTERN = /^\d([,\.:]*\d)*[%kmgt]?$/;


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testAudience() {
  // Elements with ID 'audience-engagement-visitors-value',
  //   'audience-engagement-pageviews-value',
  //   'audience-engagement-pageviews-delta',
  //   'audience-engagement-time-on-site-value',
  //   'audience-engagement-time-on-site-delta',
  //   'audience-engagement-search-visits-value',
  //   'audience-engagement-search-visits-delta',
  //   'audience-engagement-bounce-rate-value',
  //   'audience-engagement-bounce-rate-delta' should exist.
  /** @type {!Array.<string>} */ var nodes = [
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
  /** @type {boolean} */ var result = false;
  /** @type {Element} */ var element;
  /** @type {string} */ var content;

  for (; length;) {
    element = document.getElementById(nodes[--length]);
    content = element && element.textContent.trim();

    // Elements with ID 'audience-engagement-visitors-value',
    //   'audience-engagement-pageviews-value',
    //   'audience-engagement-pageviews-delta',
    //   'audience-engagement-time-on-site-value',
    //   'audience-engagement-time-on-site-delta',
    //   'audience-engagement-search-visits-value',
    //   'audience-engagement-search-visits-delta',
    //   'audience-engagement-bounce-rate-value',
    //   'audience-engagement-bounce-rate-delta' should contain content and
    //   the format should adhere to the following examples: 10.1% or 10% or
    //   10:1 or 10”;
    //   Content can't can't equal 'N/A'.
    if (!content || !(PATTERN.test(content) || 'N/A' == content)) {
      result = true;
      break;
    }
  }
  return result;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testaudience = testAudience;
