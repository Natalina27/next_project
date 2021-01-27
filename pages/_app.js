function MyApp({ Component, pageProps }) {
  console.log('APP render');
  return <Component
      theme='default'
      {...pageProps} />
}

export default MyApp
