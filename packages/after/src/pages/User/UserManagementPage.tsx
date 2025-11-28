import React, { useState, useEffect } from 'react';
import { Button } from '@/components/atoms';
import { Alert, Table } from '@/components/organisms';
import { userService } from '@/services/userService.ts';
import type { User } from '@/services/userService.ts';
import '../../styles/components.css';
import {UserModalCreate} from "@/pages/User/UserModalCreate.tsx"
import {UserModalEdit} from "@/pages/User/UserModalEdit.tsx"

export const UserManagementPage: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<User | null>(null);
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
      const result = await userService.getAll();
      setData(result);
    } catch (error: any) {
      setErrorMessage('데이터를 불러오는데 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleCreate = async () => {
    try {
      await userService.create({
        username: formData.username,
        email: formData.email,
        role: formData.role || 'user',
        status: formData.status || 'active',
      });

      await loadData();
      setIsCreateModalOpen(false);
      setFormData({});
      setAlertMessage('사용자가 생성되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '생성에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleEdit = (item: User) => {
    setSelectedItem(item);
    setFormData({
      username: item.username,
      email: item.email,
      role: item.role,
      status: item.status,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedItem) return;

    try {
      await userService.update(selectedItem.id, formData);

      await loadData();
      setIsEditModalOpen(false);
      setFormData({});
      setSelectedItem(null);
      setAlertMessage('사용자가 수정되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '수정에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await userService.delete(id);

      await loadData();
      setAlertMessage('삭제되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '삭제에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const getStats = () => {
    return {
      total: data.length,
      stat1: { label: '활성', value: data.filter(u => u.status === 'active').length, color: '#2e7d32' },
      stat2: { label: '비활성', value: data.filter(u => u.status === 'inactive').length, color: '#ed6c02' },
      stat3: { label: '정지', value: data.filter(u => u.status === 'suspended').length, color: '#d32f2f' },
      stat4: { label: '관리자', value: data.filter(u => u.role === 'admin').length, color: '#1976d2' },
    };
  };

  const renderTableColumns = () => {
    return [
      { key: 'id', header: 'ID', width: '60px' },
      { key: 'username', header: '사용자명', width: '150px' },
      { key: 'email', header: '이메일' },
      { key: 'role', header: '역할', width: '120px' },
      { key: 'status', header: '상태', width: '120px' },
      { key: 'createdAt', header: '생성일', width: '120px' },
      { key: 'lastLogin', header: '마지막 로그인', width: '140px' },
      { key: 'actions', header: '관리', width: '200px' },
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
          entityType="user"
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPublish={() => {}}
          onArchive={() => {}}
          onRestore={() => {}}
        />
      </div>

      <UserModalCreate
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleCreate}
      />

      <UserModalEdit
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
