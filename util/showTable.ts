import Table from 'cli-table3'
import logSymbols from 'log-symbols'
import { Template } from '@util/store'

const table = new Table({
  head: ['模板名', '模板信息'],
  style: {
    head: ['green']
  }
})

export function showTable(tempList: Template[]) {
  const list = tempList
  if (list.length > 0) {
    list.forEach((tem) => {
      table.push([tem.name, tem.description])
      if (table.length === list.length) {
        console.log(table.toString())
        process.exit()
      }
    })
  } else {
    console.log(logSymbols.info, '模板库中暂无模板，请等待官方添加哦~')
    process.exit()
  }
}
