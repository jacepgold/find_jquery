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
    var button = '<button class="remove">x</button>';
    inCart.append('<li class="entry" ' + data + '>' + installment + ' - ' + price + button + '</li>');
    /* inCart.append creates this
      <li class="entry" data-price="10.00" data-plan="monthly">
        monthly - 10.00 /mo
        <button class="remove">x</button>
      </li>
    */
    updateTotal();
  }); // end add to cart


  function updateTotal() {
    var total = 0.00;

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
});