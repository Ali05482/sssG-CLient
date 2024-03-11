import { Button, Nav, NavItem } from "reactstrap";
import Logo from "../../logo/Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import MainContext from "../../../app/context/context";
import React, { useContext } from "react";
import { ShowSideBar } from "../../header/Header";


const Sidebar = ({ showMobilemenu, currentUser }) => {
  const global = useContext(MainContext);
  let navigation;
  if (currentUser?.role === "patient") {
    navigation = [
      {
        title: "Virtual Care",
        href: "/ui/virtualcare",
        icon: "bi bi-camera-video",
      },
      {
        title: "Health History",
        href: "/ui/notes",
        icon: "bi bi-clock-history",
      },
    ];
  } else if (currentUser?.role === "compodar") {
    navigation = [
      {
        title: "Registration",
        href: "/ui/patient/in/clinic",
        icon: "bi bi-person-circle",
      },
      {
        title: "Create History",
        href: "/ui/patient/in/collect-history",
        icon: "bi bi-clock-history",
      },
      {
        title: "Get Vitals",
        href: "/ui/patient/in/vitals/collect-vitals",
        icon: "bi bi-clipboard2-pulse-fill",
      },
      {
        title: "Doctor Room",
        href: "/ui/patient/in/connect/appointments",
        icon: "bi bi-camera-reels",
      },
      {
        title: "Care Room",
        href: "/ui/patient/in/care/appointments",
        icon: "bi bi bi-bandaid-fill",
      },
    ];
  } else if (currentUser?.role === "schedulingTeam") {
    navigation = [
      {
        title: "Scheduling",
        href: "/ui/scheduling/appointments",
        icon: "bi bi bi-clock",
      },
      {
        title: "Management",
        href: "/ui/scheduling/management",
        icon: "bi bi-briefcase-fill",
      },
    ]
  }
  else if (currentUser?.role === "admin") {
    navigation = [
      {
        title: "Referrals",
        href: "/ui/referrals",
        icon: "bi bi-arrow-left-right",
      },
      {
        title: "Virtual Care",
        href: "/ui/virtualcare",
        icon: "bi bi-camera-video",
      },
      {
        title: "Questionaires",
        href: "/ui/questionaires/folder",
        icon: "bi bi-textarea-resize",
      },
      {
        title: "Clinics",
        href: "/ui/clinics",
        icon: "bi bi-textarea-resize",
      },
    ];
  }
  else if (currentUser?.role === "supperAdmin") {
    navigation = [
      {
        title: "Doctors",
        href: "/ui/doctor",
        icon: "bi bi-file-medical",
      },
      {
        title: "Attendants",
        href: "/ui/clinic/attendant",
        icon: "bi bi-arrow-left-right",
      },
      {
        title: "Virtual Care",
        href: "/ui/virtualcare",
        icon: "bi bi-camera-video",
      },
      {
        title: "Questionaires",
        href: "/ui/questionaires/folder",
        icon: "bi bi-textarea-resize",
      },
      {
        title: "Notes",
        href: "/ui/notes",
        icon: "bi bi-sticky",
      },
      {
        title: "Clinics",
        href: "/ui/clinics",
        icon: "bi bi-textarea-resize",
      },
    ];
  }
  else if (currentUser?.role === "doctor") {
    navigation = [
      {
        title: "Virtual Care",
        href: "/ui/virtualcare",
        icon: "bi bi-camera-video",
      },
      {
        title: "Referrals",
        href: "/ui/referrals",
        icon: "bi bi-arrow-left-right",
      },
      {
        title: "Availability",
        href: "/ui/doctor/availability",
        icon: "bi bi-textarea-resize",
      },
    ];
  }
  const curl = useRouter();
  const location = curl.pathname;

  function hideMenu() {
    var sideBar = document.getElementById('side-bar');
    // Slide the sidebar to the left and hide it:
    sideBar.style.transition = "transform 0.5s ease-out"; // Adjust duration and easing as needed
    sideBar.style.transform = "translateX(-100%)";
    setTimeout(function () {
      sideBar.style.display = "none";
    }, 500); // Match the transition duration
  }
  const navToggler = () => {
    if (window.innerWidth <= 685) {
      ShowSideBar();
    }
  }
  return (
    <div className={`p-3 ${global?.mode === "dark" ? "dark-mode-background" : "light-mode-background"}`}>
      <Logo currentUser={currentUser} />
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation?.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link  href={navi.href}>
                <a
                onClick={navToggler}
                  className={`d-flex flex-column align-items-center justify-content-center py-3 ${location === navi.href
                    ? "text-dark bg-white"
                    : "text-secondary"
                    }`}
                  style={{ textAlign: "center", borderRadius: "10px" }}
                >
                  <i className={`${navi.icon} fa-2x`}></i>
                  <span className="d-block">{navi.title}</span>
                </a>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>

  );
};
export default Sidebar;
