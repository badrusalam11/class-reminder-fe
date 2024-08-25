#!/bin/bash

# Exit the script on any command failure
set -e

# Define variables
BUILD_DIR="build"
SERVER_DIR="/var/www/html/perbanas-institute"
SERVER_USER="vpsservice"
SERVER_IP="103.175.217.175"
PRIVATE_VPSSERVICE_KEY_PATH="$PRIVATE_VPSSERVICE_KEY_PATH"  # Use environment variable

# Print a message to indicate the start of deployment
echo "Starting deployment..."

# Use rsync to copy files to the server with SSH key
rsync -avz -e "ssh -i $PRIVATE_VPSSERVICE_KEY_PATH" --delete $BUILD_DIR/ $SERVER_USER@$SERVER_IP:$SERVER_DIR

# Print a message indicating successful deployment
echo "Deployment completed successfully!"
