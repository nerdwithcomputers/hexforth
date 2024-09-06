import fs from "fs";

var stack = [];
var str = [];
var strStat;

let funcs = new Map();
var inProgFunc;
var funcStat = false;
// var funcIndex;

class splitspace{
    [Symbol.split](string){
        let s1 = string.split(" ");
        let s2 = [];
        for(let x of s1){            
            let y;
            y = x.split("\n");
            s2 = s2.concat(y);
        }
        return s2;
    }
};

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
            // console.log(funcs);
            // console.log(stack);
            // before you start, i didn't want switchception
            if(x.startsWith('"')){
                // start a string
                str.push(x.slice(1));
                strStat = true;
            }else if(x.startsWith('scribe')){
                // start scribing a function (or var, pretty much the same here)
                funcStat = true;
                funcs.set(x.substring(7,x.length-2), []);
                inProgFunc = x.substring(7,x.length-2);
            }else if(x.startsWith('(')){
                // call a function
                let func = funcs.get(x.substring(1, x.length-1));
                for(let i of func){
                    mainLoop(i);
                }
            }else{
                stack.push(x);
            }
            break;
        }
    }
}

function mainLoop(main){

    for(let x of main){
        if(!strStat && !funcStat){
            exec(x);
            console.log(funcs);
        } else if (strStat){
            if(!x.endsWith('"')){
                str.push(x.trim());
            }else{
                str.push(x.substring(0,x.length-1));
                strStat = false;
                stack.push(str.join(' '));
                str = [];
            }
        } else if (funcStat){
            if(x!='}'){
                funcs.get(inProgFunc).push(x);
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
    const program = p1.split(new splitspace);
    // console.log(program);

    mainLoop(program);
}

main();