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
   var self = this;
   self.css('display','block');
   setTimeout(function(){
      self.css('opacity','1');
   },1);
});
ax.negate('contact-form', 'click', function(){
   var self = this;
   this.css('opacity','0');
   setTimeout(function(){
      self.hide();
   },300);
});

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

/**********************************/
/* FORM VALIDATION AND SUBMISSION */
/**********************************/
(function(){
   var criteria = {};
   criteria['email'] = function(value) {
      return (value.search(/[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9]+(\.[a-zA-Z]+)+$/) === 0);
   }
   criteria['tel'] = function(value) {
      return (value.search(/^\(?([0-9]{3})\)?[\-. ]?([0-9]{3})[\-. ]?([0-9]{4})$/) === 0);
   }

   var validate = function(input) {
      var value = input.val() || "";
      var clearance = 0;
      var c;

      /* clean input value */
      value = value.trim();

      /* run value through validation */
      if (value === "") {
         if (input.is('[required]')) {
            input.removeClass('valid').addClass('invalid');
            ++clearance;
         } else {
            input.removeClass('invalid');
         }
      } else {
         if (input.is('.noval')) {
            input.removeClass('invalid');
            if (input.is('[required]')) {
               input.addClass('valid');
            }
         } else {
            for (c in criteria) {
               if (input.attr('type') === c || input.hasClass(c)) {
                  if (!criteria[c](value)) ++clearance;
               }
            }
            if (clearance === 0) {
               input.removeClass('invalid').addClass('valid');
            } else {
               input.removeClass('valid').addClass('invalid');
            }
         }
      }

      /* return validation results */
      return clearance;

   };

   $('.field').on('focusout', function(){
      validate($(this));
   });

   $('.submit').on('click', function (event){
      event.preventDefault();

      var clearance = 0;

      $('.field').each(function(){
         clearance += validate($(this));
      });

      if (clearance === 0) {
         $(this).closest('form').submit();
      }

   });

   $('#contact-form').on('submit', function (event) {
      event.preventDefault();
      $('.submit').prop('disabled',true).val("SENDING");

      $.ajax({
         type: 'POST',
         url: 'submit.php',
         data: $(this).serialize(),
         success: function (data) {
            $('#contact-form').delay(300).hide()
            .siblings('#submission-response').addClass('active');
         },
         error: function () {
            $('.submit').removeAttr('disabled');
         }
      });
   });
})();


}); //DOCUMENT::END
