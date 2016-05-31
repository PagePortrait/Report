

/**
 * @return {boolean} Returns "true" if test failed.
 */
function testWebFiles() {
  var nodes = ['webfiles-container', 'mozdata-links'];
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
window.testwebfiles = testWebFiles;