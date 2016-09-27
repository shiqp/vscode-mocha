var vscode = require('vscode');
var command = require('./src/command.js');

function activate(context) {
    let subscriptions = context.subscriptions;
    subscriptions.push(vscode.commands.registerCommand('mocha.test', function () {
        command.test();
    }));
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;