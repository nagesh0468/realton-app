import { createContext,useContext,useState,useEffect } from "react";
import {auth,} from "../firebase";
// import {doc,setDoc,serverTimestamp} from "firebase/firestore";
import { createUserWithEmailAndPassword, onAuthStateChanged,signInWithEmailAndPassword,signOut } from "firebase/auth";




const useAuth = () => {
    const value = useContext(AuthContext);
    return value;
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

        useEffect(()=>{
            const unsubscribe = onAuthStateChanged(auth,  (user) => {
                    if(user){
                    setUser(user);

                    }
            });
        },[]);

        const handleSignUp = async ({email,password,name}) => {
            user = await createUserWithEmailAndPassword(auth,email,password);
            setUser(user);
        }

        const handleSignIn = async ({email,password}) => {
        const {user} = await signInWithEmailAndPassword(auth,email,password);
            setUser(user);
        }

        const handleSignOut = async () => {
        const {user} = await signOut(auth);
        setUser(null);
        }

       
    return <AuthContext.Provider value={{
        user,handleSignIn,
        handleSignUp,
        handleSignOut,
       
        
    }}>
        {children}
    </AuthContext.Provider>
};

export {  AuthProvider,useAuth };
 
