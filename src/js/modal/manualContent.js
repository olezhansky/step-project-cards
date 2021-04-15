export const manual = function () {
  const manualContent = document.createElement("div");
  manualContent.classList.add("manual-content");
  manualContent.insertAdjacentHTML(
    "afterbegin",
    `<ol>
        <li class="manual-list-item">
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam molestie sem eget urna fermentum dapibus. Duis quam nisi, dapibus ut porttitor eu, tristique quis erat. Nam id posuere ipsum. Integer nulla lorem, sodales eu tincidunt ac, maximus vitae metus. Aliquam at felis quis est mattis cursus eget ut libero. Aenean ac elit nulla. Maecenas placerat commodo rhoncus. Phasellus est sem, bibendum in placerat vitae, lacinia vel nisl.
      </li>
        <li class="manual-list-item">
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus vitae fermentum nulla. Nunc magna orci, pulvinar id erat ut, rutrum auctor diam. Duis dapibus libero sed sodales consequat. Praesent consectetur magna in congue bibendum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam molestie sem eget urna fermentum dapibus. 
      </li>
        <li class="manual-list-item">
        Nunc magna orci, pulvinar id erat ut, rutrum auctor diam. Duis dapibus libero sed sodales consequat. Praesent consectetur magna in congue bibendum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam molestie sem eget urna fermentum dapibus. Duis quam nisi, dapibus ut porttitor eu, tristique quis erat. Nam id posuere ipsum. Integer nulla lorem, sodales eu tincidunt ac, maximus vitae metus. Aliquam at felis quis est mattis cursus eget ut libero. Aenean ac elit nulla. 
      </li>
        <li class="manual-list-item">
        Etiam molestie sem eget urna fermentum dapibus. Duis quam nisi, dapibus ut porttitor eu, tristique quis erat. Nam id posuere ipsum. Integer nulla lorem, sodales eu tincidunt ac, maximus vitae metus. Aliquam at felis quis est mattis cursus eget ut libero. Aenean ac elit nulla. Maecenas placerat commodo rhoncus. Phasellus est sem, bibendum in placerat vitae, lacinia vel nisl.
      </li>
  </ol>`
  );
  return manualContent;
};
