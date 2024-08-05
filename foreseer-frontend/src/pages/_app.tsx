import { GlobalContext, useProviderGlobalContext } from "@/context/Global";
import { UserContext, useProviderUserContext } from "@/context/User";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Comfortaa, Inter } from "next/font/google";
import { LoginModal } from "@/components/ui/LoginModal";
import { cookieToInitialState } from "@alchemy/aa-alchemy/config";
import { AlchemyAccountProvider } from "@alchemy/aa-alchemy/react";
import { config, queryClient } from "@/config";
import { VerificationModal } from "@/components/ui/VerficationModal";

export const inter = Inter({ subsets: ["latin"] });
export const comfortaa = Comfortaa({ subsets: ["latin"] });

interface CustomAppProps extends AppProps {
  cookieHeader: string | undefined;
}

const UserProviededComponents = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const userContext = useProviderUserContext();
  const { loginModalOpen, setLoginModalOpen } = userContext;

  return (
    <>
      <UserContext.Provider value={userContext}>
        {children}
      </UserContext.Provider>
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
      <VerificationModal />
    </>
  );
};

export default function App({
  Component,
  pageProps,
  cookieHeader,
}: CustomAppProps) {
  const globalContext = useProviderGlobalContext();

  const initialState = cookieToInitialState(config, cookieHeader);

  return (
    <GlobalContext.Provider value={globalContext}>
      <AlchemyAccountProvider
        config={config}
        queryClient={queryClient}
        initialState={initialState}
      >
        <ToastContainer />
        <UserProviededComponents>
          <Component {...pageProps} />
        </UserProviededComponents>
      </AlchemyAccountProvider>
    </GlobalContext.Provider>
  );
}

App.getInitialProps = async ({ ctx }: { ctx: any }) => {
  const cookieHeader = ctx.req ? ctx.req.headers.cookie : undefined;
  return { cookieHeader };
};
