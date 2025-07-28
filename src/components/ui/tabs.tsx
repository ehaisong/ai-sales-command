
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex min-h-14 items-center justify-center rounded-xl bg-gradient-to-r from-muted/40 to-muted/60 backdrop-blur-sm p-2 text-muted-foreground transition-all duration-500 border border-border/50 shadow-lg",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative inline-flex items-center justify-center whitespace-nowrap rounded-lg px-6 py-3.5 text-sm font-semibold ring-offset-background transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-12 min-w-fit",
      "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/10 data-[state=active]:border data-[state=active]:border-border/30",
      "hover:bg-background/60 hover:text-foreground/90 hover:shadow-md hover:shadow-primary/5",
      "transform hover:scale-[1.02] data-[state=active]:scale-[1.02] active:scale-[0.98]",
      "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-primary/0 before:to-primary/0 before:transition-all before:duration-500",
      "data-[state=active]:before:from-primary/5 data-[state=active]:before:to-primary/10",
      "touch-manipulation select-none",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "animate-fade-in animate-scale-in transition-all duration-500 opacity-0 data-[state=active]:opacity-100",
      "transform translate-y-2 data-[state=active]:translate-y-0",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
