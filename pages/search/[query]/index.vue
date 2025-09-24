<template>
    <div class="bg-[#0f0f0f]">
        <div class="p-10 mx-auto text-3xl font-medium text-white max-w-7xl">
            <h1 class="mb-4 text-3xl font-bold text-center">Search results for {{ route.params.query }}</h1>
        </div>
        <div class="p-0 mx-auto text-white  max-w-7xl">
            <h1 class="py-4 text-3xl font-medium">Movies</h1>
            <div class="w-full h-1 bg-gray-600"></div>


            <div class="grid grid-cols-4 py-10">
                <div v-for="m in movie" :key="m.id" @click="() => router.push(`/movies/${m.id}`)"
                    class="p-4 m-4 transition-transform duration-300 ease-in-out rounded-lg shadow-lg cursor-pointer  hover:scale-105">
                    <img :src="m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : 'https://placehold.co/600x900'"
                        alt="" class="object-cover mb-4 rounded-lg w-72">
                    <h2 class="mb-2 text-lg font-semibold">{{ m?.title }}</h2>
                    <p class="text-gray-400">{{ m?.
                        release_date }}</p>
                    <p class="py-2 text-yellow-400">⭐ {{ m?.vote_average }}</p>
                </div>
            </div>
            <h1 class="py-4 text-3xl font-medium">Tv Shows</h1>
            <div class="w-full h-1 bg-gray-500"></div>

            <div class="grid grid-cols-4 p-10">
                <div v-for="tv in Tv" :key="tv.id" @click="() => router.push(`/tv/${tv.id}`)"
                    class="p-4 m-4 transition-transform duration-300 ease-in-out rounded-lg shadow-lg cursor-pointer  hover:scale-105">
                    <img :src="tv.poster_path ? `https://image.tmdb.org/t/p/w500${tv.poster_path}` : 'https://placehold.co/600x900'"
                        alt="" class="object-cover mb-4 rounded-lg w-72">
                    <h2 class="mb-2 text-xl font-semibold">{{ tv.name }}</h2>
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