const fs = require('fs')
const path = require('path')
const StringDecoder = require('string_decoder').StringDecoder
const decoder = new StringDecoder('utf8')

try {
  (async function() {

    // css files
    await fs.promises.rm(path.join(__dirname, './project-dist'), {recursive: true, force: true})
    await fs.promises.mkdir(path.join(__dirname, './project-dist'), {recursive: true})

    const styleFiles = await fs.promises.readdir(path.join(__dirname, './styles'), {withFileTypes: true})
    const styleStram = fs.createWriteStream(path.join(__dirname, './project-dist/style.css'))
    styleFiles.forEach(async (file) => {
      if(file.name.split('.')[1] === 'css') {
        fs.createReadStream(path.join(__dirname, './styles', file.name), 'utf8').addListener('data', data => {
          styleStram.write(data)
        })
      }
    })

    // html files
    await fs.promises.copyFile(path.join(__dirname, './template.html'), path.join(__dirname, './project-dist/index.html'))

    const data = await fs.promises.readFile(path.join(__dirname, `./project-dist/index.html`))
    let editedData = decoder.write(data)

    const htmlFiles = await fs.promises.readdir(path.join(__dirname, './components'), {withFileTypes: true})
    htmlFiles.forEach(async (file) => {
      const code = await fs.promises.readFile(path.join(__dirname, `./components/${file.name}`))
      const editedCode =  decoder.write(code)

      editedData = editedData.replace(`{{${file.name.split('.')[0]}}}`, editedCode)

      await fs.promises.writeFile(path.join(__dirname, `./project-dist/index.html`), editedData, err => {
        if(err) return console.error(err)
      })
    })

    // asset files
    const copyDir = (file, copyFile) => {
      fs.mkdir(path.join(copyFile), {recursive: true}, () => {
        fs.promises.readdir(file, { withFileTypes: true})
        .then (files => files.forEach(el => {
          if(el.isDirectory()) {
            copyDir(path.join(file, `./${el.name}`), path.join(copyFile, `./${el.name}`))
          }
          if(el.isFile()) {
            fs.promises.copyFile(path.join(file, `./${el.name}`), path.join(copyFile, `./${el.name}`))
          }
        }))
        .catch((err) => console.error(err))
      })
    }

    copyDir(path.join(__dirname, `./assets`),  path.join(__dirname, `./project-dist/assets`))
  })()
} catch(err) {
  console.log(err)
}