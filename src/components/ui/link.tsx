import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Link as PrimitiveLink, LinkProps } from "react-router-dom";

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <PrimitiveLink
        {...props}
        ref={ref}
        className={cn("underline font-semibold", className)}
      >
        {children}
      </PrimitiveLink>
    );
  }
);
