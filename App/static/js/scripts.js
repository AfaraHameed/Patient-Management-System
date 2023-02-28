// 1) Script to auto close the alert after 3s
window.setTimeout(function () {
  $(".alert")
    .fadeTo(500, 0)
    .slideUp(500, function () {
      $(this).remove();
    });
}, 3000);

/*var active= '.links';
$(active).on('click' , function(){
    $(active).removalClass('active');
    $(this).addClass('active');
});*/

// 2)Script to validate all input

function validateEmail(email) {
  var regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
}

function validAll() {
  var name = $("#name").val();
  var phone = $("#phone").val();
  var email = $("#email").val();
  var age = $("#age").val();
  var gender = $("#gender").val();

  if (name == "") {
    swal("oops!!!", "name field can't be empty");
    return false;
  } else if (name.split(' ').length<2 ){
    swal("oops!!!", "last name is required");
    return false;
  } else if (name==name.toUpperCase()){
    swal("oops!!!", "name field can not be uppercase","info");
    return false;
  } else if (phone == "") {
    swal("oops!!!", "phone field can't be empty");
    return false;
  } else if (email == "") {
    swal("oops!!!", "email field can't be empty");
    return false;
  } else if (!validateEmail(email)) {
    swal("oops!!!", "put a valid email address", "error");
    return false;
  } else if (age == "") {
    swal("oops!!!", "age field can't be empty");
    return false;
  } else if (gender == "") {
    swal("oops!!!", "gender field can't be empty");
    return false;
  } else {
    return true;
  }
}
$("#btn-add").bind("click", validAll);

// 3) Script (name field) only letter is allowed

$(document).ready(function () {
  // only letter
  jQuery('input[name="name').keyup(function () {
    var letter = jQuery(this).val();
    var allow = letter.replace(/[^a-zA-Z _]/g, "");
    jQuery(this).val(allow);
  });
  //prevent starting with space
  $("input").on("keypress", function (e) {
    if (e.which == 32 && !this.value.length) e.preventDefault();
  });
});

//Script to put first letter capitalized
$("#name").keyup(function () {
  var txt = $(this).val();
  $(this).val(
    txt.replace(/^(.)|\s(.)/g, function ($1) {
      return $1.toUpperCase();
    })
  );
});

//Script to put email lowe case
$(document).ready(function () {
  $("#email").keyup(function () {
    this.value = this.value.toLowerCase();
  });
});

//script to allow only numbers in age
$("#age").keyup(function () {
  if (!/^[0-9]*$/.test(this.value)) {
    this.value = this.value.split(/[^0-9.]/).join("");
  }
});
//phone mask
$(document).ready(function () {
  $("#phone").inputmask("(99) 99999-99999", {
    onincomplete: function () {
      swal("Ooops!! incomplete phone", "error");
      return false;
    },
  });
});


// Prevent starting age field with 0

$("#age").on("input",function(){
  if(/^0/.test(this.value)){
    this.value= this.value.replace(/^0/, "")
  }
})

//prevent user registering full name if more than two name

$(document).ready(function(){
   $("#name").keyup(function(){
    var name=$("#name").val()
    if(name.split(' ').length==3){
      swal("Ooops!! put only first and last name", "info");
      $("#name").val("")
      return false;
    }
})
})

// Time running at realtime
setInterval(function(){
  var date=new Date();
  $("#clock").html(
    date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
    )
},500)

//If no patient when searching show a message

var verify = $('#chk_td').length;
if(verify==0){
  $('#no_patient').text("No patient found");
  }

  