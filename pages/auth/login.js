import React, {useContext} from 'react'
import LoginComponent from './LoginComponent'
import Layout from './Layout'
import MainContext from '../../src/app/context/context'
import LoadingBar from "react-top-loading-bar";
const Login = () => {
  const global = useContext(MainContext);
  return (
    <>
      <Layout>
      <LoadingBar
        color='#0000FF'
        progress={global.pageLoader.pageLoading}
        onLoaderFinished={() => global.pageLoader.setPageLoading(0)}
      />
        <LoginComponent/>
      </Layout>
    </>
  )
}

export default Login
