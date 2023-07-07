chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "AC",
  });
});

chrome.action.onClicked.addListener(async (tab) => {
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nextState = prevState === "KAPA" ? "AC" : "KAPA";

  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });

  if (nextState === "KAPA") {
    await chrome.scripting.insertCSS({
      files: ["zoomin.css"],
      target: { tabId: tab.id },
    });
  } else if (nextState === "AC") {
    await chrome.scripting.removeCSS({
      files: ["zoomin.css"],
      target: { tabId: tab.id },
    });
  }
});
