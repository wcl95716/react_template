const rehypeToc = require('@jsdevtools/rehype-toc');
const stringify = require('rehype-stringify');
const { startsWith } = require('lodash');

let tocItemCount = 0;
function parstHref(object) {
  // eslint-disable-next-line array-callback-return
  object.children.map((item) => {
    if (item.tagName === 'li') {
      // href = item.properties.id;
      tocItemCount += 1;
    }

    if (item.tagName === 'a') {
      if (!startsWith(item.properties.href, '#')) {
        // eslint-disable-next-line no-param-reassign
        item.properties.href = `#heading-${tocItemCount}`;
      }
    }

    if (item.children && item.children.length > 0) {
      parstHref(item);
    }
  });
}

export default function parseToc() {
  return {
    // remark: (u) => u.use(toc).use(stringify),

    rehype: (u) =>
      u.use(stringify).use(rehypeToc, {
        // cssClasses: {
        //   toc: 'item-toc', // Change the CSS class for the TOC
        //   link: 'item-link', // Change the CSS class for links in the TOC
        // },

        customizeTOC: (nav) => {
          nav.children.map((item) => parstHref(item));
        },

        // customizeTOCItem: (tocItem) => {
        //   // eslint-disable-next-line no-param-reassign
        //   // tocItem.properties.id = `heading-${tocItemCount}`;
        // },
      }),
  };
}
