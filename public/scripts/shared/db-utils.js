function buildKey(rawName) {
  var name = rawName.toLowerCase();
  var key = name;
  var subtype = '';
  var alternatives = [];
  if (/\+\d+$/.test(key)) {
    var split = name.split('+');
    key = split[0];
    subtype = '+' + split[1];
  } else if (/\,/.test(key)) {
    var split = name.split(',');
    key = split[0];
    subtype = split[1];
    alternatives.push(subtype.trim() + ' ' + key);
    alternatives.push(name.replace(/\,/, ''));
  } else if (/\(.*\)$/.test(key)) {
    var split = name.split('(');
    key = split[0];
    subtype = split[1].replace(/\)/, '');
    alternatives.push(subtype + ' ' + key.trim());
    alternatives.push(name.replace(/\(|\)/, ''));
  } else if (/with/.test(key)) {
    var split = name.split('with');
    key = split[0];
    subtype = split[1];
    alternatives.push(subtype.trim() + ' ' + key.trim());
    alternatives.push(key.trim() + ' ' + subtype.trim());
  }
}
