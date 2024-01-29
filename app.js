const loadbloodstock = () => {
    fetch("https://lifesafe-bank.onrender.com/blood/list/")
    .then((res) => res.json())
    .then((data) => displaybloodstockData(data))
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

