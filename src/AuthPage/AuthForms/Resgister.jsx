import React, { useState, useContext } from 'react';
import * as userService from '../../utilities/user-service';
import { UserContext } from '../../UserProvider';
import { useNavigate } from 'react-router-dom';

function Register(){
  const { user, setUser } = useContext(UserContext);
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;

    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      setCredentials({ ...credentials, [name]: value });
    }
    setError('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (credentials.password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try{
      // register and retrieve user to set globally
      const user = await userService.register(credentials);
      setUser(user);
      navigate('/');
    }catch{
      setError('Registration Failed');
    }
  }

  return(
    <>
      <div className='mt-4 pt-2 w-80 mx-auto border-x border-c4 h-80 pt-4'>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className='flex flex-col max-w-60 m-auto mt-4'>
            <label className='text-center'>Username</label>
            <input className='mt-1 mb-2 text-c1 px-1' type="text" placeholder="Username" name="name" value={credentials.name} onChange={handleChange} required />

            <label className='text-center'>Email</label>
            <input className='mt-1 mb-2 text-c1 px-1' type="email" placeholder="Email" name="email" value={credentials.email} onChange={handleChange} required />

            <label className='text-center'>Password</label>
            <input className='mt-1 text-c1 px-1' type="password" placeholder="Password" name="password" value={credentials.password} onChange={handleChange} required />

            <label className='text-center'>Confirm</label>
            <input className='mt-1 text-c1 px-1' type="password" placeholder="Password" name="confirmPassword" value={confirmPassword} onChange={handleChange} required />

            <div className="mx-auto pt-4">
              <button className="hover:bg-c2 hover:text-c6 px-4 h-8 mb-4 border-t border-b border-c4">Sign Up</button>
            </div>
          </div>
        </form>
      </div>
      {error && (
        <p className="error-message flex mx-auto items-center justify-center mt-10 border-y border-c4 w-[20%]">&nbsp;{error}</p>
      )}
    </>
  )
      

}

export default Register