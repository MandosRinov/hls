import * as classes from "./global.module.css"
import Router from "./router/router"
import {VideoContextProvider} from "./context/VideoContext"

function App () {
    return (
        <div className={classes.wrapper}>
            <VideoContextProvider>
                <Router/>
            </VideoContextProvider>
        </div>
    )
}

export default App