
{
  "fields": {
    "username": {
      "regmsg": "Between 1 and 60 characters. It can’t contain &lt;&gt;&amp;",
      "reg": "^[^<\\>&;]{1,60}$",
      "required": "true"
    },
    "email": {
      "regmsg": "It must contain @ and .",
      "reg": "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@([a-z0-9!#$%&'*+/=?^_`{|}~-]+(\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]{2,})+|\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])$",
      "required": "true"
    },
    "password": {
      "regmsg": "Between 6 and 20 characters, contain at least 1 letter and 1 number. It can’t contain &lt;&gt;&amp;",
      "reg": "^(?=.*\\d+)(?=.*[a-zA-Z])[^<\\>&;]{6,20}$",
      "required": "true"
    },
    "password_confirmation": {
      "regmsg": "Between 6 and 20 characters, contain at least 1 letter and 1 number. It can’t contain &lt;&gt;&amp;",
      "reg": "^(?=.*\\d+)(?=.*[a-zA-Z])[^<\\>&;]{6,20}$",
      "required": "true"
    },
    "forum_nickname": {
      "regmsg": "Between 1 and 30 characters. It can’t contain &lt;&gt;&amp;",
      "reg": "^[^<\\>&;]{1,30}$",
      "required": "true"
    },
    "vehicle_nickname_1": {
      "regmsg": "Between 1 and 30 characters. It can’t contain &lt;&gt;&amp;",
      "reg": "^[^<\\>&;]{1,30}$",
      "required": "true"
    },
    "title": {
      "regmsg": "Your title is not a valid title!",
      "reg": "^[^<\\>&;]{0,10}$",
      "required": "true"
    },
    "vehicle_vin_1": {
      "regmsg": "UserProfile/Validation/VinInvalidMessage",
      "reg": "^[0-9a-hA-Hj-nJ-NpPr-zR-Z]{17}$",
      "required": "true"
    },
    "firstname": {
      "regmsg": "Between 1 and 128 characters. It can’t contain &lt;&gt;&amp;",
      "reg": "^[^<\\>&;]{1,128}$",
      "required": "true"
    },
    "lastname": {
      "regmsg": "Between 1 and 128 characters. It can’t contain &lt;&gt;&amp;",
      "reg": "^[^<\\>&;]{1,128}$",
      "required": "true"
    },
    "country": {
      "regmsg": "Your country name is not a valid country name!",
      "reg": "^[^<\\>&;]{1,60}$",
      "required": "true"
    },
    "min": {
      "regmsg": "It must be in 10 digits, starting with 0 (zero).",
      "reg": "^0[0-9]{9}$",
      "required": "true"
    },
    "street": {
      "regmsg": "Between 2 and 128 characters, It can’t contain &lt;&gt;&amp;",
      "reg": "^[^<\\>&;]{2,128}$",
      "required": "true"
    },
    "postal_code": {
      "regmsg": "It must be in 4 digits.",
      "reg": "^[0-9]{4}$",
      "required": "true"
    },
    "state": {
      "regmsg": "Your state is not a valid state!",
      "reg": "^[^<\\>&;]{0,30}$",
      "required": "true"
    },
    "city": {
      "regmsg": "Your city is not a valid city!",
      "reg": "^[^<\\>&;]{0,30}$",
      "required": "false"
    },
    "work_phone": {
      "regmsg": "It must be in 10 digits, starting with 0 (zero).",
      "reg": "^0[0-9]{9}$",
      "required": "false"
    },
    "home_phone": {
      "regmsg": "It must be in 10 digits, starting with 0 (zero).",
      "reg": "^0[0-9]{9}$",
      "required": "false"
    }
  },
  "ajax": {
    "username": {
      "data": "username",
      "url": "http://10.3.104.29/servlet/ContentServer?pagename=DFY/UserProfile/JSON&site=FOA&type=username"
    },
    "forum_nickname": {
      "data": "forum_nickname",
      "url": "http://10.3.104.29/servlet/ContentServer?pagename=DFY/UserProfile/JSON&site=FOA&type=nickname"
    },
    "vehicle_vin_1": {
      "data": "vehicle_vin_1",
      "url": "http://10.3.104.29/servlet/ContentServer?pagename=DFY/UserProfile/JSON&site=FOA&type=vin"
    }
  },
  "equal": {
    "password_confirmation": {
      "eqmsg": "Password and confirmation password do not match.",
      "target": "password"
    },
    "min_confirmation": {
      "eqmsg": "Mobile Phone Number and Mobile Phone Number confirmation do not match.",
      "target": "min"
    }
  },
  "accept": {
    "terms_and_conditions": {"acpmsg": "Please tick this box if you wish to register!"},
    "legal_agreement": {"acpmsg": "Please tick this box if you wish to register!"}
  }
}