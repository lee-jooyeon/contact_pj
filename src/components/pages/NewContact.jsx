import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { addLists } from '../api/firebase';

import { uploadImage } from '../api/upload';

export default function NewContact() {
  const [contact, setContact] = useState({});

  const [file, setFile] = useState();

  const onSubmitHandler = e => {
    e.preventDefault();
    uploadImage(file).then(url => {
      addLists(contact, url);
    });
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
    <section>
      {file && <img src={URL.createObjectURL(file)} alt='local image' />}
      <form>
        <input
          type='text'
          placeholder='Select your group only for family, friends or work'
          className='input_box'
          name='group'
          required
          value={contact.group ?? ''}
          onChange={onChangeHandler}
        />
        <input
          type='text'
          placeholder='name'
          className='input_box'
          name='name'
          required
          value={contact.name ?? ''}
          onChange={onChangeHandler}
        />
        <input
          type='text'
          placeholder='number'
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
      </form>
      <button onClick={onSubmitHandler}>Add new contact!</button>
    </section>
  );
}
