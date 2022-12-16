import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';

import { useForm } from '../../hooks';
import { startCreatingUserWithEmailPassword } from '../../store/auth';


const formValidations = {
  email: [ ( value ) => value.includes( '@' ) , 'The email must have an @.' ],
  password: [ ( value ) => value.length >= 6 , 'The password must have 6 or more characters.' ],
  displayName: [ ( value ) => value.length >= 3 , 'The name is required.' ],
}

const formData = 
{
  email: '',
  password: '',
  displayName: '',
}


export const RegisterPage = () => {

  const dispatch = useDispatch();
  
  const [formSubmited, setFormSubmited] = useState(false);

  const { status, errorMessage } = useSelector( state => state.auth );
  const isCheckingAuthentication = useMemo( () => status === 'checking', [ status ] );
  
  const { displayName, email, password, onInputChange, formState, isFormValid, emailValid, displayNameValid, passwordValid } = useForm( formData, formValidations );



  const onSubmit = ( event )=>
  {
    event.preventDefault();
    setFormSubmited( true );

    if (!isFormValid) return;
    
   dispatch ( startCreatingUserWithEmailPassword( formState ) );
  }


  return (
    <AuthLayout title="Create account">
      <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Name" 
                type="text" 
                placeholder='Name' 
                fullWidth
                name='displayName'
                value={ displayName }
                onChange= { onInputChange }
                error= { !!displayNameValid && formSubmited}
                helperText = { displayNameValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Email" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name='email'
                value={ email }
                onChange= { onInputChange }
                error= { !!emailValid && formSubmited}
                helperText = { emailValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Password" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name='password'
                value={ password }
                onChange= { onInputChange }
                error= { !!passwordValid && formSubmited }
                helperText = { passwordValid }
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>

              <Grid 
                item 
                xs={ 12 }
                display= { !!errorMessage ? '' : 'none'}
              >
                <Alert severity='error'>
                  { errorMessage }
                </Alert>
              </Grid>

              <Grid item xs={ 12 }>
                <Button 
                  disabled = { isCheckingAuthentication }
                  variant='contained' 
                  fullWidth
                  type = "submit"
                >
                  Create Account
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Have an account?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                Login
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
