// ==UserScript==
// @name         Shrink Discussion
// @namespace    https://github.com/RYO1223/UoPeople-tools
// @version      1.1
// @description  Shrink discussion posts to 3 lines and add a button to expand/shrink them if needed.
// @author       RYO1223
// @updateURL    https://github.com/RYO1223/UoPeople-tools/raw/main/shrink-discussion/shrink-discussion.user.js
// @downloadURL  https://github.com/RYO1223/UoPeople-tools/raw/main/shrink-discussion/shrink-discussion.user.js
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

    function toggleButton(element, text, to) {
      if (to === 'shrink') {
        element.innerText = 'Shrink';
        element.onclick = () => {
          toggleArticleVisibility(text, 'shrink');
          toggleButton(element, text, 'expand');
        };
        return;
      } else if (to === 'expand') {
        element.innerText = 'Expand';
        element.onclick = () => {
          toggleArticleVisibility(text, 'expand');
          toggleButton(element, text, 'shrink');
        };
        return;
      }
    }

    let textElements = document.querySelectorAll('.post-content-container');

    textElements.forEach(el => {
      toggleArticleVisibility(el, 'shrink');

      let button = document.createElement('button');
      toggleButton(button, el, 'expand');

      el.after(button);
    });
  });
})();
