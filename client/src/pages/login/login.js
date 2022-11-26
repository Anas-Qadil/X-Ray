import React, { useRef, useState, useEffect, useDebugValue, useContext } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { loginApi } from '../../api/authApi/loginApi';
import { setData } from '../../store/index'
import Loader from "../../components/loader";
import { reloginApi } from '../../api/authApi/loginApi';
import { useSnackbar } from 'notistack'
import LOGO from '../../assets/LOGO.png';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        X-Ray Dose System
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  palette:{
    primary:{
        main: '#f17721',
    },
    secondary:{
        light: '#fff',
        main: '#18a6df',
        dark: '#ba000d',
        contrastText: '#000',
    },
  },
});

const Login = () => {

  const { enqueueSnackbar } = useSnackbar()
  
  const [loading, setLoading] = useState(true);
  const ReduxToken = useSelector(state => state.data.token);
  const ReduxRole = useSelector(state => state.data.user.role);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const userRef = useRef();

  const [user, setUser] = useState('');
  const [psw, setPsw] = useState('');

  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      if (user === '' || psw === '') {
        enqueueSnackbar('Please Fill All Fields', {variant: 'error'})
        return;
      }
      const res = await loginApi(user, psw);
      const data = res.data;
      const payload = {
        user: data.user,
        data: data,
        token: data.token,
      }
      // fill redux store with user data
      dispatch(setData(payload));
      // put token to local storage
      localStorage.setItem('token', data.token);
      // put role to local storage
      localStorage.setItem('role', data.user.role);
      // vide form
      setUser('');
      setPsw('');
      // redirect to patient dashboard
      navigate(`/${data.user.role}`);
    } catch (e) {
      enqueueSnackbar('Username or password is incorrect', {variant: 'error'})
    }
  }

  // useEffect to check if user is logged in
  useEffect(() => {
    setLoading(true);
    if (ReduxToken && ReduxRole) {
      navigate(`/${ReduxRole}`);
      setLoading(false);
      return ;
    } else setLoading(false);
  }, []);


  if (loading) return <Loader />

  return (
    <div className="login">
      <ThemeProvider theme={theme}>
        <Container sx={{ borderRadius: '10px', bgcolor: 'secondary.light' }} component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            {/* <Avatar  sx={{ m: 1,marginTop: 5, bgcolor: 'secondary.main' }}>
            </Avatar> */}
            <img src={LOGO} style={{
              width: '50%',
              marginTop: '-5%',
              marginBottom: '-10%',
            }} />
            {/* <Typography component="h1" variant="h5">
                Connection
            </Typography> */}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                htmlFor="username"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                type="text" 
                ref={userRef} 
                autoComplete="off" 
                onChange={(e) => setUser(e.target.value)} value={user} 
              />
              <TextField
                htmlFor="password"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPsw(e.target.value)} value={psw}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, color: 'secondary.light', bgcolor: 'primary.main' }}
                
              >
              Login
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 6, pb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  ) 
}

export default Login;