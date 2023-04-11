import { useEffect, useState } from "react";
import {  collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import ContactItem from "../ContactItem";

export default function Contact(){
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const FetchData = async () => {
      await getDocs(collection(db,'contacts'))
        .then((querySnapshot) => {
          const contactData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
          setLists(contactData);
          console.log(lists, contactData);
      });
    }
    FetchData();
   }, []);


  return(
    <ul>
      {lists?.map((data) => <ContactItem key={data.id} data={data} />)}
    </ul>
  )
}