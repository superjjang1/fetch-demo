const{ log }= console;
log("is this working?")

/*1. draw all the email addresses associated with the coffee orders 
to the page in a list
2. when you click a coffee order, draw the details of the order to 
another part of the page
3. store the coffee data in localStorage
4. load the coffee data when the page loads, only retrieving it 
if there is no data in localStorage
5. add links with filtering by the first letter of the email 
(or coffee order, your choice)
that’s all for now, thanks y’all */
const start = () =>{
    fetchTheCustomers()
    fetchTheOrders()
    fetchTheDrinks()
    setEmailtoList()
    
};
document.addEventListener('DOMContentLoaded', start);

const URLCustomers = `http://my-little-cors-proxy.herokuapp.com/https://meanmom.jonathan-ray.com/customers`;
const description = document.getElementById(`description`)

async function fetchTheCustomers() {
    const fetchedData = await fetch(URLCustomers)
    const customerss = await (fetchedData.json())
    const customers = customerss.results
    const custoEmails = getEmail(customers);
    log(custoEmails);
    
    
    localStorage.setItem(`Customers`,JSON.stringify(customers))
    localStorage.setItem(`Emails`,JSON.stringify(custoEmails))
};

const getEmail = (customers) => {
    return customers.map(customer=> customer.email);
};

const getName = (id) => {
    let customers = JSON.parse(localStorage.getItem('Customers'));
    let name;
    customers.forEach(customer => {
        if (customer['id']== id){
        console.log(customer.name)
            name = customer.name    }
    });
    return name;
    
}



const setEmailtoList = () => {
    var ul =  document.createElement(`ul`);
    
    const custoEmails = JSON.parse(localStorage.getItem(`Emails`));
    custoEmails.forEach((email,index) => {
        let li = document.createElement('li')
        li.innerHTML = email;
        li.setAttribute(`data-cust`,`${index+1}`)
        li.addEventListener('click', listClick)
        ul.append(li);
        
    });
    document.body.prepend(ul)
};

const listClick =  (e) => {
    description.innerHTML = ``;
    log(listClick)
    let targetID = e.target.getAttribute(`data-cust`)
    let orderList = getOrderbyCusID(targetID);
    let name = getName(targetID)
    console.log(name)
    console.log(orderList[0])
    orderList.forEach(element =>{
        let drinkList = getDrinkbyID(element[`drink_id`])
        description.innerHTML += `<ul>${name}<li>size: ${element['size']}</li><li>date: ${element['date']}</li><li> drink: ${drinkList[0][`recipe`]}</li></ul><br>`;
    });
    
};

const URLDrinks = `http://my-little-cors-proxy.herokuapp.com/https://meanmom.jonathan-ray.com/drinks`;
async function fetchTheDrinks() {
    const fetchedData = await fetch(URLDrinks)
    const drinkss = await (fetchedData.json())
    const drinks = drinkss.results
    localStorage.setItem(`drinks`,JSON.stringify(drinks))
};
const getDrinkbyID = (id) => {
    
    let drinkList = [];
    let drinks = JSON.parse(localStorage.getItem(`drinks`))
    drinks.forEach(drink => {
        if(drink[`id`] == id) {
            drinkList.push(drink)
        };
    });
    
    return drinkList
};
const URLOrders = `http://my-little-cors-proxy.herokuapp.com/https://meanmom.jonathan-ray.com/orders`;
async function fetchTheOrders() {
    const fetchedData = await fetch(URLOrders)
    const orderss = await (fetchedData.json())
    const orders = orderss.results
    localStorage.setItem(`orders`,JSON.stringify(orders))
    
    
};

const getOrderbyCusID = (id) => {
    
    let orderList = [];
    let orders = JSON.parse(localStorage.getItem(`orders`))
    orders.forEach(order => {
        if(order[`customer_id`] == id) {
            orderList.push(order)
        };
    });
    
    return orderList
};
// document.addEventListener('DOMContentLoaded', start);
