import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";

import {
  Navbar,
  Collapse,
  Nav,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { useRouter } from "next/router";

import user1 from "../../assets/images/users/user1.jpg";
import MainContext from "../../app/context/context";
import Link from "next/link";

function ShowSideBar() {
  var sideBar = document.getElementById('side-bar');

  // Check if the sidebar is currently visible
  var isVisible = window.getComputedStyle(sideBar).display !== 'none';

  if (isVisible) {
    // If visible, hide it
    sideBar.style.transition = "transform 0.5s ease-in"; // Adjust duration and easing as needed
    sideBar.style.transform = "translateX(-100%)";
    setTimeout(function () {
      sideBar.style.display = "none";
    }, 500); // Match the transition duration
  } else {
    // If hidden, show it
    sideBar.style.display = "block";
    setTimeout(function () {
      sideBar.style.transition = "transform 0.5s ease-out"; // Adjust duration and easing as needed
      sideBar.style.transform = "translateX(0%)";
    }, 0); // Set a small delay for smoother transition
  }
}
const Header = ({ showMobmenu, currentUser }) => {
  const global = useContext(MainContext);
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(true);

  const logout = () => {
    localStorage.clear();
    router.push("/auth/login");
  };
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isBetween, setIsBetween] = useState(true);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const handleToggle = () => {
    setIsOpen(!isOpen);
    setIsMobile(isOpen === true ? true : false);
  };


  function formatDate(date) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  }

  async function getLocationInfo() {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const apiKey = '422ad6d66a62ac08e48f623f6f8e70ec';

      // Fetch address using reverse geocoding
      const addressResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const addressData = await addressResponse.json();
      const address = addressData.display_name || 'Address not found';

      // Fetch weather information
      // const weatherResponse = await fetch(`https://api.openweathermap.org/data/3.0/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
      // const weatherData = await weatherResponse.json();
      // const temperature = weatherData.main.temp;

      const date = formatDate(new Date());

      // return `${temperature}°C * ${date} ${address}`;
      return ` ${date} ${address}`;
    } catch (error) {
      return 'Please allow us to access your location for better experience';
    }
  }

  const [weatherInfo, setWeatherInfo] = useState('');

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 992 && window.innerWidth >= 768) {
        setIsBetween(false);
      } else {
        setIsBetween(true);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    getLocationInfo().then((result) => {
      setWeatherInfo(result);
    });
    if (window.innerWidth <= 786) {
      ShowSideBar()
      setIsOpen(false);
    }
    // if (window.innerWidth <= 992 && window.innerWidth >= 768) {
    //   setIsBetween(false);
    // } else {
    //   setIsBetween(true);
    // }
  }, []);

  return (
    <Navbar className={`${global?.mode === "dark" ? "dark-mode-background" : "light-mode-background"}`} dark expand="md" fixed>
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
        </NavbarBrand>
        <div className="hstack gap-2">
          <Button
            color=""
            size="md"
            className="showMenuBtn bg-light  d-lg-none"
            onClick={ShowSideBar}
          ><i className="bi bi-list"></i>
          </Button>
        </div>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={handleToggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>

      </div>

      <Collapse navbar isOpen={isOpen}>
        {isBetween && isMobile && <Button
          color=""
          size="md"
          className="showMenuBtn bg-light"
          onClick={ShowSideBar}
        ><i className="bi bi-list"></i>
        </Button>}

        <div className="mx-2"></div>
        <Nav className="me-auto" navbar>
          <b>
            <span style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>{weatherInfo}</span>
          </b>
        </Nav>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FormGroup switch>
            <Input
              type="switch"
              checked={global?.mode === "dark" ? true : false}
              onClick={() => {
                global?.toggleMode()
              }}
            />
          </FormGroup>
        </div>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="black">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image
                src={user1}
                alt="profile"
                className="rounded-circle"
                width="30"
                height="30"
              />
              <b style={{ marginLeft: '10px', color: global?.theme?.color }}><b>{currentUser?.firstName} {currentUser?.lastName}</b></b>
            </div>

          </DropdownToggle>
          <DropdownMenu style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>

            <DropdownItem header>Info</DropdownItem>
            {global?.user?.currentUser?.role === "supperAdmin" && <DropdownItem><Link href={`/ui/platform`}><a>Platform</a></Link></DropdownItem>}
            <DropdownItem><Link href={`/ui/profile`}><a>My Profile</a></Link></DropdownItem>
            <DropdownItem divider />
            <DropdownItem><Link href={`/ui/help`}><a>Help</a></Link></DropdownItem>
            {(global?.user?.currentUser?.role === "supperAdmin" || global?.user?.currentUser?.role === "admin") && <DropdownItem><Link href={`/ui/user-manager`}><a>Users</a></Link></DropdownItem>}
            <DropdownItem style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} onClick={logout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};
export { ShowSideBar }
export default Header;
