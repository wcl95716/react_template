import gfm from '@bytemd/plugin-gfm';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import gemoji from '@bytemd/plugin-gemoji';

// import breaks from '@bytemd/plugin-breaks';
// import footnotes from '@bytemd/plugin-footnotes';
// import frontmatter from '@bytemd/plugin-frontmatter';
// import math from '@bytemd/plugin-math';
// import mermaid from '@bytemd/plugin-mermaid';

import highlight from './plugin-highlight'; // "@bytemd/plugin-highlight": "^1.9.0",

import autoLinkHeadings from './plugin-autolink-headings';

import parseToc from './plugin-toc';

export const plugins = [
  gfm(),

  // highlight
  highlight(),

  // toc
  parseToc(),

  // H1 - H5 add id Anchor
  autoLinkHeadings(),

  gemoji(),

  // img zoom
  mediumZoom(),

  // breaks(),

  // footnotes(),

  // frontmatter(),

  // math(),

  // mermaid(),

  // Add more plugins here
];
