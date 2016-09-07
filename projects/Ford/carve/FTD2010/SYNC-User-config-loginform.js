{
	"fields":{
		"Username": {
			"regmsg": "Username is required, and may not contain characters. ",
			"reg": "^[a-zA-Z0-9]+$",
			"required": "true"
		},
		"Password": {
			"regmsg": "Password is required, and may not contain characters, and the length must between 6~20. ",
			"reg": "^[a-zA-Z0-9]{6,20}$",
			"required": "true"
		}
	}
}