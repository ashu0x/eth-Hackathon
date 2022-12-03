# Zk-Based phone number verifier

-> Uses zk-proof to classify mobile phone number based on country/state codes
-> Uses zokrates based library with subscriber mobile Country codes fetched from Telecommunications dept of India(currently)
-> uses RSA-encryption to deliver encrypted phone number to trusted verifier
-> Only User who recieves off-chain OTP on the decrypted phone number can call verify()


## User-Flow
 ` ->User generates proof of his mobile number and also encrypts with the verifiers public key
-> User call register() function with said parameters from the deployed contract on polygon
-> backEnd server/localmachine should listen to the Requested() event and log the encrypted phone number
-> backend should decrypt the phone number and first send a Random OTP to decrypted phone number
-> the backEnd should also call the otp() function from the deployed Contract
-> finally, user who recieved the OTP can call the verify() function with said OTP
```
