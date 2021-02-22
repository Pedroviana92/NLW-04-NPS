import express from 'express';
const app = express();

app.get('/', (req, res)=> {
    return res.json({
        mensagem: "servidor rodando"
    })
})
app.post('/', (req, res)=> {
    return res.json({
        mensagem: "post funfando"
    })
})
app.listen(3050, ()=> console.log("Server is running!"));