import fs from "fs";

// LE STACK
var stack = [];

let funcs = new Map();
var inProgFunc;
var funcStat = false;


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
        case "twice":{
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
                for(let i of func){
                    exec(i);
                }
            }else if(x.startsWith('"') && x.endsWith('"')){
                stack.push(x.substring(1,x.length-1));
            }else if(x.startsWith(':')){
                // compose a line
                let compline = x.split(' ');
                compline.shift();
                for(let i of compline) exec(i);
            }else if(x.startsWith('//')){
                break;
            }else if(x.startsWith('if(')){
                let tests = x.split(' ');
                // get rid of delimiters
                tests.shift();
                tests.pop();

                var results = 0;
                for(let test of tests){
                    test = test.split('');
                    switch(test[0]){
                        case '<':{                            
                            test.shift();
                            test = test.join('');
                            if(test > stack[stack.length-1]) results++;
                            break;
                        }
                    }
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