$(document).ready(function(){var a={};a.activate=function(a,e,t){$("[data-ax="+a+"]").on(e,function(){var e;e=$(0===$('[data-ax-catch="'+a+'"]').length?"#"+a:'[data-ax-catch="'+a+'"]'),e.removeClass("ax-negate").addClass("ax-active"),t&&t.call(e,a)})},a.negate=function(a,e,t){$("[data-ax-negate="+a+"]").on(e,function(){var e;e=$(0===$('[data-ax-catch="'+a+'"]').length?"#"+a:"[data-ax-catch="+a+"]"),e.removeClass("ax-active").addClass("ax-negate"),t&&t.call(e,a)})},a.activate("contact-form","click",function(){var a=this;a.css("display","block"),setTimeout(function(){a.css("opacity","1")},1)}),a.negate("contact-form","click",function(){var a=this;this.css("opacity","0"),setTimeout(function(){a.hide()},300)}),$("a.checkbox").on("click",function(){var a=$(this).siblings('input[type="checkbox"]');Boolean(a.attr("checked"))?a.removeAttr("checked"):a.attr("checked","checked")}),function(){for(var a,e,t=$('.field[name="movein"]'),n=["January","February","March","April","May","June","July","August","September","October","November","December"],i=document.createDocumentFragment(),c=new Date,o=c.getMonth(),s=0;12>s;s++)e=c.getFullYear()<2016?s:s+o,e>11&&(e-=12),a=document.createElement("option"),a.setAttribute("value",n[e]),a.textContent=n[e],i.appendChild(a);t.append(i)}(),function(){var a={};a.email=function(a){return 0===a.search(/[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9]+(\.[a-zA-Z]+)+$/)},a.tel=function(a){return 0===a.search(/^\(?([0-9]{3})\)?[\-. ]?([0-9]{3})[\-. ]?([0-9]{4})$/)};var e=function(a){var e,t=!1,n=[],i=a.find('.field[name="apttype[]"]'),c=a.find('.field:not([name="apttype[]"])');return i.each(function(){t=Boolean($(this).attr("checked")),t&&n.push($(this).val())}),e=c.serialize(),e+=encodeURI("&apttype[]="+n.join(", "))},t=function(a){var e=$('[name="'+a+'"]'),t=!1,n=1;return e.each(function(){return t=Boolean($(this).attr("checked")),t?(n=0,!1):void 0}),0===n?e.removeClass("invalid").addClass("valid"):e.removeClass("valid").addClass("invalid"),n},n=function(e){var t,n=e.val()||"",i=0;if("checkbox"===e.attr("type"))return 0;if(n=n.trim(),""===n)e.is("[required]")?(e.removeClass("valid").addClass("invalid"),++i):e.removeClass("invalid");else if(e.is(".noval"))e.removeClass("invalid"),e.is("[required]")&&e.addClass("valid");else{for(t in a)(e.attr("type")===t||e.hasClass(t))&&(a[t](n)||++i);0===i?e.removeClass("invalid").addClass("valid"):e.removeClass("valid").addClass("invalid")}return i};$('[name="apttype[]"] ~ .checkbox').on("click",function(){t("apttype[]")}),$(".field").on("focusout",function(){n($(this))}),$(".submit").on("click",function(a){a.preventDefault();var e=0;e+=t("apttype[]"),$(".field").each(function(){e+=n($(this))}),0===e&&$(this).closest("form").submit()}),$("#contact-form").on("submit",function(a){a.preventDefault(),$(".submit").prop("disabled",!0).val("SENDING"),$.ajax({type:"POST",url:"submit.php",data:e($(this)),success:function(a){$("#contact-form").delay(300).hide().siblings("#submission-response").addClass("active")},error:function(){$(".submit").removeAttr("disabled")}})})}()});