import { io } from "socket.io-client";

export default class Socket {
  static instance;
  socket;

  constructor() {
    if (Socket.instance) return Socket.instance;

    Socket.instance = this;
    this.socketConnection();
  }

  socketConnection() {
    this.socket = io(process.env.API_URL, { secure: true, transports: ["websocket"] });
    this.socketConnectionEvents();
  }

  socketConnectionEvents() {
    this.socket.on("connect", () => {
      console.log("socket client connected");
    });

    this.socket.on("disconnect", (msg) => {
      console.log(`socket client disconnected ${msg}`);
      this.socket.connect();
    });

    this.socket.on("connect_error", (msg) => {
      console.log(`socket client disconnected ${msg}`);
      this.socket.connect();
    });
  }
}
