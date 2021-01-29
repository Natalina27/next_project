export const countVisitors = user => {
    const { visitCounts } = user;
    let isVisitor;
    let isFriend;
    let isFamily;

    isVisitor = visitCounts < 3;
    isFriend = visitCounts >= 3 && visitCounts < 5;
    isFamily = visitCounts >= 5;

    return {isVisitor, isFriend, isFamily};
}