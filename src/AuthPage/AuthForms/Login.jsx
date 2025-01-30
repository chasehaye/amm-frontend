import React, { useState, useContext, useEffect } from 'react';
import * as userService from '../../utilities/user-service'
import { UserContext } from '../../UserProvider';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [isRemembered, setIsRemembered] = useState(false);

  const toggleCheckbox = () => {
    setIsRemembered(prevState => !prevState);
  };

  useEffect(() => {
    const fetchRememberedUser = async () => {
      try {
        const retrievedEmail = await userService.grabRememberedUser();
        setTimeout(() => {
          if (retrievedEmail) {
            setCredentials((prevCredentials) => ({
              ...prevCredentials,
              email: retrievedEmail,
            }));
          }
        }, 100);
        if(retrievedEmail){
          setIsRemembered(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRememberedUser();
  }, []);

  const { setUser } = useContext(UserContext);
  const [credentials, setCredentials] = useState({
      email: '',
      password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
    
  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }
    
  async function handleSubmit(evt) {
    evt.preventDefault();
    try{
      // validate retrieve user to set globally
      const user = await userService.login(credentials);
      await userService.setRememberUser({email: credentials.email, remember_me: isRemembered})
      setUser(user);
      navigate('/');
    }catch{
      setError('Log In Failed');
    }finally{
      if(isRemembered === false){
        userService.removeRemeberedUser();
      }
    }
  }
    
  return (
    <>
      <div className='mt-4 pt-2 w-80 mx-auto border-x border-c4 h-60 pt-4'>
        <form autoComplete="off" onSubmit={handleSubmit} >
          <div className='flex flex-col max-w-60 m-auto mt-4'>
            <label className='text-center'>Email</label>
            <input id="emailField" className='mt-1 mb-2 text-c1 px-1' type="text" placeholder="Email" name="email" value={credentials.email} onChange={handleChange} required />

            <label className='text-center'>Password</label>
            <input  className='mt-1 text-c1 px-1' type="password" placeholder="Password" name="password" value={credentials.password} onChange={handleChange} required />

            <div className="mx-auto pt-4">
              <button className="hover:bg-c2 hover:text-c6 px-4 h-8 mb-4 border-t border-b border-c4">Login</button>
            </div>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center space-x-2">
        <div
          onClick={toggleCheckbox}
          className={`ml-48 w-5 h-6 border flex items-center justify-center cursor-pointer ${isRemembered ? 'border-2 border-c2' : 'border-c4'}`}
        >
          {isRemembered && (
            <div className="flex space-x-1 text-c2">
            X
          </div>
          )}
        </div>
        <span className="text-sm">Remember Me</span>
      </div>
      {error && (
        <p className="error-message flex mx-auto items-center justify-center mt-10 border-y border-c4 w-[20%]">&nbsp;{error}</p>
      )}
    </>
  );
};

export default Login