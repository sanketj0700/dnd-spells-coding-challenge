import * as fs from "fs";

const errorCodes: { [index: number]: string } = {
  0: "Info",
  1: "Warn",
  2: "Error"
};

const logger = (errorCode: number, componentName: string, error: any) => {
  const errorLine1 = "\n[" + errorCodes[errorCode].toUpperCase() + "] " + new Date().toLocaleString() + "\n";
  const errorLine2 = "Error in " + componentName + ": " + String(error) + "\n";
  fs.appendFileSync('../../public/logs.txt', errorLine1 + errorLine2);
};

export default logger;