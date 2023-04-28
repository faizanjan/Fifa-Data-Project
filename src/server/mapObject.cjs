function mapObject(obj, callback) {
    if (!checkArg(obj)) return {};
    if(typeof(callback)!=='function') throw new Error("Invalid Callback")
    let newObject = {};
    for (let key in obj){
        newObject[key]=callback(obj[key],key);
    }
    return newObject;
}

const checkArg = arg =>{
    if(!arg || typeof(arg)!=='object' || arg.length===0) return false;
    else return true;
}

module.exports = mapObject;
