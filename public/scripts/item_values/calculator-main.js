function nameSearch() {
  var name = $('#itemNameInput').val();
  var promises = searchByName(name);
  promises.promise.then(function (doc) {
    if (doc.exists) {
      console.log(doc.data());
    }
    if (promises.secondaryPromise !== null) {
      promises.secondaryPromise.then(function (doc) {
        if (doc.exists) {
          console.log(doc.data());
        }
      }).catch(function (error) { console.log('Error retrieving subtype: ' + error);});
    }
  }).catch(function (error) { console.log('There was an error searching the database: ' + error);});
}

function displayResults() {

}
