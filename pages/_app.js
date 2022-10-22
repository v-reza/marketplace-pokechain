import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps, hiddenSidebar }) {
  return (
    <>
      <Head>
        <meta name="google" content="notranslate" />
      </Head>
      {hiddenSidebar ? (
        <Component {...pageProps} />
      ) : (
        <Sidebar>
          <Sidebar.MainContent>
            <Component {...pageProps} />
          </Sidebar.MainContent>
        </Sidebar>
      )}
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const { pathname } = appContext.ctx;
  return { hiddenSidebar: pathname === "/auth/login" || pathname === "/auth/register" ? true : false };
};

export default MyApp;
