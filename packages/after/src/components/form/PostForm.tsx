// components/form/PostForm.tsx
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInput } from "@/components/form/input";
import { FormTextarea } from "@/components/molecules";
import { FormSelect } from "@/components/form/select";
import { Button } from "@/components/ui/button";

const PostSchema = z.object({
  title: z
    .string()
    .min(5, "제목은 5자 이상이어야 합니다")
    .max(100, "제목은 100자 이하여야 합니다"),
  author: z.string().min(1, "작성자를 입력하세요"),
  category: z.string().min(1, "카테고리를 선택하세요"),
  content: z.string().min(1, "내용을 입력하세요"),
  status: z.enum(["draft", "published", "archived"] as const).default("draft"),
});

export type PostFormValues = z.infer<typeof PostSchema>;

interface PostFormProps {
  defaultValues?: Partial<PostFormValues>;
  onSubmit: (values: PostFormValues) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

export function PostForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = "생성",
}: PostFormProps) {
  const form = useForm<PostFormValues>({
    resolver: zodResolver(PostSchema) as Resolver<PostFormValues>,
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      author: "",
      category: "",
      content: "",
      status: "draft",
      ...defaultValues,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* 상태 값은 기본값으로 제출하도록 hidden 등록 */}
      <input type="hidden" {...register("status")} />

      <FormInput
        label="제목"
        placeholder="게시글 제목을 입력하세요"
        error={errors.title?.message}
        {...register("title")}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="작성자"
          placeholder="작성자명"
          error={errors.author?.message}
          {...register("author")}
        />

        <FormSelect
          label="카테고리"
          placeholder="카테고리 선택"
          size="md"
          options={[
            { value: "development", label: "Development" },
            { value: "design", label: "Design" },
            { value: "accessibility", label: "Accessibility" },
          ]}
          error={errors.category?.message}
          {...register("category")}
        />
      </div>

      <FormTextarea
        label="내용"
        placeholder="게시글 내용을 입력하세요"
        error={errors.content?.message}
        rows={6}
        {...register("content")}
      />

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" size="md" onClick={onCancel}>
          취소
        </Button>
        <Button type="submit" variant="primary" size="md">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
