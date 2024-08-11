import fs from "fs";

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


async function main(){
    const pathto = process.argv[2];
    // console.log(pathto);
    const p1 = await readfile(pathto);
    const program = p1.split(new splitspace);
    // console.log(program);

    const stack = [];
    let str = [];
    let strstat;

    for(let x of program){
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
                // before you start, i didn't want switchception
                if(x.startsWith('"')){
                    str.push(x.slice(1));
                    strstat = true;
                }else if(strstat && x.endsWith('"')){
                    strstat = false;
                    str.push(x.slice(0,-1));
                    stack.push(str.join(" "));
                    str = [];
                }else if(strstat){
                    console.log(x);
                    str.push(x);
                }else{
                    stack.push(x);
                }
            }
        }
    }
    // console.log(stack);
}

main();