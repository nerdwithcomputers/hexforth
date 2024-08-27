import fs from "fs";

var stack = [];
var str = [];
var strStat;
let funcs = new Map();
var inProgFunc;
// var funcIndex;
var funcStat = false;

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
                str.push(x.slice(1));
                strStat = true;
            }else if(strStat && x.endsWith('"')){
                strStat = false;
                str.push(x.slice(0,-1));
                stack.push(str.join(" "));
                str = [];
            }else if(strStat){
                str.push(x);
            }else if(x == "scribe{"){
                funcStat = true;
            }else if(funcStat && x.startsWith("(")){
                funcs.set(x, []);
            }else{
                if(x.startsWith('(')){
                    for(let j in funcs.get(x)){
                        exec(j)
                    }
                }else{
                    stack.push(x);
                }
            }
            break;
        }
    }
}

async function main(){
    const pathto = process.argv[2];
    // console.log(pathto);
    const p1 = await readfile(pathto);
    const program = p1.split(new splitspace);
    // console.log(program);

    for(let x of program){
        exec(x);
    }
}

main();