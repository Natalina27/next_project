import {analyzeCookies} from "../helpers/analyzeCookies";
import {readFromData} from "../helpers/readFromData";
import {countVisitors} from "../helpers/countVisitors";
import fs from "fs/promises";


export const getServerSideProps = async (context) => {

    const { userId } = await analyzeCookies(context);

    const source = await readFromData(`./data/users.json`);
    const users = JSON.parse(source);
    const user = users.find((user) => {
        return user.userId === userId;
    });

    let isVisitor = true;
    let isFriend  = false;
    let isFamily = false;

    if (user) {
        const updatedUser = { ...user, visitCounts: user.visitCounts++ };
        const updatedUsers = users.map((user) => user.id === userId ? updatedUser : user);
        await fs.writeFile(`./data/users.json`, JSON.stringify(updatedUsers, null, 4));

        const { visitCounts } = user;
        [isVisitor, isFriend, isFamily] = countVisitors(visitCounts);

    } else {
        await fs.writeFile(`./data/users.json`, JSON.stringify([...users, { userId, visitCounts: 1 }], null, 4));
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
