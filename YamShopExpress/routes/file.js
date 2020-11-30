let express = require('express')
let router = express.Router()
const pool = require('../utils/pool')

/**
 * @api {get} /file 파일 정보 요청
 * @apiName GetFileList
 * @apiGroup File
 *
 * @apiParam {Number} boardSeq 게시판 번호
 * @apiParam {Number} postSeq 게시글 번호
 *
 * @apiUse FileList
 */

router.get('/', async (req, res, next) => {

    const { boardSeq, postSeq } = req.query;
    try {
        const data = await pool.query('select * from FileInfo where boardSeq = ? and postSeq = ?', [boardSeq, postSeq]);
        return res.json(data[0])
    } catch (err) {
        return res.status(500).json(err)
    }
})



/**
 * @apiDefine File
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "fileSeq" : 0,
 *       "fileUrl" : "https://s3-ap-northest...",
 *       "boardSeq" : 0,
 *       "uploaderSeq" : 1,
 *       "postSeq" : 3
 *     }
 */


/**
 * @apiDefine FileList
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *     {
 *       "fileSeq" : 0,
 *       "fileUrl" : "https://s3-ap-northest...",
 *       "boardSeq" : 0,
 *       "uploaderSeq" : 1,
 *       "postSeq" : 3
 *     },
 *     {
 *       "fileSeq" : 0,
 *       "fileUrl" : "https://s3-ap-northest...",
 *       "boardSeq" : 0,
 *       "uploaderSeq" : 1,
 *       "postSeq" : 3
 *     }
 *     ]
 */
module.exports = router