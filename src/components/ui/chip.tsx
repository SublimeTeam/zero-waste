import { cn } from "@/lib/utils";

export const Chip = ({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) => {
  return (
    <span
      className={cn(
        "inline-block px-2 py-1 bg-white rounded-sm h-8 cursor-pointer",
        { "bg-black text-white": active }
      )}
    >
      {label}
    </span>
  );
};
