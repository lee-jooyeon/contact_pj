import { MdOutlineArrowBackIosNew, MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();

  const NavigateBack = () => {
    navigate(-1);
  }

  return (
    <nav className='py-4 px-2.5 flex justify-between'>
      <span className='self-center' onClick={NavigateBack}>
        {/* 맨처음 렌더링 됐을 땐 안 보였다가 다른 페이지 랜딩했을 때 보여주기 */}
        <MdOutlineArrowBackIosNew className='text-white w-5 h-5' />
      </span>
      <div className='leading-8 font-medium text-white self-center'>
        Contacts
      </div>
      <span className='self-center'>
        <MdAdd className='text-white w-8 h-8' />
      </span>
    </nav>
  );
}
