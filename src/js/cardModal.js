import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { request } from './moviesApi';

const galleryContainer = document.querySelector(".gallery__list")

const modal = document.querySelector(".modal")
const closeBtn = document.querySelector(".close-btn")
const wached = document.querySelector('.watched')
const queue = document.querySelector('.queue')
const removeWatchedBtn = document.querySelector('.remove_watched')
const removeQueueBtn = document.querySelector('.remove_queue')


const modalHandler = {
   currentMovieId: null,
   closeOnEscape: null,

   init: function () {
      if (!galleryContainer) {
         return;
      }
      this.initModal();
      this.initToWached();
      this.initToQueue();
      this.removeWatchedItem();
   },

   initModal: function () {

      this.closeOnEscape = (e) => {
         if (e.key === 'Escape') {
            modal.style.display = "none"
            document.removeEventListener('keydown', this.closeOnEscape);
         }
      }
      
      galleryContainer.onclick = (event) => {
         const movieLink = event.target.closest(".card__link");
         
         if (!movieLink) {
            return;
         }

         event.preventDefault();
         
         this.currentMovieId = movieLink.dataset.id;
 
         Loading.dots({            
            svgColor: '#ff6b01',
         });
         
         request.fetchMovieDetails(this.currentMovieId).then((response) => {
            
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

            this.findMovieId();

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
         this.addToLocalStorage("watchedMovieId");
      }
   },

   initToQueue: function () {
      queue.onclick = () => {
         this.addToLocalStorage("queueMovieId");
      }
   },

   addHiddenWatchedBtn: function () {
      wached.classList.add('hidden');
      removeWatchedBtn.classList.remove('hidden');
   },

   addHiddenQueueBtn: function () {
      queue.classList.add('hidden');
      removeQueueBtn.classList.remove('hidden');
   },

   removeHiddenWatchedBtn: function () {
      wached.classList.remove('hidden');
      removeWatchedBtn.classList.add('hidden');
   },

   removeHiddenQueueBtn: function () {
      queue.classList.remove('hidden');
      removeQueueBtn.classList.add('hidden');
   },

   removeWatchedItem: function () {
      removeWatchedBtn.onclick = () => {
         this.removeLocalStorageItem("watchedMovieId");
         
      }
   },

   removeQueueItem: function () {
      removeQueueBtn.onclick = () => {
         this.removeLocalStorageItem("queueMovieId");
      }
   },

   addToLocalStorage: function (key) {
      if (localStorage.getItem(key) === null) {
            const moviesIds = [];
            moviesIds.push(this.currentMovieId);
            localStorage.setItem(key, JSON.stringify(moviesIds)); 
         } else {
            const moviesIdsSaved = JSON.parse(localStorage.getItem(key));
            const hasMovie = moviesIdsSaved.find((element) => {
               return element === this.currentMovieId
            });

            if (hasMovie === undefined) {
               moviesIdsSaved.push(this.currentMovieId);
               localStorage.setItem(key, JSON.stringify(moviesIdsSaved));
            }        
         }
   },

   findMovieId: function () {
      const localStorageData = JSON.parse(localStorage.getItem("watchedMovieId"));
         
      const hasMovie = localStorageData.find((movieId) => {
   
            if (!movieId === this.currentMovieId) {
               return;
            } else {
               console.log(movieId)
               console.log(this.currentMovieId)
               console.log('dgsdfgsdf')
            }          
      });
   },

   removeLocalStorageItem: function (key) {
      const localStorageData = JSON.parse(localStorage.getItem(key));
         
      const hasMovie = localStorageData.find((movieId) => {
            return movieId === this.currentMovieId; 
      });

      const indexId = localStorageData.indexOf(hasMovie); 
      localStorageData.splice(indexId, 1);

      localStorage.setItem(key, JSON.stringify(localStorageData));
   }

   }

modalHandler.init();

export default modalHandler;



