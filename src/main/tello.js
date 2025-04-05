const dgram = require("node:dgram");
const { Buffer } = require("node:buffer");

class Tello {
  constructor() {
    this.io_port = 8889;
    this.state_port = 8890;
    this.host = "192.168.10.1";
    this.server = dgram.createSocket("udp4");
    this.state_info = dgram.createSocket("udp4");
    //this.state_info.bind(this.state_port);
    this.server.bind(9000);
    this.server.on("message", this._on_message);
    this.state = {};
    //this.state_info.on("message", this._on_state);
    this.state_info.on("message", (message, remote) => {
      // remote: { address: '192.168.10.1', family: 'IPv4', port: 8889, size: 127 }
      // message: <Buffer 70 69 74 63 68 ... >
      const readableMessage = message.toString();

      for (const e of readableMessage.slice(0, -1).split(";")) {
        this.state[e.split(":")[0]] = e.split(":")[1];
      }
      //console.log(this.state);
    });
    this.state_info.bind(8890, "0.0.0.0");
  }

  _on_state(msg, info) {
    //console.log(msg, info);
  }

  _on_message(msg, info) {
    //console.log(msg);
    //console.log(info);
    //console.log("Received %d bytes from %s:%d\n", msg.length, info.address, info.port);
  }

  send_message(message_text) {
    let message = Buffer.from(message_text);
    this.server.send(message, 0, message.length, this.io_port, this.host, function (err, bytes) {
      if (err) throw err;
    });
  }

  takeoff() {
    console.log("takeoff");
    this.send_message("command");
    this.send_message("takeoff");
  }

  getState() {
    return this.state;
  }

  land() {
    console.log("land");
    this.send_message("command");
    setTimeout(() => this.send_message("land"), 1000);
  }
}

const tello = new Tello();
module.exports.takeoff = () => tello.takeoff();
module.exports.land = () => tello.land();
module.exports.getState = () => tello.getState();
module.exports.up = (value) => tello.send_message("up " + value);
module.exports.down = (value) => tello.send_message("down " + value);
module.exports.forward = (value) => tello.send_message("forward " + value);
module.exports.cw = (value) => tello.send_message("cw " + value);
module.exports.ccw = (value) => tello.send_message("ccw " + value);
module.exports.back = (value) => tello.send_message("back " + value);

console.log("Tello");
