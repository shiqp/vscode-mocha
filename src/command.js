var vscode = require('vscode');
var path = require('path');
var fs = require('fs');
var Mocha = require('mocha');

exports.test = function() {
    var output = vscode.window.createOutputChannel('Mocha');
    output.show();
    output.clear();

    output.appendLine('Run tests...');

    var rootPath = vscode.workspace.rootPath;
    if (!rootPath) {
        output.appendLine('Error: Can not find a project.');
        return;
    }

    var mocha = new Mocha();
    mocha.useColors(true);

    var testDir = path.join(rootPath, 'test');

    fs.readdirSync(testDir).filter(function(file) {
        // console.log(file);
        return file.substr(-8) === '.test.js';
    }).forEach(function(file) {
        console.log(file);
        var filePath = path.join(testDir, file);
        delete require.cache[filePath];
        mocha.addFile(filePath);
    });

    try {
        var runner = mocha.run(function(failures){
            console.log('complete with code: ' + failures);
        });

        runner.on('pass', function(data) {
            // output.appendLine(data);
            console.log(data);
        });

        runner.on('fail', function(test, err) {
            console.log(test);
            // output.appendLine(test);
        });

    } catch (error) {
        // console.error(error);
    }
    
    // var proc = spawn();
}