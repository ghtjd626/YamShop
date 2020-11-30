let express = require('express')
let router = express.Router()
const pool = require('../utils/pool')

/**
 * @api {get} /payment 결제내역 요청
 * @apiName GetPaymentList
 * @apiGroup Payment
 *
 * @apiHeader {String} x-access-token 사용자 접근 액세스 토큰
 * @apiUse PaymentList
 */

router.get('/', async (req, res, next) => {
    const { userInfo } = req;
    if(userInfo) {
        try {
            const data = await pool.query('select * from Payment where userSeq = ?', [userInfo.userSeq])
            return res.json(data[0])
        } catch (err) {
            return res.status(500).json(err)
        }
    }else{
        return res.status(403).json({"message" : "Token Expired!"});
    }
})


/**
 * @apiDefine PaymentList
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *     {
 *       "paymentSeq" : 1,
 *       "prodSeq" : 1,
 *       "deliveryState": 0,
 *       "userSeq" : 1
 *     },
 *     {
 *       "paymentSeq" : 1,
 *       "prodSeq" : 1,
 *       "deliveryState": 0,
 *       "userSeq" : 1
 *     }
 *     ]
 */
module.exports = router