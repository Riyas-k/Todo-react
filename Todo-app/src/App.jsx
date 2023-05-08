import React, { useEffect } from "react"
import { useState } from "react";
import "./App.css";

function App() {
  const [ToDos, setToDos] = useState(()=>{
    const storedToDos = localStorage.getItem("ToDos")
    return storedToDos?JSON.parse(storedToDos):[]
  });
  const [ToDo, setToDo] = useState("");
  const options = { weekday: 'long' };
const currentDayName = new Intl.DateTimeFormat('en-US', options).format(new Date());


useEffect(()=>{
  localStorage.setItem('ToDos',JSON.stringify(ToDos))
},[ToDos])

  return (
    <>
      <div className="app">
        <div className="mainHeading">
          <h1>ToDo List</h1>
        </div>
        <div className="subHeading">
          <br />
          <h2 style={{marginLeft:'50px'}}>Wow, its {currentDayName} 🌝 ☕ </h2>
        </div>
        <div className="input">
          <input
            value={ToDo}
            onChange={(e) => {
              setToDo(e.target.value);
            }}
            type="text"
            placeholder="🖊️ Add item..."
          />
          <i
            onClick={()=> {if(ToDo.length>0) setToDos([...ToDos,{id:Date.now(), text:ToDo,status:false}]); setToDo('')}}
            className="fa-solid fa-circle-plus"
          ></i>
        </div>
        <div className="todos">
          {ToDos.map((data) => {
            return (
              <div className="todo" key={data.id}>
                <div className="left">
                  <input onChange={(e)=>(
                    setToDos(ToDos.filter((newData)=>{
                       if(newData.id===data.id){
                          newData.status = e.target.checked
                       }
                      
                       return newData
                    }))
                  )} value={data.status} type="checkbox" name="" id="" />
                  <p>{data.text}</p>
                </div>
                <div className="right">
                  <i onClick={()=>setToDos(ToDos.filter((newData)=>{ return(
                    newData.id!==data.id                    
                  )}
                  ))} className="fa-solid fa-trash-can"></i>
                </div>
              </div>
            );
          })}

                  <br />
                  <h1>Completed Task</h1>
          {
            ToDos.map((data,index)=>{
              if(data.status){
                return(
                  <React.Fragment key={index} >
                  <br />
                  <li style={{color:"white"}}><del>{data.text}</del> 
                  </li>
                  </React.Fragment>
                )
              }
            })
          }
        </div>
      </div>
    </>
  );
}

export default App;
