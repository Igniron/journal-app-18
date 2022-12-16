import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => 
{
    try 
    {
        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        // const user = result.user;
        
        const {displayName, email, photoURL, uid} = result.user;

        return {
            ok: true,
            //User info
            displayName, email, photoURL, uid,
        }
        
    } 
    catch (error) 
    {
        // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage,
        }
    }
}

const registerUserWhithEmailPassword = async ({ email, password, displayName }) => 
{
    try 
    {
        // console.log({ email, password, displayName});

        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;
        
        console.log(resp.user);
        await updateProfile( FirebaseAuth.currentUser, { displayName } );

        return{
            ok: true,
            uid, photoURL, email, displayName,
        }
    } 
    catch (error) 
    {
        console.log(error);
        return {ok: false, errorMessage: error.message};
    }
}

const loginWhithEmailPassword = async ({ email, password })=>
{
    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName} = resp.user;

        return{
            ok: true,
            uid, photoURL, displayName,
        }
    } 
    catch (error) {
        console.log(error);
        return {ok: false, errorMessage: error.message};
    }
}

const logoutFirebase = async () =>
{
    return await FirebaseAuth.signOut();
}


export {
    signInWithGoogle,
    registerUserWhithEmailPassword,
    loginWhithEmailPassword,
    logoutFirebase,
}