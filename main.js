import fs from "fs";

//console.log(pathto);

const readfile = (location) => 
new Promise((resolve, reject) => {
    fs.readFile(location, 'utf-8', (err,data)=>{
        if(err){
            console.error(err);
            return reject(err);
        }else{
            resolve(data.toString().split(' '));
        }
    });
});


async function main(){
    const pathto = process.argv[2];
    const program = await readfile(pathto);
    console.log(program);
}

main();