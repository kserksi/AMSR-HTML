/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
    'use strict';

    // Local Storage Interaction
    const getStoredTheme = () => {
        try {
            return localStorage.getItem('theme');
        } catch (e) {
            console.error('Failed to get theme from local storage.', e);
        }
    };

    const setStoredTheme = theme => {
        try {
            localStorage.setItem('theme', theme);
        } catch (e) {
            console.error('Failed to set theme in local storage.', e);
        }
    };

    // Theme Management
    const applyThemeTransition = () => {
        document.documentElement.classList.add('transition-theme');
        setTimeout(() => document.documentElement.classList.remove('transition-theme'), 1000); // Adjust transition time as needed
    };

    const setTheme = theme => {
        applyThemeTransition();
        document.documentElement.setAttribute('data-bs-theme', theme);
    };

    // Theme Initialization & System Preference Listening
    const initializeTheme = () => {
        const preferredTheme = getPreferredTheme();
        setTheme(preferredTheme);
        showActiveTheme(preferredTheme);
    };

    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme();
        if (storedTheme) return storedTheme;

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // UI Update
    const showActiveTheme = (theme, focus = false) => {
        // ... (The existing showActiveTheme function remains unchanged)
    };

    // Event Listeners
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const storedTheme = getStoredTheme();
        if (storedTheme !== 'light' && storedTheme !== 'dark') {
            setTheme(getPreferredTheme());
        }
    });

    // DOMContentLoaded Event
    window.addEventListener('DOMContentLoaded', () => {
        initializeTheme();

        // Ensure transitions are applied when switching via the UI as well
        document.querySelectorAll('[data-bs-theme-value]')
            .forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const theme = toggle.getAttribute('data-bs-theme-value');
                    setStoredTheme(theme);
                    setTheme(theme);
                    showActiveTheme(theme, true);
                    applyThemeTransition(); // Apply transition when switching via clicks too
                });
            });
    });
})();