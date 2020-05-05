 let loadingNot = document.querySelector("#loadingBox"); //notificationBox
 let successNot = document.querySelector("#successBox"); //notificationBox
 let errorNot = document.querySelector('#errorBox'); // check for id - notifications boxes! 

 function noteError(message) {
     errorNot.textContent = message;
     errorNot.style.display = 'block';
     errorNot.addEventListener('click', () => {
         errorNot.style.display = 'none';
         errorNot.textContent = '';
     });

     setTimeout(() => {
         errorNot.textContent = '';
         errorNot.style.display = 'none';
         return;

     }, 5000)


 }

 function noteLoading(message) {
     loadingNot.textContent = 'Loading...';

     if (message === 'block') {
         loadingNot.style.display = 'block';
     } else if (message === 'none') {
         loadingNot.style.display = 'none';
     }
 }

 function noteSuccess(message) {

     successNot.textContent = message;
     successNot.style.display = 'block';
     successNot.addEventListener('click', () => {
         successNot.style.display = 'none';
         successNot.textContent = '';
     });

     setTimeout(() => {
         successNot.textContent = '';
         successNot.style.display = 'none';
         return;

     }, 5000)
 }

 export {
     noteError,
     noteLoading,
     noteSuccess
 }