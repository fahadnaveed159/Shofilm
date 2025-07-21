<template>
    <div class="text-white w-full bg-cover bg-center h-[calc(100vh-80px)]"
        :style="`background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`">
        <div class="max-w-7xl mx-auto p-10 h-full flex justify-between  items-center">
            
            <div class="flex-col justify-center flex gap-4">
                <div class="">
                  <h1 class="text-4xl font-medium  py-3">{{ movie?.title }}</h1>
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
            <div  class=" py-4">
                <button @click="showTrailer" class="py-2 px-4 bg-transparent text-xs hover:bg-[#FAF7F3] hover:text-black font-medium transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110   text-white border-2 rounded-lg">Watch Trailor</button>
            </div>            
             <!-- Trailer Modal -->
  <div
    v-if="trailerUrl"
    class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
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
        class="absolute top-2 right-2 text-white text-2xl"
        @click="trailerUrl = null"
      >✕</button>
    </div>
  </div>
            
        </div>
        <div><img :src="`https://image.tmdb.org/t/p/w500${movie?.poster_path}`"
            alt="" class="w-64 border  rounded-lg"></div>
        </div>
    </div>

    <div class="text-white max-w-7xl mx-auto  p-10">
        <div>
        <h1 class="text-2xl font-medium">Actor</h1>
    </div>
    <div class="flex cursor-pointer flex-wrap gap-10  items-center">
    <div v-for="actor in credits?.cast" :key="actor.id"  @click="() => router.push(`/people/${actor.id}`)" class=" text-white gap-4 py-4 flex flex-col items-center">
        <img :src="actor?.profile_path ? `http://image.tmdb.org/t/p/w500${actor?.profile_path}` : 'https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/08/placeholder-male.jpg'"
        alt="" class=" w-32 rounded-full h-32 object-cover">
        <h1>{{actor.name}}</h1>
    </div>
    </div>
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

</script>