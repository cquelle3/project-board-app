import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Attachment from "./attachment";

function ItemModal({hideModal, createItem, editItem, modalMode, item}) {

    const [priority, setPriority] = useState(item.priority);
    const [name, setName] = useState(item.title);
    const [description, setDescription] = useState(item.description);
    const [files, setFiles] = useState(item.attachments);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            //can only add 1 attachment under 15mb
            if(files.length === 0 && acceptedFiles[0].size < 15728640){
                let file = acceptedFiles[0];
                let reader = new FileReader();
                reader.onload = function(){
                    let fileString = btoa(reader.result);
                    setFiles([
                        ...files,
                        fileString
                    ]);
                }
                reader.readAsBinaryString(file);
            }
        },
    });

    const removeAttachment = (index) => {
        let newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    return (
        <div onClick={hideModal} className="flex items-center justify-center fixed left-0 top-0 w-full h-screen min-w-[1000px] min-h-[800px] z-1 bg-black/30">
            <div onClick={(e) => e.stopPropagation()} className="w-1/2 h-1/2 rounded bg-white">
                <div className="w-full h-full p-3">
                    {/*modal header*/}
                    <div className="flex w-full h-[18%]">
                        <h1 className="select-none font-quicksand text-2xl font-semibold text-black">
                            {modalMode === 'add' && 'New Item'}
                            {modalMode === 'edit' && 'Edit Item'}
                        </h1>
                        <div className="flex flex-col ml-auto font-quicksand">
                            <label htmlFor="priority" className="select-none font-semibold text-base">Priority</label>
                            <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} className={`select-none outline-none bg-gray-50 rounded px-1 py-2 text-${priority}-400`}>
                                <option value="blue" className="text-blue-400 text-base">Low</option>
                                <option value="yellow" className="text-yellow-400 text-base">Medium</option>
                                <option value="red" className="text-red-400 text-base">High</option>
                            </select>
                        </div>
                    </div>
                    {/*modal content*/}
                    <div className="w-full h-[72%] overflow-auto">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="select-none font-quicksand font-semibold text-base">Name</label>
                            <input id="name" spellCheck="false" value={name} onChange={(e) => setName(e.target.value)} placeholder="Item Name" className="select-none appearance-none outline-none p-2 font-quicksand text-base bg-gray-50 rounded"/>
                        </div>
                        <br className="select-none"></br>
                        <div className="flex flex-col">
                            <label htmlFor="details" className="select-none font-quicksand font-semibold text-base">Details</label>
                            <textarea id="details" spellCheck="false" rows={6} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Details..." className="select-none appearance-none outline-none resize-none font-quicksand text-base p-2 bg-gray-50 rounded"/>
                        </div>
                        <br className="select-none"></br>
                        <div className="flex flex-col">
                            <h1 className="select-none font-quicksand font-semibold text-base">Attachments</h1>
                            <div {...getRootProps()} className={`flex items-center ${files.length > 0 ? '' : 'justify-center'} w-full h-32 p-2 overflow-auto rounded border-2 border-gray-100`}>
                                <input accept="image/*" {...getInputProps()}/>
                                {files.length === 0 && <p className="select-none font-quicksand text-xs">Drag & drop files here, or click to select files (Can only add 1 attachment under 16mb)</p>}
                                {files.length > 0 && files.map((file, index) => (
                                    <Attachment key={index} file={file} removeAttachment={() => removeAttachment(index)}></Attachment>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/*modal footer*/}
                    <div className="flex w-full h-[10%]">
                        <div className="flex mt-auto ml-auto">
                            <button onClick={hideModal} className="select-none flex items-center justify-center rounded px-2 py-1 font-quicksand font-semibold text-base border-2 border-gray-300 bg-gray-300 hover:bg-gray-500 ease-in-out duration-300 mr-2">Cancel</button>
                            {modalMode === 'add' && <button onClick={() => createItem(name, description, files, priority)} className="select-none flex items-center justify-center rounded px-2 py-1 font-quicksand font-semibold text-base text-white border-2 border-blue-400 bg-blue-400 hover:bg-blue-600 ease-in-out duration-300">Create</button>}
                            {modalMode === 'edit' && <button onClick={() => editItem(name, description, files, priority)} className="select-none flex items-center justify-center rounded px-2 py-1 font-quicksand font-semibold text-base text-white border-2 border-blue-400 bg-blue-400 hover:bg-blue-600 ease-in-out duration-300">Save</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemModal