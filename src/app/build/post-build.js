const path = require('path');
const fs = require('fs');
const util = require('util');

// get application version from package.json
// const appVersion = require('./../../../package.json').version;
const appVersion = require('./../../../src/assets/configs/app-config.json').appRelease;
// console.log('LOG 7 || appVersion:', appVersion);

// promisify core API's
const readDir = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

console.log('\nRunning post-build tasks');

// our version.json will be in the dist folder
const versionFilePath = path.join(__dirname + './../../../dist/portal-client/version.json');
// console.log('LOG 17 || versionFilePath:', versionFilePath);
let mainHash = '';
let mainBundleFile = '';

// RegExp to find main.bundle.js, even if it doesn't include a hash in it's name (dev build)
let mainBundleRegexp = /^main.?([a-z0-9]*)?(\.bundle)?.js$/;

// read the dist folder files and find the one we're looking for
readDir(path.join(__dirname, './../../../dist/portal-client/'))
  .then(files => {
    // console.log('LOG 27 || files:', files);

    mainBundleFile = files.find(f => mainBundleRegexp.test(f));
    // console.log('LOG 30 || mainBundleFile:', mainBundleFile);

    if (mainBundleFile) {
      let matchHash = mainBundleFile.match(mainBundleRegexp);
      // console.log('LOG 34 || matchHash:', matchHash);

      // if it has a hash in it's name, mark it down
      if (matchHash.length > 1 && !!matchHash[1]) {
        mainHash = matchHash[1];
      }
    }

    console.log(`Writing version and hash to ${versionFilePath}`);

    // write current version and hash into the version.json file
    const src = `{"version": "${appVersion}", "hash": "${mainHash}"}`;
    return writeFile(versionFilePath, src);
  }).then(() => {
    // main bundle file not found, dev build?
    if (!mainBundleFile) {
      return;
    }

    // console.log(`Replacing hash in the ${mainBundleFile}`);

    // replace hash placeholder in our main.js file so the code knows it's current hash
    const mainFilepath = path.join(__dirname, './../../../dist/portal-client/', mainBundleFile);
    console.log('LOG 57 || mainFilepath:', mainFilepath);

    return readFile(mainFilepath, 'utf8')
      .then(mainFileData => {
        // console.log('LOG 61 || mainFileData:', mainFileData);

        const replacedFile = mainFileData.replace('{{POST_BUILD_ENTERS_HASH_HERE}}', mainHash)
          .replace('{{POST_BUILD_ENTERS_HASH_HERE}}', mainHash)
          .replace('{{POST_BUILD_ENTERS_HASH_HERE}}', mainHash)
          .replace('{{POST_BUILD_ENTERS_HASH_HERE}}', mainHash)
          .replace('{{POST_BUILD_ENTERS_HASH_HERE}}', mainHash)
          .replace('{{POST_BUILD_ENTERS_HASH_HERE}}', mainHash);
        return writeFile(mainFilepath, replacedFile);
      });
  }).catch(err => {
    console.log('Error with post build:', err);
  });
