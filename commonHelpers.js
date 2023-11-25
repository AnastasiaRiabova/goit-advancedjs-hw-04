import{i as l,a as w,S as b}from"./assets/vendor-5f0e12e0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const L=()=>{const{height:s}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})},a=(s,t)=>s.classList.toggle("hidden",!t),f=()=>l.error({title:"Oops!",message:"Something went wrong try again",position:"topRight"}),v="https://pixabay.com/api/",p=async(s,t)=>{try{return await w.get(v,{params:{key:"40865499-984f6d4bf951e94a81d50a698",q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:"40",page:t}})}catch(n){f(),console.log(n)}},m=s=>s.map(({webformatURL:t,largeImageURL:n,tags:i,likes:e,views:r,comments:c,downloads:y})=>`
    <a href='${n}' class='card-link js-card-link'>
     <div class='photo-card'>
      <img src='${t}' class='card-img'  alt='${i}' loading='lazy' />
       <div class='info'>
        <p class='info-item'>
            <b>Likes: ${e}</b>
        </p>
        <p class='info-item'>
        <b>Views: ${r}</b>
        </p>
        <p class='info-item'>
            <b>Comments: ${c}</b>
        </p>
        <p class='info-item'>
            <b>Downloads: ${y}</b>
        </p>
    </div>
</div>
</a>`).join(""),o={form:document.querySelector("#search-form"),input:document.querySelector("input"),gallery:document.querySelector(".gallery"),loadBtn:document.querySelector(".js-load-btn"),logo:document.querySelector(".js-pixa")};let u="",d=1;const g=()=>{o.gallery.innerHTML="",d=1},S=async s=>{s.preventDefault();const t=o.input.value.trim().toLowerCase();if(!t){l.warning({title:"Ops!",message:"Enter something to search!",position:"topRight"});return}if(u===t){l.warning({title:"Sorry!",message:"Rewrite your requests, write something different.!",position:"topRight"});return}u=t,g();try{a(o.loadBtn,!1);const{data:n}=await p(u,d),i=n.totalHits,e=n.hits;if(i===0){a(o.loadBtn,!1),a(o.logo,!0),l.show({title:"Ops!",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"});return}a(o.logo,!1),o.gallery.insertAdjacentHTML("afterbegin",m(e)),l.show({title:"Hooray!",message:`We found ${i} images.`,position:"topRight"}),a(o.loadBtn,!0),h.refresh()}catch(n){console.log(n),f(),g(),a(o.logo,!0)}},q=async s=>{s.preventDefault(),d+=1;try{const{data:t}=await p(u,d),n=t.hits,i=t.totalHits;if(!(d<Math.ceil(i/40))){l.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),a(o.loadBtn,!1);return}o.gallery.insertAdjacentHTML("beforeend",m(n)),L(),h.refresh()}catch(t){console.log(t),f(),g(),a(o.logo,!0)}};o.form.addEventListener("submit",S);o.loadBtn.addEventListener("click",q);a(o.loadBtn,!1);a(o.logo,!0);const h=new b(".js-gallery a",{captionDelay:250,captionsData:"alt"});
//# sourceMappingURL=commonHelpers.js.map
