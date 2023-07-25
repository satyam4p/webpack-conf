import { useEffect, useState , useRef} from 'react';
// import AxiosAjax from '../network/axiosAjax';
import useAuth from '../../helpers/hooks/useAuth';
import { useNavigate, useLocation } from 'react-router';
import './stylesheet.scss';

// import { encryptPass } from '../helpers/commonUtils/authUtils';

const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Auth(){

    const { auth, setAuth, signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const errRef = useRef();
    const [email, setemail] = useState("");
    // const [validEmail, setValidEmail ] = useState(false);
    // const [userFocus, setUserFocus] = useState();

    const [password, setPassword] = useState("");
    // const [validPassword, setValidPassword] = useState(false);
    // const [passwordFocus, setPasswordFocus] = useState();

    const [errorMessage, setErrorMessage] = useState('');

    // useEffect(()=>{
    //     setValidEmail(EMAIL_REGEX.test(email));
    // },[email]);

    // useEffect(()=>{
    //     setValidPassword(PWD_REGEX.test(password));
    // },[password]);

    useEffect(()=>{
        setErrorMessage('');
    },[email,password]);

    const handleSubmit= async (event)=>{
        event.preventDefault();
        const isEmailValid = EMAIL_REGEX.test(email);
        const isPwdValid = PWD_REGEX.test(password);
        if(!isEmailValid || !isPwdValid){
            setErrorMessage('Invalid Entry');
            errRef.current.focus();
            return
        }

        try{
            signIn({email, password}, (isAuthenticated)=>{
                if(isAuthenticated){
                    setemail('');
                    setPassword('');
                    navigate( from, {replace: true});
                }
            })
        }catch(err){
            if(!err?.response){
                setErrorMessage("No Server Reponse");
            }else if(err?.response.status === 401){
                const errorMsg = err.response.data?.message;
                setErrorMessage(errorMsg);
            }else{
                setErrorMessage("Login Failed");
            }
            errRef.current.focus();
        }
    }

    const handleSignUp = (event)=>{
        event.preventDefault();
        const to = "/register";
        navigate(to,  {replace: true});
    }

    return(
        <div className='auth-container'>
            <div className='partial-section'/>
            <div className='auth-form-container'>
                <div className='signup-container'>
                    <div className='signup--actions'>
                        <text>
                            Don't have an account? 
                        </text>
                        <button onClick={e=>handleSignUp(e)}>
                            Create Account
                        </button>
                    </div>
                </div>
                <div className='form-container'>
                <div className='form-fields-container'>
                    <header>
                        Log into Taskboard
                    </header>
                    <br/>
                    <text ref={errRef}>{errorMessage}
                    </text>
                    <form className='form' onSubmit={(e)=>handleSubmit(e)}>
                        <label style={{
                            padding:'5px',
                            fontWeight:0
                        }} htmlFor="email" >
                            Username / Email
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
                            <a style={{
                                minWidth:'140px',
                                textAlign:'end'
                            }}>
                                Forgot Password?
                            </a>
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
                        <button sx={{
                            background:'#123E2C',
                            color:'#ffff',
                            margin:'5px',
                            fontWeight:0
                        }} type='submit'>Sign In</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;