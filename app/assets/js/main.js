$(document).ready(function(){var a={};a.activate=function(a,t,e){$("[data-ax="+a+"]").on(t,function(){var t;t=$(0===$('[data-ax-catch="'+a+'"]').length?"#"+a:'[data-ax-catch="'+a+'"]'),t.removeClass("ax-negate").addClass("ax-active"),e&&e.call(t,a)})},a.negate=function(a,t,e){$("[data-ax-negate="+a+"]").on(t,function(){var t;t=$(0===$('[data-ax-catch="'+a+'"]').length?"#"+a:"[data-ax-catch="+a+"]"),t.removeClass("ax-active").addClass("ax-negate"),e&&e.call(t,a)})},a.activate("contact-form","click",function(){var a=this;a.css("display","block"),setTimeout(function(){a.css("opacity","1")},1)}),a.negate("contact-form","click",function(){var a=this;this.css("opacity","0"),setTimeout(function(){a.hide()},300)}),function(){for(var a,t,e=$('.field[name="movein"]'),i=["January","February","March","April","May","June","July","August","September","October","November","December"],n=document.createDocumentFragment(),s=(new Date).getMonth(),c=0;12>c;c++)t=s+c,t>11&&(t-=12),a=document.createElement("option"),a.setAttribute("value",i[t]),a.textContent=i[t],n.appendChild(a);e.append(n)}(),function(){var a={};a.email=function(a){return 0===a.search(/[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9]+(\.[a-zA-Z]+)+$/)},a.tel=function(a){return 0===a.search(/^\(?([0-9]{3})\)?[\-. ]?([0-9]{3})[\-. ]?([0-9]{4})$/)};var t=function(t){var e,i=t.val()||"",n=0;if(i=i.trim(),""===i)t.is("[required]")?(t.removeClass("valid").addClass("invalid"),++n):t.removeClass("invalid");else if(t.is(".noval"))t.removeClass("invalid"),t.is("[required]")&&t.addClass("valid");else{for(e in a)(t.attr("type")===e||t.hasClass(e))&&(a[e](i)||++n);0===n?t.removeClass("invalid").addClass("valid"):t.removeClass("valid").addClass("invalid")}return n};$(".field").on("focusout",function(){t($(this))}),$(".submit").on("click",function(a){a.preventDefault();var e=0;$(".field").each(function(){e+=t($(this))}),0===e&&$(this).closest("form").submit()}),$("#contact-form").on("submit",function(a){a.preventDefault(),$(".submit").prop("disabled",!0).val("SENDING"),$.ajax({type:"POST",url:"submit.php",data:$(this).serialize(),success:function(){$("#contact-form").delay(300).hide().siblings("#submission-response").addClass("active")},error:function(){$(".submit").removeAttr("disabled")}})})}()});