#!/usr/bin/env node
import dotenv from 'dotenv'
dotenv.config();
import identifyBaseBranch from './identifyBaseBranch.js';
import generateDiff from './generateDiff.js';
import { simpleGit } from 'simple-git';
import generatePrompt from './prompts/generatePrompt.js';
import { generatePR } from './generatePRContent.js'
import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();
const git = simpleGit();

program
   .name('prcraft')
   .description('PR title and description using AI')
   .version('1.0.0')
   .option('-b , --brief', 'Brief description')
   .option('-t , --technical', 'Technical description')
   .option('-d , --detailed', 'Detailed description')
   .parse();

const options = program.opts();

async function run() {
   try {

      const baseBranch = await identifyBaseBranch();
      if (baseBranch === 'upstream/main') {
         console.log(`${chalk.green('✔')} ${'upstream found for diffing'}`);
      }
      else if (baseBranch === 'origin/main') {
         console.log(`${chalk.yellow('⚠')} ${chalk.dim('using origin as base branch')}`);
      }
      else if (baseBranch === 'main' || baseBranch === 'master') {
         console.log(`${chalk.yellow('⚠')} ${chalk.dim('no remote base branch found , falling back to local branch')}`);

      }

      const headBranchInfo = await git.branchLocal();
      const headBranch = headBranchInfo.current;

      console.log(`${chalk.cyan('→')} ${chalk.dim(`comparing ${baseBranch} with ${headBranch}`)}`);

      const diff = await generateDiff(baseBranch, headBranch);

      if (!diff || diff.trim().length === 0) {
         console.log(`${chalk.yellow('⚠')} ${chalk.dim('no differences found between branches')}`);
         return;
      }
      console.log(`${chalk.green('✔')} ${chalk.dim('diff generated successfully')}`);

      const prompt = generatePrompt(diff, options);

      const pr = await generatePR(prompt);

      console.log(`${chalk.green('\n✔ PR generated successfully')}`);

      console.log(`${chalk.bold('Title:')}`);
      console.log(pr?.title);

      console.log(`${chalk.bold('Description:')}`);

      const desc = pr?.description.split(/\.\s+/).map((p) => p.trim() + (p.endsWith('.') ? '' : '.'))

      desc.forEach(element => {
         console.log(element);

      });




   } catch (error) {
      console.error(`${chalk.red('✖')} ${chalk.dim(error.message)}`)
      process.emit(1);
   }



}

run()
