import { WrapperFunctions } from "./wrapper-functions";

export const InterpreterAPI = class {
  constructor(workspace) {
    this.wrapperFunctions = new WrapperFunctions(workspace);
    this.nativeFunctions = {
      highlightBlock: this.wrapperFunctions.highlightWrapper,
      getDelta: this.wrapperFunctions.getDelta,
      getTheta: this.wrapperFunctions.getTheta,
      getAlpha: this.wrapperFunctions.getAlpha,
      getBeta: this.wrapperFunctions.getBeta,
      getGamma: this.wrapperFunctions.getGamma,
      blockly_print: this.wrapperFunctions.blockly_print,
      drone_up: this.wrapperFunctions.drone_up,
      drone_down: this.wrapperFunctions.drone_down,
      drone_forward: this.wrapperFunctions.drone_forward,
      drone_back: this.wrapperFunctions.drone_back,
      ccw: this.wrapperFunctions.ccw,
      cw: this.wrapperFunctions.cw,
      takeoff: this.wrapperFunctions.takeoff,
      land: this.wrapperFunctions.land
    };
    this.asyncFunctions = {
      filterSignal: this.wrapperFunctions.filterSignalWrapper,
      wait_seconds: this.wrapperFunctions.wait_seconds
    };
  }

  init(interpreter, globalObject) {
    for (let [key, value] of Object.entries(this.nativeFunctions)) {
      interpreter.setProperty(
        globalObject,
        key,
        interpreter.createNativeFunction(value.bind(this.wrapperFunctions))
      );
    }

    for (let [key, value] of Object.entries(this.asyncFunctions)) {
      interpreter.setProperty(
        globalObject,
        key,
        interpreter.createAsyncFunction(value.bind(this.wrapperFunctions))
      );
    }
  }
};
