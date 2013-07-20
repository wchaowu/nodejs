var crypto = require('crypto');
	
exports.md5 = function(str){
	var md5sum = crypto.createHash('md5');
		md5sum.update(str);
		str = md5sum.digest('hex');
	return str;
}

exports.encryptAes = function(str,secret){
   var cipher = crypto.createCipher('aes192', secret);
   var enc = cipher.update(str,'utf8','hex');
   enc += cipher.final('hex');
   return enc;
}

exports.decryptAes = function(str,secret){
   var decipher = crypto.createDecipher('aes192', secret);
   var dec = decipher.update(str,'hex','utf8');
   dec += decipher.final('utf8');
   return dec;
}