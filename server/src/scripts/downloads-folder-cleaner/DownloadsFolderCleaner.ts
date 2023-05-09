import fs from "fs";
import path from "path";

function deleteFolderRecursive(dirPath: string) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

export default function clearPublicFolder() {
  const dirPath = path.join(__dirname, "../../../../public/downloads");
  deleteFolderRecursive(dirPath);
  fs.mkdirSync(dirPath);
  console.log(">>> Public folder has been cleaned!");
}
