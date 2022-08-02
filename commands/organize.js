let fs = require("fs");
let path = require("path");
let typesObj = require("../utility");

function organizeFn(dirPath){

  if(dirPath == undefined)
  {
     dirPath = process.cwd();
  }

  let doesPathExist = fs.existsSync(dirPath);

  if(doesPathExist)
  {
    let destPath = path.join(dirPath,"organized_files");
    if(fs.existsSync(destPath) == false)
    {
      fs.mkdirSync(destPath);
    }
    organizeHelper(dirPath,destPath);
  }else{
    console.log("Invalid path");
    return;
  }
  
}

function organizeHelper(src,dest){
  
  let files = fs.readdirSync(src);

  for(let i=0;i<files.length;i++){
    let fPath = path.join(src,files[i]);

    let isFile = fs.lstatSync(fPath).isFile();

    if(isFile)
    {
       let category = categoryHelper(fPath);
       console.log(files[i],"belongs to",category);

       copyFiles(fPath,dest,category);
    }
   
  }
}


function copyFiles(srcFilePath,dest,category){
  let categoryPath = path.join(dest,category);
  if(fs.existsSync(categoryPath) == false)
  {
    fs.mkdirSync(categoryPath);
  }

  // Create new file with same name as in src and copy the content from original file
  // to this file
  let filename = path.basename(srcFilePath);
  let destFilePath = path.join(categoryPath,filename);
  fs.copyFileSync(srcFilePath,destFilePath);
}

function categoryHelper(fPath){
  let ext = path.extname(fPath).substring(1);
      
  for(let type in typesObj.typeKey)
  {
     let extNames = typesObj.typeKey[type];

     for(let i=0;i<extNames.length;i++)
     {
       if(ext == extNames[i])
       {
          return type;
       }
     }
  }

  return "other";
}

module.exports = {
  organizeKey: organizeFn
}