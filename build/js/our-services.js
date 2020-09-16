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
} else {
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
var tabNavLinkEvent = function () {
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
   ;
   positionIndicator()
   AOS.refresh()
   console.log(thisLink);
   event.preventDefault()
   if(history.pushState) {
      history.pushState(null, null,  '#' + thisLink);
  }
  else {
   window.location.hash = '#' + thisLink
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
site.Width = 480;
site.Height = 480;

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