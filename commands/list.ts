import ora from 'ora'
import logSymbols from 'log-symbols'
import { showTable } from '@util/showTable'
import { get, Template } from '@util/store'

const spinner = ora('正在为你拼命加载...\n').start()
const templateList: Template[] = get('templateList')
const templateNum = templateList.length

try {
  if (templateNum === 0) {
    spinner.fail('模板库中似乎还没有模板，快新建一个吧')
  } else {
    spinner.succeed('模板库加载成功，请查看结果')
    // console.log(files)
    showTable(templateList)
  }
} catch (error) {
  console.error(logSymbols.error, error)
}
