import hljs from 'highlight.js';

export default function highlight({ init } = {}) {
  return {
    viewerEffect({ markdownBody }) {
      (async () => {
        const els = markdownBody.querySelectorAll('pre>code');
        if (els.length === 0) return;

        if (init) await init(hljs);

        els.forEach((el) => {
          hljs.highlightElement(el);
        });
      })();
    },
  };
}
