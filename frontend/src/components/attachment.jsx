import { IoClose } from "react-icons/io5";
import ConfirmModal from "./confirmModal";
import { useState } from "react";
import { IoMdDownload } from "react-icons/io";

function Attachment({file, removeAttachment}){

    const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

    const onRemoveAttachment = () => {
        setShowRemoveConfirm(true);
    };

    const onConfirm = () => {
        setShowRemoveConfirm(false);
        removeAttachment();
    };

    const downloadAttachment = () => {
        const linkSource = `data:application/png;base64,${file}`;
        const downloadLink = document.createElement("a");
        const fileName = "attachment.png";
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    };

    return(
        <>
            {/*remove attachment modal*/}
            {showRemoveConfirm && <ConfirmModal config={{ title: 'Remove Attachment', body: 'Are you sure you want to remove this attachment?' }} hideModal={() => setShowRemoveConfirm(false)} onConfirm={onConfirm} ></ConfirmModal>}
            {/*attachment*/}
            <div onClick={(e) => e.stopPropagation()} className="h-3/4 aspect-square mr-2 relative">
                <img src={`data:image;base64,${file}`} className="select-none w-full h-full rounded object-cover"></img>
                <div className="w-full h-full rounded opacity-0 hover:opacity-100 bg-black/25 absolute left-0 top-0 ease-in-out duration-300">
                    <div className="flex flex-col w-fit h-full ml-auto mr-0.5">
                        <button onClick={onRemoveAttachment} className="text-white select-none">
                            <IoClose className="text-xl"></IoClose>
                        </button>
                        <button className="text-white select-none mt-auto mb-1" onClick={() => downloadAttachment()}>
                            <IoMdDownload className="text-xl"></IoMdDownload>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Attachment