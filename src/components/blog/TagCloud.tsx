import { Tag } from '@/models/Tag';

interface TagCloudProps {
  tags: Tag[];
  onTagClick?: (tagId: string) => void;
}

export function TagCloud({ tags, onTagClick }: TagCloudProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">标签云</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => onTagClick?.(tag.id)}
            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 px-3 py-1 rounded-full text-sm transition-colors"
          >
            {tag.name}
            {tag.postCount !== undefined && (
              <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                ({tag.postCount})
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
