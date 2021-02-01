//Core
import { Provider } from 'react-redux';

//Other
import { useStore } from '../init/store';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  console.log('APP Render');

  return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      )
}

export default MyApp;
