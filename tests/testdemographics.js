/**
 * @fileoverview Defines tests for audience demographics.
 */


/** @const {!RegExp} */ var PATTERN = /^\d([,\.]*\d)*%$/;

/** @const {!Object.<string, function(NodeList):boolean>} */ var VALIDATORS = {
  'gender-data-table': function(elements) {
    return testStaticDataTable(elements, ['male', 'female']);
  },
  'browsing-location-data-table': function(elements) {
    return testStaticDataTable(elements, ['home', 'school', 'work']);
  },
  'geo-data-table': function(elements) {
    /** @type {number} */ var length = elements.length;
    /** @type {number} */ var index = 0;
    /** @type {string} */ var content;
    /** @type {NodeList} */ var cells;
    /** @type {Node} */ var parentNode =
        document.getElementById('geo-data-table') &&
        document.getElementById('geo-data-table').parentNode;

    if (parentNode.className.indexOf('true') >= 0 && elements.length){
      return true;
    }

    for (; index < length; index++) {
      cells = elements[index].querySelectorAll('th,td');
      content = cells[1].textContent.trim();
      if (!(cells[0].textContent.trim().length &&
          (PATTERN.test(content) || 'N/A' == content))) {
        return false
      }
    }
    return true;
  }
};

/**
 * @return {boolean} Returns "true" if table is not valid.
 */
function testStaticDataTable(elements, headers) {
  /** @type {number} */ var length = elements.length;
  /** @type {number} */ var index = 0;
  /** @type {string} */ var content;
  /** @type {NodeList} */ var cells;

  if (length != headers.length) return true;

  for (; index < length; index++) {
    cells = elements[index].querySelectorAll('th,td');
    content = cells[1].textContent.trim();
    if (!(cells[0].textContent.trim() == headers[index] &&
        (PATTERN.test(content) || 'N/A' == content))) {
      return false;
    }
  }
  return true;
}

/**
 * @return {boolean} Returns "true" if test failed.
 */
function testDemographics() {
  for (/** @type {string} */ var metric in VALIDATORS) {
    /** @type {Element} */ var element = document.getElementById(metric);
    /* @type {function(NodeList):boolean} */ var validator = VALIDATORS[metric];
    /** @type {NodeList} */ var content = element.getElementsByTagName('tr');
    if (content && !validator(content)) {
      return true;
    }
  }
  return false;
}

// Export for phantomjs.
window.testdemographics = testDemographics;