const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const models = require('./models');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let user=models.User;
let noticia=models.Noticia;

//CADASTRO
app.post('/cadastro', async (req, res) => {
    //procurar esse nome no banco de dados
    let response = await user.findOne({
        where:{name:req.body.name}
    });
    
    //Verificando se o login e senha batem com o banco de dados.
    if(response === null)
    {
        response = await user;
        if(req.body.senha === req.body.confSenha)
        {
            await user.create({
                name:req.body.name,
                password:req.body.senha,
            })
            res.send(JSON.stringify('Usuario cadastrado com sucesso!'));
        }
        else
        {
            res.send(JSON.stringify('Senhas não conferem!'));
        }
    }
    else
    {
        res.send(JSON.stringify("Usuario já existe!"));
    }

    //console.log(response);
});// cadastro*/


//LOGIN
app.post('/login', async (req, res) => {
    //console.log(req.body);

    //procurar um registro no banco de dados
    let response = await user.findOne({
        where:{name:req.body.name, password: req.body.password}
    });

    //Verificando se o login e senha batem com o banco de dados.
    if(response === null)
    {
        res.send(JSON.stringify("error"));
    }
    else
    {
        res.send(response);
    }
    //console.log(response);
});// login

 // criando rota da verificação de senha
app.post('/verifyPass', async (req, res) =>
{
    let response = await user.findOne({
        where:{id:req.body.id, password: req.body.senhaAntiga}
    });

    //Verificando se a confirmação da nova senha está correto.
    if(response === null)
    {
        res.send(JSON.stringify("Senha antiga não confere"));
    }
    else
    {
        if(req.body.novaSenha === req.body.confNovaSenha)
        {
            response.password = req.body.novaSenha; // se estiver tudo certo salvar a nova senha
            response.save();
            res.send(JSON.stringify('Senha atualizado com sucesso'));
        }
        else
        {
            res.send(JSON.stringify('Nova senha e confirmação não conferem'))
        }
        res.send(response);
    }
    //console.log(response);
});//troca de senha

//Criação das noticias no banco
app.post('/notices', async (req, res) =>
{
    let noticiaId='';
    await noticia.create({
        userId:req.body.id,
        titulo:req.body.titulo,
        descricao:req.body.descricao,
        local:req.body.local
    }).then((response)=>{

        noticiaId += response.id;
    });
});//noticias

//Ler as noticias
/*app.post('/read', async (req, res) => {
    let read = await noticia.findOne({
    });
    console.log(read);
    res.send(JSON.stringify(`${read.noticia}`))
});

/*app.get('/',(req,res)=>{
    res.send('Meu servidor backend já está rodando');
});

app.get('/create', async (req,res) => {
    let create = await user.create({
        name: "Alison",
        password: "4715", 
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    res.send('Usuário criado com sucesso!');
});

app.get('/read', async (req, res) => {
    let read = await user.findAll({
        raw:true,
    });
    console.log(read);
});

app.get('/update', async (req, res) => {
    let update = await user.findByPk(1).then((response) => {
        response.name='Alison Leme',
        response.password='chocolate',
        response.save();
    });
});

app.get('/delete', async (req, res) => {
    user.destroy({
        where: {id:1}
      });

});*/

let port = process.env.PORT || 3000;
app.listen(port,(req, res) =>{
    console.log('Servidor rodando');
});