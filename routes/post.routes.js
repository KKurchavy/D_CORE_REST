const {Router} = require('express');
const {postsController} = require('../controllers/Posts.controller');

class PostsRouter {
    constructor() {
        this.__router = Router();

        this.__configure();
    }

    getRoutes() {
        return this.__router;
    }

    __configure() {

        this.__router.post('/create', async (req, res) => {
            const {body} = req;
            
            await postsController.create(body);
            res.status(201).end();
        });

        this.__router.get('/:groupId', async (req, res) => {
            const { groupId } = req.params;
            res.json(await postsController.findAll(groupId));
        });

    }
}

exports.postsRouter = new PostsRouter();
