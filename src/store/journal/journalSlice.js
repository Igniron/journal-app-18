import { Note, Satellite } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';


export const journalSlice = createSlice({
    name: 'journal',
    initialState:{
        isSaving: false,
        messageSave: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imageUrls: [], // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
        // }
    },
    reducers: {
        addNewEmptyNote: ( state, action ) =>
        {
            state.notes.push( action.payload );

            state.isSaving = false;
        },
        setActiveNote: ( state, action ) =>
        {
            state.active = action.payload;
            state.messageSave = '';
        },
        setNotes: ( state, action ) =>
        {
            state.notes = action.payload;
        },
        setSaving: ( state ) =>
        {
            state.isSaving = true;
            state.messageSave = '';
            //TODO: mensaje de error
        },
        updateNote: ( state, action) =>
        {
            state.isSaving = false;
            state.notes = state.notes.map( note => {

                if ( note.id === action.payload.id)
                {
                    return action.payload;
                }

                return note;
            });

           state.messageSave = `${ action.payload.title }: successfully updated`;
        },
        setPhotosToActiveNote: ( state, action )=>
        {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload ];
            state.isSaving = false;
        },
        clearNotesLogout: ( state )=>
        {
            state.isSaving = false;
            state.messageSave = '';
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: ( state, action ) =>
        {
            state.active = null;
            state.notes = state.notes.filter( note => note.id !== action.payload );
            
        },
        savingNote: ( state )=>
        {
            state.isSaving = true;
        },
    }
});

export const { 
    addNewEmptyNote, 
    clearNotesLogout,
    deleteNoteById, 
    finishingNewNote,
    savingNote, 
    setActiveNote, 
    setNotes, 
    setPhotosToActiveNote,
    setSaving, 
    updateNote, 
} = journalSlice.actions;