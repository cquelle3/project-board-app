import { Draggable } from "react-beautiful-dnd"
import { IoIosCheckmark } from "react-icons/io"

function BoardItem({priority, itemId, title, description, attachments, index, columnIndex, onEdit, isDone, onDone}){
    return (
        <Draggable key={itemId} draggableId={itemId} index={index}>
            {provided => (
                <div onDoubleClick={() => onEdit(columnIndex, index)} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`flex w-11/12 h-fit rounded mt-2 bg-white hover:bg-gray-300 ease-in-out duration-300 hover:cursor-pointer`}>
                    <div className={`w-[3%] h-full bg-${priority}-400 rounded-l`}></div>
                    <div className="w-[97%] h-full p-2">
                        <h1 className="select-none font-quicksand font-semibold text-base text-ellipsis overflow-hidden">{title}</h1>
                        <p className="select-none font-quicksand text-base text-ellipsis overflow-hidden">{description}</p>
                        {attachments.length > 0 && <img src={`data:image;base64,${attachments[0]}`} className="select-none w-full aspect-video rounded object-cover"></img>}
                        {/*check button for done column*/}
                        <div onDoubleClick={(e) => e.stopPropagation()} className="mt-1 ml-auto w-fit">
                            {isDone && <button onClick={() => onDone(columnIndex, itemId)} className="select-none flex justify-center items-center w-9 h-9 rounded p-2 border-2 border-gray-300 bg-gray-300 hover:bg-gray-500 ease-in-out duration-300">
                                <IoIosCheckmark className="ml-auto text-2xl"></IoIosCheckmark>
                            </button>}
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default BoardItem