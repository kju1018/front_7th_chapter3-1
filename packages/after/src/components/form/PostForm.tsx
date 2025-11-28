// components/form/PostForm.tsx

import { FormInput } from "@/components/form/input";
import { FormTextarea } from "@/components/molecules";
import { FormSelect } from "@/components/form/select";

interface PostFormProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function PostForm({ formData, setFormData }: PostFormProps) {
  return (
    <div className="space-y-4">
      {/* 제목 */}
      <FormInput
        name="title"
        value={formData.title || ""}
        onChange={(value) => {
          setFormData({ ...formData, title: value });
          console.log(value);}
        }
        label="제목"
        placeholder="게시글 제목을 입력하세요"
        required
      />

      {/* 작성자 + 카테고리 */}
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          name="author"
          value={formData.author || ""}
          onChange={(value) => setFormData({ ...formData, author: value })}
          label="작성자"
          placeholder="작성자명"
          required
        />
    
        <FormSelect
          name="category"
          value={formData.category || ""}
          onChange={(value) => setFormData({ ...formData, category: value })}
          options={[
            { value: "development", label: "Development" },
            { value: "design", label: "Design" },
            { value: "accessibility", label: "Accessibility" },
          ]}
          label="카테고리"
          placeholder="카테고리 선택"
          size="md"
        />
      </div>

      {/* 내용 */}
      <FormTextarea
        name="content"
        value={formData.content || ""}
        onChange={(value) => setFormData({ ...formData, content: value })}
        label="내용"
        placeholder="게시글 내용을 입력하세요"
        rows={6}
      />
    </div>
  );
}
