# Author search discovery: findings and release checks

Checked on September 27, 2026 (America/New_York).

## Verified on the public site

Read-only HTTP checks against `https://nihaoworld.org` returned:

| Resource | Result |
| --- | --- |
| `/` | 200 HTML, correct canonical, WebSite creator names Benjamin Sun |
| `/about/author-project/` | 200 HTML, correct canonical, ProfilePage/Person and portrait data present |
| `/assets/photos/benjamin-sun-portrait.webp` | 200, `image/webp`, no X-Robots-Tag |
| `/robots.txt` | 200, allows crawling and advertises the sitemap |
| `/sitemap.xml` | 200 XML, includes the profile and portrait image |
| HTTP and www homepage variants | Redirect to the HTTPS non-www homepage |

The homepage and profile responses had no robots meta restriction or X-Robots-Tag. The profile's server-rendered text already named Benjamin Sun and Livingston High School. These are ordinary public HTTP checks, not proof that verified Googlebot traffic is unblocked by every Cloudflare rule.

The September 10 search metadata is already live. Therefore missing deployment of that earlier metadata is not the established cause. Metadata, a sitemap and successful HTTP responses do not demonstrate Google index inclusion or ranking.

## Improvements made locally, not yet deployed by this task

- Name the profile `Benjamin Sun | Creator of Nihao World` in the HTML title, Open Graph title and ProfilePage name.
- Put Benjamin Sun and Nihao World in the visible main heading.
- Add a visible homepage attribution link naming Benjamin Sun, and include the existing creator/school facts in the homepage description.
- Use the same portrait URL in the HTML image, structured data and sitemap. Keep the existing portrait and descriptive alt text; do not regenerate it or add speculative identity links.
- Extend regression checks for the author title, visible homepage link, portrait URL consistency and absence of explicit noindex restrictions.

These changes improve clarity and discoverability. They are not a demonstrated fix for an unknown Google indexing decision. No deploy, DNS change, Search Console verification or indexing request was performed in this task. Other uncommitted work is present in this branch; publishing must not accidentally ship it without review.

## What remains unknown

A general search did not establish that the site is indexed in Google. A direct Google search encountered an unusual-traffic verification page, so no Google result position was verified. Do not infer an indexing diagnosis from either observation.

An owner must inspect the homepage and profile in Google Search Console. Record:

1. Overall indexing status and the stated exclusion reason, if any.
2. Last crawl time, page fetch status and whether crawling/indexing is allowed.
3. User-declared and Google-selected canonical URLs.
4. The crawled/rendered page and whether it contains the author name, school and portrait.
5. Sitemap submission status; manual actions and security issues, if reported.

If live inspection fails, investigate the reported error and any corresponding Cloudflare firewall/bot event. Do not disable broad protections speculatively. If the page is indexed, examine Search Console performance for the author's name and site name separately; image search has its own search-type filter.

## After an approved release

1. Confirm the public author title and homepage attribution match the intended release.
2. Confirm the author page, portrait, robots file and sitemap remain accessible without login or noindex restrictions.
3. In the verified domain property, check submission of `https://nihaoworld.org/sitemap.xml`.
4. Use URL Inspection on `https://nihaoworld.org/` and `https://nihaoworld.org/about/author-project/`. Test the live URL and, when appropriate, request indexing once for each page.
5. Record the results and recheck after Google revisits the pages. Neither a request nor valid structured data guarantees a particular ranking or an image thumbnail.

Do not invent a Google verification token, add hidden keyword lists, publish personal contact details, treat a same-name person's profile as `sameAs`, or create external accounts/backlinks without approval.

## Google documentation

- [How Google Search works](https://developers.google.com/search/docs/fundamentals/how-search-works): discovery, indexing and serving results are separate stages.
- [URL Inspection](https://support.google.com/webmasters/answer/9012289): indexed status, live testing and Google's selected canonical.
- [Request recrawling](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl): requests can take days to weeks and do not guarantee inclusion.
- [Title links](https://developers.google.com/search/docs/appearance/title-link): descriptive titles, rather than generic profile labels.
- [Image search guidance](https://developers.google.com/search/docs/appearance/google-images): accessible images, page context, descriptive alt text, image sitemaps and consistent image URLs.
