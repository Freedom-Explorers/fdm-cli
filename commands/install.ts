import { exec }  from 'child_process';
import ora from 'ora'

export function installPackage(packageName: any) {
  const spinner = ora(`Installing package: ${packageName}...\n`).start();
  exec(`npm install ${packageName}`, (error: { message: any; }, stdout: any, stderr: any) => {
    if (error) {
      spinner.fail('下载失败，似乎发生了什么错误');
      console.error(`Error: ${error.message}`);
      return;
    }
    spinner.succeed('下载成功');
    console.log(`${stdout}`);
    console.error(`${stderr}`);
  });
}

