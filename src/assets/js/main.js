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


var today, regex = {}, fields = {}, check = {},
val = $('.field:not(.noval)'),
req = $('.field[required]'),
noval = $('.filed.noval'),
noreq = $('.filed:not([required])'),
submit = $('.submit[type="submit"]');

regex['email'] = /[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9]+(\.[a-zA-Z]+)+$/;
regex['tel'] = /^\(?([0-9]{3})\)?[\-. ]?([0-9]{3})[\-. ]?([0-9]{4})$/;

fields.email = $('.field[type="email"]');
fields.phone = $('.field[type="tel"]');
fields.movein = $('.field[name="movein"]');

check['email'] = function(input) {
   if (input.search(regex['email']) === 0) return true;
   else return false;
};
check['tel'] = function(input) {
   if (input.search(regex['tel']) === 0) return true;
   else return false;
};

/* populate move-in options */
(function(){
   var options, option, today, months, month, i = 0;
   months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
   options = document.createDocumentFragment();
   today = new Date();

   for (var i=0; i < 12; i++) {
      month = today.getMonth() + i;
      if (month > 11) month -= 12;
      option = document.createElement('option');
      option.setAttribute('value', months[month]);
      option.textContent = months[month];
      options.appendChild(option);
   }
   fields.movein.append(options);
})();





















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

$('#contact-form').on('submit', function (e) {
   e.preventDefault();
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
});



});
