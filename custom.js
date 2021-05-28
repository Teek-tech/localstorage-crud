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
            $('#errorText').text('You have already added this item to cart!');
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
              "<td> <input type='number' value=" + quantity + " id="+id+" class='updateProduct'></td>" +
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


         //update item from cart by id
         $("#shopTable tbody").on('change', '.updateProduct', function(){
            //Find index of specific object using findIndex method.
             let shoppingCart = JSON.parse(localStorage.getItem('MezitoxShop'));    
                updateCart = shoppingCart.findIndex((product => product.productID == this.id));
                //update quantity
                shoppingCart[updateCart].quantity = this.value
                
                if(updateCart){
                    $('#successText').text('Quantity updated successfullly.');
                    $('#successMsg').show();
                }
                //save updates
             localStorage.setItem('MezitoxShop', JSON.stringify(shoppingCart));
            })

})