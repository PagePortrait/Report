/**
 * @fileoverview Defines tests for domain name info.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/** @const {!Object.<string, function(string):boolean>} */ var VALIDATORS = {
  /** @return {boolean} */ 'whois-created': function(content) {
    return testDomainDate(content, 'whois-age');
  },
  /** @return {boolean} */ 'whois-expired': function(content) {
    return testDomainDate(content, 'whois-expiring');
  },
  /** @return {boolean} */ 'whois-updated': function(content) {
    return 'N/A' == content || +new Date(content);
  },
  /** @return {boolean} */ 'whois-registrar': function(content) {
    return !!content;
  },
  /** @return {boolean} */ 'whois-ip': function(content) {
    return /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(content);
  }
};


/**
 * @param {string} content The element text content.
 * @param {string} relatedId The related element ID.
 * @return {boolean} Return "true" if test failed?
 */
function testDomainDate(content, relatedId) {
  var node = document.getElementById(relatedId);
  return ('N/A' == content && !(node && node.textContent)) ||
         +new Date(content);
}


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
/** @type {!function():boolean} */
window.testdomainnameinfo = testDomainNameInfo;
