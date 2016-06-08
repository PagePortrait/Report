/**
 * @fileoverview Defines tests for testMediaQueries.
 */



/**
 * @return {boolean} return true if test failed
 */
function testMediaQueries() {
    /** @type {string} */ var node = 'media-widget';
    /** @type {Element} */ var element = document.getElementById(node);
    /** @type {Element} */
    var failClass = document.getElementsByClassName("rule media-none");
    /** @const {!RegExp} */ var MEDIA_PATTERN = /@media([^{]*)/;
    /** @type {Node} */ 
    var table = document.getElementById('media-data-table');
    /** @type {Element} */ var tableRows;
    /** @type {number} */ var length;
    /** @type {number} */ var i = 0;

    if (!node) {
        return true;
    }
    if (table) {
        tableRows = element.getElementsByTagName("tr");
        length = tableRows.length;

        for (; i < length; i++) {
            if (!MEDIA_PATTERN.test(tableRows[i].textContent.trim())) {
                return true;
            }
        }
    } else if (!failClass) {
        return true;
    }
    return false;

}

// Export for phantomjs.
window.testmediaqueries = testMediaQueries;