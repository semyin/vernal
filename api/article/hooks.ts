import { updatePublishStatus, updateTopStatus } from '#root/api/article';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

// 通用封装
const useUpdateStatus = (
  apiFn: (id: number, params: any) => Promise<any>, // API 函数
  fieldName: string, // 字段名（如 isPublished 或 isTop）
  successMessage: (value: boolean) => string, // 成功提示信息
  errorMessage: string // 错误提示信息
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: number; value: boolean }) =>
      apiFn(params.id, { [fieldName]: params.value }), // 动态字段名
    onSuccess: (_, variables) => {
      console.log('状态更新成功！');
      message.success(successMessage(variables.value));
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
    },
    onError: (error) => {
      console.error('状态更新失败：', error);
      message.error(errorMessage);
    },
  });
};

// 封装 updatePublishStatus
export const useUpdatePublishStatus = () => {
  return useUpdateStatus(
    updatePublishStatus, // API 函数
    'isPublished', // 字段名
    (isPublished) => (isPublished ? '文章已发布' : '文章已取消发布'), // 成功提示信息
    '发布状态更新失败' // 错误提示信息
  );
};

// 封装 updateTopStatus
export const useUpdateTopStatus = () => {
  return useUpdateStatus(
    updateTopStatus, // API 函数
    'isTop', // 字段名
    (isTop) => (isTop ? '文章已置顶' : '文章已取消置顶'), // 成功提示信息
    '置顶状态更新失败' // 错误提示信息
  );
};
