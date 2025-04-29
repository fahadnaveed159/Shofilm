<template>
    <div class="text-white ">
        
        <div class="  text-white  flex flex-col items-center justify-center p-10">
            <h1 class="text-3xl font-bold mb-4">Popular TV Shows</h1>
            <div class="grid grid-cols-4 p-10 max-w-7xl mx-auto">
                <div v-for="tv in tvShows" :key="tv.id"@click="()=> router.push(`/tv/${tv.id}`)"
                    class="rounded-lg shadow-lg p-4 m-4 cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
                    <img :src="tv.poster_path ? `https://image.tmdb.org/t/p/w500${tv.poster_path}` : 'https://placehold.co/600x900'"
                        alt="" class="rounded-lg mb-4 w-72 object-cover">
                    <h2 class="text-xl font-semibold mb-2">{{ tv.name }}</h2>
                    <p class="text-gray-400">{{ tv.first_air_date }}</p>
                    <p class="py-2 text-yellow-400">⭐ {{ tv?.vote_average }}</p>
                </div>
            </div>
            <div class="flex items-center ml-5 py-4 space-x-4  font-medium ">
            <button @click="changePage(meta.page - 1)" :disabled="meta.page === 1"
                class="px-4 py-2 bg-gray-700 text-white rounded-full disabled:opacity-50">
                Previous
            </button>
            <span>Page {{ meta.page }} of {{ meta.total_pages }}</span>
            <button @click="changePage(meta.page + 1)" :disabled="meta.page === meta.total_pages"
                class="px-6 py-1 border text-md text-white rounded-md disabled:opacity-50">
                Next
            </button>
        </div>
        </div>
        <!-- Pagination Controls -->
        
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