import {Grid, container, item} from "@mui/material"
import {useState} from 'react'
import path from './images/Web capture_17-10-2023_183633_www.figma.com.jpeg'

const auth = false;

const Registration = () => {
    const [login, setLogin] = useState(false)
    const [error, setError] = useState('')
    const [done, setDone] = useState(false)
    const [signupValues, setSignup] = useState(false)

    //signup variables
    const [hospitalName, sethospitalName ] = useState('')
    const [emailID, setemailID ] = useState('')
    const [address, setaddress ] = useState('')
    const [phoneNumber, setphoneNumber ] = useState('')
    const [city, setcity ] = useState('')
    const [hospitalRegNumber, sethospitalRegNumber ] = useState('')
    const [state, setstate ] = useState('')
    const [emergencyWardNumber, setemergencyWardNumber ] = useState('')
    const [pincode, setpincode ] = useState('')
    const [registrationCertificate, setregistrationCertificate ] = useState('')
    const [hospitalRegDate, sethospitalRegDate ] = useState('')
    const [ambulanceAvailable, setambulanceAvailable ] = useState('')
    const [password, setpassword ] = useState('')
    const [matchPassword, setmatchPassword ] = useState('')

    //login variables
    const [loginHospitalName, setLoginHospitalName] = useState('')
    const [loginEmailID, setLoginEmailID] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [loginCode, setLoginCode] = useState('')

    //signup value check

    const handleSignUp = async (e) => {
        e.preventDefault()

        const user = {hospitalName, emailID, address, phoneNumber, city, hospitalRegNumber, state, emergencyWardNumber, pincode, registrationCertificate, hospitalRegDate, ambulanceAvailable, password};
        console.log(user);

        const res = await fetch('/signup', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type' : 'application/json'
            }
        });
        const json = await res.json();

        if(!res.ok) {
            console.log(json.error);
            setError(json.error);
        }
        if(res.ok) {
            alert('your access code is your hospital registration number')
            setLogin(true);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        const userData = {loginHospitalName, loginEmailID, loginPassword, loginPassword}

        const res = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type' : 'application/json'
            }
        });
        const json = await res.json();
        if(!res.ok) {
            console.log(json.error);
            setError(json.error);
        }
        if(res.ok) {
            localStorage.setItem("username", json.username)
            localStorage.setItem("auth", json.auth)
            window.location.replace('/dashboard/capture')
        }
    }

    return(
        <div className="CredentialsPage">
            <Grid container spacing={2}>
                <Grid item md={5} className="poster">
                    <img src={path} alt="" />
                </Grid>
                <Grid item md={6} className="credentialsform">
                    <p className='errorcase'>{error? error : null}</p>
                    <button onClick={() => setLogin(!login)} className="signuplogin">SignUp / LogIn</button>
                    {!login && <div className="signupPage">
                        <h3>Register</h3>
                        <form className="signupform">
                            <input type="text" value={hospitalName} placeholder='Hospital Name' onChange={(e) => sethospitalName(e.target.value)}/>
                            <input type="text" value={emailID} placeholder='Email ID' onChange={(e) => setemailID(e.target.value)}/>
                            <input type="text" value={address} placeholder='Address' onChange={(e) => setaddress(e.target.value)}/>
                            <input type="number" value={phoneNumber} placeholder='Phone Number' onChange={(e) => setphoneNumber(e.target.value)}/>
                            <input type="text" value={city} placeholder='City' onChange={(e) => setcity(e.target.value)}/>
                            <input type="number" value={hospitalRegNumber} placeholder='Hospital Registration Number' onChange={(e) => sethospitalRegNumber(e.target.value)}/>
                            <input type="text" value={state} placeholder='State' onChange={(e) => setstate(e.target.value)}/>
                            <input type="number" value={emergencyWardNumber} placeholder='Emergency Ward Number' onChange={(e) => setemergencyWardNumber(e.target.value)}/>
                            <input type="text" value={pincode} placeholder='PinCode' onChange={(e) => setpincode(e.target.value)}/>
                            <label htmlFor="">Reg Certificate Number<input type="file" value={registrationCertificate} onChange={(e) => setregistrationCertificate(e.target.value)}/></label>
                            <input type="date" value={hospitalRegDate} placeholder='Hospital Registration Date' onChange={(e) => sethospitalRegDate(e.target.value)}/>
                            <input type="number" value={ambulanceAvailable} placeholder='Number of Ambulance Available' onChange={(e) => setambulanceAvailable(e.target.value)}/>
                            <input type="password" value={password} placeholder='Create Password' onChange={(e) => setpassword(e.target.value)}/>
                            <input type="password" value={matchPassword} placeholder='Confirm Password' onChange={(e) => setmatchPassword(e.target.value)}/>
                        </form>
                        <button onClick={e => handleSignUp(e)} className="signup" disabled={!signupValues}>Sign Up</button>
                    </div>}
                    {login && <div className="signupPage">
                        <h2>Welcome to Sicu-Aura</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique perspiciatis pariatur, dolor</p>
                        <form className="loginform">
                            <input type="text" value={loginHospitalName} placeholder='Hospital Name' onChange={(e) => setLoginHospitalName(e.target.value)}/>
                            <input type="text" value={loginEmailID} placeholder='Email ID' onChange={(e) => setLoginEmailID(e.target.value)}/>
                            <input type="password" value={loginPassword} placeholder='Password' onChange={(e) => setLoginPassword(e.target.value)}/>
                            <input type="number" value={loginCode} placeholder='Access Code' onChange={(e) => setLoginCode(e.target.value)}/>
                            <button onClick={handleLogin} className="signup">Login</button>
                        </form>
                    </div>}
                </Grid>
            </Grid>
        </div>
    )

}

export default Registration;