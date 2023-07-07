import { updateList } from '../../apis/firebase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation(({id, newUserData, url}) => updateList(id, newUserData, url),
   {
    // onMutate returns context that is passed to onError
    onMutate: async ({id, newUserData}) => {
      // cancel any outgoing queries for data, so old server data doesn't overwrite our optimistic update
      await queryClient.cancelQueries(['useUpdateContact', id]);

      // snapshot of previous value 
      const previousContact = queryClient.getQueryData(['useGetContact', id]);

      // optimistically update the cache with new value 
      queryClient.setQueryData(['useGetContact', id], {...previousContact, newUserData});

      // return context object with snapshotted value (previous value, cache before update)
      return { previousContact };
      },
      onError: (context) => {
        queryClient.setQueryData(['useGetContact'], context.previousContact);
      },
      onSettled: () => {
        // invlidate user query to make sure we're in sync with server data. (update)
        queryClient.invalidateQueries(['useGetContact']);
      },
    },
  );
};

export default useUpdateContact;