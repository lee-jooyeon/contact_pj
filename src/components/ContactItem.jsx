import { useNavigate } from 'react-router-dom';
import { deleteList } from './api/firebase';

export default function ContactItem({ list }) {
  const { name, group, number, id } = list;
  const navigate = useNavigate();

  const onDeleteHandler = () => {
    if (window.confirm('Do you really want to delete it?')) {
      deleteList(id);
    }
  };

  return (
    <section>
      <li
        className='relative flex py-4 mx-4 text-white'
        onClick={() => navigate(`/contacts/${id}`, { state: { list } })}
      >
        <span className='text-black bg-[#eeeeee] inline-block w-12 h-12 text-center leading-[3rem] rounded-full text-sm'>
          {name}
        </span>
        <span className='pl-4 self-center text-white text-sm flex-1 mb-5'>
          {number}
        </span>
        <div
          className={`${
            group === 'family'
              ? 'bg-[#59d58a]'
              : group === 'friends'
              ? 'bg-[#65a0d7]'
              : 'bg-[#d587dd]'
          }
      mr-2.5 absolute self-center left-14 top-11 w-14 text-[10px] text-center text-white uppercase leading-4 rounded-full`}
        >
          {group}
        </div>
      </li>
      <button className='text-white' onClick={onDeleteHandler}>
        삭제
      </button>
    </section>
  );
}
