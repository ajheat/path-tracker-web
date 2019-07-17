function buildKey(rawName) {
  var name = rawName.toLowerCase();
  var key = name;
  var subType = '';
  var alternatives = [];
  if (/\+\d+$/.test(key)) {
    var split = name.split('+');
    key = split[0];
    subType = '+' + split[1];
  } else if (/\,/.test(key)) {
    var split = name.split(',');
    key = split[0];
    subType = split[1];
    alternatives.push(subType.trim() + ' ' + key);
    alternatives.push(name.replace(/\,/, ''));
  } else if (/\(.*\)$/.test(key)) {
    var split = name.split('(');
    key = split[0];
    subType = split[1].replace(/\)/, '');
    alternatives.push(subType + ' ' + key.trim());
    alternatives.push(name.replace(/\(|\)/, ''));
  } else if (/with/.test(key)) {
    var split = name.split('with');
    key = split[0];
    subType = split[1];
    alternatives.push(subType.trim() + ' ' + key.trim());
    alternatives.push(key.trim() + ' ' + subType.trim());
    console.log(alternatives);
  }
}
