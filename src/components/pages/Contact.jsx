import { useQuery } from "@tanstack/react-query";
import { getData } from "../../firebase";
import ContactItem from "../ContactItem";

export default function Contact(){
  const { isLoading, error, data: contacts } = useQuery(['contacts'], getData);

  console.log(contacts && contacts)

  return(
    <ul>
      {/* {lists?.map((data) => <ContactItem key={data.id} data={data} />)} */}
    </ul>
  )
}