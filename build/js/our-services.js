"use strict";
//tab menu w/tab panel behaviour
//still learning. be kind. 

//get tabs module parent
var tabsModule = document.body.querySelector(".ns-TabsModule");
//get tab nav
var tabNavList = document.body.querySelector(".ns-TabNav");
//get all tab nav links
var tabNavLinks = document.querySelectorAll(".ns-TabNav_Link");
//get tab nav current nav link indicator
var tabNavCurrentLinkindicator = tabNavList.querySelector(".ns-TabNav_Indicator");
//get all tab panels
var tabPanels = document.querySelectorAll(".ns-TabPanel");
//show tab panel A first because panel A nav link has indicator on page load
document.getElementById("ns-TabPanelA").style.display = "block";

/**
* position indicator function
*/
function positionIndicator() {
  //get left position of tab nav ul
  var tabNavListLeftPosition = tabNavList.getBoundingClientRect().left;
  //get tab module parent current data value
  var tabsModuleSectionDataValue = tabsModule.getAttribute("data-active-tab") || "A";
  //get nav link span with data value that matches current tab module parent data value
  var tabNavCurrentLinkText = tabNavList.querySelector("[data-tab='" + tabsModuleSectionDataValue + "'] span");
  //get dimensions of current nav link span
  var tabNavCurrentLinkTextPosition = tabNavCurrentLinkText.getBoundingClientRect();
  //set indicator left position via CSS transform
  //current nav link span left position - tab nav ul left position
  //prefix me for live
  tabNavCurrentLinkindicator.style.transform =
    "translate3d(" +
    (tabNavCurrentLinkTextPosition.left - tabNavListLeftPosition) +
    "px,0,0) scaleX(" +
    tabNavCurrentLinkTextPosition.width * 0.01 +
    ")";
}

/**
* hide all tab panels function
*/
function hideAllTabPanels() {
  //loop through all tab panel elements
  for (i = 0; i < tabPanels.length; i++) {
    //remove style attribute from all tab panels to hide them
    tabPanels[i].removeAttribute("style");
  }
};

/**
* tab nav link function
* tab nav link event displays matching tab panel,
* and positions current tab nav link indicator
*/
var tabNavLinkEvent = function() {
  //get this link data value
  var thisLink = this.getAttribute("data-tab");
  //get this link href value
  var thisHref = this.getAttribute("href");
  //get tab panel element with ID that matches this link href value
  var thisTabPanel = document.querySelector(thisHref);
  //set tab module parent data to this link data value
  tabsModule.setAttribute("data-active-tab", thisLink);
  //fire hide all tab panels function
  hideAllTabPanels();
  //get tab panel element with ID that matches this link href value and set its style to show it
  thisTabPanel.style.display = "block";
  //fire the position indicator function
  positionIndicator();
  event.preventDefault()
};

for (var i = 0; i < tabNavLinks.length; i++) {
  //for each nav link, add click event that fires tab nav link click event function
  tabNavLinks[i].addEventListener("click", tabNavLinkEvent, false);
}
(function() {
  //someone smarter than me "debounce" code
  var resizeTimeout;
  function resizeThrottler() {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function() {
        resizeTimeout = null;
        actualResizeHandler();
      }, 66);
    }
  }
  //function to fire after resize timeout delay
  function actualResizeHandler() {
    //fire the position indicator function
    positionIndicator();
  }
  //window resize event
  // window.addEventListener("resize", resizeThrottler, false);
})();

/**
* fire position indicator function right away
*/
positionIndicator();