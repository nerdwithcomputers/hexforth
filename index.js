import fs from "fs";


class splitspace{
    [Symbol.split](string){
        let s1 = string.split(" ");
        let s2 = [];
        for(let x in s1){
            x.split("\n");
            s2 += x;
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
    const program = await readfile(pathto.split(new splitspace));
    console.log(program);
}

main();