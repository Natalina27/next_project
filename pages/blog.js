import { useEffect, useState } from "react";
import { verifyBrowser} from "../helpers/verifyBrowser";
import { pageVerify} from "../helpers/pageVerify";
import { analyzeDeviceByUserAgent } from "../helpers/analyzeDeviceByUserAgent";

export const getServerSideProps = (context) => {
    const protectedPage = pageVerify('blog');
    const userAgent = context.req.headers['user-agent'];

    const {
        isMobile,
        isTablet,
        isDesktop
    } = analyzeDeviceByUserAgent(userAgent);

    return {
        props: {
            protectedPage,
            isMobile,
            isTablet,
            isDesktop
        }
    }
}

const Blog = (props) => {
    const {
        theme,
        protectedPage,
        isMobile,
        isTablet,
        isDesktop
    } = props;

    const [isDesktopHd, setDesktopHd] = useState(false);

    useEffect(() =>{
        console.log('useEffect');
        if(window.innerWidth >= 1200) {
            setDesktopHd(true);
        }

    }, []);

  console.log('Blog render');
  const isBrowser = verifyBrowser();
  if(isBrowser){
    console.log('width', window.innerWidth);
  }
    const protectedPageJSX = protectedPage && (
        <h2> This page is protected</h2>
    );

    const mobileJSX = isMobile && (
        <p>Mobile</p>
    );

    const tabletJSX = isTablet && (
        <p>Tablet</p>
    );

    const hdJSX = isDesktopHd && (
        <span>HD</span>
    );


    const desktopJSX = isDesktop && (
        <p>Desktop{hdJSX}</p>
    );

    return (
      <>
        <h1> Blog page</h1>
          {protectedPageJSX}
          {mobileJSX}
          {tabletJSX}
          {desktopJSX}
          <p>Current Theme = {theme}</p>
      </>

  );
};

export default Blog;
