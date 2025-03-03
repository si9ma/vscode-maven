// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";
import { ElementNode, getCurrentNode, XmlTagName } from "../utils/lexerUtils";

class CodeActionProvider implements vscode.CodeActionProvider {
  public provideCodeActions(document: vscode.TextDocument, range: vscode.Range | vscode.Selection, _context: vscode.CodeActionContext, _token: vscode.CancellationToken): vscode.Command[] | undefined {
    const documentText: string = document.getText();
    const cursorOffset: number = document.offsetAt(range.start);
    const currentNode: ElementNode | undefined = getCurrentNode(documentText, cursorOffset);
    if (currentNode === undefined || currentNode.contentStart === undefined || currentNode.contentEnd === undefined) {
      return undefined;
    }

    if (currentNode.tag === XmlTagName.Dependencies) {
        const addDependencyCommand: vscode.Command = {
            command: "maven.project.addDependency",
            title: "Add a dependency from Maven Central Repository...",
            arguments: [{
                pomPath: document.uri.fsPath
            }]
        };
        return [addDependencyCommand];
    }

    return undefined;
  }

}

export const codeActionProvider: CodeActionProvider = new CodeActionProvider();
