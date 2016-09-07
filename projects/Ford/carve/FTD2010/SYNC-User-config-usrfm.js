{
	"fields":{
		"username": {
			"regmsg": "Username is required, and may not contain characters. ",
			"reg": "^[a-zA-Z0-9]+$",
			"required": "true"
		}
		,"password": {
			"regmsg": "Password is required, and may not contain characters. ",
			"reg": "^[a-zA-Z0-9]+$",
			"required": "true"
		}
		,"country":{
			"regmsg": "Password is required, and may not contain characters. ",
			"reg": "",
			"required": "true"
		}
		,"email": {
			"regmsg": "Email format is not correct",
			"reg": "^[a-zA-Z0-9_\\.]+@[a-zA-Z0-9-]+[\\.a-zA-Z]+$",
			"required": "true"
		}
		,"vin": {
			"regmsg": "VIN must be filled with letters and numbers",
			"reg": "^[0-9A-Za-z]{6,18}$",
			"required": "true"
		}
	},
	"ajax":{
		"username": {
			"data": "username",
			"url": "SYNC-User-data.js"
		}
		,"vin": {
			"data": "vin",
			"url": "SYNC-User-data-vin.js"
		}
	},
	"equal":{
		"password_confirmation":{
			"target": "password",
			"eqmsg": "Two passwords doesn't match."
		},
		"workphone":{
			"target": "homephone",
			"eqmsg": "The workphone and homephone should be different.",
			"different": true
		}
	},
	"accept":{
		"termsandcondition": {
			"acpmsg": "You should accept these terms."
		}
		,"agreement": {
			"acpmsg": "Please tip this agreement "
		}
	}
}