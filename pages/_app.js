import '../styles/globals.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Provider } from 'react-redux';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { store } from '../redux/store';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWSiFmtLTR2Zv9Dv0Qd7EtSaRDNwh5GS0",
  authDomain: "tvnft-b2eb6.firebaseapp.com",
  databaseURL: "https://tvnft-b2eb6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tvnft-b2eb6",
  storageBucket: "tvnft-b2eb6.appspot.com",
  messagingSenderId: "721285277097",
  appId: "1:721285277097:web:9b75a579b23d7b6169d0b8"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function MyApp({ Component, pageProps }) {
  return (
      <Provider store={store}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </LocalizationProvider>
      </Provider>
    )
}

export default MyApp
