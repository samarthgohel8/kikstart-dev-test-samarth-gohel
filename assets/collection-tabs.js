class CollectionTabs extends HTMLElement {
  constructor() {
    super();
    this.init();

  }

  connectedCallback() {
    //this.init();
  }

  init() {
    const renderProductGridContainer = (html) => {
      document.getElementById('ProductGridContainer').innerHTML = new DOMParser()
        .parseFromString(html, 'text/html')
        .getElementById('ProductGridContainer').innerHTML;
      document.getElementById('collectiontabs').innerHTML = new DOMParser()
        .parseFromString(html, 'text/html')
        .getElementById('collectiontabs').innerHTML;
      console.log(document.getElementById('collectiontabs').innerHTML);
      // document.getElementById('ProductGridContainer').querySelectorAll('.scroll-trigger').forEach((element) => {element.classList.add('scroll-trigger--cancel');});
    };

    const getFetchUrl = (collectionUrl) => {
      const sectionId = document.getElementById('product-grid').dataset.id;
      let url = collectionUrl;
      if (window.location.search) {
        url = collectionUrl + window.location.search + '&section_id=' + sectionId;
      } else {
        url = url + '?section_id=' + sectionId;
      }
      console.log('url: ', url);
      return url;
    };

    const getFetchNewUrl = (collectionUrl) => {
      let newurl = collectionUrl;
      if (window.location.search) {
        newurl = collectionUrl + window.location.search;
      }
      console.log('newurl: ', newurl);
      return newurl;
    };

    const collectionTabLinks = document.querySelectorAll('.collection-tab-item .collection-link');

    if (collectionTabLinks.length > 0) {
      collectionTabLinks.forEach((collectionTabLink) => {
        collectionTabLink.addEventListener('click', async (event) => {
          event.preventDefault();
          const url = getFetchUrl(event.target.href);
          const newurl = getFetchNewUrl(event.target.href);

          document.querySelector('.tabLoader').classList.add('loading');

          const response = await fetch(url);
          const html = await response.text();
          renderProductGridContainer(html);

          window.history.replaceState({ path: newurl }, '', newurl);
          this.init();
          document.querySelector('.tabLoader').classList.remove('loading');
          console.log('collection loaded');
        });
      });
    }

    const tabSelect = document.querySelector('#collectionTabs');
    tabSelect.addEventListener('change', async () => {
      const selectValue = tabSelect.options[tabSelect.selectedIndex].value;
      const url = getFetchUrl(selectValue);
      const newurl = getFetchNewUrl(selectValue);
      console.log('url', url);
      console.log('newurl', newurl);
      document.querySelector('.tabLoader').classList.add('loading');

      const response = await fetch(url);
      const html = await response.text();
      renderProductGridContainer(html);

      window.history.replaceState({ path: newurl }, '', newurl);
      this.init();
      document.querySelector('.tabLoader').classList.remove('loading');
      console.log('collection loaded');
    });
  }
}

customElements.define('collection-tabs', CollectionTabs);

window.addEventListener('load', function () {
//  document.querySelector('collection-tabs').init();
});
