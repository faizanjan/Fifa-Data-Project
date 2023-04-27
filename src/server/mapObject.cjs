function mapObject(obj, callback) {
    let newObject = {};
    for (let key in obj){
        newObject[key]=callback(obj[key],key);
    }
    return newObject;
}

module.exports = mapObject
