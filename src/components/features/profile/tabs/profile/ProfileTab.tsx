import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { authClient } from "@/lib/auth-client"

export const ProfileTab = () => {
    const session = authClient.useSession();
    return (
        <Card>
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                    Update your personal details and public profile
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-2">
                    <p className="text-sm font-medium">Name</p>
                    <p className="text-sm text-muted-foreground">
                        {session.data?.user.name}
                    </p>
                </div>
                <div className="grid gap-2">
                    <p className="text-sm font-medium">Email</p>
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">
                            {session.data?.user.email}
                        </p>
                        <Badge variant="secondary">Verified</Badge>
                    </div>
                </div>
                <div className="grid gap-2">
                    <p className="text-sm font-medium">Member Since</p>
                    <p className="text-sm text-muted-foreground">
                        {/* {new Date(session.data?.user.createdAt).toLocaleDateString()} */}
                        10/03/2025
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}