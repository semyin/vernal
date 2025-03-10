import { useMutation, useQueryClient, QueryKey } from "@tanstack/react-query";
import { message } from "antd";

interface UseActionOptions<Variables, Response> {
  fn: (variables: Variables) => Promise<Response>;
  queryKey: QueryKey;
  exact?: boolean;
  successMessage?: string | false; // 允许禁用提示
  errorMessage?: string | false;
  onSuccess?: (data: Response) => void; // 自定义成功回调
  onError?: (error: unknown) => void; // 自定义错误回调
}

export const useAction = <Variables, Response>({
  fn,
  queryKey,
  exact = false,
  successMessage = "操作成功",
  errorMessage = "操作失败",
  onSuccess,
  onError,
}: UseActionOptions<Variables, Response>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fn,
    onSuccess: (data) => {
      if (successMessage !== false) {
        message.success(successMessage);
      }
      queryClient.invalidateQueries({ queryKey, exact });
      onSuccess?.(data);
    },
    onError: (error) => {
      if (errorMessage !== false) {
        message.error(errorMessage + error);
      }
      onError?.(error);
    },
  });
};
