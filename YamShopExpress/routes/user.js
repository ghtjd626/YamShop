let express = require('express')
let router = express.Router()
const pool = require('../utils/pool')
const jwt = require('jsonwebtoken');
const crypto = require('crypto-promise');

/**
 * @api {get} /user/:userSeq Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} userSeq User's unique Seq.
 *
 *
 * @apiUse User
 */

router.get('/:userSeq', async (req, res, next) => {
  if(req.userInfo &&( req.userInfo.typeSeq === 1)) {
    const {userSeq} = req.params
    try {
      const data = await pool.query('select * from User where userSeq = ?', [userSeq])
      return res.json(data[0][0])
    } catch (err) {
      return res.status(500).json(err)
    }
  }else{
    res.status(403).send({"message" : "Token error!"});
  }
})

/**
 * @api {get} /user Request User information
 * @apiName GetUserList
 * @apiGroup User
 *
 * @apiParam {Number} page Current page number
 * @apiParam {Number} size Page size
 * @apiUse UserList
 * @apiPermission admin
 *
 */

router.get('/', async (req, res, next) => {
  if(req.userInfo &&( req.userInfo.typeSeq === 1)){
    const { page, size } = req.query
    try {
      const data = await pool.query('select * from User limit ?, ?', [Number(page), Number(size)])
      return res.json(data[0])
    } catch (err) {
      return res.status(500).json(err)
    }
  }else{
    res.status(403).send({"message" : "Token error!"});
  }

})
/**
 * @api {post} /user/signin Sign In user
 * @apiName SignIn User 로그인
 * @apiGroup User
 *
 * @apiParam {String} email 이메일
 * @apiParam {String} pw 비밀번호
 * @apiUse User
 */

async function pwBySalt(password, salt) {
  try {
    let key = await crypto.pbkdf2(password, salt, 98523, 64, 'sha512');
    return key.toString('base64');
  }catch (err) {
    throw Error(err);
  }
}
router.post('/signin', async (req, res, next)=>{
  const {email, pw} = req.body;
  try{
    let userData = await pool.query("SELECT * from User where email = ?", [email]);
    if(userData[0][0]){
      let newPw = await pwBySalt(pw, userData[0][0].salt);
      if(userData[0][0].pw === newPw){
        res.json(userData[0][0]);
      }else{
        res.status(403).send({"message":"Incorrect email or password"});
      }
    }else{
      res.status(403).send({"message":"Incorrect email or password"});
    }
  }catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

/**
 * @api {get} /user/token-verification Check accessToken
 * @apiName Check token 토큰 로그인
 * @apiGroup User
 *
 * @apiHeader {String} x-access-token 유저 액세스 토큰
 * @apiUse User
 */

router.get('/token-verification', async (req, res, next)=>{
  if(req.userInfo){
    res.send(req.userInfo);
  }else{
    res.status(403).send({"message": "Token Error!"});
  }
})

/**
 * @api {post} /user/signup Sign up user
 * @apiName SignUp User
 * @apiGroup User
 *
 * @apiParam {String} email 이메일
 * @apiParam {String} pw 비밀번호
 * @apiParam {String} name 이름
 * @apiParam {String} phone 휴대폰 번호
 * @apiParam {String} birthday 생년월
 * @apiParam {Number} gender 성별 남성 : 0, 여성 : 1
 * @apiParam {Number} typeSeq 사용자 타입 (없어도 됨.)
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *   "fieldCount": 0,
 *   "affectedRows": 1,
 *   "insertId": 1,
 *   "info": "",
 *   "serverStatus": 2,
 *   "warningStatus": 0
 *  }
 */
async function crypPw(password) {
  let salt = "";
  let newPw;
  try{
    let data = await crypto.randomBytes(64);
    salt = data.toString();
    let key = await crypto.pbkdf2(password, salt, 98523, 64, 'sha512');
    newPw = key.toString('base64');
    return [salt, newPw];
  }catch (err) {
    throw Error(err);
  }
}


router.post('/signup', async (req, res, next) => {
  const { email, pw, name, phone, birthday, gender} = req.body
  try {
    const pwData = await crypPw(pw);
    const salt = pwData[0];
    const newPw = pwData[1];

    const token = jwt.sign(req.body.email, Date.now().toString(16), {
      algorithm: 'HS256'
    });

    const data = await pool.query('insert into User set ?',[{
      email : email,
      pw : newPw,
      accessToken : token,
      name : name,
      phone : phone,
      birthday : birthday,
      gender : gender,
      registerTime : Date.now(),
      salt : salt,
      typeSeq : 0
    }]);

    return res.json(data[0])
  } catch (err) {
    return res.status(500).json(err)
  }
})

/**
 * @api {patch} /user/:userSeq Modify user
 * @apiName Modify user 회원정보 수정
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiParam {Number} userSeq 사용자 번호
 * @apiParam {String} email 이메일
 * @apiParam {String} pw 비밀 번호
 * @apiParam {String} name 이름
 * @apiParam {String} phone 휴대폰 번호
 * @apiParam {String} accessToken 접근 액세스 토큰
 * @apiParam {Number} gender 성별 남성 : 0, 여성 : 1
 * @apiParam {Number} typeSeq 사용자 타입
 * @apiUse User
 *
 */

router.patch('/:userSeq', async (req, res, next) => {
  const { userSeq } = req.params
  const { email, pw, name, phone, accessToken, gender, typeSeq } = req.body
  if(req.userInfo &&( req.userInfo.typeSeq === 1)) {
    try {
      const data = await pool.query('update USER set ? where userSeq = ?', [{
        email: email,
        pw: pw,
        name: name,
        phone: phone,
        accessToken: accessToken,
        gender: gender,
        typeSeq: typeSeq
      }, userSeq])
      return res.json(data[0])
    } catch (err) {
      return res.status(500).json(err)
    }
  }else{
    res.status(403).send({"message" : "Token error!"});
  }
})


/**
 * @apiDefine User
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "userSeq" : 0,
 *       "email" : "haemin001212@gmail.com",
 *       "pw" : wqewfosieoajfhwejf@fweali3j,
 *       "name" : "정해민",
 *       "phone" : 01098810664,
 *       "registerTime" : 1605929904,
 *       "accessToken" : wqewfosieoajfhwejf@fweali3jwqewfosieoajfhwejf@fweali3j,
 *       "gender" : 0,
 *       "typeSeq" : 0
 *     }
 */


/**
 * @apiDefine UserList
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *     {
 *       "userSeq" : 0,
 *       "email" : "haemin001212@gmail.com",
 *       "pw" : wqewfosieoajfhwejf@fweali3j,
 *       "name" : "정해민",
 *       "phone" : 01098810664,
 *       "registerTime" : 1605929904,
 *       "accessToken" : wqewfosieoajfhwejf@fweali3jwqewfosieoajfhwejf@fweali3j,
 *       "gender" : 0,
 *       "typeSeq" : 0
 *     },
 *     {
 *       "userSeq" : 0,
 *       "email" : "haemin001212@gmail.com",
 *       "pw" : wqewfosieoajfhwejf@fweali3j,
 *       "name" : "정해민",
 *       "phone" : 01098810664,
 *       "registerTime" : 1605929904,
 *       "accessToken" : wqewfosieoajfhwejf@fweali3jwqewfosieoajfhwejf@fweali3j,
 *       "gender" : 0,
 *       "typeSeq" : 0
 *     }
 *     ]
 */
module.exports = router