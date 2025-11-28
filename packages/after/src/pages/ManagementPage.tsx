import React from 'react';
import { UserManagementPage } from './User/UserManagementPage.tsx';
import { PostManagementPage } from './Post/PostManagementPage.tsx';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export const ManagementPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Tabs Section */}
        <Tabs defaultValue="post" className="w-full">
          <TabsList className="mb-6 mx-auto">
            <TabsTrigger value="post" className="min-w-[120px]">
              게시글 관리
            </TabsTrigger>
            <TabsTrigger value="user" className="min-w-[120px]">
              사용자 관리
            </TabsTrigger>
          </TabsList>

          <TabsContent value="post" className="mt-0">
            <div className="rounded-lg border bg-card shadow-sm">
              <PostManagementPage />
            </div>
          </TabsContent>

          <TabsContent value="user" className="mt-0">
            <div className="rounded-lg border bg-card shadow-sm">
              <UserManagementPage />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
