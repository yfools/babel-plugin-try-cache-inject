const t = require("babel-types");
function babelPluginTryCacheInject(babel) {
  // console.log("babel", babel);
  return {
    visitor: {
      Function(path) {
        path
          .get("body")
          .unshiftContainer(
            "body",
            t.expressionStatement(t.stringLiteral("try{"))
          );
        path
          .get("body")
          .pushContainer(
            "body",
            t.expressionStatement(t.stringLiteral("}cache(){}"))
          );
      },
    },
  };
}

// ClassMethod(path){
//     path.get('body').unshiftContainer('body', t.expressionStatement(t.stringLiteral('before')));
//    path.get('body').pushContainer('body', t.expressionStatement(t.stringLiteral('after')));
//  }
module.exports = babelPluginTryCacheInject;
