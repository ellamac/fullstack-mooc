import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import personService from './services/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorColor, setErrorColor] = useState('green');

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
      setFiltered(initialPersons);
    });
  }, []);

  const handleAddName = event => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const handleAddNumber = event => {
    event.preventDefault();
    setNewNumber(event.target.value);
  };

  const handleAdd = event => {
    event.preventDefault();
    if (newName.trim().length === 0) {
      alert('Write a name!');
    } else if (persons.some(person => person.name === newName)) {
      updateNumber(persons.find(person => person.name === newName));
    } else if (newNumber.trim().length === 0) {
      alert('Write a number!');
    } else if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} is already a number in the phonebook.`);
    } else {
      addPerson();
    }
  };

  const addPerson = () => {
    const personsObject = {
      name: newName,
      number: newNumber
    };

    personService.create(personsObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
      setFiltered(persons.concat(returnedPerson));
      setErrorMessage(`${returnedPerson.name} was added to the phonebook.`);
      setErrorColor('green');
      setTimeout(() => {
        setErrorMessage(null);
      }, 2500);
    });
  };

  const updateNumber = person => {
    if (
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      const person = persons.filter(person => person.name === newName)[0];
      console.log(person);
      const personsObject = {
        name: newName,
        number: newNumber
      };
      personService
        .update(person.id, personsObject)
        .then(updated => {
          setPersons(persons.map(p => (p.id !== person.id ? p : updated)));
          setNewName('');
          setNewNumber('');
          setFiltered(persons.map(p => (p.id !== person.id ? p : updated)));
        })
        .catch(error => {
          setErrorMessage(
            `${person.name} has already been removed from the phonebook.`
          );
          setErrorColor('red');
          setPersons(persons.filter(p => p.id !== person.id));
          setFiltered(persons.filter(p => p.id !== person.id));
        });
      setErrorMessage(`${person.name}'s number was changed.`, 'green');
      setTimeout(() => {
        setErrorMessage(null);
      }, 2500);
    }
  };

  const deletePerson = personDel => {
    if (
      window.confirm(
        `Do you really want to delete ${personDel.name} from the phonebook?`
      )
    ) {
      personService
        .remove(personDel.id)
        .then(allPersons => {
          setPersons(persons.filter(p => p.id !== personDel.id));
          setFiltered(persons.filter(p => p.id !== personDel.id));
        })
        .catch(error => {
          setErrorMessage(
            `${personDel.name} has already been removed from the phonebook.`
          );
          setErrorColor('red');
          setPersons(persons.filter(p => p.id !== personDel.id));
          setFiltered(persons.filter(p => p.id !== personDel.id));
        });
      setErrorMessage(`${personDel.name}'s was deleted from the phonebook.`);
      setErrorColor('green');
      setTimeout(() => {
        setErrorMessage(null);
      }, 2500);
    }
  };

  const filterPersons = event => {
    event.preventDefault();
    setFiltered(
      persons.filter(person =>
        person.name.toUpperCase().includes(event.target.value.toUpperCase())
      )
    );
  };

  const numbers = () =>
    filtered.map(person => (
      <Person
        key={person.id}
        person={person}
        deletePerson={() => deletePerson(person)}
      />
    ));

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage} color={errorColor} />

      <Filter onChange={filterPersons} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={handleAdd}
        newName={newName}
        newNumber={newNumber}
        handleAddName={handleAddName}
        handleAddNumber={handleAddNumber}
      />
      <h2>Numbers</h2>
      {numbers()}
    </div>
  );
};

export default App;
