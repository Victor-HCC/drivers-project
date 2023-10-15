import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getTeams } from '../../redux/actions';
import MultipleSelect from '../../components/MultipleSelect/MultipleSelect';

const Form = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const teams = useSelector(state => state.teams);

  const [form, setForm] = useState({
    forename: '',
    surname: '',
    nationality: '',
    description: '',
    image: '',
    team: '',
    dob: ''
  });

  const changeHandler = (e) => {
    const property = e.target.name;
    let value = e.target.value;
    
    if (e.target.multiple) {
      value = Array.from(e.target.selectedOptions, (option) => option.value);
    }

    validate({ ...form, [property]: value })
    setForm({ ...form, [property]: value });
  }

  const [errors, setErrors] = useState({
    forename: '',
    surname: '',
    nationality: '',
    description: '',
    image: '',
    team: '',
    dob: ''
  })

  const validate = (form) => {
    const regex = /^[A-Z][a-zA-Z]{1,}$/;
    if(regex.test(form.forename) || form.forename === '') {
      setErrors({...errors, forename: ''});
    } else {
      setErrors({...errors, forename: 'El nombre debe empezar con mayúscula'});
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/drivers', form)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  const [selectedTeams, setSelectedTeams] = useState([]);

  const handleTeamsChange = (selectedTeams) => {
    setSelectedTeams(selectedTeams);
  }

  // Function to update the form state with selectedTeams
  const updateFormWithSelectedTeams = (selectedTeams) => {
    setForm({
      ...form,
      team: selectedTeams,
    });
  };

  // Call this function whenever selectedTeams change
  useEffect(() => {
    updateFormWithSelectedTeams(selectedTeams);
  }, [selectedTeams]);

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>Nombre: </label>
        <input type="text" value={form.forename} onChange={changeHandler} name="forename" />
        {errors.forename && <span>{errors.forename}</span>}
      </div>
      
      <div>
        <label>Apellido: </label>
        <input type="text" value={form.surname} onChange={changeHandler} name="surname" />
      </div>
      
      <div>
        <label>Nacionalidad: </label>
        <input type="text" value={form.nationality} onChange={changeHandler} name="nationality" />
      </div>
      
      <div>
        <label>Descripción: </label>
        <br />
        <textarea name="description" onChange={changeHandler} value={form.description} cols="30" rows="5"></textarea>
        {/* <input type="text" value={form.description} onChange={changeHandler} name="description" /> */}
      </div>
      
      <div>
        <label>Imagen: </label>
        <input type="text" value={form.image} onChange={changeHandler} name="image" />
      </div>
      
      <div>
        <label>Fecha de Nacimiento: </label>
        <input type="text" value={form.dob} onChange={changeHandler} name="dob" />
      </div>
      
      <div>
        <label>Escuderias: </label>
        {/* <input type="text" value={form.team} onChange={changeHandler} name="team" /> */}
        <select name="team" multiple value={form.team || []} onChange={changeHandler} size={10}>
          {teams.map((team) => {
            return <option key={team} value={team}>{team}</option>
          })}
        </select>
      </div>

      <div>
        <label>Team: </label>
        <MultipleSelect
          options={teams}
          selectedOptions={selectedTeams}
          onChange={handleTeamsChange}
        />
      </div>

      <button type='submit'>Enviar</button>
    </form>
  )
}

export default Form
