// import markdown from 'remark-parse';
// import html from 'remark-html';

import toString from 'mdast-util-to-string';
import visit from 'unist-util-visit';
import GithubSlugger from 'github-slugger';

// import headings from 'remark-autolink-headings';

const slugs = new GithubSlugger();

let count = 0;

function visitor(node) {
  // eslint-disable-next-line no-param-reassign
  const data = node.data || (node.data = {});
  const props = data.hProperties || (data.hProperties = {});
  let { id } = props;
  // console.log('node :: ', node);
  // console.log('props :: ', slugs.slug(toString(node)));
  id = id ? slugs().slug(id, true) : slugs.slug(toString(node));
  // console.log('id :: ', id);

  count += 1;

  data.id = id;
  props.id = `heading-${count}`;
}

function transformer(ast) {
  slugs.reset();
  count = 0;

  visit(ast, 'heading', visitor);
}

function slug() {
  return transformer;
}

export default function autoLinkHeadings() {
  // let headItemCount = 0;
  return {
    remark: (u) => u.use(slug),

    // .use(markdown),

    // .use(html),

    // .use(headings, {
    //   content: (headItem) => {
    //     console.log('headItem :: ', headItem);
    //   },
    // }),
  };
}
