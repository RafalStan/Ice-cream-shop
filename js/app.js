
//all the images scripts links have finished loading


//event listener

eventListeners();

function eventListeners(){
    const ui = new UI();

    //preloader
    window.addEventListener('load', function(){
        ui.hidePreloader();
     })
     
     //nav btn
     document.querySelector('.navBtn').addEventListener('click',function(){
        ui.toggleNav(); 
     })

     // on/off video
     document.querySelector('.video_switch').addEventListener('click', function(){
        ui.videoControls();
     })

     // submit the form
     document.querySelector('.register-form').addEventListener('submit',function(event){
        event.preventDefault();
        const name = document.querySelector('.input-name').value;
        const lastName = document.querySelector('.input-lastname').value;
        const email = document.querySelector('.input-email').value;

        let value = ui.checkEmpty(name, lastName, email)

        if(value){
            let customer = new Customer(name, lastName, email);
            ui.addCustomer(customer);
            ui.showFeedback('welcome in the family :)', 'success');
            ui.clearFields()
        }
        else{
            ui.showFeedback('some form values empty', 'error');
        }
     })

     //display modal
     const links = document.querySelectorAll('.work-item_icon');


     links.forEach(function (item) {
       item.addEventListener('click', function (event) {
         ui.showModal(event)
       })
     })

     //hide modal
     document.querySelector('.work-modal_close').addEventListener('click', function(){
         ui.closeModal()
     })
}






//constructor function
function UI(){

}

//hide preloader
UI.prototype.hidePreloader = function(){
    document.querySelector('.preloader').style.display="none"; 
}

//show nav
UI.prototype.toggleNav = function(){
    document.querySelector('.nav').classList.toggle('nav_show');
}

// pause video
UI.prototype.videoControls = function(){
   const btn = document.querySelector('.video_switch-btn');
   
   if(!btn.classList.contains('video_switch-btn_slide')){
    btn.classList.add('video_switch-btn_slide');
    document.querySelector('.video_item').pause();
   }
   else{
    btn.classList.remove('video_switch-btn_slide');
    document.querySelector('.video_item').play();
   }
   
}

// check form empty values
UI.prototype.checkEmpty = function(name, lastname, email){
    let result;   
    if(name === "" || lastname === "" || email=== ""){
        result= false;
    }
    else{
        result = true;
    }

    return result;
}

UI.prototype.showFeedback = function(text, type){
    var feedback = document.querySelector('.register-form_feedback');

    if(type === 'success'){
        feedback.classList.add('success');
        feedback.innerText = text;
        this.removeAlert('success', feedback);
    }
    else if(type === 'error'){
        feedback.classList.add('error');
        feedback.innerText = text;
        this.removeAlert('error', feedback);
    }
}

// remove alert 
UI.prototype.removeAlert = function(type, removeObject){

    setTimeout(function(){
        removeObject.classList.remove(type);
    }, 3000)
}

// add customer
UI.prototype.addCustomer = function(customer){
    const div = document.createElement('div');
    div.classList.add('person');
    div.innerHTML = ` 
    <img src="img/person-1.jpeg" alt="person" class="person_thumbnail">
    <h4 class="person_name">${customer.name}</h4>
    <h4 class="person_lastname">${customer.lastname}</h4>`
    document.querySelector('.customer-card_list').appendChild(div)
}

// clear fields
UI.prototype.clearFields = function(){
    document.querySelector('.input-name').value = '';
    document.querySelector('.input-lastname').value = '';
    document.querySelector('.input-email').value = '';
}

//  show modal

UI.prototype.showModal = function (event) {
    event.preventDefault();
    if (event.target.parentElement.classList.contains('work-item_icon')) {
  
  
      let id = event.target.parentElement.dataset.id
  
      const modal = document.querySelector('.work-modal');
      const modalItem = document.querySelector('.work-modal_item');
  
      modal.classList.add('work-modal_show');
      modalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`
    }
  }


// hide modal

UI.prototype.closeModal = function(){
    document.querySelector('.work-modal').classList.remove('work-modal_show');
}

//customer  
function Customer(name, lastname, email){
    this.name = name;
    this.lastname = lastname;
    this.email = email;
}