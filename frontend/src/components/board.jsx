import { DragDropContext } from "react-beautiful-dnd"
import BoardColumn from "./boardColumn"
import { useRef, useState } from "react";
import ItemModal from "./itemModal";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import ApiService from "../services/apiService";
import { IoIosArrowBack } from "react-icons/io";
import ConfirmModal from "./confirmModal";

function Board(){
    const { id } = useParams();
    const navigate = useNavigate();

    const currColumn = useRef(null);
    const currItemInd = useRef(null);
    const currItem = useRef(null);
    const currItemId = useRef(null);
    const itemModalMode = useRef('add');
    const [board, setBoard] = useState({title: '', columns: []});
    const [showModal, setShowModal] = useState(false);
    const [showDoneConfirm, setShowDoneConfirm] = useState(false);

    useEffect(() => {
        async function getBoard(){
            let savedBoard = await ApiService.getBoardById(id);
            setBoard(savedBoard.data);
        }
        getBoard();
    }, [id]);

    useEffect(() => {
        async function patchBoard(){
            if(board._id !== undefined){
                ApiService.patchBoard(board);
            }
        }
        patchBoard();
    }, [board]);

    const onDragEnd = ({source, destination}) => {        
        //if destination for dropped object is invalid
        if(destination === undefined || destination === null) return null;
        //if source and destination columns are the same and the indexes are the same, the item will not move
        if(source.droppableId === destination.droppableId && source.index === destination.index) return null;
    
        var srcArr = board.columns[source.droppableId].items;
        var destArr = board.columns[destination.droppableId].items;

        //if the item is being moved in the same column
        if(source.droppableId === destination.droppableId){
            //swap items in the array
            let movedItem = {...srcArr[source.index]};
            srcArr = srcArr.filter((item) => item._id !== movedItem._id);
            srcArr.splice(destination.index, 0, movedItem);

            //create new board column obj using the new items array for source
            const newSrcCol = {...board.columns[source.droppableId]};
            newSrcCol.items = [...srcArr];

            //update the state of board column with our new column
            const newColumns = board.columns;
            newColumns[source.droppableId] = newSrcCol;

            setBoard((state) => ({
                ...state,
                columns: newColumns
            }));
        }
        //if the item is being moved between 2 different columns
        else{
            //get item being moved
            let item = srcArr[source.index];
            //insert it into the destination column list
            destArr.splice(destination.index, 0, item);
            //create new board column obj using the new items array for destination
            const newDestCol = board.columns[destination.droppableId];
            newDestCol.items = destArr;

            //filter out item from previous list
            let newSrcArr = srcArr.filter((_, index) => index !== source.index);
            //create new board column obj using the new items array for source
            const newSrcCol = board.columns[source.droppableId];
            newSrcCol.items = newSrcArr;

            //update the state of board with our new columns
            const newColumns = board.columns;
            newColumns[source.droppableId] = newSrcCol;

            setBoard((state) => ({
                ...state,
                columns: newColumns
            }));
        }
    };

    const onAdd = (columnIndex) => {
        currColumn.current = columnIndex;
        currItem.current = {
            title: '',
            description: '',
            attachments: [],
            priority: 'blue',
            boardId: id
        };
        itemModalMode.current = 'add';
        setShowModal(true);
    };

    const createItem = async (name, description, attachments, priority) => {
        setShowModal(false);
        
        //create new item
        let newItem = {
            title: name,
            description: description,
            attachments: attachments,
            priority: priority,
            boardId: id
        };

        //add item to database
        let addedItem = await ApiService.addItem(newItem);
        addedItem = addedItem.data;

        //get the column and push new item to its items array
        let newCol = board.columns[currColumn.current];
        newCol.items = [addedItem, ...newCol.items];

        //update the state of board with new column that contains our new item
        const newColumns = board.columns;
        newColumns[currColumn.current] = newCol;

        setBoard((state) => ({
            ...state,
            columns: newColumns
        }));
    };

    const onEdit = (columnIndex, itemInd) => {
        currColumn.current = columnIndex;
        currItemInd.current = itemInd;
        currItem.current = board.columns[currColumn.current].items[currItemInd.current];
        itemModalMode.current = 'edit';
        setShowModal(true);
    };

    const editItem = async (name, description, attachments, priority) => {
        setShowModal(false);

        //get the edited item
        let editItem = board.columns[currColumn.current].items[currItemInd.current];
        editItem.title = name;
        editItem.description = description;
        editItem.attachments = attachments;
        editItem.priority = priority;

        //patch item in the database
        let editedItem = await ApiService.patchItem(editItem);
        editedItem = editedItem.data[0];

        //get the column and replace edited item into the array
        let newCol = board.columns[currColumn.current];
        newCol.items[currItemInd.current] = editedItem;

        //update the state of board with new column that contains our edited item
        const newColumns = board.columns;
        newColumns[currColumn.current] = newCol;

        setBoard((state) => ({
            ...state,
            columns: newColumns
        }));
    };

    const onDone = async (columnInd, itemId) => {
        currColumn.current = columnInd;
        currItemId.current = itemId;
        setShowDoneConfirm(true);
    };

    const doneItem = async () => {
        setShowDoneConfirm(false);

        let newCol = {...board.columns[currColumn.current]};
        newCol.items = newCol.items.filter((item) => item._id !== currItemId.current);
        
        const newColumns = [...board.columns];
        newColumns[currColumn.current] = newCol;

        setBoard((state) => ({
            ...state,
            columns: newColumns
        }));

        //delete item from database
        await ApiService.deleteItem(currItemId.current);
    };

    return (
        <>
            {/*done confirm modal*/}
            {showDoneConfirm && <ConfirmModal config={{'title': 'Complete Item', 'body': 'Mark item as complete? This will remove it from the board and the database.'}} hideModal={() => setShowDoneConfirm(false)} onConfirm={() => doneItem()}></ConfirmModal>}
            {/*item modal*/}
            {showModal && <ItemModal hideModal={() => setShowModal(false)} createItem={createItem} editItem={editItem} modalMode={itemModalMode.current} item={currItem.current}></ItemModal>}
            {/*board*/}
            <div className="w-full h-full p-10">
                <div className="flex items-center w-full h-[8%]">
                    <div className="w-1/3 h-full">
                        <button onClick={() => navigate('../boards')} className="select-none flex items-center justify-center rounded px-2 py-1 font-quicksand font-semibold text-base text-white border-2 border-indigo-400 bg-indigo-400 hover:bg-indigo-600 ease-in-out duration-300">
                            <IoIosArrowBack className="mr-1"></IoIosArrowBack> Back
                        </button>
                    </div>
                    <div className="flex w-1/3 h-full justify-center">
                        <h1 className="select-none font-quicksand font-bold text-3xl">{board.title}</h1>
                    </div>
                    <div className="w-1/3 h-full"></div>
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="flex w-full h-[92%]">
                        {board.columns.map((col, index) => (
                            <BoardColumn key={index} col={col} colIndex={index} onAdd={onAdd} onEdit={onEdit} onDone={onDone}></BoardColumn>
                        ))}
                    </div>
                </DragDropContext>
            </div>
        </>
    )
}

export default Board