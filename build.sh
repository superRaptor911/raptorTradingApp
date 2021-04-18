#!/bin/bash

server1="34.67.194.167"

echo "Generating Files"
rm -rf build/
yarn build && 
wget https://github.com/superRaptor911/raptorTradingServer/archive/refs/heads/main.zip &&
unzip main.zip && rm main.zip &&
mv raptorTradingServer-main build/ &&
mv build/raptorTradingServer-main build/server && 
cp .htaccess build/ &&
echo "Site generated in build/" &&

echo ""
echo "-------------------------------------"
echo "Do you want to setup sql user? [y/n]"
read choice
if [[ $choice == 'y' ]]; then
    cd build/server/
    ./setup.sh
    cd ../../
fi

echo "Do you want to upload generated files into server? [y/n]" &&
read choice
if [[ $choice == 'y' ]]; then
    echo "uploading ..."
    rsync -rva build/ raptor@$server1:/home/raptor/warzone2/
fi
