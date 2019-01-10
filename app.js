$(document).ready( function() {
  $('#plan').on('change', function() { // Do this when the user makes a change
    var priceText; // we will store the text to display here

    switch(this.value) { // Based on the value the user chose:
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

    // Change the <h1 id="price"> to be equal to priceText
    $('#price').text(priceText);
  });

  $('#add').on('click', function () {
    var plan = $('#plan')
    var installment = plan.val();
    var price = $('#price').text();
    var inCart = $('#in_cart');
    var numeric = price.replace(/[[A-Za-z$\/\s]/g, '')
    var data = 'data-price="' + numeric + '" data-plan="' + installment + '"';
    inCart.append('<li class="entry"' + data + '>' + installment + ' - ' + price + '</li>')
    
    updateTotal();
  });


  function updateTotal() {
    var total = 0;

    $('.entry').each(function(index, entry) {
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
    });

    $('#total').text('$' + total);
  }
});