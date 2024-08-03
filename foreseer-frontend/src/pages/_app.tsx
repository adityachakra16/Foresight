import { GlobalContext, useProviderGlobalContext } from "@/context/Global";
import { UserContext, useProviderUserContext } from "@/context/User";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Comfortaa, Inter } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const comfortaa = Comfortaa({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const globalContext = useProviderGlobalContext();
  const userContext = useProviderUserContext();

  return (
    <GlobalContext.Provider value={globalContext}>
      <ToastContainer />
      <UserContext.Provider value={userContext}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </GlobalContext.Provider>
  );
}
