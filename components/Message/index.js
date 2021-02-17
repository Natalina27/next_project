// Core
import { useSelector} from 'react-redux';

//Other
import {selectUser} from '../../bus/user';

export const Message = () => {

    const  user  = useSelector(selectUser);
    const { userType } = user;

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