let express = require('express')
let router = express.Router()
const pool = require('../utils/pool')

/**
 * @api {get} /delivery/:prodSeq 배송 정보 요청
 * @apiName GetDeliveryList
 * @apiGroup Delivery
 *
 * @apiParam {Number} prodSeq
 * @apiUse DeliveryList
 *
 */

router.get('/:prodSeq', async (req, res, next) => {
    const { prodSeq } = req.params

        try {
            const data = await pool.query('select * from Delivery where prodSeq = ?', [prodSeq])
            return res.json(data[0])
        } catch (err) {
            return res.status(500).json(err)
        }

})

/**
 * @api {post} /delivery/:prodSeq 배송 정보 등록
 * @apiName Post Delivery
 * @apiGroup Delivery
 *
 * @apiHeader {String} x-access-token 사용자 접근 토큰
 * @apiParam {Number} prodSeq
 * @apiParam {String} deliveryName
 * @apiParam {Number} deliveryPrice
 *
 * @apiPermission admin
 *
 * @apiUse Delivery
 */

router.post('/:prodSeq', async (req, res, next) => {
    if(req.userInfo && req.userInfo.typeSeq === 1){
        const { prodSeq } = req.params;
        const { deliveryName, deliveryPrice } = req.body
        try {
            const data = await pool.query('insert into Delivery set ?',[{deliveryName : deliveryName, deliveryPrice : deliveryPrice, prodSeq : prodSeq}] )
            return res.json(data[0])
        } catch (err) {
            return res.status(500).json(err)
        }
    }else{
        return res.status(403).send({"message" : "Token Expired!"});
    }
})

/**
 * @api {patch} /delivery/:prodSeq/:deliverySeq 배송 정보 수정
 * @apiName 배송정보 수정
 * @apiGroup Delivery
 *
 * @apiPermission admin
 * @apiHeader {String} x-access-token 유저 접근 토큰
 */

router.patch('/:prodSeq/:deliverySeq', async (req, res, next) => {

    if(req.userInfo && req.userInfo.typeSeq === 1) {
        const {prodSeq, deliverySeq} = req.params
        const {deliveryName, deliveryPrice} = req.body
        try {
            const data = await pool.query('update Delivery set deliveryName = ?, deliveryPrice = ? where prodSeq = ? and deliverySeq = ?', [deliveryName, deliveryPrice, prodSeq, deliverySeq])
            return res.json(data[0])
        } catch (err) {
            return res.status(500).json(err)
        }
    }else{
        return res.status(403).send({"message":"Token Expired!"});
    }
})

/**
 * @api {delete} /delivery/:prodSeq/:deliverySeq Delete Delivery
 * @apiName Delete Delivery
 * @apiGroup Delivery
 *
 * @apiUse Delivery
 */

router.delete('/:prodSeq/:deliverySeq', async (req, res, next) => {

    if(req.userInfo && req.userInfo.typeSeq === 1) {
        const { prodSeq, deliverySeq } = req.params;
        try {
            const data = await pool.query('delete from Delivery where prodSeq = ? and deliverySeq', [prodSeq, deliverySeq])
            return res.json(data[0])
        } catch (err) {
            return res.status(500).json(err)
        }
    }
})


/**
 * @apiDefine Delivery
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "deliverySeq" : 0,
 *       "deliveryName" : "오늘 바로 배송 가능",
 *       "prodSeq" : 0,
 *       "deliveryPrice" : 4000
 *     }
 */


/**
 * @apiDefine DeliveryList
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *     {
 *       "deliverySeq" : 0,
 *       "deliveryName" : "오늘 바로 배송 가능",
 *       "prodSeq" : 0,
 *       "deliveryPrice" : 4000
 *     },
 *     {
 *       "deliverySeq" : 0,
 *       "deliveryName" : "오늘 바로 배송 가능",
 *       "prodSeq" : 0,
 *       "deliveryPrice" : 4000
 *     }
 *     ]
 */
module.exports = router