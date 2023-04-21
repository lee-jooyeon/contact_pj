import { useLocation, useNavigate } from 'react-router-dom';
import { deleteList } from '../api/firebase';

export default function Detail() {
  const publicUrl = process.env.PUBLIC_URL;
  const {
    state: {
      list: { id, name, group, number, imgUrl },
    },
  } = useLocation();

  const navigate = useNavigate();

  const onDeleteHandler = () => {
    if (window.confirm('Do you really want to delete it?')) {
      deleteList(id);
    }
  };

  return (
    <section>
      <div className='text-center mb-10'>
        <img src={imgUrl} valt='img' className='mx-auto object-cover w-72 h-72' />
      </div>
      <div className='mb-10 text-white text-center text-xl'>
        {name}
        <span className={`${group === 'family' ? 'bg-[#59d58a]' : group === 'friends' ? 'bg-[#65a0d7]' : 'bg-[#d587dd]'}
          ml-3 px-2 inline-block text-[10px] text-white uppercase leading-4 rounded-full`}>
          {group}
        </span>  
      </div>
      <div className='flex justify-around text-center mb-12 text-white'>
        <span className='mt-2.5 text-white'>
          <img
            className='contact_icon'
            src={`${publicUrl}/images/message.png`}
            alt="img"
          />
            Message
        </span>
        <span className='mt-2.5 text-white'>
          <img
            className="contact_icon"
            src={`${publicUrl}/images/call.png`}
            alt="img"
          />
          Message
        </span>
        <span className='mt-2.5 text-white'>
          <img
            className="contact_icon"
            src={`${publicUrl}/images/facetime.png`}
            alt="img"
          />
          Message
        </span>
      </div>
      <div className='py-5 px-3 mx-3 mb-2 text-white bg-[#3f3f52] rounded-lg'>Number 
        <span className='pl-6'>{number}</span>
      </div>
      <div className='flex justify-between mx-2'>
        <button className='bottom_btn text-[#E94141]' onClick={onDeleteHandler}>Delete</button>
        <button className='bottom_btn text-[#278deb]' onClick={() => navigate('/editcontact')}>Edit</button>
      </div>
    </section>
  );
}