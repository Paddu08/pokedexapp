import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [dexData,setDexData]=useState([])
  const getData=async ()=>{
    const data=await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    const json=await data.json()
    setDexData(json.results)

  }

  const [currPokemon,setCurrPokemon]=useState(null)


  const [currPokemonData,setCurrPokemonData]=useState([])
  const [cache,setCache]=useState({})
  useEffect(()=>{
    getData() // data for 151 pokemon
  },[])
const getCurrPokemon= async ()=>{
  if(!currPokemon)return 
   const key = currPokemon?.name;
  if(cache[key]){
    setCurrPokemonData(cache[key])
    console.log("from cahce",cache)
    return
    
  }

  const data=await fetch(currPokemon.url)
  const json=await data.json()
  setCurrPokemonData(json)
  setCache((prev)=>({...prev,[key]:json}))

}
 useEffect(()=>{
   getCurrPokemon()// data for selected pokemon
  },[currPokemon])
  return (
    <div className='Container'>
      <div className='PokemonName'>
      {dexData?.map((pokemon,idx)=>(
        <div className='dexText' key={idx} onClick={()=>setCurrPokemon(dexData[idx])}>{pokemon.name}</div>


      ))}
</div>
<div className='PokedexEntry'>
{currPokemonData?.length==0 ? (<div className=''>Select a pokemon </div>):(
  <div>
   <h1>{currPokemonData?.name}</h1>
   <div className='img-container'>  
      <img src={currPokemonData?.sprites?.front_default} title='normal'/>
      

   <img src={currPokemonData?.sprites?.front_shiny}/>
   </div>
  
   </div>
)
}

   </div>

    </div>
  )
}

export default App
