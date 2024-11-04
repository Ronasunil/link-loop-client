import { avatarColors } from "./staticData";

class StaticService {
  generateRandomColor() {
    const color = avatarColors[Math.floor(Math.random() * avatarColors.length)];
    return color;
  }

  generateAvatarImg(letter, bgColor) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, 200, 200);

    ctx.fillStyle = "white";
    ctx.font = "bold 80px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(letter.toUpperCase(), 100, 100);

    return canvas.toDataURL("image/png");
  }
}

export const staticService = new StaticService();
