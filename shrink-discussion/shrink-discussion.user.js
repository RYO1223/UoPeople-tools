// ==UserScript==
// @name         Shrink Discussion
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adjust text under class "text_to_html" to three lines and add zoom in/out buttons
// @author       RYO1223
// @match        https://my.uopeople.edu/mod/forum/discuss.php
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  window.addEventListener('load', function () {

    // Function to toggle text size
    function toggleTextSize(element, isZoomIn) {
      let currentSize = parseInt(window.getComputedStyle(element).fontSize);
      element.style.fontSize = isZoomIn ? `${currentSize + 2}px` : `${currentSize - 2}px`;
    }

    // Find elements with class 'text_to_html'
    let textElements = document.querySelectorAll('.text_to_html');

    textElements.forEach(el => {
      // Limit to 3 lines
      el.style.display = '-webkit-box';
      el.style.webkitLineClamp = '3';
      el.style.webkitBoxOrient = 'vertical';
      el.style.overflow = 'hidden';

      // Create zoom in and zoom out buttons
      let zoomInButton = document.createElement('button');
      zoomInButton.innerText = 'Zoom In';
      zoomInButton.onclick = () => toggleTextSize(el, true);

      let zoomOutButton = document.createElement('button');
      zoomOutButton.innerText = 'Zoom Out';
      zoomOutButton.onclick = () => toggleTextSize(el, false);

      // Add buttons after the element
      el.after(zoomOutButton);
      el.after(zoomInButton);
    });
  });
})();
