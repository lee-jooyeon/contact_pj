import { useLocation } from "react-router-dom";

export default function Detail() {
  const {
    state: { data },
  } = useLocation();
  const {name, group, number, url} = data;
  console.log(name);
  return <div className='text-xl'>{name}</div>;
}
