const fs = require('fs')
const path = require('path')

fs.promises.readdir(path.join(__dirname, './secret-folder'), {withFileTypes: true})
.then(files => files.forEach(el => {
    if (el.isFile()) {
      fs.stat(path.join(__dirname, './secret-folder', el.name), (err, stats) => {
        if(err) return console.error(err)
        console.log(`${el.name.split('.')[0]} - ${el.name.split('.')[1]} - ${Number(stats.size / 1024).toFixed(3)}kb`)
      })
    }
}))
.catch((err) => console.error(err))