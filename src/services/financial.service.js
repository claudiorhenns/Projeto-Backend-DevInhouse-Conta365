const { getData } = require("../utils/functions");
const userService = require('./user.service');


module.exports ={

    async resolvePromissesForCompanies(id){

        const allAcounts = getData('fake-financial.json');

       /* const accountsWithUsers = allAcounts.map(async (item) =>{
            const userId = await (userService.getUserById(item.userId));
                    
            return {...item,userId }
        });  */    
 
        const response = await Promise.all(allAcounts);
        

        try{
            if(id){

                const financial = response.find((item)=> item.userId === Number(id));
                return financial;
            }           
            return response;
    
            }catch (error){
                return {err: error.message};
            }

        
    }

}