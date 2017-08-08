import EventHandler from "EventHandler";

export var events = new EventHandler();

export var computed = {};
export var methods = {};
export var watch = {};
export var debug = {
  msg: "Debug Default message"
};

export var wechat = {
  ble: {},
  bleSignal: [],
  scannedCode: "",
  near: null
};

export var status = {
  data: {}
};
