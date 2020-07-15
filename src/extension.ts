// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const decorationType = vscode.window.createTextEditorDecorationType({
	border: "4px solid red"
  });
  
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('emptylines.emptylines', () => {
		let editor = vscode.window.activeTextEditor;
		if (!editor) { return; }
		
		let previousLine:string = ''
		const regexEmptyLine = /^[''\s]*$/
        let selection = editor.selection;        
		let text = editor.document.getText(selection);
		let emptyLines:number[]= []
		let decorationsArray: vscode.DecorationOptions[] = []
		text.split('\n').forEach((currentLine: string, lineIndex) => {           
			if (regexEmptyLine.exec(currentLine) && regexEmptyLine.exec(previousLine)) { 
				let range = new vscode.Range(
					new vscode.Position(lineIndex, 0),
					new vscode.Position(lineIndex, 3)
				  )
				  let decoration = { range }

				  decorationsArray.push(decoration)
				emptyLines.push(lineIndex+1)
			}
			previousLine = currentLine
		});
		editor.setDecorations(decorationType, decorationsArray)
		vscode.window.showInformationMessage(`${emptyLines}`) 
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
