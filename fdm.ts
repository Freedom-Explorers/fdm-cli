import { Command } from 'commander'
import { version } from '@/package.json'

const program = new Command()

program.usage('<command>')

// 版本号命令
program.version(version, '-v, --version')

program
  .command('create')
  .option('-n, --name <projectName>', 'your projectName')
  .description('create a new project')
  .action(async (option) => {
    const { createProject } = await import('@commands/create')
    return createProject(option)
  })

program
  .command('list')
  .description('List the templateList')
  .action(() => {
    import('@commands/list')
  })

program
  .command('install [packageName]')
  .description('install a package')
  .action(async (packageName: String) => {
    const { installPackage } = await import('@commands/installer')
    return installPackage(packageName ?? '')
  })

program
  .command('uninstall [packageName]')
  .description('uninstall a package')
  .action(async (packageName: String) => {
    const { unInstallPackage } = await import('@commands/installer')
    return unInstallPackage(packageName ?? '')
  })

program
  .command('switch [packageManager]')
  .description('switch packageManager')
  .action(async (packageManager: String) => {
    const { switchPackageManager } = await import('@commands/switch')
    return switchPackageManager(packageManager)
  })

program
  .command('save')
  .option('<templatePath> [reName]', 'your templatePath')
  .option('-l, --list <templatesPath>', 'your templateListPath')
  .description('save template[s]')
  .action(async (option, { args }) => {
    const { save } = await import('@commands/save')
    return save(option, args)
  })

//解析我们定义的命令并处理参数
program.parse(process.argv)
