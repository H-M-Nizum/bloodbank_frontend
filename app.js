const loadtution = () => {
    fetch("https://lifesafe-bank.onrender.com/blood/list/")
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
}
loadtution()

