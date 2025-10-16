import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Main from "../pages/Main"
import Account from "../pages/Account"
import Unknown from "../pages/Unknown"
import Video from "../pages/Video";
import {Header} from "../pages/Main/components";

export default ()=> {
    return (

        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="/account/:accountId" element={<Account/>} />
                <Route path="/watch" element={<Video/>}/>
                <Route path="*" element={<Unknown/>} />
            </Routes>
        </BrowserRouter>
    )
}