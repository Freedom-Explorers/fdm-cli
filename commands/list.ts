// 查看提供好的模板项目清单
import fse from 'fs-extra'

fse.readdir('../lib/template',(err,files) => {
    console.log(files)
})
