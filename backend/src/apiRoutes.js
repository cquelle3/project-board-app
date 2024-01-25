const { Board, Item } = require('./models');

const router = require('express').Router();

/*Board*/
router.get('/boards', async (req, res) => {
    const boards = await Board.find(req.query);
    return res.status(200).json(boards);
});
router.get('/boards/:id', async (req, res) => {
    const { id } = req.params;
    const board = await Board.findById(id);
    //pull in item objects based off of their id's
    let retBoard = {...board._doc};
    for(const [i, value] of retBoard.columns.entries()){
        let newItems = [];
        for(let itemId of value.items){
            let item = await Item.findById(itemId);
            newItems.push(item._doc);
        }
        retBoard.columns[i].items = newItems;
    }
    return res.status(200).json(retBoard);
});
router.post('/boards', async (req, res) => {
    const newBoard = new Board({...req.body});
    const savedBoard = await newBoard.save();
    return res.status(201).json(savedBoard);
});
router.put('/boards', async (req, res) => {
    //change items arrays to contain only item id's
    let currBoard = {...req.body};
    for(const [i, value] of currBoard.columns.entries()){
        currBoard.columns[i].items = value.items.map((item) => {
            if(typeof item === 'string' || item instanceof String) return item;
            return item._id
        });
    }
    await Board.updateOne({ _id: req.body._id }, currBoard);
    const board = await Board.find({ _id: req.body._id });
    return res.status(200).json(board);
});
router.delete('/boards/:id', async (req, res) => {
    const { id } = req.params;
    const deletedBoard = await Board.findByIdAndDelete(id);
    return res.status(200).json(deletedBoard);
});

router.put('/boards/leave', async (req, res) => {
    let userId = req.body.userId;
    let boardId = req.body.boardId;

    let board = await Board.findById(boardId);
    board = board._doc;
    board.members = board.members.filter((memberId) => memberId !== userId);
    if(board.members.length > 0){
        //update the board without the given user
        await Board.updateOne({ _id: boardId }, board);
    }
    else{
        //delete all items in the board
        for(let column of board.columns){
            for(let item of column.items){
                await Item.findByIdAndDelete(item);
            }
        }
        //delete the board
        await Board.findByIdAndDelete(boardId);
    }

    const boards = await Board.find({ members: userId });
    return res.status(200).json(boards)
});

/*Item*/
router.get('/items', async (req, res) => {
    const items = await Item.find(req.query);
    return res.status(200).json(items);
});
router.post('/items', async (req, res) => {
    const newItem = new Item({...req.body});
    const savedItem = await newItem.save();
    return res.status(201).json(savedItem);
});
router.put('/items', async (req, res) => {
    await Item.updateOne({ _id: req.body._id }, req.body);
    const item = await Item.find({ _id: req.body._id });
    return res.status(200).json(item);
});
router.delete('/items/:id', async (req, res) => {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);
    return res.status(200).json(deletedItem);
});

module.exports = router;