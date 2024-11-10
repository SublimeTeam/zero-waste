import * as React from "react";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export type InputProps = {
  onClean?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputSearch = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="flex gap-2 items-center h-9 w-full rounded-md focus-within:outline-none shadow-sm focus-within:ring-1 focus-within:ring-stone-950 border  border-stone-200 bg-transparent px-3 py-1 text-sm">
        <Search size={18} />
        <input
          type={type}
          className={cn(
            "flex h-full w-full bg-transparent outline-none  transition-colors placeholder:text-stone-500 disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
InputSearch.displayName = "InputSearch";

export { InputSearch };
