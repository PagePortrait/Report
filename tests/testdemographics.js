/**
 * @fileoverview Defines tests for audience demographics.
 */


/** @const {!RegExp} */ var PATTERN = /^\d([,\.]*\d)*%$/;

/** @const {!Object.<string, function(NodeList):boolean>} */ var VALIDATORS = {
  /** @return {boolean} */ 'gender-data-table': function(elements) {
    return testStaticDataTable_(elements, ['male', 'female']);
  },
  /** @return {boolean} */ 'browsing-location-data-table': function(elements) {
    return testStaticDataTable_(elements, ['home', 'school', 'work']);
  },
  /** @return {boolean} */ 'geo-data-table': function(elements) {
    return testGeoDataTable_(elements);
  }
};


/**
 * @param {NodeList} elements The table rows elements.
 * @return {boolean} Returns "true" if data is not valid.
 */
function testGeoDataTable_(elements) {
  /** @type {number} */ var length = elements.length;
  /** @type {number} */ var index = 0;
  /** @type {Node} */ var table = document.getElementById('geo-data-table');
  /** @type {Node} */ var parentNode = table && table.parentNode;
  /** @type {string} */ var content;
  /** @type {NodeList} */ var cells;

  if (parentNode && ~parentNode.className.indexOf('true') &&
      elements.length) {
    return true;
  }

  for (; index < length; index++) {
    cells = elements[index].querySelectorAll('th,td');
    content = cells[1].textContent.trim();
    if (!(cells[0].textContent.trim() &&
        (PATTERN.test(content) || 'N/A' == content))) {
      return false;
    }
  }
  return true;
}


/**
 * @param {NodeList} elements The table rows elements.
 * @param {!Array.<string>} metrics The metrics keys.
 * @return {boolean} Returns "true" if data is not valid.
 */
function testStaticDataTable_(elements, metrics) {
  /** @type {number} */ var length = elements.length;
  /** @type {number} */ var index = 0;
  /** @type {string} */ var content;
  /** @type {NodeList} */ var cells;

  if (length != metrics.length) return true;

  for (; index < length; index++) {
    cells = elements[index].querySelectorAll('th,td');
    content = cells[1].textContent.trim();
    if (!(cells[0].textContent.trim() == metrics[index] &&
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
    /** @type {NodeList} */ var elements =
        element && element.getElementsByTagName('tr');
    if (!validator(elements)) {
      return true;
    }
  }
  return false;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testdemographics = testDemographics;
