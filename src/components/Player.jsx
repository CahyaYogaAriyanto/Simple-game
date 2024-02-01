import {useState} from 'react';

export default function Player({initialName,symbol,isActive,onChangeName}){
    const [playerName,setPlayerName] = useState(initialName);
    const [isEditting,setIsEdititing] = useState(false);
    function handlerEditting(){
        // setIsEdititing(!isEditting);  //cara 1
        setIsEdititing((editing)=>!editing) //cara 2
        if (isEditting){
            onChangeName(symbol,playerName);
        }
        // untuk menggubah nama player
        
    };
    function handlerEditPlayerName(event){
        setPlayerName(event.target.value);
    }
    let editPlayerName = <span className='player-name'>{playerName}</span>;
    if(isEditting){
        editPlayerName= <input type="text" required value={playerName} onChange={handlerEditPlayerName}/>
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className='player'>
            {editPlayerName}
                <span className='player-symbol'>{symbol}</span>
            </span>
            <button onClick={handlerEditting}>{isEditting ? 'save' : 'edit'}</button>
        </li>
    )
}