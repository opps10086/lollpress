import React, { useState, useRef, useEffect } from 'react';
import { markdownToHtml } from '@/lib/markdown/markdownUtils';

interface MarkdownEditorProps {
  initialValue?: string;
  onChange?: (markdown: string) => void;
  placeholder?: string;
  minHeight?: number;
  preview?: boolean;
}

export function MarkdownEditor({
  initialValue = '',
  onChange,
  placeholder = '请输入Markdown内容...',
  minHeight = 300,
  preview = true
}: MarkdownEditorProps) {
  const [markdown, setMarkdown] = useState(initialValue);
  const [previewHtml, setPreviewHtml] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 更新预览HTML
  useEffect(() => {
    const updatePreview = async () => {
      if (isPreviewMode) {
        const html = await markdownToHtml(markdown, {
          enableCodeHighlighting: true,
          enableTables: true,
          enableAutoLinks: true
        });
        setPreviewHtml(html);
      }
    };
    
    updatePreview();
  }, [markdown, isPreviewMode]);

  // 处理输入变化
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setMarkdown(newValue);
    onChange?.(newValue);
  };

  // 处理工具栏按钮点击
  const handleToolbarAction = (action: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);
    
    let newText = '';
    let newCursorPos = 0;
    
    switch (action) {
      case 'bold':
        newText = markdown.substring(0, start) + `**${selectedText}**` + markdown.substring(end);
        newCursorPos = selectedText ? end + 4 : start + 2;
        break;
      case 'italic':
        newText = markdown.substring(0, start) + `*${selectedText}*` + markdown.substring(end);
        newCursorPos = selectedText ? end + 2 : start + 1;
        break;
      case 'heading':
        newText = markdown.substring(0, start) + `## ${selectedText}` + markdown.substring(end);
        newCursorPos = selectedText ? end + 3 : start + 3;
        break;
      case 'link':
        newText = markdown.substring(0, start) + `[${selectedText || '链接文本'}](url)` + markdown.substring(end);
        newCursorPos = selectedText ? end + 6 : start + 11;
        break;
      case 'image':
        newText = markdown.substring(0, start) + `![${selectedText || '图片描述'}](url)` + markdown.substring(end);
        newCursorPos = selectedText ? end + 7 : start + 13;
        break;
      case 'code':
        newText = markdown.substring(0, start) + '`' + selectedText + '`' + markdown.substring(end);
        newCursorPos = selectedText ? end + 2 : start + 1;
        break;
      case 'codeblock':
        newText = markdown.substring(0, start) + '```\n' + selectedText + '\n```' + markdown.substring(end);
        newCursorPos = selectedText ? end + 7 : start + 4;
        break;
      case 'list':
        newText = markdown.substring(0, start) + '- ' + selectedText + markdown.substring(end);
        newCursorPos = selectedText ? end + 2 : start + 2;
        break;
      default:
        return;
    }
    
    setMarkdown(newText);
    onChange?.(newText);
    
    // 设置光标位置
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* 工具栏 */}
      <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 p-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => handleToolbarAction('bold')}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="粗体"
        >
          <span className="font-bold">B</span>
        </button>
        <button
          type="button"
          onClick={() => handleToolbarAction('italic')}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="斜体"
        >
          <span className="italic">I</span>
        </button>
        <button
          type="button"
          onClick={() => handleToolbarAction('heading')}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="标题"
        >
          <span className="font-bold">H</span>
        </button>
        <button
          type="button"
          onClick={() => handleToolbarAction('link')}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="链接"
        >
          🔗
        </button>
        <button
          type="button"
          onClick={() => handleToolbarAction('image')}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="图片"
        >
          🖼️
        </button>
        <button
          type="button"
          onClick={() => handleToolbarAction('code')}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="行内代码"
        >
          {'</>'}
        </button>
        <button
          type="button"
          onClick={() => handleToolbarAction('codeblock')}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="代码块"
        >
          {'```'}
        </button>
        <button
          type="button"
          onClick={() => handleToolbarAction('list')}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="列表"
        >
          •
        </button>
        
        {preview && (
          <button
            type="button"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`ml-auto px-2 py-1 rounded ${
              isPreviewMode 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {isPreviewMode ? '编辑' : '预览'}
          </button>
        )}
      </div>
      
      {/* 编辑器/预览区域 */}
      <div className="relative">
        {!isPreviewMode && (
          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full p-4 focus:outline-none dark:bg-gray-900 dark:text-white"
            style={{ minHeight: `${minHeight}px` }}
          />
        )}
        
        {isPreviewMode && (
          <div 
            className="w-full p-4 prose dark:prose-invert max-w-none min-h-[300px] dark:bg-gray-900 dark:text-white"
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        )}
      </div>
    </div>
  );
}
