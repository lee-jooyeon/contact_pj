
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLists } from "../../api/firebase";

const useAddContact = () => {
  const queryClient = useQueryClient();

  return useMutation(['useAddContact'], (contact) => addLists(contact),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['useAddContact'])
      },
    },
  );
}

export default useAddContact ;