import { getPostCount } from '@/lib/posts';
import { getUserCount } from '@/lib/users';
import { getCommentCount } from '@/lib/comments';
import { getCategoryById } from '@/lib/categories';
import { getTagById } from '@/lib/tags';

export default async function DashboardPage() {
  // 获取统计数据
  const publishedPostCount = await getPostCount({ status: 'published' });
  const draftPostCount = await getPostCount({ status: 'draft' });
  const userCount = await getUserCount();
  const pendingCommentCount = await getCommentCount({ status: 'pending' });
  const approvedCommentCount = await getCommentCount({ status: 'approved' });

  // 最近活动数据（实际应用中会从数据库获取）
  const recentActivities = [
    { type: '文章', action: '发布', title: '如何使用Next.js构建博客', time: '2小时前' },
    { type: '评论', action: '收到', title: '关于"Next.js入门指南"的新评论', time: '3小时前' },
    { type: '用户', action: '注册', title: '新用户张三已注册', time: '1天前' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">仪表盘</h1>
      
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">文章</h2>
          <div className="flex justify-between items-end">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{publishedPostCount}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">草稿: {draftPostCount}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">评论</h2>
          <div className="flex justify-between items-end">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{approvedCommentCount}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">待审核: {pendingCommentCount}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">用户</h2>
          <div className="flex justify-between items-end">
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{userCount}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">今日活跃: 0</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">访问量</h2>
          <div className="flex justify-between items-end">
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">0</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">今日: 0</p>
          </div>
        </div>
      </div>
      
      {/* 快速操作 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">快速操作</h2>
        <div className="flex flex-wrap gap-4">
          <a 
            href="/admin/posts/new" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            写文章
          </a>
          <a 
            href="/admin/comments" 
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            管理评论
          </a>
          <a 
            href="/admin/media/upload" 
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            上传媒体
          </a>
          <a 
            href="/admin/settings" 
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            网站设置
          </a>
        </div>
      </div>
      
      {/* 最近活动 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">最近活动</h2>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentActivities.map((activity, index) => (
            <div key={index} className="py-3 flex justify-between items-center">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">{activity.type}</span>
                <span className="text-gray-600 dark:text-gray-400"> {activity.action}: </span>
                <span className="text-blue-600 dark:text-blue-400">{activity.title}</span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
