# This file will contain string constants used throughout the application.

require './util/config.rb'

# API Constants

APIStatusOK = "OK"
APIStatusError = "Error"

#API Error messages
ErrorMissingParameter = "Email and Password are both required."
ErrorPasswordTooShort = "Password is too short. Must be at least #{MinPasswordLength} characters."
ErrorEmailAlreadyInUse = "This email address is already in use."
ErrorBadCredentials = "Email or password was incorrect."
ErrorBadAPICredentials = "Wrong authentication credentials or API secret. Try logging in again."
ErrorMessageNotEmailAddress = "Please enter a valid email address."
ErrorWrongSecret = "Wrong API Secret. Try logging in again."