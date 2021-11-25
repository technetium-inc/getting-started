import { ImportDeclarationNode } from "./nodes";

export class ImportDeclaration {
  private statement: ImportDeclarationNode;
  constructor(statement: ImportDeclarationNode) {
    this.statement = statement;
  }

  public generateOutput(): string {
    const specifiers = this.getImportSpecifiers();
    const importedFrom = this.statement.source.value;
    return `from ${importedFrom} import ${specifiers}`;
  }

  private getImportSpecifiers(): string {
    let output = "";
    let specifiers = this.statement.specifiers;
    for (let index = 0; index < specifiers.length; index++) {
      let specifier = specifiers[index];
      if (specifier.type == "ImportDefaultSpecifier") {
        output += specifier.local.name + ",";
      } else {
        const localName = specifier.local.name;
        const imported = specifier.imported.name;
        output +=
          localName == imported
            ? `${imported},`
            : `(${imported} as ${localName}),`;
      }
    }
    if (output.length > 0) {
      output = output.slice(0, -1);
    }
    return output;
  }
}
