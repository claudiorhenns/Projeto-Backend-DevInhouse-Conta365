const { json } = require('express/lib/response');
const fileSystem = require('fs');
const { userInfo } = require('os');


function getData(fileName = 'fake-users.json'){
    const result = JSON.parse(fileSystem.readFileSync('src/database/'+fileName,'utf8'));
    return result;
}

function createOrUpdateData(data, filename = 'fake-users.json'){
    fileSystem.writeFileSync('src/database/'+filename, JSON.stringify(data));
}

function parseData(updateItem, oldItem){
    return{
        name: updateItem.name ? updateItem.name : oldItem.name,
        email: updateItem.email ? updateItem.email : oldItem.email
      
        /* returm {...oldItem, ...updateItem} */
    }
}

function parseData2(financialData, oldItem){
        return {...oldItem, financialData} ;    
}



module.exports ={
    getData,
    createOrUpdateData,
    parseData,
    parseData2

}