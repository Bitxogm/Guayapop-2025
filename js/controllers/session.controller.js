//* ============================================
//* session.controller.js - SIMPLIFIED
//* ============================================

/**
 * CONTROLLER: Session
 * Manages navbar buttons based on authentication state
 * Reads localStorage directly (no session.js utility needed)
 */

import { constants } from "../../utils/constants.js";
import { buildAuthenticatedUserSession, buildUnauthenticatedUserSession } from "../views/session.view.js";

/**
 * Initialize session controller
 * Builds appropriate navbar buttons and handles logout
 * @param {HTMLElement} sessionContainer - Container for session buttons
 */
export const sessionController = (sessionContainer) => {
  console.log('🎮 SESSION CONTROLLER: Initializing...');
  
  // ✅ Read token directly from localStorage
  const token = localStorage.getItem(constants.tokenKey);
  
  if (token) {
    // ✅ User authenticated - show Create Ad + Logout
    console.log('🔐 User authenticated: true');
    sessionContainer.innerHTML = buildAuthenticatedUserSession();
    
    // Add logout event listener
    const closeSessionButton = sessionContainer.querySelector("#closeSession");
    if (closeSessionButton) {
      closeSessionButton.addEventListener("click", () => {
        console.log('🚪 Logout button clicked');
        console.log('🗑️ Removing token from localStorage');
        
        // ✅ Remove token directly
        localStorage.removeItem(constants.tokenKey);
        
        // ✅ Recursively call sessionController to rebuild UI
        console.log('🔄 Rebuilding session UI...');
        sessionController(sessionContainer);
      });
    }
  } else {
    // ❌ User NOT authenticated - show Login + Sign Up
    console.log('🔐 User authenticated: false');
    sessionContainer.innerHTML = buildUnauthenticatedUserSession();
  }
  
  console.log('✅ SESSION CONTROLLER: Initialized');
};