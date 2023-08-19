import { exec }  from 'child_process';
import ora from 'ora'

export function unInstallPackage(packageName: any) {
  const spinner = ora(`unInstalling package: ${packageName}...\n`).start();
  exec(`npm uninstall ${packageName}`, (error: { message: any; }, stdout: any, stderr: any) => {
    if (error) {
      spinner.fail('删除失败，似乎发生了什么错误');
      console.error(`Error: ${error.message}`);
      return;
    }
    spinner.succeed('删除成功');
    console.log(`${stdout}`);
    console.error(`${stderr}`);
  });
}

