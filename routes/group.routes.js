const {Router} = require('express');
const {groupController} = require('../controllers/Group.controller');

class GroupsRouter {
    constructor() {
        this.__router = Router();

        this.__configure();
    }

    getRoutes() {
        return this.__router;
    }

    deleteFromArray(arr, deletedElement) {
        const index = arr.findIndex(elem => (elem === deletedElement));
        if(index >= 0) {
            arr.splice(index, 1);
        }
    }

    __configure() {
        this.__router.get('/find/:id', async (req, res) => {
            const {id} = req.params;
            
            res.json(await groupController.findOne(id, req.user.id));
        });

        this.__router.get('/subscribe/:id', async (req, res) => {
            const {id} = req.params;
            const { id: userId } = req.user;
            const { subscribers } = await groupController.findOne(id);
            await groupController.updateOne(id, {subscribers: [...subscribers, userId] });

            res.json(await groupController.findOne(id, userId));
        });

        this.__router.get('/unsubscribe/:id', async (req, res) => {
            const {id} = req.params;
            const { id: userId } = req.user;
            const { subscribers } = await groupController.findOne(id);
            this.deleteFromArray(subscribers, userId);
            await groupController.updateOne(id, {subscribers});

            res.json(await groupController.findOne(id, userId));
        });

        this.__router.delete('/delete/:id', async (req, res) => {
            const {id} = req.params;

            await groupController.deleteOne(id);
            res.status(200).end();
        });

        this.__router.post('/create', async (req, res) => {
            const {body: group} = req;
            group.subscribers = [req.user.id];
            await groupController.create(group);
            res.status(201).end();
        });

        this.__router.get('/', async (req, res) => {
            res.json(await groupController.findAll());
        });
    }
}

exports.groupsRouter = new GroupsRouter();
