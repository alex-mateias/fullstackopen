import axios from 'axios'
import { useEffect, useState } from 'react'

const Filter = ({ newFilter, handleFilterChange, changeFilter }) => {
  return(
    <div>
        <form onSubmit={changeFilter}>
          <div>
            filter shown with <input
                                value={newFilter}
                                onChange={handleFilterChange}
                              />
          </div>
        </form>
      </div>
  )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return(
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
                  value={newName} 
                  onChange={handleNameChange}
                />
        </div>
        <div>
          number: <input
                    value={newNumber}
                    onChange={handleNumberChange}
                  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({ filteredPersons }) => {
  return(
    <div>
        {filteredPersons.map((person) => <p key={person.id}>{person.name} {person.number}</p>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length
    }

    if (persons.filter(p => p.name === personObject.name).length > 0){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    setNewName('')
    setNewNumber('')
  }

  const changeFilter = (event) => {
    event.preventDefault()
    const filtered = persons.filter(person => {
      return person.name.toLowerCase().includes(newFilter.toLowerCase(), 0)
    })
    setFilteredPersons(filtered)
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} changeFilter={changeFilter}/>
      <h2>Add</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons}/>
    </div>
  )
}

export default App