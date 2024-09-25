const path = require('path');
const fs = require('fs');

function onBeforeBuildFinish (options, callback) {
    Editor.log('Starting IEC Before Build Finish Script');

    const mainJsPath = path.join(options.dest, 'main.js');
    const mainJSTemplatePath = path.join(options.project, 'build-template', options.platform, 'main.js');

    fs.copyFileSync(mainJSTemplatePath, mainJsPath)

    Editor.log(`Template File: ${mainJSTemplatePath}`);
    Editor.log(`Template copied to: ${mainJsPath}`)

    callback();
}

module.exports = {
    load () {
        Editor.Builder.on('before-change-files', onBeforeBuildFinish);
    },

    unload () {
        Editor.Builder.removeListener('before-change-files', onBeforeBuildFinish);
    }
};