function FakeBoardItem({priority, title, description}){
    return (
        <div className='flex w-full lg:h-32 sm:h-24 rounded mt-2 bg-white hover:bg-gray-300 ease-in-out duration-300 hover:cursor-pointer'>
            <div className={`w-[3%] h-full bg-${priority}-400 rounded-l`}></div>
            <div className="w-[97%] h-full p-2">
                <h1 className="select-none font-quicksand font-semibold lg:text-base sm:text-sm">{title}</h1>
                <p className="select-none font-quicksand lg:text-base sm:text-sm">{description}</p>
            </div>
        </div>
    );
}

export default FakeBoardItem