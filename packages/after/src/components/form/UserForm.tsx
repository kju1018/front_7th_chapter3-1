// components/form/UserForm.tsx

import { FormInput } from "@/components/form/input";
import { FormSelect } from "@/components/form/select";

interface UserFormProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function UserForm({ formData, setFormData }: UserFormProps) {
  return (
    <div className="space-y-4">
      {/* 사용자명 */}
      <FormInput
        name="username"
        value={formData.username || ""}
        onChange={(value) => setFormData({ ...formData, username: value })}
        label="사용자명"
        placeholder="사용자명을 입력하세요"
        required
      />

      {/* 이메일 */}
      <FormInput
        name="email"
        value={formData.email || ""}
        onChange={(value) => setFormData({ ...formData, email: value })}
        label="이메일"
        placeholder="이메일을 입력하세요"
        type="email"
        required
      />

      {/* 역할 + 상태 */}
      <div className="grid grid-cols-2 gap-4">
        <FormSelect
          name="role"
          value={formData.role || "user"}
          onChange={(value) => setFormData({ ...formData, role: value })}
          options={[
            { value: "user", label: "사용자" },
            { value: "moderator", label: "운영자" },
            { value: "admin", label: "관리자" },
          ]}
          label="역할"
          size="md"
        />

        <FormSelect
          name="status"
          value={formData.status || "active"}
          onChange={(value) => setFormData({ ...formData, status: value })}
          options={[
            { value: "active", label: "활성" },
            { value: "inactive", label: "비활성" },
            { value: "suspended", label: "정지" },
          ]}
          label="상태"
          size="md"
        />
      </div>
    </div>
  );
}
