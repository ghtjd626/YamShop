let express = require('express')
let router = express.Router()
const pool = require('../utils/pool')


/**
 * @api {get} /category Request category information
 * @apiName GetCategoryList
 * @apiGroup Category
 *
 * @apiParam {Number} page Current page number
 * @apiParam {Number} size Page size
 *
 * @apiUse CategoryList
 */

router.get('/', async (req, res, next) => {
    const { page, size } = req.query
    try {
        const data = await pool.query('select * from ProdCategory limit ?, ?', [Number(page), Number(size)])
        return res.json(data[0])
    } catch (err) {
        return res.status(500).json(err)
    }
})

/**
 * @api {post} /category Add Category
 * @apiName Post Category
 * @apiGroup Category
 *
 * @apiHeader {String} x-access-token
 * @apiPermission admin
 * @apiUse Category
 */

router.post('/', async (req, res, next) => {
    let userInfo = req.userInfo;
    if(userInfo && userInfo.typeSeq === 1) {
        const {categoryName, parentCategory} = req.body
        try {
            const data = await pool.query('insert into ProdCategory set ?', [{
                categoryName: categoryName,
                parentCategory: parentCategory
            }])
            return res.json(data[0])
        } catch (err) {
            return res.status(500).json(err)
        }
    }else{
        res.status(403).send({"message" : "Token Error!"});
    }
})

/**
 * @api {patch} /category/:categorySeq Modify Category
 * @apiName Modify category
 * @apiGroup Category
 *
 * @apiHeader {String} x-access-token
 * @apiPermission admin
 * @apiUse Category
 */

router.patch('/:categorySeq', async (req, res, next) => {
    let userInfo = req.userInfo;
    if(userInfo && userInfo.typeSeq === 1) {
        const {categorySeq} = req.params
        const {categoryName, parentCategory} = req.body
        try {
            const data = await pool.query('update ProdCategory set categoryName = ?, parentCategory = ? where categorySeq = ?', [categoryName, parentCategory, categorySeq])
            return res.json(data[0])
        } catch (err) {
            return res.status(500).json(err)
        }
    }else{
        res.status(403).send({"message" : "Token Error!"});
    }
})

/**
 * @api {delete} /category/:categorySeq Delete board
 * @apiName Delete category
 * @apiGroup Category
 *
 * @apiHeader {String} x-access-token
 * @apiPermission admin
 * @apiUse Category
 */

router.delete('/:categorySeq', async (req, res, next) => {
    let userInfo = req.userInfo;
    if(userInfo && userInfo.typeSeq === 1) {
        const {categorySeq} = req.params
        try {
            const data = await pool.query('delete from ProdCategory where categorySeq = ?', [categorySeq])
            return res.json(data[0][0])
        } catch (err) {
            return res.status(500).json(err)
        }
    }else{
        res.status(403).send({"message" : "Token error"});
    }
})

/**
 * @api {get} /category/:categorySeq Request Category information
 * @apiName GetCategory
 * @apiGroup Category
 *
 * @apiParam {Number} categorySeq Category's unique Seq.
 *
 * @apiUse Category
 */

router.get('/:categorySeq', async (req, res, next) => {
    const { categorySeq } = req.params
    try {
        const data = await pool.query('select * from ProdCategory where categorySeq = ?', [categorySeq])
        return res.json(data[0][0])
    } catch (err) {
        return res.status(500).json(err)
    }
})

/**
 * @apiDefine Category
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "categorySeq" : 0,
 *       "categoryName" : "잡화",
 *       "parentCategory" : 0
 *     }
 */


/**
 * @apiDefine CategoryList
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *     {
 *       "categorySeq" : 0,
 *       "categoryName" : "잡화",
 *       "parentCategory" : 0
 *     },
 *     {
 *       "categorySeq" : 0,
 *       "categoryName" : "잡화",
 *       "parentCategory" : 1
 *     }
 *     ]
 */
module.exports = router