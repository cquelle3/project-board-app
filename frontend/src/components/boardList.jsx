import { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/apiService";
import { AuthContext } from "../App";
import BoardModal from "./boardModal";
import { FaEdit } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import ConfirmModal from "./confirmModal";

function BoardList() {

    const navigate = useNavigate();
    const { authInfo } = useContext(AuthContext);

    const userId = useRef('');
    const boardModalMode = useRef('add');
    const currBoard = useRef(null);
    const currBoardInd = useRef(null);
    const [boards, setBoards] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);

    useEffect(() => {
        async function getBoards(){
            userId.current = authInfo?.userId;
            let savedBoards = await ApiService.getBoards({ members: userId.current });
            setBoards(savedBoards.data);
        }
        getBoards();
    }, [authInfo]);

    const onAdd = () => {
        boardModalMode.current = 'add';
        currBoard.current = {
            title: '',
            members: [],
            columns: []
        };
        setShowModal(true);
    };

    const createBoard = async (title, columns) => {
        setShowModal(false);

        let newBoard = {
            title: title,
            members: [userId.current],
            columns: columns
        };

        let addedBoard = await ApiService.addBoard(newBoard);

        setBoards([
            ...boards,
            addedBoard.data
        ]);
    };
    
    const onEdit = (index) => {
        boardModalMode.current = 'edit';
        currBoardInd.current = index;
        currBoard.current = boards[index];
        setShowModal(true);
    };

    const editBoard = async (title, columns) => {
        setShowModal(false);

        let tempBoard = boards[currBoardInd.current];
        tempBoard.title = title;
        tempBoard.columns = columns;

        //patch board in the database
        let editedBoard = await ApiService.patchBoard(tempBoard);
        editedBoard = editedBoard.data[0];

        let newBoards = [...boards];
        newBoards[currBoardInd.current] = editedBoard;

        setBoards(newBoards);
    };

    const onLeave = async (board) => {
        currBoard.current = board;
        setShowLeaveConfirm(true);
    };

    const leaveBoard = async (boardId) => {
        setShowLeaveConfirm(false);
        let savedBoards = await ApiService.leaveBoard(userId.current, boardId);
        setBoards(savedBoards.data);
    };

    const openBoard = (id) => {
        navigate(`../board/${id}`, { replace: true });
    };

    return (
        <>
            {/*leave confirm modal*/}
            {showLeaveConfirm && <ConfirmModal config={{title: 'Leave Board', body: 'Are you sure you want to leave this board? If there are no members left the board will be deleted from the database.'}} hideModal={() => setShowLeaveConfirm(false)} onConfirm={() => leaveBoard(currBoard.current._id)}></ConfirmModal>}
            {/*board modal*/}
            {showModal && <BoardModal hideModal={() => setShowModal(false)} modalMode={boardModalMode.current} createBoard={createBoard} editBoard={editBoard} board={currBoard.current}></BoardModal>}
            {/*board list*/}
            <div className="w-full h-full p-8">
                <div className="w-full h-[10%] flex">
                    <div className="ml-auto">
                        <button onClick={() => onAdd()} className="select-none flex items-center justify-center rounded px-2 py-1 font-quicksand font-semibold text-base text-white border-2 border-blue-400 bg-blue-400 hover:bg-blue-600 ease-in-out duration-300">+ Add Board</button>
                    </div>
                </div>

                <div className="h-[90%] overflow-auto">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="select-none font-quicksand text-left">Title</th>
                                <th className="select-none font-quicksand text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {boards.map((board, index) => (
                                <tr onClick={() => openBoard(board._id)} className="border-b-2 border-gray-100 bg-white hover:bg-gray-100 hover:cursor-pointer ease-in-out duration-300" key={index}>
                                    <td className="select-none font-quicksand text-base h-16">{board.title}</td>
                                    <td className="h-16">
                                        <div onClick={(e) => e.stopPropagation()} className="flex w-full">
                                            <button onClick={() => onEdit(index)} className="select-none flex items-center justify-center rounded px-2 py-1 mr-2 font-quicksand font-semibold text-base border-2 border-gray-300 bg-gray-300 hover:bg-gray-500 ease-in-out duration-300">
                                                <FaEdit className="mr-1"></FaEdit> Edit
                                            </button>
                                            <button onClick={() => onLeave(board)} className="select-none flex items-center justify-center rounded px-2 py-1 font-quicksand font-semibold text-base text-white border-2 border-indigo-400 bg-indigo-400 hover:bg-indigo-600 ease-in-out duration-300">
                                                <IoMdExit className="text-lg mr-1"></IoMdExit> Leave
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default BoardList;