// const path = require('path');
// const fs = require('fs');
// const util = require('util');
// const appVersion = require('./../../../src/assets/configs/app-config.json').appRelease;
// const readDir = util.promisify(fs.readdir);
// const writeFile = util.promisify(fs.writeFile);
// const readFile = util.promisify(fs.readFile);


// const versionFilePath = path.join(__dirname + './../../../dist/portal-client/version.json');
// let mainHash = '';
// let mainBundleFile = '';

// let mainBundleRegexp = /^main.?([a-z0-9]*)?(\.bundle)?.js$/;

// readDir(path.join(__dirname, './../../../dist/portal-client/'))
//   .then(files => {

//     mainBundleFile = files.find(f => mainBundleRegexp.test(f));

//     if (mainBundleFile) {
//       let matchHash = mainBundleFile.match(mainBundleRegexp);
//       if (matchHash.length > 1 && !!matchHash[1]) {
//         mainHash = matchHash[1];
//       }
//     }

//     const src = `{"version": "${appVersion}", "hash": "${mainHash}"}`;
//     return writeFile(versionFilePath, src);
//   }).then(() => {
//     if (!mainBundleFile) {
//       return;
//     }
//     const mainFilepath = path.join(__dirname, './../../../dist/portal-client/', mainBundleFile);
//     console.log('LOG 57 || mainFilepath:', mainFilepath);

//     return readFile(mainFilepath, 'utf8')
//       .then(mainFileData => {

//         const replacedFile = mainFileData.replace('{{POST_BUILD_ENTERS_HASH_HERE}}', mainHash)
//           .replace('{{POST_BUILD_ENTERS_HASH_HERE}}', mainHash)
//           .replace('{{POST_BUILD_ENTERS_HASH_HERE}}', mainHash)
//           .replace('{{POST_BUILD_ENTERS_HASH_HERE}}', mainHash)
//           .replace('{{POST_BUILD_ENTERS_HASH_HERE}}', mainHash)
//           .replace('{{POST_BUILD_ENTERS_HASH_HERE}}', mainHash);
//         return writeFile(mainFilepath, replacedFile);
//       });
//   }).catch(err => {
//     console.log('Error with post build:', err);
//   });
