import React from 'react';
import { Modal } from '@/components/organisms';
import { Button } from '@/components/atoms';
import { FormInput, FormSelect, FormTextarea } from '@/components/molecules';
import { PostFormInput } from './PostFormInput';

interface PostModalCreateProps {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: () => void;
}

export const PostModalCreate: React.FC<PostModalCreateProps> = ({
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
      title="새 게시글 만들기"
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
        <PostFormInput
          name="title"
          value={formData.title || ''}
          onChange={(value) => setFormData({ ...formData, title: value })}
          label="제목"
          placeholder="게시글 제목을 입력하세요"
          required
          width="full"
          fieldType="postTitle"
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <FormInput
            name="author"
            value={formData.author || ''}
            onChange={(value) => setFormData({ ...formData, author: value })}
            label="작성자"
            placeholder="작성자명"
            required
            width="full"
          />
          <FormSelect
            name="category"
            value={formData.category || ''}
            onChange={(value) => setFormData({ ...formData, category: value })}
            options={[
              { value: 'development', label: 'Development' },
              { value: 'design', label: 'Design' },
              { value: 'accessibility', label: 'Accessibility' },
            ]}
            label="카테고리"
            placeholder="카테고리 선택"
            size="md"
          />
        </div>
        <FormTextarea
          name="content"
          value={formData.content || ''}
          onChange={(value) => setFormData({ ...formData, content: value })}
          label="내용"
          placeholder="게시글 내용을 입력하세요"
          rows={6}
        />
      </div>
    </Modal>
  );
};
