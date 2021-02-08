// Core
import { useSelector} from 'react-redux';

//Other
import {defineUserType} from "../../helpers/defineUserType";

export const Message = () => {

    const { user } = useSelector((state) => state);
    const { visitCounts } = user;
    const userType = defineUserType(visitCounts);

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

    return (
        <div>
            { visitorJSX }
            { friendJSX }
            { familyJSX }
        </div>
    );
};