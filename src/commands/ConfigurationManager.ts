import * as vscode from 'vscode';

export function configurationManager(c: vscode.ExtensionContext): { dispose: any } {
  // Example: Reading Window scoped configuration
  const configuredView = vscode.workspace.getConfiguration().get('conf.view.showOnWindowOpen');
  switch (configuredView) {
    case 'explorer':
      vscode.commands.executeCommand('workbench.view.explorer');
      break;
    case 'search':
      vscode.commands.executeCommand('workbench.view.search');
      break;
    case 'scm':
      vscode.commands.executeCommand('workbench.view.scm');
      break;
    case 'debug':
      vscode.commands.executeCommand('workbench.view.debug');
      break;
    case 'extensions':
      vscode.commands.executeCommand('workbench.view.extensions');
      break;
  }

  return vscode.commands.registerCommand('appetizer.readConfig', async () => {

		// 1) Getting the value
		const value = await vscode.window.showQuickPick(['explorer', 'search', 'scm', 'debug', 'extensions'], { placeHolder: 'Select the view to show when opening a window.' });

		if (vscode.workspace.workspaceFolders) {

			// 2) Getting the Configuration target
			const target = await vscode.window.showQuickPick(
				[
					{ label: 'User', description: 'User Settings', target: vscode.ConfigurationTarget.Global },
					{ label: 'Workspace', description: 'Workspace Settings', target: vscode.ConfigurationTarget.Workspace }
				],
				{ placeHolder: 'Select the view to show when opening a window.' });

			if (value && target) {

				// 3) Update the configuration value in the target
				await vscode.workspace.getConfiguration().update('conf.view.showOnWindowOpen', value, target.target);

				/*
				// Default is to update in Workspace
				await vscode.workspace.getConfiguration().update('conf.view.showOnWindowOpen', value);
				*/
			}
		} else {

			// 2) Update the configuration value in User Setting in case of no workspace folders
			await vscode.workspace.getConfiguration().update('conf.view.showOnWindowOpen', value, vscode.ConfigurationTarget.Global);
		}


  });
}