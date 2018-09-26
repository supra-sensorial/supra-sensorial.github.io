var Portfolio=function(){"use strict";return{options:{currentPage:1,dribbbleId:dribbbleId},init:function(){Portfolio.getItems(),Portfolio.contact(),Portfolio.events(),Portfolio.scroll(),Portfolio.selector()},getItems:function(){Portfolio.makeRequest("https://api.dribbble.com/players/"+Portfolio.options.dribbbleId+"/shots/?callback=Portfolio.appendItems&per_page=6&page="+Portfolio.options.currentPage),Portfolio.options.currentPage++},appendItems:function(a){for(var b=document.querySelector(".js-portfolio-items"),c=Hogan.compile(document.getElementById("work-template").innerHTML),d=0,e=a.shots.length;e>d;d++)b.insertAdjacentHTML("beforeend",c.render({title:a.shots[d].title,image_url:a.shots[d].image_400_url||a.shots[d].image_url,shot_url:a.shots[d].url,created_at:a.shots[d].created_at,created_at_relative:moment(a.shots[d].created_at).fromNow(),views_count:a.shots[d].views_count,views_count_formatted:numeral(a.shots[d].views_count).format("0,0"),comments_count:a.shots[d].comments_count,comments_count_formatted:numeral(a.shots[d].comments_count).format("0,0"),likes_count:a.shots[d].likes_count,likes_count_formatted:numeral(a.shots[d].likes_count).format("0,0")}));if(Portfolio.options.currentPage>a.pages){var f=document.querySelector(".js-next-page");f&&f.parentNode.removeChild(f)}Portfolio.afterLoad()},makeRequest:function(a){var b=document.createElement("script");b.src=a,b.async=!0,document.getElementsByTagName("head")[0].appendChild(b)},events:function(){document.querySelector(".js-next-page").addEventListener("click",function(a){a.preventDefault(),Portfolio.beforeLoad(),Portfolio.getItems()}),document.querySelector(".js-toggle-menu").addEventListener("click",function(a){var b=document.querySelector(".MobileNavigation");a.preventDefault(),classie.toggle(b,"MobileNavigationActive");var b=document.querySelector(".header__nav-toggle");a.preventDefault(),classie.toggle(b,"header__nav-toggleActive"),classie.toggle(document.querySelector(".body-modal"),"body-modalActive")}),smoothScroll.init()},beforeLoad:function(){var a=document.querySelector(".js-next-page");a&&(a.setAttribute("disabled",!0),classie.add(a,"more--loading"))},afterLoad:function(){var a=document.querySelector(".js-next-page"),b=document.querySelector(".js-portfolio");a&&(a.removeAttribute("disabled"),classie.remove(a,"more--loading")),b&&classie.remove(b,"section--hidden")},contact:function(){document.querySelector(".js-show-modal").addEventListener("click",function(a){a.preventDefault(),classie.add(document.querySelector(".modal"),"modal--visible"),classie.add(document.querySelector(".body-modal"),"body-modalActive")}),document.querySelector(".button-modal").addEventListener("click",function(a){a.preventDefault(),classie.add(document.querySelector(".modal"),"modal--visible")}),document.querySelector(".js-close-modal").addEventListener("click",function(a){a.preventDefault(),classie.remove(document.querySelector(".modal--visible"),"modal--visible"),classie.remove(document.querySelector(".body-modal"),"body-modalActive"),Portfolio.updateFormStatus("")}),document.querySelector(".js-contact-form").addEventListener("submit",function(a){var b=this;a.preventDefault(),Portfolio.removeFormErrors(b),Portfolio.submitForm(serialize(b),function(a){a.success?Portfolio.updateFormStatus(a.message,"success"):(Portfolio.addFormErrors(b,a.errors),Portfolio.updateFormStatus(a.message,"error"))})})},updateFormStatus:function(a,b){var c=document.querySelector(".form__status");classie.remove(c,"form__status--success"),classie.remove(c,"form__status--error"),b&&classie.add(c,"form__status--"+b),c.innerHTML=a},submitForm:function(a,b){var c=new XMLHttpRequest;c.open("POST","contact.php",!0),c.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),c.setRequestHeader("X-Requested-With","XMLHttpRequest"),c.onload=function(){c.status>=200&&c.status<400&&b(JSON.parse(c.responseText))},c.send(a)},addFormErrors:function(a,b){for(var c in b)classie.add(document.querySelector('[name="'+c+'"]'),"form--error")},removeFormErrors:function(a){for(var b=a.querySelectorAll(".form--error"),c=0,d=b.length;d>c;c++)classie.remove(b[c],"form--error")},scroll:function(){var a=document.querySelector(".back-to-top");window.addEventListener("scroll",function(){var b=window.pageYOffset||(document.documentElement||document.body.parentNode||document.body).scrollTop;b>640?classie.add(a,"back-to-top--visible"):classie.remove(a,"back-to-top--visible")})},selector:function(){for(var a,b,c,d,e=document.querySelectorAll(".js-select"),f=0,g=e.length;g>f;f++){a=e[f],b=e[f].querySelector(".select__button"),d=e[f].querySelector(".select__val"),d.setAttribute("value",b.innerHTML),b.addEventListener("click",function(b){b.preventDefault(),classie.toggle(a,"select--active")}),c=a.querySelectorAll(".select__value");for(var h=0,i=c.length;i>h;h++)c[h].addEventListener("click",function(c){c.preventDefault(),d.setAttribute("value",this.innerHTML),b.innerHTML=this.innerHTML,classie.remove(a,"select--active")})}}}}();document.addEventListener("DOMContentLoaded",Portfolio.init);

