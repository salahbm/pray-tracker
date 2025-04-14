#!/bin/bash

# Load env vars from .env.local
set -a
source .env.production
set +a

# Run the local EAS build
eas build --platform ios --local --profile production
