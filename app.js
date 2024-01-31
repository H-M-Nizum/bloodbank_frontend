// ################# Load and display all type of blood stock ###################

const loadbloodstock = () => {
    fetch("https://lifesafe-bank.onrender.com/blood/list/")
    .then((res) => res.json())
    .then((data) => {
      displaybloodstockData(data)
      
    })
    .catch((err) => console.log(err))
}
//  Display data that provide loadservice function
const displaybloodstockData = (blood) => {
    for (let i = 0; i < blood.length; i++) {
        if(i%2==0){
            document.getElementById("blood_stock").innerHTML += `
            <div class="p-3 p-xl-5 text-light" style="background-color: #354f52;">
                <h3 class="text-uppercase h5">${blood[i].bloodgroup}</h3>
                <p>
                If you have the Rh D antigen, your blood type is positive. 77% of our donors are Rh D positive.
                </p>
                <button class="btn btn-outline-light">${blood[i].unit}</button>
            </div>
            `
        }
        else{
            document.getElementById("blood_stock").innerHTML += `<div class="p-3 p-xl-5 text-light" style="background-color: #2f3e46;">
            <h3 class="text-uppercase h5">${blood[i].bloodgroup}</h3>
            <p>
            If you lack the Rh D antigen, your blood type is negative. 23% of our donors are Rh D positive.
            </p>
            <button class="btn btn-outline-light">${blood[i].unit}</button>
        </div>`
        }
      }
    services.forEach(blood => {
        // console.log(service)
        // access parent tag : ul and add child li that contain services card
        document.getElementById("services-container-id").innerHTML += ``
    });
}

loadbloodstock()

// ############################ contact us section ###############################

function submitForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    const data = {
        name: name,
        email: email,
        phone: phone,
        message: message
    };

    fetch('https://lifesafe-bank.onrender.com/patient/contact/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // document.getElementById('confirmationMessage').innerText = data;
        Swal.fire({
            title: "Congrate",
            text: data,
            icon: "success",
            confirmButtonText: 'ok'
          });
      
    })
    .catch(error => {Swal.fire({
        title: "Oops...",
        text: error,
        icon: "error",
        confirmButtonText: 'ok'
      });
    });
}

// function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
// }


// blood donation
const loaddonation = () => {
    // Get values from form
    const bloodgroup = document.getElementById('bloodgroup').value;
    const age = document.getElementById('age').value;
    const unit = document.getElementById('unit').value;
    const donor_id = localStorage.getItem("user_id");
    console.log(donor_id)
    // Prepare data for the POST request
    const donationData = {
      bloodgroup: bloodgroup,
      age: parseInt(age),
      unit: parseInt(unit),
      donor: donor_id,
    };
    console.log(donationData)

    fetch('https://lifesafe-bank.onrender.com/donor/donatlist/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(donationData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        Swal.fire({
          title: "Congrate",
          text: 'Successfully donate blood',
          icon: "success",
          confirmButtonText: 'ok'
        });
        // update stock unit
        let blood_id = 1
        if(data.bloodgroup == "A+" || data.bloodgroup=="a+"){
          blood_id = 1
        }
        else if(data.bloodgroup == "A-" || data.bloodgroup=="a-"){
          blood_id = 2
        }
        else if(data.bloodgroup == "B+" || data.bloodgroup=="b+"){
          blood_id = 3
        }
        else if(data.bloodgroup == "B-" || data.bloodgroup=="b-"){
          blood_id = 4
        }
        else if(data.bloodgroup == "O+" || data.bloodgroup=="o+"){
          blood_id = 5
        }
        else if(data.bloodgroup == "O-" || data.bloodgroup=="o-"){
          blood_id = 6
        }
        else if(data.bloodgroup == "AB+" || data.bloodgroup=="AB-"){
          blood_id = 7
        }
        else if(data.bloodgroup == "AB-" || data.bloodgroup=="ab-"){
          blood_id = 8
        }

        // Specify the updated data
     

        // get particular  blood group previous blood unit
        fetch(`https://lifesafe-bank.onrender.com/blood/list/${blood_id}/`)
          .then((res) => res.json())
          .then((data) => {
            const updatedData = {
              unit : data.unit + donationData.unit
            }
             // Make a PATCH request to update the data
            fetch(`https://lifesafe-bank.onrender.com/blood/list/${blood_id}/`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
                  // Add any other headers if required (e.g., authorization headers)
              },
              body: JSON.stringify(updatedData)
            })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
              })
            .then(data => {
              // Handle the updated data
              console.log('Updated data:', data);
            })
            .catch(error => {
            // Handle errors
            console.error('Error updating data:', error);
          });

        })
        .catch((err) => console.log(err))
          
       
        // window.location.href = "index.html";

      })
    .catch((error) => {
    console.error('Error:', error);
  });
};

  
// ###################### show blood_stock.html unit ###################

const getanddisplaystock = () => {
  fetch("https://lifesafe-bank.onrender.com/blood/list/")
  .then((res) => res.json())
  .then((data) => {

    for(i=0; i<data.length; i++){
      if(i==0){
        document.getElementById("ap").innerText = data[0].unit
      }
      else if(i==1){
        document.getElementById("an").innerText = data[1].unit
      }
      else if(i==2){
        document.getElementById("bp").innerText = data[2].unit
      }
      else if(i==3){
        document.getElementById("bn").innerText = data[3].unit
      }
      else if(i==4){
        document.getElementById("op").innerText = data[4].unit
      }
      else if(i==5){
        document.getElementById("on").innerText = data[5].unit
      }
      else if(i==6){
        document.getElementById("abp").innerText = data[6].unit
      }
      else if(i==7){
        document.getElementById("abn").innerText = data[7].unit
      }
    }
    
  })
  .catch((err) => console.log(err))
}

getanddisplaystock()

// ######################### Blood request #################

const loadbloodrequest = () => {
  // Get values from form
  const bloodgroup = document.getElementById('bloodgroup').value;
  const patient_name = document.getElementById('patient_name').value;
  const patient_age = document.getElementById('patient_age').value;
  const reason = document.getElementById('reason').value;
  const unit = document.getElementById('unit').value;
  const request_by_patient_id = localStorage.getItem("user_id");
  console.log(request_by_patient_id)
  // Prepare data for the POST request
  const requestData = {
    bloodgroup: bloodgroup,
    patient_name : patient_name,
    reason : reason,
    patient_age: parseInt(patient_age),
    unit: parseInt(unit),
    request_by_patient: request_by_patient_id,
  };
  console.log(requestData)

  fetch('https://lifesafe-bank.onrender.com/blood/requestlist/', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      Swal.fire({
        title: "Congrate",
        text: 'Successfully donate blood',
        icon: "success",
        confirmButtonText: 'ok'
      });
      // update stock unit
      let blood_id = 1
      if(data.bloodgroup == "A+" || data.bloodgroup=="a+"){
        blood_id = 1
      }
      else if(data.bloodgroup == "A-" || data.bloodgroup=="a-"){
        blood_id = 2
      }
      else if(data.bloodgroup == "B+" || data.bloodgroup=="b+"){
        blood_id = 3
      }
      else if(data.bloodgroup == "B-" || data.bloodgroup=="b-"){
        blood_id = 4
      }
      else if(data.bloodgroup == "O+" || data.bloodgroup=="o+"){
        blood_id = 5
      }
      else if(data.bloodgroup == "O-" || data.bloodgroup=="o-"){
        blood_id = 6
      }
      else if(data.bloodgroup == "AB+" || data.bloodgroup=="AB-"){
        blood_id = 7
      }
      else if(data.bloodgroup == "AB-" || data.bloodgroup=="ab-"){
        blood_id = 8
      }

      // Specify the updated data
   

      // get particular  blood group previous blood unit
      fetch(`https://lifesafe-bank.onrender.com/blood/list/${blood_id}/`)
        .then((res) => res.json())
        .then((data) => {
          const updatedData = {
            unit : data.unit - requestData.unit
          }
           // Make a PATCH request to update the data
          fetch(`https://lifesafe-bank.onrender.com/blood/list/${blood_id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers if required (e.g., authorization headers)
            },
            body: JSON.stringify(updatedData)
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
            })
          .then(data => {
            // Handle the updated data
            console.log('Updated data:', data);
          })
          .catch(error => {
          // Handle errors
          console.error('Error updating data:', error);
        });

      })
      .catch((err) => console.log(err))
        
     
      // window.location.href = "index.html";

    })
  .catch((error) => {
  console.error('Error:', error);
});
};
