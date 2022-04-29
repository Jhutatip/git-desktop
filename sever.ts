import express, {Request, Response } from 'express'
import {query} from 'express'
const data = [
    {
                 "id" : "1",
                "name" : "Jhutatip",
                "description" : "Kao"
    }]
const app = express()
const port = 3000
app.use(express.json());

app.get('/',(req:Request,res:Response)=>{
    console.log(JSON.stringify(req.headers));
    console.log('id: ' + req.query.id);
    res.json(data)
    res.status(201).send(" succeed")

});

app.post('/',(req:Request ,res:Response)=>{
    const user = req.body
    data.push(user)
    res.json(data)
    res.status(203).send("Non-Authoritative Information  server ")
})

app.put('/:id', (req ,res) => {
    const updateIndex = data.findIndex((data => data.id === req.params.id))
    res.json(Object.assign(data[updateIndex], req.body))
    res.status(202).send("Accepted  request ")
  })

app.delete('/:id', (req:Request ,res:Response) => {
    const deleteIndex = data.findIndex((data => data.id === req.params.id))
    data.splice(deleteIndex, 1)
    res.status(205).send("Delete Success")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })