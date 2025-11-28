import React, { useState, useEffect } from 'react';
import { Button } from '@/components/atoms/Button';
import { Alert } from '@/components/organisms/Alert';
import { PostTable } from './PostTable';
import { postService } from '@/services/postService.ts';
import type { Post } from '@/services/postService.ts';
import {PostModalCreate} from "@/pages/Post/PostModalCreate.tsx"
import {PostModalEdit} from "@/pages/Post/PostModalEdit.tsx"

export const PostManagementPage: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Post | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await postService.getAll();
      setData(result);
    } catch (error: any) {
      setErrorMessage('데이터를 불러오는데 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleCreate = async () => {
    try {
      await postService.create({
        title: formData.title,
        content: formData.content || '',
        author: formData.author,
        category: formData.category,
        status: formData.status || 'draft',
      });

      await loadData();
      setIsCreateModalOpen(false);
      setFormData({});
      setAlertMessage('게시글이 생성되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '생성에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleEdit = (item: Post) => {
    setSelectedItem(item);
    setFormData({
      title: item.title,
      content: item.content,
      author: item.author,
      category: item.category,
      status: item.status,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedItem) return;

    try {
      await postService.update(selectedItem.id, formData);

      await loadData();
      setIsEditModalOpen(false);
      setFormData({});
      setSelectedItem(null);
      setAlertMessage('게시글이 수정되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '수정에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await postService.delete(id);

      await loadData();
      setAlertMessage('삭제되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '삭제에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleStatusAction = async (id: number, action: 'publish' | 'archive' | 'restore') => {
    try {
      if (action === 'publish') {
        await postService.publish(id);
      } else if (action === 'archive') {
        await postService.archive(id);
      } else if (action === 'restore') {
        await postService.restore(id);
      }

      await loadData();
      const message =
        action === 'publish' ? '게시' :
        action === 'archive' ? '보관' :
        '복원';
      setAlertMessage(`${message}되었습니다`);
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '작업에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const getStats = () => {
    return {
      total: data.length,
      stat1: { label: '게시됨', value: data.filter(p => p.status === 'published').length, color: '#2e7d32' },
      stat2: { label: '임시저장', value: data.filter(p => p.status === 'draft').length, color: '#ed6c02' },
      stat3: { label: '보관됨', value: data.filter(p => p.status === 'archived').length, color: 'rgba(0, 0, 0, 0.6)' },
      stat4: { label: '총 조회수', value: data.reduce((sum, p) => sum + p.views, 0), color: '#1976d2' },
    };
  };

  const stats = getStats();

  return (
    <div className="p-6">
      {/* Header with Create Button */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">게시글 관리</h2>
          <p className="mt-1 text-sm text-slate-500">게시글을 작성, 수정, 삭제하고 상태를 관리할 수 있습니다</p>
        </div>
        <Button variant="primary" size="md" onClick={() => setIsCreateModalOpen(true)}>
          새로 만들기
        </Button>
      </div>

      {/* Alerts */}
      {showSuccessAlert && (
        <div className="mb-4">
          <Alert
            variant="success"
            title="성공"
            onClose={() => setShowSuccessAlert(false)}
          >
            {alertMessage}
          </Alert>
        </div>
      )}

      {showErrorAlert && (
        <div className="mb-4">
          <Alert
            variant="error"
            title="오류"
            onClose={() => setShowErrorAlert(false)}
          >
            {errorMessage}
          </Alert>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6 sm:grid-cols-3 lg:grid-cols-5">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="text-xs font-medium text-slate-600 mb-1">전체</div>
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="text-xs font-medium text-slate-600 mb-1">{stats.stat1.label}</div>
          <div className="text-2xl font-bold text-green-600">{stats.stat1.value}</div>
        </div>

        <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
          <div className="text-xs font-medium text-slate-600 mb-1">{stats.stat2.label}</div>
          <div className="text-2xl font-bold text-orange-600">{stats.stat2.value}</div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-medium text-slate-600 mb-1">{stats.stat3.label}</div>
          <div className="text-2xl font-bold text-slate-700">{stats.stat3.value}</div>
        </div>

        <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
          <div className="text-xs font-medium text-slate-600 mb-1">{stats.stat4.label}</div>
          <div className="text-2xl font-bold text-purple-600">{stats.stat4.value}</div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border">
        <PostTable
          data={data}
          striped
          hover
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPublish={(id) => handleStatusAction(id, 'publish')}
          onArchive={(id) => handleStatusAction(id, 'archive')}
          onRestore={(id) => handleStatusAction(id, 'restore')}
        />
      </div>

      {/* Modals */}
      <PostModalCreate
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleCreate}
      />

      <PostModalEdit
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedItem(null);
        }}
        formData={formData}
        setFormData={setFormData}
        selectedItem={selectedItem}
        onSubmit={handleUpdate}
      />
    </div>
  );
};
