const express = require('express')
const bodyParser = require('body-parser')
const monk = require('monk')
const db = monk('localhost/my-test-database')
const cats = db.get('cats')

const app = express();

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/',(req,res,next) => {
  cats.find({})
  .then(docs => res.json(docs))
})

app.get('/:id',(req,res,next) => {
  cats.find(req.params.id)
  .then(docs => res.json(docs))
  .catch(err=> next(err))
})

app.post('/', (req,res,next)=> {
  cats.insert(req.body)
  .then(result => res.json(result))
  .catch(err=> next(err))
})

app.put('/:id',(req,res,next)=>{
  cats.update({ _id: req.params.id}, req.body)
  .then(result => res.json(result))
})

app.delete('/:id', (req,res,next) => {
  cats.remove(req.params.id)
  .then(() => res.send('Cat Deleted 😾'))
  .catch(err => next(err))
})

app.listen(3000, () => console.log('listening on port 3000'))
