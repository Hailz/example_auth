var bcrypt = require('bcrypt');

var password = 'testBanana'; //for test purposes
var wrongPassword = 'fakeBanana'; //for test purposes


//test hashing password
var hash = bcrypt.hashSync(password, 10) //10 is default salt rounds (how many rounds of randomization) 10 takes less than a second, 13 takes a second, above gets crazy
console.log("This is the value after hashSync is called:");
console.log(hash);

console.log("----------Testing commense-------------");

//test comparing password hash to correct password
//First: user typed in data, second: existing password hash
var isValid = bcrypt.compareSync(password, hash);
console.log("User tpyed password: " + password + " Expected password: " + isValid.toString());
console.log("----------------------------------------");

//test comparing to wrong password
var isWrong = bcrypt.compareSync(wrongPassword, hash);
console.log("User tpyed password: " + wrongPassword + " Expected password: " + isWrong.toString());
console.log('---------------------------------------');
