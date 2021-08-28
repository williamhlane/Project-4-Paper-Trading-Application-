const Login = () => {
    /*
    const login = () =>{

    }
    */


    return (
        <div id='login'>
            <form>
                <label>Username: </label><input type="text" name="username" />
                <label>Password:</label><input type="password" name="password" />
                <input type="submit" />
            </form>
        </div>
    )
}
export default Login;