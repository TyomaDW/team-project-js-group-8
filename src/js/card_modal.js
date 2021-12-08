import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { request } from './moviesApi';

const gallaryContainer = document.querySelector(".gallery__list")

const modal = document.querySelector(".modal")
const closeBtn = document.querySelector(".close-btn")
const wached = document.querySelector('.wached')
const queue = document.querySelector('.queue')


const modalHandler = {
   currentMovieId: null,
   closeOnEscape: null,

   init: function () {
      if (!gallaryContainer) {
         return;
      }
      this.initModal();
      this.initToWached();
      this.initToQueue();
   },

   initModal: function () {

      this.closeOnEscape = (e) => {
         if (e.key === 'Escape') {
            modal.style.display = "none"
            document.removeEventListener('keydown', this.closeOnEscape);
         }
      }
      
      gallaryContainer.onclick = (event) => {
         const movieLink = event.target.closest(".gallery__item-link");
         
         if (!movieLink) {
            return;
         }

         event.preventDefault();
         
         this.currentMovieId = movieLink.dataset.id;

         Loading.dots({            
            svgColor: '#ff6b01',
         });
         
         request.fetchMovieForModal(this.currentMovieId).then((response) => {
            
            Loading.remove();

            const modalContent = document.querySelector('.modal_content');
         
            modalContent.querySelector('.film_title').innerHTML = response.title;
            modalContent.querySelector('.original_title').innerHTML = response.original_title;
            modalContent.querySelector('.popularity').innerHTML = parseInt(response.popularity);
            modalContent.querySelector('.vote_average').innerHTML = response.vote_average;
            modalContent.querySelector('.vote_count').innerHTML = response.vote_count;
            modalContent.querySelector('.genres').innerHTML = response.genres[0].name;
            modalContent.querySelector('.description').innerHTML = response.overview;
            modalContent.querySelector('.poster picture .large').srcset = `https://image.tmdb.org/t/p/w400${response.poster_path} 1x`;
            modalContent.querySelector('.poster picture .medium').srcset = `https://image.tmdb.org/t/p/w300${response.poster_path} 1x`;
            modalContent.querySelector('.poster picture .small').srcset = `https://image.tmdb.org/t/p/w300${response.poster_path} 1x`;
            
            modal.style.display = "block"

            document.addEventListener('keydown', this.closeOnEscape);
         });
      }

      closeBtn.onclick = function () {
         modal.style.display = "none"
         document.removeEventListener('keydown', this.closeOnEscape);
      }

      window.onclick = function (e) {
         if (e.target == modal) {
            modal.style.display = "none"
            document.removeEventListener('keydown', this.closeOnEscape);
         }  
      }
   },

   initToWached: function () {
      wached.onclick = () => {
         if (localStorage.getItem("wachedMovieId") === null) {
            const wachedMoviesIds = [];
            wachedMoviesIds.push(this.currentMovieId);
            localStorage.setItem("wachedMovieId", JSON.stringify(wachedMoviesIds)); 
         } else {
            const wachedMoviesIdsSaved = JSON.parse(localStorage.getItem("wachedMovieId"));
            const hasMovie = wachedMoviesIdsSaved.find((element) => {
               return element === this.currentMovieId
            });

            if (hasMovie === undefined) {
               wachedMoviesIdsSaved.push(this.currentMovieId);
               localStorage.setItem("wachedMovieId", JSON.stringify(wachedMoviesIdsSaved));
            }        
         }
      }
   },

   initToQueue: function () {
      queue.onclick = () => {
         if (localStorage.getItem("queueMovieId") === null) {
            const queueMoviesIds = [];
            queueMoviesIds.push(this.currentMovieId);
            localStorage.setItem("queueMovieId", JSON.stringify(queueMoviesIds)); 
         } else {
            const queueMoviesIdsSaved = JSON.parse(localStorage.getItem("queueMovieId"));
            const hasMovie = queueMoviesIdsSaved.find((element) => {
               return element === this.currentMovieId
            });

            if (hasMovie === undefined) {
               queueMoviesIdsSaved.push(this.currentMovieId);
               localStorage.setItem("queueMovieId", JSON.stringify(queueMoviesIdsSaved));
            }        
         }
      }
   }  
}

modalHandler.init();

export default modalHandler;



