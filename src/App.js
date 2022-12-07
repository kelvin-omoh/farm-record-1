import {buttons} from "react-bootstrap/Button"
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { db } from "./Firebase config";
import {onValue, ref, remove, set, update} from "firebase/database"
import { useState,useEffect } from "react";
// import { collection, getDocs,addDoc,deleteDoc ,updateDoc,doc} from "firebase/firestore";
// import { db } from "./Firebase config";
// import { async } from "@firebase/util";
import { uid } from "uid";
function App() {
  const [type,setTypes]=useState('')
  const [output,setOutput]=useState('')
  const [status,setStatus]=useState('')
  const [tempUuid,setTempUuid]=useState('')
  const [isEdit,setIsEdit]=useState(false)
  const [records,setRecords]=useState([])
  
  // const recordCollectionRef = collection(db,"records")
//  useEffect(()=>{
//     const getRecord= async ()=>{
//       // to get the data from fire base 
//       const data = await getDocs(recordCollectionRef)
//       console.log(data)
//       setRecords(data.docs.map((doc)=>(
//         {...doc.data(),id:doc.id}
       
//       ))) 
//     }
//     getRecord()
//  },[])


//  //its add to to the data base
//  const creaeteRecord= async()=>{
//    await addDoc(recordCollectionRef,{Type:type,Output:output,Status:status})
//    console.log(status);
//    window.location.reload()
//  }



//  //its updtaes the database
//  const updateRecord = async(id,Type,Output,status)=>{
//    const recordDoc=doc(db,"records",id)
//   const newRecord = {id:id,Type:Type,Output:Output,status:status}
//   await updateDoc(recordDoc,newRecord)
//   window.location.reload()
//  }


//  //its delete the record from the database
//  const deleteRecord=async(id)=>{
//   const recordDoc=doc(db,"records",id)
//   await deleteDoc(recordDoc)
//   window.location.reload()
//  }





// to read 
useEffect(()=>{
onValue(ref(db),snapshot=>{
  // to reset the array 
  setRecords([])
  const data = snapshot.val()
  if(data!==null){
    Object.values(data).map((records)=>{
      setRecords(oldArray => [...oldArray,records])
    })
  }
})
},[])

// ________write 
// to write use set 
const writeTodb=()=>{
  const uuid = uid()
  set(ref(db,`/${uuid}`),{
    type,
    uuid:uuid,
    output,
    status,
  })


  //reset
  // to clear the input after the data is been sent 
  setTypes("")
 setOutput("")
 setStatus("")
}



//----------------------delete------------------------\\
const handleDelete=(record)=>{
remove(ref(db,`/${record.uuid}`))
}


// --------------------- update -------------------------\\
const handleUpdate=(record)=>{
setIsEdit(true)
setTempUuid(record.uuid)


//adding it back to the form 
setTypes(record.type)
setOutput(record.output)
setStatus(record.status)
}



//handle submit change
const handleSubmitChange=()=>{ 
  update(ref(db,`${tempUuid}`),{
    type,
    uuid:tempUuid,
    output,
    status,
  });


   //reset
  // to clear the input after the data is been sent 
  setTypes("");
  setStatus("");
  setOutput("");
  setIsEdit(false);
}


 
  return (
    <div className="App flex items-center justify-center h-[100vh] w-[100vw] ">
      
    <div className=" bg-slate-100 p-5 rounded-xl flex flex-col gap-[8em]   w-[50%]  ">


    <div className="  ">
      <h1 className=" font-[700] pb-5">Farm Rexxord</h1>

      <form class="row g-3 needs-validation flex justify-center items-center " novalidate>
  
        
        <div class="col-md-4 position-relative">
    <label for="validationTooltip01" class="form-label">Type</label>
    <input type="text" class="form-control" value={type} onChange={(e)=> setTypes(e.target.value)} id="validationTooltip01" placeholder=" e.g chiken" required/>
    <div class="valid-tooltip">
      Looks good!
    </div>
  </div>

  <div class="col-md-4 position-relative">
    <label for="validationTooltip02" class="form-label">Output</label>
    <input type="text" class="form-control"  value={output} id="validationTooltip02" onChange={(e)=> setOutput(e.target.value)}  placeholder="e.g No of eggs"  required/>
    <div class="valid-tooltip">
      Looks good!
    </div>
    </div>

   

  <div class="col-md-4 position-relative">
    <label for="validationTooltip02" class="form-label">Health status</label>
    <input type="text" class="form-control" value={status} id="validationTooltip02" onChange={(e)=> setStatus(e.target.value)}  placeholder=" e.g Good"   required/>
    <div class="valid-tooltip">
      Looks good!
    </div>
    </div>

  

  <div class="col-12">
    {isEdit ?
    <div className=" flex gap-2 items-center justify-center"> 
     <button  class="btn btn-primary" onClick={handleSubmitChange} >Submit Changes</button>
     <button onClick={()=>{
      setIsEdit(false)
      //reset
  // to clear the input 
  setTypes("")
  setStatus("")
  setOutput("")
      }
      }
      
      className=" py-2 px-3 rounded-lg  bg-slate-800 hover:bg-slate-700 font-[900] text-[red]" >X</button>
    </div>

    :
    (
      <button class="btn btn-primary" onClick={writeTodb} >Submit </button>
    )
    }
   
  </div>
</form>
</div>

        <div>

      
       <table class="table   table-hover">
       <thead>
    <tr>
      <th scope="col">#NO</th>
   
          <th scope="col">Type</th>
      <th scope="col">Output</th>
      <th scope="col">Health status</th>
        
   
    
    </tr>
  </thead>
  <tbody>
    {records.map((record)=>{
      return (
        <>
       
             <tr className="my-3" >
      <th  key="thead" scope="row"> {counter}</th>
      
      <td key="td1">{record.type}</td>
      <td key="td2">{record.output}</td>
      <td key="td3">{record.status}</td>
       
       <td key="td5"> <button onClick={()=>handleUpdate(record)} className="   hover:bg-yellow-600 bg-yellow-800 p-2 text-white rounded-lg"> update </button></td>
       <td key="td5"> <button onClick={()=>handleDelete(record)} className=" bg-red-900 hover:bg-red-600 p-2 text-white rounded-lg"> Delete </button></td>
       
    </tr>
        
        </>
      )
    })}
   

  </tbody>
        
        
        </table> 
         
    </div>


    </div>
    </div>
  );
}

export default App;
