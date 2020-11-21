let express = require('express')
let router = express.Router()
const pool = require('../utils/pool')

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
  const { userSeq } = req.params
  try {
    const data = await pool.query('select * from User where userSeq = ?', [userSeq])
    return res.json(data[0])
  } catch (err) {
    return res.status(500).json(err)
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
 */

router.get('/', async (req, res, next) => {
  const { page, size } = req.query
  try {
    const data = await pool.query('select * from USER limit ?, ?', [Number(page), Number(size)])
    return res.json(data[0])
  } catch (err) {
    return res.status(500).json(err)
  }
})

/**
 * @api {post} /user Add User
 * @apiName Post User
 * @apiGroup User
 *
 * @apiParam {String} email 이메일
 * @apiParam {String} pw 비밀번호
 * @apiParam {String} name 이름
 * @apiParam {String} phone 휴대폰 번호
 * @apiParam {String} accessToken 접근 액세스 토큰
 * @apiParam {Number} gender 성별 남성 : 0, 여성 : 1
 * @apiParam {Number} typeSeq 사용자 타입
 *
 * @apiUse User
 */

router.post('/', async (req, res, next) => {
  const { email, pw, name, phone, accessToken, gender, typeSeq } = req.body
  try {
    const data = await pool.query('insert into USER set ?',[{
      email : email,
      pw : pw,
      name : name,
      phone : phone,
      accessToken : accessToken,
      gender : gender,
      registerTime : Date.now(),
      typeSeq : typeSeq
    }] )
    return res.json(data[0])
  } catch (err) {
    return res.status(500).json(err)
  }
})

/**
 * @api {patch} /user/:userSeq Modify user
 * @apiName Modify user
 * @apiGroup User
 *
 * @apiParam {Number} userSeq 사용자 번
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
  try {
    const data = await pool.query('update USER set ? where userSeq = ?', [{
      email : email,
      pw : pw,
      name : name,
      phone : phone,
      accessToken : accessToken,
      gender : gender,
      typeSeq : typeSeq
    }, userSeq])
    return res.json(data[0])
  } catch (err) {
    return res.status(500).json(err)
  }
})

/**
 * @api {delete} /user/:userSeq Delete user
 * @apiName Delete user
 * @apiGroup User
 *
 * @apiUse User
 */

router.delete('/:userSeq', async (req, res, next) => {
  const { userSeq } = req.params
  try {
    const data = await pool.query('delete from USER where userSeq = ?', [userSeq])
    return res.json(data[0])
  } catch (err) {
    return res.status(500).json(err)
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