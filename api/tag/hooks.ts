import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTag, deleteTag, updateTag } from "./index";
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

export const useCreateTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      message.success("保存成功");
      queryClient.invalidateQueries({ queryKey: ["admin-tags"] });
    },
    onError: (error) => {
      message.error("保存失败" + error);
    },
  });
};

export const useUpdateTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }: { id: number, name: string }) => updateTag(id, { name }),
    onSuccess: () => {
      message.success("保存成功");
      queryClient.invalidateQueries({ queryKey: ["admin-tags"] });
    },
    onError: (error) => {
      message.error("保存失败" + error);
    },
  });
};
