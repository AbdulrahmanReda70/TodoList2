import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

const Toggle = ({ toggleObj }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className='toggle'>
                <div className='toggle-header' onClick={() => setIsOpen(p => !p)} >
                    <FaAngleDown className={`icon ${isOpen ? 'activeIcon' : ''}`} />
                    <h3 >{toggleObj.title}</h3>
                </div>
                <div style={{ transitionDuration: '.5s' }} className={isOpen ? 'activeBlock' : 'notActive'} >
                    <p  >{toggleObj.body}</p>
                </div>
            </div>
        </>
    );
};

export default Toggle;