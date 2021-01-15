 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAjy3c2ZL0qTiiO4zLOL4UwrtKDXP9zW-E",
    authDomain: "portfolio-36274.firebaseapp.com",
    projectId: "portfolio-36274",
    storageBucket: "portfolio-36274.appspot.com",
    messagingSenderId: "72003388103",
    appId: "1:72003388103:web:ba76d113e1f70cd7d8f4e2",
    measurementId: "G-Z9HTW2ZRQM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  //Reference messages Collection
   var messagesRef = firebase.database().ref("messages");


window.addEventListener("load",function(){
    document.querySelector(".preloader").classList.add("opacity-0");
    setTimeout(function(){
        document.querySelector(".preloader").style.display = "none";
    },1000)
})


//Blog item filter

const filterContainerblog = document.querySelector('.blog-filter');
const filterBtnsBlog = filterContainerblog.children;

const totalFilterBtnsBlog = filterBtnsBlog.length;
const blogItems= document.querySelectorAll(".blog-item");
const blogItemsTotal = blogItems.length;



for(let i=0 ; i<totalFilterBtnsBlog ; i++){
    filterBtnsBlog[i].addEventListener("click", function(){
        filterContainerblog.querySelector(".active").classList.remove("active");
        this.classList.add("active");

        const blogFilterValue = this.getAttribute("data-filter")
        for(let j = 0; j<blogItemsTotal; j++){
            if(blogFilterValue === blogItems[j].getAttribute("data-category")){
                blogItems[j].classList.remove("hide");
                blogItems[j].classList.add("show");
            }
            else{
                blogItems[j].classList.remove("show");
                blogItems[j].classList.add("hide");
            }
            if(blogFilterValue === "all"){
                blogItems[j].classList.remove("hide");
                blogItems[j].classList.add("show");
            }
        }

    })
}




//   Aside navbar

const nav = document.querySelector(".nav"),
      navList = nav.querySelectorAll("li"),
      totalNavList = navList.length,
      allSection = document.querySelectorAll(".section"),
      totalSection = allSection.length;

for(let i=0 ; i<totalNavList;i++){
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function(){
        // remove back section
        removeBackSectionClasss();

        for(let j=0;j<totalNavList;j++){
          if(navList[j].querySelector("a").classList.contains("active")){
            // add back section
            addBackSectionClasss(j);
          }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");
        showSection(this);

        if(window.innerWidth < 1200){
          asideSectionTogglerBtn();
        }
    })
}

function removeBackSectionClasss(){
    for(let i = 0 ; i<totalSection;i++){
        allSection[i].classList.remove("back-section");
      }
}
function addBackSectionClasss(num){

        allSection[num].classList.remove("back-section");
      
}

function showSection(e){
  for(let i = 0 ; i<totalSection;i++){
    allSection[i].classList.remove("active");
  }
  const target= e.getAttribute("href").split("#")[1];
  document.querySelector("#"+target).classList.add("active");
}

function updateNav(e){
    for(let i=0 ; i<totalNavList;i++){
        navList[i].querySelector("a").classList.remove("active");
        const target=e.getAttribute("href").split("#")[1];
        if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1]){
            navList[i].querySelector("a").classList.add("active");
        }
    }
    
}
document.querySelector(".hire-me").addEventListener("click",function(){
    const sectionIndex =  this.getAttribute("data-section-index");
    // console.log(sectionIndex);
    showSection(this);
    updateNav(this);
    removeBackSectionClasss();
    addBackSectionClasss(sectionIndex);
})

const navTogglerBtn = document.querySelector(".nav-toggler"),
      aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click" , function(){
    asideSectionTogglerBtn();
})

function asideSectionTogglerBtn(){
  aside.classList.toggle("open");
  navTogglerBtn.classList.toggle("open");
  for(let i = 0 ; i<totalSection;i++){
    allSection[i].classList.toggle("open");
  }
}



//Contact Form

//Listen for form submit

document.getElementById("contactForm").addEventListener("submit" , submitForm);

function submitForm(e){

    e.preventDefault();
   
    //get Values
    var name = getId("name");
    var email = getId("email");
    var subject = getId("subject");
    var message = getId("message");

    saveMessage(name , email , subject , message);
    document.querySelector(".alert").style.display ="block";

    setTimeout(function(){
        document.querySelector(".alert").style.display ="none";
    },3000);

    //clear Form
    document.getElementById("contactForm").reset();
}


// To get all Elements Id

function getId(id){
    return document.getElementById(id).value;
}


//Save message to firebase
function saveMessage(name , email , subject , message){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name : name ,
        email : email,
        subject: subject,
        message:message
    });
}

const currrentDate = new Date();
const dateOfBirth =  new Date(1997, 06, 16, 05);

const ageValue = Math.floor((currrentDate - dateOfBirth)/31536000000);

let age = document.querySelector("#age").innerHTML = ageValue;