

/**
 * @return {boolean} Returns "true" if test failed.
 */
function testContent() {
  var nodes = ['headings-data-table',
               'links-count-data-table',
               'trackers-data-table',
               'emails-data-table',
               '1-keywords-data-table',
               '2-keywords-data-table',
               '3-keywords-data-table',
               'gender-data-table',
               'browsing-location-data-table',
               'geo-data-table',
               'metatags-data-table',
               'http-headers-data-table'];
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
window.testcontent = testContent;
