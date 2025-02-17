import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

interface UseActionOptions<Filters, Variables, Response> {
  fn: (variables: Variables) => Promise<Response>;
  queryKey: string;
  filters?: Filters;
  successMessage?: string;
  errorMessage?: string;
}

export const useAction = <Filters,Variables, Response>({
  fn,
  queryKey,
  filters,
  successMessage = "操作成功",
  errorMessage = "操作失败",
}: UseActionOptions<Filters, Variables, Response>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      message.success(successMessage);
      const queryKeyWithFilters = filters ? [queryKey, filters] : [queryKey];
      queryClient.invalidateQueries({ queryKey: queryKeyWithFilters });
    },
    onError: (error) => {
      message.error(errorMessage + error);
    },
  });
};
