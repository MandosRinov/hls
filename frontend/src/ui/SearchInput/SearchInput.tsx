import React, {useRef, useState} from 'react';
import * as classes from './SearchInput.module.css';

import cancel from "@assets/images/ui/cancel.svg"

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {

}

const SearchInput = (props: SearchInputProps) => {
    let inputRef = useRef<HTMLInputElement | null>(null);

    let [searchValue, setSearchValue] = useState('');


    function cancelClickHandler() {
        setSearchValue('');
        inputRef.current && inputRef.current.focus();
    }

    return (
            <div className={classes.search_container}>
                <div className={classes.search_input_container}>
                    <input ref={inputRef} {...props}
                           value={searchValue}
                           onChange={e=> setSearchValue(e.target.value)}
                           className={classes.search_input} type={"search"}
                    />
                    {searchValue ?
                        <span onClick={cancelClickHandler} className={classes.search_cancel}>
                            <img alt={''} width={16} height={16} src={cancel as string}/>
                        </span>
                        :
                        null}
                </div>
                <button type={"submit"} className={classes.search_submit}>Поиск</button>
            </div>
    );
};

export default SearchInput;