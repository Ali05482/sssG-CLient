import LogoDark from "../../assets/images/logos/xtremelogo.svg";
import Image from "next/image";
import Link from "next/link";

const Logo = (props) => {
    
  return (
    <Link href="/">
      <a>
        <div style={{ width: "100px", height: "auto" }}>
          <Image src={props?.currentUser?.platformId?props?.currentUser?.platformId?.profile:"/Fitwell-Hub-01.png"}  width={10} height={5} alt="logo" layout="responsive" />
          <small style={{fontSize:"8px"}}>Powered By <b>Fitwell Hub</b></small>
        </div>
      </a>
    </Link>
  );
};

export default Logo;
