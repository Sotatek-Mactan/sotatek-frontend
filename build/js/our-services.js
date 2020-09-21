"use strict";

/* ---- particles.js config ---- */

//get tabs module parent
var tabsModule = document.body.querySelector("#ns-TabsModule");
//get tab nav
var tabNavList = document.body.querySelector(".ns-TabNav");
//get all tab nav links
var tabNavLinks = document.querySelectorAll(".ns-TabNav_Link");
//get tab nav current nav link indicator
var tabNavCurrentLinkindicator = tabNavList.querySelector(".ns-TabNav_Indicator");
//get all tab panels
var tabPanels = document.querySelectorAll(".ns-TabPanel");
//show tab panel A first because panel A nav link has indicator on page load
if (window.location.hash.substring(1).length) {
   document.getElementById(window.location.hash.substring(1)).style.display = "block";
   console.log(window.location.hash.substring(1));
   tabsModule.setAttribute("data-active-tab", window.location.hash.substring(1))
   document.querySelector("[data-tab='" + window.location.hash.substring(1) + "']").className += " active"
} else {
   document.querySelector("[data-tab='" + "software-development" + "']").className += " active"
   document.getElementById("software-development").style.display = "block";
}

/**
* position indicator function
*/
function positionIndicator() {
   //get left position of tab nav ul
   var tabNavListLeftPosition = tabNavList.getBoundingClientRect().left;
   //get tab module parent current data value
   var tabsModuleSectionDataValue = tabsModule.getAttribute("data-active-tab");
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
/**
* tab nav link function
* tab nav link event displays matching tab panel,
* and positions current tab nav link indicator
*/
var tabNavLinkEvent = function () {
   //get this link data value
   var thisLink = this.getAttribute("data-tab");
   for (var i = 0; i < tabNavLinks.length; i++) {
      //for each nav link, add click event that fires tab nav link click event function
     console.log(tabNavLinks[i].classList.remove("active"))
   }
   this.className += " active"

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
   ;
   positionIndicator()
   AOS.refresh()
   console.log(thisLink);
   event.preventDefault()
   if (history.pushState) {
      history.pushState(null, null, '#' + thisLink);
   }
   else {
      window.location.hash = '#' + thisLink
   }


};

function hideAllTabPanels() {
   //loop through all tab panel elements
   for (i = 0; i < tabPanels.length; i++) {
      //remove style attribute from all tab panels to hide them
      tabPanels[i].removeAttribute("style");
   }
};

for (var i = 0; i < tabNavLinks.length; i++) {
   //for each nav link, add click event that fires tab nav link click event function
   tabNavLinks[i].addEventListener("click", tabNavLinkEvent, false);
}
// (function() {
//   //someone smarter than me "debounce" code
//   var resizeTimeout;
//   function resizeThrottler() {
//     if (!resizeTimeout) {
//       resizeTimeout = setTimeout(function() {
//         resizeTimeout = null;
//       //   actualResizeHandler();
//       }, 66);
//     }
//   }
//   //function to fire after resize timeout delay
//   function actualResizeHandler() {
//     //fire the position indicator function
//     positionIndicator();
//   }
//   //window resize event
//   // window.addEventListener("resize", resizeThrottler, false);
// })();

/**
* fire position indicator function right away
*/
positionIndicator();




var site = site || {};
site.window = $(window);
site.document = $(document);
let withHeight = 480
if(screen.width<768) {
   withHeight=300
}
site.Width = withHeight;
site.Height = withHeight;

var Background = function () {

};

Background.headparticle = function () {

   //  if ( !Modernizr.webgl ) {
   //     alert('Your browser dosent support WebGL');
   //  }

   var camera, scene, renderer;
   var mouseX = 0, mouseY = 0;
   var p;

   var windowHalfX = site.Width / 2;
   var windowHalfY = site.Height / 2;

   Background.camera = new THREE.PerspectiveCamera(35, site.Width / site.Height, 1, 2000);
   Background.camera.position.z = 300;

   // scene
   Background.scene = new THREE.Scene();

   // texture
   var manager = new THREE.LoadingManager();
   manager.onProgress = function (item, loaded, total) {
      //console.log('webgl, twice??');
      //console.log( item, loaded, total );
   };


   // particles
   var p_geom = new THREE.Geometry();
   var p_material = new THREE.ParticleBasicMaterial({
      color: 0xFFFFFF,
      size: 1.5
   });

   // model
   var loader = new THREE.OBJLoader();
   loader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/40480/head.obj', function (object) {

      object.traverse(function (child) {

         if (child instanceof THREE.Mesh) {

            // child.material.map = texture;

            var scale = 8;

            $(child.geometry.vertices).each(function () {
               p_geom.vertices.push(new THREE.Vector3(this.x * scale, this.y * scale, this.z * scale));
            })
         }
      });

      Background.scene.add(p)
   });

   p = new THREE.ParticleSystem(
      p_geom,
      p_material
   );

   Background.renderer = new THREE.WebGLRenderer({ alpha: true });
   Background.renderer.setSize(site.Width, site.Height);
   Background.renderer.setClearColor(0x000000, 0);

   $('.particlehead').append(Background.renderer.domElement);
   $('.particlehead').on('mousemove', onDocumentMouseMove);
   site.window.on('resize', onWindowResize);

   function onWindowResize() {
      windowHalfX = site.Width / 2;
      windowHalfY = site.Height / 2;
      //console.log(windowHalfX);

      Background.camera.aspect = site.Width / site.Height;
      Background.camera.updateProjectionMatrix();

      Background.renderer.setSize(site.Width, site.Height);
   }

   function onDocumentMouseMove(event) {
      mouseX = (event.clientX - windowHalfX) / 6;
      mouseY = (event.clientY - windowHalfY) / 6;
   }

   Background.animate = function () {

      Background.ticker = TweenMax.ticker;
      Background.ticker.addEventListener("tick", Background.animate);

      render();
   }

   function render() {
      Background.camera.position.x += ((mouseX * .5) - Background.camera.position.x) * .05;
      Background.camera.position.y += (-(mouseY * .5) - Background.camera.position.y) * .05;

      Background.camera.lookAt(Background.scene.position);

      Background.renderer.render(Background.scene, Background.camera);
   }

   render();

   Background.animate();
};


Background.headparticle();

function readmore(numb) {
   numb = numb - 1
   let moreText = document.getElementsByClassName("more");
   let btnText = document.getElementsByClassName("read-more-btn");

   if (btnText[numb].style.display === "none") {
      moreText[numb].style.display = "none";
   } else {
      btnText[numb].style.display = "none";
      moreText[numb].style.display = "inline";
   }
}
var swiperWebDevelopment = new Swiper('.swiper-web-development', {
   slidesPerView: 1,
   spaceBetween: 10,
   pagination: {
      el: '.pagination-web-development',
      clickable: true,
   },
   breakpoints: {
      480: {
         slidesPerView: 1,
         spaceBetween: 10,
      },
      768: {
         slidesPerView: 1,
         spaceBetween: 20,
      },
   }
});

swiperWebDevelopment.on('slideChange', function () {

   clickProgressEvent(swiperWebDevelopment.activeIndex)
});

let liProgressBar = document.querySelectorAll(".progressbar li");

function clickProgressEvent(index) {
   if ((!index && index != 0) || typeof (index) == "object") {
      index = this.getAttribute("index") - 1
      swiperWebDevelopment.slideTo(index)
   }
   let activePro = document.querySelectorAll(".progressbar .active");
   let complePro = document.querySelectorAll(".progressbar .complete");
   for (var i = 0; i < complePro.length; i++) {
      //for each nav link, add click event that fires tab nav link click event function
      complePro[i].className = "";
   }
   for (var i = 0; i < activePro.length; i++) {
      //for each nav link, add click event that fires tab nav link click event function
      activePro[i].className = "";
   }
   for (var i = 0; i < index - 1; i++) {
      //for each nav link, add click event that fires tab nav link click event function
      liProgressBar[i].className = "complete";
   }

   liProgressBar[index].className = "active"
   if (index > 0)
      liProgressBar[index - 1].className = "complete"
}
for (var i = 0; i < liProgressBar.length; i++) {
   //for each nav link, add click event that fires tab nav link click event function
   liProgressBar[i].addEventListener("click", clickProgressEvent, false);
}