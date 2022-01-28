const { getData } = require("../utils/functions");


module.exports ={

    async resolvePromissesForFinancialAccounts(id){

        const allAcounts = getData('fake-financial.json');
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