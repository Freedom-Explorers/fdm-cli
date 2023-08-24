import ora from 'ora'
import logSymbols from 'log-symbols'
import { get, del, set, Template } from '@util/store'
import { remove } from 'fs-extra'
import { TEMPLATE } from '@lib/config'
import { resolve } from 'path'

let templateList: Template[] = get('templateList')
const templateListNames = templateList.map((item) => item.name)

export function deleteTemplate(templateName:string) {
  if (!templateListNames.includes(templateName)) {
    console.error(logSymbols.error, '输入的模板名称不存在！')
  }
  
  try {
    // 删除存储中的对象信息
    delTelByName(templateName)
      // 删除文件存放目录的文件信息
    remove( resolve(TEMPLATE, templateName))
    console.log(logSymbols.success, '模板删除成功！')
  } catch (error) {
    console.error(logSymbols.error, error)
  }
}

const delTelByName = (templateName: string) => {
  templateList = templateList.filter((item) => {
    return item.name !== templateName
  })
  del('templateList')
  set('templateList',templateList)
}