// ==UserScript==
// @name         Shrink Discussion
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adjust text under class "text_to_html" to three lines and add zoom in/out buttons
// @author       RYO1223
// @match        https://my.uopeople.edu/mod/forum/discuss.php*
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  window.addEventListener('load', () => {

    function toggleArticleVisibility(element, action) {
      if (action === 'shrink') {
        element.style.display = '-webkit-box';
        element.style.webkitLineClamp = '3';
        element.style.webkitBoxOrient = 'vertical';
        element.style.overflow = 'hidden';
        return;
      } else if (action === 'expand') {
        element.style.display = 'block';
        element.style.webkitLineClamp = 'unset';
        element.style.webkitBoxOrient = 'unset';
        element.style.overflow = 'unset';
        return;
      }
    }

    function toggleButton(element, to) {
      if (to === 'shrink') {
        element.innerText = 'Shrink';
        element.onclick = () => {
          toggleArticleVisibility(el, 'shrink');
          toggleButton(element, 'expand');
        };
        return;
      } else if (to === 'expand') {
        element.innerText = 'Expand';
        element.onclick = () => {
          toggleArticleVisibility(el, 'expand');
          toggleButton(element, 'shrink');
        };
        return;
      }
    }

    let textElements = document.querySelectorAll('.text_to_html');

    textElements.forEach(el => {
      toggleArticleVisibility(el, 'shrink');

      let button = document.createElement('button');
      toggleButton(button, 'expand');

      el.after(button);
    });
  });
})();
