const { getData, parseData2, parseData3, createOrUpdateData } = require("../utils/functions")
const userService = require('../services/user.service');
const financialService = require('../services/financial.service');
const xlsxPopulate = require ('xlsx-populate');

module.exports = {

    async index(req, res){
       // #swagger.tags = ['EndPoints for FinancialAccounts']
       // #swagger.description = "Acessa e retorna as informações de <b>TODAS</b> as contas financeiras do banco"
       const response =  await financialService.resolvePromissesForCompanies();      
       return res.status(200).send({message: response})
    },

    async indexOne(req,res){
       // #swagger.tags = ['EndPoints for FinancialAccounts']
       // #swagger.description = "Acessa e retorna as informações de <b>UMA</b> conta financeira do banco através do <b>ID do usúario</b>"
        const { userId }= req.params;
    
           try{

            const financial =  await financialService.resolvePromissesForCompanies(userId); 
           
            if(!financial) throw new Error('Não existem conta cadastrada para esse ID');

            return res.status(200).json({financial: financial});
           
    
            }catch (error){
                 return res.status(400).json({error: error.message});
             }
       
    },

    async importTransactions(req, res){
       // #swagger.tags = ['EndPoints for FinancialAccounts']
       // #swagger.description = "Acessa uma planilha com <b>extensão xlsx</b> e importa as transações financeiras para <b>UM</b> usúario informado no endpoint"

       /*
          #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['file'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
              description: 'Arquivo com transações financeiras...',
        } */

        const { userId } = req.params;
        const financialAccount = await financialService.resolvePromissesForCompanies(userId);   
        const fullList = await financialService.resolvePromissesForCompanies();  

        if(!financialAccount){
            return res.status(400).send({message: "Conta para o usuario com id "+userId+" não encontrada"})
        }

        const transactions = financialAccount.financialData.map((item)=>{
            return item;           
        });        
        
        

        const xlsxlBuffer = req.file.buffer;
        const xlsxData = await xlsxPopulate.fromDataAsync(xlsxlBuffer);

        const rows = xlsxData.sheet(0).usedRange().value();
        const [ firstRow ] = rows;
        const keys = ['price', 'typesOfExpenses', 'date', 'name'];

        const existAllKeys = firstRow.every((item,index)=>{
            return keys[index] === item;
        });

        if(!existAllKeys || firstRow.length != 4){
            return res.status(400).send({message: "Necessário enviar todos os campos corretamente dentro da planilha"});
        }

        const filterRows = rows.filter((_, index)=> index != 0);
       
        filterRows.map((row)=>{
            const result = row.map((itemRow, index)=>{
                return {
                    [firstRow[index]]: itemRow ? itemRow : ''
                }
            })

            console.log(transactions.length);
            if(transactions.length>0){ 
                const valuesCell = Object.assign({},{id: transactions[transactions.length-1].id+1}, ...result);
                transactions.push(valuesCell);
                console.log("2");
            }
            if(transactions.length == 0){
                const valuesCell = Object.assign({},{id: 1}, ...result);
                transactions.push(valuesCell);
                console.log("1");
            }
            
      
        });
           

            const newData = parseData2 (transactions,financialAccount);

            const numberAccount = financialAccount.id;

            const newUpdatedList = fullList.map((item)=>{
                if(item.id ===Number(numberAccount)){
                     return newData;
                }else{
                     return item;
                 }
            });
       
            createOrUpdateData(newUpdatedList,"fake-financial.json");

           

        return res.status(200).send({message: "Transações adicionadas com sucesso"});
    },

    async deleteFinancialdata(req, res){
         // #swagger.tags = ['EndPoints for FinancialAccounts']
       // #swagger.description = "Acessa uma conta financeira com base no <b>Id do Usuário</b> e <b>DELETA</b> a transação financeira com base no <b>Id da transação</b>"
   
        const { userId, financialId } = req.params;
        const financialAccount = await financialService.resolvePromissesForCompanies(userId);

        
        if(!financialAccount){
            return res.status(400).send({message: "Conta para o usuario com id "+userId+" não encontrada"})
        }

        const transactions = financialAccount.financialData.map((item)=>{
              return item;           
        });

        const numberAccount = financialAccount.id;

        const findFinancialTransaction = transactions.find((item) => item.id === Number(financialId));

        if(!findFinancialTransaction){
            return res.status(400).send({message: "essa transação não existe"})
        }

        const financialData = transactions.filter((item)=>{
            if(item.id != Number(financialId)){
             return item;
            }
        });

        const newData = parseData2 (financialData,financialAccount);
      
        const fullList = await financialService.resolvePromissesForCompanies();  
       // const listWithoutUpdatedItem = fullList.filter((item)=> item.id != Number(numberAccount) );
       //const newUpdatedList = [...listWithoutUpdatedItem,newData];
         
       const newUpdatedList = fullList.map((item)=>{
            if(item.id ===Number(numberAccount)){
                return newData;
            }else{
                return item;
            }
       });
       
      createOrUpdateData(newUpdatedList,"fake-financial.json");
      return res.status(200).send({message: "Transação deletada com sucesso"});
    }
}