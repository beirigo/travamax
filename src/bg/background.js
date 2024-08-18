// Example of using a message handler from the inject scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Replace pageAction.show with action API
  // Example: chrome.action.setBadgeText({ text: '!' }); or similar
  // chrome.action.setIcon({ path: "path/to/icon.png" });

  return sendResponse();
});

// Handling new tab creation
chrome.tabs.onCreated.addListener(async (tab) => {
  if (tab && tab.openerTabId) {
    try {
      const openerTab = await chrome.tabs.get(tab.openerTabId);
      if (openerTab.url.includes("futemax") && tab.pendingUrl !== "chrome://newtab/") {
        await chrome.tabs.remove(tab.id);
      }
    } catch (error) {
      console.error("Error handling tab:", error);
    }
  }
});
