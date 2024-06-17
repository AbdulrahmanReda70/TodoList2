import React, { useEffect, useRef, useState } from 'react';
import { useOutletContext, useParams } from 'react-router';
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { MdOutlineFavorite } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { IoRocket } from "react-icons/io5";
import { useMediaQuery } from '../../../hooks/useMediaQuery';


function List() {
    const is_min_width_767 = useMediaQuery(`(min-width:767px)`);
    const [invalidMessage, setInvalidMessage] = useState(null);
    const [addTask, setAddTask] = useState('');
    const listId = useParams().listId;
    const allTasks = useOutletContext().tasks;
    const searchTask = useOutletContext().searchTask;
    const setTasks = useOutletContext().setTasks;
    const setActiveNav = useOutletContext().setActiveNav;
    //
    const [popEditTask, setPopEditTask] = useState(false);
    const [addNewName, setAddNewName] = useState(false);
    const editTaskPop = useRef(null);
    const editTaskInput = useRef(null);
    const editTaskIcon = useRef(null);
    const [currentOpenedTaskEvent, setCurrentOpenedTaskEvent] = useState(null);

    useEffect(() => {
        if (listId !== 'search' && !is_min_width_767) {
            setActiveNav(false);
        }
    }, [is_min_width_767, listId, setActiveNav]);

    function handleEditTask() {
        const [listIndex, taskIndex] = getListAndTaskIndexEdit(currentOpenedTaskEvent);
        let copy = [...allTasks];
        if (addNewName === '' || addNewName === null) {
            alert('😅Oops! It looks like you forgot to enter a task name.');
        } else {
            copy[listIndex].tasks[taskIndex].taskName = addNewName;
            setTasks(copy);
            setAddNewName('');
            setCurrentOpenedTaskEvent(null);
            setPopEditTask(false);
            localStorage.setItem('tasks', JSON.stringify(copy));
        }
    }

    function handleDeleteTask(e) {
        const [listIndex, taskIndex] = getListAndTaskIndexDelete(e);
        let copy = [...allTasks];
        copy[listIndex].tasks[taskIndex].deleted = true;
        setTasks(copy);
        localStorage.setItem('tasks', JSON.stringify(copy));

    }


    function getListAndTaskIndexDelete(event) {
        let listIndex;
        let taskIndex;
        for (let i = 0; i < allTasks.length; i++) {
            for (let j = 0; j < allTasks[i].tasks.length; j++) {
                if (allTasks[i].tasks[j].taskIndex === +event.target.closest('.task').dataset.index) {
                    listIndex = i;
                    taskIndex = j;
                    break;
                }

            }
        }
        return [listIndex, taskIndex];
    }


    function getListAndTaskIndexEdit() {
        let listIndex;
        let taskIndex;
        for (let i = 0; i < allTasks.length; i++) {
            for (let j = 0; j < allTasks[i].tasks.length; j++) {
                if (allTasks[i].tasks[j].taskIndex === +currentOpenedTaskEvent.target.closest('.task').dataset.index) {
                    listIndex = i;
                    taskIndex = j;
                    break;
                }

            }
        }
        return [listIndex, taskIndex];
    }


    function getListAndTaskIndexFav(event) {
        let listIndex;
        let taskIndex;
        for (let i = 0; i < allTasks.length; i++) {
            for (let j = 0; j < allTasks[i].tasks.length; j++) {
                if (allTasks[i].tasks[j].taskIndex === +event.target.closest('.task').dataset.index) {
                    listIndex = i;
                    taskIndex = j;
                    break;
                }
            }
        }
        return [listIndex, taskIndex];
    }

    function handleFavIcn(e) {
        const [listIndex, taskIndex] = getListAndTaskIndexFav(e);
        let copy = [...allTasks];
        if (copy[listIndex].tasks[taskIndex].fav) {
            copy[listIndex].tasks[taskIndex].fav = false;
        } else {
            copy[listIndex].tasks[taskIndex].fav = true;
        }
        setTasks(copy);
        localStorage.setItem('tasks', JSON.stringify(copy));


    }

    const showTasks = () => {
        if (listId === '1') { // favorite
            return allTasks.map((list) => {
                return list.tasks.map((taskObj, index) => {
                    if (taskObj.fav) {
                        if (!taskObj.deleted) {
                            return (
                                <div className='task' data-index={taskObj.taskIndex} key={index} >
                                    <h4>{taskObj.taskName}</h4>
                                    <div style={{ fontSize: '21px', columnGap: '26px', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                                        {taskObj.fav ? <MdOutlineFavorite style={{ fontSize: '23px', cursor: 'pointer' }} onClick={handleFavIcn} /> : <MdOutlineFavoriteBorder style={{ fontSize: '23px', cursor: 'pointer' }} onClick={handleFavIcn} />}
                                        <div ref={editTaskIcon} style={{ display: 'flex' }} onClick={(e) => { setPopEditTask(true); setCurrentOpenedTaskEvent(e); setTimeout(() => { editTaskInput.current.focus(); }, 10); }}>
                                            <CiEdit cursor={'pointer'} />
                                        </div>
                                        <div style={{ display: 'flex' }} onClick={handleDeleteTask}>
                                            <FaRegTrashCan color='brown' cursor={'pointer'} />
                                        </div>
                                    </div>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                });
            }
            );

        } else if (listId === '2') { // all
            return allTasks.map((list) => {
                return list.tasks.map((taskObj, index) => {
                    if (!taskObj.deleted) {
                        return (
                            <div className='task' data-index={taskObj.taskIndex} key={index} >
                                <h4>{taskObj.taskName}</h4>
                                <div style={{ fontSize: '21px', columnGap: '26px', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                                    {taskObj.fav ? <MdOutlineFavorite style={{ fontSize: '23px', cursor: 'pointer' }} onClick={handleFavIcn} /> : <MdOutlineFavoriteBorder style={{ fontSize: '23px', cursor: 'pointer' }} onClick={handleFavIcn} />}
                                    <div ref={editTaskIcon} style={{ display: 'flex' }} onClick={(e) => { setPopEditTask(true); setCurrentOpenedTaskEvent(e); setTimeout(() => { editTaskInput.current.focus(); }, 10); }}>
                                        <CiEdit cursor={'pointer'} />
                                    </div>
                                    <div style={{ display: 'flex' }} onClick={handleDeleteTask}>
                                        <FaRegTrashCan color='brown' cursor={'pointer'} />
                                    </div>
                                </div>
                            </div>
                        );
                    } else {
                        return null;
                    }
                });
            });



        } else if (listId === 'search') { // search
            return allTasks.map((list) => {
                return list.tasks.map((taskObj, index) => {
                    if (taskObj.taskName.includes(searchTask) && searchTask !== '') {
                        return (
                            <div className='task' data-index={taskObj.taskIndex} key={index} >
                                <h4>{taskObj.taskName}</h4>
                                <div style={{ fontSize: '21px', columnGap: '26px', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                                    {taskObj.fav ? <MdOutlineFavorite style={{ fontSize: '23px', cursor: 'pointer' }} onClick={handleFavIcn} /> : <MdOutlineFavoriteBorder style={{ fontSize: '23px', cursor: 'pointer' }} onClick={handleFavIcn} />}
                                    <div ref={editTaskIcon} style={{ display: 'flex' }} onClick={(e) => { setPopEditTask(true); setCurrentOpenedTaskEvent(e); setTimeout(() => { editTaskInput.current.focus(); }, 10); }}>
                                        <CiEdit cursor={'pointer'} />
                                    </div>
                                    <div style={{ display: 'flex' }} onClick={handleDeleteTask}>
                                        <FaRegTrashCan color='brown' cursor={'pointer'} />
                                    </div>
                                </div>
                            </div>
                        );
                    } else {
                        return null;
                    }
                });
            });
        }

        else { // normal 
            return allTasks[listId].tasks.map((taskObj, index) => {
                if (!taskObj.deleted) {
                    return (
                        <div className='task' data-index={taskObj.taskIndex} key={index} >
                            <h4>{taskObj.taskName}</h4>
                            <div style={{ fontSize: '21px', columnGap: '26px', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                                {taskObj.fav ? <MdOutlineFavorite style={{ fontSize: '23px', cursor: 'pointer' }} onClick={handleFavIcn} /> : <MdOutlineFavoriteBorder style={{ fontSize: '23px', cursor: 'pointer' }} onClick={handleFavIcn} />}
                                <div ref={editTaskIcon} style={{ display: 'flex' }} onClick={(e) => { setPopEditTask(true); setCurrentOpenedTaskEvent(e); setTimeout(() => { editTaskInput.current.focus(); }, 10); }}>
                                    <CiEdit cursor={'pointer'} />
                                </div>
                                <div style={{ display: 'flex' }} onClick={handleDeleteTask}>
                                    <FaRegTrashCan color='brown' cursor={'pointer'} />
                                </div>
                            </div>
                        </div>
                    );
                } else {
                    return null;
                }
            });
        }
    };

    function handleAddTask(e) {
        if (addTask === '' || addTask === null) {
            setInvalidMessage('one char at least');
        } else {
            let newTaskIndex = 0;
            for (let i = 0; i < allTasks.length; i++) {
                newTaskIndex = newTaskIndex + allTasks[i].tasks.length;
            }
            setInvalidMessage(null);
            let copyA = [...allTasks];
            if (listId === '1') {
                copyA[listId].tasks.push({ taskName: addTask, fav: true, taskIndex: newTaskIndex, deleted: false });
            } else {
                copyA[listId].tasks.push({ taskName: addTask, fav: false, taskIndex: newTaskIndex, deleted: false });
            }
            setTasks(copyA);
            localStorage.setItem('tasks', JSON.stringify(copyA));

            setAddTask('');
        }
    }
    return (
        <>
            {invalidMessage && <h5 className='invalidMessage'>{invalidMessage}</h5>}
            {showTasks().length > 0 ? <div>{showTasks()}</div> : <div className='startAddingTasks'><IoRocket fontSize={'29px'} /> <h1>Start adding tasks...</h1></div>}
            {
                listId !== 'search' &&
                <div className='addTask '>
                    <input value={addTask} onKeyDown={(e) => e.key === 'Enter' ? handleAddTask() : null} placeholder='Add Task' onChange={(e) => setAddTask(e.target.value)} />
                    <div className='addTask-text' style={{ display: 'flex', alignItems: 'center', columnGap: '10px', position: 'absolute' }} >
                        <IoMdAddCircle fontSize={'29px'} cursor={'pointer'} onClick={handleAddTask} />
                    </div>
                </div>
            }
            {popEditTask && (
                <>
                    <div className='overLay'></div>
                    <div ref={editTaskPop} style={{
                        backgroundColor: '#262626', padding: '8px 15px', borderRadius: '12px',
                        minWidth: '320px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '1000'
                    }}>
                        <h3>Edit TaskName</h3>
                        <div className='addList-field'>
                            <label>Name</label><br />
                            <input ref={editTaskInput} onKeyDown={(e) => e.key === 'Enter' ? handleEditTask() : null} type='text' onChange={(e) => { setAddNewName(e.target.value); }} />
                        </div>
                        <div className='addList-buttons'>
                            <button onClick={handleEditTask}>Save</button>
                            <button type='button' onClick={() => setPopEditTask(false)}>Cancel</button>
                            <h6 style={{ color: 'brown' }}>*Press enter</h6>

                        </div>
                    </div>
                </>
            )
            }
            {
                listId === '' && <h1>Start Adding lists and Tasks</h1>
            }
        </>
    );
}

export default List;

