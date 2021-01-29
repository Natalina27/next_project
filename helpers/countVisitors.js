export const countVisitors = (visits) => {
    const isVisitor = visits < 3;
    const isFriend = visits >= 3 && visits < 5;
    const isFamily = visits >= 5;
    return [isVisitor, isFriend, isFamily];
}