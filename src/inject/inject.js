chrome.runtime.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      if (window.location.href != "https://futemax.la/") {
        removeRelated();
        removeComments()
        removeTitles();
      }
      awesomeHeader();
      removeIframes();
      setupMutationObserver(document);

    }
  }, 10);
});

function removeRelated() {
  const related = document.getElementsByClassName("item-wd");

  if (related && related.length > 0) {
    related[0].parentElement.remove();
  }
}

function removeComments() {
  const comments = document.getElementsByClassName("fb-comments");

  if (comments && comments.length > 0) {
    comments[0].parentElement.remove();
  }
}

function removeTitles() {
  const titles = document.getElementsByClassName("title-widget");

  if (titles && titles.length > 0) {
    Array.from(titles).forEach(t => t.remove());
  }
}

function awesomeHeader() {
  console.log("AWESOME HEADER");
  const header = document.querySelector("header #logo");
  console.log(header);
  header.innerHTML = "<a class='travahomelink' href='/'><h1 class='travatitle'>TRAVAMAX</h1></a>";
  header.className = "";
}

function removeIframes() {
  const iframes = document.querySelectorAll("body ~ iframe");
  if (iframes && iframes.length > 0) {
    iframes.forEach(f => {
      f.style.display = "none";
      f.style.zIndex = -99999999;
    });
  }
}

function setupMutationObserver(element) {
  let observer = new MutationObserver(mutations => {
    for (let mutation of mutations) {
      for (let addedNode of mutation.addedNodes) {

        if (addedNode.nodeName === "IFRAME") {
          if (addedNode.getAttribute("name") != "myFrameView") {
            addedNode.style.display = "none";
            addedNode.style.zIndex = -99999999;
          } else {
            addedNode.addEventListener('load', () => { setupMutationObserver(addedNode.contentWindow.document.body) }, true);
          }

        }
      }
    }
  });
  observer.observe(element, { childList: true, subtree: true });

}