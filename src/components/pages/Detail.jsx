import { useLocation } from 'react-router-dom';

export default function Detail() {
  const {
    state: {
      list: { name, group, number, imgUrl },
    },
  } = useLocation();

  return (
    <section>
      <div className='text-xl'>{name}</div>
      <div className='img_box'>
        <img src={imgUrl} alt='img' />
      </div>
    </section>
  );
}
