import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "../Redux/app/store";
import DataProvider from "../context/DataContext";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";

// need to learn about this Session type
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <DataProvider>
          <MoralisProvider initializeOnMount={false}>
            <NotificationProvider>
              <Component {...pageProps} />
            </NotificationProvider>
          </MoralisProvider>
        </DataProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
