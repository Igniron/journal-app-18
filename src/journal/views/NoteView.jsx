import { useMemo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

import { useForm } from '../../hooks/useForm';
import { ImageGallery } from '../components'
import { startSavingNote, startUploadingFiles, setActiveNote, startDeletingNote } from '../../store/journal';



export const NoteView = () => {

    const dispatch = useDispatch();
    const { active:activeNote, messageSave, isSaving } = useSelector( state => state.journal );
    
    const { body, title, date, onInputChange, formState } = useForm( activeNote );

    const dateString = useMemo( ()=>
    {
        const newDate = new Date( date );

        return newDate.toUTCString();

    }, [ date ]);

    const onSaveNote = ()=>
    {
        dispatch ( startSavingNote());
    }

    const onFileInputChange = ( { target } )=>
    {
        if( target.files === 0 ) return;

        dispatch( startUploadingFiles( target.files ) );
    }

    const onDelete = ()=>
    {
        dispatch( startDeletingNote () );
    }

    const fileInputRef = useRef();

    useEffect(() => {
      
    dispatch ( setActiveNote( formState ) );
      
    }, [ formState ])

    useEffect(() => {
      
        if( messageSave.length > 0)
        {
            Swal.fire( 'Updated note', messageSave, 'success' );
        }
      
    }, [ messageSave ])
    
    
    

  return (
    <Grid 
        container 
        direction='row' 
        justifyContent='space-between' 
        alignItems='center' 
        sx={{ mb: 1 }}
        className='animate__animated animate__fadeIn animate__faster'
    >
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' >{ dateString }</Typography>
        </Grid>

        <input 
            type='file'
            multiple
            onChange={ onFileInputChange }
            style ={ { display: 'none' } }
            ref= { fileInputRef }
        />

        <IconButton 
            color='primary'
            disabled= { isSaving }
            onClick= { ()=> fileInputRef.current.click()}
        >
            <UploadOutlined />
        </IconButton>

        <Grid item>
            <Button 
                disabled = { !!isSaving }
                color="primary" 
                sx={{ padding: 2 }}
                onClick= { onSaveNote }
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Save
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border: 'none', mb: 1 }}
                name= 'title'
                value={ title }
                onChange = { onInputChange }
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                minRows={ 5 }
                name= 'body'
                value={ body }
                onChange = { onInputChange }
            />
        </Grid>

        <Grid container justifyContent= 'end' >
            <Button
                onClick={ onDelete }
                sx={{ mt: 2 }}
                color= 'error'
            >
                <DeleteOutline />
                Borra
            </Button>
        </Grid>

        <ImageGallery images= { activeNote.imageUrls } />

    </Grid>
  )
}
