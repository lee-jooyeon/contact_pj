import { useQuery } from "@tanstack/react-query";
import { getLists } from "../../apis/firebase";

const useGetContact = () => {
    return useQuery(['useGetContact'], () => getLists(), {staleTime: 1000 * 60})
}

export default useGetContact;