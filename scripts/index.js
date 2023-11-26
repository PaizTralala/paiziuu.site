const navbarId = "nav-head-id";
const discordUserId = "937876388554375188";

const openNavbar = () => {
  document.getElementById(navbarId).style.width = "200px";
};
const closeNavbar = () => {
  document.getElementById(navbarId).style.width = "0";
  document.getElementById(navbarId).style.removeProperty("width");
};

const loaderAnimate = (element) => {
  const second = 2.5;
  const firstChild = document.querySelector(".loader div:nth-child(1)");
  const secondChild = document.querySelector(".loader div:nth-child(2)");

  const pageDir = window.location.pathname;
  let isPageExist = false;
  let page = "";

  if (pageDir && pageDir.includes("/pages/")) {
    isPageExist = true;
    page = pageDir.split("/pages/")[1].split(".html")[0];
  }

  const pageId = element.id.split("Page")[0];

  if (isPageExist && pageId === page) {
    document.getElementById(`${page}Page`).style.cursor = "not-allowed";
    return;
  }

  firstChild.style.width = "100vw";
  secondChild.style.width = "100vw";

  setTimeout(() => {
    firstChild.style.width = "0";
    secondChild.style.width = "0";

    setTimeout(() => {
      if (isPageExist === false) {
        window.location.href = `./pages/${pageId}.html`;
      } else {
        window.location.href = `./${pageId}.html`;
      }
    }, 2550);
  }, second * 1000);
};

const discordStatus = document.getElementById("discordStatus");
const discordProfilePicture = document.getElementById("discordProfilePicture");
const discordUsername = document.getElementById("discordUsername");
const discordImageStatus = document.getElementById("imageStatus");

(async () => {
  const rawRes = await fetch(`https://api.lanyard.rest/v1/users/${discordUserId}`);
  const { data, success } = await rawRes.json();

  if (success !== true) {
    return (discordStatus.innerText = "Failed to fetch!");
  }

  try {
    discordUsername.innerText = `@${data.discord_user.username}`;
    discordProfilePicture.src = `https://cdn.discordapp.com/avatars/${discordUserId}/${data.discord_user.avatar}`;

    switch (data.discord_status) {
      case "online":
        if (data.active_on_discord_mobile === true) {
          discordImageStatus.src = "../assets/discord_status/online-mobile.png";
          discordStatus.innerText = "Online (Mobile)";
          return;
        }

        discordImageStatus.src = "../assets/discord_status/online.png";
        discordStatus.innerText = "Online";
        break;

      case "offline":
        discordImageStatus.src = "../assets/discord_status/offline.png";
        discordStatus.innerText = "Offline";
        break;

      case "idle":
        discordImageStatus.src = "../assets/discord_status/idle.png";
        discordStatus.innerText = "Idle";
        break;

      case "dnd":
        discordImageStatus.src = "../assets/discord_status/dnd.png";
        discordStatus.innerText = "Do not disturb!";
        break;

      default:
        break;
    }
  } catch (ignored) {}
})();
