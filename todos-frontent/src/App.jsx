import { useEffect, useState } from 'react';
import './App.css'
import AddTodo from './components/AddTodo'
import useFetch from 'react-fetch-hook'
import createTrigger from "react-use-trigger";
import useTrigger from "react-use-trigger/useTrigger";
import postJew from './components/AddTodo';

const todosRefetch = createTrigger();
console.log(import.meta.env.BASE_API_URL)
async function getJews(){
  try{
  const response = await fetch(`http://localhost:3000/abdb`)
  if (!response.ok){
    throw new Error("kurwa")
  }
  const data = response.json()
  return data}
  catch(e){
    throw new Error(e)
  }
}

function useJews(){
  const [jews, setJews] = useState();
  useEffect(()=> {
    getJews().then((data) => {
      setJews(data)
    }).catch(() => {
      throw new Error("adolf hitler, einundzwazig dreiundvierzig")
    })
  },[])
  return {jews}
}

function App() {
  const [form, setForm] = useState({alive: true})
  const requestNewTodosValue = useTrigger(todosRefetch);

  // const { isLoading, data: todos } = useFetch(`${BASE_API_URL}/abdb`, {
  //   depends: [requestNewTodosValue],
  // });

  const {jews} = useJews()
  return (
    <div>
      <h1>Jew List</h1>
      <form className='inputs'>
        <input type='number' placeholder='age in years' onChange={(e)=>{setForm({...form, age: parseInt(e.target.value)})}}/>
        <input type='number' placeholder='days spent' onChange={(e)=>{setForm({...form, time_spent: parseInt(e.target.value)})}}/>
        <div><span>still alive</span><input type='checkbox' defaultChecked={form.alive}  onChange={()=>{setForm({...form, alive: form.alive ? false : true  })}}/></div>
        <input type='text' placeholder='image url' onChange={(e)=>{setForm({...form, image_url: e.target.value})}}/>
        <button type='submit' onClick={(event)=>{postJew(form), event.preventDefault()}}>Submit</button>
      </form>
      <div>
        {(jews || []).map(jew => (
          <div className='jew' key={jew._id}>
          {/* >{jew._id} <AddTodo todoId={jew._id} /> </div>
          <img src={jew.image_url} alt="jew" /> */}
          <div className='jew_data'>
          <span>jew_id: {jew._id}</span>
          <span>age: {jew.age} years old</span>
          <span>jew state: {jew.alive ? "alive" : "dead"}</span>
          </div>
          <div style={{
            backgroundImage: `url('${jew.image_url}')`,
            width: 200,
            height: 200,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat"
            }}>
            
          </div>
          <div class>
            <button className='side_button'>   edit  </button>
            <button className='side_button' onChange={(e)=>{postJew(form)}}>   {jew.alive ? "kill" : "bring back"}  </button>
            <button className='side_button'>stalinify</button>
          </div>
          </div>
        ))}
        
      </div>
      {/* <AddTodo optionalAddTitle="Makaron" onAdd={todosRefetch} /> */}
    </div>
  )
}

export default App
