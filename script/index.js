const { log } = console;
log("is this thing on?")
//write a function called makeBreakfast
//log(eggs);
const makeBreakfast = (bacon) => {
    const pancakes = bacon.results[17].image;
    localStorage.setItem('grit', pancakes);
    const oatMeal = localStorage.getItem('grit');
    log(oatMeal);
    const URL = bacon.results[17].image;
    log(URL);
    
}
const makeLunch = () => {
    const URL = localStorage.getItem('grit');
    document.body.style.backgroundImage = `url('${URL}')`;
}

//fetch something
//3 step
// go to a url
//// get that promise 
// turn that into a JSON object

const URL = `https://rickandmortyapi.com/api/character`;
fetch(URL)
.then((response) => {
    return response.json()
})
.then((eggs)=> {
    makeBreakfast(eggs)
    makeLunch()
})
