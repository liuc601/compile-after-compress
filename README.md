# compile-after-compress
webpack compile after compress,file to zip
how to use?
npm install compile-after-compress
const CompileAfterCompress = require('compile-after-compress');

new CompileAfterCompress({
    inputpath: 'folder_name',
    outname: 'folder_name.zip',
})
or
new CompileAfterCompress("folder_name")
