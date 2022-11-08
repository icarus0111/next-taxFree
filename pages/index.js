import Head from 'next/head'
import Home from '../components/Home'

export default () =>{
  return (
      <>
      <Head>
       <title>Cheap RV Yearly Expeneses Montana LLC</title>
       <meta name="description" content="Save on your RV expenses with a  Montana LLC Registration. Register online with TaxFree RV to start seeing savings on yearly costs on your Recreational Vehicle"/>
       <link rel="canonical" href="https://www.taxfreervs.herokuapp.com/" />
       <meta name="robots" content="index, follow"/>
       <meta property="og:type" content="website" />
       <meta property="og:title" content="Cheap RV Yearly Expeneses Montana LLC" />
       <meta property="og:description" content="Save on your RV expenses with a  Montana LLC Registration. Register online with TaxFree RV to start seeing savings on yearly costs on your Recreational Vehicle" />
       <meta property="og:url" content="https://taxfreervs.herokuapp.com" />
       <meta property="og:site_name" content="TaxFree RV"/>
      </Head>
      <Home/>
      </>

  );
}
