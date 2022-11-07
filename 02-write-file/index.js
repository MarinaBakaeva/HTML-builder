const fs = require('fs')
const path = require('path')
const process = require('process')
const stream = fs.createWriteStream(path.join(__dirname, './text.txt'))

stream.addListener('error', (err) => console.error(err))

process.stdout.write('Hello! Write something!\n')

process.stdin.addListener('data', data => data.toString().trim() === 'exit' ? process.exit(process.stdout.write('Good bye!')) : stream.write(data))

process.addListener('SIGINT', () => process.exit(process.stdout.write('Good bye!')))