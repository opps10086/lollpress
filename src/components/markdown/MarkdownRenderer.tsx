import React from 'react';
import { markdownToHtml } from '@/lib/markdown/markdownUtils';

interface MarkdownRendererProps {
  markdown: string;
  className?: string;
}

export async function MarkdownRenderer({ markdown, className = '' }: MarkdownRendererProps) {
  // 将Markdown转换为HTML
  const html = await markdownToHtml(markdown, {
    enableCodeHighlighting: true,
    enableTables: true,
    enableAutoLinks: true,
    enableTaskLists: true,
    enableFootnotes: true
  });

  return (
    <div 
      className={`prose dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
