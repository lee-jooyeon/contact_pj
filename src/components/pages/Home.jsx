import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const publicUrl = process.env.PUBLIC_URL;

  const onClickHandle = () => {
    navigate(`/contacts`);
  };

  return (
    <div className='mt-40 mx-4 pb-4 border-b border-[#eeeeee] text-center mt-'>
      <img
        src={`${publicUrl}/images/emoji_.png`}
        alt='image'
        className='w-24- h-32 mx-auto my-0'
      />
      <span className='block mt-4 text-white'>JOOYEON</span>
      <button className='contact_btn' onClick={onClickHandle}>
        Contacts
      </button>
    </div>
  );
}
