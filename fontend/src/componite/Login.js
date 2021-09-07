

const Login = () => {
    /*This is the log in and create user componite*/
    const login = (e) => {
        e.preventDefault();
        const username = document.getElementById('logInUserName').value;
        const password = document.getElementById('logInPassword').value;
        fetch('http://127.0.0.1/users/login', {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
        }).then((res) => {
            return res.json();
        }).then((res) => {
            
        })

    }

    return (
        <div id='login'>
            <label>Log In:</label>
            <form method='POST' onSubmit={login}>
                <label>Username: </label><input type="text" name="loginusername" id='logInUserName' />
                <label>Password:</label><input type="password" name="loginpassword" id='logInPassword' />
                <input type="submit" />
            </form>
            <hr />
            <label>Create User:</label>
            <form method='POST' action="./users/create">
                <label>Username: </label><input type="text" name="createusername" />
                <label>Password:</label><input type="password" name="createpassword" />
                <input type="submit" />
            </form>
        </div>
    )
}
export default Login;