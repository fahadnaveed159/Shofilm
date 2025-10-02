<template>
   <div
    class="relative w-full min-h-screen text-white bg-center bg-cover"
    :style="`background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`"
  >
    <div class="flex flex-col items-center justify-start min-h-screen gap-8 px-4 py-8 mx-auto lg:items-center lg:flex-row lg:py-16 lg:px-8 max-w-7xl">
      <!-- Poster -->
      <div class="flex-shrink-0 w-48 md:w-56 lg:w-64 xl:w-72">
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie?.poster_path}`"
          :alt="movie?.title"
          class="w-full transition-transform duration-300 border shadow-2xl rounded-xl border-gray-700/50 hover:scale-105"
        />
      </div>

      <!-- Right Content -->
      <div class="flex flex-col justify-center flex-1 w-full gap-6 px-0 mt-6 text-center lg:text-left lg:mt-0 lg:px-8">
        <!-- Title & Overview -->
        <div>
          <h1 class="text-3xl font-bold tracking-wide md:text-4xl lg:text-5xl">{{ movie?.title }}</h1>
          <p class="mt-4 text-sm leading-relaxed text-gray-300 md:text-base lg:text-lg">
            {{ movie?.overview }}
          </p>
        </div>

        <!-- Info Grid -->
        <div class="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3 md:gap-4">
          <div class="p-3 transition-all rounded-lg bg-black/30 hover:bg-black/40">
            <span class="block text-gray-400">Rating</span>
            <span class="text-lg font-semibold text-yellow-400">⭐ {{ movie?.vote_average?.toFixed(1) }}</span>
          </div>
          <div class="p-3 transition-all rounded-lg bg-black/30 hover:bg-black/40">
            <span class="block text-gray-400">Status</span>
            <span class="font-semibold">{{ movie?.status }}</span>
          </div>
          <div class="p-3 transition-all rounded-lg bg-black/30 hover:bg-black/40">
            <span class="block text-gray-400">Release Date</span>
            <span class="font-semibold">{{ new Date(movie?.release_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}</span>
          </div>
          <div class="p-3 transition-all rounded-lg bg-black/30 hover:bg-black/40">
            <span class="block text-gray-400">Budget</span>
            <span class="font-semibold">$ {{ movie?.budget?.toLocaleString() }}</span>
          </div>
          <div class="p-3 transition-all rounded-lg bg-black/30 hover:bg-black/40">
            <span class="block text-gray-400">Language</span>
            <span class="font-semibold uppercase">{{ movie?.original_language }}</span>
          </div>
          <div class="p-3 transition-all rounded-lg bg-black/30 hover:bg-black/40">
            <span class="block text-gray-400">Vote Count</span>
            <span class="font-semibold">{{ movie?.vote_count?.toLocaleString() }}</span>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex flex-wrap items-center justify-center gap-4 mt-2 lg:justify-start">
          <button
            @click="showTrailer"
            class="py-3 px-6 bg-transparent text-sm hover:bg-[#FAF7F3] hover:text-black font-medium transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-white border-2 rounded-lg"
          >
            ▶ Watch Trailer
          </button>
          <!-- Add more action buttons here if needed -->
        </div>
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
        class="absolute text-3xl text-white top-2 right-2 hover:text-red-400"
        @click="trailerUrl = null"
      >
        ✕
      </button>
    </div>
  </div>
</div>


    <!-- Cast Section -->
    <div class="px-4 py-16 mx-auto text-white max-w-7xl sm:px-6 lg:px-8">
      <div class="text-center lg:text-left">
        <h2 class="text-2xl font-bold md:text-3xl lg:text-4xl">Cast <span class="text-orange-500">Members</span></h2>
        <p class="mt-2 text-sm text-gray-400 md:text-base">Swipe or use buttons to see all actors</p>
      </div>

      <!-- Scrollable Container with Navigation -->
      <div class="relative mt-8 group md:mt-12">
        <!-- Scroll Buttons - Hidden on mobile, visible on hover for larger screens -->
        <button 
          @click="scrollActors('left')"
          class="absolute left-0 z-20 hidden h-full px-2 py-2 transition-all transform -translate-y-1/2 rounded-l-lg md:px-4 lg:-ml-6 top-1/2 md:group-hover:block hover:bg-black/70"
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button 
          @click="scrollActors('right')"
          class="absolute right-0 z-20 hidden h-full px-2 py-2 transition-all transform -translate-y-1/2 rounded-r-lg md:px-4 lg:-mr-6 top-1/2 md:group-hover:block hover:bg-black/70"
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Gradient Shadows -->
        <div class="absolute left-0 z-10 hidden w-12 h-full pointer-events-none md:block bg-gradient-to-r from-[#0f0f0f] to-transparent"></div>
        <div class="absolute right-0 z-10 hidden w-12 h-full pointer-events-none md:block bg-gradient-to-l from-[#0f0f0f] to-transparent"></div>
        
        <!-- Actor List -->
        <div 
          ref="actorContainer" 
          class="flex gap-4 pb-4 -mx-4 overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide md:gap-6 md:mx-0 md:pb-6"
        >
          <div 
            v-for="actor in credits?.cast" 
            :key="actor.id" 
            @click="() => router.push(`/people/${actor.id}`)" 
            class="flex-shrink-0 w-32 transition-all duration-300 cursor-pointer sm:w-36 md:w-40 group/card hover:-translate-y-2"
          >
            <div class="overflow-hidden rounded-lg shadow-lg ">
              <div class="relative aspect-[3/4]">
                <img 
                  :src="actor?.profile_path ? `http://image.tmdb.org/t/p/w500${actor?.profile_path}` : 'https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/08/placeholder-male.jpg'"
                  :alt="actor.name"
                  class="absolute inset-0 object-cover w-full h-full transition-transform duration-300 group-hover/card:scale-110"
                >
              </div>
              <div class="p-3 text-center">
                <h3 class="font-medium truncate">{{ actor.name }}</h3>
                <p class="text-sm text-gray-400 truncate">{{ actor.character }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Similar Movies Section -->
    <div class="px-4 py-16 mx-auto text-white max-w-7xl sm:px-6 lg:px-8">
      <div class="text-center lg:text-left">
        <h2 class="text-2xl font-bold md:text-3xl lg:text-4xl">Similar <span class="text-orange-500">Movies</span></h2>
        <p class="mt-2 text-sm text-gray-400 md:text-base">You might also like these movies</p>
      </div>

      <div v-if="similarMovies.length" class="grid grid-cols-2 gap-4 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 lg:gap-8">
        <div
          v-for="movie in similarMovies.slice(0, 4)"
          :key="movie.id"
          @click="() => router.push(`/movies/${movie.id}`)"
          class="relative overflow-hidden transition-all duration-300 rounded-lg cursor-pointer group hover:-translate-y-2 "
        >
          <!-- Main content container -->
          <div class="relative">
            <!-- Image container with aspect ratio -->
            <div class="relative aspect-[2/3]">
              <img
                :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/600x900'"
                :alt="movie.title"
                class="absolute inset-0 object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <!-- Title section -->
            <div class="p-4 text-center">
              <h3 class="text-base font-medium line-clamp-2">{{ movie.title }}</h3>
            </div>
            
            <!-- Full overlay that covers the entire card -->
            <div class="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black/90 via-black/75 to-black/60">
              <div class="absolute inset-0 flex flex-col items-center justify-end p-4 text-white">
                <h3 class="mb-2 text-base font-medium text-center line-clamp-2">{{ movie.title }}</h3>
                <div class="flex items-center gap-2 mb-1 text-sm">
                  <span class="text-yellow-400">⭐</span>
                  <span>{{ movie.vote_average?.toFixed(1) }}</span>
                </div>
                <div class="text-xs text-gray-300">
                  {{ new Date(movie.release_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
                </div>
                <div class="absolute top-4 right-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="flex items-center justify-center min-h-[200px]">
        <p class="text-gray-400">No similar movies found.</p>
      </div>
    </div>

</template>

<script setup>

const route = useRoute();
const movie = ref(null);
const config = useRuntimeConfig();
const router = useRouter();
const trailerUrl = ref(null);
const actorContainer = ref(null);

const scrollActors = (direction) => {
  if (!actorContainer.value) return;
  
  const scrollAmount = 600; // Adjust this value to control scroll distance
  const currentScroll = actorContainer.value.scrollLeft;
  const newScroll = direction === 'left' 
    ? currentScroll - scrollAmount 
    : currentScroll + scrollAmount;
    
  actorContainer.value.scrollTo({
    left: newScroll,
    behavior: 'smooth'
  });
};


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
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Find the YouTube trailer
    const trailer = data.results.find(
      (vid) =>
        vid.site === "YouTube" &&
        (vid.type === "Trailer" || vid.type === "Teaser")
    );
    if (trailer) {
      trailerUrl.value = `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;
    } else {
      alert("Trailer not available for this movie.");
    }
  } catch (error) {
    console.error("Error fetching trailer:", error);
    alert("Failed to load trailer. Please try again later.");
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

<style>
/* Custom Scrollbar Styling */
.scrollbar-custom {
  scrollbar-width: thin;  /* Firefox */
  scrollbar-color: #4B5563 #1F2937;  /* Firefox */
}

.scrollbar-custom::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.scrollbar-custom::-webkit-scrollbar-track {
  background: #1F2937;
  border-radius: 4px;
}

.scrollbar-custom::-webkit-scrollbar-thumb {
  background: #4B5563;
  border-radius: 4px;
}

.scrollbar-custom::-webkit-scrollbar-thumb:hover {
  background: #6B7280;
}

/* Hide Scrollbar Option */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Chrome, Safari and Opera */
}
</style>