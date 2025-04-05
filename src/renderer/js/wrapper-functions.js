//import { blocklyHooks } from "./blockly-hooks";
import { filterSignal } from "./utils";

export const WrapperFunctions = class {
  constructor(workspace) {
    this.workspace = workspace;
  }

  async filterSignalWrapper(list, callback) {
    try {
      let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 3, 4, 5, 6, 7, 2, 2, 4, 5];
      callback(arr);
    } catch (error) {
      return error;
    }
  }

  async wait_seconds(timeInSeconds, callback) {
    setTimeout(callback, timeInSeconds * 1000);
  }

  highlightWrapper(id) {
    id = String(id || "");
    return this.workspace.highlightBlock(id);
  }

  blockly_print(text) {
    console.log(text);
  }

  getDelta() {
    return window.band_powers.delta;
  }

  getTheta() {
    return window.band_powers.theta;
  }

  getAlpha() {
    return window.band_powers.alpha;
  }

  getBeta() {
    return window.band_powers.beta;
  }

  getGamma() {
    return window.band_powers.gamma;
  }

  drone_up(value) {
    console.log("drone up");
    window.electronAPI.droneUp(value);
  }

  drone_down(value) {
    console.log("drone down");
    window.electronAPI.droneDown(value);
  }

  drone_forward(value) {
    console.log("drone forward");
    window.electronAPI.droneForward(value);
  }

  drone_back(value) {
    console.log("drone back");
    window.electronAPI.droneBack(value);
  }

  ccw(value) {
    console.log("ccw");
    window.electronAPI.ccw(value);
  }

  cw(value) {
    console.log("cw");
    window.electronAPI.cw(value);
  }

  takeoff() {
    window.electronAPI.manualControl("takeoff");
  }

  land() {
    window.electronAPI.manualControl("land");
  }
};
