import * as classes from "./styles.module.css";
import {Link} from "react-router-dom";
import SearchInput from "../../../ui/SearchInput/SearchInput";

function Header() {

    return (
        <div className={classes.header_container}>
            <div className={classes.header_logo_container}>
                <span className={classes.logo}><Link style={{textDecoration:"none"}} to="/">Mtube</Link></span>
            </div>
            <div className={classes.header_search}>
                <SearchInput placeholder="Введите запрос"/>
            </div>
            <div className={classes.header_menu}>

            </div>
        </div>
    )
}

export default Header;