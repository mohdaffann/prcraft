import { simpleGit } from 'simple-git'

const identifyBaseBranch = async () => {

    const git = simpleGit();
    const remoteList = await git.getRemotes(true);

    const includesUpstream = remoteList.some((branch) => branch.name === 'upstream');
    const includesOrigin = remoteList.some((branch) => branch.name === 'origin');

    const remoteBranches = [];

    if (includesUpstream) remoteBranches.push('upstream/main')
    if (includesOrigin) remoteBranches.push('origin/main')

    remoteBranches.push('main', 'master')

    for (const branch of remoteBranches) {
        try {
            await git.revparse([branch]);
            return branch;
        } catch {
            //catchh is used as a contidional for await , like if branch doesnt exist move to next
        }
    }
    throw new Error('No base branch could be detected!');

}

export default identifyBaseBranch