import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { request } from './moviesApi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { signedIn } from './firebase';

const galleryContainer = document.querySelector(".gallery__list")

const modal = document.querySelector(".modal")
const closeBtn = document.querySelector(".close-btn")
const watched = document.querySelector('.watched')
const queue = document.querySelector('.queue')
const removeFromWatchedBtn = document.querySelector('.remove_watched')
const removeFromQueueBtn = document.querySelector('.remove_queue')


const modalHandler = {
   currentMovieId: null,
   closeOnEscape: null,

   init: function () {
      if (!galleryContainer) {
         return;
      }
      this.initModal();
      this.initAddToWatched();
      this.initAddToQueue();
      this.initRemoveWatchedItem();
      this.initRemoveQueueItem();
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

            this.hideWatchedBtn();
            this.hideQueueBtn();

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
            
            modal.style.display = "block";

            const hasInWatched = this.findMovieId("watchedMovieId");
            const hasInQueue = this.findMovieId("queueMovieId");
             
            if (hasInWatched) {
               this.showInWatchedBtn();
            } 

            if (hasInQueue) {
               this.showInQueueBtn();
            } 

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

   initAddToWatched: function () {
      watched.onclick = () => {
         if (signedIn === false) {
            Notify.info('This option is only available to authorized users! Sing up, please!');
            return;
         }
         this.addToLocalStorage("watchedMovieId");
         this.showInWatchedBtn();
         Notify.success('The movie successfully added to Watched!');

      }
   },

   initAddToQueue: function () {
      queue.onclick = () => {
         if (signedIn === false) {
            Notify.info('This option is only available to authorized users! Sing up, please!');
            return;
         }
         this.addToLocalStorage("queueMovieId");
         this.showInQueueBtn();
         Notify.success('The movie successfully added to Queue!');
      }
   },

   initRemoveWatchedItem: function () {
      removeFromWatchedBtn.onclick = () => {
         const currentMovie = document.querySelector(`a[data-id="${this.currentMovieId}"]`);
         const closestToCurrentMovie = currentMovie.closest('.gallery__item');
         closestToCurrentMovie.remove();
         
         this.removeLocalStorageItem("watchedMovieId");
         this.hideWatchedBtn();
         Notify.info('The movie successfully removed from Watched');
      }
   },

   initRemoveQueueItem: function () {
      removeFromQueueBtn.onclick = () => {
         const currentMovie = document.querySelector(`a[data-id="${this.currentMovieId}"]`);
         const closestToCurrentMovie = currentMovie.closest('.gallery__item');
         closestToCurrentMovie.remove();

         this.removeLocalStorageItem("queueMovieId");
         this.hideQueueBtn();
         Notify.info('The movie successfully removed from Queue');
      }
   },

   showInWatchedBtn: function () {
      watched.classList.add('hidden');
      removeFromWatchedBtn.classList.remove('hidden');
      removeFromWatchedBtn.classList.add('is-active');
   },

   showInQueueBtn: function () {
      queue.classList.add('hidden');
      removeFromQueueBtn.classList.remove('hidden');
      removeFromQueueBtn.classList.add('is-active');
   },

   hideWatchedBtn: function () {
      watched.classList.remove('hidden');
      removeFromWatchedBtn.classList.add('hidden');
      removeFromWatchedBtn.classList.remove('is-active');
   },

   hideQueueBtn: function () {
      queue.classList.remove('hidden');
      removeFromQueueBtn.classList.add('hidden');
      removeFromQueueBtn.classList.remove('is-active');
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

   findMovieId: function (key) {
      const localStorageData = JSON.parse(localStorage.getItem(key));

          if (localStorageData === null) {
             return;
          }
         
      return localStorageData.find((movieId) => {
            return movieId === this.currentMovieId;                 
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



