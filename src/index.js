const t = require("babel-types");
function babelPluginTryCacheInject(babel) {
  function getCacheTextOrnocatch(leadingComments) {
    let catchText = "";
    for (let i = 0; i < leadingComments.length; i++) {
      if (leadingComments[i].value === " @nocatch") {
        return true;
      }
      if (leadingComments[i].value.indexOf(" @catchText") >= 0) {
        catchText = leadingComments[i].value;
      }
    }
    return catchText;
  }
  return {
    visitor: {
      Function(path, state, other) {
        // 是否有trystatement
        const functionBody = path.get("body");
        if (functionBody && functionBody.node.body) {
          const statements = functionBody.node.body;
          for (const statement of statements) {
            if (t.isTryStatement(statement)) {
              return;
            }
          }
        }
        let funcName;
        let cacheTextOrisCatch = getCacheTextOrnocatch(
          path.node.leadingComments || path.parentPath.parent.leadingComments
        );
        if (cacheTextOrisCatch === true) {
          return;
        }
        if (path.node.id) {
          funcName = path.node.id.name;
        } else {
          const parent = path.findParent(
            (path) =>
              t.isVariableDeclarator(path.node) || t.isObjectProperty(path.node)
          );
          if (parent) {
            const name = t.isVariableDeclarator(parent.node)
              ? parent.node.id.name // 获取变量名
              : parent.node.key.name; // 获取属性名
            funcName = name;
          }
        }
        const funcBody = path.node.body.body;

        const consoleLogStatement = t.expressionStatement(
          t.callExpression(
            t.memberExpression(t.identifier("console"), t.identifier("log")),
            [
              t.stringLiteral(funcName + "error:"),
              t.identifier("error"),
              t.stringLiteral("explain:" + cacheTextOrisCatch),
            ]
          )
        );
        const cacheBlock = t.catchClause(
          t.identifier("error"),
          t.blockStatement([consoleLogStatement])
        );
        const tryCatchBlock = t.tryStatement(
          t.blockStatement(funcBody),
          cacheBlock,
          null
        );
        path.node.body.body = [tryCatchBlock];
      },
    },
  };
}

// ClassMethod(path){
//     path.get('body').unshiftContainer('body', t.expressionStatement(t.stringLiteral('before')));
//    path.get('body').pushContainer('body', t.expressionStatement(t.stringLiteral('after')));
//  }
module.exports = babelPluginTryCacheInject;
