<template>
  <div
    class="text-white w-full bg-cover bg-center h-[calc(100vh-80px)]"
    :style="`background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://image.tmdb.org/t/p/original${Tv?.backdrop_path}')`"
  >
    <!-- <pre>
            {{Tv}}
        </pre> -->
    <div
      class="flex items-center justify-between h-full p-10 mx-auto max-w-7xl"
    >
      <div class="flex flex-col justify-center w-full gap-4">
        <div>
          <button class="px-4 py-1 text-sm font-medium border rounded-full">
            Drama
          </button>
        </div>
        <h1 class="text-4xl font-medium">{{ Tv?.name }}</h1>
        <p class="text-sm w-96 text-slate-200">{{ Tv?.overview }}</p>
        <p class="text-sm">Status: {{ Tv?.status }}</p>
        <p class="py-2 text-sm text-yellow-400">
          Average Rating:⭐ {{ Tv?.vote_average }}
        </p>
        <p class="py-2 text-sm text-yellow-400">
          Average Rating:⭐ {{ Tv?.vote_count }}
        </p>
        <div class="py-4">
          <button
    class="py-2 px-4 bg-transparent hover:bg-[#FAF7F3] hover:text-black font-medium transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-sm  text-white border-2 rounded-lg"
    @click="showTrailer" 
  >
    Watch Trailer
  </button>
        </div>
      </div>
      <div>
        <img :src="`https://image.tmdb.org/t/p/w500${Tv?.poster_path}`" alt=""
        class="w-64 border rounded-lg"
      </div>
    </div>
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
  

  <div class="p-10 mx-auto text-white max-w-7xl">
    <div>
      <h1 class="text-3xl font-medium">Actor</h1>
    </div>
    <div class="flex flex-wrap items-center gap-10 cursor-pointer">
      <div
        v-for="actor in credits?.cast"
        :key="actor.id"
        @click="() => router.push(`/people/${actor.id}`)"
        class="flex flex-col items-center gap-4 py-4 text-white"
      >
        <img
          :src="
            actor?.profile_path
              ? `http://image.tmdb.org/t/p/w500${actor?.profile_path}`
              : 'https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/08/placeholder-male.jpg'
          "
          alt=""
          class="object-cover w-32 h-32 rounded-full"
        />
        <h1>{{ actor.name }}</h1>
      </div>
    </div>
  </div>
  <div class="p-10 mx-auto text-white max-w-7xl">
    <h2 class="py-2 mb-4 text-3xl font-semibold">Similar Shows</h2>
    <div v-if="similarTvShows.length" class="flex flex-wrap mt-5 overflow-hidden transition-all duration-300 shadow-md rounded-xl hover:shadow-xl">
      <div
       @click="() => router.push(`/TV/${tv.id}`)"
        v-for="tv in similarTvShows.slice(0, 4)"
        :key="tv.id"
        class="mx-auto mt-5 overflow-hidden transition-all duration-300 delay-75 rounded shadow cursor-pointer hover:scale-105 max-w-72 "
      >
        <img
          v-if="tv.poster_path"
          :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`"
          :alt="tv.title"
          class="object-cover w-full h-96"
        />
        <div class="p-2 text-center text-white">
          <p class="text-sm font-medium">{{ tv.title }}</p>
        </div>
      </div>
    </div>
    <p v-else class="text-gray-400">No similar movies found.</p>
  </div>
</template>

<script setup>
import { routerKey } from "vue-router";

const router = useRouter();
const route = useRoute();
const Tv = ref(null);
const config = useRuntimeConfig();
const trailerUrl = ref(null);

const showTrailer = async () => {
  if (!Tv.value) return;
  try {
    const response = await fetch(
      `${config.public.API_BASE_URL}tv/${Tv.value.id}/videos`,
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


const fetchTv = async () => {
  try {
    const response = await fetch(
      `${config.public.API_BASE_URL}tv/${route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${config.public.ACCESS_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    Tv.value = data;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};
fetchTv();

const routeCredits = useRoute();
const credits = ref(null);
const configCredits = useRuntimeConfig();

const fetchMovieCredits = async () => {
  try {
    const response = await fetch(
      `${config.public.API_BASE_URL}tv/${route.params.id}/credits`,
      {
        headers: {
          Authorization: `Bearer ${config.public.ACCESS_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    credits.value = data;
  } catch (error) {
    console.error(`Eroor fetching movie credits: #{error}`);
  }
};
fetchMovieCredits();

const similarTvShows = ref([])

const fetchSimilarTvShows = async () => {
  try {
    const res = await fetch(
      `${config.public.API_BASE_URL}tv/${route.params.id}/similar`,
      {
        headers: {
          Authorization: `Bearer ${config.public.ACCESS_TOKEN}`,
        },
      }
    )

    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`)
    const data = await res.json()
    // TMDb returns { results: [...] }
    similarTvShows.value = data.results || []
  } catch (err) {
    console.error('Error fetching similar TV shows:', err)
  }
}
fetchSimilarTvShows()

</script>
