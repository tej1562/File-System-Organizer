let fs = require("fs");
let path = require("path");

function treeFn(dirPath){
  if(dirPath == undefined)
  {
     treeHelper(process.cwd(),"");
     return;
  }else{
     let doesPathExist = fs.existsSync(dirPath);

     if(doesPathExist)
     {
        treeHelper(dirPath,"");
     }else{
       console.log("Invalid path");
       return;
     }
  }
}

function treeHelper(dirPath,indent){
  let isFile = fs.lstatSync(dirPath).isFile();

  if(isFile)
  {
      let fileName = path.basename(dirPath);
      console.log(indent + "|---" + fileName);
  }else{
      let dirName = path.basename(dirPath);
      console.log(indent + "|___" + dirName);

      let childFiles = fs.readdirSync(dirPath);

      for(let i=0;i<childFiles.length;i++)
      {
          let childFilePath = path.join(dirPath,childFiles[i]);

          // Recursion
          treeHelper(childFilePath,indent + "\t");
      }
  }
}

module.exports = {
  treeKey: treeFn
}