

/**
 * @return {boolean} Returns "true" if test failed.
 */
function testHttpData() {
  var nodes = ['httpdata-content-encoding-container',
               'httpdata-content-length-formatted-container',
               'httpdata-server-container'];
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
window.testhttpdata = testHttpData;
