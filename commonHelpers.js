import{i as n,a as w,S as b}from"./assets/vendor-5f0e12e0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();const L=()=>{const{height:a}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:a*2,behavior:"smooth"})},i=(a,e)=>a.classList.toggle("hidden",!e),p=()=>n.error({title:"Oops!",message:"Something went wrong try again",position:"topRight"}),v="https://pixabay.com/api/",f=async(a,e)=>{const{data:r}=await w.get(v,{params:{key:"40865499-984f6d4bf951e94a81d50a698",q:a,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:"40",page:e}});return r},h=a=>a.map(({webformatURL:e,largeImageURL:r,tags:l,likes:t,views:s,comments:u,downloads:y})=>`
    <a href='${r}' class='card-link js-card-link'>
     <div class='photo-card'>
      <img src='${e}' class='card-img'  alt='${l}' loading='lazy' />
       <div class='info'>
        <p class='info-item'>
            <b>Likes: ${t}</b>
        </p>
        <p class='info-item'>
        <b>Views: ${s}</b>
        </p>
        <p class='info-item'>
            <b>Comments: ${u}</b>
        </p>
        <p class='info-item'>
            <b>Downloads: ${y}</b>
        </p>
    </div>
</div>
</a>`).join(""),o={form:document.querySelector("#search-form"),input:document.querySelector("input"),gallery:document.querySelector(".gallery"),loadBtn:document.querySelector(".js-load-btn"),logo:document.querySelector(".js-pixa")};let d="",c=1;const g=()=>{o.gallery.innerHTML="",c=1},S=async a=>{a.preventDefault();const e=o.input.value.trim().toLowerCase();if(!e){n.warning({title:"Ops!",message:"Enter something to search!",position:"topRight"});return}if(d===e){n.warning({title:"Sorry!",message:"Rewrite your requests, write something different.!",position:"topRight"});return}d=e,g();try{i(o.loadBtn,!1);const{totalHits:r,hits:l}=await f(d,c);if(r===0){i(o.loadBtn,!1),i(o.logo,!0),n.show({title:"Ops!",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"});return}if(i(o.logo,!1),o.gallery.insertAdjacentHTML("afterbegin",h(l)),n.show({title:"Hooray!",message:`We found ${r} images.`,position:"topRight"}),m.refresh(),Math.ceil(r/40)===c){i(o.loadBtn,!1),n.show({title:"Ops!",message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}i(o.loadBtn,!0)}catch(r){console.log(r),p(),g(),i(o.logo,!0)}},q=async a=>{a.preventDefault(),c+=1;try{const{hits:e,totalHits:r}=await f(d,c);Math.ceil(r/40)===c&&(i(o.loadBtn,!1),n.show({title:"Ops!",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),o.gallery.insertAdjacentHTML("beforeend",h(e)),L(),m.refresh()}catch(e){console.log(e),p(),g(),i(o.logo,!0)}};o.form.addEventListener("submit",S);o.loadBtn.addEventListener("click",q);i(o.loadBtn,!1);i(o.logo,!0);const m=new b(".js-gallery a",{captionDelay:250,captionsData:"alt"});
//# sourceMappingURL=commonHelpers.js.map
