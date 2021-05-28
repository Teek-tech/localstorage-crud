// Developed by Tochukwu Odeme ** https://github.com/teek-tech
$(document).ready(function() {
    //create local storage to create new storage and add to cart for specific user device
    $('.add-to-cart').on('click', function(e){
        var productID = $(this).attr('data-id');
        var price = $(this).attr('data-price');
        var product = $(this).attr('data-product');
        // console.log(data);
        //initialize shopping basket
        let shoppingCart = [];

        //get cart items if user have added items to cart before
       if (localStorage.getItem("MezitoxShop")) {

        shoppingCart = JSON.parse(localStorage.getItem('MezitoxShop'))
        
       }else{
           //create new storage for unknown user
        localStorage.setItem("MezitoxShop", "[Empty Cart]");
       }


        //Find index of specific object using findIndex method.    
        getProductID = shoppingCart.findIndex((product => product.productID == productID));
        if(shoppingCart[getProductID]){
            console.log("You have already added this item t cart! " + shoppingCart[getProductID].price)
            $('#errorText').text('You have already added this item t cart!');
            $('#errorMsg').show();
        }else{
            shoppingCart.push({
                'productID' : productID,
                'price' : price,
                'product' : product,
                'quantity' : 1
                })
        }
        //Log object to Console.
        console.log("Before update: ", shoppingCart[getProductID])



      // console.log("yass" + shoppingCart);
       //add or update existing items in cart
      

        //retrieve updated cart items.
        localStorage.setItem("MezitoxShop", JSON.stringify(shoppingCart));
        //console.log("se itmes: " + shoppingCart);
    });

    //display items
    const cartItems =  JSON.parse(localStorage.getItem("MezitoxShop"));
    console.log(cartItems);
    if(cartItems && cartItems.length > 0){
       // console.log("yesss");

        for(var i=0; i<cartItems.length; i++){
            var id = cartItems[i].productID;
            var product = cartItems[i].product;
            var price = cartItems[i].price;
            var quantity = cartItems[i].quantity;

            var tr_str = "<tr>" +
              "<td>" + id +  "</td>" +
              "<td>" + product + "</td>" +
              "<td> <input type='number' value=" + quantity + " id='number'></td>" +
              "<td> "+ price + "</td>" +
              "<td><i class='fa fa-trash removeProduct' style='color:red' id="+id+"></i></td>" +
            "</tr>";

            $("#shopTable tbody").append(tr_str);
         }
    }

        //remove item from cart by id
        $("#shopTable tbody").on('click', '.removeProduct', function(){
        console.log(this.id)
        let shoppingCart = JSON.parse(localStorage.getItem('MezitoxShop'));
        let filteredProducts = shoppingCart.filter(product => product.productID !== this.id );
        localStorage.setItem('MezitoxShop', JSON.stringify(filteredProducts));
        })

})






// //Initailize array of objects.
// let myArray = [
//     {id: 0, name: "Jhon"},
//     {id: 1, name: "Sara"},
//     {id: 2, name: "Domnic"},
//     {id: 3, name: "Bravo"}
//   ],
      
//   //Find index of specific object using findIndex method.    
//   objIndex = myArray.findIndex((obj => obj.id == 1));
  
//   //Log object to Console.
//   console.log("Before update: ", myArray[objIndex])
  
//   //Update object's name property.
//   myArray[objIndex].name = "Laila"
  
//   //Log object to console again.
//   console.log("After update: ", myArray[objIndex])