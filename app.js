// //Global empty error to get the data

// let global = []
// // first Method for Api
// function fromAPi(){
//     fetch('https://fakestoreapi.com/products')
// .then((response) => {
//     // Return the promise returned by response.json()
//     return response.json();
// })
// .then((jsonData) => {
//     // jsonData contains the resolved JSON data
//     global  = jsonData
//     console.log(global);
//     // Call a function to use the data after it's been fetched
//     useDataFromApi();
  
// })
// .catch((error) => {
//     // Handle any errors that might occur during the fetch
//     console.error('Error fetching data:', error);
// });
   
// }

// now use resources and data from api
function useDataFromApi() {
    // Access the global variable here after it's been populated
    let images = document.createElement('img');
    images.setAttribute("src", global[0].image);
    document.body.appendChild(images)
    console.log(("src", global[0].image))
}

// fromAPi()


// // second Methond for Api
// fetch('https://fakestoreapi.com/products')
//             .then(res=>res.json())
//             .then(resolvejson=>console.log(resolvejson))



////=============Now second method by Async=============

async function AsyncMethod() {
    try {
        const resp = await fetch('https://fakestoreapi.com/products');
        const ApiData = await resp.json();
        console.log(ApiData);
        console.log(ApiData[1].image);

        let productHtml = ''; // Initialize an empty string to accumulate HTML
        // for card loops
        ApiData.forEach((items, index) => {
            productHtml += `
                <div class="col-md-3">
                    <div class="card" style="width: 18rem;" card-category= "${items.category}">
                        <img src="${items.image}" class="card-img-top card-images" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${items.title}</h5>
                            <h6 class="price"> $ ${items.price}</h6>
                            <p class="card-text">${items.description}</p>
                            <button class="btn btn-primary" data-image="${items.image}" data-price="${items.price}">Add to cart</button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        // Set the inner HTML of .product element after the loop
        document.querySelector(".product").innerHTML = productHtml;
        // //---------------// card ends---------------------

        // ///===========Add to cart===========================
        // Add event listeners to the buttons after setting inner HTML
        let btns = document.querySelectorAll(".btn");
        btns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                // Retrieve data attributes for image and price
                let Card_image = btn.getAttribute("data-image");
                let Card_price = btn.getAttribute("data-price");
                addtocart(Card_image, Card_price);
                // another second way to get data
                let imgs= e.target.closest('.card').childNodes[1].getAttribute("src")
                console.log(imgs)
            });
        });
        ///////=========== Add to cart end ===================////


////======================product items start ==========================

        // for categories button
        // Extracting unique categories
        const uniqueCategories = [...new Set(ApiData.map(item => item.category))];

        // Generating buttons for each unique category
        let CategoriesButton = "";
        uniqueCategories.forEach(category => {
            CategoriesButton += `<button class="btn-filter" >${category}</button>`;
        });        
        document.querySelector(".categories").innerHTML += CategoriesButton
    ////======================product items end ==========================
    
    ////============================product filters start=======================
    document.querySelectorAll('.btn-filter').forEach((filterBtn ,index)=>{
        filterBtn.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-filter')) {
                const category = e.target.textContent // Get the text content of the clicked button
                filterProductsByCategory(category); // Call function to filter products by category
            }
        })
     
    })

  

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function addtocart(image, price) {
    console.log("Product image: " + image + ", Product price: " + price);
}


function filterProductsByCategory(category) {
    // Get all products
    const products = document.querySelectorAll('.product .card');
    console.log(category + "cat")
    // Loop through each product
    products.forEach(product => {
        // Get product category
        const productCategory = (product.getAttribute("card-category"))
        console.log(productCategory)
        // Check if the product belongs to the clicked category
        if (category === "All" || productCategory === category) {
            product.style.display = 'block'; // Show the product
        } else {
            product.style.display = 'none'; // Hide the product
        }
      
    });
}

AsyncMethod();

