import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

// Utility function to create slugs (matching the one in TableOfContents)
const createSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+$/, "");
};

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
          <Check className="h-4 w-4 text-emerald-500" />
          <span className="text-emerald-500 text-sm font-medium mr-10">
            Copied
          </span>
        </>
      ) : (
        <Copy className="h-4 w-4 text-white" />
      )}
    </Button>
  );
};

const ImageWithLightbox = ({ src, alt }) => {
  const [isZoomed, setIsZoomed] = React.useState(false);

  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        isZoomed && "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
      )}
      onClick={() => setIsZoomed(!isZoomed)}
    >
      <div
        className={cn(
          "relative h-[400px] rounded-xl overflow-hidden bg-muted",
          isZoomed && "h-screen flex items-center justify-center p-8"
        )}
      >
        <Image
          src={src}
          alt={alt || "Blog image"}
          layout={isZoomed ? "fill" : "fill"}
          objectFit="contain"
          className={cn(
            "transition-all duration-300",
            !isZoomed && "hover:scale-105",
            isZoomed && "cursor-zoom-out"
          )}
        />
      </div>
    </div>
  );
};

export const MarkdownComponents = {
  h1: ({ node, children, ...props }) => {
    const slug = createSlug(children);
    return (
      <h1
        id={slug}
        className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl mt-10 mb-4 first:mt-0 text-primary"
        {...props}
      >
        {children}
      </h1>
    );
  },

  h2: ({ node, children, ...props }) => {
    const slug = createSlug(children);
    return (
      <h2
        id={slug}
        className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mt-8 mb-4 text-primary"
        {...props}
      >
        {children}
      </h2>
    );
  },

  h3: ({ node, children, ...props }) => {
    const slug = createSlug(children);
    return (
      <h3
        id={slug}
        className="scroll-m-20 text-xl font-semibold tracking-tight mt-6 mb-3"
        {...props}
      >
        {children}
      </h3>
    );
  },

  h4: ({ node, children, ...props }) => {
    const slug = createSlug(children);
    return (
      <h4
        id={slug}
        className="scroll-m-20 text-lg font-medium tracking-tight mt-4 mb-2"
        {...props}
      >
        {children}
      </h4>
    );
  },

  p: ({ node, ...props }) => (
    <p
      className="leading-7 [&:not(:first-child)]:mt-4 text-base text-muted-foreground"
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

  img: ({ node, ...props }) => (
    <figure className="my-6">
      <ImageWithLightbox {...props} />
      {props.alt && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground italic">
          {props.alt}
        </figcaption>
      )}
    </figure>
  ),

  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const code = String(children).replace(/\n$/, "");

    if (!inline && match) {
      return (
        <div className="relative my-4 rounded-lg overflow-hidden">
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
            customStyle={{
              margin: 0,
              borderRadius: "0.5rem",
              padding: "1.25rem",
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
        className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium text-primary"
        {...props}
      >
        {children}
      </code>
    );
  },

  ul: ({ node, ...props }) => (
    <ul
      className="my-4 ml-6 list-disc [&>li]:mt-1.5 text-muted-foreground marker:text-primary"
      {...props}
    />
  ),

  ol: ({ node, ...props }) => (
    <ol
      className="my-4 ml-6 list-decimal [&>li]:mt-1.5 text-muted-foreground marker:text-primary"
      {...props}
    />
  ),

  li: ({ node, ...props }) => <li className="text-base leading-7" {...props} />,

  blockquote: ({ node, ...props }) => (
    <blockquote
      className="mt-4 border-l-4 border-primary pl-6 italic text-lg text-muted-foreground"
      {...props}
    />
  ),

  hr: ({ node, ...props }) => <hr className="my-6 border-muted" {...props} />,

  table: ({ node, ...props }) => (
    <div className="my-4 w-full overflow-y-auto">
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
