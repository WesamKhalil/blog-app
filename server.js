const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('working')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port ' + (process.env.PORT || 3000))
})