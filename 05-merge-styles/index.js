const fs = require('fs')
const path = require('path')

fs.promises.readdir(path.join(__dirname, './styles'), {withFileTypes: true})
.then(files => {
  const bundle = fs.createWriteStream(path.join(__dirname, './project-dist/bundle.css'))
  files.forEach(el => {
    if(el.name.split('.')[1] === 'css') {
      fs.createReadStream(path.join(__dirname, './styles', el.name), 'utf8').addListener('data', data => {
        bundle.write(data)
      })
    }
  })
})
.catch((err) => console.error(err))