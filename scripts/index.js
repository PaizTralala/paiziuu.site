const navbarId = "nav-head-id";

const openNavbar = () => {
  document.getElementById(navbarId).style.width = "250px";
};
const closeNavbar = () => {
  document.getElementById(navbarId).style.width = "0";
  document.getElementById(navbarId).style.removeProperty("width");
};
