import nookies from 'nookies';
import { v4 as uuid } from 'uuid';

export const analyzeCookies = async (context) => {

    try{
        // Parse
        const cookies = nookies.get(context);
        //const user = 'user' in cookies ? cookies.user : null;
        let userId = uuid();

        if (cookies && cookies.userId) {
            console.log("old user");
            console.log("cookies", cookies);
        } else {
            console.log("new user");
            // Set
            // 1. context browse ←→ next.js server
            // 2. userId ← cookie name
            // 3. value ← cookie value
            nookies.set(context, "userId", userId, {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
            });
        }

        return {
            userId: cookies.userId || userId,
        };
    }
    catch (error) {
        console.log(error);
    }
};