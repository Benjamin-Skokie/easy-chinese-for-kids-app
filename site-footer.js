(() => {
  const siteRoot = new URL(".", document.currentScript.src);

  if (document.querySelector(".book") && !document.querySelector("[data-article-theme]")) {
    const articleTheme = document.createElement("link");
    articleTheme.rel = "stylesheet";
    articleTheme.href = new URL("culture/shared/article-theme.css?v=20260907-v1", siteRoot);
    articleTheme.dataset.articleTheme = "";
    document.head.append(articleTheme);
  }

  if (document.querySelector("[data-site-copyright]")) {
    return;
  }

  const guideImage = new URL("assets/brand/zongzi-guide.webp?v=20260830-hq2", siteRoot);
  const footer = document.createElement("footer");
  footer.className = "site-copyright";
  footer.dataset.siteCopyright = "";
  footer.innerHTML = `
    <img src="${guideImage}" alt="" width="768" height="768" />
    <span>
      <strong>Made with curiosity, care, and technology.</strong>
      <small>© 2026 Nihao World. All rights reserved.</small>
    </span>
  `;
  document.body.append(footer);

  const style = document.createElement("style");
  style.textContent = `
    .site-copyright {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      width: min(1120px, calc(100vw - 40px));
      margin: 24px auto 0;
      padding: 22px 0 34px;
      border-top: 1px solid rgba(25, 91, 92, 0.14);
      color: #627879;
      font-family: "Avenir Next", "Trebuchet MS", "Helvetica Neue", sans-serif;
      font-size: 0.78rem;
      line-height: 1.5;
      text-align: left;
    }
    .site-copyright img {
      width: 46px;
      height: 46px;
      object-fit: contain;
    }
    .site-copyright span {
      display: grid;
      gap: 2px;
    }
    .site-copyright strong,
    .site-copyright small {
      display: block;
    }
    .site-copyright strong {
      color: #274849;
      font-size: 0.78rem;
    }
    .site-copyright small {
      font-size: 0.68rem;
    }
  `;
  document.head.append(style);
})();
