import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "../../apis/firebase";

const AuthContext = createContext();

export function AuthContextProvider({children}){
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
      console.log(user);
    })
  }, [user]);
  
  

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext(){
  return useContext(AuthContext);
}