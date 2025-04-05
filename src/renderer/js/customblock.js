// Block creation tool https://blockly-demo.appspot.com/static/demos/blockfactory/index.html
import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";

let drone_blocks_color = 70;

export const createCustomBlocks = function () {
  /* Get Filter */
  var filterData = {
    type: "filter_signal",
    message0: "filter between %1 and  %2 %3",
    args0: [
      {
        type: "field_input",
        name: "low",
        text: "0"
      },
      {
        type: "field_input",
        name: "high",
        text: "30"
      },
      {
        type: "input_value",
        name: "signal"
      }
    ],
    output: null,
    colour: 230,
    tooltip: "",
    helpUrl: ""
  };

  Blockly.Blocks["filter_signal"] = {
    init: function () {
      this.jsonInit(filterData);
    }
  };

  javascriptGenerator.forBlock["filter_signal"] = function (block, generator) {
    var text_low = block.getFieldValue("low");
    var text_high = block.getFieldValue("high");
    var value_signal = generator.valueToCode(block, "signal", Order.ATOMIC);
    var code = `filterSignal(${value_signal}, ${text_low}, ${text_high})`;
    return [code, Order.None];
  };

  ///////// Delta

  var getDeltaPower = {
    type: "delta",
    message0: "delta",
    output: null,
    colour: 330,
    tooltip: "",
    helpUrl: ""
  };

  Blockly.Blocks["delta"] = {
    init: function () {
      this.jsonInit(getDeltaPower);
    }
  };

  javascriptGenerator.forBlock["delta"] = function (block, generator) {
    var code = "getDelta()";
    return [code, Order.FUNCTION_CALL];
  };

  ///////// Theta

  var getThetaPower = {
    type: "theta",
    message0: "theta",
    output: null,
    colour: 330,
    tooltip: "",
    helpUrl: ""
  };

  Blockly.Blocks["theta"] = {
    init: function () {
      this.jsonInit(getThetaPower);
    }
  };

  javascriptGenerator.forBlock["theta"] = function (block, generator) {
    var code = "getTheta()";
    return [code, Order.FUNCTION_CALL];
  };

  ///////// Alpha

  var getAlphaPower = {
    type: "alpha",
    message0: "alpha",
    output: null,
    colour: 330,
    tooltip: "",
    helpUrl: ""
  };

  Blockly.Blocks["alpha"] = {
    init: function () {
      this.jsonInit(getAlphaPower);
    }
  };

  javascriptGenerator.forBlock["alpha"] = function (block, generator) {
    var code = "getAlpha()";
    return [code, Order.FUNCTION_CALL];
  };

  ///////// Beta

  var getBetaPower = {
    type: "beta",
    message0: "beta",
    output: null,
    colour: 330,
    tooltip: "",
    helpUrl: ""
  };

  Blockly.Blocks["beta"] = {
    init: function () {
      this.jsonInit(getBetaPower);
    }
  };

  javascriptGenerator.forBlock["beta"] = function (block, generator) {
    var code = "getBeta()";
    return [code, Order.FUNCTION_CALL];
  };

  ///////// Gamma

  var getGammaPower = {
    type: "gamma",
    message0: "gamma",
    output: null,
    colour: 330,
    tooltip: "",
    helpUrl: ""
  };

  Blockly.Blocks["gamma"] = {
    init: function () {
      this.jsonInit(getGammaPower);
    }
  };

  javascriptGenerator.forBlock["gamma"] = function (block, generator) {
    var code = "getGamma()";
    return [code, Order.FUNCTION_CALL];
  };

  /////////
  var blockly_print = {
    message0: "print %1",
    args0: [{ type: "input_value", name: "val", check: "Number" }],
    previousStatement: null,
    nextStatement: null,
    colour: 330
  };

  Blockly.Blocks["print"] = {
    init: function () {
      this.jsonInit(blockly_print);
    }
  };

  javascriptGenerator.forBlock["print"] = function (block) {
    var text = javascriptGenerator.valueToCode(block, "val", Order.ATOMIC);
    var code = `blockly_print(${text});\n`;
    return code;
  };
};

///

var wait_block = {
  type: "wait_seconds",
  message0: " wait %1 seconds",
  args0: [
    {
      type: "field_number",
      name: "SECONDS",
      min: 0,
      max: 600,
      value: 1
    }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "%{BKY_LOGIC_HUE}"
};

Blockly.Blocks["wait_seconds"] = {
  init: function () {
    this.jsonInit(wait_block);
  }
};

javascriptGenerator.forBlock["wait_seconds"] = function (block) {
  var seconds = Number(block.getFieldValue("SECONDS"));
  var code = "wait_seconds(" + seconds + ");\n";
  return code;
};

//////
/* droneUp() */
var droneUp = {
  type: "drone_up",
  message0: "up %1 cm",
  args0: [{ type: "input_value", name: "value", check: "Number" }],
  previousStatement: null,
  nextStatement: null,
  colour: drone_blocks_color
};

Blockly.Blocks["drone_up"] = {
  init: function () {
    this.jsonInit(droneUp);
  }
};

javascriptGenerator.forBlock["drone_up"] = function (block, generator) {
  var value = generator.valueToCode(block, "value", Order.NONE);
  var code = `drone_up(${value});\n`;
  return code;
};

//////////

/* droneDown() */
var droneDown = {
  type: "drone_down",
  message0: "down %1 cm",
  args0: [{ type: "input_value", name: "value", check: "Number" }],
  previousStatement: null,
  nextStatement: null,
  colour: drone_blocks_color
};

Blockly.Blocks["drone_down"] = {
  init: function () {
    this.jsonInit(droneDown);
  }
};

javascriptGenerator.forBlock["drone_down"] = function (block, generator) {
  var value = generator.valueToCode(block, "value", Order.NONE);
  var code = `drone_down(${value});\n`;
  return code;
};

//////////
/* droneForward() */
var droneForward = {
  type: "drone_forward",
  message0: "forward %1 cm",
  args0: [{ type: "input_value", name: "value", check: "Number" }],
  previousStatement: null,
  nextStatement: null,
  colour: drone_blocks_color
};

Blockly.Blocks["drone_forward"] = {
  init: function () {
    this.jsonInit(droneForward);
  }
};

javascriptGenerator.forBlock["drone_forward"] = function (block, generator) {
  var value = generator.valueToCode(block, "value", Order.NONE);
  var code = `drone_forward(${value});\n`;
  return code;
};

//////////
/* droneBack() */
var droneBack = {
  type: "drone_back",
  message0: "back %1 cm",
  args0: [{ type: "input_value", name: "value", check: "Number" }],
  previousStatement: null,
  nextStatement: null,
  colour: drone_blocks_color
};

Blockly.Blocks["drone_back"] = {
  init: function () {
    this.jsonInit(droneBack);
  }
};

javascriptGenerator.forBlock["drone_back"] = function (block, generator) {
  var value = generator.valueToCode(block, "value", Order.NONE);
  var code = `drone_back(${value});\n`;
  return code;
};

//////////
/* ccw() */
var ccw = {
  type: "ccw",
  message0: "rotate counter-clockwise %1 cm",
  args0: [{ type: "input_value", name: "value", check: "Number" }],
  previousStatement: null,
  nextStatement: null,
  colour: drone_blocks_color
};

Blockly.Blocks["ccw"] = {
  init: function () {
    this.jsonInit(ccw);
  }
};

javascriptGenerator.forBlock["ccw"] = function (block, generator) {
  var value = generator.valueToCode(block, "value", Order.NONE);
  var code = `ccw(${value});\n`;
  return code;
};

//////////
/* cw() */
var cw = {
  type: "cw",
  message0: "rotate clockwise %1 cm",
  args0: [{ type: "input_value", name: "value", check: "Number" }],
  previousStatement: null,
  nextStatement: null,
  colour: drone_blocks_color
};

Blockly.Blocks["cw"] = {
  init: function () {
    this.jsonInit(cw);
  }
};

javascriptGenerator.forBlock["cw"] = function (block, generator) {
  var value = generator.valueToCode(block, "value", Order.NONE);
  var code = `cw(${value});\n`;
  return code;
};

//////
/* takeoff() */
var takeoff = {
  type: "takeoff",
  message0: "takeoff",
  args0: [],
  previousStatement: null,
  nextStatement: null,
  colour: drone_blocks_color
};

Blockly.Blocks["takeoff"] = {
  init: function () {
    this.jsonInit(takeoff);
  }
};

javascriptGenerator.forBlock["takeoff"] = function (block, generator) {
  var code = `takeoff();\n`;
  return code;
};

/* land() */
var land = {
  type: "land",
  message0: "land",
  args0: [],
  previousStatement: null,
  nextStatement: null,
  colour: drone_blocks_color
};

Blockly.Blocks["land"] = {
  init: function () {
    this.jsonInit(land);
  }
};

javascriptGenerator.forBlock["land"] = function (block, generator) {
  var code = `land();\n`;
  return code;
};
