import React, { useState, useEffect } from 'react';
import { Button } from '@/components/atoms';
import { Alert, Table } from '@/components/organisms';
import { postService } from '@/services/postService.ts';
import type { Post } from '@/services/postService.ts';
import '../../styles/components.css';
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
      setAlertMessage('게시글가 생성되었습니다');
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
      setAlertMessage('게시글가 수정되었습니다');
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

  const renderTableColumns = () => {
    return [
      { key: 'id', header: 'ID', width: '60px' },
      { key: 'title', header: '제목' },
      { key: 'author', header: '작성자', width: '120px' },
      { key: 'category', header: '카테고리', width: '140px' },
      { key: 'status', header: '상태', width: '120px' },
      { key: 'views', header: '조회수', width: '100px' },
      { key: 'createdAt', header: '작성일', width: '120px' },
      { key: 'actions', header: '관리', width: '250px' },
    ];
  };

  const stats = getStats();

  return (
    <div>
      <div style={{ marginBottom: '15px', textAlign: 'right' }}>
        <Button variant="primary" size="md" onClick={() => setIsCreateModalOpen(true)}>
          새로 만들기
        </Button>
      </div>

      {showSuccessAlert && (
        <div style={{ marginBottom: '10px' }}>
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
        <div style={{ marginBottom: '10px' }}>
          <Alert
            variant="error"
            title="오류"
            onClose={() => setShowErrorAlert(false)}
          >
            {errorMessage}
          </Alert>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '10px',
        marginBottom: '15px'
      }}>
        <div style={{
          padding: '12px 15px',
          background: '#e3f2fd',
          border: '1px solid #90caf9',
          borderRadius: '3px'
        }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>전체</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>{stats.total}</div>
        </div>

        <div style={{
          padding: '12px 15px',
          background: '#e8f5e9',
          border: '1px solid #81c784',
          borderRadius: '3px'
        }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>{stats.stat1.label}</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#388e3c' }}>{stats.stat1.value}</div>
        </div>

        <div style={{
          padding: '12px 15px',
          background: '#fff3e0',
          border: '1px solid #ffb74d',
          borderRadius: '3px'
        }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>{stats.stat2.label}</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f57c00' }}>{stats.stat2.value}</div>
        </div>

        <div style={{
          padding: '12px 15px',
          background: '#ffebee',
          border: '1px solid #e57373',
          borderRadius: '3px'
        }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>{stats.stat3.label}</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#d32f2f' }}>{stats.stat3.value}</div>
        </div>

        <div style={{
          padding: '12px 15px',
          background: '#f5f5f5',
          border: '1px solid #bdbdbd',
          borderRadius: '3px'
        }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>{stats.stat4.label}</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#424242' }}>{stats.stat4.value}</div>
        </div>
      </div>

      <div style={{ border: '1px solid #ddd', background: 'white', overflow: 'auto' }}>
        <Table
          columns={renderTableColumns()}
          data={data}
          striped
          hover
          entityType="post"
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPublish={(id) => handleStatusAction(id, 'publish')}
          onArchive={(id) => handleStatusAction(id, 'archive')}
          onRestore={(id) => handleStatusAction(id, 'restore')}
        />
      </div>

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
