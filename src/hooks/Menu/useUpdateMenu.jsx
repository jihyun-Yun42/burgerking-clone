import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../axios/api';
import { keys } from '../../utils/createQueryKey';

export const useUpdateMenu = () => {
  const queryClinet = useQueryClient();

  const {
    mutate: updateMenu,
    status: updateStatus,
    reset,
  } = useMutation({
    // mutationFn: async ({ formData, title, category, price, id }) => {
    mutationFn: async ({ formData, id }) => {
      const { data } = await api.patch(
        `/api/update/${id}`,
        // { formData, title, category, price },
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClinet.invalidateQueries({ queryKey: keys.GET_MENU }); // GET 요청을 다시함
    },
  });

  return { updateMenu, updateStatus, reset };
};
