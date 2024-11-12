import { avatarColors } from "./staticData";

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
}

export const staticService = new StaticService();
