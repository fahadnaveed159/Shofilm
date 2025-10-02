<template>
    <div class="min-h-screen bg-[#0f0f0f] fade-up">
        <!-- Header Section -->
        <div class="relative py-16 text-center">
            <h1 class="text-4xl font-bold text-white md:text-5xl">Popular <span class="text-orange-500">T.V Shows</span></h1>
            <div class="px-5 mt-4 text-gray-400 md:px-0">Discover the most trending TV series everyone's watching</div>
        </div>

        <!-- TV Shows Grid Section -->
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="grid grid-cols-2 gap-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4">
                <div v-for="tv in tvShows" :key="tv.id" 
                    @click="() => router.push(`/tv/${tv.id}`)"
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
                                <div class="text-xs text-gray-300">{{ new Date(tv.first_air_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}</div>
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

        <!-- Pagination Controls -->
        <div class="flex justify-center py-12">
            <div class="flex items-center space-x-4 font-medium">
                <button @click="changePage(meta.page - 1)" :disabled="meta.page === 1"
                    class="px-6 py-2 text-sm font-medium text-white transition-all duration-300 border-2 rounded-lg hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed">
                    Previous
                </button>
                <span class="text-white">Page {{ meta.page }} of {{ meta.total_pages }}</span>
                <button @click="changePage(meta.page + 1)" :disabled="meta.page === meta.total_pages"
                    class="px-8 py-2 text-sm font-medium text-white transition-all duration-300 border-2 rounded-lg hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed">
                    Next
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const router = useRouter();
const tvShows = ref([]);
const configTV = useRuntimeConfig();
const meta = ref({
    page: 1,
    total_pages: 0,
    total_results: 0,
})

const myNumber = 1
const yourNm = '2'
if (myNumber === yourNm) {
    console.log('equal')
} else {
    console.log('not equal')
}

const fetchTvShows = async (page = 1) => {
    try {
        const response = await fetch(`${configTV.public.API_BASE_URL}/discover/tv?page=${page}`, {
            headers: {
                Authorization: `Bearer ${configTV.public.ACCESS_TOKEN}`,
            }
        })
        const data = await response.json();
        tvShows.value = data.results;
        meta.value.page = data?.page || 1;
        meta.value.total_pages = data?.total_pages || 0;
        meta.value.total_results = data?.total_results || 0;

    } catch (error) {
        console.eroor(`Error fethching tv shows:`, eroor)
    }
}

const changePage = (newPage) => {
    if (newPage > 0 && newPage <= meta.value.total_pages) {
        fetchTvShows(newPage);
    }
};



fetchTvShows();
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