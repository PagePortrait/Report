

/**
 * @return {boolean} Returns "true" if test failed.
 */
function testRanks() {
  var nodes = ['alexa-global-rank', 'alexa-country-rank',
               'mozdata-domain-authority'];
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
window.testranks = testRanks;

