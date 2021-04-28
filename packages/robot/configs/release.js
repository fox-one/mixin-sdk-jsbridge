const shell = require('shelljs');

async function autoGit () {
  const simpleGit = require('simple-git/promise');
  const git = simpleGit(__dirname);
  let gitStatus = null
  try {
    gitStatus = await git.checkout('rebot/main', () => {
      shell.exec('yarn release');
    })
    console.info(`[git - status]: ${gitStatus}`)
  } catch (e) {
    // handle the error
    console.error(`[git - error]: ${e}`)
    return true
  }
  return true
}

autoGit();
