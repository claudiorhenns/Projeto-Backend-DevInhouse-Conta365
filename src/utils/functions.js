const { json } = require('express/lib/response');
const fileSystem = require('fs');


function getData(fileName = 'fake-users.json'){
    const result = JSON.parse(fileSystem.readFileSync('src/database/'+fileName,'utf8'));
    return result;
}

function createOrUpdate(data, filename = 'fake-users.json'){
    fileSystem.writeFileSync('src/database/'+filename, JSON.stringify(data));
}

function parseData(updateItem, oldItem){
    return{
        name: updateItem.name ? updateItem.name : oldItem.name,
        email: updateItem.email ? updateItem.email : oldItem.email
    
    }
}

function parseData2(financialData, oldItem){
        return {...oldItem, financialData} ;    
}

function status(res,code,response){
   return res.status(code).send(response)
}

function statusJson(res,code,response){
   return res.status(code).json(response);
}


module.exports ={
    getData,
    createOrUpdate,
    parseData,
    parseData2,
    status,
    statusJson
}