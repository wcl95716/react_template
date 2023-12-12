const unified = require('unified');
const markdown = require('remark-parse');
const html = require('remark-html');
const slug = require('remark-slug');
const headings = require('remark-autolink-headings');

export const parseMarkedToHtml = (mk) => {
  return (
    unified()
      .use(markdown)
      .use(slug)
      // Note that this module must be included after `remark-slug`.
      .use(headings)
      .use(html)
      .processSync(mk)
      .toString()
  );
};
