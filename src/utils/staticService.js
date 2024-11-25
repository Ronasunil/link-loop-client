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

  displayActivityNotification(msg, type) {
    toast[type](msg, { duration: 3000, position: "top-center" });
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
    if (minuteDiff > 0) return `${minuteDiff} minutes ago`;
  }

  validateImg(img) {
    const imageTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/webp", "image/avif"];
    return img && imageTypes.includes(img.type);
  }

  convertImgToBase64(img) {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);

      reader.onload = () => {
        res(reader.result);
      };

      reader.onerror = () => {
        rej(false);
      };
    });
  }
  async processImg(img) {
    const validatedImg = this.validateImg(img);
    if (!validatedImg) return alert(`Can't upload this image`);

    const base64Img = await this.convertImgToBase64(img);

    if (!base64Img) return alert(`Can't upload this image`);

    return base64Img;
  }

  checkUserIsBlocked(userId, blockedList) {
    return blockedList.some((id) => id === userId);
  }

  checkUserIsFollowed(followersList, userId) {
    return followersList.some((user) => user._id === userId);
  }

  filterObject(obj) {
    const newObj = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value) newObj[key] = value;
    }

    return newObj;
  }
}

export const staticService = new StaticService();
