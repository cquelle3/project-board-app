import { Navigate, Route, Routes } from "react-router-dom";
import Board from "./board";
import BoardList from "./boardList";

function Content(){
    return(
        <div className="w-full h-[95%] bg-gray-100">
            <div className="w-full h-full p-10">
                <div className="w-full h-full rounded bg-white">
                    <Routes>
                        <Route path='/' element={<Navigate to='boards' replace={false} />} />
                        <Route path='boards' element={<BoardList></BoardList>} />
                        <Route path='board/:id' element={<Board></Board>} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Content;