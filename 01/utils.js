module.exports = {

  reg: function(path, keys, sensitive, strict) {
    // Tomado de Express.js
    // TJ's code
    if (path instanceof RegExp) return path;
    if (Array.isArray(path)) path = '(' + path.join('|') + ')';
    if (!keys) keys = []
    path = path
      .concat(strict ? '' : '/?')
      .replace(/\/\(/g, '(?:/')
      .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g, function(_, slash, format, key, capture, optional, star){
        keys.push({ name: key, optional: !! optional });
        slash = slash || '';
        return ''
          + (optional ? '' : slash)
          + '(?:'
          + (optional ? slash : '')
          + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')'
          + (optional || '')
          + (star ? '(/*)?' : '');
      })
      .replace(/([\/.])/g, '\\$1')
      .replace(/\*/g, '(.*)');
    return [new RegExp('^' + path + '$', sensitive ? '' : 'i')].concat(keys);
  },

  tokenize: function tokenize (who, _with) {
    var tokenized  = {}
    who.forEach(function(val, i){
        tokenized[val] = _with[i]
    })
    return tokenized
  }
}

