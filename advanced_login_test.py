#!/usr/bin/env python3
import requests
import re
import os
import random
import string
import json

def generate_username():
    """Generate a random username."""
    return f"test_{''.join(random.choices(string.ascii_lowercase + string.digits, k=5))}"

def signup(base_url, username, email, password):
    """Perform user signup."""
    signup_url = f"{base_url}/api/signup"
    signup_payload = {
        "username": username,
        "email": email,
        "password": password
    }
    
    response = requests.post(signup_url, 
                              json=signup_payload, 
                              headers={'Content-Type': 'application/json'})
    
    print("Signup Response:")
    print(f"Status Code: {response.status_code}")
    print("Response Body:")
    print(json.dumps(response.json(), indent=2))
    
    # Raise an exception if the signup fails
    response.raise_for_status()
    
    return response

def extract_csrf_token(response):
    """Extract CSRF token from set-cookie header."""
    csrf_cookie = next((cookie for cookie in response.cookies if 'next-auth.csrf-token' in cookie), None)
    if csrf_cookie:
        return csrf_cookie.split('=')[1].split('%7C')[0]
    return None

def login(base_url, username, password, session):
    """Perform login with CSRF token handling."""
    # First, get the login page to obtain CSRF token
    login_page_url = f"{base_url}/login"
    login_page_response = session.get(login_page_url)
    
    # Extract CSRF token
    csrf_token = extract_csrf_token(login_page_response)
    
    # Prepare login payload
    login_payload = {
        'username': username,
        'password': password,
        'csrfToken': csrf_token
    }
    
    # Perform login
    login_url = f"{base_url}/api/auth/signin/credentials"
    login_response = session.post(
        login_url, 
        data=login_payload,
        headers={
            'Content-Type': 'application/x-www-form-urlencoded',
            'Referer': login_page_url
        }
    )
    
    print("\nLogin Response:")
    print(f"Status Code: {login_response.status_code}")
    print(f"Response Headers: {dict(login_response.headers)}")
    
    # Check session
    session_response = session.get(f"{base_url}/api/auth/session")
    print("\nSession Response:")
    print(json.dumps(session_response.json(), indent=2))
    
    return login_response

def main():
    base_url = "http://localhost:3000"
    
    # Generate unique test credentials
    username = generate_username()
    email = f"{username}@devshowcase.com"
    password = "L0ginT3st_P@ssw0rd_2024"
    
    # Create a session to persist cookies
    session = requests.Session()
    
    try:
        # Signup
        signup_response = signup(base_url, username, email, password)
        
        # Login
        login_response = login(base_url, username, password, session)
        
        print("\nAuthentication Test Completed Successfully!")
    except Exception as e:
        print(f"\nAuthentication Test Failed: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
