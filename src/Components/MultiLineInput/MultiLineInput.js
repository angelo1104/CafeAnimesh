import React, {useEffect, useState} from "react";
import './MultiLineInput.css';

function MultiLineInput() {
    const [inputText,setInputText] = useState('')

    return(
        <div className="multi-line-input">
            <span id={'multiline-span'}>{inputText}</span>
            <input id={'multiline-textarea'} value={inputText} onChange={e=> setInputText(e.target.value)}/>
        </div>
    )
}

export default MultiLineInput;