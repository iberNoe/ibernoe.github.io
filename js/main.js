import { initNavigation } from './modules/navigation.js';
import { initAnimations } from './modules/animations.js';
import { initUtilities } from './modules/utilities.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initAnimations();
    initUtilities();
});
