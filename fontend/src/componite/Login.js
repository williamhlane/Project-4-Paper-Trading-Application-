

const Login = () => {
    /*This is the log in and create user componite*/
    const login = (e) => {
        e.preventDefault();
        //const username = document.getElementById('logInUserName').value;
        //const password = document.getElementById('logInPassword').value;
        fetch('http://127.0.0.1:3001/users/login', {
                method: 'POST',
                mode: 'cors',
                //credentials: 'include',
        }).then((res) => {
            return res.json();
        }).then((res) => {
            
        })

    }

    const createUser = (e) => {
        /*This is the log in and create user componite*/
        
            e.preventDefault();
            const username = document.getElementById('createusername').value;
            const password = document.getElementById('createpassword').value;
            const body = `{ "createusername" : "${username}", "createpassword": "${password}" }`;
            console.log(body);
            fetch('http://localhost:3001/users/create', {
                    method: 'POST',
                    mode: 'cors',
                    //credentials: 'include',//not needed not cookie yet
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                    },
                    body: body,
            }).then((res) => {
                return res.json();
            }).then((res) => {
                console.log(JSON.stringify(res));
            })
    
        
    }
    return (
        <div id='login'>
            <label>Log In:</label>
            <form onSubmit={login}>
                <label>Username: </label><input type="text" name="loginusername" id='logInUserName' />
                <label>Password:</label><input type="password" name="loginpassword" id='logInPassword' />
                <input type="submit" />
            </form>
            <hr />
            <label>Create User:</label>
            <form  onSubmit={createUser}>
                <label>Username: </label><input type="text" name="createusername" id="createusername" />
                <label>Password:</label><input type="password" name="createpassword" id="createpassword" />
                <input type="submit" />
            </form>
        </div>
    )
}
export default Login;