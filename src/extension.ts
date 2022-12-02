// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { TextDecoder } from 'util';
import * as vscode from 'vscode';
// Get the default instance
const axios = require('axios')

type User = {
	userId: number;
	id: number;
	title: string;
	completed: string;
};


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "hello" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('hello.helloWorld', async () => {
		const resp = await axios.get(
			'https://jsonplaceholder.typicode.com/posts',
			{
				headers: {
					'Accept-Encoding': 'application/json',
				}
			}
		);
		let s = JSON.stringify(resp.data, null, 4);
		console.log(s);
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			editor.edit(editBuilder => {
				editBuilder.insert(editor.selection.active, s);
			});
		}

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
