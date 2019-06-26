set -x

do_test () {
  rm -rf data-$1/
  mlaunch init --replicaset --nodes 2 --arbiter --dir "./data-$1"
  sleep 20
  # mongo "mongodb://localhost:27017,localhost:27018,localhost:27019/perf?replicaSet=replset" test.js
  mongo "mongodb://localhost:27017,localhost:27018,localhost:27019/perf?replicaSet=replset&readConcernLevel=local" test.js
  mlaunch stop --dir "./data-$1"
  tar -czvf dd-$1.tar.gz ./data-$1/replset/rs1/mongod.log ./data-$1/replset/rs1/db/diagnostic.data ./data-$1/replset/rs2/mongod.log ./data-$1/replset/rs2/db/diagnostic.data
}

killall mongod

echo y | m 3.4.21
do_test "3.4"

echo y | m 3.6.13
do_test "3.6"

echo y | m 4.0.10
do_test "4.0"
