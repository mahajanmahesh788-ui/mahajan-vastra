/**
 * Festival Popup - Firebase Firestore Real-time Control
 * 
 * Fetches popup data from Firestore (popup/festival document).
 * Shows popup when showPopup = true. Works on static hosting (GitHub Pages).
 */

(function() {
    'use strict';

    // ===== FIREBASE CONFIG =====
    const firebaseConfig = {
        apiKey: "AIzaSyB4UaYcK1CEtoy65pxsxh4A0zMgDqgP5Zk",
        authDomain: "mahajan-god-idols.firebaseapp.com",
        projectId: "mahajan-god-idols",
        storageBucket: "mahajan-god-idols.firebasestorage.app",
        messagingSenderId: "299124937475",
        appId: "1:299124937475:web:00b57254f2b474843b0f36",
        measurementId: "G-G54RLYT6RN"
    };

    
    // Initialize Firebase
    let db = null;
    if (firebaseConfig.apiKey) {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
    }

    const DEFAULT_POPUP_IMAGE = 'images/popup-default.jpg';
    const popupEl = document.getElementById('festivalPopup');
    const closeBtn = document.getElementById('festivalPopupClose');
    const overlayEl = popupEl ? popupEl.querySelector('.festival-popup-overlay') : null;
    const imageEl = document.getElementById('festivalPopupImage');
    const boardTextEl = document.getElementById('festivalPopupBoardText');
    const titleEl = document.getElementById('festivalPopupTitle');
    const descEl = document.getElementById('festivalPopupDescription');
    let popupImageLoadId = 0;
    let lastBoardText = '';

    function getBoardText(data) {
        return String((data && (data.boardText || data.text)) || '').trim();
    }

    function showDefaultPopupImage(boardText) {
        if (!imageEl) return;
        imageEl.src = DEFAULT_POPUP_IMAGE;
        imageEl.alt = boardText || 'Festival greeting';
        imageEl.style.display = '';
        if (popupEl) {
            popupEl.classList.add('festival-popup-default-image');
            popupEl.classList.remove('festival-popup-no-image');
        }
        if (!boardTextEl) return;
        if (boardText) {
            boardTextEl.textContent = boardText;
            boardTextEl.classList.toggle('is-long', boardText.length > 22);
            boardTextEl.hidden = false;
        } else {
            boardTextEl.textContent = '';
            boardTextEl.classList.remove('is-long');
            boardTextEl.hidden = true;
        }
    }

    function showFirebasePopupImage(url, altText) {
        if (!imageEl) return;
        imageEl.src = url;
        imageEl.alt = altText || 'Festival greeting';
        imageEl.style.display = '';
        if (popupEl) {
            popupEl.classList.remove('festival-popup-default-image');
            popupEl.classList.remove('festival-popup-no-image');
        }
        if (boardTextEl) {
            boardTextEl.textContent = '';
            boardTextEl.classList.remove('is-long');
            boardTextEl.hidden = true;
        }
    }

    function applyPopupImage(data) {
        const url = String((data && data.image) || '').trim();
        const boardText = getBoardText(data);
        lastBoardText = boardText;
        const loadId = ++popupImageLoadId;

        if (!url) {
            showDefaultPopupImage(boardText);
            return;
        }

        const tester = new Image();
        tester.onload = function() {
            if (loadId !== popupImageLoadId) return;
            showFirebasePopupImage(url, data.title || '');
        };
        tester.onerror = function() {
            if (loadId !== popupImageLoadId) return;
            showDefaultPopupImage(boardText);
        };
        tester.src = url;
    }

    function showPopup(data) {
        if (!popupEl || !data) return;
        applyPopupImage(data);
        if (titleEl) titleEl.textContent = data.title || '';
        if (descEl) descEl.textContent = data.description || '';
        popupEl.classList.add('is-visible');
        popupEl.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function hidePopup() {
        if (!popupEl) return;
        popupEl.classList.remove('is-visible');
        popupEl.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function initListeners() {
        if (imageEl) {
            imageEl.addEventListener('error', function() {
                if (imageEl.getAttribute('src') === DEFAULT_POPUP_IMAGE) return;
                showDefaultPopupImage(lastBoardText);
            });
        }
        if (closeBtn) closeBtn.addEventListener('click', hidePopup);
        if (overlayEl) overlayEl.addEventListener('click', hidePopup);
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && popupEl && popupEl.classList.contains('is-visible')) {
                hidePopup();
            }
        });
    }

    function startFirestoreListener() {
        if (!db) return;

        db.collection('popup').doc('festival').onSnapshot(
            function(snapshot) {
                const data = snapshot.data();
                if (!data) return;
                if (data.showPopup === true) {
                    showPopup({
                        title: data.title || '',
                        description: data.description || '',
                        image: data.image || '',
                        boardText: data.boardText || data.text || ''
                    });
                } else {
                    hidePopup();
                }
            },
            function(error) {
                console.warn('Firebase Firestore festival popup error:', error);
            }
        );
    }

    function init() {
        initListeners();
        if (db) {
            startFirestoreListener();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
