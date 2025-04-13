import { marked } from 'marked';
import matter from 'gray-matter';
import { MarkdownOptions } from './types';

/**
 * 将Markdown文本转换为HTML
 * @param markdown Markdown格式的文本
 * @param options 转换选项
 * @returns 转换后的HTML文本
 */
export async function markdownToHtml(markdown: string, options: MarkdownOptions = {}): Promise<string> {
  // 配置marked选项
  marked.setOptions({
    gfm: options.enableTables !== false, // 默认启用GitHub风格Markdown
    breaks: true, // 允许换行符转换为<br>
    headerIds: true, // 为标题生成ID
    mangle: false, // 不转义标题中的HTML
    sanitize: false, // 不净化HTML (使用DOMPurify代替)
    smartLists: true, // 使用更智能的列表行为
    smartypants: false, // 不使用更智能的标点符号
    xhtml: false, // 不使用自闭合标签
  });

  // 添加代码高亮支持
  if (options.enableCodeHighlighting) {
    const renderer = new marked.Renderer();
    renderer.code = (code, language) => {
      return `<pre><code class="language-${language}">${code}</code></pre>`;
    };
    marked.use({ renderer });
  }

  // 转换Markdown为HTML
  const html = marked.parse(markdown);
  
  return html;
}

/**
 * 从HTML中提取纯文本
 * @param html HTML文本
 * @returns 提取的纯文本
 */
export function extractTextFromHtml(html: string): string {
  // 简单实现，将来可以使用更复杂的HTML解析
  return html.replace(/<[^>]*>/g, '');
}

/**
 * 生成文章摘要
 * @param content 文章内容（HTML或Markdown）
 * @param maxLength 最大长度
 * @returns 生成的摘要
 */
export function generateExcerpt(content: string, maxLength: number = 160): string {
  // 如果是HTML，先提取纯文本
  const text = content.startsWith('<') ? extractTextFromHtml(content) : content;
  
  if (text.length <= maxLength) {
    return text;
  }
  
  // 截取指定长度，并确保不会截断单词
  let excerpt = text.substring(0, maxLength);
  const lastSpaceIndex = excerpt.lastIndexOf(' ');
  
  if (lastSpaceIndex > 0) {
    excerpt = excerpt.substring(0, lastSpaceIndex);
  }
  
  return excerpt + '...';
}

/**
 * 解析带有前置元数据的Markdown文件
 * @param content 包含前置元数据的Markdown内容
 * @returns 解析后的数据和内容
 */
export function parseMarkdownWithFrontMatter(content: string) {
  const { data, content: markdownContent } = matter(content);
  return {
    frontMatter: data,
    content: markdownContent
  };
}
