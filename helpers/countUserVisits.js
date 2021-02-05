import {readFromData} from "./readFromData";
import {writeIntoUsersData} from "./writeIntoUserData";

export const countUserVisits = async(userId) =>{
    const source = await readFromData(`./data/users.json`);
    const users = JSON.parse( source);
    const user = users.find((user) => user.userId === userId);

    let visitCounts = 1;
    if(user){
        const updatedUser = { ...user, visitCounts: user.visitCounts++ };
        const updatedUsers = users.map((user) => user.id === userId ? updatedUser : user);
        await writeIntoUsersData('./data/users.json', updatedUsers);
        const { visitCounts } =  user;
        return   visitCounts;

    } else {
        await writeIntoUsersData(`./data/users.json`, [...users, { userId, visitCounts: 1 }]);
    }
    return   visitCounts;
}