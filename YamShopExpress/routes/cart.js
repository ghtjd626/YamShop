let express = require('express')
let router = express.Router()
const pool = require('../utils/pool')

/**
 * @api {get} /cart 장바구니 정보요청
 * @apiName GetCartList
 * @apiGroup Cart
 *
 * @apiHeader {String} x-access-token 사용자 액세스 토큰
 *
 * @apiParam {Number} page Current page number
 * @apiParam {Number} size Page size
 *
 * @apiUse CartList
 */

router.get('/', async (req, res, next) => {
    if(req.userInfo) {
        const {page, size} = req.query
        try {
            const data = await pool.query('select * from Cart where userSeq = ? limit ?, ?', [req.userInfo.userSeq ,Number(page), Number(size)])
            return res.json(data[0])
        } catch (err) {
            return res.status(500).json(err)
        }
    }else{
        res.status(403).send({"message" : "Token Expired!"});
    }
})

/**
 * @api {post} /cart 장바구니 추가
 * @apiName Post Cart
 * @apiGroup Cart
 *
 * @apiHeader {String} x-access-token 사용자 접근 토큰
 * @apiParam {Number} prodSeq 상품 시퀀스 번호
 * @apiUse Cart
 */

router.post('/', async (req, res, next) => {
    const { prodSeq } = req.body;
    if(req.userInfo){
        try {
            const data = await pool.query('insert into Cart set ?',[{"userSeq" : req.userInfo.userSeq, "prodSeq" : prodSeq}] )
            return res.json(data[0]);
        } catch (err) {
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).send({"message": "Token Expired!"});
    }
})

/**
 * @api {delete} /cart/:cartSeq Delete Cart
 * @apiName Delete Cart
 * @apiGroup Cart
 *
 * @apiHeader {String} x-access-token 사용자 접근 토큰
 * @apiParam {Number} cartSeq
 *
 */

router.delete('/:cartSeq', async (req, res, next) => {
    const { cartSeq } = req.params
    if(req.userInfo) {
        try {
            const data = await pool.query('delete from Cart where cartSeq = ? and userSeq = ?', [cartSeq, req.userInfo.userSeq])
            return res.json(data[0])
        } catch (err) {
            return res.status(500).json(err)
        }
    }else{
        return res.status(403).send({"message" : "Token Expired!"});
    }
})


/**
 * @apiDefine Cart
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "cartSeq" : 0,
 *       "userSeq" : 2,
 *       "prodSeq" : 0
 *     }
 */


/**
 * @apiDefine CartList
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *     {
 *       "cartSeq" : 0,
 *       "userSeq" : 2,
 *       "prodSeq" : 0
 *     },
 *     {
 *       "cartSeq" : 0,
 *       "userSeq" : 2,
 *       "prodSeq" : 0
 *     }
 *     ]
 */
module.exports = router