import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

// create a cva variant for green badge (success) and red badge (error)
const badgeVariants = cva(
  "inline-block font-bold uppercase md:leading-[0] text-xs px-2 h-5 rounded-sm align-middle content-center max-w-fit tracking-wider",
  {
    variants: {
      variant: {
        default:
          "bg-emerald-600 text-white shadow hover:bg-emerald-600/90 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-500/90",
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-white dark:hover:bg-red-900/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const Badge = ({
  label,
  variant = "default",
}: {
  label: string;
  variant?: "default" | "destructive";
}) => {
  return <span className={cn(badgeVariants({ variant }))}>{label}</span>;
};
