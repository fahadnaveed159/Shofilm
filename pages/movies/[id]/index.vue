<template>
    <div class="text-white w-full bg-cover bg-center h-[calc(100vh-80px)]"
        :style="`background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`">
        <div class="max-w-7xl mx-auto p-10 h-full flex justify-between  items-center">
            
            <div class="flex-col justify-center flex gap-4">
                <div class="">
                  <h1 class="text-4xl font-medium  py-3">{{ movie?.title }}</h1>
            <p class="max-w-2xl text-sm">{{ movie?.overview }}</p>
            </div>
            <div class="flex flex-col space-y-4">
            <p class="py-2 text-sm text-yellow-400">Average Rating:⭐
                {{ movie?.vote_average }}</p>
            <p class="text-xs font-medium"> Status  :
                {{ movie?.status }}
            </p>
            <p class="text-xs font-medium"> Realease Date  :
                {{ movie?.release_date }}
            </p>
            <p class="text-xs font-medium">Budget  :
                {{ movie?.budget}}
            </p>
            <p class="text-xs font-medium">Language  :
                {{ movie?.original_language}}
            </p>
            <p class="text-xs font-medium">Originak Country  :
                {{ movie?.origin_country}}
            </p>
            <p class="text-xs font-medium">Vote Count  :
            {{ movie?.vote_count}}
            </p>
            <p class="text-xs font-medium">Adult  :
            {{ movie?.video}}
            </p>
           </div>
            <div class=" py-4">
                <button class="py-2 px-4 bg-transparent font-bold border rounded-full text-xs">Watch Trailor</button>
            </div>            
        </div>
        <div><img :src="`https://image.tmdb.org/t/p/w500${movie?.poster_path}`"
            alt="" class="w-64 border  rounded-lg"></div>
        </div>
    </div>

    <div class="text-white max-w-7xl mx-auto  p-10">
        <div>
        <h1 class="text-2xl font-medium">Actor</h1>
    </div>
    <div class="flex cursor-pointer flex-wrap gap-10  items-center">
    <div v-for="actor in credits?.cast" :key="actor.id"  @click="() => router.push(`/people/${actor.id}`)" class=" text-white gap-4 py-4 flex flex-col items-center">
        <img :src="actor?.profile_path ? `http://image.tmdb.org/t/p/w500${actor?.profile_path}` : 'https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/08/placeholder-male.jpg'"
        alt="" class=" w-32 rounded-full h-32 object-cover">
        <h1>{{actor.name}}</h1>
    </div>
    </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const route = useRoute();
const movie = ref(null);
const config = useRuntimeConfig();
const router = useRouter();

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

</script>