import { get } from '@util/store'
import { ExecException, exec } from 'child_process'
import logSymbols from 'log-symbols'
import ora from 'ora'

const packageManager = get('packageManager')

const installTip = `${packageManager} Installing`
const installPackageTip = `Installing package:`
const unInstallTip = `${packageManager} unInstalling`
const unInstallPackageTip = `unInstalling package:`

export function installPackage(packageName: String) {
  const spinner = ora(
    `${packageName ? installPackageTip : installTip} ${packageName}...\n`
  ).start()
  exec(
    `${packageManager} install ${packageName}`,
    (error: ExecException, stdout: string, stderr: string) => {
      if (error) {
        spinner.fail('下载失败，似乎发生了什么错误')
        console.error(logSymbols.error, `Error: ${error.message}`)
        return
      }
      spinner.succeed('下载成功')
      console.log(logSymbols.success, `${stdout}`)
      console.error(logSymbols.error, `${stderr}`)
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
        console.error(logSymbols.error, `Error: ${error.message}`)
        return
      }
      spinner.succeed('删除成功')
      console.log(logSymbols.success, `${stdout}`)
      console.error(logSymbols.error, `${stderr}`)
    }
  )
}

export function mavenClear() {
    const spinner = ora(
        `mvn clear ...\n`
    ).start()
    exec(
        `mvn clear`,
        (error: ExecException, stdout: string, stderr: string) => {
            if (error) {
                spinner.fail('清理失败，似乎发生了什么错误')
                console.error(logSymbols.error, `Error: ${error.message}`)
                return
            }
            spinner.succeed('清理成功')
            console.log(logSymbols.success, `${stdout}`)
            console.error(logSymbols.error, `${stderr}`)
        }
    )
}

export function mavenInstall() {
    const spinner = ora(
        `mvn install ...\n`
    ).start()
    exec(
        `mvn install`,
        (error: ExecException, stdout: string, stderr: string) => {
            if (error) {
                spinner.fail('依赖下载失败，似乎发生了什么错误')
                console.error(logSymbols.error, `Error: ${error.message}`)
                return
            }
            spinner.succeed('依赖下载成功')
            console.log(logSymbols.success, `${stdout}`)
            console.error(logSymbols.error, `${stderr}`)
        }
    )
}

