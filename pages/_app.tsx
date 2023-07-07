import store from "@redux/store";
import "@styles/app.scss";
import "@styles/global.scss";
import { NextComponentType, NextPageContext } from "next";
import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Provider } from "react-redux";
import { AuthProvider } from "src/hooks/useFirebaseAuth";

type AppPropsType = AppProps & {
  Component: NextComponentType<NextPageContext, any, any>;
  pageProps: Record<string, unknown>;
};

function MyApp({ Component, pageProps }: AppPropsType): JSX.Element {
  const queryClient = new QueryClient();
  const AnyComponent = Component as any;

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          <AuthProvider>
            <AnyComponent {...pageProps} />
          </AuthProvider>
          <Toaster />
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
