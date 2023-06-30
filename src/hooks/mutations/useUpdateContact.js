import { updateList } from '../../api/firebase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateContact = (id, newText, url) => {
  const queryClient = useQueryClient();

  return useMutation(['useUpdateContact', id], () => updateList(id, newText, url),
   {
    onMutate: async () => {
      await queryClient.cancelQueries(['useUpdateContact', id]);
      const previousContact = queryClient.getQueryData(['useGetContact', id]);
      queryClient.setQueryData(['useGetContact', id], (previousContact) => {
        return {
          ...previousContact,
          newText,
        };
      });
      return { previousContact };
      },
      onError: (id, context) => {
        queryClient.setQueryData(['useGetContact', id], context.previousContact);
      },
      onSettled: () => {
        queryClient.invalidateQueries(['useGetContact', id]);
      },
   },
  );
};

export default useUpdateContact;