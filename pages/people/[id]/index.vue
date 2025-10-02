<template>
  <div class="min-h-screen bg-[#0f0f0f]">
    <!-- Hero Section -->
    <div class="relative py-16 bg-gradient-to-b from-black/80 to-[#0f0f0f]">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="flex flex-col gap-8 lg:flex-row lg:items-start">
          <!-- Profile Image -->
          <div class="flex-shrink-0 mx-auto lg:mx-0 w-72 sm:w-80 lg:w-96">
            <div class="relative overflow-hidden rounded-lg shadow-2xl aspect-[3/4] bg-gradient-to-b from-gray-800 to-gray-900">
              <img 
                :src="person?.profile_path ? `http://image.tmdb.org/t/p/original${person?.profile_path}` : 'https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/08/placeholder-male.jpg'"
                :alt="person?.name"
                class="absolute inset-0 object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          <!-- Bio Content -->
          <div class="flex-1 px-4 text-center lg:text-left lg:px-0">
            <h1 class="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {{ person?.name }}
            </h1>
            <!-- Biography -->

          <div class="mt-8">
              <h2 class="text-xl font-semibold text-white md:text-2xl">Biography</h2>
              <p class="mt-4 text-base leading-relaxed text-gray-300">
                {{ person?.biography || 'No biography available.' }}
              </p>
            </div>

            <!-- Info Grid -->
            <div class="grid grid-cols-2 gap-4 mt-6 sm:grid-cols-3 md:gap-6">
              <div class="p-3 transition-all rounded-lg bg-black/30 hover:bg-black/40">
                <span class="block text-sm text-gray-400">Birthday</span>
                <span class="font-medium text-white">{{ person?.birthday ? new Date(person.birthday).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A' }}</span>
              </div>
              <div class="p-3 transition-all rounded-lg bg-black/30 hover:bg-black/40">
                <span class="block text-sm text-gray-400">Known For</span>
                <span class="font-medium text-white">{{ person?.known_for_department || 'N/A' }}</span>
              </div>
              <div class="p-3 transition-all rounded-lg bg-black/30 hover:bg-black/40">
                <span class="block text-sm text-gray-400">Birth Place</span>
                <span class="font-medium text-white">{{ person?.place_of_birth || 'N/A' }}</span>
              </div>
              <div class="p-3 transition-all rounded-lg bg-black/30 hover:bg-black/40">
                <span class="block text-sm text-gray-400">Gender</span>
                <span class="font-medium text-white">{{ person?.gender === 1 ? 'Female' : person?.gender === 2 ? 'Male' : 'Other' }}</span>
              </div>
              <div class="p-3 transition-all rounded-lg bg-black/30 hover:bg-black/40">
                <span class="block text-sm text-gray-400">Popularity</span>
                <span class="font-medium text-white">{{ person?.popularity?.toFixed(1) || 'N/A' }}</span>
              </div>
            </div>            

           
          </div>
        </div>
      </div>
    </div>

    <!-- Movies Section -->
    <div class="px-4 py-16 mx-auto text-white max-w-7xl sm:px-6 lg:px-8">
      <div class="text-center lg:text-left">
        <h2 class="text-2xl font-bold md:text-3xl lg:text-4xl">Filmography</h2>
        <p class="mt-2 text-sm text-gray-400 md:text-base">Swipe or use buttons to see all {{ credits?.cast?.length || 0 }} movies</p>
      </div>

      <!-- Scrollable Container with Navigation -->
      <div class="relative mt-8 group md:mt-12">
        <!-- Scroll Buttons - Hidden on mobile, visible on hover for larger screens -->
        <button 
          @click="scrollMovies('left')"
          class="absolute left-0 z-20 hidden h-full px-2 py-2 transition-all transform -translate-y-1/2 rounded-l-lg md:px-4 lg:-ml-6 top-1/2 md:group-hover:block hover:bg-black/70"
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button 
          @click="scrollMovies('right')"
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

        <!-- Movies List -->
        <div 
          ref="movieContainer" 
          class="flex gap-4 pb-4 -mx-4 overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide md:gap-6 md:mx-0 md:pb-6"
        >
          <div
            v-for="movie in credits?.cast"
            :key="movie.id"
            @click="() => router.push(`/movies/${movie.id}`)"
            class="flex-shrink-0 transition-all duration-300 rounded-lg cursor-pointer group/card w-44 sm:w-48 md:w-56 hover:-translate-y-2 bg-gradient-to-b from-gray-900 to-gray-950"
          >
            <div class="relative">
              <!-- Movie Poster -->
              <div class="relative aspect-[2/3] overflow-hidden rounded-t-lg">
                <img
                  :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/600x900'"
                  :alt="movie.title"
                  class="absolute inset-0 object-cover w-full h-full transition-transform duration-300 group-hover/card:scale-110"
                />
              </div>

              <!-- Movie Info -->
              <div class="p-4 text-center">
                <h3 class="mb-1 text-base font-medium line-clamp-1">{{ movie.title }}</h3>
                <p class="text-sm text-gray-400 line-clamp-1">{{ movie.character || 'Unknown Role' }}</p>
              </div>

              <!-- Hover Overlay -->
              <div class="absolute inset-0 transition-opacity duration-300 rounded-lg opacity-0 group-hover/card:opacity-100 bg-gradient-to-t from-black/90 via-black/75 to-black/60">
                <div class="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
                  <h3 class="mb-2 text-base font-medium text-center line-clamp-2">{{ movie.title }}</h3>
                  <div class="flex items-center gap-2 mb-1 text-sm">
                    <span class="text-yellow-400">⭐</span>
                    <span>{{ movie.vote_average?.toFixed(1) }}</span>
                  </div>
                  <div class="text-xs text-gray-300">
                    {{ movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Release date unknown' }}
                  </div>
                  <div class="mt-2 text-sm italic text-gray-300">
                    as {{ movie.character || 'Unknown Role' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!credits?.cast?.length" class="flex items-center justify-center min-h-[200px]">
        <p class="text-gray-400">No movie credits found for this person.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const person = ref(null);
const config = useRuntimeConfig();
const credits = ref(null);
const movieContainer = ref(null);

const scrollMovies = (direction) => {
  if (!movieContainer.value) return;
  
  const scrollAmount = 600; // Adjust this value to control scroll distance
  const currentScroll = movieContainer.value.scrollLeft;
  const newScroll = direction === 'left' 
    ? currentScroll - scrollAmount 
    : currentScroll + scrollAmount;
    
  movieContainer.value.scrollTo({
    left: newScroll,
    behavior: 'smooth'
  });
};

const movieCredits = async () => {
  try {
    const response = await fetch(`${config.public.API_BASE_URL}person/${route.params.id}/movie_credits`, {
      headers: {
        Authorization: `Bearer ${config.public.ACCESS_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Sort by popularity or release date if available
    if (data.cast) {
      data.cast.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }
    credits.value = data;
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    credits.value = { cast: [] };
  }
}
movieCredits();

const fetchTv = async () => {
  try {
    const response = await fetch(`${config.public.API_BASE_URL}person/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${config.public.ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();
    person.value = data;
  } catch (error) {
    console.error('Error fetching person details:', error);
  }
};
fetchTv();
</script>

<style>
/* Hide Scrollbar */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Chrome, Safari and Opera */
}
</style>