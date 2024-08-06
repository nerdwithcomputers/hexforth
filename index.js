import fs from "fs";


class splitspace{
    [Symbol.split](string){
        let s1 = string.split(" ");
        var s2 = [];
        for(let x of s1){
            let y = x.split("\n");
            // console.log(y);
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
            resolve(data.toString());
        }
    });
});


async function main(){
    const pathto = process.argv[2];
    console.log(pathto);
    const p1 = await readfile(pathto);
    const program = p1.split(new splitspace);
    console.log(program);

    // const proglen = program.len;

    const stack = [];

    for(let x of program){
        console.log(x);
        switch(x){
            // case "+":{
            //     stack[stack.len-1] = stack[stack.len] + stack[stack.len-1];
            //     // console.log(stack);
            //     stack.pop();
            // }
            // case "-":{
            //     stack[stack.len-1] = stack[stack.len] - stack[stack.len-1];
            //     stack.pop();
            // }
            // case "*":{
            //     stack[stack.len-1] = stack[stack.len] * stack[stack.len-1];
            //     stack.pop();
            // }
            // case "*":{
            //     stack[stack.len-1] = stack[stack.len] / stack[stack.len-1];
            //     stack.pop();
            // }
            case "print":{
                console.log(stack[stack.len]);
            }
            default:{
                stack.push(x);
            }
        }
    }
    console.log(stack);
}

main();