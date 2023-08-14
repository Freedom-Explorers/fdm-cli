import fse from 'fs-extra'
import inquirer from 'inquirer'
import { resolve } from 'path'
const { prompt } = inquirer
const { copy, pathExistsSync } = fse
import { CWD, VUE_TEMPLATE } from '@lib/config/index.js'

export async function createProject(project: Record<string, string>) {
  const { name } = project.name
    ? project
    : await prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Your Vue Project Name: ',
          default: 'vue-app'
        }
      ])
  const isSelectVersion = project.vue2 ? 'vue2' : project.vue3 ? 'vue3' : false
  const { vueVersion } = isSelectVersion
    ? { vueVersion: isSelectVersion }
    : await prompt([
        {
          type: 'list',
          name: 'vueVersion',
          message: 'Select the version of your project: ',
          choices: ['vue2', 'vue3']
        }
      ])
  const dir = resolve(CWD, name)
  if (pathExistsSync(dir)) {
    console.log(`${name} already exists`)
    return
  }
  const template = resolve(VUE_TEMPLATE, vueVersion == 'vue2' ? 'vue2app' : 'vue3app')
  await copy(template, dir)
}
