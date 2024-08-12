import fs from "fs";

var stack = [];
var str = [];
var strStat;
let funcs = new Map();
var inProgFunc = [];
// var funcIndex;
var funcStat = false;

class splitspace{
    [Symbol.split](string){
        let s1 = string.split(" ");
        let s2 = [];
        for(let x of s1){
            // console.log(x);
            let y;
            y = x.split("\n");
            s2 = s2.concat(y);
            // console.log(s2);
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
            // console.log(data);
        }
    });
});

function exec(x){
    switch(x){
        case "": break;
        case "scribe":{
            funcStat = true;
            break;
        }
        case "cut":{
            funcStat = false;
            console.log
            break;
        }
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
            console.log(funcs);
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
                // console.log(x);
                str.push(x);
            }else{
                try{
                    funcs.get(x);
                    for(j in funcs.get(x)){
                        exec(j);
                    };
                }catch(error){
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
        // if(funcStat && x!="cut"){
        //     inProgFunc.push(x);
        //     console.log(inProgFunc)
        // }else if(funcStat && x=="cut"){
        //     let funcName = inProgFunc[0];
        //     inProgFunc.shift();
        //     funcs.set(funcName, inProgFunc);
        // }else{
            exec(x);
        // }
        
    }
}

main();