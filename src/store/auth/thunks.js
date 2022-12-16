import { loginWhithEmailPassword, logoutFirebase, registerUserWhithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, logout, login } from "./"

const checkingAuthentication = (email, password) =>
{
    return async( dispatch ) =>
    {
        dispatch( checkingCredentials() );
    }
}

const startGoogleSingIn = () =>
{
    return async( dispatch ) =>
    {
        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();
        
        if ( !result.ok )
        {
          return dispatch ( logout( result.errorMessage ) );
        }

        dispatch ( login ( result ) );
    }
}

const startCreatingUserWithEmailPassword = ({ email, password, displayName }) =>
{
    return async (dispatch) => 
    {
        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWhithEmailPassword({ email, password, displayName});

        if ( !ok ) return dispatch( logout( { errorMessage } ) );

        dispatch ( login ( { uid, displayName, email, photoURL} ) );
    }
}

const startLoginWhithEmailPassword = ({ email , password }) =>
{
    return async( dispatch )=>
    {
        dispatch( checkingCredentials() );

        const result = await loginWhithEmailPassword({ email, password });
        console.log(result);

        if ( !result.ok ) return dispatch( logout( result ) );

        dispatch ( login( result ) );
    }
}

const startLogout = () =>
{
    return async ( dispatch ) =>
    {
        await logoutFirebase();

        dispatch( clearNotesLogout() );
        dispatch ( logout() );
    }
}




export {
    checkingAuthentication,
    startCreatingUserWithEmailPassword,
    startGoogleSingIn,
    startLoginWhithEmailPassword,
    startLogout,
}