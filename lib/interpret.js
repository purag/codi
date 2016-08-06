// Minimum viable interpreter
var stupidInterpet = function(lines) {
  return lines.map(function(s, i, a) {
    // If this is an empty line, don't display the value.
    if (!s)
      return '';

    var r;
    try {
      // Try to evaluate up to the current line.
      r = eval(a.slice(0, i + 1).join('\n'));
    } catch (e) {
      // Only give back errors if they aren't syntax errors,
      // because the typing is probably in progress.
      if (!(e instanceof SyntaxError))
        r = e;
    }

    // Give back the string representation.
    return (r === undefined || r === null) ? '' : r.toString();
  });
};

module.exports = stupidInterpet;
