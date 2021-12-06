import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { request } from './js/moviesApi';

const modalBtn = document.getElementById("modal-btn")
const modal = document.querySelector(".modal")
const closeBtn = document.querySelector(".close-btn")
const wached = document.querySelector('.wached')
const queue = document.querySelector('queue')


const modalHandler = {
   currentMovieId: null,
   init: () => {
      modalBtn.onclick = function () {
         //Показать лоадер
         this.currentMovieId = modalBtn.dataset.id;
         Loading.pulse();
         // загр инф о фильме
         request.fetchMovieForModal(this.currentMovieId).then((response) => {
            console.log(response);
            // отрисовать
            Loading.remove();
            const modalContent = document.querySelector('.modal_content');
         
            modalContent.querySelector('.film_title').innerHTML = response.title;
            modalContent.querySelector('.original_title').innerHTML = response.original_title;
            modalContent.querySelector('.popularity').innerHTML = parseInt(response.popularity);
            modalContent.querySelector('.vote_average').innerHTML = response.vote_average;
            modalContent.querySelector('.vote_count').innerHTML = response.vote_count;
            modalContent.querySelector('.genres').innerHTML = response.genres[0].name;
            modalContent.querySelector('.description').innerHTML = response.overview;

            modalContent.querySelector('.poster picture .large').srcset = `https://image.tmdb.org/t/p/w500${response.poster_path} 1x`;
            modalContent.querySelector('.poster picture .medium').srcset = `https://image.tmdb.org/t/p/w300${response.poster_path} 1x`;
            modalContent.querySelector('.poster picture .small').srcset = `https://image.tmdb.org/t/p/w280${response.poster_path} 1x`;
            // скрыть лоадер popularity vote_count
            
            //показать окно
            modal.style.display = "block"
         });
      }
      closeBtn.onclick = function () {
         modal.style.display = "none"
      }
      window.onclick = function (e) {
         if (e.target == modal) {
            modal.style.display = "none"
         }
      }
      
   },

   addToWached: ()=> {
      wached.onclick = function () {
         
         if (localStorage.getItem("wachedMovieId") === undefined) {

         }
         
         localStorage.setItem("wachedMovieId", this.currentMovieId);
      }
   },

   addToQueue: ()=>{
      queue.onclick = function () {
         localStorage.setItem("queueMovie", this.currentMovieId);
      }
   }  
}

export default modalHandler;


