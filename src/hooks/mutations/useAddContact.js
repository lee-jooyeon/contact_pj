
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLists } from "../../api/firebase";

const useAddContact = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(({contact, url}) => addLists(contact, url),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['useGetContact'])
      },
    },
  )
  return mutate;
}

export default useAddContact;
