const mapObject = require('../server/mapObject.cjs');

test("Returns an empty object if invalid first argument is passed",()=>{
    let invalidArgs = ["arg", ['arg'], 404, true, null, undefined];
    let someCallBack = (el)=>{el};
    for(let arg in invalidArgs){
        expect(mapObject(arg,someCallBack)).toEqual({});
        expect(mapObject(arg,someCallBack)).toBeDefined();
        expect(mapObject(arg,someCallBack)).not.toBeNull();
    }
})

test("Throws an Error if second argument is missing or is not a function", ()=>{
    let invalidCallBacks = ["arg", ['arg'], 404, true, null, undefined];
    let someObject = {one:1, two:2};
    for(let cbs in invalidCallBacks){
        expect(()=>{mapObject(someObject,cbs)}).toThrow("Invalid Callback");
    }
})

test("Returns an Object if valid arguments are passed", ()=>{
    let someCallBack = (el)=>{el};
    let someObject = {one:1, two:2};
    expect(mapObject(someObject,someCallBack)).toBeDefined();
    expect(mapObject(someObject,someCallBack)).not.toBeNull();
})