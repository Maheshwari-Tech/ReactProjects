import SideBar from './components/SideBar'
import Footer from './components/Footer'
import Main from './components/Main'
import { useEffect, useState } from 'react';

// components - function returns JSX, that allows some html and js to render.
function App() {  
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState();

  function handleToggleModal(){
    setShowModal(!showModal);
  }

  // [] -> denoted loads when page load
  useEffect(() => {
      async function fetchAPIData(){
        const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
        const url = 'https://api.nasa.gov/planetary/apod'+ `?api_key=${NASA_KEY}` ;

        const today = (new Date()).toDateString();
        const localKey = `NASA-${today}`;

        if(localStorage.getItem(localKey)){
          const cacheData = JSON.parse(localStorage.getItem(localKey));
          setData(cacheData);
          console.log('Data fetched from Cache:', localKey);
          return;
        }
        
        try{
          localStorage.clear();
          const res = await fetch(url);
          const apiData = await res.json();
          setData(apiData);
          console.log('DATA from API: ', apiData);
          if(!apiData.error)
            localStorage.setItem(localKey, JSON.stringify(apiData));
        }catch(err){
          console.log(err.message);
        }
      }
      fetchAPIData();
  }, []);



  return (
    <>
    {data ? ( <Main data = {data}/>) : (
      <div className='loadingState'>
        <i className='fa-gear fa-solid'></i>
      </div>
    )}

    {showModal && (<SideBar  data = {data} handleToggleModal = {handleToggleModal}> 

    </SideBar>) }
  
    {data && ( <Footer data = {data} handleToggleModal = {handleToggleModal}/> )}
    </>
  )
}

export default App
