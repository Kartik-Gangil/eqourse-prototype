# CMS SEO publishing

Blogs and case studies now publish their SEO HTML when content changes in the
admin panel. This keeps the server response and the React page on one metadata
source: the SEO title and SEO description stored with the CMS entry.

## Production configuration

Set `FRONTEND_DIST_DIR` to the live frontend document root. That directory must
contain `index.html` (or `cms-shell.html`) and `sitemap.xml`, and the backend
process must have write access to it. When the frontend and backend are deployed
from this repository together, the default `../dist` location is used.

Recommended production values:

```dotenv
PUBLIC_SITE_URL=https://www.eqourse.com
FRONTEND_DIST_DIR=/absolute/path/to/frontend/document-root
CMS_SEO_SYNC_REQUIRED=true
```

Restart the backend after deploying. At startup it reconciles every published
blog and case study, so existing entries are repaired automatically. Afterward,
create, edit, publish, unpublish, slug-change and delete operations update the
matching static page and sitemap entry immediately.

For a new published blog, verify that this file exists:

```text
<FRONTEND_DIST_DIR>/blog/<slug>/index.html
```

For a published case study, verify:

```text
<FRONTEND_DIST_DIR>/casestudy/<slug>/index.html
```

Each generated file should contain exactly one `<title>`, one meta description
and one canonical link, all sourced from the admin record.
