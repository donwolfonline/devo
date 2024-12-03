#!/bin/bash

# Signup Test
echo "Testing Signup..."
signup_response=$(curl -s -X POST -H "Content-Type: application/json" -d '{"username":"test_auth_user", "email":"test_auth_user@devshowcase.com", "password":"T3stAuth_P@ssw0rd_2024"}' http://localhost:3000/api/signup)
echo "Signup Response: $signup_response"

# Login Test
echo "Testing Login..."
login_response=$(curl -s -X POST -H "Content-Type: application/json" -d '{"username":"test_auth_user", "password":"T3stAuth_P@ssw0rd_2024"}' http://localhost:3000/api/auth/signin)
echo "Login Response: $login_response"

# Validate User Exists
echo "Checking User in Database..."
psql -d devoapp -c "SELECT username, email FROM \"User\" WHERE username = 'test_auth_user';"
