/**
 * @fileoverview Defines tests for microdata widget.
 */

//::TODO finish regexp
/** @const {!RegExp} */ var PATTERN = /^$/;;


/**
 * @return {boolean} Returns "true" if test failed.
 */
function testMicrodata() {
  /** @type {Element} */
  var element = document.getElementById('microdata-container');
  console.log(element.innerHTML);

  /** @type {Node} */
  var subheader = element.querySelector('.widget-subheader');
  console.log(subheader.innerHTML);

  /** @type {Node} */
  var items = document.querySelector('.widget-content > li');

  /** @type {Node} */
  var noData = document.querySelector('.no-data');

  if(!element){
    return true;
  }

  if(!PATTERN.test(subheader)){
    return true;
  }

  if(items){
    //::TODO check if valid widget content else return false
  }else if(!noData){
    return true;
  }


  return false;
}


// Export for phantomjs.
/** @type {!function():boolean} */
window.testmicrodata = testMicrodata;
