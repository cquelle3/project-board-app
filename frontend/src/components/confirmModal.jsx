function ConfirmModal({config, hideModal, onConfirm}){
    return(
        <div onClick={hideModal} className="flex items-center justify-center fixed left-0 top-0 w-full h-screen min-w-[1000px] min-h-[800px] z-1 bg-black/30">
            <div onClick={(e) => e.stopPropagation()} className="w-1/3 h-1/3 rounded bg-white">
                <div className="w-full h-full p-3">
                    {/*modal header*/}
                    <div className="w-full h-[10%]">
                        <h1 className="select-none font-quicksand text-2xl font-semibold text-black">
                            {config.title}
                        </h1>
                    </div>
                    {/*modal content*/}
                    <div className="w-full h-[80%] overflow-auto">
                        <p className="select-none mt-4 font-quicksand text-lg text-black">
                            {config.body}
                        </p>
                    </div>
                    {/*modal footer*/}
                    <div className="flex w-full h-[10%]">
                        <div className="flex mt-auto ml-auto">
                            <button onClick={hideModal} className="select-none flex items-center justify-center rounded px-2 py-1 font-quicksand font-semibold text-base border-2 border-gray-300 bg-gray-300 hover:bg-gray-500 ease-in-out duration-300 mr-2">Cancel</button>
                            <button onClick={onConfirm} className="select-none flex items-center justify-center rounded px-2 py-1 font-quicksand font-semibold text-base text-white border-2 border-blue-400 bg-blue-400 hover:bg-blue-600 ease-in-out duration-300">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal