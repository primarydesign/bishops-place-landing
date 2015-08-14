$(document).ready(function(){
   // $('.close').parent().parent().css('display','none');
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

ax.activate('email-form', 'click', function(){
   this.css('display','block');
});
ax.negate('email-form', 'click', function(){
   this.css('display','none');
});



// (function(){

   var regex = {}, fields = {}, errors = {};

   regex.email = /[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9]+(\.[a-zA-Z]+)+$/;
   regex.tel = /^\(?([0-9]{3})\)?[\-. ]?([0-9]{3})[\-. ]?([0-9]{4})$/;

   fields.field = $('.field');
   fields.email = $('input[type="email"]').not('.noval');
   fields.phone = $('input[type="tel"]').not('.noval');
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
         console.log("clearance === 0");
      } else {
         $('.submit').attr('disabled', '');
         console.log("clearance !== 0");
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

   $('#email-form').on('submit', function (e) {
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

// })();




});
