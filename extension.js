const vscode = require('vscode');
const spawn = require('child_process').spawn;

function activate(context) {
    var disposable = vscode.commands.registerCommand('extension.startGit', function () {
        const {
            shellPath,
            cwd
        } = readOptions();

        const child = spawn('cmd.exe', ['/c', 'start', shellPath], {
            cwd
        });

        child.on('error', (err) => {
            vscode.window.showErrorMessage('start  shell error:' + err);
        });
    });

    var shellDisposable = vscode.commands.registerCommand('extension.startshell', () => {
        const shells = readShells();
        const cwd = vscode.workspace.rootPath;
        if (!shells) {
            vscode.window.showErrorMessage('Please set shells path first!');
            return;
        }
        vscode.window.showQuickPick(Object.keys(shells))
            .then((item) => {
                if (!item) return;
                const child = spawn('cmd.exe', ['/c', 'start', shells[item]], {
                    cwd
                });

                child.on('error', (err) => {
                    vscode.window.showErrorMessage('start  shell error:' + err);
                });
            });
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(shellDisposable);
}

function readShells() {
    const config = vscode.workspace.getConfiguration('startshell');

    const shells = config.get('shells');
    if (!shells) return;

    const result = {};
    shells.forEach((shell) => {
        result[shell.name] = shell.path;
    });

    return result;
}

function readOptions() {
    const config = vscode.workspace.getConfiguration('startgit');
    const shellPath = config.get('shellPath');
    let cwd = config.get('cwd');

    if (!shellPath) {
        vscode.window.showErrorMessage('Please set git shell path first!');
        return;
    }

    if (!cwd) {
        cwd = vscode.workspace.rootPath;
    }

    return {
        shellPath,
        cwd
    };
}

exports.activate = activate;

function deactivate() { }
exports.deactivate = deactivate;