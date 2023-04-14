import { useNavigate } from "react-router-dom";

export default function ContactItem({data}){
    const {name, group, number} = data;
    const navigate = useNavigate();

  return(
    <li className="relative flex py-4 mx-4 text-white" onClick={() => navigate(`/contacts/${name}`, {state: {data}})}> 
    <span className="text-black bg-[#eeeeee] inline-block w-12 h-12 text-center leading-[3rem] rounded-full text-sm">
      {name}
    </span>
    <span className="pl-4 self-center text-white text-sm flex-1 mb-5">
      {number}
    </span>
    <div className={`${group === 'family' ? 'bg-[#59d58a]' : group === 'friends' ? 'bg-[#65a0d7]' : 'bg-[#d587dd]'} 
      mr-2.5 absolute self-center left-14 top-11 w-14 text-[10px] text-center text-white uppercase leading-4 rounded-full`}>
      {group}
    </div>
    </li>
  )
}