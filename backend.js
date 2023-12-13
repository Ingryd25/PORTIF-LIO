//Importar os módulos necessários 
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require ("mysql");

//Inicializar o aplicativo Express
const app= express();

//Configurar o middleware body-parser para lidar com dados do form
app.use(bodyParser.urlencoded({extended:true}));

const connection = mysql.createConnection({
    host: 'seu_host_mysql',
    user: 'seu_usuario_mysql',
    password: 'sua_senha_musql',
    database: 'seu_banco_de_dados_mysql'

});

connection.connect((err)=>{
     if(err){
        console.error('Erro ao conectar ao banco de dados:', err)
        return;
     }
     console.log('Conexão com o banco de dados MySQL estavelecida!');
});


//Rota inicial (página de login)
app.get('/',(req,res)=>{
    res.send(`       
        <h1>Login</h1>
        <form action="/login" method="post">
            <div>
                <label for="username">Usuario</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div>
                <label for="password">Senha</label>
                <input type="password" id="password" name="password" required>
                    
                     </div>
                     <button type="submit">Entrar</button>
        </form>
    `                  );
});
app.post('/login',(req, res)=>{
    const{nome, senha}= req.body;

    const query = 'SELECT * FROM aulabancodedados WERE nome = ? AND senha = ?';
    connection.query(query, [ nome,senha],(err,results)=>{
        if(err){
            res.send('Erro ao autenticar o usuário');
            return;
        }
        if(results.length > 0){
            res.send('Login bem-sucedido!');
        }else{
            res.send('Credenciais invalidas. Tente novamente')
        }
    });
});
    
// Rota para cadastrar um novo usuário
app.post('/cadastro', (req, res) => {
    const { username, password } = req.body;
  
    const query = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
    connection.query(query, [username, password], (err, results) => {
      if (err) {
        res.send('Erro ao cadastrar o usuário.');
        return;
      }
      
      res.send('Cadastro bem-sucedido!');
    });
  });
  


const PORT = 3000;
app.listen(PORT,()=>{
    console.log('Servidor rodando em http://localhost;${PORT}');
});