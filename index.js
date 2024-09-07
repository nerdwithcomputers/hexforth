import fs from "fs";

var stack = [];

let funcs = new Map();
var inProgFunc;
var funcStat = false;
// var funcIndex;


const readfile = (location) => 
new Promise((resolve, reject) => {
    fs.readFile(location, 'utf-8', (err,data)=>{
        if(err){
            console.error(err);
            return reject(err);
        }else{
            resolve(data);            
        }
    });
});

function exec(x){
    // console.log(x);
    switch(x){
        case "": break;
        case "+":{
            stack[stack.length-2] = parseInt(stack[stack.length-1]) + parseInt(stack[stack.length-2]);
            stack.pop();
            break;
        }
        case "-":{
            stack[stack.length-2] = parseInt(stack[stack.length-1]) - parseInt(stack[stack.length-2]);
            stack.pop();
            break;
        }
        case "*":{
            stack[stack.length-2] = parseInt(stack[stack.length-1]) * parseInt(stack[stack.length-2]);
            stack.pop();
            break;
        }
        case "/":{
            stack[stack.length-2] = parseInt(stack[stack.length-1]) / parseInt(stack[stack.length-2]);
            stack.pop();
            break;
        }
        case "%":{
            stack[stack.length-2] = parseInt(stack[stack.length-1]) % parseInt(stack[stack.length-2]);
            stack.pop();
            break;
        }
        case "exile":{
            stack.pop();
            break;
        }
        case "simulacrum":{
            stack.push(stack[stack.length-1]);
            break;
        }
        case "print":{
            console.log(stack[stack.length-1]);
            break;
        }
        case "printS":{
            console.log(stack);
            break;
        }
        default:{
            if(x.startsWith('scribe(')){
                // start scribing a function (or var, pretty much the same here)
                funcStat = true;
                funcs.set(x.substring(7,x.length-2), []);
                inProgFunc = x.substring(7,x.length-2);
            }else if(x.startsWith('(')){
                // call a function
                let func = funcs.get(x.substring(1, x.length-1));
                // console.log(func);
                for(let i of func){
                    exec(i);
                }
            }else if(x.startsWith('"') && x.endsWith('"')){
                stack.push(x.substring(1,x.length-1));
            }else if(x.startsWith(':')){
                let compline = x.split(' ');
                compline.shift();
                for(let i of compline) exec(i);
            }else{
                stack.push(x);
            }
            break;
        }
    }
}

function mainLoop(main){

    for(let x of main){
        let y=x.trim();
        if(!funcStat){
            exec(y);
        } else if(funcStat){
            if(y!='}'){
                funcs.get(inProgFunc).push(y);
            }else{
                funcStat = false;
            }
        }
    }

}

async function main(){
    const pathto = process.argv[2];
    // console.log(pathto);
    const p1 = await readfile(pathto);
    const program = p1.split('\n');

    mainLoop(program);
}

main();