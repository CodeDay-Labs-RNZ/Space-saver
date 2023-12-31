import { faCheck, faInfoCircle, faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
const styles = require('../styles/Register.css');


const REGISTER_URL = '/auth/signup';


/* Regex for validating user input. 
 USER_REGEX, must start with lower/upper case letter, 4-24 chars in length lower/upper case alphabets and/or digits only and hyphens or underscore 
 PWD_REGEX, requires one lower/upper case letter, one digit and one special character and can be anywhere from 5-24 chars in length 
*/
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{4,24}$/;


/* TypeScript React component for a registration form handling user input validation and form submission. */
const Register: React.FC = () => {

  const navigate = useNavigate();

  /* useRef is for user input, 
  errRef is for error msgs putting focus on it for screen reader */
  const userInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLInputElement | null>(null);
  // state for showing/hiding password
  const [showPassword, setShowPassword] = useState<boolean>(false);

  /* validUserName/validPwd/validPwdMatch is tied to whether a name/password/passwordMatch validates or not, 
    userFocus/pwdFocus/matchPwdFocus is whether we have focus on input field or not  */
  const [username, setUserName] = useState<string>('');
  const [validUserName, setValidUserName] = useState<boolean>(false);
  const [userFocus, setUserFocus] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [validEmail, setValidEmail] = useState<Boolean>(false);
  const [emailFocus, setEmailFocus] = useState<Boolean>(false);

  const [password, setPassword] = useState<string>('');
  const [validPwd, setValidPwd] = useState<Boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<Boolean>(false);

  const [matchPwd, setMatchPwd] = useState<string>('');
  const [validPwdMatch, setValidPwdMatch] = useState<Boolean>(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState<Boolean>(false);

  /* handling state for error msg and if form has successfully submitted or not */
  const [errMsg, setErrMsg] = useState<string>('');
  const [success, setSuccess] = useState<Boolean>(false);

 
/* The useEffect hook sets the focus on an input element with a ref of emailInputRef. 
This will happen when component first loads, indicated by empty dependency array passed as to useEffect. */
  useEffect(() => {
    // first time useEffect is called, focus is on user input when component loads 
    emailInputRef.current?.focus();
  }, []);


/* The useEffect hook is used to perform side effects in functional components. */
  useEffect(() => {
    // focus on username input when component loads 
    userInputRef.current?.focus();
  }, []);


/* The `useEffect` hook is setting up a side effect that will be triggered whenever `username` variable changes. */
  useEffect(() => {
    const result = USER_REGEX.test(username);
    setValidUserName(result);
  }, [username]);


/* The `useEffect` hook checks if the `email` state variable matches regex `EMAIL_REGEX`. 
Then sets `validEmail` state variable to result of test. `useEffect` hook is triggered whenever `email` state variable changes. */
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);


/* The useEffect hook is used to perform logic whenever `password` or `matchPwd` state variables change. */
  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPwd(result);
    const match = password === matchPwd;
    setValidPwdMatch(match);
  }, [password, matchPwd]);


/* The useEffect hook is setting the error message state (errMsg) to empty string 
whenever username, email, password, or matchPwd state variables change. 
This ensures that error message is cleared whenever any of these input fields are modified by the user. */
  useEffect(() => {
    setErrMsg('');
  }, [username, email, password, matchPwd]);


  /**
   * handleSubmit function is used to handle form submission in a registration process, 
   * performing validation and making an API call to register a user.
   * 
   * @param e - The parameter `e` is of type `React.FormEvent<HTMLFormElement>`. It represents the form
   * submission event in React.
   * 
   * @returns The function `handleSubmit` does not have a return statement.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // extra validation for user and password states in cases where js hack button is enabled 
    const v1 = USER_REGEX.test(username);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PWD_REGEX.test(password);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {

      const response = await axios.post(REGISTER_URL, 
        JSON.stringify({ name: username, email, password }), 
        {
          headers: { 'Content-Type': 'application/json' }, 
          withCredentials: true
        });

      // console.log(response.data.accessToken); 
      // console.log(JSON.stringify(response));
      console.log("You have successfully registered!");
      const accessToken = response.data.accessToken;
      
      // clear input fields then set success to true indicating successful registration, and navigate to login page
      setUserName('');
      setEmail('');
      setPassword('');
      setMatchPwd('');
      setSuccess(true);
      navigate('/login')

    } catch (error: any) {
      let msg = 'Registration failed';
      if ('response' in error) {
        if (error.response.status === 409) {
          msg = 'Email already taken'
        } else if (error.response.status === 400) {
          msg = 'Bad Request';
        } else {
          msg = 'Server Error';
        }
      } else if (error.request) {
        msg = 'No Server Response'
      } else {
        msg = 'An error occurred'
      }
      setErrMsg(msg)
      errRef.current?.focus();
    }

  }


  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Space Saver App</h1>
        {success ? (
          <section>
            <h2>Success!</h2>
            <p>
              <a href='#'>Sign In</a>
            </p>
          </section>
          ) : (
            <form className="bg-gray-100 p-4 rounded-lg" onSubmit={handleSubmit}>
              <p ref={errRef} className={errMsg ? "errorMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

              <div className="mb-4">
                <label htmlFor="username" className="block font-bold text-sm mb-1">
                  Username{" "}
                  <span className={validUserName ? "valid" : "hidden"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validUserName || !username ? "hidden" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  autoComplete='off'
                  ref={userInputRef} 
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  aria-invalid={validUserName ? 'false' : 'true'}
                  aria-describedby='uidnote'
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                 <p id='uidnote' className={userFocus && username && !validUserName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>
              </div>              

              <div className="mb-4">
                <label htmlFor="email" className="block font-bold text-sm mb-1">
                  Email{" "}
                  <span className={validEmail ? "valid" : "hidden"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validEmail || !email ? "hidden" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  autoComplete='off'
                  ref={emailInputRef}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-invalid={validEmail ? 'false' : 'true'}
                  aria-describedby='uidnote'
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                 <p id='uidnote' className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Email must be valid and end with .com <br />
                </p>
              </div>

              <div className="mb-4 relative">
                <label htmlFor="password" className="block font-bold text-sm mb-1">
                  Password{" "}
                  <span className={validPwd ? "valid" : "hidden"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validPwd || !password ? "hidden" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Choose a password"
                  onChange={(e) => {setPassword(e.target.value)}}
                  required
                  aria-invalid={validPwd ? 'false' : 'true'}
                  aria-describedby='pwdnote'
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)} 
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                  >
                  <FontAwesomeIcon icon={showPassword? faEyeSlash : faEye} />
                </button>
                <p id='pwdnote' className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters <br />
                  Must include uppercase and lowercase letters <br />
                  Must include numbers <br />
                  {/* Allowed special characters: 
                  // for spcial characters 
                  <span aria-label="exclamation mark">!</span> 
                  <span aria-label="at symbol">@</span> 
                  <span aria-label="hashtag">#</span> 
                  <span aria-label="dollar sign">$</span> 
                  <span aria-label="percent">%</span>  */}
                </p>
              </div>

              <div className="mb-4 relative">
                <label htmlFor="confirmPassword" className="block font-bold text-sm mb-1">
                  Confirm Password{" "}
                  <span className={validPwdMatch && matchPwd ? "valid" : "hidden"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validPwdMatch || !matchPwd ? "hidden" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  required
                  aria-invalid={validPwdMatch ? 'false' : 'true'}
                  aria-describedby='confirmnote'
                  onFocus={() => setMatchPwdFocus(true)}
                  onBlur={() => setMatchPwdFocus(false)}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                  >
                  <FontAwesomeIcon icon={showPassword? faEye : faEyeSlash} />
                </button>
                <p id='confirmnote' className={matchPwdFocus && !validPwdMatch ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must match the first password input field.
                </p>
              </div>

              <button
                disabled={!validEmail || !validPwd || !validPwdMatch}
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mb-4"
              >
                Register
              </button>
            </form>
          )}
        <div className="text-center">
            <span className="text-gray-500 mx-2">Already have an account?</span>
            <a href="/login" className="text-blue-500 font-bold hover:underline">
                Login Here
            </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
