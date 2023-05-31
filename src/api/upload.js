import axios from 'axios';

export async function uploadImage(file) {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
  try {
    const res = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data.url;
  } catch (error) {
    console.log(error);
  }
}
