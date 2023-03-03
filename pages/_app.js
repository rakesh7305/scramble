// import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { SnackbarProvider } from 'notistack';
import { useEffect } from 'react';
import '../styles/globals.css';
import { StoreProvider } from '../utils/Store';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    // <div></div>
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <StoreProvider>
        {/* <PayPalScriptProvider deferLoading={true}> */}
          <Component {...pageProps} />
        {/* </PayPalScriptProvider> */}
      </StoreProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
