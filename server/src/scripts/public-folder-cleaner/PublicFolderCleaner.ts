import fs from "fs";
import path from "path";
import { Logger } from "../../infra/logger/logger";

function deleteFolderRecursive(dirPath: string) {
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const curPath = path.join(dirPath, file);
    if (fs.lstatSync(curPath).isDirectory()) deleteFolderRecursive(curPath);
    else fs.unlinkSync(curPath);
  }
  fs.rmdirSync(dirPath);
}

export default function clearPublicFolder(logger: Logger) {
  const dirPath = path.join(__dirname, "../../../../public/downloads");
  deleteFolderRecursive(dirPath);
  fs.mkdirSync(dirPath);
  logger.success("Public folder has been cleaned");
}
