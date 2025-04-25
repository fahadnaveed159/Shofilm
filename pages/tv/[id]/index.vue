<template>
    <div class="text-white w-full bg-cover bg-center h-[calc(100vh-80px)]"
    :style="`background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://image.tmdb.org/t/p/original${Tv?.backdrop_path}')`">
        <!-- <pre>
            {{Tv}}
        </pre> -->
        <div class="max-w-7xl mx-auto p-10 h-full flex justify-between items-center">
            <div class="flex-col w-full justify-center flex gap-4">
          <div>
            <button class="py-1 text-sm font-medium px-4 border rounded-full">Drama</button>
        </div>
            <h1 class="text-4xl font-medium">{{ Tv?.name }}</h1>
            <p class="w-96 text-slate-200 text-sm">{{ Tv?.overview }}</p>
            <p class="text-sm"> Status:
                {{ Tv?.status }}</p>
            <p class="py-2 text-sm text-yellow-400">Average Rating:⭐
                {{ Tv?.vote_average }}</p>            
                <p class="py-2 text-sm text-yellow-400">Average Rating:⭐
                    {{ Tv?.vote_count }}</p>
                    <div>
                    <button class="py-2 px-4 border rounded-full text-md">Watch Trailor</button>
                </div>
                </div>
                <div>
                    <img :src="`https://image.tmdb.org/t/p/w500${Tv?.poster_path}`"
                        alt="" class="w-64 border rounded-lg"
                </div>
        </div>
    </div>

   
    <div class="text-white max-w-7xl mx-auto p-10">
        <div>
        <h1 class="text-3xl font-medium">Actor</h1>
    </div>
    <div class="flex flex-wrap gap-10 items-center">
    <div v-for="actor in credits?.cast" :key="actor.id"  @click="() => router.push(`/people/${actor.id}`)" class=" text-white gap-4 py-4 flex flex-col items-center">
        <img :src="actor?.profile_path ? `http://image.tmdb.org/t/p/w500${actor?.profile_path}` : 'https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/08/placeholder-male.jpg'"
        alt="" class=" w-32 rounded-full h-32 object-cover">
        <h1>{{actor.name}}</h1>
    </div>
    </div>
    </div>
</template>

<script setup>
import { routerKey } from 'vue-router';

 const router = useRouter();
 const route = useRoute();
 const Tv = ref(null);
 const config = useRuntimeConfig();

 const fetchTv = async () => {
    try {
        const response = await fetch(`${config.public.API_BASE_URL}tv/${route.params.id}`, {
            headers: {
                Authorization: `Bearer ${config.public.ACCESS_TOKEN}`,
            },
        });
        const data = await response.json();
        Tv.value = data;
    } catch (error) {
        console.error('Error fetching movies:', error);
    };
};
fetchTv()

const routeCredits = useRoute();
const credits = ref(null);
const configCredits = useRuntimeConfig();

const fetchMovieCredits = async () => {
    try {
        const response = await fetch(`${config.public.API_BASE_URL}tv/${route.params.id}/credits`,{
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

</script>