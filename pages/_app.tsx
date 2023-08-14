import { Loader } from "@components/Loader";
import store from "@redux/store";
import "@styles/app.scss";
import "@styles/global.scss";
import { Center } from "centa";
import { NextComponentType, NextPageContext } from "next";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      setLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          <AuthProvider>
            <>
              {loading ? (
                <Center>
                  <Loader />
                </Center>
              ) : (
                <AnyComponent {...pageProps} />
              )}
            </>
          </AuthProvider>
          <Toaster />
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
