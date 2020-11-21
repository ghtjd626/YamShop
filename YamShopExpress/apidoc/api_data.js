define({ "api": [
  {
    "type": "delete",
    "url": "/board/:boardSeq",
    "title": "Delete board",
    "name": "Delete_board",
    "group": "Board",
    "version": "0.0.0",
    "filename": "routes/board.js",
    "groupTitle": "",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"boardSeq\" : 0,\n  \"boardName\" : \"Product\",\n  \"readLevel\" : 0,\n  \"writeLevel\" : 2\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/board/:boardSeq",
    "title": "Request Board information",
    "name": "GetBoard",
    "group": "Board",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "boardSeq",
            "description": "<p>Board's unique Seq.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/board.js",
    "groupTitle": "",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"boardSeq\" : 0,\n  \"boardName\" : \"Product\",\n  \"readLevel\" : 0,\n  \"writeLevel\" : 2\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/board",
    "title": "Request Board information",
    "name": "GetBoardList",
    "group": "Board",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Current page number</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>Page size</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/board.js",
    "groupTitle": "",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n{\n  \"boardSeq\" : 0,\n  \"boardName\" : \"Product\",\n  \"readLevel\" : 0,\n  \"writeLevel\" : 2\n},\n{\n  \"boardSeq\" : 1,\n  \"boardName\" : \"Event\",\n  \"readLevel\" : 0,\n  \"writeLevel\" : 2\n}\n]",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "patch",
    "url": "/board/:boardSeq",
    "title": "Modify board",
    "name": "Modify_board",
    "group": "Board",
    "version": "0.0.0",
    "filename": "routes/board.js",
    "groupTitle": "",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"boardSeq\" : 0,\n  \"boardName\" : \"Product\",\n  \"readLevel\" : 0,\n  \"writeLevel\" : 2\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/board",
    "title": "Add board",
    "name": "Post_Board",
    "group": "Board",
    "version": "0.0.0",
    "filename": "routes/board.js",
    "groupTitle": "",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"boardSeq\" : 0,\n  \"boardName\" : \"Product\",\n  \"readLevel\" : 0,\n  \"writeLevel\" : 2\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/user/token-verification",
    "title": "Check accessToken",
    "name": "Check_token_토큰_로그인",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>유저 액세스 토큰</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"userSeq\" : 0,\n  \"email\" : \"haemin001212@gmail.com\",\n  \"pw\" : wqewfosieoajfhwejf@fweali3j,\n  \"name\" : \"정해민\",\n  \"phone\" : 01098810664,\n  \"registerTime\" : 1605929904,\n  \"accessToken\" : wqewfosieoajfhwejf@fweali3jwqewfosieoajfhwejf@fweali3j,\n  \"gender\" : 0,\n  \"typeSeq\" : 0\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/user/:userSeq",
    "title": "Request User information",
    "name": "GetUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "userSeq",
            "description": "<p>User's unique Seq.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"userSeq\" : 0,\n  \"email\" : \"haemin001212@gmail.com\",\n  \"pw\" : wqewfosieoajfhwejf@fweali3j,\n  \"name\" : \"정해민\",\n  \"phone\" : 01098810664,\n  \"registerTime\" : 1605929904,\n  \"accessToken\" : wqewfosieoajfhwejf@fweali3jwqewfosieoajfhwejf@fweali3j,\n  \"gender\" : 0,\n  \"typeSeq\" : 0\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/user",
    "title": "Request User information",
    "name": "GetUserList",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Current page number</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>Page size</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin",
        "title": "Only admin User access only",
        "description": "<p>Only admin can access.</p>"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n{\n  \"userSeq\" : 0,\n  \"email\" : \"haemin001212@gmail.com\",\n  \"pw\" : wqewfosieoajfhwejf@fweali3j,\n  \"name\" : \"정해민\",\n  \"phone\" : 01098810664,\n  \"registerTime\" : 1605929904,\n  \"accessToken\" : wqewfosieoajfhwejf@fweali3jwqewfosieoajfhwejf@fweali3j,\n  \"gender\" : 0,\n  \"typeSeq\" : 0\n},\n{\n  \"userSeq\" : 0,\n  \"email\" : \"haemin001212@gmail.com\",\n  \"pw\" : wqewfosieoajfhwejf@fweali3j,\n  \"name\" : \"정해민\",\n  \"phone\" : 01098810664,\n  \"registerTime\" : 1605929904,\n  \"accessToken\" : wqewfosieoajfhwejf@fweali3jwqewfosieoajfhwejf@fweali3j,\n  \"gender\" : 0,\n  \"typeSeq\" : 0\n}\n]",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "patch",
    "url": "/user/:userSeq",
    "title": "Modify user",
    "name": "Modify_user_회원정보_수정",
    "group": "User",
    "permission": [
      {
        "name": "admin",
        "title": "Only admin User access only",
        "description": "<p>Only admin can access.</p>"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "userSeq",
            "description": "<p>사용자 번호</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>이메일</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pw",
            "description": "<p>비밀 번호</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>이름</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>휴대폰 번호</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>접근 액세스 토큰</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gender",
            "description": "<p>성별 남성 : 0, 여성 : 1</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "typeSeq",
            "description": "<p>사용자 타입</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"userSeq\" : 0,\n  \"email\" : \"haemin001212@gmail.com\",\n  \"pw\" : wqewfosieoajfhwejf@fweali3j,\n  \"name\" : \"정해민\",\n  \"phone\" : 01098810664,\n  \"registerTime\" : 1605929904,\n  \"accessToken\" : wqewfosieoajfhwejf@fweali3jwqewfosieoajfhwejf@fweali3j,\n  \"gender\" : 0,\n  \"typeSeq\" : 0\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/user/signin",
    "title": "Sign In user",
    "name": "SignIn_User_로그인",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>이메일</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pw",
            "description": "<p>비밀번호</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"userSeq\" : 0,\n  \"email\" : \"haemin001212@gmail.com\",\n  \"pw\" : wqewfosieoajfhwejf@fweali3j,\n  \"name\" : \"정해민\",\n  \"phone\" : 01098810664,\n  \"registerTime\" : 1605929904,\n  \"accessToken\" : wqewfosieoajfhwejf@fweali3jwqewfosieoajfhwejf@fweali3j,\n  \"gender\" : 0,\n  \"typeSeq\" : 0\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/user/signup",
    "title": "Sign up user",
    "name": "SignUp_User",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>이메일</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pw",
            "description": "<p>비밀번호</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>이름</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>휴대폰 번호</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "birthday",
            "description": "<p>생년월</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gender",
            "description": "<p>성별 남성 : 0, 여성 : 1</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "typeSeq",
            "description": "<p>사용자 타입 (없어도 됨.)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"fieldCount\": 0,\n \"affectedRows\": 1,\n \"insertId\": 1,\n \"info\": \"\",\n \"serverStatus\": 2,\n \"warningStatus\": 0\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": ""
  }
] });
