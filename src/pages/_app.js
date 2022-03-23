import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { useEffect, useState } from 'react';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../components/utils/create-emotion-cache";
import { theme } from "../theme";
import "../../public/static/css/index.css";

const clientSideEmotionCache = createEmotionCache();



const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  const [coinsProps, setCoinsProps] = useState([]);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/search?locale=en")
      .then((response) => response.json())
      .then((data) => setCoinsProps(data));
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Material Kit Pro</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} {...coinsProps} />)}
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;


// App.getInitialProps = async (Component, ctx) => {
//   let coins = [];

//   coins = await fetch("https://api.coingecko.com/api/v3/search?locale=en").then(
//     (response) => response.json()
//   );

//   return {
//     coinsProps: coins,
//   };
// };