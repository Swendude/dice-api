#!/bin/bash
echo "migrating database..."
npm run migrate

echo "running server"
npm run start
