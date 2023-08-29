import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState, useEffect } from 'react';
const styles = require('../styles/Register.css');


/* USER_REGEX, must start with lower/upper case letter, 4-24 chars in length lower/upper case alphabets and/or digits only and hyphens or underscore */
/* PWD_REGEX, requires one lower/upper case letter, one digit and one special character and can be anywhere from 5-24 chars in length */
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const Register: React.FC = () => {
  /* useRef is for user input, 
  errRef is for error msgs putting focus on it for screen reader */
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLInputElement | null>(null);

  /* validName/validPwd/validPwdMatch is tied to whether a name/password/passwordMatch validates or not, 
    userFocus/pwdFocus/matchFocus is whether we have focus on input field or not  */
  const [email, setEmail] = useState<string>('');
  const [validEmail, setValidEmail] = useState<Boolean>(false);
  const [emailFocus, setEmailFocus] = useState<Boolean>(false);

  const [password, setPassword] = useState<string>('');
  const [validPwd, setValidPwd] = useState<Boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<Boolean>(false);

  const [matchPassword, setMatchPassword] = useState<string>('');
  const [validPwdMatch, setValidPwdMatch] = useState<Boolean>(false);
  const [matchFocus, setMatchFocus] = useState<Boolean>(false);

  /* handling state for error msg and if form has successfully submitted or not */
  const [errMsg, setErrMsg] = useState<string>('');
  const [success, setSuccess] = useState<Boolean>(false);


  /* */
  useEffect(() => {
    /* first time useEffect is called, focus is on user input when component loads */
    emailInputRef.current?.focus();
  }, []);

  /* useEffect is applied to user name to validate user name. Every time name changes, it'll check validation of that field */
  useEffect(() => {
    /*  USER_REGEX.test(...) <- testing user state to regex we've defined */
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);


  useEffect(() => {
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    /* confirming password to match password state and checking if true/false */
    /* anytime result/match changes, validPwdMatch will check if field has changed */
    setValidPwd(result);
    const match = password === matchPassword;
    setValidPwdMatch(match);
  }, [password, matchPassword]);


  useEffect(() => {
    setErrMsg('');
    /* anytime user changes one of three states, error msg will clear out */
  }, [email, password, matchPassword]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* this is where you'd make a fetch/axios call to register the user and get the response back to log it */
    
    /* **temporary** extra validation for user and password states in cases where button is enabled */
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    console.log("email: " + email, "password: " + password);
    setSuccess(true);

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
                    Email required <br />
                </p>
              </div>

              <div className="mb-4">
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
                  type="password"
                  id="password"
                  placeholder="Choose a password"
                  onChange={(e) => {setPassword(e.target.value)}}
                  required
                  aria-invalid={validPwd ? 'false' : 'true'}
                  aria-describedby='pwdnote'
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)} 
                />
                <p id='pwdnote' className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 characters. <br />
                  Must include uppercase and lowercase letters, a number and a special character.<br />
                  Allowed special characters: 
                  <span aria-label="exclamation mark">!</span> 
                  <span aria-label="at symbol">@</span> 
                  <span aria-label="hashtag">#</span> 
                  <span aria-label="dollar sign">$</span> 
                  <span aria-label="percent">%</span> 
                </p>
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block font-bold text-sm mb-1">
                  Confirm Password{" "}
                  <span className={validPwdMatch && matchPassword ? "valid" : "hidden"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validPwdMatch || !matchPassword ? "hidden" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                  onChange={(e) => setMatchPassword(e.target.value)}
                  required
                  aria-invalid={validPwdMatch ? 'false' : 'true'}
                  aria-describedby='confirmnote'
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p id='confirmnote' className={matchFocus && !validPwdMatch ? "instructions" : "offscreen"}>
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
