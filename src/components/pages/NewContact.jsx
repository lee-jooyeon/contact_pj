import { useState } from 'react';
import { addLists } from '../api/firebase';

import { uploadImage } from '../api/upload';

export default function NewContact() {
  const publicUrl = process.env.PUBLIC_URL;
  const [contact, setContact] = useState({});
  const [file, setFile] = useState();

  const onSubmitHandler = e => {
    e.preventDefault();
    uploadImage(file)
      .then(url => {
        addLists(contact, url);
      })
      .then(alert('Added new contact!'))
      .catch(error => console.log(error));
  };

  const onChangeHandler = e => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    setContact(contact => ({
      ...contact,
      [name]: value,
    }));
  };

  return (
    <section className='mt-5'>
      {file && file ? (
        <img
          src={URL.createObjectURL(file)}
          alt='local image'
          className='mx-auto w-36 h-36 object-cover'
        />
      ) : (
        <img
          src={`${publicUrl}/images/lists/user.png`}
          alt='contact-img'
          className='mx-auto w-32 h-32 object-cover rounded-full'
        />
      )}
      <form className='flex flex-col mt-7 mx-3'>
        <input
          type='text'
          placeholder='family, friends or work'
          className='input_box'
          name='group'
          required
          value={contact.group ?? ''}
          onChange={onChangeHandler}
        />
        <input
          type='text'
          placeholder='Name'
          className='input_box'
          name='name'
          required
          value={contact.name ?? ''}
          onChange={onChangeHandler}
        />
        <input
          type='text'
          placeholder='Number'
          className='input_box'
          name='number'
          required
          value={contact.number ?? ''}
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
        >
          Add new contact!
        </button>
      </form>
    </section>
  );
}
