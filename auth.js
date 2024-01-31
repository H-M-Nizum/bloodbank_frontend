// Access input field value base on input field id
const getValue = (id) => {
    return document.getElementById(id).value
}
const handleRegistration = (event) => {
    event.preventDefault()
    // access registration form value
    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");
    const info = {
      username,
      first_name,
      last_name,
      email,
      password,
      confirm_password,
    };

    if(password===confirm_password){
        document.getElementById("error").innerHTML=""
        
        // password validation with regular expression
        // Minimum eight characters, at least one letter, one number and one special character:
        if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)){
            
            // console.log(info);
            // fetch registration api and method post for user registration
            // Autometic send eamil base on api
            fetch("https://lifesafe-bank.onrender.com/patient/register/", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(info),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data)
                window.location.href = "login.html";
                Swal.fire({
                    title: "Congrate",
                    text: data,
                    icon: "success",
                    confirmButtonText: 'ok'
                  });
              });
      
        }
        else{
            document.getElementById("error").innerHTML="Minimum eight characters, at least one letter, one number and one special character:"
        }
    }
    else{
        document.getElementById("error").innerHTML="ERROR! password and confirm password are not match."
    }
}


// user login
const handleLogin = (event) => {
    event.preventDefault();
    const username = getValue("login-username");
    const password = getValue("login-password");
    console.log(username, password);
    if ((username, password)) {
      fetch("https://lifesafe-bank.onrender.com/patient/login/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
            console.log(data.token)
            console.log(data.úser_id)
        //   save token and user id in local storage
          if (data.token && data.úser_id) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user_id);
            console.log('hi')
            window.location.href = "index.html";
            console.log('hi1')
            console.log(document.getElementsByClassName("auth_class").innerHTML)

            document.getElementsByClassName("auth_class").style.display = "none"
          }
          else {
            // Handle unsuccessful login, e.g., display an error message
            console.error("Login failed. Invalid credentials.");
        }
        });
    }
  };

  // user logout
  const handlelogOut = () => {
    const token = localStorage.getItem("token");
    console.log(token)
    fetch("https://lifesafe-bank.onrender.com/patient/logout/", {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
        
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
      });
  };