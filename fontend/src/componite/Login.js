

const Login = ({setAppState}) => {
    /*This is the log in and create user componite*/
    const login = (e) => {
        e.preventDefault();
        let username = document.getElementById('loginusername').value;
        let password = document.getElementById('loginpassword').value;
        const body = `{ "loginusername" : "${username}", "loginpassword" : "${password}" }`;
        fetch('http://localhost:3001/users/login', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',//not needed not cookie yet
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body,
        }).then(res => res.json())
        .then((res) => {
            if (res.authenticated === "true") {
                setAppState(JSON.parse(JSON.stringify(res)));
            } else {
                alert(`Error: ${res.status}`);
            }
        }).catch((error) => {
            alert(`Error 2 : ${error}.`)
        })

    }

    const createUser = (e) => {
        /*This is the log in and create user componite*/
        e.preventDefault();
        let username = document.getElementById('createusername').value;
        let password = document.getElementById('createpassword').value;
        const body = `{ "createusername" : "${username}", "createpassword": "${password}" }`;
        console.log(body);
        fetch('http://localhost:3001/users/create', {
            method: 'POST',
           // mode: 'cors',
            //credentials: 'include',//not needed not cookie yet
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body,
        }).then((res) => {
            return res.json();
        }).then((res) => {
            if (res.status !== "success") {
                alert(`Error : ${res.status}.`)
            } else {
                alert(`The user ${res.username} has been successfully created.`);
            }
            document.getElementById('createusername').value = '';
            document.getElementById('createpassword').value = '';
        }).catch((error) => {
            alert(`Error ${error}.`)
        })
    }
    return (
        <div id='login'>
            <label>Log In:</label>
     
            <form onSubmit={login}>
                <label>Username: </label><input type="text" name="loginusername" id='loginusername' />
                <label>Password:</label><input type="password" name="loginpassword" id='loginpassword' />
                <input type="submit" />
            </form>
            

            <hr />
            <label>Create User:</label>
            <form onSubmit={createUser}>
                <label>Username: </label><input type="text" name="createusername" id="createusername" />
                <label>Password:</label><input type="password" name="createpassword" id="createpassword" />
                <input type="submit" />
            </form>
        </div>
    )
}
export default Login;