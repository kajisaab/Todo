import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Poppins } from '@next/font/google';
import { ThemeProvider } from 'styled-components';
import { theme } from '../GlobalTheme/theme';
import { store } from '../reduxStore/store';
import { Provider } from 'react-redux';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={poppins.className}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </main>
  );
}
