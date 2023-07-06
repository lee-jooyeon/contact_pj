import { useState } from 'react';
import Header from '../components/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { uploadImage } from '../api/upload';
import useDeleteContact from '../hooks/mutations/useDeleteContact';
import useUpdateContact from '../hooks/mutations/useUpdateContact';

export default function Detail() {
  const publicUrl = process.env.PUBLIC_URL;
  const navigate = useNavigate();
  const {
    state: {
      list: { id, group, name, number, imgUrl },
    },
  } = useLocation();
  const [file, setFile] = useState();
  const [edit, setEdit] = useState(false);
  const [newUserData, setNewUserData] = useState({
    group,
    name,
    number,
    imgUrl,
  });
  const [success, setSuccess] = useState();
  const { mutate: updateContact } = useUpdateContact();
  const { mutate: removeContact } = useDeleteContact();

  const onChangeText = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    if (edit) {
      setNewUserData({
        ...newUserData,
        [name]: value,
      });
    }
  };

  const onSubmitText = (e) => {
    e.preventDefault();
    try {
      if (file) {
        uploadImage(file).then((url) => {
          updateContact({ id, newUserData, url }, {
            onSuccess: () => {
              setSuccess('Updated a contact!');
              setTimeout(() => {
                setSuccess(null);
              }, 900);
            }
          });
        });
      } else {
        updateContact({ id, newUserData }, {
          onSuccess: () => {
            setSuccess('Updated a contact!');
            setTimeout(() => {
              setSuccess(null);
            }, 900);
          }
        });
      }
      setEdit(!edit);
      navigate('/contacts');
    } catch (error) {
      console.log(error);
    }
  };

  const onEditSubmit = () => {
    setEdit((prev) => !prev);
  };

  const onDeleteHandler = () => {
    if (window.confirm('Do you really want to delete it?')) {
      removeContact(id, {
        onSuccess: () => {
          setSuccess('Deleted!');
          setTimeout(() => {
            setSuccess(null);
          }, 900);
        }
      });
      setTimeout(() => {
        navigate('/contacts');
      }, 1000);
    }
  };

  return (
    <>
      <Header
        headerLeft
        headerRight
        handleLeftButton={() => navigate(-1)}
        handleRightButton={() => navigate('/newcontact')}
      />
      <section className='mx-3'>
        {success && <p className='fixed mx-auto inset-x-0 top-8 z-50 w-[18.75rem] rounded-2xl bg-[#3f3f52] p-3 opacity-80 text-white'>✅ {success}</p>}
        {edit ? (
          <form className='flex flex-col mt-7'>
            {file && file ? (
              <div className='text-center mb-10'>
                <img
                  src={URL.createObjectURL(file)}
                  alt='local image'
                  className='mx-auto w-48 h-48 object-contain'
                />
              </div>
            ) : (
              <div className='text-center mb-10'>
                <img
                  src={imgUrl}
                  alt='img'
                  className='mx-auto mb-5 object-contain w-64 h-64'
                />
              </div>
            )}
            <input
              type='text'
              className='input_box'
              name='group'
              placeholder='family, friends or work'
              value={newUserData.group ?? ''}
              onChange={onChangeText}
            />
            <input
              type='text'
              placeholder='name'
              className='input_box'
              name='name'
              value={newUserData.name ?? ''}
              onChange={onChangeText}
            />
            <input
              type='text'
              placeholder='number'
              className='input_box'
              name='number'
              value={newUserData.number ?? ''}
              onChange={onChangeText}
            />
            <input
              type='file'
              accept='image/*'
              className='input_box'
              name='file'
              onChange={onChangeText}
            />
          </form>
        ) : (
          <div>
            <div className='text-center mb-10'>
              {file && file ? (
                <div className='text-center mb-10'>
                  <img
                    src={URL.createObjectURL(file)}
                    alt='local image'
                    className='mx-auto w-48 h-48 object-contain'
                  />
                </div>
              ) : (
                <div className='text-center mb-10'>
                  <img
                    src={imgUrl}
                    alt='img'
                    className='mx-auto mb-5 object-contain w-64 h-64'
                  />
                </div>
              )}
            </div>
            <div className='mb-10 text-white text-center text-xl'>
              {newUserData.name}
              <span
                className={`${
                  group === 'family'
                    ? 'bg-[#59d58a]'
                    : group === 'friends'
                      ? 'bg-[#65a0d7]'
                      : 'bg-[#d587dd]'
                  }
                ml-3 px-2 inline-block text-[10px] text-white uppercase leading-4 rounded-full`}
              >
                {newUserData.group}
              </span>
            </div>
            <div className='flex justify-around text-center mb-12 text-white'>
              <span className='mt-2.5 text-white'>
                <img
                  className='contact_icon'
                  src={`${publicUrl}/images/message.png`}
                  alt='img'
                />
                Message
              </span>
              <span className='mt-2.5 text-white'>
                <img
                  className='contact_icon'
                  src={`${publicUrl}/images/call.png`}
                  alt='img'
                />
                Call
              </span>
              <span className='mt-2.5 text-white'>
                <img
                  className='contact_icon'
                  src={`${publicUrl}/images/facetime.png`}
                  alt='img'
                />
                FaceTime
              </span>
            </div>
            <div className='py-5 px-3 mx-3 mb-2 text-white bg-[#3f3f52] rounded-lg'>
              Number
              <span className='pl-6'>{newUserData.number}</span>
            </div>
          </div>
        )}
        {edit ? (
          <button
            onClick={onSubmitText}
            className='py-5 px-3 mb-2 w-full bg-[#3f3f52] rounded-lg text-[#278deb]'
          >
            Update!
          </button>
        ) : (
          <div className='flex justify-between mx-2'>
            <button
              className='bottom_btn text-[#E94141]'
              onClick={onDeleteHandler}
            >
              Delete
            </button>
            <button className='bottom_btn text-[#278deb]' onClick={onEditSubmit}>
              Edit
            </button>
          </div>
        )}
      </section>
    </>
  );
}
