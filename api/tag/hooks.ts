import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTag } from "./index";
import { Filters } from "./type";
import { message } from "antd";

export const useDeleteTag = (filters: Filters) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      message.success("删除成功");
      queryClient.invalidateQueries({ queryKey: ["admin-tags", filters] });
    },
    onError: () => {
      message.error("删除失败");
    },
  });
};
