import React, { useEffect, useRef, useState } from 'react';
import '../../../Css/todoList.css';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { IoTodayOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";
import { PiHashLight } from "react-icons/pi";
import { GoSidebarCollapse } from "react-icons/go";
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { FaRegTrashCan } from "react-icons/fa6";

import { PiClover } from "react-icons/pi";

function Todo() {
    const is_min_width_991 = useMediaQuery(`(min-width:991px)`);
    const nav = useNavigate();
    const [searchTask, setSearchTask] = useState();
    const addListPop = useRef();
    const addListBtn = useRef();
    const addListInp = useRef(null);
    const [popAddList, setPopAddList] = useState(false);
    const [transition, setTransition] = useState(popAddList);
    const [activeNav, setActiveNav] = useState(true);
    const [lists, setLists] = useState(
        localStorage.getItem('lists') ? JSON.parse(localStorage.getItem('lists')) :
            []
    );

    const [tasks, setTasks] = useState(
        localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) :
            [
                { tasks: [] },
                { tasks: [] },
                { tasks: [] },
            ]
    );


    useEffect(() => {
        if (!localStorage.getItem('tasks')) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
            console.log('false');
        }

        if (!localStorage.getItem('lists')) {
            localStorage.setItem('lists', JSON.stringify(lists));
        }
    }, [tasks, lists]);










    // add list name
    const [listName, setListName] = useState(null);

    function handleDelateList(e) {
        let listIndex;
        for (let i = 0; i < lists.length; i++) {
            if (lists[i].index === +e.target.closest('.icon').dataset.index) {
                listIndex = i;
                break;
            }
        }
        let copy = [...lists];
        let copy2 = [...tasks];
        copy[listIndex].deleted = true;
        for (let i = 0; i < copy2[listIndex + 3].tasks.length; i++) {
            copy2[listIndex + 3].tasks[i].deleted = true;
        }
        setLists(copy);
        setTasks(copy2);
        localStorage.setItem('lists', JSON.stringify(copy));
        localStorage.setItem('tasks', JSON.stringify(copy2));
    }

    const showLists = lists.map((e, index) => {
        if (!e.deleted) {

            return (
                <NavLink className={({ isActive }) => isActive ? 'active-nav-list' : null} to={`${index + 3}`} key={index + 3}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', columnGap: '8px' }}>
                        <div className='list' style={{ justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', columnGap: '7px' }}>
                                <div className='list-icon'><PiHashLight /></div>
                                <div className=''>{e.listName}</div>
                            </div>
                        </div>
                        <div className='icon' data-index={e.index} style={{ marginRight: '5px' }} onClick={(e) => { handleDelateList(e); setTimeout(() => nav('2', { replace: true }), 10); }}>
                            <FaRegTrashCan color='brown' width={'100%'} fontSize={'21px'} />
                        </div>
                    </div>
                </NavLink>
            );
        } else {
            return null;
        }
    });

    useEffect(() => {
        function handleClick(e) {
            if (popAddList && !addListBtn.current.contains(e.target) && !addListPop.current.contains(e.target)) {
                setPopAddList(false);
                setTransition(false);
            }
        }
        window.addEventListener('click', handleClick);

        return () => window.removeEventListener('click', handleClick);
    }, [popAddList]);
    function handleAddList() {

        setLists([...lists, { listName: listName, deleted: false, index: (3 + lists.length) }]);
        setTasks([...tasks, { tasks: [] }]);
        setPopAddList(false);
        setListName('');
        nav(`${lists.length + 3}`);

        localStorage.setItem('lists', JSON.stringify([...lists, { listName: listName, deleted: false, index: (3 + lists.length) }]));
        localStorage.setItem('tasks', JSON.stringify([...tasks, { tasks: [] }]));

    }
    return (
        <div className='todo-container'>
            {popAddList && (
                <div className='pop-overlay'>
                    <div ref={addListPop} className={transition ? 'add-list scaleT' : 'add-list'}>
                        <h3>Add list</h3>
                        <div className='addList-field'>
                            <label>Name</label><br />
                            <input ref={addListInp} onKeyDown={(e) => e.key === 'Enter' ? handleAddList() : null} type='text' onChange={(e) => setListName(e.target.value)} />
                        </div>
                        <div className='addList-buttons'>
                            <button onClick={handleAddList}>Save</button>
                            <button type='button' onClick={() => setPopAddList(false)}>Cancel</button>
                            <h6 style={{ color: 'brown' }}>*Press enter</h6>

                        </div>
                    </div>
                </div>
            )}

            <div onClick={() => setActiveNav(p => !p)} style={{ padding: '20px 0 0 20px', position: 'absolute', zIndex: '2' }}>
                <GoSidebarCollapse style={{ fontSize: '32px', cursor: 'pointer' }} />
            </div>

            <nav className={activeNav ? 'todo-nav-active todo-nav' : 'todo-nav-notActive todo-nav'}>
                <div className='nav-header'>
                    <div className='logo '>
                        <Link to={'/'}>
                            <h1 style={{ margin: '0' }}>Todo</h1>
                        </Link>
                    </div>
                    <div onClick={() => setActiveNav(p => !p)}>
                        <GoSidebarCollapse style={{ fontSize: '32px', cursor: 'pointer' }} />
                    </div>

                </div>
                <div className='static-lists'>
                    {
                        !is_min_width_991 &&
                        <h6 style={{ color: 'brown', margin: '0 0 7px 0' }}>*Press Enter after entering the task</h6>
                    }
                    <Link to={'search'}><input className='search-tasks' placeholder='# Search' onKeyDown={(e) => e.key === 'Enter' ? setActiveNav(false) : null} onChange={(e) => setSearchTask(e.target.value)} /></Link>

                    <NavLink className={({ isActive }) => isActive ? 'active-nav-list ' : ''} to={'0'}>
                        <div className='list' >
                            <div className='list-icon'><IoTodayOutline /></div>
                            <div className=''>Today</div>
                        </div>
                    </NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'active-nav-list ' : ''} to={'1'}>
                        <div className='list'>
                            <div className='list-icon'><PiClover /></div>
                            <div className=''>Favorite</div>
                        </div>
                    </NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'active-nav-list ' : ''} to={'2'}>
                        <div className='list'>
                            <div className='list-icon'><BsBoxSeam /></div>
                            <div className=''>All Tasks</div>
                        </div>
                    </NavLink>
                </div>
                <div className='user-lists'>
                    <div onClick={() => {
                        setPopAddList(true); setTimeout(() => { setTransition(true); addListInp.current.focus(); }, 10);

                    }} ref={addListBtn} className='list' style={{ color: 'rgb(222 76 74)', marginBottom: '9px', columnGap: '6px' }}><IoMdAddCircleOutline style={{ fontSize: '26px' }} /> Add List</div>
                    {showLists}
                </div>
            </nav>
            <div className='task-section-container'>
                <div className='tasks-section '>
                    <Outlet context={{ setLists: setLists, tasks: tasks, setTasks: setTasks, searchTask: searchTask, setActiveNav: setActiveNav }} />
                </div>
            </div>
        </div>
    );
}

export default Todo;








