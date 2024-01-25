import Content from "./content"
import Header from "./header"

function Dashboard(){
    return(
        <>
            <div className="flex flex-col w-full h-full z-0 bg-sky-100">
                <Header></Header>
                <Content></Content>    
            </div>
        </>
    )
}

export default Dashboard