
import React, { useEffect, useState } from 'react'
import axios from "axios";
import "./PokemonList.css"
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {

  // const [x,setX] = useState(0);


    // useEffect(() =>{
    //     console.log("effort call");
        

    // },[x])


 const [pokemonList,setPokemonList] = useState([]);
 const [isLoading,setisLoading] = useState(true);


  const [pokedexUrl,setPokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon")

  const [nextUrl,setNextUrl] = useState("");
  const [prevUrl,setPrevUrl] = useState("");



    async function downlaodPokemon() {
      setisLoading(true)
        const response = await axios.get(pokedexUrl)  //this dowloads list of 20 pokemon
        console.log(response.data)


        const pokemonResults = response.data.results; // we get the array of pokemons from result
        
        setNextUrl(response.data.next)
        setPrevUrl(response.data.previous)


        //iterating over the array of pokemons ,and using thier url,to create an array of promise
        //that will download those 20 pokemons
        const pokemonResultPromise=  pokemonResults.map((pokemon) => axios.get(pokemon.url))
        
        // passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise) //array of 20 pokon detailed data
        console.log(pokemonData);
  

        //now iterate on the data of each pokemon , and extract id,bame,image,types
        const res=  pokemonData.map((pokemonData)=>{
          const pokemon = pokemonData.data;
          return {
            id:pokemon.id,
            name:pokemon.name,
            image:(pokemon.sprites.other)?pokemon.sprites.other.dream_world.front_default:pokemon.sprites.front_shiny,
            type:pokemon.types}
        })
        
        console.log(res);
        setPokemonList(res)
        
        setisLoading(false)

        
    }
    

    useEffect(() =>{
        downlaodPokemon()

    },[pokedexUrl])




  return (
    <div className='pokemon-list-wrapper'>
      {/* X:{x}  <button onClick={() =>setX(x+1)}></button> */}

     <div id='pokemonlist'>PokemonList</div>

     <div className='pokemon-wrapper'>
     {(isLoading)?"Loading...":
      // "Data downloaded"  
      
      pokemonList.map((p)=> <Pokemon name ={p.name} image={p.image} key ={p.id} />)

      }

     </div>
     <div className='btn'>
      <button  disabled  ={prevUrl==null}  onClick={() => setPokedexUrl(prevUrl)}>Prev</button>
      <button disabled  ={nextUrl==null} onClick={()=> setPokedexUrl(nextUrl)}>Next</button>

     </div>

    </div>
  )
}

export default PokemonList