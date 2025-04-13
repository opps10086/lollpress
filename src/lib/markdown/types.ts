export interface MarkdownOptions {
  /**
   * 是否启用代码高亮
   */
  enableCodeHighlighting?: boolean;
  
  /**
   * 是否启用数学公式支持
   */
  enableMath?: boolean;
  
  /**
   * 是否启用自动链接
   */
  enableAutoLinks?: boolean;
  
  /**
   * 是否启用表格支持
   */
  enableTables?: boolean;
  
  /**
   * 是否启用任务列表
   */
  enableTaskLists?: boolean;
  
  /**
   * 是否启用脚注
   */
  enableFootnotes?: boolean;
}
