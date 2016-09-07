
{
  "fields": {
    "username": {
      "regmsg": "Between 1 and 60 characters. It can’t contain &lt;&gt;&amp;",
      "reg": "^[^<\\>&;]{1,60}$",
      "required": "true"
    },
    "password": {
      "regmsg": "Between 6 and 20 characters, contain at least 1 letter and 1 number. It can’t contain &lt;&gt;&amp;",
      "reg": "^(?=.*\\d+)(?=.*[a-zA-Z])[^<\\>&;]{6,20}$",
      "required": "true"
    }
  }
}