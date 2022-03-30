import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { useEffect, useState, useMemo, useContext } from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { lightTheme, darkTheme } from "../theme";
import { SessionProvider } from "next-auth/react";
import "../../public/static/css/index.css";
import CustomThemeProvider, {
  CustomThemeContext,
} from "../context/CustomThemeProvider";

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  const [coinsProps, setCoinsProps] = useState([]);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/search?locale=en")
      .then((response) => response.json())
      .then((data) => setCoinsProps(data));
  }, []);

  const ThemeContext = useContext(CustomThemeContext);

  console.log(ThemeContext);

  return (
    <SessionProvider session={session}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Crypto Central</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CustomThemeProvider initialAppTheme={ThemeContext.appTheme}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} {...coinsProps} />)}
          </CustomThemeProvider>
        </LocalizationProvider>
      </CacheProvider>
    </SessionProvider>
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
