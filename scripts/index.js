const navbarId = "nav-head-id";
const discordUserId = "937876388554375188";

const openNavbar = () => {
  document.getElementById(navbarId).style.width = "200px";
};
const closeNavbar = () => {
  document.getElementById(navbarId).style.width = "0";
  document.getElementById(navbarId).style.removeProperty("width");
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
})();
