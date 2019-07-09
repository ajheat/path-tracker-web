const db = firebase.firestore();

db.collection('known-items').get().then(function(data) {
  console.log(data);
}).catch(function(error) {
  console.log('Error fetching data: ' + error);
});
