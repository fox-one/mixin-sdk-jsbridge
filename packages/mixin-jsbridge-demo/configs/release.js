const shell = require('shelljs');

async function autoGit () {
  const simpleGit = require('simple-git/promise');
  const git = simpleGit(__dirname);
  let gitStatus = null
  try {
    gitStatus = await git.checkout('debug/main', () => {
      shell.exec('./script.sh');
      git.add();
      git.commit('update: docs');
      git.push();
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
