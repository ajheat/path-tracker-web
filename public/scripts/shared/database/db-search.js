function searchByName(name) {
  var itemKey = buildKey(name);
  var promise = db.collection('all-items').doc(itemKey.key).get();
  var secPromise = null;
  if (itemKey.subtype !== '') {
    secPromise = db.collection('all-items/' + itemKey.key + '/subtypes').doc(itemKey.subtype).get();
  }
  return {promise: promise, secondaryPromise: secPromise};
}
