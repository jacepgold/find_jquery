$(document).ready( function() {
  $("#plan").on('click', function() {
    var priceText;

    switch(this.value) {
      case 'monthly':
        priceText = '$10.00 /mo';
        break;
      case 'quarterly':
        priceText = '$9.00 /mo';
        break;
      case 'yearly':
        priceText = '$7.00 /mo';
        break;
    }

    $("#price").text(priceText);
  }); // end change price


  $("#add").click(function () {
    // $("#in_cart").append("<p class='test'>#in_cart " + (++counter) + "</p>");
    var plan = $("#plan");
    var installment = plan.val();
    var price = $('#price').text();
    var inCart = $("#in_cart");
    var numeric = price.replace(/[A-Za-z$\/s]/g, '');
    var data = 'data-price="' + numeric + '" data-plan="' + installment + '"';
    // data = data-price="10.00" data-plan="monthly"
    var button = '<button class="remove">Remove</button>';
    inCart.append('<li class="entry" ' + data + '>' + installment + ' - ' + price + button + '</li>');
    /* inCart.append creates this
      <li class="entry" data-price="10.00" data-plan="monthly">
        monthly - 10.00 /mo
        <button class="remove">x</button>
      </li>
    */
    updateTotal();

    // If cart is hidden, show it
    var button = $('#display_cart');
    if ( $('#display_cart').text() === 'Display Cart') {
      button.text('Hide Cart');
      $('#cart').slideToggle();
    }
  }); // end add to cart


  function updateTotal() {
    var total = 0.00;

    // Allow the user to clear cart
    // We don't want the button to display if cart is empty
    var entries = $('.entry');
    if (entries.length)
      $('#empty').show();
    else
      $('#empty').hide();

    $('.entry').each( function(index, entry) {
      var data = $(entry).data();
      var price = parseFloat(data.price);
      var installment = data.plan;

      switch(installment) {
        case 'monthly':
          total += price;
          break;
        case 'quarterly':
          total += price * 4;
          break;
        case 'yearly':
          total += price * 12;
          break;
      }
    }); // end $('.entry').each()
    $("#total").text('$' + total);
  } // end updateTotal();


  $('#empty').on('click', function () {
    $('#in_cart').empty();
    updateTotal();
  }); // end empty cart


  $('#in_cart').on('click', 'button.remove', function () {
    $(this).parents('li').remove();
    updateTotal();
  }); // end remove item

  $('#display_cart').on('click', function() {
    var cart = $('#cart');
    var button = $(this); // this being what user just clicked to get here
    if (button.text() === 'Hide Cart')
      button.text('Show Cart');
    else
      button.text('Hide Cart');

    cart.slideToggle();    
  }); // end display cart button onclick function

  $('#purchase').on('click', function () {
    $('#complete')
      .html('<h2>PURCHASE COMPLETE<h2>')
      .css({
        'background-color': '#bca',
        'width': '25%',
        'border': '1px solid green',
        'text-align': 'center'
      })
      .animate({
        width: '70%',
        opacity: 0.4,
        marginLeft: '100px',
        fontSize: '3em',
        borderWidth: '10px',
      }, 1500);
  });

});