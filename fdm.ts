import { Command } from 'commander'

const program = new Command()

program.usage('<command>')

// 版本号命令
program.version('0.0.2', '-v, --version')

program
  .command('create')
  .option('-n --name <projectName>', 'your projectName')
  .option('-v2 --vue2', 'create a vue2 project')
  .option('-v3 --vue3', 'create a vue3 project')
  .description('create a new vue project')
  .action(async (option) => {
    const { createProject } = await import('./commands/create')
    return createProject(option)
  })

program
  .command('list')
  .description('List the templateList')
  .action(() => {
    import('./commands/list')
  })

program
  .command('install <packageName>')
  .option('install a package')
  .action(async (packageName) => {
    const { installPackage } = await import('./commands/install')
    return installPackage(packageName)
  })

//解析我们定义的命令并处理参数
program.parse(process.argv)
