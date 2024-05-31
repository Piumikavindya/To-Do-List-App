import React, { useState } from 'react';
import Container from '../Container';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import CustomLink from '../CustomLink';
import { commonModalClasses } from '../util/themes';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [UserName, setUserName] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (setter) => ({ target }) => {
    setter(target.value);
  };

  const sendData = (e) => {
    e.preventDefault();

    const newUser = {
      Name,
      Email,
      Password,
      Username: UserName, 
    };

    setLoading(true);
    axios
      .post('http://localhost:8002/user/create', newUser)
      .then(() => {
        alert("User Added");
        console.log('User registered successfully');
        navigate('/auth/signin');
      })
      .catch((err) => {
        console.log('Registration failed:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 dark:bg-primary bg-green-200 -z-10 flex justify-center items-center p-1">
      <Container>
        <form onSubmit={sendData} className={commonModalClasses + ' w-72 '}>
          <Title children='Sign up' />
          <FormInput value={Name} onChange={handleChange(setName)} label='Name' placeholder='Piumi Kavindya' name='Name' />
          <FormInput value={Email} onChange={handleChange(setEmail)} label='Email' placeholder='abcd@gmail.com' name='Email' />
          <FormInput value={UserName} onChange={handleChange(setUserName)} label='UserName' placeholder='User name' name='UserName' />
          <FormInput value={Password} onChange={handleChange(setPassword)} label='Password' placeholder='***********' name='Password' type='password' />
          <button type="submit" className="btn btn-primary bg-black p-2" disabled={loading}>
            Sign up
          </button>
          <div className='flex justify-between'>
           
            <CustomLink to='/auth/signin'>Sign in</CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
}
