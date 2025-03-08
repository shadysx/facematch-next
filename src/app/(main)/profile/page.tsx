"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiAccessTab } from "@/components/features/profile/tabs/api-access/ApiAccessTab";
import { ProfileTab } from "@/components/features/profile/tabs/profile/ProfileTab";
import { ApiUsageTab } from "@/components/features/profile/tabs/api-usage/ApiUsageTab";
import { ProfileHeader } from "@/components/features/profile/ProfileHeader";

// Find better name for this page

export default function ProfilePage() {

  return (
    <div className="container max-w-4xl mx-auto py-10 space-y-8">
      <ProfileHeader />

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="api">API Access</TabsTrigger>
          <TabsTrigger value="usage">API Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <ProfileTab />
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <ApiAccessTab />
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <ApiUsageTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
