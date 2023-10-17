import {Grid} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
const { useState } = require("react")

const Dashboard = ({username}) => {
    const [data, setData] = useState(null)
    const [filtered, setFilter] = useState(null)
    const [searchTerm, setTerm] = useState('')
    var n = 1;

    function changeStatus(val) {
        const chng = fetch('/dashboard/' + val._id, {
            method: 'PATCH',
            body: JSON.stringify({ status : !val.status }),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        console.log(chng);
    }

    const logOut = async () => {
        window.location.replace("/")
        localStorage.removeItem("auth")
        localStorage.removeItem("username")
    }

    const getData = async () => {
        const res = await fetch('/dashboard', {method : 'GET'} )
        const allData = await res.json()
        if(!res.ok) {
            console.log(allData.error);
        }
        setData(allData);
        if(!filtered) {
            setFilter(data)
        }
    };
    getData();

    const handleSearch = () => {
        const newData = JSON.parse(JSON.stringify(data));
        const results = newData.filter(item => {
            return item.hospitalName.includes(searchTerm) 
            || item.emailID.includes(searchTerm)
            || item.address.includes(searchTerm)
            || item.phoneNumber.includes(searchTerm)
            || item.city.includes(searchTerm)
            || item.emergencyWardNumber.includes(searchTerm)
            || item.pincode.includes(searchTerm)
            || item.hospitalRegDate.includes(searchTerm)
            || item.state.includes(searchTerm);
        })
        setFilter(results);
    }
    const handleFilter = (filterTerm) => {
        if(filterTerm == "active") {
            const results = data.filter(item => {
            return item.status;
            });
            setFilter(results);
        }
        if(filterTerm == "inactive") {
            const results = data.filter(item => {
                return !item.status;
            });
            setFilter(results);
        }
        if(filterTerm == "date") {
            const results = data.sort((b, a) => new Date(a.date) - new Date(b.date));
            setFilter(results);
        }
    }

    return(
        <div className="dashboard">
            <div className="navbar">
                <Grid container spacing={2}>
                    <Grid item xs={4} md={8}>
                        <span><h4>Welcome {localStorage.getItem('username')}</h4></span>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <span><button onClick={logOut}>logout</button></span>
                    </Grid>
                </Grid>
            </div>
            <div className="searchnfilter">
                <Grid container spacing={2}>
                    <Grid item xs={4} md={8}>
                        <input type="search" className='searchbar' value={searchTerm} onChange={e => setTerm(e.target.value)} placeholder='search here'/>
                        <button onClick={handleSearch}><SearchIcon></SearchIcon></button>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <select onChange={e => handleFilter(e.target.value)} defaultValue={null} className='select' placeholder='sort'>
                            <option value="active" id="">active</option>
                            <option value="inactive" id="">inactive</option>
                            <option value="date" id="">date</option>
                        </select>
                    </Grid>
                </Grid>
            </div>
        {filtered && <table className='table'>
                <tr>
                    <th>No.</th>
                    <th>Date & Time</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Contact</th>
                    <th>City</th>
                    <th>State</th>
                    <th>PinCode</th>
                    <th>Hospital Registration Date</th>
                    <th>Hospital Registration Number</th>
                    <th>Hospital Registration Photo</th>
                    <th>Emergency Ward Number</th>
                    <th>Number of Ambulance</th>
                    <th>Status</th>
                </tr>
                {filtered.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{n && n++}</td>
                            <td>{val.hospitalName}</td>
                            <td>{val.emailID}</td>
                            <td>{val.address}</td>
                            <td>{val.phoneNumber}</td>
                            <td>{val.city}</td>
                            <td>{val.hospitalRegNumber}</td>
                            <td>{val.state}</td>
                            <td>{val.emergencyWardNumber}</td>
                            <td>{val.pincode}</td>
                            <td><p onClick={() => {
                                alert("the file is at" + val.registrationCertificate)
                            }}>File</p></td>
                            <td>{val.emergencyWardNumber}</td>
                            <td>{val.ambulanceAvailable}</td>
                            <td><button onClick={() => changeStatus(val)} className='activator' style={{backgroundColor : val.status? 'green' : 'red'}}>{val.status? 'active' : 'inactive'}</button></td>
                        </tr>
                    )
                })}
            </table>}
        </div>
    )
}

export default Dashboard;