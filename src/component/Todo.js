import React, { useEffect, useState } from 'react'
import '../component/Todo.css'
import { FaCheck } from 'react-icons/fa6'
import { MdDeleteForever } from 'react-icons/md'

const Todo = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [allTodo, setAllTodo] = useState([]);
  const [allComplete, setComplete] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');



  const handleTitleChange = (e) => {
    setTitle(e.target.value)

   
  }
  

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value) 
  }
  const handleAddClick = () =>{

    let todolist = {
      'title' : title,
      'description' : description
    }
    let updated = [...allTodo]

    updated.push(todolist)
    setAllTodo(updated)
    setDescription('')
    setTitle('')
    localStorage.setItem('todolist', JSON.stringify(updated))
  }
const handleDeleteClick = (index) => {
  let removed = [...allTodo]
  removed.splice(index, 1);
  console.log(index)
  localStorage.setItem('todolist', JSON.stringify(removed))
  setAllTodo(removed)
}
const handleCompleteClick = (index) => {
    let now = new Date()
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let ss = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + 'at' + h + ':' + m + ':' + ss;
    let filtered = {
      ...allTodo[index],
      "completedOn": completedOn
    }
    let update = [...allComplete]
    update.push(filtered);
    setComplete(update)
    localStorage.setItem('completed', JSON.stringify(update))
    handleDeleteClick(index)
}
const handleDeleteClick2 = (index) => {
  let removed = [...allComplete]
  removed.splice(index, 1);
  localStorage.setItem('completed', JSON.stringify(removed))
  setComplete(removed)
}

  useEffect(()=>{
    let importedtodo = JSON.parse(localStorage.getItem('todolist'));
    if(importedtodo){
      setAllTodo(importedtodo)
    } 
    // if(title){
    //   setCheck(true)
    // }
    let completedtodo = JSON.parse(localStorage.getItem('completed'));
    if(completedtodo){
      setComplete(completedtodo)
    } 
  }, []) 
  

  return (
    <>
      <div className='todo'>
        <div className="inner">
          <div className="input">
            <div className="aler title">
              <div>Title:</div>
              <input type="text" name="title" id="title_input" value={title} placeholder='Input your todo title' onChange={(e) => {handleTitleChange(e)}}/>
            </div>
            <div className="aler description">
              <div>Description:</div>
              <input type="text" name="description" id="description_input" value={description} placeholder='Todo description ?' onChange={(e) => {handleDescriptionChange(e)}}/>
            </div>
          
                <div className="submit">
                    <button className={ title !== "" && description !== "" ? 'addBtn' : 'added' } onClick={()=>{handleAddClick()}}>Add</button>
                </div>
          
               
          </div>
          <div className="nav">
            
          </div>
        </div>
        
        <div className="itter">
        <button className={ isComplete ? 'primaryBtn' : 'but' } onClick={()=>{setIsComplete(false)}}>Todos</button>
        { allTodo.map((item, index) => {
          return(
          <article className='todoitem' key={index}>
            <div className="top">
              <h2>{item.title}</h2>
              <h5>{item.description}</h5>
            </div>
            <div className="last">
              <FaCheck className='check icon' onClick={()=>handleCompleteClick(index)}/>
              <MdDeleteForever className='delete icon' onClick={()=>handleDeleteClick(index)}/>
            </div>
          </article>
          )
        })}
        </div>
            <button className={ isComplete ? 'but' : 'primaryBtn' } onClick={()=>{setIsComplete(true)}}>Completed</button>
            {allComplete.map((item, index) => {
          return(
          <article className='todoitem' key={index}>
            <div className="top">
              <h2>{item.title}</h2>
              <h5>{item.description}</h5>
            </div>
            <div className="last">
              <MdDeleteForever className='delete icon' onClick={()=>handleDeleteClick2(index)}/>
            </div>
          </article>
          )
        })}
        
      </div>

    </>
  )
}

export default Todo
