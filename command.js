#!/usr/bin/env node

const app = require('./app');
const yargs = require('yargs');

// Command options.
const options = yargs
    .usage('Usage: -d <name>')
    .option('d', {
      alias: 'dir',
      describe: 'Folder name of converted files',
      type: 'string',
    })
    .argv;

// Convert the markdowns.
app.mdToHtml(options.dir);
