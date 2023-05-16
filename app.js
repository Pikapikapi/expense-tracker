const express = require('express')

//設定server
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('hello world!')
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})