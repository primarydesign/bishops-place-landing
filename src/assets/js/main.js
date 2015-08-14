$(document).ready(function(){


var ax = {};
ax.activate = function($id, $events, $callback) {
   $('[data-ax='+$id+']').on($events, function(){
      var element;
      if ($('[data-ax-catch="'+$id+'"]').length === 0) element = $('#'+$id);
      else element = $('[data-ax-catch="'+$id+'"]');
      element.removeClass('ax-negate').addClass('ax-active');
      if ($callback) $callback.call(element, $id);
   });
};
ax.negate = function($id, $events, $callback) {
   $('[data-ax-negate='+$id+']').on($events, function(){
      var element;
      if ($('[data-ax-catch="'+$id+'"]').length === 0) element = $('#'+$id);
      else element = $('[data-ax-catch='+$id+']');
      element.removeClass('ax-active').addClass('ax-negate');
      if ($callback) $callback.call(element, $id);
   });
}

ax.activate('contact-form', 'click', function(){
   this.css('display','block');
});
ax.negate('contact-form', 'click', function(){
   this.css('display','none');
});



// var today, regex = {}, fields = {}, check = {},
// val = $('.field:not(.noval)'),
// req = $('.field[required]'),
// noval = $('.filed.noval'),
// noreq = $('.filed:not([required])'),
// submit = $('.submit[type="submit"]');
//
// regex['email'] = /[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9]+(\.[a-zA-Z]+)+$/;
// regex['tel'] = /^\(?([0-9]{3})\)?[\-. ]?([0-9]{3})[\-. ]?([0-9]{4})$/;
//
// fields.email = $('.field[type="email"]');
// fields.phone = $('.field[type="tel"]');
// fields.movein = $('.field[name="movein"]');

/* populate move-in options */
(function(){
   var $movein = $('.field[name="movein"]');
   var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
   var optionsFragment = document.createDocumentFragment();
   var month = (new Date()).getMonth();
   var option, m, i = 0;

   for (; i < 12; i++) {
      m = month + i;
      if (m > 11) m -= 12;
      option = document.createElement('option');
      option.setAttribute('value', months[m]);
      option.textContent = months[m];
      optionsFragment.appendChild(option);
   }

   $movein.append(optionsFragment);
})();

/* disable form submission */
(function(){
   submit.attr('disabled', 'disabled');
});

var regex = {}, fields = {}, errors = {};

regex.email = /[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9]+(\.[a-zA-Z]+)+$/;
regex.tel = /^\(?([0-9]{3})\)?[\-. ]?([0-9]{3})[\-. ]?([0-9]{4})$/;

fields.field = $('.field');
fields.email = $('input[type="email"]').not('.noval');
fields.phone = $('input[type="tel"]').not('.noval');
fields.movein = $('select#move-in');
fields.novalidate = $('.field.noval');
fields.required = $('.field[required]');
fields.notreq = $('.field').not('[required]');
fields.submit = $('input[type="submit"].submit');



/**********************************/
/* FORM VALIDATION AND SUBMISSION */
/**********************************/
var select = {}, states = {};
req = '.field[required]';
val = '.field:not(.noval)';
noreq = '.field:not([required])';
noval = '.field.noval';
valid = '.valid';
invalid = '.invalid';
touched = '.invalid';

fields.required.focusout(function () {
   if ($(this).val() !== "") {
      if ($(this).hasClass('noval')) {
         $(this).addClass('valid').removeClass('invalid');
      } else {
         var $id = $(this).attr('type');

         if ($(this).val().search(regex[$id]) === 0) {
            $(this).addClass('valid').removeClass('invalid');
         } else {
            $(this).addClass('invalid').removeClass('valid');
         }
      }
   } else {
      $(this).addClass('invalid').removeClass('valid');
   }
});

fields.notreq.focusout(function () {
   if ($(this).val().length === 0) {
      $(this).removeClass('invalid');
   }
});

fields.email.focusout(function () {
	if ($(this).val().search(regex.email) === 0) {
		$(this).addClass('valid').removeClass('invalid');
	} else {
		$(this).addClass('invalid').removeClass('valid');
	}
});

function enableSubmit() {
   var $reqs = $('[required]'),
      $vals = $('.field:not(.noval)'),
      $reqsValid = $('[required].valid'),
      $valsNotInvalid = $('.field:not(.noval):not(.invalid)'),
      clearance = 0;

   if ($reqs.length !== $reqsValid.length) { clearance += 1; }
   if ($vals.length !== $valsNotInvalid.length) { clearance += 1; }

   if (clearance === 0) {
      $('.submit').removeAttr('disabled');
   } else {
      $('.submit').attr('disabled', '');
   }
}

$('.submit').mouseenter(function () {
   var $reqs = $('[required]'),
      $vals = $('.field:not(.noval)'),
      $reqsValid = $('[required].valid'),
      $valsNotInvalid = $('.field:not(.noval):not(.invalid)'),
      clearance = 0;

   if ($reqs.length !== $reqsValid.length) { clearance += 1; }
   if ($vals.length !== $valsNotInvalid.length) { clearance += 1; }

   if (clearance === 0) {
      $(this).removeAttr('disabled');
   } else {
      $(this).attr('disabled', '');
   }
});
fields.field.mouseleave(function(){
   enableSubmit();
});

$('.submit').on('click', function(){

});
$('#contact-form').on('submit', function (e) {
   e.preventDefault();

   var clearance = 0;

   // all required fields are filled
   $('.field[required]').each(function() {
      if ($(this).val() === "") ++clearance;
   });

   // all validate fields are valid

   if (clerance === 0) {
      $.ajax({
         type: 'POST',
         url: 'submit.php',
         data: $(this).serialize(),
         beforeSend: function () {
            $('.submit').attr('disabled', '').val('SENDING...');
         },
         success: function () {
            $('.submit').val('THANK YOU');
         },
         error: function () {
            $('.submit').removeAttr('disabled');
         }
      });
   }
});



});
