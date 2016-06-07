/**
 * @fileoverview Defines tests for domain name info.
 */


/** @const {!Object.<string, function(string):boolean>} */ var VALIDATORS = {
  'whois-created': function(content) {
    var age = document.getElementById('whois-age');
    return 'N/A' == content &&
      !(age && age.textContent) ||
      (+new Date(content));
  },
  'whois-expired': function(content) {
    var expiring = document.getElementById('whois-expiring');
    return 'N/A' == content &&
      !(expiring && expiring.textContent) ||
      (+new Date(content));
  },
  'whois-updated': function(content) {
    return 'N/A' == content || +new Date(content);
  },
  'whois-registrar': function(content) {
    return !!content;
  },
  'whois-ip': function(content) {
    return /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(content);
  },
};


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testDomainNameInfo() {
  for (/** @type {string} */ var metric in VALIDATORS) {
    /** @type {Element} */ var element = document.getElementById(metric);
    /** @type {string} */ var content = element && element.textContent.trim();
    /** @type {function(string):boolean} */ var validator = VALIDATORS[metric];

    if (content && !validator(content)) {
      return true;
    }
  }
  return false;
}

// Export for phantomjs.
window.testdomainnameinfo = testDomainNameInfo;
