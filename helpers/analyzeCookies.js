import nookies from 'nookies';
import { v4 as uuid } from 'uuid';

export const analyzeCookies = (context) => {
    try{
        // Parse
        const cookies = nookies.get(context);
        const isUserExist = 'userId' in cookies
        const userId = isUserExist ? cookies.userId : uuid();

        if (!isUserExist) {
            nookies.set(context, "userId", userId, {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
            });
        }

        return { userId };
    }
    catch (error) {
        console.log(error);
    }
};