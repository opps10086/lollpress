import { Category } from '@/models/Category';

interface CategoryListProps {
  categories: Category[];
  onCategoryClick?: (categoryId: string) => void;
}

export function CategoryList({ categories, onCategoryClick }: CategoryListProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">分类目录</h3>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => onCategoryClick?.(category.id)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex justify-between w-full"
            >
              <span>{category.name}</span>
              {category.postCount !== undefined && (
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">
                  {category.postCount}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
