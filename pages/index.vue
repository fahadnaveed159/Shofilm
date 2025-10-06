<template>
  <div class="relative flex flex-col justify-center h-[calc(100vh-64px)] bg-black overflow-hidden">
    <!-- Current Background -->
    <div
      class="absolute inset-0 transition-all duration-[1.5s] ease-in-out bg-center bg-no-repeat bg-cover"
      :style="{
        backgroundImage: `url('https://image.tmdb.org/t/p/original${selectedMovie?.backdrop_path}')`,
        backgroundAttachment: 'fixed',
        opacity: isTransitioning ? 0 : 1,
        transform: isTransitioning ? 'scale(1.05)' : 'scale(1)'
      }"
    ></div>
    <!-- Next Background -->
    <div
      class="absolute inset-0 transition-all duration-[1.5s] ease-in-out bg-center bg-no-repeat bg-cover"
      :style="{
        backgroundImage: `url('https://image.tmdb.org/t/p/original${nextMovie?.backdrop_path}')`,
        backgroundAttachment: 'fixed',
        opacity: isTransitioning ? 1 : 0,
        transform: isTransitioning ? 'scale(1)' : 'scale(1.05)'
      }"
    ></div>

    <!-- Overlay with gradient -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/80"></div>

    <!-- Content -->
    <div class="relative w-full px-6 mx-auto text-white max-w-7xl">
      <div class="space-y-4">
        <!-- Rating -->
        <div 
          class="transition-all duration-1000 transform"
          :class="[
            isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0',
            'delay-[0ms]'
          ]"
        >
          <p class="inline-flex items-center py-2 text-yellow-400">
            <span class="mr-1">⭐</span>
            <span class="text-lg">{{ selectedMovie?.vote_average?.toFixed(1) }}</span>
          </p>
        </div>

        <!-- Title -->
        <div 
          class="transition-all duration-1000 transform"
          :class="[
            isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0',
            'delay-[200ms]'
          ]"
        >
          <h1 class="text-4xl font-bold md:text-5xl lg:text-6xl">{{ selectedMovie?.title }}</h1>
        </div>

        <!-- Overview -->
        <div 
          class="transition-all duration-1000 transform"
          :class="[
            isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0',
            'delay-[400ms]'
          ]"
        >
          <p class="w-full mt-4 text-base md:w-3/4 md:text-lg text-slate-300 pb-7">
            {{ selectedMovie?.overview }}
          </p>
        </div>

        <!-- Button -->
        <div 
          class="transition-all duration-1000 transform"
          :class="[
            isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0',
            'delay-[600ms]'
          ]"
        >
          <button
            class="py-2 px-4 bg-transparent hover:bg-[#FAF7F3] hover:text-black font-medium transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-white border-2 rounded-lg"
            @click="showTrailer"
          >
            ▶ Watch Trailer
          </button>
        </div>
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
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="px-5 py-8 mx-auto text-center max-w-7xl xl:text-start">
    <h1 class="py-4 text-3xl font-medium text-white md:text-4xl">
      Top <span class="text-orange-500">Rated</span> Movies
    </h1>
    <div
      class="grid grid-cols-2 mt-8 gap-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4"
    >
      <div
        v-for="item in movies"
        :key="item.title"
        @click="() => router.push(`/movies/${item.id}`)"
        class="relative overflow-hidden rounded-lg cursor-pointer group "
      >
        <!-- Movie Poster with Hover Effects -->
        <div class="relative aspect-[2/3] overflow-hidden">
           <img
              :src="item?.poster_path ? `https://image.tmdb.org/t/p/original${item.poster_path}` : 'https://placehold.co/600x900'"
              :alt="item.title"
              class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            />
          <!-- Overlay with Additional Info -->
          <div 
            class="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-500 opacity-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent group-hover:opacity-100"
          >
            <div class="transition-transform duration-300 transform translate-y-4 group-hover:translate-y-0">
              <p class="mb-1 text-sm font-medium text-yellow-400">
                ⭐ {{ item?.vote_average?.toFixed(1) }}
              </p>
              <p class="text-xs text-gray-300">
                {{ new Date(item.release_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Movie Title with Hover Effect -->
         <div class="flex flex-col items-center justify-center flex-1 p-4 text-center transition-all duration-300 transform">
            <h2 class="text-base font-medium text-white line-clamp-2 group-hover:text-orange-500">{{ item.title }}</h2>
          </div>
       

        <!-- Quick Action Button -->
        <div 
          class="absolute transition-transform duration-300 transform translate-x-10 top-2 right-2 group-hover:translate-x-0"
        >
          <div class="flex items-center justify-center w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="w-full h-1 mt-10 bg-orange-600"></div>

  <div class="px-5 py-8 mx-auto text-center max-w-7xl xl:text-start">
    <h1 class="py-4 text-3xl font-medium text-white md:text-4xl">
      Trending <span class="text-orange-500">T.V</span> shows
    </h1>
    <div
      class="grid grid-cols-2 mt-8 gap-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4"
    >
      <div
        v-for="item in tvShows"
        :key="item.id"
        @click="() => router.push(`/tv/${item.id}`)"
        class="relative overflow-hidden rounded-lg cursor-pointer group "
      >
        <!-- TV Show Poster with Hover Effects -->
        <div class="relative aspect-[2/3] overflow-hidden">
          <img
            :src="`https://image.tmdb.org/t/p/w500${item?.poster_path}`"
            :alt="item.original_name"
            class="object-cover w-full h-full transition-all duration-500 transform group-hover:scale-110"
          />
          <!-- Overlay with Additional Info -->
          <div 
            class="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-500 opacity-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent group-hover:opacity-100"
          >
            <div class="transition-transform duration-300 transform translate-y-4 group-hover:translate-y-0">
              <p class="mb-1 text-sm font-medium text-yellow-400">
                ⭐ {{ item?.vote_average?.toFixed(1) }}
              </p>
              <p class="text-xs text-gray-300">
                {{ new Date(item.first_air_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
              </p>
            </div>
          </div>
        </div>

        <!-- TV Show Title with Hover Effect -->
       <div class="flex flex-col items-center justify-center flex-1 p-4 text-center transition-all duration-300 transform">
            <h2 class="text-base font-medium text-white line-clamp-2 group-hover:text-orange-500">{{ item.original_name }}</h2>
          </div>

        <!-- Quick Action Button -->
        <div 
          class="absolute transition-transform duration-300 transform translate-x-10 top-2 right-2 group-hover:translate-x-0"
        >
          <div class="flex items-center justify-center w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full mt-10 rounded-full">
    <div class="p-6 text-center text-white">
      <h2 class="mb-2 text-3xl font-semibold">🔥 Featured This Week</h2>
      <p class="">
        Don’t miss out on trending blockbusters and fan-favorite picks!
      </p>
    </div>
  </div>
  
</template>

<script setup>

const movies = ref([]);
const selectedMovie = ref(null);
const nextMovie = ref(null);
const isTransitioning = ref(false);
const config = useRuntimeConfig();
const router = useRouter();
const trailerUrl = ref(null);

const changeMovie = async () => {
  if (movies.value.length === 0) return;
  
  // Get next movie index
  const currentIndex = movies.value.findIndex(m => m.id === selectedMovie.value?.id);
  const nextIndex = currentIndex === -1 || currentIndex === movies.value.length - 1 ? 0 : currentIndex + 1;
  
  // Set up next image
  nextMovie.value = movies.value[nextIndex];
  
  // Start transition
  isTransitioning.value = true;
  
  // Wait for content and background fade out (1.5s)
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Update current movie
  selectedMovie.value = nextMovie.value;
  
  // Wait slightly before starting fade in
  await new Promise(resolve => setTimeout(resolve, 50));
  
  // End transition to trigger fade in
  isTransitioning.value = false;
};

// Setup auto-changing interval
onMounted(() => {
  // Initial setup
  if (movies.value.length > 0) {
    selectedMovie.value = movies.value[0];
    nextMovie.value = movies.value[1];
  }
  
  const interval = setInterval(changeMovie, 6000);
  
  // Cleanup on unmount
  onUnmounted(() => {
    clearInterval(interval);
  });
});

const showTrailer = async () => {
  if (!selectedMovie.value) return;
  try {
    const response = await fetch(
      `${config.public.API_BASE_URL}movie/${selectedMovie.value.id}/videos`,
      {
        headers: {
          Authorization: `Bearer ${config.public.ACCESS_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    // Find the YouTube trailer
    const trailer = data.results.find(
      (vid) => vid.site === "YouTube" && vid.type === "Trailer"
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
      selectedMovie.value =
        movies.value[Math.floor(Math.random() * movies.value.length)];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};
fetchMovies();

const tvShows = ref([]);
const configTV = useRuntimeConfig();

const fetchTvShows = async () => {
  try {
    const response = await fetch(`${configTV.public.API_BASE_URL}tv/popular`, {
      headers: {
        Authorization: `Bearer ${configTV.public.ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();
    tvShows.value = data.results;
  } catch (error) {
    console.eroor(`Error fethching tv shows:`, eroor);
  }
};

fetchTvShows();
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

* {
  font-family: "Poppins", sans-serif;
}

@media (max-width: 768px) {
  .bg-fixed {
    background-attachment: scroll !important;
  }
}

/* Cinematic transitions */
.transition-all {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.delay-\[0ms\] { transition-delay: 0ms; }
.delay-\[200ms\] { transition-delay: 200ms; }
.delay-\[400ms\] { transition-delay: 400ms; }
.delay-\[600ms\] { transition-delay: 600ms; }

/* Ensure smooth transitions */
.transform {
  will-change: transform, opacity;
}
</style>
