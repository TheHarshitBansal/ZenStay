let initiallySelectedFilter = "All";
let allFilters = document.querySelectorAll('input[name="options-base"]');


allFilters.forEach(el=>{
    el.addEventListener('change', ()=>{
        initiallySelectedFilter = el.nextElementSibling.querySelector('p').innerText;
        console.log(initiallySelectedFilter);
        let listingCard = document.querySelectorAll(".listingCard");
for(listing of listingCard){
    if(!listing.querySelector(".filter").innerText.includes(initiallySelectedFilter)){
        if(listing.parentElement.style.display != "none")
        listing.parentElement.style.display = "none"
    }
    else{
        listing.parentElement.style.display = "block"
    }
}
    })
});  


