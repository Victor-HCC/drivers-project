import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getTeams } from '../../redux/actions';
import MultipleSelect from '../../components/MultipleSelect/MultipleSelect';
import styles from './Form.module.css';

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
  
  const [errors, setErrors] = useState({
    forename: '',
    surname: '',
    nationality: '',
    description: '',
    image: '',
    team: '',
    dob: ''
  })

  const [fieldErrors, setFieldErrors] = useState({
    forename: "",
    surname: "",
    nationality: "",
    description: "",
    image: "",
    team: "",
    dob: "",
  });

  const changeHandler = (e) => {
    const property = e.target.name;
    let value = e.target.value;
    
    if (e.target.multiple) {
      value = Array.from(e.target.selectedOptions, (option) => option.value);
    }

    if (property === "forename" || property === "surname" || property === "nationality") {
      //formato para el nombre y apellido
      value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    validate({ ...form, [property]: value })
    setForm({ ...form, [property]: value });
    setFieldErrors({ ...fieldErrors, [property]: ''});
  }


  const validate = (form) => {
    const regex = /[^A-Za-z ]/;

    const newErrors = {
      forename: '',
      surname: '',
      nationality: '',
      description: '',
      image: '',
      team: '',
      dob: ''
    };
    
    if(regex.test(form.forename)) {
      newErrors.forename = 'This field forename can only contain letters';
    }

    if(regex.test(form.surname)) {
      newErrors.surname = 'This field surname can only contain letters';
    }

    if(regex.test(form.nationality)) {
      newErrors.nationality = 'This field nationality can only contain letters';
    }

    setErrors(newErrors);
  }

  const validateRequired = () => {
    const requiredFields = ["forename", "surname", "nationality", "description", "team", "dob"];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!form[field]) {
        newErrors[field] = "Field required";
      }
    });

    setFieldErrors({ ...fieldErrors, ...newErrors });

    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const clearSubmissionMessage = () => {
    setSubmissionStatus(null);
    setSubmissionMessage("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const isValid = validateRequired();

    if(isValid) {
      axios.post('http://localhost:3001/drivers', form)
        .then(res => {
          console.log(res);
          setSubmissionStatus('success'); // Set the submission status to success
          setSubmissionMessage('Form submitted successfully');
          setForm({ // Clear the form
            forename: '',
            surname: '',
            nationality: '',
            description: '',
            image: '',
            team: '',
            dob: '',
          });
          setTimeout(clearSubmissionMessage, 5000);
        })
        .catch((err) => {
          console.log(err);
          setSubmissionStatus('error'); // Set the submission status to error
          setSubmissionMessage('Form submission failed');
          setTimeout(clearSubmissionMessage, 5000);
        });
    }

    
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

  //Para el estado del submit
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState("");

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler}>
        <div>
          <label>Forename: </label>
          <input type="text" value={form.forename} onChange={changeHandler} name="forename" onFocus={() => setFieldErrors({ ...fieldErrors, forename: "" })}
            onBlur={() => {
              if (!form.forename) {
                setFieldErrors({ ...fieldErrors, forename: "Field required" });
              }
            }} />
          <br></br>
          {errors.forename && <span>{errors.forename}</span>} 
          {fieldErrors.forename && <span>{fieldErrors.forename}</span>}
        </div>
        
        <div>
          <label>Surname: </label>
          <input type="text" value={form.surname} onChange={changeHandler} name="surname" onFocus={() => setFieldErrors({ ...fieldErrors, surname: "" })}
            onBlur={() => {
              if (!form.surname) {
                setFieldErrors({ ...fieldErrors, surname: "Field required" });
              }
            }} />
            <br></br>
            {errors.surname && <span>{errors.surname}</span>} 
            {fieldErrors.surname && <span>{fieldErrors.surname}</span>}
        </div>
        
        <div>
          <label>Nationality: </label>
          <input type="text" value={form.nationality} onChange={changeHandler} name="nationality" onFocus={() => setFieldErrors({ ...fieldErrors, nationality: "" })}
            onBlur={() => {
              if (!form.nationality) {
                setFieldErrors({ ...fieldErrors, nationality: "Field required" });
              }
            }} />
            <br></br>
            {errors.nationality && <span>{errors.nationality}</span>} 
            {fieldErrors.nationality && <span>{fieldErrors.nationality}</span>}
        </div>
        
        <div>
          <label>Description: </label>
          <br />
          <textarea name="description" onChange={changeHandler} value={form.description} onFocus={() => setFieldErrors({ ...fieldErrors, description: "" })}
            onBlur={() => {
              if (!form.description) {
                setFieldErrors({ ...fieldErrors, description: "Field required" });
              }
            }} cols="30" rows="5"></textarea>
            <br></br>
            {errors.description && <span>{errors.description}</span>} 
            {fieldErrors.description && <span>{fieldErrors.description}</span>}
          {/* <input type="text" value={form.description} onChange={changeHandler} name="description" /> */}
        </div>
        
        <div>
          <label>Imagen: </label>
          <input type="text" value={form.image} onChange={changeHandler} name="image" />
        </div>
        
        <div>
          <label>Birthdate: </label>
          <input type="text" value={form.dob} onChange={changeHandler} name="dob" onFocus={() => setFieldErrors({ ...fieldErrors, dob: "" })}
            onBlur={() => {
              if (!form.dob) {
                setFieldErrors({ ...fieldErrors, dob: "Field required" });
              }
            }} />
            <br></br>
            {errors.dob && <span>{errors.dob}</span>} 
            {fieldErrors.dob && <span>{fieldErrors.dob}</span>}
        </div>
        
        <div>
          <label>Teams: </label>
          {/* <input type="text" value={form.team} onChange={changeHandler} name="team" /> */}
          <select className={styles.selectTeams} name="team" multiple value={form.team || []} onChange={changeHandler} size={10} onFocus={() => setFieldErrors({ ...fieldErrors, team: "" })}
            onBlur={() => {
              if (!form.team) {
                setFieldErrors({ ...fieldErrors, team: "Field required" });
              }
            }}>
            {teams.map((team) => {
              return <option key={team} value={team}>{team}</option>
            })}
          </select>
          <br></br>
          {errors.team && <span>{errors.team}</span>} 
          {fieldErrors.team && <span>{fieldErrors.team}</span>}
        </div>

        {/* <div>
          <label>Team: </label>
          <MultipleSelect
            options={teams}
            selectedOptions={selectedTeams}
            onChange={handleTeamsChange}
          />
        </div> */}

        <button type='submit'>Enviar</button>

        {submissionStatus && (
          <div className={submissionStatus === 'success' ? styles.successMessage : styles.errorMessage}>
            {submissionMessage}
          </div>
        )}
      </form>
    </div>
    
  )
}

export default Form
