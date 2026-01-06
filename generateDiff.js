import { promisify } from 'util'
import { exec } from 'child_process'

const asyncExec = promisify(exec);

const generateDiff = async (baseBranch, head) => {
    try {
        if (!baseBranch || !head) {
            throw new Error('Both the branches are requiredd');
        }
        const diff = `git diff -M -U10 ${baseBranch}...${head}`;

        const { stdout, stderr } = await asyncExec(diff);

        if (stderr && !stdout) {
            throw new Error(`Git error : ${stderr} , context : gitDiff generation`)
        }
        if (!stdout || stdout.trim().length === 0) {
            throw new Error(`No changes detected b/w the branches`)
        }

        return stdout;

    } catch (error) {
        throw new Error(`Failed to generate diff , ${error.message}`)
    }
}

export default generateDiff
