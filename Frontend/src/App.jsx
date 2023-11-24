import React, { useEffect, useState } from 'react';
import axios from 'axios';


export const App = () => {

  //Item list show code
    const [items,setItems]=useState([]);
    const [name,setName]=useState('');
    useEffect(()=>{
      axios.get('http://localhost:3000/todolist/')
      .then((res)=>{
        console.log(res.data.data);
        setItems(res.data.data);
      })
      .catch((error)=>{
        console.log(error.message);
      })
    },[name]);
  //input show code
    const handleSaveItem=()=>{
        const data={
            name,
        };
        
            axios.post('http://localhost:3000/todolist/',data)
        .then(()=>{
            setName('');
        })
        .catch((error)=>{
            console.log(error.message);
        });
    };
  //handle delete item code
    const handleDeleteItem=(id)=>{
      axios.delete(`http://localhost:3000/todolist/${id}`)
      .then(()=>{
        setName('');
      })
      .catch((error)=>{
        console.log(error.message);
      })
    }
    return (
      <div>
        {items.map((item)=>(
          <div>
            <h1>{item.name}</h1>
            <button onClick={()=>{
              const id=item._id;
              handleDeleteItem(id)
            }}>Delete</button>
          </div>
        ))}
        <div>
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
          <button onClick={handleSaveItem}>Add</button>
        </div>
      </div>
    )
}
