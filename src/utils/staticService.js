import toast from "react-hot-toast";
import { avatarColors } from "./staticData";
import {
  differenceInDays,
  differenceInMinutes,
  differenceInHours,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

class StaticService {
  generateRandomColor() {
    const color = avatarColors[Math.floor(Math.random() * avatarColors.length)];
    return color;
  }

  generateAvatarImg(letter, bgColor) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 200;
    canvas.height = 200;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "bold 80px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(letter.toUpperCase(), canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL("image/png");
  }

  displayInAppNotification(msg) {
    toast(msg, { duration: 3000, position: "top-center", icon: "🔔" });
  }

  getTimeDifference(prevDate) {
    const now = new Date();
    const time = new Date(prevDate);

    const yearDiff = differenceInYears(now, time);
    if (yearDiff > 0) return `${yearDiff} years ago`;

    const monthDiff = differenceInMonths(now, time);
    if (monthDiff > 0) return `${monthDiff} months ago`;

    const dayDiff = differenceInDays(now, time);
    if (dayDiff > 0) return `${dayDiff} days ago`;

    const hourDiff = differenceInHours(now, time);
    if (hourDiff > 0) return `${hourDiff} hours ago`;

    const minuteDiff = differenceInMinutes(now, time);
    if (minuteDiff > 0) return `${hourDiff} minutes ago`;
  }
}

export const staticService = new StaticService();
