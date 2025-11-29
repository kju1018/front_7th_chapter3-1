import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { FormSelect } from '@/components/forms/FormSelect';
import { UserFormInput } from './ui/UserFormInput.tsx';
import type { User, UserInput } from '@/services/userService.ts';

interface UserModalEditProps {
  isOpen: boolean;
  onClose: () => void;
  formData: Partial<UserInput>;
  setFormData: (data: Partial<UserInput>) => void;
  selectedItem: User | null;
  onSubmit: () => void;
}

export const UserModalEdit: React.FC<UserModalEditProps> = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  selectedItem,
  onSubmit,
}) => {
  const handleClose = () => {
    onClose();
    setFormData({});
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="사용자 수정"
      size="large"
      showFooter
      footerContent={
        <>
          <Button variant="secondary" size="md" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" size="md" onClick={onSubmit}>
            수정 완료
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-6">
        {selectedItem && (
          <Alert variant="info">
            ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
          </Alert>
        )}

        <UserFormInput
          name="username"
          value={formData.username || ''}
          onChange={(value) => setFormData({ ...formData, username: value })}
          label="사용자명"
          placeholder="사용자명을 입력하세요"
          required
          width="full"
          fieldType="username"
        />
        <UserFormInput
          name="email"
          value={formData.email || ''}
          onChange={(value) => setFormData({ ...formData, email: value })}
          label="이메일"
          placeholder="이메일을 입력하세요"
          type="email"
          required
          width="full"
          fieldType="email"
        />
        <div className="grid grid-cols-2 gap-4">
          <FormSelect
            name="role"
            value={formData.role || 'user'}
            onChange={(value) => setFormData({ ...formData, role: value as 'admin' | 'moderator' | 'user' })}
            options={[
              { value: 'user', label: '사용자' },
              { value: 'moderator', label: '운영자' },
              { value: 'admin', label: '관리자' },
            ]}
            label="역할"
            size="md"
          />
          <FormSelect
            name="status"
            value={formData.status || 'active'}
            onChange={(value) => setFormData({ ...formData, status: value as 'active' | 'inactive' | 'suspended' })}
            options={[
              { value: 'active', label: '활성' },
              { value: 'inactive', label: '비활성' },
              { value: 'suspended', label: '정지' },
            ]}
            label="상태"
            size="md"
          />
        </div>
      </div>
    </Modal>
  );
};
