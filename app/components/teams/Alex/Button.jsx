/* Author: Alex */
/* Description: Bouton qui clique de fou */
"use client"

import React, { useState } from 'react'

function Button() {
    const [buttonValue, updateButtonValue] = useState(0);
    return (
        <div className='flex flex-col justify-center items-center'>
            <a className='text-lg font-bold'>{buttonValue}</a>
            <button onClick={() => updateButtonValue(buttonValue + 1)} className='rounded p-[20px] bg-purple-600 outline-none border-2 shadow-sm shadow-purple-600 border-solid border-white'>Clique</button>
        </div>
    )
}

export default Button