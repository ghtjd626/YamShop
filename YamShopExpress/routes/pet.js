let express = require('express')
let router = express.Router()
const pool = require('../utils/pool')

/**
 * @api {get} /pet 반려동물 정보 요청
 * @apiName GetPetInformation
 * @apiGroup Pet
 *
 * @apiHeader {String} x-access-token 사용자 접근 액세스 토큰
 * @apiUse PetList
 */

router.get('/', async (req, res, next) => {
    const { userInfo } = req;
    if(userInfo) {
        try {
            const data = await pool.query('select * from Pet where userSeq = ?', [userInfo.userSeq])
            return res.json(data[0])
        } catch (err) {
            return res.status(500).json(err)
        }
    }else{
        return res.status(403).json({"message" : "Token Expired!"});
    }
})


/**
 * @apiDefine PetList
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *     {
 *       "petSeq" : 1,
 *       "userSeq" : 1,
 *       "petInfo": "~~~"
 *     },
 *     {
 *       "petSeq" : 1,
 *       "userSeq" : 1,
 *       "petInfo": "~~~"
 *     },
 *     {
 *       "petSeq" : 1,
 *       "userSeq" : 1,
 *       "petInfo": "~~~"
 *     }
 *     ]
 */
module.exports = router