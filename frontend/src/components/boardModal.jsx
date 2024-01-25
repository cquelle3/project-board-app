import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { IoIosCheckmark } from "react-icons/io";

function BoardModal({hideModal, modalMode, createBoard, editBoard, board}){

    const [title, setTitle] = useState(board.title);
    const [columns, setColumns] = useState(board.columns);

    const addColumn = () => {
        let newColumn = {
            name: '',
            theme: '',
            done: false,
            items: []
        };
        setColumns((state) => ([
            ...state,
            newColumn
        ]));
    };

    const handleColName = (name, index) => {
        let newColumns = [...columns];
        newColumns[index].name = name;
        setColumns(newColumns);
    };

    const handleColDone = (index) => {
        let newColumns = [...columns];
        newColumns[index].done = !newColumns[index].done;
        setColumns(newColumns);
    };

    return(
        <div onClick={hideModal} className="flex items-center justify-center fixed left-0 top-0 w-full h-screen min-w-[1000px] min-h-[800px] z-1 bg-black/30">
            <div onClick={(e) => e.stopPropagation()} className="w-1/2 h-1/2 rounded bg-white">
                <div className="w-full h-full p-3">
                    {/*modal header*/}
                    <div className="w-full h-[10%]">
                        <h1 className="select-none font-quicksand text-2xl font-semibold text-black">
                            {modalMode === 'add' && 'New Board'}
                            {modalMode === 'edit' && 'Edit Board'}
                        </h1>
                    </div>
                    {/*modal content*/}
                    <div className="w-full h-[80%] overflow-auto">
                        {/*board name*/}
                        <div className="flex flex-col">
                            <label htmlFor="name" className="select-none font-quicksand font-semibold text-base">Title</label>
                            <input id="name" spellCheck="false" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Board Title" className="select-none appearance-none outline-none p-2 font-quicksand text-base bg-gray-50 rounded"/>
                        </div>
                        <br className="select-none"></br>
                        {/*board columns*/}
                        <div className="flex flex-col">
                            <p className="select-none font-quicksand font-semibold text-base">Columns</p>
                            <div className="w-full mb-1">
                                {columns.map((col, index) => (
                                    <div key={index} className="flex w-full">
                                        <input value={col.name} onChange={(e) => handleColName(e.target.value, index)} placeholder="Column Name" className="select-none w-3/5 appearance-none outline-none p-2 mb-1 font-quicksand text-base bg-gray-50 rounded" />
                                        <div className="w-1/5 flex items-center ml-5">
                                            <label htmlFor="doneCheckbox" className="select-none relative peer mr-2 font-quicksand font-semibold text-base">Done Column</label>
                                            <div className="flex items-center justify-center">
                                                <input id="doneCheckbox" type="checkbox" checked={col.done} onChange={() => handleColDone(index)} className="select-none w-5 h-5 appearance-none peer hover:cursor-pointer border-2 border-black rounded bg-white checked:bg-green-300" />
                                                <IoIosCheckmark className="select-none absolute text-lg text-black hidden peer-checked:block pointer-events-none"></IoIosCheckmark>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => addColumn()} className="select-none flex justify-center items-center w-9 h-9 rounded p-2 border-2 border-gray-300 bg-gray-300 hover:bg-gray-500 ease-in-out duration-300"><IoAdd className="text-lg"></IoAdd></button>
                        </div>
                    </div>
                    {/*modal footer*/}
                    <div className="flex w-full h-[10%]">
                        <div className="flex mt-auto ml-auto">
                            <button onClick={hideModal} className="select-none flex items-center justify-center rounded px-2 py-1 font-quicksand font-semibold text-base border-2 border-gray-300 bg-gray-300 hover:bg-gray-500 ease-in-out duration-300 mr-2">Cancel</button>
                            {modalMode === 'add' && <button onClick={() => createBoard(title, columns)} className="select-none flex items-center justify-center rounded px-2 py-1 font-quicksand font-semibold text-base text-white border-2 border-blue-400 bg-blue-400 hover:bg-blue-600 ease-in-out duration-300">Create</button>}
                            {modalMode === 'edit' && <button onClick={() => editBoard(title, columns)} className="select-none flex items-center justify-center rounded px-2 py-1 font-quicksand font-semibold text-base text-white border-2 border-blue-400 bg-blue-400 hover:bg-blue-600 ease-in-out duration-300">Save</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoardModal