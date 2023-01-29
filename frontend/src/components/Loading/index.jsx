import "./Loading.css"
const Loading = () => {
    return (
        <div id="loader" className="loader">
            <div id="ball-container-1" className="ball-container">
                <div id="ball-1" className="ball"></div>
            </div>
            <div id="ball-container-2" className="ball-container">
                <div id="ball-2" className="ball"></div>
            </div>
            <div id="ball-container-3" className="ball-container">
                <div id="ball-3" className="ball"></div>
            </div>
        </div> 
    )
}
export default Loading