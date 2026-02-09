import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";

function isAbsoluteUrl(url: string) {
  return /^https?:\/\//i.test(url) || /^data:/i.test(url);
}

function joinPath(base: string, p: string) {
  if (!base.endsWith("/")) base += "/";
  if (p.startsWith("/")) p = p.slice(1);
  return base + p;
}

export function Markdown({
  markdown,
  repoFullName,
  defaultBranch,
  htmlUrl
}: {
  markdown: string;
  repoFullName: string; // e.g. TaskBeacon/T000014-stroop
  defaultBranch: string;
  htmlUrl: string;
}) {
  const rawBase = `https://raw.githubusercontent.com/${repoFullName}/${defaultBranch}/`;
  const blobBase = `${htmlUrl}/blob/${defaultBranch}/`;

  return (
    <ReactMarkdown
      className="tb-prose"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }], rehypeSlug]}
      components={{
        a: ({ href, children, ...props }) => {
          const h = href ?? "";
          let nextHref = h;
          const isHash = h.startsWith("#");
          if (!isHash && h && !isAbsoluteUrl(h)) {
            nextHref = joinPath(blobBase, h);
          }
          const external = !isHash;
          return (
            <a
              href={nextHref}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              {...props}
            >
              {children}
            </a>
          );
        },
        img: ({ src, alt, ...props }) => {
          const s = src ?? "";
          let nextSrc = s;
          if (s && !isAbsoluteUrl(s)) {
            nextSrc = joinPath(rawBase, s);
          }
          return <img src={nextSrc} alt={alt ?? ""} loading="lazy" {...props} />;
        },
        pre: ({ children }) => {
          return (
            <pre className="not-prose overflow-x-auto rounded-xl border border-slate-200 bg-slate-950 p-4 text-slate-50">
              {children}
            </pre>
          );
        },
        code: ({ className, children, ...props }) => {
          return (
            <code
              className={
                className
                  ? className
                  : "rounded bg-slate-100 px-1 py-0.5 font-mono text-[0.9em] text-slate-900"
              }
              {...props}
            >
              {children}
            </code>
          );
        }
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
