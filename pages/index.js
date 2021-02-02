//Components
import { Menu } from "../components/Menu/menu";

//Other
import { analyzeCookies } from "../helpers/analyzeCookies";
import { readFromData } from "../helpers/readFromData";
import { defineVisitorsType } from "../helpers/defineVisitorsType";
import fs from "fs/promises";
import { initialDispatcher } from "../init/initialDispatcher";
import { initializeStore } from "../init/store";
import { useSelector } from "react-redux";
import { userActions } from "../bus/user/actions";

export const getServerSideProps = async (context) => {
    //redux
    const store = await initialDispatcher(context, initializeStore());
    const initialReduxState = store.getState();

    //cookies
    const { userId } = await analyzeCookies(context);

    const source = await readFromData(`./data/users.json`);
    const users = JSON.parse(source);
    const user = users.find((user) => {
        return user.userId === userId;
    });

    let visitCounts  = 0;
    let userType = 'Guest';
    let isVisitor = true;
    let isFriend  = false;
    let isFamily = false;

    if (user) {
        const updatedUser = { ...user, visitCounts: user.visitCounts++ };
        const updatedUsers = users.map((user) => user.id === userId ? updatedUser : user);
        await fs.writeFile(`./data/users.json`, JSON.stringify(updatedUsers, null, 4));

        visitCounts = user.visitCounts;
        [isVisitor, isFriend, isFamily] = defineVisitorsType(visitCounts);
        console.log(isVisitor, isFriend, isFamily);
        userType = isVisitor ? 'Guest': isFriend ? 'Friend' : 'familyMember';
        console.log('userType', userType);

        store.dispatch(
            userActions.fillUser({userId}),
            userActions.setVisitCounts({visitCounts}),
            userActions.setUserType({userType})
        );

    } else {
        await fs.writeFile(`./data/users.json`, JSON.stringify([...users, { userId, visitCounts: 1 }], null, 4));
    }

    return {
        props: {
            userId,
            visitCounts,
            userType,
            isVisitor,
            isFriend,
            isFamily,
            initialReduxState,
        }
    }
 }

const HomePage = (props) => {
    console.log('Home page');

    const {
        userType,
        initialReduxState
    } = props;

    const { user } = useSelector((state) => state);

    console.log('user', user);
    console.log('userType', userType);

    const isVisitor = userType === 'Guest';
    const isFriend = userType === 'Friend';
    const isFamily = userType === 'familyMember';

    const visitorJSX = isVisitor && (
        <h1>Приветствуем тебя странник!</h1>
    );
    const friendJSX = isFriend && (
        <h1>Приветствуем тебя друг!</h1>
    );
    const familyJSX = isFamily && (
        <h1>Добро пожаловать в семью!</h1>
    );
    console.log('initialReduxState', initialReduxState);

    return (
        <>
            <Menu />
            <h1> Home</h1>
            { visitorJSX }
            { friendJSX }
            { familyJSX }
        </>
    );
};

export default HomePage;
