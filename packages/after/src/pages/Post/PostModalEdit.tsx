import React from 'react';
import { Modal } from '@/components/organisms/Modal';
import { Button } from '@/components/atoms/Button';
import { Alert } from '@/components/organisms/Alert';
import { FormInput } from '@/components/molecules/FormInput';
import { FormSelect } from '@/components/molecules/FormSelect';
import { FormTextarea } from '@/components/molecules/FormTextarea';
import { PostFormInput } from './PostFormInput';
import type { Post } from '@/services/postService.ts';

interface PostModalEditProps {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
  setFormData: (data: any) => void;
  selectedItem: Post | null;
  onSubmit: () => void;
}

export const PostModalEdit: React.FC<PostModalEditProps> = ({
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
      title="게시글 수정"
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
      <div>
        {selectedItem && (
          <Alert variant="info">
            ID: {selectedItem.id} | 생성일: {selectedItem.createdAt} | 조회수: {selectedItem.views}
          </Alert>
        )}

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
