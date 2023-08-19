import ora from 'ora'
import logSymbols from 'log-symbols'
import config from '@util/store'
import { execSync } from 'child_process'
const spinner = ora('切换中...\n').start()
export function switchPackageManager(packageManager: String) {
  if (!packageManager) {
    // 默认包管理器为npm
    config.set('packageManager', 'npm')
    spinner.succeed(`当前为npm!`)
  } else {
    if (packageManagerExists(packageManager)) {
      spinner.succeed(`切换成功，已切换为${packageManager}!`)
    }
  }
}

function packageManagerExists(packageManager: String) {
  try {
    // 尝试执行命令，如果命令不存在会抛出异常
    execSync(`${packageManager} -v`, { stdio: 'ignore' })
    return true
  } catch (error) {
    spinner.fail('切换失败')
    console.log(logSymbols.error, error)
    return false
  }
}
