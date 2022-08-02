#!/usr/bin/env node

let helpObj = require("./commands/help");
let organizeObj = require("./commands/organize");
let treeObj = require("./commands/tree");

let inputArr = process.argv.slice(2);
console.log(inputArr);
let command = inputArr[0];

switch(command)
{
  case "organize":
    organizeObj.organizeKey(inputArr[1]);
    break;
  case "tree":
    treeObj.treeKey(inputArr[1]);
    break;
  case "help":
    helpObj.helpKey();
    break;
  default: console.log("Please enter correct command") ;
    break;
}