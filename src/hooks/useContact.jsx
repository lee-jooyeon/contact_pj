import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLists, addLists, updateList, deleteList } from '../api/firebase';


export default function useContact(){
  const queryClient = useQueryClient();

  const contactQuery = useQuery(['lists'], getLists, {staleTime: 1000 * 60});

  const addContact = useMutation(
    ({contact, url}) => addLists(contact, url),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['lists'])
      },
    },
  );

  const updateContact = useMutation(
    ({ id, newText, url }) => updateList(id, newText, url),
    {
      onMutate: async ({ id, newText }) => {
        await queryClient.cancelQueries(['lists', id]);
  
        const previousContact = queryClient.getQueryData(['lists', id]);
  
        queryClient.setQueryData(['lists', id], { ...previousContact, newText });
  
        return { previousContact };
      },
      onError: (error, id, context) => {
        queryClient.setQueryData(['lists', id], context.previousContact);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['lists'] })
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
  return { contactQuery, addContact, updateContact, removeContact }
}