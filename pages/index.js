import {analyzeCookies} from "../helpers/analyzeCookies";
import {readFromData} from "../helpers/readFromData";
import {writeIntoData} from "../helpers/writeIntoData";
import {countVisitors} from "../helpers/countVisitors";

export const getServerSideProps = async (context) => {

    const { userId } = await analyzeCookies(context);

    const source = await readFromData(`./data/users.json`);
    const users = JSON.parse(source);
    const user = users.find((user) => {
        return user.userId === userId;
    });

    let isVisitor, isFriend , isFamily;

    if (user) {
        const updatedUser = { ...user, visitCounts: user.visitCounts++ };
        const updatedUsers = users.map((user) => user.id === userId ? updatedUser : user);
        await writeIntoData(updatedUsers, `./data/news.json`);

        const { visitCounts } = user;
        [isVisitor, isFriend, isFamily] = countVisitors(visitCounts);

    } else {
        await writeIntoData([...users, { userId, visitCounts: 1 }], `./data/news.json`);
    }

    return {
        props: {
            userId,
            isVisitor,
            isFriend,
            isFamily
        }
    }
 }


const Home = (props) => {
    const {
        isVisitor,
        isFriend,
        isFamily
    } = props;

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
            { visitorJSX }
            { friendJSX }
            { familyJSX }
        </>

    );
};

export default Home;
