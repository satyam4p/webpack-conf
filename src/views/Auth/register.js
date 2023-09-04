import React,{useCallback, useEffect, useRef, useState} from "react";
import './stylesheet.scss';
import { useNavigate } from "react-router";
import debounce from "../../helpers/commonUtils/debounce";
import useAuth from "../../helpers/hooks/useAuth";

const Register = (props)=>{
  const navigate = useNavigate();
  const { register } = useAuth();
  const errRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setemail] = useState("");
  const [username, setUsernme] = useState('');
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isValid, setValid] = useState(false);
  const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!validateForm){
      setErrorMessage("Form data is not valid");
      errRef.current.style.display = "block"
      errRef.current.focus();
      return
    }else{
      /** need to send the request for registration */
      await register({email, password, repassword, username},(response)=>{
        console.log("response for register:: ",response);
      })
    }

    setemail('')
    setPassword('')
    setRepassword('')
  }
  const validateForm = ()=>{
    if(email && password && repassword){
      if(!EMAIL_REGEX.test(email) 
          || !PWD_REGEX.test(password) 
          || password !== repassword
          || !validateUsername(username)){

        setValid(false);
        return false;
      }else{
        setValid(true)
        return true
      }
    }else{
      setValid(false)
      return false;
    }
  }
  const validateEmail =  debounce((email)=>{
    if(email && !EMAIL_REGEX.test(email)){
      setErrorMessage("Email is not valid");
      errRef.current.style.display = 'block';  
      errRef.current.focus()
    }else{
      setErrorMessage("");
      // errRef.current.style.display = 'none';  
    }
  },1000)
  
  const validatePass =  debounce((pass)=>{
    if(password && !PWD_REGEX.test(pass)){
      setErrorMessage("Password is not valid");
      errRef.current.style.display = 'block';  
      errRef.current.focus()
    }else{
      setErrorMessage("");
      // errRef.current.style.display = 'none';  
    }
  },1000)

  useEffect(()=>{
   validateEmail(email)
  },[email, setemail])

  useEffect(()=>{
    validatePass(password);
  },[password, setPassword])

  const validateUsername=(username)=>{

    if(username.trim() && username.length){
      setErrorMessage("");
      // errRef.current.style.display = 'none';  
      return true
    }else{
        setErrorMessage("username is required");
        errRef.current.style.display = 'block';  
        errRef.current.focus()  
        setValid(false);
        return false
    }

  }

  const validateRePass = debounce((repass)=>{
      if(repass!==password){
        setErrorMessage("Passwords don't match");
        errRef.current.style.display = 'block';  
        errRef.current.focus()  
        setValid(false);
      }else{
        setErrorMessage("");
        // errRef.current.style.display = 'none';  
      }
    },1000)

  const handleChange = (value)=>{
    setRepassword(value);
  }
  useEffect(()=>{
    validateRePass(repassword);
  },[repassword, setRepassword])

  const handleSignIn=(e)=>{
    e.preventDefault();
    const to = "/login";
    navigate(to,  {replace: true});
  }

  return(
    <div className='auth-container'>
      <div className='partial-section'/>
        <div className='auth-form-container'>
        <div className='signup-container'>
          <div className='signup--actions'>
              <text>
                  Already have an account?
              </text>
              <button onClick={e=>handleSignIn(e)}>
                  Sign In
              </button>
          </div> 
        </div>
        <div className='form-container'>
            <div className='form-fields-container'>
                <header>
                  Sign Up to Taskboard
                </header>
                <br/>
                <text style = {{display: 'none'}} ref={errRef}>{errorMessage}
                </text>
                <form className='form' onSubmit={(e)=>handleSubmit(e)}>
                  <label style={{
                          padding:'5px',
                          fontWeight:0
                      }} htmlFor="username" >
                          Username
                      </label><br/>
                      <input style={{
                          width:'98%',
                          margin:'5px',
                          height:'35px',
                          fontSize:'14px',
                      }}
                      id = "username"
                      onChange={e=>setUsernme(e.target.value)}
                      value={username}
                      required
                      autoComplete='off'
                    />
                    <label style={{
                        padding:'5px',
                        fontWeight:0
                    }} htmlFor="email" >
                        Email
                    </label><br/>
                    <input style={{
                        width:'98%',
                        margin:'5px',
                        height:'35px',
                        fontSize:'14px',
                    }}
                    id = "email"
                    onChange={e=>setemail(e.target.value)}
                    value={email}
                    required
                    autoComplete='off'
                    />
                    <div className='password-container'>
                        <label style={{
                            padding:'5px',
                            fontWeight:0,
                        }}
                        htmlFor="password"
                        >
                            Password
                        </label>
                    </div>
                    <input style={{
                        margin:'5px',
                        height:'35px',
                        width:'98%',
                        fontSize:'14px',
                    }} 
                    id="password"
                    type="password"
                    onChange={e=>setPassword(e.target.value)}
                    value = {password}
                    required
                    autoComplete='off'
                    />
                    <div className='password-container'>
                        <label style={{
                            padding:'5px',
                            fontWeight:0,
                        }}
                        htmlFor="password"
                        >
                            Re-enter Password
                        </label>
                    </div>
                    <input style={{
                        margin:'5px',
                        height:'35px',
                        width:'98%',
                        fontSize:'14px',
                    }} 
                    id="password2"
                    type="password"
                    onChange={e=>handleChange(e.target.value)}
                    value = {repassword}
                    required
                    autoComplete='off'
                    />
                    <button sx={{
                        background:'#123E2C',
                        color:'#ffff',
                        margin:'5px',
                        fontWeight:0
                    }} type='submit'>Sign Up</button>
                </form>
            </div>
            </div>
        </div>
    </div>
  )

}

export default Register;