

/**
 * @return {boolean} Returns "true" if test failed.
 */
function testWhoIs() {
  var nodes = ['whois-container',
               'whois-age',
               'whois-expiring',
               'whois-updated',
               'whois-registrar',
               'whois-ip'];
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
window.testwhois = testWhoIs;
