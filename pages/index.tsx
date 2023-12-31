import React, { useState } from "react";
import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import { setCanUpload } from "@redux/slices/user";
import useAuth from "src/hooks/useAuth";
import generateToken from "src/utils/generateToken";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import logoSrc from "src/assets/images/logo.svg";
import GithubIcon from "src/components/Icon/icons/github";
import { getStorageUsage, saveStamp, stampDocument } from "src/services/stamps";
import { Footer, FileUpload, StampPositioner, Header, Card } from "@components";
import Head from "next/head";

const FILE_LIMIT = 100000;

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const { user } = useAuth();

  const [showPreview, setShowPreview] = useState(false);
  const [docPreview, setDocPreview] = useState<{
    documentUrl?: string;
    stampUrl?: string;
  }>({});
  const { documentUrl, stampUrl } = docPreview;

  const headerLinks: { text: string; link: string }[] = [];

  const createStamp = async (payload: any) => {
    try {
      const body = { ...payload };
      let token = localStorage.getItem("noAuthToken") || generateToken();

      if (!user?.uid) {
        localStorage.setItem("noAuthToken", token);
        body.token = token;
      }
      const resp = await stampDocument(body);
      if (resp.status === 200) {
        await saveStamp({ ...body, stampedUrl: resp.data.stamped_url });
      }

      // todo toast
      console.log(resp?.data?.stamped_url, "stamped url");
      alert(`stamp saved. Check consolf for stamp url `);
    } catch (error) {
      console.log(`error`, error);
      throw error;
    }
  };

  const checkFileLimit = async (size: any) => {
    const token = localStorage.getItem("noAuthToken");
    if (user?.uid || !token) return;
    try {
      const totalStorage = await getStorageUsage(token);
      const allowUpload = totalStorage + size <= FILE_LIMIT;
      dispatch(setCanUpload(allowUpload));
      if (!allowUpload) alert("Limit exceeded"); // todo toast
    } catch (error) {
      console.log(`error`, error);
    }
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Spartan:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <DndProvider backend={HTML5Backend}>
        <div className={`container position-relative ${styles.Main}`}>
          <Header links={headerLinks} src={logoSrc.src as any} />
          <div className="row mt-3 mb-5 mb-md-0">
            <div className="col-12">
              <Card
                className={`${styles.Hero} pt-5 pb-sm-5 pb-3 px-3 px-md-5`}
                bgColor="#ace4da45"
              >
                <div className="row justify-content-center">
                  <div className="col-lg-6 col-md-8 col-sm-10 col-xs-12  text-center text-primary">
                    <h2 className="fw-bold mb-3 px-3 px-md-0">
                      Secure File Upload <br /> Storage & Stamp
                    </h2>
                    <span className="fw-light">
                      Get Premium Account today. Check out our awesome deal
                    </span>
                    <FileUpload
                      className={`${styles.HeroFileUpload} shadow-sm`}
                      handleSuccess={(payload) => {
                        setDocPreview({
                          ...payload,
                        });
                        setShowPreview(true);
                      }}
                      onFileChange={(size) => checkFileLimit(size)}
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div className={`row justify-content-center ${styles.FooterCard}`}>
            {/* <div className="col-12 col-md-6 ">
            <Card
              bgColor="#ff76762e"
              className="py-5 px-3 px-md-5 d-flex justify-content-between align-items-center flex-column flex-md-row"
            >
              <span className="text-primary">
                Do you want 10MB Free* storage?
              </span>

              <Button
                label="Create An Account"
                className="fw-little mt-3 mt-md-0"
              />
            </Card>
          </div> */}
            <div className="col-12">
              <Footer
                footerLinks={[
                  {
                    icon: <GithubIcon />,
                    link: "https://github.com/hmoskva/stampr",
                  },
                ]}
              />
            </div>
          </div>
          <StampPositioner
            stamp={stampUrl}
            doc={documentUrl}
            show={showPreview}
            handleHide={() => setShowPreview(false)}
            handleSubmit={({
              stampPosition,
              width,
              height,
              customText,
              color,
            }) =>
              createStamp({
                ...docPreview,
                ...stampPosition,
                userId: user?.uid || "",
                width,
                height,
                customText,
                color,
              })
            }
          />
        </div>
      </DndProvider>
    </>
  );
};

export default Home;
