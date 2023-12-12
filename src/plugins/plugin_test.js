const fs = require('fs');

const unified = require('unified');

// headings
const markdown = require('remark-parse');
const html = require('remark-html');
const slug = require('remark-slug');
const headings = require('remark-autolink-headings');

// toc
const parse = require('rehype-parse');
const toc = require('@jsdevtools/rehype-toc');
const stringify = require('rehype-stringify');

async function tocTest() {
  let outputHTML = unified()
    .use(markdown)
    .use(slug)
    // Note that this module must be included after `remark-slug`.
    .use(headings, {})
    .use(html)
    .processSync(
      fs.readFileSync('E:\\Code\\moose-workspace\\moose-react-learn\\src\\plugins\\example.md'),
    )
    .toString();

  // Save the new HTML
  fs.writeFileSync('example.html', outputHTML);

  // Create a Rehype processor with the TOC plugin
  const processor = unified().use(parse).use(headings).use(slug).use(toc).use(stringify);

  // Read the original HTML file
  const inputHTML = fs.readFileSync('example.html');

  // Process the HTML, adding heading IDs and Table of Contents
  outputHTML = await processor.process(inputHTML);

  // Save the new HTML
  fs.writeFileSync('example.html', outputHTML);
}
tocTest();
