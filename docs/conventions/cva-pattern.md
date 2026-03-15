# cva Variant Pattern — Morph Maternity Design System

**Status:** ENFORCED — All variant-based components MUST follow this pattern.
**Applies to:** Every component with a `variant`, `size`, or `state` prop.

## Why cva

NativeWind v4 resolves Tailwind class names at **compile time** via Babel/Metro static analysis.
Class strings assembled at runtime (template literals, string concatenation) are never seen by
the transform and produce no styles.

`cva` (class-variance-authority) enforces complete, static class strings that NativeWind
can analyze.

## Required Pattern

```typescript
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

const buttonVariants = cva(
  // Base classes — always applied, must be complete static strings
  "rounded-lg items-center justify-center min-h-[44px] px-6",
  {
    variants: {
      variant: {
        primary:  "bg-primary text-white",
        outline:  "border border-primary bg-transparent text-primary",
        ghost:    "bg-transparent text-primary",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  // ... other props
};

function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <Pressable
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

## WRONG — Never Do These

### Dynamic template literals

```typescript
// WRONG — NativeWind compile-time transform never sees `color` value
className={`text-${color}-500`}

// WRONG — same problem with any runtime-assembled string
className={`bg-${isActive ? "rose" : "cream"}-500`}
```

### Manual string concatenation

```typescript
// WRONG — brittle, not type-safe, no conflict resolution
className={"base-class " + (isError ? "border-error" : "border-neutral-300")}
```

### Inline ternaries without cn()

```typescript
// WRONG — no tailwind-merge deduplication; conflicting classes both apply
className={isError ? "border-error text-error" : "border-neutral-300 text-neutral-900"}
```

## CORRECT — Approved Alternatives

### Ternary with complete class strings + cn()

```typescript
// CORRECT — both strings are complete, static, and scannable at compile time
className={cn("base-class", isError ? "border-error text-error" : "border-neutral-300")}
```

### cva compound variants for multi-condition classes

```typescript
compoundVariants: [
  {
    variant: "outline",
    size: "sm",
    className: "border-2",  // additional class only when both conditions are true
  },
]
```

### Object syntax with cn()

```typescript
className={cn("base", {
  "border-error": isError,
  "border-neutral-300": !isError,
  "opacity-50": disabled,
})}
```

## Naming Convention

| Export Name | Pattern |
|-------------|---------|
| `buttonVariants` | `{componentName}Variants` |
| `textVariants` | `{componentName}Variants` |
| `BadgeVariants` | capital only for named export re-use across files |

## Type Export Pattern

Always export the VariantProps type for consumer type inference:

```typescript
export type ButtonVariants = VariantProps<typeof buttonVariants>;
export { buttonVariants };  // export the cva object for composability
```

## File Location

- `src/components/{category}/{ComponentName}.tsx` — component + cva definition in same file
- If variants are reused across multiple components, extract to `src/components/{category}/variants.ts`

---
*Convention established: Phase 1 — Foundation & Infrastructure*
*Enforced from: Phase 2 onwards*
