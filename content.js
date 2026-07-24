(function () {
  "use strict";

  const MAX_ATTEMPTS = 50; // stop after ~10 seconds
  const POLL_INTERVAL = 200; // ms between checks

  /**
   * Uncheck the "remember card" checkbox if it is checked.
   * Viva uses a Vuetify checkbox; simply setting `.checked = false`
   * isn't enough — we also need to dispatch the proper events so
   * Vue picks up the change.  Clicking the element is the most
   * reliable approach because it triggers all internal listeners.
   *
   * Returns true if the checkbox was found (regardless of state).
   */
  function uncheckRememberCard() {
    // Primary selector: the checkbox has id="remember-card"
    let checkbox = document.querySelector("#remember-card");

    // Fallback: search by aria-label (Greek text used by Viva)
    if (!checkbox) {
      checkbox = document.querySelector(
        'input[type="checkbox"][aria-label*="απομνημόνευσης"]'
      );
    }

    // Another fallback: any checkbox inside a .checkbox-container
    if (!checkbox) {
      checkbox = document.querySelector(
        ".checkbox-container input[type='checkbox']"
      );
    }

    if (!checkbox) return false; // not found yet

    if (checkbox.checked || checkbox.getAttribute("aria-checked") === "true") {
      // Click the <label> or the visual wrapper so Vuetify reacts
      const label = checkbox.closest("label.check-label");
      if (label) {
        label.click();
      } else {
        // Direct click + event dispatch as a last resort
        checkbox.click();
      }

      console.log(
        "[Viva Card Privacy Guard] ✔ 'Remember card' checkbox has been unchecked."
      );
    } else {
      console.log(
        "[Viva Card Privacy Guard] Checkbox already unchecked — nothing to do."
      );
    }

    return true;
  }

  // --- Strategy 1: Poll until the checkbox appears -------------------------
  let attempts = 0;
  const poller = setInterval(() => {
    attempts++;
    if (uncheckRememberCard() || attempts >= MAX_ATTEMPTS) {
      clearInterval(poller);
    }
  }, POLL_INTERVAL);

  // --- Strategy 2: MutationObserver (catches late-loading content) ---------
  const observer = new MutationObserver((_mutations, obs) => {
    if (uncheckRememberCard()) {
      obs.disconnect();
      clearInterval(poller); // no need to poll any more
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  // Safety: disconnect observer after 15 s no matter what
  setTimeout(() => {
    observer.disconnect();
    clearInterval(poller);
  }, 15000);
})();
