import { CWD, TEMPLATE } from '@lib/config'
import { get, set, Template } from '@util/store'
import pkg, { copy } from 'fs-extra'
import inquirer from 'inquirer'
import logSymbols from 'log-symbols'
import { resolve } from 'path'
const { readdirSync } = pkg
const { prompt } = inquirer

interface Option {
  list?: string
}

export async function save(option: Option, args: string[]) {
  if (option.list) {
    const nowPath = resolve(CWD, option.list)
    const list = readdirSync(nowPath, { withFileTypes: true }).filter(
      (item) => !item.name.startsWith('.') && item.isDirectory()
    )
    for (const iterator of list) {
      await saveTemplate(resolve(nowPath, iterator.name), iterator.name)
    }
  } else {
    const [path, name = ''] = args
    saveTemplate(path, name)
  }
}

async function saveTemplate(path: string, name: string) {
  if (!path) return console.log(logSymbols.error, '请输入模板路径')
  const realPath = resolve(CWD, path)
  const fileName = realPath.split(/[\\\/]/).pop()
  if (!name) name = fileName ?? ''
  const templateList = get('templateList')
  const templateListSet = new Set(templateList.map((item: any) => item.name))
  if (templateListSet.has(name)) {
    console.log(logSymbols.error, `${name}模板名已存在`)
    const { reName } = await prompt([
      {
        type: 'input',
        name: 'reName',
        message: '请重新命名: '
      }
    ])
    return saveTemplate(path, reName)
  } else {
    const { description } = await prompt([
      {
        type: 'input',
        name: 'description',
        message: '请输入描述: ',
        default: name
      }
    ])
    const template: Template = {
      name,
      description
    }
    templateList.push(template)
    set('templateList', templateList)
    copy(realPath, resolve(TEMPLATE, name))
    console.log(logSymbols.success, `${name}模板保存成功`)
  }
}
