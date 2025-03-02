import { Button, ButtonProps } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface LoadingButtonProps extends ButtonProps {
    disabled?: boolean
    isLoading?: boolean
    children: React.ReactNode
}

export function LoadingButton({ isLoading, children, disabled, ...props }: LoadingButtonProps) {
    return (
        <Button disabled={disabled || isLoading} {...props}>
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {children}
                </>
            ) : (
                children
            )}
        </Button>
    )
}