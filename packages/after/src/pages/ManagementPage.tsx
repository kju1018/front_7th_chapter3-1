import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent } from '../components/ui/card';
import { Modal } from '../components/Modal';
import { Alert } from '../components/Alert';

import { userService } from '../services/userService';
import { postService } from '../services/postService';
import type { User } from '../services/userService';
import type { Post } from '../services/postService';

import { DataTable } from '@/components/table/DataTable';
import { userColumns } from '@/components/table/columns/user-columns';
import { postColumns } from '@/components/table/columns/post-columns';

import { UserForm, type UserFormValues } from '@/components/form/UserForm';
import { PostForm, type PostFormValues } from '@/components/form/PostForm';

import '../styles/components.css';

type EntityType = 'user' | 'post';
type Entity = User | Post;

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>('post');
  const [data, setData] = useState<Entity[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // ----------------------------------------------------------------
  // LOAD DATA
  // ----------------------------------------------------------------
  useEffect(() => {
    loadData();
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedItem(null);
  }, [entityType]);

  const loadData = async () => {
    try {
      const result =
        entityType === 'user' ? await userService.getAll() : await postService.getAll();

      setData(result);
    } catch {
      setErrorMessage('데이터를 불러오는데 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  // ----------------------------------------------------------------
  // CREATE
  // ----------------------------------------------------------------
  const handleCreate = async (values: UserFormValues | PostFormValues) => {
    try {
      if (entityType === 'user') {
        await userService.create(values as UserFormValues);
      } else {
        await postService.create(values as PostFormValues);
      }

      await loadData();
      setIsCreateModalOpen(false);
      setAlertMessage('생성되었습니다');
      setShowSuccessAlert(true);
    } catch (e: any) {
      setErrorMessage(e.message || '생성 실패');
      setShowErrorAlert(true);
    }
  };

  // ----------------------------------------------------------------
  // EDIT (OPEN MODAL ONLY)
  // ----------------------------------------------------------------
  const handleEdit = (item: Entity) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  // ----------------------------------------------------------------
  // UPDATE
  // ----------------------------------------------------------------
  const handleUpdate = async (values: UserFormValues | PostFormValues) => {
    try {
      if (!selectedItem) return;

      if (entityType === 'user') {
        await userService.update(selectedItem.id, values as UserFormValues);
      } else {
        await postService.update(selectedItem.id, values as PostFormValues);
      }

      await loadData();
      setIsEditModalOpen(false);
      setSelectedItem(null);
      setAlertMessage('수정되었습니다');
      setShowSuccessAlert(true);
    } catch (e: any) {
      setErrorMessage(e.message || '수정 실패');
      setShowErrorAlert(true);
    }
  };

  // ----------------------------------------------------------------
  // DELETE
  // ----------------------------------------------------------------
  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      if (entityType === 'user') {
        await userService.delete(id);
      } else {
        await postService.delete(id);
      }

      await loadData();
      setAlertMessage('삭제되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '삭제 실패');
      setShowErrorAlert(true);
    }
  };

  // ----------------------------------------------------------------
  // POST STATUS
  // ----------------------------------------------------------------
  const handleStatusAction = async (id: number, action: 'publish' | 'archive' | 'restore') => {
    if (entityType !== 'post') return;

    try {
      if (action === 'publish') await postService.publish(id);
      else if (action === 'archive') await postService.archive(id);
      else if (action === 'restore') await postService.restore(id);

      await loadData();
      const message = action === 'publish' ? '게시' : action === 'archive' ? '보관' : '복원';

      setAlertMessage(`${message}되었습니다`);
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '작업 실패');
      setShowErrorAlert(true);
    }
  };

  // ----------------------------------------------------------------
  // STATS
  // ----------------------------------------------------------------
  const getStats = () => {
    if (entityType === 'user') {
      const users = data as User[];
      return {
        total: users.length,
        stat1: {
          label: '활성',
          value: users.filter((u) => u.status === 'active').length,
          color: '#2e7d32',
        },
        stat2: {
          label: '비활성',
          value: users.filter((u) => u.status === 'inactive').length,
          color: '#ed6c02',
        },
        stat3: {
          label: '정지',
          value: users.filter((u) => u.status === 'suspended').length,
          color: '#d32f2f',
        },
        stat4: {
          label: '관리자',
          value: users.filter((u) => u.role === 'admin').length,
          color: '#1976d2',
        },
      };
    } else {
      const posts = data as Post[];
      return {
        total: posts.length,
        stat1: {
          label: '게시됨',
          value: posts.filter((p) => p.status === 'published').length,
          color: '#2e7d32',
        },
        stat2: {
          label: '임시저장',
          value: posts.filter((p) => p.status === 'draft').length,
          color: '#ed6c02',
        },
        stat3: {
          label: '보관됨',
          value: posts.filter((p) => p.status === 'archived').length,
          color: 'rgba(0, 0, 0, 0.6)',
        },
        stat4: {
          label: '총 조회수',
          value: posts.reduce((sum, p) => sum + p.views, 0),
          color: '#1976d2',
        },
      };
    }
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="mx-auto max-w-7xl p-5">
        {/* HEADER */}
        <div className="mb-5">
          <h1 className="mb-1 text-2xl font-bold text-gray-800">관리 시스템</h1>
          <p className="text-sm text-gray-600">사용자와 게시글을 관리하세요</p>
        </div>

        {/* TABS */}
        <div className="border border-gray-200 bg-white p-2.5">
          <Tabs
            value={entityType}
            onValueChange={(value) => setEntityType(value as EntityType)}
            className="mb-4 border-b-2 pb-2"
          >
            <TabsList>
              <TabsTrigger value="post">게시글</TabsTrigger>
              <TabsTrigger value="user">사용자</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* HEADER BUTTON + ALERTS */}
          <div className="mb-4 text-right">
            <Button variant="primary" size="lg" onClick={() => setIsCreateModalOpen(true)}>
              새로 만들기
            </Button>
          </div>

          {showSuccessAlert && (
            <div className="mb-2.5">
              <Alert variant="success" title="성공" onClose={() => setShowSuccessAlert(false)}>
                {alertMessage}
              </Alert>
            </div>
          )}

          {showErrorAlert && (
            <div className="mb-2.5">
              <Alert variant="error" title="오류" onClose={() => setShowErrorAlert(false)}>
                {errorMessage}
              </Alert>
            </div>
          )}

          {/* STATS */}
          <div className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2.5">
            <Card tone="blue">
              <CardContent padding="compact">
                <div className="mb-1 text-xs text-gray-600">전체</div>
                <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              </CardContent>
            </Card>

            <Card tone="green">
              <CardContent padding="compact">
                <div className="mb-1 text-xs text-gray-600">{stats.stat1.label}</div>
                <div className="text-2xl font-bold text-green-700">{stats.stat1.value}</div>
              </CardContent>
            </Card>

            <Card tone="amber">
              <CardContent padding="compact">
                <div className="mb-1 text-xs text-gray-600">{stats.stat2.label}</div>
                <div className="text-2xl font-bold text-amber-600">{stats.stat2.value}</div>
              </CardContent>
            </Card>

            <Card tone="rose">
              <CardContent padding="compact">
                <div className="mb-1 text-xs text-gray-600">{stats.stat3.label}</div>
                <div className="text-2xl font-bold text-rose-700">{stats.stat3.value}</div>
              </CardContent>
            </Card>

            <Card tone="gray">
              <CardContent padding="compact">
                <div className="mb-1 text-xs text-gray-600">{stats.stat4.label}</div>
                <div className="text-2xl font-bold text-gray-800">{stats.stat4.value}</div>
              </CardContent>
            </Card>
          </div>

          {/* TABLE */}
          <div className="overflow-auto border border-gray-200 bg-white">
            <DataTable
              data={data}
              columns={entityType === 'user' ? userColumns : postColumns}
              pageSize={10}
              actions={{
                onEdit: handleEdit,
                onDelete: handleDelete,
                onPublish: (id) => handleStatusAction(id, 'publish'),
                onArchive: (id) => handleStatusAction(id, 'archive'),
                onRestore: (id) => handleStatusAction(id, 'restore'),
              }}
            />
          </div>
        </div>
      </div>

      {/* CREATE MODAL */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title={`새 ${entityType === 'user' ? '사용자' : '게시글'} 만들기`}
        size="large"
        showFooter={false}
      >
        {entityType === 'user' ? (
          <UserForm onSubmit={handleCreate} onCancel={() => setIsCreateModalOpen(false)} />
        ) : (
          <PostForm onSubmit={handleCreate} onCancel={() => setIsCreateModalOpen(false)} />
        )}
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedItem(null);
        }}
        title={`${entityType === 'user' ? '사용자' : '게시글'} 수정`}
        size="large"
        showFooter={false}
      >
        {selectedItem && (
          <Alert variant="info">
            ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
            {entityType === 'post' && ` | 조회수: ${(selectedItem as Post).views}`}
          </Alert>
        )}

        {entityType === 'user' ? (
          <UserForm
            defaultValues={selectedItem as UserFormValues}
            onSubmit={handleUpdate}
            submitLabel="수정 완료"
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedItem(null);
            }}
          />
        ) : (
          <PostForm
            defaultValues={selectedItem as PostFormValues}
            onSubmit={handleUpdate}
            submitLabel="수정 완료"
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedItem(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
};
