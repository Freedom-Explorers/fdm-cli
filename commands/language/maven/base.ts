import ora from 'ora'
import logSymbols from 'log-symbols'
import { execSync } from 'child_process'
const spinner = ora('切换中...\n').start()

export const mavenBaseCommand = {
    isExit: function isExit(){
        try {
            // 尝试执行命令，如果命令不存在会抛出异常
            execSync(`mvn -v`, { stdio: 'ignore' })
            return true
        } catch (error) {
            spinner.fail('切换失败')
            console.error(logSymbols.error, error)
            return false
        }
    }
}

