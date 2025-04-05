const { contextBridge, ipcRenderer } = require("electron");

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("electron", {
    send: (channel, data) => {
      // whitelist channels
      let validChannels = ["toMain", "showDialog"];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    receive: (channel, func) => {
      let validChannels = ["fromMain"];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    }
  });

  contextBridge.exposeInMainWorld("electronAPI", {
    manualControl: (command) => ipcRenderer.send("manual-control", command),
    controlSignal: (response) => ipcRenderer.send("control-signal", response),
    droneUp: (response) => ipcRenderer.send("drone-up", response),
    droneDown: (response) => ipcRenderer.send("drone-down", response),
    droneForward: (response) => ipcRenderer.send("drone-forward", response),
    droneBack: (response) => ipcRenderer.send("drone-back", response),
    cw: (response) => ipcRenderer.send("cw", response),
    ccw: (response) => ipcRenderer.send("ccw", response),
    getBLEList: (callback) => ipcRenderer.on("device_list", callback),
    getDroneState: (callback) => ipcRenderer.on("drone_state", callback),
    selectBluetoothDevice: (deviceID) => ipcRenderer.send("select-ble-device", deviceID),
    cancelBluetoothRequest: (callback) => ipcRenderer.send("cancel-bluetooth-request", callback),
    bluetoothPairingRequest: (callback) => ipcRenderer.on("bluetooth-pairing-request", callback),
    bluetoothPairingResponse: (response) => ipcRenderer.send("bluetooth-pairing-response", response)
  });
});
