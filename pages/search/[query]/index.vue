<template>
    <div class="bg-[#0f0f0f]">
        <div class="max-w-7xl mx-auto p-10  text-white text-3xl font-medium">
            <h1 class="text-3xl  text-center font-bold mb-4">Search results for {{ route.params.query }}</h1>
        </div>
        <div class=" max-w-7xl mx-auto text-white p-0">
            <h1 class="text-3xl py-4 font-medium">Movies</h1>
            <div class="w-full bg-gray-600 h-1"></div>


            <div class="grid grid-cols-4 py-10">
                <div v-for="m in movie" :key="m.id" @click="() => router.push(`/movies/${m.id}`)"
                    class="  rounded-lg shadow-lg p-4 m-4  cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
                    <img :src="m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : 'https://placehold.co/600x900'"
                        alt="" class="rounded-lg mb-4 w-72 object-cover">
                    <h2 class="text-lg font-semibold mb-2">{{ m?.title }}</h2>
                    <p class="text-gray-400">{{ m?.
                        release_date }}</p>
                    <p class="py-2 text-yellow-400">⭐ {{ m?.vote_average }}</p>
                </div>
            </div>
            <h1 class="text-3xl font-medium py-4">Tv Series</h1>
            <div class="w-full bg-gray-500 h-1"></div>

            <div class="grid grid-cols-4 p-10">
                <div v-for="tv in Tv" :key="tv.id" @click="() => router.push(`/tv/${tv.id}`)"
                    class="  rounded-lg shadow-lg p-4 m-4  cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
                    <img :src="tv.poster_path ? `https://image.tmdb.org/t/p/w500${tv.poster_path}` : 'https://placehold.co/600x900'"
                        alt="" class="rounded-lg mb-4 w-72 object-cover">
                    <h2 class="text-xl font-semibold mb-2">{{ tv.name }}</h2>
                    <p class="text-gray-400">{{ tv.first_air_date }}</p>
                    <p class="py-2 text-yellow-400">⭐ {{ tv?.vote_average }}</p>
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
        console.error('Error fetching movies:', error);
    };
};
fetchTv()

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
    };
};
fetchMovie()
</script>