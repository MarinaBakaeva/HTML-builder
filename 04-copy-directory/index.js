const fs = require('fs')
const path = require('path')

const copyDir = () => {
  fs.mkdir(path.join(__dirname, './files-copy'), {recursive: true}, () => {
    fs.promises.readdir(path.join(__dirname, './files-copy'))
    .then(files => files.forEach(el => {
      fs.unlink(path.join(__dirname,'./files-copy/', el), err => {
        if(err) return console.error(err)
      })
    }))
    .catch((err) => console.error(err))
    
    fs.promises.readdir(path.join(__dirname, './files'), {withFileTypes: true})
    .then(files => files.forEach(el => {
      if(el.isFile()) {
        fs.promises.copyFile(path.join(__dirname, './files', el.name), path.join(__dirname, './files-copy', el.name))
      }
    }))
    .catch((err) => console.error(err))
  })
}

copyDir()