

form.addEventListener('submit', e => {
e.preventDefault();
let name = document.getElementById('name').value;
let desc = document.getElementById('desc').value;
let price = document.getElementById('price').value;
let qty = document.getElementById('qty').value;
//let items = document.getElementById('items').value;

var valueObj = {
    name,
    desc,
    price,
    qty
}
   sendPostRequest(valueObj);
})

async function sendPostRequest(valueObj){
    try{
        const response = await axios.post('https://crudcrud.com/api/016d4173bb11419d8e79c561e4f9a75d/candyInfo', valueObj);
        showDataOnScreen(response.data);
    }
    catch(err){
        console.log(err);
    }
}

function showDataOnScreen(obj){
    const parentItems = document.getElementById('items');
    const listItems = document.createElement('li');
    
    listItems.textContent = `Candy Name is ${obj.name} and ${obj.desc} and price is ${obj.price} and available quantity is ${obj.qty}`
    const buyButton = document.createElement('input');
    buyButton.type = 'button';
    buyButton.value = 'Buy One Quantity';

    listItems.appendChild(buyButton);
    parentItems.appendChild(listItems);

    buyButton.onclick = async () => {
        let qtyy = obj.qty - 1;
     try{  if(qtyy>=0){
            const response = await axios.put(`https://crudcrud.com/api/016d4173bb11419d8e79c561e4f9a75d/candyInfo/${obj._id}`, {
                name: obj.name,
                desc : obj.desc,
                price : obj.price,
                qty : qtyy
            });
            obj.qty = qtyy
            listItems.textContent = `Candy Name is ${obj.name} and ${obj.desc} and price is ${obj.price} and available quantity is ${obj.qty}`
            listItems.appendChild(buyButton);
            parentItems.appendChild(listItems);
        }else{
              alert("Chocolate is not available")
        }
    }
 catch(err){
    alert(err);
 }

}
}