require('shelljs/global')
var config = require('../config')
var File = config.build.assetsPublicPath.replace(/\//g, '')
const path = require('path')
var PATH = path.resolve(__dirname, '../../') + '/pub/'
var distFile = PATH + File + '.zip'
rm('-rf', distFile)
var fs = require('fs')
var archiver = require('archiver')
var output = fs.createWriteStream(distFile)
var archive = archiver('zip')
output.on('close', function () {
  // rm('-rf', 'dist')
  console.log('\nzip path:', distFile.replace(/\//g, '\\'))
  console.log('zip size:', archive.pointer() + ' total bytes')
  console.log('archiver has been finalized and the output file descriptor has closed.')
})
archive.on('error', function (err) {
  throw err
})
archive.pipe(output)
// append files from a sub-directory, putting its contents at the root of archive
archive.directory('dist', false);
archive.glob('../dist')
archive.finalize()


