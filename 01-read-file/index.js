const fs = require('fs')
const path = require('path')
const stream = new fs.ReadStream(path.join(__dirname, './text.txt'), 'utf-8')

const readable = () => {
  const data = stream.read()
  if (data) {
    console.log(data)
  }
}

stream.addListener('readable', readable)

stream.addListener('error', (err) => console.error(err))