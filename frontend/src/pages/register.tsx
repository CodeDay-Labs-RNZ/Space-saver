import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState, useEffect } from 'react';
/* todo: temporary way of importing css, find a better way */
const styles = require('../styles/Register.css');


/* USER_REGEX, must start with lower/upper case letter, 4-24 chars in length lower/upper case alphabets and/or digits only and hyphens or underscore */
/* PWD_REGEX, requires one lower/upper case letter, one digit and one special character and can be anywhere from 5-24 chars in length */
const USER_REGEX = /^[A-z][A-z0-9]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{5,24}$/;

function Register() {
  /* useRef is for user input, 
    errRef is for error msgs putting focus on it for screen reader */
  const userInputRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLInputElement | null>(null);

  /* validName/validPwd/validPwdMatch is tied to whether a name/password/passwordMatch validates or not, 
    userFocus/pwdFocus/matchFocus is whether we have focus on input field or not  */
  const [user, setUser] = useState<string>('');
  const [validName, setValidName] = useState<Boolean>(false);
  const [userFocus, setUserFocus] = useState<Boolean>(false);

  const [password, setPassword] = useState<string>('');
  const [validPwd, setvalidPwd] = useState<Boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<Boolean>(false);

  const [matchPassword, setMatchPassword] = useState<string>('');
  const [validPwdMatch, setvalidPwdMatch] = useState<Boolean>(false);
  const [matchFocus, setMatchFocus] = useState<Boolean>(false);

  /* handling state for error msg and if form has successfully submitted or not */
  const [errMsg, setErrMsg] = useState<string>('');
  const [success, setSuccess] = useState<Boolean>(false);


  /* */
  useEffect(() => {
    /* first time useEffect is called, focus is on user input when component loads */
    userInputRef.current?.focus();


  }, []);

  /* useEffect is applied to user name to validate user name. Every time name changes, it'll check validation of that field */
  useEffect(() => {
    /*  USER_REGEX.test(...) <- testing user state to regex we've defined */
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);


  useEffect(() => {
    const result = USER_REGEX.test(password);
    console.log(result);
    console.log(password);
    /* confirming password to match password state and checking if true/false */
    /* anytime result/match changes, validPwdMatch will check if field has changed */
    setvalidPwd(result);
    const match = password === matchPassword;
    setvalidPwdMatch(match);
  }, [password, matchPassword]);


  useEffect(() => {
    setErrMsg('');
    /* anytime user changes one of three states, error msg will clear out */
  }, [user, password, matchPassword]);




  /* <p> tag displays a msg on screen if there's one, else nothing. aria-live anounces error(if exists) with screen reader 
      ref attribute allows us to set focus on an input field
      autocomplete attribute off preventing autofill
      aria-invalid attribute tells screen readers if input is invalid
      aria-describedby points to id of element that describes error
      */
  return (
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} 
      aria-live="assertive">{errMsg}</p>
      <h1>Register</h1>

      <form>
        <label htmlFor='username'>
          Username: 
          <span className={validName ? 'valid' : 'hide'}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validName || !user ? 'hide' : 'invalid'}>
            <FontAwesomeIcon icon={faTimes} />
          </span>

        </label>
        <input
          type='text'
          id='username'
          ref={userInputRef}
          autoComplete='off'
          onChange={(e) => setUser(e.target.value)}
          required
          aria-invalid={validName ? 'false' : 'true'}
          aria-describedby='uidnote'
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <p id='uidnote' className={userFocus && user && !validName ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters. <br />
          Must begin with a letter. <br />
          Letters, numbers, underscores, hyphens allowed. <br />
        </p>


      </form>

    </section>
  )
}

export default Register