import { useState } from 'react';
import { uploadImage } from '../apis/upload';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import useAddContact from '../hooks/mutations/useAddContact';

export default function NewuserData() {
  const publicUrl = process.env.PUBLIC_URL;
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const { mutate: addContact } = useAddContact();

  const onChangeHandler = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    setUserData((userData) => ({
      ...userData,
      [name]: value,
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setIsUploading(true);
    if(!file) {
      alert('Add a image!');
      return;
    }
    uploadImage(file)
      .then((url) => {
        addContact({ userData, url }, {
          onSuccess: () => {
            setSuccess('Added new userData!');
            setTimeout(() => {
              setSuccess(null);
            }, 900);
          }
        });
        setTimeout(() => {
          navigate('/contacts');
        }, 1000);
      })
      .then(() => setIsUploading(false))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Header
        headerLeft
        handleLeftButton={() => navigate(-1)}
      />
      <section className='mt-5'>
        {success && <p className='fixed mx-auto inset-x-0 top-8 z-50 w-[18.75rem] rounded-2xl bg-[#3f3f52] p-3 opacity-80 text-white'>✅ {success}</p>}
        {file && file ? (
          <img
            src={URL.createObjectURL(file)}
            alt='local image'
            className='mx-auto w-36 h-36 object-cover'
          />
        ) : (
          <img
            src={`${publicUrl}/images/lists/user.png`}
            alt='userData-img'
            className='mx-auto w-32 h-32 object-cover rounded-full'
          />
        )}
        <form className='flex flex-col mt-7'>
          <input
            type='text'
            placeholder='Family, Friends or Work'
            className='input_box'
            name='group'
            required
            value={userData.group ?? ''}
            onChange={onChangeHandler}
          />
          <input
            type='text'
            placeholder='Name'
            className='input_box'
            name='name'
            required
            value={userData.name ?? ''}
            onChange={onChangeHandler}
          />
          <input
            type='text'
            placeholder='Number'
            className='input_box'
            name='number'
            required
            value={userData.number ?? ''}
            onChange={onChangeHandler}
          />
          <input
            type='file'
            accept='image/*'
            required
            className='input_box'
            name='file'
            onChange={onChangeHandler}
          />
          <button
            className='mb-6 py-6 px-3 bg-[#3f3f52] text-[#90ffa1] rounded-lg'
            onClick={onSubmitHandler}
            disabled={isUploading}
          >
            Add New Contact!
          </button>
        </form>
      </section>
    </>
  );
}
