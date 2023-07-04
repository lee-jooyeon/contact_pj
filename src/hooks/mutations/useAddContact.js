
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLists } from "../../api/firebase";

const useAddContact = () => {
  const queryClient = useQueryClient();

  return useMutation(({userData, url}) => addLists(userData, url),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['useGetContact'])
      },
    },
  )
}

export default useAddContact;
