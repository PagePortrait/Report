

/**
 * @return {boolean} Returns "true" if test failed.
 */
function testContent() {
  var nodes = ['content-bottlenecks-container',
               'content-links-container',
               'content-images-container',
               'content-links-count-container',
               'content-headings-container',
               'content-keywords-container',
               'content-serp-container',
               'content-social-preview-facebook-container',
               'content-social-preview-linkedin-container',
               'content-social-preview-google-container',
               'content-social-preview-twitter-container',
               'content-trackers-container',
               'content-emails-container',
               'content-technology-container'];
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
