import * as core from '@actions/core'
import * as github from '@actions/github'

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  const myToken = core.getInput('token')
  const octokit = github.getOctokit(myToken)
  const context = github.context

  const ref = github.context.ref

  /*
  const sha = github.context.sha
  const newBranch = await octokit.rest.git.createRef({
    ...context.repo,
    ref: ref,
    sha: sha
  })
  core.debug(`newBranch ${newBranch.status}`)
  */
  const head = ref.split('/')[2]

  const newPullRequest = await octokit.rest.pulls.create({
    ...context.repo,
    title: 'New pull request!',
    base: 'main',
    head: head
  })
  core.debug(`newPullRequest.status ${newPullRequest.status}`)
  const getPR = await octokit.rest.pulls.list({
    ...context.repo
  })
  for (let i = 0; i < getPR.data.length; i++) {
    core.debug(getPR.data[i].title)
  }
}
