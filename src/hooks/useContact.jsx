import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLists, addLists, updateList, deleteList } from '../api/firebase';


export default function useContact(){
  const queryClient = useQueryClient();

  // mutation 할 때 인자로 객체를 받는다, {contact, url} contact, url 의 인자를 낱개로 받아온다. 
  const addNewContact = useMutation(({contact, url}) => addLists(contact, url), {
    onSuccess: () => queryClient.invalidateQueries(['useGetContact']),
  });

  const updateContact = useMutation(({ id, newText, url }) => updateList(id, newText, url),
    {
      onMutate: async ({ id, newText }) => {
        await queryClient.cancelQueries(['useUpdateContact', id]);
  
        const previousContact = queryClient.getQueryData(['useGetContact', id]);
  
        queryClient.setQueryData(['useGetContact', id], { ...previousContact, newText });
  
        return { previousContact };
      },
      onError: (id, context) => {
        queryClient.setQueryData(['useGetContact', id], context.previousContact);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['useGetContact'] })
      },
    }
  );
  
  const removeContact = useMutation(
    (id) => deleteList(id), {
      onSuccess: () => {
        queryClient.invalidateQueries(['lists'])
      },
    },
  )
  return { addNewContact, updateContact, removeContact }
}