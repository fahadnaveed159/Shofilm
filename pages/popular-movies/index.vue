<template>
   
   <div class="bg-[#0f0f0f] flex flex-col items-center justify-center">
    <h1 class="py-10 text-4xl font-medium text-white">Top Popular Movies ⭐</h1>
    <div class="py-10">
        <div class="flex flex-wrap justify-center max-w-full gap-10 mx-auto overflow-auto">
            <div v-for="item in movies" :key="item.title" @click="() => router.push(`/movies/${item.id}`)"><img
                :src="`https://image.tmdb.org/t/p/w500${item?.poster_path}`" alt=""
                class="transition-transform duration-200 rounded-lg w-72 hover:scale-105">
            <h1 class="pt-4 mx-auto font-medium text-center text-white max-w-52">{{ item.title }}</h1>
            <p class="py-2 text-yellow-400">⭐ {{ item?.vote_average }}</p>
            <p class="text-gray-300">{{ item.release_date }}</p>
            </div>
        </div>
    </div>
   </div>
   
</template>

<script setup>
const movies = ref([]);
const selectedMovie = ref(null);
const config = useRuntimeConfig();
const router = useRouter();

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
      selectedMovie.value = movies.value[Math.floor(Math.random() * movies.value.length)];
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
  }

}
fetchMovies();
</script>