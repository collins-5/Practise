import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"           
import type { SVGProps } from "react"                    
import * as Lucide from "lucide-react"                   

type IconSize = "xs" | "sm" | "default" | "lg" | "xl" | number

const sizeMap: Record<Exclude<IconSize, number>, string> = {
    xs: "size-3",     // ~12px
    sm: "size-4",     // 16px — shadcn default
    default: "size-5", // 20px
    lg: "size-6",     // 24px
    xl: "size-7",     // 28px
}

export interface IconProps
    extends Omit<SVGProps<SVGSVGElement>, "ref" | "children" | "asChild"> {
    /** Icon name from lucide-react — use kebab-case: "user", "loader-2", "chevron-down" */
    name: keyof typeof Lucide
    size?: IconSize
    className?: string
}

const Icon = ({
    name,
    size = "default",
    className,
    ...props
}: IconProps) => {
    const LucideIcon = Lucide[name] as LucideIcon | undefined

    if (!LucideIcon) {
        console.warn(`Icon "${name}" not found in lucide-react`)
        return null 
    }

    const sizeClass =
        typeof size === "number"
            ? `size-[${size}px]`
            : sizeMap[size] ?? sizeMap.default

    return (
        <LucideIcon
            className={cn("shrink-0 text-current", sizeClass, className)}
            {...props}
        />
    )
}

export { Icon }