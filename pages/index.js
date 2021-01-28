import { useEffect } from "react";
import {pageVerify} from "../helpers/pageVerify";
import {verifyBrowser} from "../helpers/verifyBrowser";
import {analyzeCookies} from "../helpers/analyzeCookies";

export const getServerSideProps = async(context) => {
     const protectedPage = pageVerify('home');
        console.log("context", context);

    const {
        cookies,
        isVisitor,
        isFriend,
        isFamily
    } = analyzeCookies(context);

    console.log("cookies", cookies);

    return {
        props: {
            protectedPage,
            cookies,
            isVisitor,
            isFriend,
            isFamily
        }
    }
 }


const Home = (props) => {
    console.log("props", props);

    const {
        theme,
        protectedPage,
        isVisitor,
        isFriend,
        isFamily
    } = props;

    // const [isVisitor, setVisitor] = useState(false);
    // const [isFriend, setFriend] = useState(false);
    // const [isFamily, setFamily] = useState(false);
    // const visitCounts = 5;

    useEffect(() =>{
        console.log('useEffect')
        // if(visitCounts < 3){
        //     setVisitor(true);
        // }
        // if(visitCounts >= 3 && visitCounts < 5){
        //     setFriend(true);
        // }
        // if(visitCounts >= 5){
        //     setFamily(true);
        // }
        }, []);

    console.log('Home render');
    const isBrowser = verifyBrowser();
    if(isBrowser){
        console.log('width', window.innerWidth);
    }
    const protectedPageJSX = protectedPage && (
        <h2> This page is protected</h2>
    );

    const visitorJSX = isVisitor && (
        <h1>Приветствуем тебя странник!</h1>
    );
    const friendJSX = isFriend && (
        <h1>Приветствуем тебя друг!</h1>
    );
    const familyJSX = isFamily && (
        <h1>Добро пожаловать в семью!</h1>
    );




    return (
        <>
            <h1> Home</h1>
            {protectedPageJSX}
            <p>Current Theme = {theme}</p>
            { visitorJSX }
            { friendJSX }
            { familyJSX }
        </>

    );
};

export default Home;
