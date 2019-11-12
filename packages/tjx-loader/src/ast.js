
const acorn = require('acorn');

function ast(expressionStr) {
  let AST = acorn.parse(expressionStr);
  AST = getPureAcornObj(AST.body[0]);
  return AST;
}

const NO_PURE_FIELDS = ['start', 'end'];
function getPureAcornObj(obj, newObj = {}) {
  if (Array.isArray(obj)) {
    return obj.map(item => getPureAcornObj(item));
  }

  for (let key in obj) {
    if (NO_PURE_FIELDS.includes(key)) continue;
    const val = obj[key];
    newObj[key] = typeof val === 'object'
      ? getPureAcornObj(val)
      : val;
  }
  return newObj;
}

module.exports = ast;