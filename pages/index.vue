<template>

  <div :class="`relative flex flex-col justify-center h-screen bg-fixed bg-cover object-cover`"
    :style="`background-image: url('https://image.tmdb.org/t/p/original${selectedMovie?.backdrop_path}')`">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-75"></div>

    <!-- Content -->
    <div class="relative max-w-7xl mx-auto w-full px-6 text-white">
      <!-- Add your content here -->

      <p class="py-2 text-yellow-400">⭐ {{ selectedMovie?.vote_average }}</p>
      <h1 class="text-4xl font-bold">{{ selectedMovie?.title }}</h1>
      <p class="mt-4 text-lg w-3/4 text-slate-300 pb-7">{{ selectedMovie?.overview }}</p>
      <button class="py-2 px-4 bg-transparent text-white border-2 rounded-lg">Watch Trailer</button>
    </div>
  </div>
 

  
  <div class="flex justify-center  items-center">
    <h1 class="text-white text-4xl font-medium p-10">Top Rated Movies</h1>
  </div>
  <div class="flex cursor-pointer flex-wrap gap-10 max-w-full overflow-auto h-full px-5 justify-center">
    <div v-for="item in movies" :key="item.title" @click="() => router.push(`/movies/${item.id}`)"><img
        :src="`https://image.tmdb.org/t/p/w500${item?.poster_path}`" alt=""
        class="w-72  hover:scale-105 transition-transform duration-200">
      <h1 class="text-white text-center pt-4 font-medium">{{ item.title }}</h1>
      <p class="py-2 text-yellow-400">⭐ {{ item?.vote_average }}</p>

    </div>

</div>
<div class="w-full h-1 bg-gray-600 mt-10"></div>

  <div>
    <h1 class="text-white text-3xl font-medium p-10">Trending Tv Shows</h1>
  </div>
  <div class=" flex cursor-pointer flex-wrap gap-10 max-w-full overline-auto h-full px-5 justify-center items-center">
    <div v-for="item in tvShows" :key="item.title" @click="() => router.push(`/tv/${item.id}`)"><img
        :src="`https://image.tmdb.org/t/p/w500${item?.poster_path}`" alt=""
        class="w-72  hover:scale-105 transition-transform duration-200">
      <h1 class="text-white font-medium text-center pt-4">{{ item?.original_name }}</h1>
      <p class="py-2 text-yellow-400">⭐ {{ item?.vote_average }}</p>
    </div>
  </div>
    <div class="w-full  mt-10 rounded-full ">
  <div class=" text-white p-6 text-center">
  <h2 class="text-3xl font-semibold mb-2">🔥 Featured This Week</h2>
  <p class="">Don’t miss out on trending blockbusters and fan-favorite picks!</p>
</div>
</div>
<Footer />
</template>

<script setup>
const movies = ref([]);
const selectedMovie = ref(null);
const config = useRuntimeConfig();
const router = useRouter();

const fetchMovies = async () => {
  try {
    const response = await fetch(`${config.public.API_BASE_URL}movie/popular`, {
      headers: {
        Authorization: `Bearer ${config.public.ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();
    movies.value = data.results;

    // Select a random movie
    if (movies.value.length > 0) {
      selectedMovie.value = movies.value[Math.floor(Math.random() * movies.value.length)];
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
  }

}
fetchMovies();

const tvShows = ref([]);
const configTV = useRuntimeConfig();

const fetchTvShows = async () => {
  try {
    const response = await fetch(`${configTV.public.API_BASE_URL}tv/popular`, {
      headers: {
        Authorization: `Bearer ${configTV.public.ACCESS_TOKEN}`,
      }
    })
    const data = await response.json();
    tvShows.value = data.results;

  } catch (error) {
    console.eroor(`Error fethching tv shows:`, eroor)
  }
}

fetchTvShows();

</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
  font-family: "Poppins", sans-serif;

}
</style>