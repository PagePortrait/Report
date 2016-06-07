

/**
 * @return {boolean} Returns "true" if test failed.
 */
function testAudience() {
  var nodes = ['audience-engagement-visitors-value',
               'audience-engagement-pageviews-value',
               'audience-engagement-time-on-site-value',
               'audience-engagement-search-visits-value',
               'audience-engagement-bounce-rate-value'];
  var length = nodes.length;
  var i = 0;

  for (; i < length;) {
    var element = document.getElementById(nodes[i++]);

    if (!element || !element.textContent.trim()) {
      return true;
    }
  }
  return false;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testaudience = testAudience;
