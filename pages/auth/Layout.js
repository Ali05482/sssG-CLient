// components/Layout.js
import Head from 'next/head';

const Layout = ({ children }) => {
    return (
        <div>
            <Head>
                <link href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap" rel="stylesheet" />

                <link rel="stylesheet" href="/login/fonts/icomoon/style.css" />

                <link rel="stylesheet" href="/login/css/owl.carousel.min.css" />


                <link rel="stylesheet" href="/login/css/bootstrap.min.css" />


                <link rel="stylesheet" href="/login/css/style.css" />
               
               
            </Head>
            {children}
        </div>
    );
};

export default Layout;
