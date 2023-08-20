import config from '@util/store'
import { ExecException, exec } from 'child_process'
import logSymbols from 'log-symbols'
import ora from 'ora'

const packageManager = config.get('packageManager')

const installTip = `${packageManager} Installing`
const installPackageTip = `unInstalling`
const unInstallTip = `${packageManager} unInstalling`
const unInstallPackageTip = `unInstalling package:`

export function installPackage(packageName: String) {
  const spinner = ora(
    `${packageName ? installPackageTip : installTip} ${packageName}...\n`
  ).start()
  exec(
    `${packageManager} install ${packageName}`,
    (error: { message: any }, stdout: any, stderr: any) => {
      if (error) {
        spinner.fail('下载失败，似乎发生了什么错误')
        console.error(`Error: ${error.message}`)
        return
      }
      spinner.succeed('下载成功')
      console.log(`${stdout}`)
      console.error(`${stderr}`)
    }
  )
}

export function unInstallPackage(packageName: String) {
  const spinner = ora(
    `${packageName ? unInstallPackageTip : unInstallTip} ${packageName}...\n`
  ).start()
  exec(
    `npm uninstall ${packageName}`,
    (error: ExecException, stdout: string, stderr: string) => {
      if (error) {
        spinner.fail('删除失败，似乎发生了什么错误')
        console.error(`Error: ${error.message}`)
        return
      }
      spinner.succeed('删除成功')
      console.log(`${stdout}`)
      console.error(`${stderr}`)
    }
  )
}
