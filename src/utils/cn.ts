import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn — class name utility for Morph Maternity Design System
 *
 * Combines clsx (conditional classes) with tailwind-merge (conflict resolution).
 * Use this for ALL className construction in components.
 *
 * @example
 * cn("bg-rose-500", isActive && "ring-2", className)
 * cn(buttonVariants({ variant, size }), className)
 *
 * NEVER use template literals: `text-${color}-500` — NativeWind cannot scan these at compile time
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
