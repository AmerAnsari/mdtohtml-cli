const fs = require('fs');
const path = require('path');
const directory = process.cwd();
const md = require('markdown-it')({
  linkify: true,
});

function mdToHtml(dir) {
  // Get the all markdown files of the directory.
  fs.readdirSync(directory).forEach(file => {

    // We don't need this file in our operation, so we'll ignore this JS file.
    if (file.endsWith('.md')) {

      // Target markdown path.
      const filePath = `${directory}/${file}`;

      // Setup HTML file name.
      const htmlFileName = file.replace('.md', '.html');

      // Html file path.
      let htmlFilePath = path.join(directory, htmlFileName);

      // Read the md file.
      fs.readFile(filePath, "utf8", (error, data) => {
        // Error.
        if (error) throw error;

        // Generate the folder (dir) for converted html files.
        if (dir) {
          htmlFilePath = path.join(directory, dir, htmlFileName);
          fs.mkdirSync(path.join(directory, dir), {recursive: true});
        }

        // Generate the HTML file which is converted from md file.
        fs.writeFile(htmlFilePath, md.render(data), function (err) {
          // Error.
          if (err) throw err;

          // Success message.
          console.log(`${htmlFileName} has created successfully.`);
        });
      });
    }
  });
}

// Module functions.
module.exports = {
  mdToHtml: mdToHtml,
};
