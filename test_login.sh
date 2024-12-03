#!/bin/bash

# Generate a unique username
RANDOM_SUFFIX=$(cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 5 | head -n 1)
USERNAME="test_${RANDOM_SUFFIX}"
EMAIL="${USERNAME}@devshowcase.com"
PASSWORD="L0ginT3st_P@ssw0rd_2024"

# Signup first to ensure user exists
echo "Creating test user: $USERNAME"
signup_response=$(curl -s -X POST -H "Content-Type: application/json" -d "{\"username\":\"$USERNAME\", \"email\":\"$EMAIL\", \"password\":\"$PASSWORD\"}" http://localhost:3000/api/signup)
echo "Signup Response: $signup_response"

# Attempt login via NextAuth with verbose output
echo "Testing Login via NextAuth..."
login_response=$(curl -v -s -X POST \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=$USERNAME&password=$PASSWORD" \
  http://localhost:3000/api/auth/signin/credentials 2>&1)
echo "Detailed Login Response: $login_response"

# Check for JWT token
echo "Checking JWT token..."
jwt_response=$(curl -v -s -X POST \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=$USERNAME&password=$PASSWORD" \
  -D - \
  http://localhost:3000/api/auth/signin/credentials 2>&1 | grep -i 'set-cookie')
echo "JWT Token Response: $jwt_response"

# Validate User Exists
echo "Checking User in Database..."
psql -d devoapp -c "SELECT username, email FROM \"User\" WHERE username = '$USERNAME';"
