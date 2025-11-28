// components/form/UserForm.tsx
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInput } from "@/components/form/input";
import { FormSelect } from "@/components/form/select";
import { Button } from "@/components/ui/button";

export const UserSchema = z.object({
  username: z
    .string()
    .min(3, "사용자명은 3자 이상이어야 합니다")
    .max(20, "사용자명은 20자 이하여야 합니다")
    .regex(/^[a-zA-Z0-9_]+$/, "영문, 숫자, 언더스코어만 사용 가능합니다")
    .refine(
      (v) =>
        !["admin", "root", "system", "administrator"].includes(
          v.toLowerCase(),
        ),
      "예약된 사용자명입니다",
    ),

  email: z
    .string()
    .email("올바른 이메일 형식이 아닙니다")
    .refine(
      (v) =>
        v.endsWith("@company.com") ||
        v.endsWith("@example.com"),
      "회사 이메일(@company.com 또는 @example.com)만 사용 가능합니다",
    ),

  role: z.enum(["admin", "moderator", "user"] as const),

  status: z.enum(["active", "inactive", "suspended"] as const),
});

export type UserFormValues = z.infer<typeof UserSchema>;

interface UserFormProps {
  defaultValues?: Partial<UserFormValues>;
  onSubmit: (values: UserFormValues) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

export function UserForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel,
}: UserFormProps) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(UserSchema) as Resolver<UserFormValues>,
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: defaultValues ?? {
      username: "",
      email: "",
      role: "user",
      status: "active",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const isEditMode = defaultValues && (defaultValues.username || defaultValues.email);

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="사용자명"
        placeholder="사용자명을 입력하세요"
        error={errors.username?.message}
        {...register("username")}
      />

      <FormInput
        label="이메일"
        placeholder="이메일을 입력하세요"
        error={errors.email?.message}
        {...register("email")}
      />

      <FormSelect
        label="권한"
        placeholder="권한 선택"
        size="md"
        options={[
          { value: "admin", label: "관리자" },
          { value: "moderator", label: "운영자" },
          { value: "user", label: "사용자" },
        ]}
        error={errors.role?.message}
        {...register("role")}
      />

      <FormSelect
        label="상태"
        placeholder="상태 선택"
        size="md"
        options={[
          { value: "active", label: "활성" },
          { value: "inactive", label: "비활성" },
          { value: "suspended", label: "정지" },
        ]}
        error={errors.status?.message}
        {...register("status")}
      />

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" size="md" onClick={onCancel}>
          취소
        </Button>
        <Button type="submit" variant="primary" size="md">
          {submitLabel ?? (isEditMode ? "수정 완료" : "생성")}
        </Button>
      </div>
    </form>
  );
}
