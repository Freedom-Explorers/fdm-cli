import { copy, pathExistsSync } from 'fs-extra'
import inquirer from 'inquirer'
import ora from 'ora'
import logSymbols from 'log-symbols'
import { resolve } from 'path'
const { prompt } = inquirer
import { CWD, TEMPLATE } from '@lib/config'
import { get, Template } from '@util/store'
const templateList: Template[] = get('templateList')
const templateNum = templateList.length
const templateNames = templateList.map((tem) => {
  return tem.name
})

export async function createProject(project: { name: string }) {
  if (!templateNum) {
    console.error(
      logSymbols.error,
      '模板库中似乎还没有模板，快通过save命令保存一个吧'
    )
    return
  }
  const { name } = project.name
    ? project
    : await prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Your Project Name: ',
          default: 'new-app'
        }
      ])
  const Choice = await prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Select your project: ',
      choices: templateNames
    }
  ])
  const dir = resolve(CWD, name)

  if (pathExistsSync(dir)) {
    console.log(logSymbols.error, `${name} already exists`)
    return
  }
  const template = resolve(TEMPLATE, Choice.template)
  const spinner = ora('正在创建中...\n').start()
  try {
    await copy(template, dir)
    spinner.succeed('创建成功，请查看结果')
  } catch (error) {
    spinner.fail('创建失败')
    console.log(logSymbols.error, error)
  }
}
