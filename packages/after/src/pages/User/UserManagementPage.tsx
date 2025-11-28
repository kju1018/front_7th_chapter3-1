import React, { useState, useEffect } from 'react';
import { Button } from '@/components/atoms/Button';
import { Alert } from '@/components/organisms/Alert';
import { UserTable } from './UserTable';
import { userService } from '@/services/userService.ts';
import type { User } from '@/services/userService.ts';
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

  const stats = getStats();

  return (
    <div className="p-6">
      {/* Header with Create Button */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">사용자 관리</h2>
          <p className="mt-1 text-sm text-slate-500">사용자 계정을 생성, 수정, 삭제할 수 있습니다</p>
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

        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="text-xs font-medium text-slate-600 mb-1">{stats.stat3.label}</div>
          <div className="text-2xl font-bold text-red-600">{stats.stat3.value}</div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-medium text-slate-600 mb-1">{stats.stat4.label}</div>
          <div className="text-2xl font-bold text-slate-700">{stats.stat4.value}</div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border">
        <UserTable
          data={data}
          striped
          hover
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Modals */}
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
