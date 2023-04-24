import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { deleteList } from '../api/firebase';
import { updateList } from '../api/firebase';
import { uploadImage } from '../api/upload';

export default function Detail() {
  const publicUrl = process.env.PUBLIC_URL;
  const {
    state: {
      list: { id, group, name, number, imgUrl },
    },
  } = useLocation();
  const [file, setFile] = useState();
  const [edit, setEdit] = useState(false);
  const [newText, setNewText] = useState({
    group,
    name,
    number,
    imgUrl,
  });
  console.log(newText);

  const onChangeText = e => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    if (edit) {
      setNewText({
        ...newText,
        [name]: value,
      });
    }
  };

  const onSubmitText = e => {
    e.preventDefault();
    try {
      if (file) {
        uploadImage(file).then(url => {
          updateList(id, newText, url);
        });
      } else {
        updateList(id, newText);
      }
      alert('Updated a contact!');
      setEdit(!edit);
    } catch (error) {
      console.log(error);
    }
  };

  const onEditSubmit = () => {
    setEdit(prev => !prev);
  };

  const onDeleteHandler = () => {
    if (window.confirm('Do you really want to delete it?')) {
      deleteList(id);
    }
  };

  return (
    <section>
      {edit ? (
        <form className='flex flex-col mt-7 mx-3'>
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
            required
            value={newText.group ?? ''}
            onChange={onChangeText}
          />
          <input
            type='text'
            placeholder='name'
            className='input_box'
            name='name'
            required
            value={newText.name ?? ''}
            onChange={onChangeText}
          />
          <input
            type='text'
            placeholder='number'
            className='input_box'
            name='number'
            required
            value={newText.number ?? ''}
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
            {newText.name}
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
              {newText.group}
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
              Message
            </span>
            <span className='mt-2.5 text-white'>
              <img
                className='contact_icon'
                src={`${publicUrl}/images/facetime.png`}
                alt='img'
              />
              Message
            </span>
          </div>
          <div className='py-5 px-3 mx-3 mb-2 text-white bg-[#3f3f52] rounded-lg'>
            Number
            <span className='pl-6'>{newText.number}</span>
          </div>
        </div>
      )}

      {edit ? (
        <button
          onClick={onSubmitText}
          className='py-5 px-3 mx-3 mb-2 w-[360px] bg-[#3f3f52] rounded-lg text-[#278deb]'
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
  );
}
