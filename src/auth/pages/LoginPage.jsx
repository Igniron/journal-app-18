import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';

import { AuthLayout } from '../layout/AuthLayout';

import { useForm } from '../../hooks';
import { startGoogleSingIn, startLoginWhithEmailPassword } from '../../store/auth';


const formData = 
{
  email: '',
  password: '',
}


export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth );

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm( formData );

  const isAuthenticating = useMemo( ()=> status === 'checking', [status] );

  const onSubmit = (event) =>
  {
    event.preventDefault();

    // console.log({email, password});
    dispatch( startLoginWhithEmailPassword({ email, password }) );
  }

  const onGoogleSingIn = ()=>
  {
    // console.log('onGoogleSingIn');
    dispatch( startGoogleSingIn() );
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Email" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name="email"
                value={ email }
                onChange= { onInputChange }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Password" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name="password"
                value={ password }
                onChange= { onInputChange }
              />
            </Grid>


            <Grid 
              container
              display= { !!errorMessage ? '' : 'none'}
              sx = {{ mt: 1}}
            >
              <Grid 
                item 
                xs={ 12 }
                
              >
                <Alert severity='error'>
                  { errorMessage }
                </Alert>
              </Grid>
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                  type='submit' 
                  variant='contained' 
                  fullWidth
                  disabled = { isAuthenticating }
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                  variant='contained' 
                  fullWidth
                  onClick = {onGoogleSingIn}
                  disabled = { isAuthenticating }
                >
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Sign in
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
