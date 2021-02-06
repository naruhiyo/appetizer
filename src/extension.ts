import * as vscode from 'vscode';
import HelloWorld from './commands/HelloWorld';

// 拡張機能が有効になったら実行される
export function activate(context: vscode.ExtensionContext) {
	// コマンドを登録する
	// * コマンドは package.json に記載する必要がある
	const disposable: { dispose: any }[] = [
		HelloWorld
	];

	context.subscriptions.concat(
		disposable
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }
