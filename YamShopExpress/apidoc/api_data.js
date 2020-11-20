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
  }
] });
