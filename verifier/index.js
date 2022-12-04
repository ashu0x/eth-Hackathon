const ethers = require('ethers');
const abi = [{"inputs":[{"internalType":"address","name":"v","type":"address"},{"internalType":"bytes","name":"pubKey","type":"bytes"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"},{"indexed":false,"internalType":"bytes","name":"","type":"bytes"}],"name":"Requested","type":"event"},{"inputs":[{"internalType":"uint8","name":"series","type":"uint8"},{"internalType":"address","name":"c","type":"address"}],"name":"changeProofContracts","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_v","type":"address"},{"internalType":"bytes","name":"_pubKey","type":"bytes"}],"name":"changeVerifier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_o","type":"bytes32"}],"name":"oTp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"otpHash","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"proofContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"seriesNumber","type":"uint8"},{"components":[{"components":[{"internalType":"uint256","name":"X","type":"uint256"},{"internalType":"uint256","name":"Y","type":"uint256"}],"internalType":"struct Pairing.G1Point","name":"a","type":"tuple"},{"components":[{"internalType":"uint256[2]","name":"X","type":"uint256[2]"},{"internalType":"uint256[2]","name":"Y","type":"uint256[2]"}],"internalType":"struct Pairing.G2Point","name":"b","type":"tuple"},{"components":[{"internalType":"uint256","name":"X","type":"uint256"},{"internalType":"uint256","name":"Y","type":"uint256"}],"internalType":"struct Pairing.G1Point","name":"c","type":"tuple"}],"internalType":"struct Proof","name":"proof","type":"tuple"},{"internalType":"uint256[1]","name":"_areaCode","type":"uint256[1]"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"bytes","name":"hash","type":"bytes"}],"name":"register","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"requests","outputs":[{"internalType":"uint256","name":"areaCode","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"numberHash","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"verified","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"verifier","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"verifierPubkey","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_otp","type":"uint256"},{"internalType":"address","name":"user","type":"address"}],"name":"verify","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const contractAddress = "0x31C3F08159Bb98261B36421bCddb6Bf83b6C5c56"

const webSocketProvider = new ethers.providers.WebSocketProvider("wss://eth-mainnet.g.alchemy.com/v2/EVNEqs3LOXxUMjwS64R_H_8292h92VIt", 80001);
const contract = new ethers.Contract(contractAddress, abi, webSocketProvider);

function sendSMS(phone, otp){
    const accountSid = "AC22cca462bc6940b83bb618a3ab462019";
    const authToken = "2f6dc0dbb2feaadb6547e478ee0c0319";
    // TWILIO_ACCOUNT_SID=AC22cca462bc6940b83bb618a3ab462019
    // TWILIO_AUTH_TOKEN=2f6dc0dbb2feaadb6547e478ee0c0319
    const client = require('twilio')(accountSid, authToken);
    client.messages
  .create({
     body: `Your otp for zk phone verification is ${otp}`,
     from: '+13853965038',
     to: phone
   })
  .then(message => console.log(message.sid));
  }

  function sendOTP(phoneNo){
      let num = Math.floor(1000 + Math.random() * 9000);
      console.log("random 4 dig otp: ", num);
      sendSMS(phoneNo,num)
      let hashedNum = keccak256(num).toString("hex");
      console.log("hashed num: ", hashedNum);
  }

  const PRIVATE_KEY = "714a221bada30ebf854b520968810c7d77fcc638dd7e40bd1a866bbeb19ec835"

    contract.on("Requested", (address, bytes, event) => {
        console.log({
            address, bytes
        });
        const phone = 0000000000.decryptWithPrivateKey(
            PRIVATE_KEY, // privateKey
            bytes // encrypted-data
        );
        sendOTP(phone)
    });