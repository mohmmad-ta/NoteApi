const express = require('express');
const router = express.Router();
const {getAllNodes, getOneNodes, createNode, deleteNode, updateNode} = require('../controllers/nodesController')

router.route('/')
    .get(getAllNodes)
    .post(createNode)

router.route('/:id')
    .patch(updateNode)
    .delete(deleteNode)
    .get(getOneNodes)

module.exports = router;
