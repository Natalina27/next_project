import nookies from 'nookies';

export const analyzeCookies = (context) => {
    const isVisitor = true;
    const isFriend = true;
    const isFamily = true;

    // Parse
    const cookies = nookies.get(context);
    console.log("cookies", cookies);

    // Set
    nookies.set(context, 'fromGetInitialProps', 'value', {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
    })

    // Destroy
    nookies.destroy(context, 'cookieName')


    return {
        cookies,
      isVisitor,
      isFriend,
      isFamily

    }
 }
