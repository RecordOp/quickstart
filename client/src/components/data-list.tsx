import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface DataListProps {
  // The items to render
  items: {
    label: ReactNode; // The label for the item
    content: ReactNode; // The content for the item
    // Style overrides for the item
    overrides?: {
      item?: { className?: string };
      label?: { className?: string };
      content?: { className?: string };
    };
  }[];
}
// Component to render a data list
export default function DataList({ items }: DataListProps) {
  return (
    <dl className="sm:divide-y sm:divide-gray-200">
      {items.map((item, i) => (
        <div
          key={i}
          className={twMerge(
            'py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6',
            item.overrides?.item?.className
          )}>
          <dt
            className={twMerge(
              'text-sm font-medium text-gray-500',
              item.overrides?.label?.className
            )}>
            {item.label}
          </dt>
          <dd
            className={twMerge(
              'mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0',
              item.overrides?.content?.className
            )}>
            {item.content}
          </dd>
        </div>
      ))}
    </dl>
  );
}
