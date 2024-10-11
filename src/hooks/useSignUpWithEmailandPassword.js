import { auth, firestore } from '../Firebase/Firebase';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { doc, setDoc } from 'firebase/firestore';

const useSignUpWithEmailandPassword = () => {

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

      const signup = async (inputs) => {
        if(!inputs.email || !inputs.password || !inputs.username || !inputs.fullname){
          console.log("Please fill the all the fields")
        return
      }
        try {
          const newUser = await createUserWithEmailAndPassword(inputs.email,inputs.password)
          if(!newUser && error ){
            console.log(error)
            return
          }
          if(newUser){
            const userDoc ={
              uid: newUser.user.uid,
              email: inputs.email,
              username: inputs.username,
              fullname: inputs.fullname,
              bio:"",
              profilePicURL:"",
              followers:[],
              following:[],
              posts:[],
              createdAt:Date.now()
            }
            await setDoc(doc(firestore, "users",newUser.user.uid), userDoc);
            localStorage.setItem("user-info",JSON.stringify(userDoc))
          }
        } catch (error) {
          console.log(error)
        }
      };

  return  {loading,error,signup};
}

export default useSignUpWithEmailandPassword