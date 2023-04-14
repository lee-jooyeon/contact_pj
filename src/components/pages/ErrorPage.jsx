import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import ErrorDog from '../../lottie/error-doggy.json';

export default function ErrorPage(){
  const navigate = useNavigate();

  return(
    <div className="flex justify-center h-screen">
      <ul className="self-center text-center">
        <li className="text-white text-7xl font-medium">
          404
          <Lottie
            className="w-full h-64"
            options={{
              loop: true,
              autoplay: true,
              animationData: ErrorDog,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}          
          />
          <span
            className="block text-2xl mb-5"
          >
            Page Not Found
          </span>
          <span className="block text-base">
            The page you were looking for does not exist anymore.
          </span>
        </li>
        <button
          className="bg-[#4b61cf] text-white mt-9 w-52 h-16 rounded-full text-xl text-center font-medium"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </ul>
    </div>
  )
}