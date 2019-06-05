// The number of iterations to run
var testSize = 100000;

// Cleanup
db.perfTest.drop();
// Create indexes
db.perfTest.createIndex({b:1, a:1});
db.perfTest.createIndex({c:1});

// Start timer
var start = new Date().getTime();

for (i = 0; i < testSize; i++) {
  var randNum = Math.floor(Math.random() * 10000000);
  // Create a new doc
  var myDoc = {
    a: randNum,
    b: "test-" + randNum,
    c: [4, 5, 6, 7]
  };
  ack = db.perfTest.insertOne(myDoc);
  id = ack.insertedId;
  // Do some updates
  db.perfTest.update({_id: id}, {$push: { c: 8 } });
  db.perfTest.update({_id: id}, {$push: { c: 9 } });
  db.perfTest.update({_id: id}, {$push: { c: 10 } });
  // Do finds
  db.perfTest.find({ c: 10 } );
  db.perfTest.find({ _id: id } );
  db.perfTest.find({ c: 9 }, {b: 1}); // project just B
  db.perfTest.find({ b: 'test' } );
  // Do some more updates
  db.perfTest.update({_id: id}, {$pull: { c: 4 } });
  db.perfTest.update({_id: id}, {$pull: { c: 5 } });
  db.perfTest.update({_id: id}, {$pull: { c: 6 } });
  // Remove this document completely
  db.perfTest.remove({_id: id});
}

count = db.perfTest.count();
print('Collection document count: ' + count)

var end = new Date().getTime();
var time = end - start;
print('Execution time: ' + time + 'ms');
