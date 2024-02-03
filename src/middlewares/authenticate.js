import { useRouter } from 'next/router';

 const Authenticate = () => {

  let token;

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('authToken');
  }

  try {
    const router = useRouter();
    if (!token) {
      router.push('/auth/login');
      return false; 
    }
    
    return true;
  } catch (error) {
    router.push('/auth/login');
    return false;
  }
};
export default Authenticate;