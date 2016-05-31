

/**
 * @return {boolean} Returns "true" if test failed.
 */
function testGoogle() {
  var nodes = ['google-container',
               'pagespeed-score-table',
               'mobile-score-table',
               'google-data-chart',
               'google-safebrowsing'];
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
window.testgoogle = testGoogle;
