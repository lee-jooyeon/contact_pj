import { useQuery } from '@tanstack/react-query';
import { getLists } from '../api/firebase';


export default function useGetContact(){
  return useQuery(['useGetContact'], () => getLists());
}