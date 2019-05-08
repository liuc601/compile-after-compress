/* 
    这个插件用来压缩文件，通过配置，将编译生成后的文件压缩生成rar或zip格式的文件
*/
const pluginName = 'CompileAftercomPress';
var fs = require('fs');
var path = require('path');
var zipper = require("zip-local");
var defaultObj = {
    inputpath: '',
    outname: ''
}
class CompileAftercomPress {
    constructor(option) {
        if (!option) {
            throw 'Compile-after-compress missing parameter'
        } else if (typeof option == 'object') {
            this.option = Object.assign(defaultObj, option);
        } else if (typeof option == 'string') {
            defaultObj.inputpath = option;
            defaultObj.outname = path.basename(option) + ".zip";
            this.option = defaultObj;
        }
        var root = process.cwd();
        this.option.inputpath = path.resolve(root, this.option.inputpath);
    }
    apply(compiler) {
        compiler.hooks.afterEmit.tap(pluginName, res => {
            fs.stat(this.option.inputpath, (err, stats) => {
                if (err) {
                    throw err
                }
            })
            zipper.sync.zip(this.option.inputpath).compress().save(this.option.outname);
        })
    }
}

module.exports = CompileAftercomPress;