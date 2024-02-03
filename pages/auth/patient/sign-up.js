import React, {useContext} from 'react'
import SignUpComponent from './signUpComponent'
import LoadingBar from 'react-top-loading-bar';
import MainContext from '../../../src/app/context/context';



const SignUp = () => {
  const global = useContext(MainContext);
  return (
    <>
      <LoadingBar
        color='#0000FF'
        progress={global.pageLoader.pageLoading}
        onLoaderFinished={() => global.pageLoader.setPageLoading(0)}
      />
        <SignUpComponent/>
    </>
  )
}

export default SignUp
