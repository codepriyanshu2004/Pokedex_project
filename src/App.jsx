
import { Link } from 'react-router-dom'
import './App.css'
import Pokedex from './components/Pokedex/Pokedex'
import PokemonList from './components/PokemonList/PokemonList'
import CustomRoutes from './routes/CustomRoutes'


function App() {
  

  return (
    <div className='outer-pokedex'>
      
    <h1 id="pokedex-heading">
     <Link to="/">Pokedex</Link> 
     <Link to="/">Back</Link> 

      </h1>
   
 <CustomRoutes/>
   

    </div>

   
  )
}

export default App
