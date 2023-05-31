import { useState } from 'react';
import { uploadImage } from '../../api/upload';
import { useNavigate } from 'react-router-dom';
import useContact from '../../hooks/useContact';

export default function NewContact() {
  const publicUrl = process.env.PUBLIC_URL;
  const navigate = useNavigate();
  const [contact, setContact] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const { addContact } = useContact();

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

  const onSubmitHandler = e => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file)
      .then(url => {
        addContact.mutate(
          {contact, url},
          {
            onSuccess: () => {
              setSuccess('Added new contact!');
              setTimeout(() => {
                setSuccess(null);
              }, 300);
            } 
          }
        );
      })
      .then(() => setIsUploading(false))
      .catch(error => console.log(error));
      navigate('/contacts');
  };

  return (
    <section className='mt-5'>
      {success && <p className='my-2'>✅ {success}</p>}
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
          disabled={isUploading}
        >
          Add new contact!
        </button>
      </form>
    </section>
  );
}
