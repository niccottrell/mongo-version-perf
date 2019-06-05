### Steps

1. Launch AWS instance with /dev/sdb running `io1`

```
sudo yum -y install xfsprogs
sudo mkfs -t xfs /dev/nvme1n1
sudo mkdir /data
sudo mount /dev/nvme1n1 /data
df -h
```

### RHEL8

```
sudo yum -y install -y nodejs
sudo npm install -g m
# sudo amazon-linux-extras install epel
# sudo amazon-linux-extras install python3
# sudo yum install -y python36-devel
# sudo yum install -y python36-dateutil python36-psutil
# sudo pip3 install matplotlib
sudo yum install -y gcc
sudo pip install --user psutil pymongo mtools
```

### Amazon Linux 1
```
sudo yum update -y
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 4.4.5
# sudo mkdir /usr/local/m
npm install -g m --build-from-source
sudo chmod a+rwx /usr/local/m
sudo chmod a+rwx /usr/local/bin
echo y | m 3.4.20
echo y | m 3.6.12
echo y | m 4.0.9
sudo chmod a+rwx /usr/local/bin
sudo yum install -y gcc
pip install --user psutil pymongo mtools

# cd /data
#sudo chmod a+rwx /data
# vi launch.sh
chmod a+x launch.sh
```

```
./launch.sh
```
