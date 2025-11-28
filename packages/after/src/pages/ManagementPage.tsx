import React from 'react';
import { UserManagementPage } from './User/UserManagementPage.tsx';
import { PostManagementPage } from './Post/PostManagementPage.tsx';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export const ManagementPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            관리 시스템
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            사용자와 게시글을 효율적으로 관리하세요
          </p>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="post" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="post" className="min-w-[120px]">
              게시글 관리
            </TabsTrigger>
            <TabsTrigger value="user" className="min-w-[120px]">
              사용자 관리
            </TabsTrigger>
          </TabsList>

          <TabsContent value="post" className="mt-0">
            <div className="rounded-lg border bg-white shadow-sm">
              <PostManagementPage />
            </div>
          </TabsContent>

          <TabsContent value="user" className="mt-0">
            <div className="rounded-lg border bg-white shadow-sm">
              <UserManagementPage />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
