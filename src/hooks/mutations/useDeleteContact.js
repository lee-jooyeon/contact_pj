import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteList } from "../../apis/firebase";

const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation((id) => deleteList(id), 
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['useGetContact'])
      },
    },
  )
}

export default useDeleteContact;