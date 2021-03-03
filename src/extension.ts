import * as vscode from 'vscode';
import * as commands from './commands';

// 拡張機能が有効になったら実行される
export function activate(context: vscode.ExtensionContext) {
	// コマンドを登録する
	// * コマンドは package.json に記載する必要がある
	const disposables: { dispose: any }[] = [
		commands.showImage(context),
		commands.showCurrentTime(context),
		commands.helloWorld(context),	
		commands.configurationManager(context),
	];

	context.subscriptions.concat(
		disposables
	);
}

// this method is called when	 your extension is deactivated
export function deactivate() { }
