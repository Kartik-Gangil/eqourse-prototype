import { useMemo, type ReactNode } from "react";
import DOMPurify from "dompurify";
import ReactMarkdown, { type Components } from "react-markdown";
import { Link } from "react-router-dom";
import remarkGfm from "remark-gfm";

const SITE_HOSTS = new Set(["eqourse.com", "www.eqourse.com"]);

function textFromChildren(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(textFromChildren).join("");
  if (children && typeof children === "object" && "props" in children) {
    return textFromChildren((children as { props?: { children?: ReactNode } }).props?.children);
  }
  return "";
}

function headingId(children: ReactNode) {
  return textFromChildren(children)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function internalPath(href: string) {
  if (href.startsWith("/")) return href;
  try {
    const url = new URL(href);
    return SITE_HOSTS.has(url.hostname.toLowerCase())
      ? `${url.pathname}${url.search}${url.hash}`
      : null;
  } catch {
    return null;
  }
}

export function SmartArticleLink({ href = "", children, className = "" }: { href?: string; children: ReactNode; className?: string }) {
  const classes = `font-medium text-primary underline decoration-primary/35 underline-offset-4 transition-colors hover:decoration-primary ${className}`;
  const route = internalPath(href);
  if (route) return <Link to={route} className={classes}>{children}</Link>;
  if (/^https?:\/\//i.test(href)) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>{children}</a>;
  }
  return <a href={href} className={classes}>{children}</a>;
}

const components: Components = {
  h1: ({ children }) => <h2 id={headingId(children)} className="scroll-mt-32 font-heading text-2xl font-bold text-foreground md:text-3xl">{children}</h2>,
  h2: ({ children }) => <h2 id={headingId(children)} className="scroll-mt-32 font-heading text-2xl font-bold text-foreground md:text-3xl">{children}</h2>,
  h3: ({ children }) => <h3 id={headingId(children)} className="scroll-mt-32 font-heading text-xl font-bold text-foreground md:text-2xl">{children}</h3>,
  a: ({ href, children }) => <SmartArticleLink href={href}>{children}</SmartArticleLink>,
  p: ({ children }) => <p className="leading-8 text-muted-foreground">{children}</p>,
  ul: ({ children }) => <ul className="list-disc space-y-2 pl-6 text-muted-foreground marker:text-primary">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal space-y-2 pl-6 text-muted-foreground marker:font-semibold marker:text-primary">{children}</ol>,
  li: ({ children }) => <li className="pl-1 leading-7">{children}</li>,
  blockquote: ({ children }) => <blockquote className="rounded-r-xl border-l-4 border-primary bg-primary/5 px-5 py-3 italic text-muted-foreground">{children}</blockquote>,
  table: ({ children }) => <table className="my-2 w-full min-w-[560px] border-collapse overflow-hidden rounded-xl text-left text-sm">{children}</table>,
  thead: ({ children }) => <thead className="bg-primary/10 text-foreground">{children}</thead>,
  th: ({ children }) => <th className="border border-border px-4 py-3 font-semibold">{children}</th>,
  td: ({ children }) => <td className="border border-border px-4 py-3 align-top text-muted-foreground">{children}</td>,
  hr: () => <hr className="my-8 border-border" />,
  code: ({ children }) => <code className="rounded bg-muted px-1.5 py-0.5 text-[0.9em] text-foreground">{children}</code>,
  img: ({ src, alt, title }) => <img src={src} alt={alt || ""} title={title} loading="lazy" decoding="async" className="h-auto max-w-full rounded-2xl border border-border/60" />,
};

interface ArticleContentProps {
  content: string;
  format?: "markdown" | "html";
  className?: string;
}

export default function ArticleContent({ content, format = "markdown", className = "" }: ArticleContentProps) {
  const sanitizedHtml = useMemo(
    () => format === "html" ? DOMPurify.sanitize(content, { USE_PROFILES: { html: true } }) : "",
    [content, format],
  );

  const wrapperClass = `article-content space-y-6 overflow-x-auto text-base ${className}`;
  if (format === "html") {
    return <div className={wrapperClass} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
  }

  return (
    <div className={wrapperClass}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
