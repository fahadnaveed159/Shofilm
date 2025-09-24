<template>
    <div class="text-white w-full bg-cover bg-center h-[calc(100vh-80px)]"
        :style="`background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`">
        <div class="flex items-center justify-between h-full p-10 mx-auto max-w-7xl">
            
            <div class="flex flex-col justify-center gap-4">
                <div class="">
                  <h1 class="py-3 text-4xl font-medium">{{ movie?.title }}</h1>
            <p class="max-w-2xl text-sm">{{ movie?.overview }}</p>
            </div>
            <div class="flex flex-col space-y-4">
            <p class="py-2 text-sm text-yellow-400">Average Rating:⭐
                {{ movie?.vote_average }}</p>
            <p class="text-xs font-medium"> Status  :
                {{ movie?.status }}
            </p>
            <p class="text-xs font-medium"> Realease Date  :
                {{ movie?.release_date }}
            </p>
            <p class="text-xs font-medium">Budget  :
                {{ movie?.budget}}
            </p>
            <p class="text-xs font-medium">Language  :
                {{ movie?.original_language}}
            </p>
            <p class="text-xs font-medium">Originak Country  :
                {{ movie?.origin_country}}
            </p>
            <p class="text-xs font-medium">Vote Count  :
            {{ movie?.vote_count}}
            </p>
            <p class="text-xs font-medium">Adult  :
            {{ movie?.video}}
            </p>
           </div>
            <div  class="py-4 ">
                <button @click="showTrailer" class="py-2 px-4 bg-transparent text-xs hover:bg-[#FAF7F3] hover:text-black font-medium transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110   text-white border-2 rounded-lg">Watch Trailor</button>
            </div>            
             <!-- Trailer Modal -->
  <div
    v-if="trailerUrl"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
    @click.self="trailerUrl = null"
  >
    <div class="relative w-full max-w-2xl aspect-video">
      <iframe
        v-if="trailerUrl"
        :src="trailerUrl"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        class="w-full h-full rounded-lg"
      ></iframe>
      <button
        class="absolute text-2xl text-white top-2 right-2"
        @click="trailerUrl = null"
      >✕</button>
    </div>
  </div>
            
        </div>
        <div><img :src="`https://image.tmdb.org/t/p/w500${movie?.poster_path}`"
            alt="" class="w-64 border rounded-lg"></div>
        </div>
    </div>

    <div class="p-10 mx-auto text-white max-w-7xl">
        <div>
        <h1 class="text-3xl font-medium">Actors</h1>
    </div>
    <div class="flex flex-wrap items-center gap-10 cursor-pointer">
    <div v-for="actor in credits?.cast" :key="actor.id"  @click="() => router.push(`/people/${actor.id}`)" class="flex flex-col items-center gap-4 py-4 text-white ">
        <img :src="actor?.profile_path ? `http://image.tmdb.org/t/p/w500${actor?.profile_path}` : 'https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/08/placeholder-male.jpg'"
        alt="" class="object-cover w-32 h-32 rounded-full ">
        <h1>{{actor.name}}</h1>
    </div>
    </div>
    </div>
      <div class="p-10 mx-auto text-white max-w-7xl">
    <h2 class="py-2 mb-4 text-3xl font-semibold">Similar Movies</h2>
    <div v-if="similarMovies.length" class="flex flex-wrap mt-5 overflow-hidden transition-all duration-300 shadow-md rounded-xl hover:shadow-xl">
      <div
       @click="() => router.push(`/movies/${movie.id}`)"
        v-for="movie in similarMovies.slice(0, 4)"
        :key="movie.id"
        class="mx-auto mt-5 overflow-hidden transition-all duration-300 delay-75 rounded shadow cursor-pointer hover:scale-105 max-w-72 "
      >
        <img
          v-if="movie.poster_path"
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
          class="object-cover w-full h-96"
        />
        <div class="p-2 text-center text-white">
          <p class="text-sm font-medium">{{ movie.title }}</p>
        </div>
      </div>
    </div>
    <p v-else class="text-gray-400">No similar movies found.</p>
  </div>

</template>

<script setup>
import { useRouter } from 'vue-router';

const route = useRoute();
const movie = ref(null);
const config = useRuntimeConfig();
const router = useRouter();
const trailerUrl = ref(null);


const showTrailer = async () => {
  if (!movie.value) return;
  try {
    const response = await fetch(
      `${config.public.API_BASE_URL}movie/${movie.value.id}/videos`,
      {
        headers: {
          Authorization: `Bearer ${config.public.ACCESS_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    // Find the YouTube trailer
    const trailer = data.results.find(
      (vid) =>
        vid.site === "YouTube" &&
        vid.type === "Trailer"
    );
    if (trailer) {
      trailerUrl.value = `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;
    } else {
      alert("Trailer not available.");
    }
  } catch (error) {
    console.error("Error fetching trailer:", error);
    alert("Failed to load trailer.");
  }
};

const fetchMovie = async () => {
    try {
        const response = await fetch(`${config.public.API_BASE_URL}movie/${route.params.id}`, {
            headers: {
                Authorization: `Bearer ${config.public.ACCESS_TOKEN}`,
            },
        });
        const data = await response.json();
        movie.value = data;
    } catch (error) {
        console.error('Error fetching movies:', error);
    };
};

fetchMovie();
const routeCredits = useRoute();
const credits = ref(null);
const configCredits = useRuntimeConfig();

const fetchMovieCredits = async () => {
    try {
        const response = await fetch(`${config.public.API_BASE_URL}movie/${route.params.id}/credits`,{
            headers:{
                Authorization: `Bearer ${config.public.ACCESS_TOKEN}`,
            }
        })
        const data = await response.json();
        credits.value = data;
        
    } catch (error) {
        console.error(`Eroor fetching movie credits: #{error}`)
        
    }
}
fetchMovieCredits()
const similarMovies = ref([])

const fetchSimilarMovies = async () => {
  try {
    const res = await fetch(
      `${config.public.API_BASE_URL}movie/${route.params.id}/similar`,
      {
        headers: {
          Authorization: `Bearer ${config.public.ACCESS_TOKEN}`,
        },
      }
    )

    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`)
    const data = await res.json()
    // TMDb returns { results: [...] }
    similarMovies.value = data.results || []
  } catch (err) {
    console.error('Error fetching similar movies:', err)
  }
}
fetchSimilarMovies()

</script>