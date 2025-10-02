<template>
    <div class="min-h-screen bg-[#0f0f0f] fade-up">
        <div class="relative py-16 text-center">
            <h1 class="text-4xl font-bold text-white md:text-5xl">Search Results for <span class="text-orange-500">"{{ route.params.query }}"</span></h1>
            <div class="px-5 mt-4 text-gray-400 md:px-0">Showing movies and TV shows matching your search</div>
        </div>

        <!-- Movies Section -->
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h2 class="py-4 mb-6 text-2xl font-bold text-white md:text-4xl">Movies</h2>
            <div class="grid grid-cols-2 gap-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4">
                <div v-for="m in movie" :key="m.id" @click="() => router.push(`/movies/${m.id}`)"
                    class="relative flex flex-col overflow-hidden transition-all duration-300 rounded-lg shadow-lg cursor-pointer group hover:-translate-y-2">
                    <!-- Movie Poster -->
                    <div class="relative aspect-[2/3] overflow-hidden bg-gray-800">
                        <img :src="m.poster_path ? `https://image.tmdb.org/t/p/original${m.poster_path}` : 'https://placehold.co/600x900'"
                            :alt="m.title"
                            class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110">
                        <!-- Overlay with additional info -->
                        <div class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-100">
                            <div class="absolute bottom-0 left-0 right-0 p-3 text-white">
                                <div class="mb-1 text-sm text-yellow-400">⭐ {{ m.vote_average?.toFixed(1) }}</div>
                                <div class="text-xs text-gray-300">{{ m.release_date ? new Date(m.release_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Release date unknown' }}</div>
                            </div>
                        </div>
                    </div>
                    <!-- Movie Info -->
                    <div class="flex flex-col items-center justify-center flex-1 p-2 py-4 text-center bg-gray-950">
                        <h2 class="text-base font-medium text-white line-clamp-2">{{ m.title }}</h2>
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

            <!-- TV Shows Section -->
            <h2 class="py-4 mt-12 mb-6 text-2xl font-bold text-white md:text-4xl">T.V <span class="text-orange-500">Shows</span></h2>
            <div class="grid grid-cols-2 gap-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4">
                <div v-for="tv in Tv" :key="tv.id" @click="() => router.push(`/tv/${tv.id}`)"
                    class="relative flex flex-col overflow-hidden transition-all duration-300 rounded-lg shadow-lg cursor-pointer group hover:-translate-y-2">
                    <!-- TV Show Poster -->
                    <div class="relative aspect-[2/3] overflow-hidden bg-gray-800">
                        <img :src="tv.poster_path ? `https://image.tmdb.org/t/p/original${tv.poster_path}` : 'https://placehold.co/600x900'"
                            :alt="tv.name"
                            class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110">
                        <!-- Overlay with additional info -->
                        <div class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-100">
                            <div class="absolute bottom-0 left-0 right-0 p-3 text-white">
                                <div class="mb-1 text-sm text-yellow-400">⭐ {{ tv.vote_average?.toFixed(1) }}</div>
                                <div class="text-xs text-gray-300">{{ tv.first_air_date ? new Date(tv.first_air_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Release date unknown' }}</div>
                            </div>
                        </div>
                    </div>
                    <!-- TV Show Info -->
                    <div class="flex flex-col items-center justify-center flex-1 p-2 py-4 text-center bg-gray-950">
                        <h2 class="text-base font-medium text-white line-clamp-2">{{ tv.name }}</h2>
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
    </div>
</template>

<script setup>
const route = useRoute();
const Tv = ref(null);
const movie = ref(null);
const config = useRuntimeConfig();
const router = useRouter();

const fetchTv = async () => {
    try {
        const response = await fetch(`${config.public.API_BASE_URL}search/tv?query=${route.params.query}`, {
            headers: {
                Authorization: `Bearer ${config.public.ACCESS_TOKEN}`,
            },
        });
        const data = await response.json();
        Tv.value = data.results;
    } catch (error) {
        console.error('Error fetching TV shows:', error);
    }
};

const fetchMovie = async () => {
    try {
        const response = await fetch(`${config.public.API_BASE_URL}search/movie?query=${route.params.query}`, {
            headers: {
                Authorization: `Bearer ${config.public.ACCESS_TOKEN}`,
            },
        });
        const data = await response.json();
        movie.value = data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
};

// Initial fetch
Promise.all([fetchMovie(), fetchTv()]);
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