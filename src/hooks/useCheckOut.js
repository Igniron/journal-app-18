import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { startLoeadingNotes } from "../store/journal";

export const useCheckOut = () => {
  
    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    useEffect(() => {
    
    onAuthStateChanged( FirebaseAuth, async ( user ) =>
    {
      if ( !user ) return dispatch ( logout() );
      const { uid, email, displayName, photoURL } = user;
      dispatch( login({ uid, email, displayName, photoURL } ));
      dispatch( startLoeadingNotes() );
    });
   
  }, []);

  return {
    status,
  }
}
