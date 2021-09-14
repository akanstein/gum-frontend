function showLoader() {
  $(".splash").show();
}

function hideLoader() {
  $(".splash").hide();
}

//fetch product
var setProduct;

function getProduct() {
  showLoader();
  $.ajax("https://gum-review.herokuapp.com/products/mvp", {
    dataType: "json",
    // timeout: 500,
    success: function (data, status, xhr) {
      var product = data.data;
      setProduct = product;
      $("#prd-name").html(product.name);
      $("#prd-rating").html(product.overallRating || 0);
      $("#prd-review").rateYo({
        starWidth: "25px",
        rating: product.overallRating || 0,
        readOnly: true,
      });

      // render product reviews
      if (product.reviews && product.reviews.length) {
        $("#prd-reviews").empty();
        product.reviews.forEach((item, i) => {
          $("#prd-reviews").append(
            `<div class="flex items-center mb-3">
          <div id="rt${i}"></div>
          <p class="font-bold text-base ml-2">${item.rating},</p>
          <p class="text-gray-400 text-sm ml-1">${item.review}</p>
        </div>`
          );
          $(`#rt${i}`).rateYo({
            starWidth: "20px",
            rating: item.rating || 0,
            readOnly: true,
          });
        });
      } else {
        $("#prd-reviews").html(
          `<div class="">
        <p class="text-gray-400 text-sm">
          No reviews for this product
        </p>
      </div>`
        );
      }
      hideLoader();
    },
    error: function (jqXhr, textStatus, errorMessage) {
      $("#root").html(
        `<p id='error' class="absolute top-10 left-10 text-red-400 text-base p-3 rounded bg-gray-100">Error! ${errorMessage}</p>`
      );
      setTimeout(() => {
        $("#error").remove();
      }, 5000);
      hideLoader();
    },
  });
}

getProduct();

var setRating = 0;

function showForm() {
  $("#modalForm").css("display", "flex");

  $(`#review-rating`).rateYo({
    starWidth: "25px",
    halfStar: true,
    onSet: function (rating, instance) {
      setRating = rating;
    },
  });
}

function hideForm() {
  $("#modalForm").hide();
}

function submitReview() {
  showLoader();

  $.ajax(`https://gum-review.herokuapp.com/products/review/${setProduct.id}`, {
    type: "POST",
    dataType: "json",
    data: { rating: setRating, review: $("#review-input").val() },
    success: function (data, status, jqXHR) {
      getProduct();
      hideForm();
      hideLoader();
    },
    error: function (jqXhr, textStatus, errorMessage) {
      $("#root").html(
        `<p id='error' class="absolute top-10 left-10 text-red-400 text-base p-3 rounded bg-gray-100">Error! ${errorMessage?.message}</p>`
      );
      setTimeout(() => {
        $("#error").remove();
      }, 5000);
      hideLoader();
    },
  });
}
