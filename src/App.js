import "./App.css"; 
import allContacts from './contacts.json'
import { useState } from 'react'

function App({name, pictureUrl, popularity}) {
  const firstFive = allContacts.slice(0, 5)
  const [celebs, setCelebs] = useState(firstFive)

  function addRandomCeleb() {
    const randomNumber = Math.floor((Math.random() * (allContacts.length - 5)) + 5)
    setCelebs([...celebs, allContacts[randomNumber]])
  }

  function sortByPopularity() {
    let celebsSortedByPopularity = [...celebs]
    celebsSortedByPopularity.sort((a,b) => b.popularity - a.popularity)
    setCelebs(celebsSortedByPopularity)
  }

  function sortByName() {
    let celebsSortedByName = [...celebs]
    celebsSortedByName.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
      return 0;
      }
    })
    setCelebs(celebsSortedByName)
  }

  function removeContact(id) {
    const filteredCelebs = celebs.filter( celeb => {
      return celeb.id !== id;
    });
    setCelebs(filteredCelebs);
  }

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={addRandomCeleb}>Add random contact</button>
      <button onClick={sortByPopularity}>Sort by popularity</button>
      <button onClick={sortByName}>Sort by name</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { celebs.map( celeb => {
            return (
              <tr key={celeb.id}>
                <td><img className='celeb-image' src={celeb.pictureUrl} alt="face image"/></td>
                <td>{celeb.name}</td>
                <td>{celeb.popularity}</td>
                <td>{celeb.wonOscar ? <p>🏆</p> : null}</td>
                <td>{celeb.wonEmmy ? <p>⭐</p> : null}</td>
                <td><button onClick={() => removeContact(celeb.id)}>Delete</button></td>
              </tr>
            )
          }) }
        </tbody>

      </table>

    </div>
  )
}
export default App;
