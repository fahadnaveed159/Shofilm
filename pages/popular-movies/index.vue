<template>
   
   <div class="min-h-screen bg-[#0f0f0f] fade-up">
    <!-- Header Section -->
    <div class="relative py-16 text-center">
      <h1 class="text-4xl font-bold text-white md:text-5xl">Popular <span class="text-orange-500">Movies</span></h1>
      <div class="px-5 mt-4 text-gray-400 md:px-0">Discover the most popular movies among viewers worldwide</div>
    </div>

    <!-- Movies Grid Section -->
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 gap-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4">
        <div 
          v-for="movie in movies" 
          :key="movie.id" 
          @click="() => router.push(`/movies/${movie.id}`)"
          class="relative flex flex-col overflow-hidden transition-all duration-300 rounded-lg shadow-lg cursor-pointer group hover:-translate-y-2"
        >
          <!-- Movie Poster -->
          <div class="relative aspect-[2/3] overflow-hidden bg-gray-800">
            <img
              :src="movie?.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : 'https://placehold.co/600x900'"
              :alt="movie.title"
              class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            />
            <!-- Overlay with additional info -->
            <div class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-100">
              <div class="absolute bottom-0 left-0 right-0 p-3 text-white">
                <div class="mb-1 text-sm text-yellow-400">⭐ {{ movie.vote_average?.toFixed(1) }}</div>
                <div class="text-xs text-gray-300">{{ new Date(movie.release_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}</div>
              </div>
            </div>
          </div>

          <!-- Movie Info -->
          <div class="flex flex-col items-center justify-center flex-1 p-2 py-4 text-center bg-gray-950">
            <h2 class="text-base font-medium text-white line-clamp-2">{{ movie.title }}</h2>
          </div>

          <!-- Quick Actions -->
          <div class="absolute top-2 right-2">
            <div class="flex items-center justify-center w-8 h-8 transition-colors bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Load More Section -->
    <div class="flex justify-center py-12">
      <button 
        @click="loadMore"
        :disabled="isLoading"
        class="px-6 py-3 text-sm font-medium text-white transition-all duration-300 border-2 rounded-lg hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isLoading ? 'Loading...' : 'Load More Movies' }}
      </button>
    </div>
   </div>
   
</template>

<script setup>
const movies = ref([]);
const currentPage = ref(1);
const isLoading = ref(false);
const config = useRuntimeConfig();
const router = useRouter();

const fetchMovies = async (page = 1) => {
  if (isLoading.value) return;
  
  try {
    isLoading.value = true;
    const response = await fetch(
      `${config.public.API_BASE_URL}movie/popular?page=${page}`, 
      {
        headers: {
          Authorization: `Bearer ${config.public.ACCESS_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    
    if (page === 1) {
      movies.value = data.results;
    } else {
      movies.value = [...movies.value, ...data.results];
    }
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching movies:', error);
  } finally {
    isLoading.value = false;
  }
};

const loadMore = () => {
  fetchMovies(currentPage.value + 1);
};

// Initial fetch
fetchMovies();
</script>


<style>

.fade-up {
            animation: fadeUp 0.8s ease-out;
        }
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

</style>