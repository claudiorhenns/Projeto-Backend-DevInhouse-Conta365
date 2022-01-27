const { getData, createOrUpdateData, parseData } = require("../utils/functions")
const {translate} = require("../utils/constants");
const useService = require ('../services/user.service');
const axios = require('axios');

module.exports={
    async index(req,res){
        // #swagger.tags = ['EndPoints for Users']
        // #swagger.description = "Acessa e retorna as informações de <b>TODOS</b> os usúarios"
        const users = getData('fake-users.json');
        return res.status(200).json({'users': users});
    },

    async indexOne(req,res){
        // #swagger.tags = ['EndPoints for Users']
        // #swagger.description = "Acessa e retorna as informações de <b>UM</b> usúario pelo <b>ID</b>"


        const { id }= req.params;
        
        try{
            const response = await useService.getUserById(id);

            if(response.err) throw new Error(response.err);

            return res.status(200).json({ user: response});
    
            }catch (error){
                return res.status(400).json({error: error.message});
            }
       
    },

    async create(req, res){
        // #swagger.tags = ['EndPoints for Users']
        // #swagger.description = 'End point para <b>criação</b> de usuários. O id do usúario é gerado automaticamente'
        /*  #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    name: 'Claudio Rhenns',
                    email: 'rhenns-teste@gmail.com'
                }
        } */

        const { name , email } = req.body;
        const existKeyvalue = Object.keys(req.body).filter((item)=> !req.body[item]);
        const translateName = existKeyvalue.map((item)=> translate[item]);


        if(Object.keys(req.body).length < 2){
            return res.status(400).send({message: `Verifique o json enviado. Campos name e email são obrigatórios`});
        }

        if(existKeyvalue.length >= 1){
            return res.status(400).send({message: `Falta(m) este(s) dado(s): ${translateName.join(' - ')}`});
        }

        const users = getData('fake-users.json');
        const createNewUser = [
            ...users, {
                id: users.length+1,
                name: name,
                email: email,
                
            }
        ]
        createOrUpdateData(createNewUser);
        return res.status(200).send({message: "Usúario Adicionado"});
    },

    async updateOne(req, res){
        // #swagger.tags = ['EndPoints for Users']
        // #swagger.description = 'End point para <b>atualização</b> de dados dos usuários. <b>O id NÃO pode ser alterado</b>, mas deve ser informado para que o usúario seja enconrado. Atualiza <b>UM</b> usúario por vez. Só aceita os campos que ja existe na estrutura do objeto'
        /*  #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    name: 'Claudio Rhenns',
                    email: 'rhenns-teste@gmail.com'
                }
        } */

        const { id } = req.params;
        const { name, email} = req.body;
        const wrongKey = null;

        const users = getData('fake-users.json');
        const existUser = users.filter((item)=> item.id === Number(id));
        const [user] = existUser;
       
        if(!user){
            return res.status(400).send({message: "usúario com id "+id+ " não existe"});
        }

        const findForUpdate = Object.keys(req.body).map((item)=> {
            if(item == "name" || item =="email"){
                return {  [item]: req.body[item]  }
            }else{
                return res.status(400).send({message: "O campo "+item+ " não pode ser alterado, pois não existe na estrutura do usúario"});                       
            }
           
        } );


        const arrayToObject = Object.assign({}, ...findForUpdate);

        const userUpdateList = users.map((item)=>{
            if(item.id === Number(id)){
               return {id: Number(id), ...parseData(arrayToObject,item)}
            }else{
                return {...item};
            }
        } );

        createOrUpdateData(userUpdateList);

        return res.status(200).send({message: "Dados atualizados no usúario "+id});
    },

    async deleteOne(req, res){
        // #swagger.tags = ['EndPoints for Users']
        // #swagger.description = "Acessa e deleta <b>UM</b> usúario através de seu <b>ID</b>"

        const { id } = req.params;
        const users = getData();

        const findUser = users.find((item)=> item.id === Number(id));

        if(!findUser){
            return res.status(400).send({message: "Usúario com este ID não encontrado"})
        }

        const removeOnlyByIUdUsers = users.filter((item)=> item.id != Number(id));

        createOrUpdateData(removeOnlyByIUdUsers);

        return res.status(200).send({message: "Usúario deletado com sucesso"});
    }

}