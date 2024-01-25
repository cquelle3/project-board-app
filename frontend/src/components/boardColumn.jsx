import { Droppable } from "react-beautiful-dnd";
import { IoAdd } from "react-icons/io5";
import BoardItem from "./boardItem"
import { IoIosCheckmark } from "react-icons/io";

function BoardColumn({col, colIndex, onAdd, onEdit, onDone}){
    return (
        <div className="w-2/12 h-full mr-10">
            <div className="flex flex-col w-full h-full items-center rounded py-2 bg-gray-100">
                <div className="flex justify-center w-full h-6">
                    <div className="flex w-11/12">
                        <h1 className="select-none font-quicksand font-semibold text-base">{col.name}</h1>
                        {col.items.length > 0 && <h1 className="select-none ml-2.5 font-quicksand text-base">{col.items.length}</h1>}
                        {col.done && <IoIosCheckmark className="select-none ml-auto text-2xl"></IoIosCheckmark>}
                    </div>
                </div>
                <div className="flex justify-center w-full h-8 mt-2">
                    <button onClick={() => onAdd(colIndex)} className="select-none flex items-center justify-center w-11/12 rounded text-white border-2 border-blue-400 bg-blue-400 hover:bg-blue-600 ease-in-out duration-300">
                        <IoAdd className="text-lg text-white"></IoAdd>
                    </button>
                </div>
                <Droppable droppableId={colIndex.toString()}>
                    {provided => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col w-full h-full items-center overflow-auto">
                            {col.items.map((item, index) => (
                                <BoardItem key={item._id} priority={item.priority} itemId={item._id} title={item.title} description={item.description} attachments={item.attachments} index={index} columnIndex={colIndex} onEdit={onEdit} isDone={col.done} onDone={onDone}></BoardItem>
                            ))}
                        {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </div>
    )
}

export default BoardColumn