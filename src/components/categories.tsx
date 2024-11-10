import { stores } from "@/pages/personal/data";
import { Chip } from "./ui/chip";

const categories = stores.reduce((prev, curr) => {
  const { categoria } = curr;
  if (prev.includes(categoria)) return prev;
  return [...prev, categoria];
}, [] as string[]);

interface CategoriesProps {
  activeCategory?: string | null;
  onCategorySelect?: (category: string) => void;
}

export const Categories = ({
  activeCategory,
  onCategorySelect = () => {},
}: CategoriesProps) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map((category) => (
        <button key={category} onClick={() => onCategorySelect(category)}>
          <Chip label={category} active={activeCategory === category} />
        </button>
      ))}
    </div>
  );
};
