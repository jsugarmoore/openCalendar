import React from "react";


function Login() {




return(
<>
    <form className="form-inline" action="/login" method="post" >
        <div className="form-group">
            <label>username...&nbsp;</label>
            <input className="form-control" type="text" name="username"/>
        </div>
        <div className="form-group">
            <label>&nbsp;&nbsp;password...&nbsp;</label>
            <input className="form-control" type="password" name="password"/>
        </div>
        <div className="form-group">
            <input className="btn-info" type="submit" value="log in"/>
        </div>
      

    </form></>

    );
}

export default Login