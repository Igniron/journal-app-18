import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes, fileUpload } from "../../helpers";
import { addNewEmptyNote, deleteNoteById, savingNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./";


const startNewNote = () =>
{
    return async ( dispatch, getState ) =>
    {

        dispatch( savingNote() );

        const { uid } = getState().auth;


        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );

        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;
        
        
        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );
        
    }
}

const startLoeadingNotes = ()=>
{
    return async( dispatch, getState ) =>
    {
        const { uid } = getState().auth;
        if ( !uid ) throw new Error (`UID doesn't exist`);

        const notes = await loadNotes( uid );

        dispatch ( setNotes( notes ) );
    }
}

const startSavingNote = ()=>
{
    return async ( dispatch, getState )=>
    {
        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active:activeNote } = getState().journal;

        const noteToFirestore = { ...activeNote };
        delete noteToFirestore.id;
        
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ activeNote.id }`)
        await setDoc( docRef, noteToFirestore, { merge: true })

        dispatch( updateNote( activeNote ) );
    }

}

const startUploadingFiles = ( files = [] )=>
{
    return async ( dispatch )=>
    {
        dispatch( setSaving() );

        const fileUploadPromises = [];
        for (const file of files) 
        {
            fileUploadPromises.push( fileUpload( file ) );
        }

        const photosUrls = await Promise.all( fileUploadPromises );

        dispatch( setPhotosToActiveNote( photosUrls ) );
    }
}

const startDeletingNote = ()=>
{
    return async ( dispatch, getState )=>
    {
        const { uid } = getState().auth;
        const { active:activeNote} = getState().journal;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ activeNote.id }`);
        await deleteDoc( docRef );
        

        dispatch( deleteNoteById( activeNote.id ) );
    }
}




export {
    startDeletingNote,
    startLoeadingNotes,
    startNewNote,
    startSavingNote,
    startUploadingFiles,
}