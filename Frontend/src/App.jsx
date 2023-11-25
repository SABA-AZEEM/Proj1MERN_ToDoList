import React, { useEffect, useState } from 'react';
import axios from 'axios';


export const App = () => {

    const [items,setItems]=useState([]);
    const [name,setName]=useState('');
    const [editMode,setEditMode]=useState({id:null,active:false});
    const [editName,setEditName]=useState('')
    //handle show items from db code
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

        axios.get('http://localhost:3000/todolist/')
      .then((res)=>{
        setItems(res.data.data);
      })
      .catch((error)=>{
        console.log(error.message);
      })

      })
      .catch((error)=>{
        console.log(error.message);
      })
    }
  //handle update item code
  const handleUpdateItem=(id)=>{
    setEditMode({id,active:true});
    //Fetch the item details by its id
    const selectedItem=items.find((item)=>item._id===id);
    setEditName(selectedItem.name);
  }
  //hadle function to edit the item
  const handleEditSave=async (id)=>{
    const data={
      name:editName,
    }
    axios.put(`http://localhost:3000/todolist/${id}`,data)
    .then(()=>{
      setEditMode({id,active:false});
      setEditName('');
      axios.get('http://localhost:3000/todolist/')
      .then((res)=>{
        setItems(res.data.data);
      })
      .catch((error)=>{
        console.log(error.message);
      })
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  //handle cancel the edit item
  const handleCancelEdit=(id)=>{
    setEditMode({id,active:false});
    setEditName('');
  }

    return (
      <div>
        {items.map((item)=>(
          <div key={item._id}>
            {editMode.active && editMode.id===item._id?
              (
                <div>
                  <input type='text' value={editName} onChange={(e)=>setEditName(e.target.value)} />
                  <button onClick={()=>handleEditSave(item._id)}>Save</button>
                  <button onClick={()=>handleCancelEdit(item._id)}>Cancel</button>
                </div>
              )
              :
              (
                <div>
                  <h1>{item.name}</h1>
                  <button onClick={()=>
                    handleDeleteItem(item._id)
                  }>Delete</button>
                  <button onClick={()=>
                    handleUpdateItem(item._id)
                  }>Update</button>
                </div>
              )
            }
          </div>
        ))}
        <div>
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
          <button onClick={handleSaveItem}>Add</button>
        </div>
      </div>
    )
}
