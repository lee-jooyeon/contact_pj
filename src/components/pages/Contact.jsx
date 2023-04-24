import { useQuery } from '@tanstack/react-query';
import { getLists } from '../api/firebase';
import ContactItem from '../ContactItem';
import ErrorPage from './ErrorPage';

export default function Contact() {
  const {
    isLoading,
    error,
    data: lists,
  } = useQuery(['lists'], getLists, {
    refetchOnMount: true,
  }); //useQuery 첫번째 인자로 캐시를 위한 키를 전달 ['lists']

  console.log(lists && lists);

  if (isLoading) return 'loading...';
  if (error) return <ErrorPage />;

  return (
    <ul>
      {lists && lists.map(list => <ContactItem key={list.id} list={list} />)}
    </ul>
  );
}
