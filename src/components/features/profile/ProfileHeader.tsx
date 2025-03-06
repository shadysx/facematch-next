import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"

export const ProfileHeader = () => {
    return (
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Profile Settings
                </h1>
                <p className="text-muted-foreground">
                    Manage your account settings and API access
                </p>
            </div>
            <Button variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                Security Settings
            </Button>
        </div>
    )
}