import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

// Code Copy Button Component
const CopyButton = ({ code }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="absolute top-3 right-3 h-8 w-8 p-0"
      onClick={handleCopy}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-green-500 mr-10">Copied!</span>
        </>
      ) : (
        <Copy className="h-4 w-4 text-white" />
      )}
    </Button>
  );
};

// Enhanced Markdown Components
export const MarkdownComponents = {
  h1: ({ node, ...props }) => (
    <h1
      className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-12 mb-6 first:mt-0 text-primary"
      {...props}
    />
  ),

  h2: ({ node, ...props }) => (
    <h2
      className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-10 mb-4 text-primary"
      {...props}
    />
  ),

  h3: ({ node, ...props }) => (
    <h3
      className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4"
      {...props}
    />
  ),

  h4: ({ node, ...props }) => (
    <h4
      className="scroll-m-20 text-xl font-semibold tracking-tight mt-6 mb-3"
      {...props}
    />
  ),

  p: ({ node, ...props }) => (
    <p
      className="leading-7 [&:not(:first-child)]:mt-6 text-lg text-muted-foreground"
      {...props}
    />
  ),

  a: ({ node, href, ...props }) => (
    <a
      href={href}
      className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),

  img: ({ node, src, alt, ...props }) => (
    <figure className="my-8">
      <div className="relative h-[400px] rounded-xl overflow-hidden bg-muted">
        <Image
          src={src}
          alt={alt || "Blog image"}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      {alt && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground italic">
          {alt}
        </figcaption>
      )}
    </figure>
  ),

  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const code = String(children).replace(/\n$/, "");

    if (!inline && match) {
      return (
        <div className="relative my-6 rounded-lg overflow-hidden">
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
            customStyle={{
              margin: 0,
              borderRadius: "0.5rem",
              padding: "1.5rem",
            }}
            {...props}
          >
            {code}
          </SyntaxHighlighter>
          <CopyButton code={code} />
        </div>
      );
    }

    return (
      <code
        className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-primary"
        {...props}
      >
        {children}
      </code>
    );
  },

  ul: ({ node, ...props }) => (
    <ul
      className="my-6 ml-6 list-disc [&>li]:mt-2 text-muted-foreground marker:text-primary"
      {...props}
    />
  ),

  ol: ({ node, ...props }) => (
    <ol
      className="my-6 ml-6 list-decimal [&>li]:mt-2 text-muted-foreground marker:text-primary"
      {...props}
    />
  ),

  li: ({ node, ...props }) => <li className="text-lg leading-7" {...props} />,

  blockquote: ({ node, ...props }) => (
    <blockquote
      className="mt-6 border-l-4 border-primary pl-6 italic text-xl text-muted-foreground"
      {...props}
    />
  ),

  hr: ({ node, ...props }) => <hr className="my-8 border-muted" {...props} />,

  table: ({ node, ...props }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),

  th: ({ node, ...props }) => (
    <th
      className="border border-muted px-4 py-2 text-left font-bold bg-muted"
      {...props}
    />
  ),

  td: ({ node, ...props }) => (
    <td
      className="border border-muted px-4 py-2 text-muted-foreground"
      {...props}
    />
  ),

  pre: ({ node, ...props }) => <pre className="overflow-x-auto" {...props} />,
};

export default MarkdownComponents;
