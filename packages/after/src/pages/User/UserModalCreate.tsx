import React from 'react';
import { Modal } from '@/components/organisms';
import { Button } from '@/components/atoms';
import { FormSelect } from '@/components/molecules';
import { UserFormInput } from './UserFormInput';

interface UserModalCreateProps {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: () => void;
}

export const UserModalCreate: React.FC<UserModalCreateProps> = ({
  isOpen,
  onClose,
  formData,
  setFormData,
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
      title="새 사용자 만들기"
      size="large"
      showFooter
      footerContent={
        <>
          <Button variant="secondary" size="md" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" size="md" onClick={onSubmit}>
            생성
          </Button>
        </>
      }
    >
      <div>
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <FormSelect
            name="role"
            value={formData.role || 'user'}
            onChange={(value) => setFormData({ ...formData, role: value })}
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
            onChange={(value) => setFormData({ ...formData, status: value })}
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
