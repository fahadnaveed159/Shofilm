<template>
    <div class="p-10 mx-auto text-white max-w-7xl">
        <div class="flex gap-10">
            <img :src="`http://image.tmdb.org/t/p/original${person?.profile_path}`" alt="" class="object-cover rounded-lg max-w-60 h-96">
            <div class="flex flex-col gap-5 text-sm item-center">
                <h1 class="text-3xl font-medium">
                    {{ person?.name}}
                </h1>
                <h2 class="text-lg">Biography</h2>
                <p class="text-sm text-gray-400">
                    {{ person?.biography }}
                </p>
            </div>
        </div>
        <div class="flex flex-col gap-3 mx-auto mt-5 py-7 max-w-7xl">
            <h1 class="text-xl font-medium">Personal Info</h1>
        <p class="flex flex-col text-xs text-gray-400">
                    <span class="py-2 text-sm font-medium text-white">
                        Birthday    
                    </span>
                    {{ person?.birthday }}
                </p>
                <p class="flex flex-col text-xs text-gray-400">
                    <span class="py-2 text-sm font-medium text-white">
                        Place of Birth 
                        </span>
                        {{ person?.place_of_birth }}
                </p>
                <p class="flex flex-col text-xs text-gray-400">
                    <span class="py-2 text-sm font-medium text-white">
                        Known For       
                    </span>
                    <span v-if="person?.known_for_department">
                        {{ person.known_for_department }}
                    </span>
                </p>
                <p class="flex flex-col text-xs text-gray-400">
                    <span class="py-2 text-sm font-medium text-white">
                        Also Known As         
                        </span>
                        <span v-if="person?.also_known_as && person.also_known_as.length">
                            {{ person.also_known_as.join(', ') }}
                        </span>
                </p>
                <p class="text-xs text-gray-400 ">
                    <span class="flex flex-col py-2 font-medium text-white">
                        Gender     
                        <span v-if="person?.gender" class="py-2 text-sm text-gray-400">
                            {{ person.gender === 1 ? 'Female' : person.gender === 2 ? 'Male' : 'Other' }}
                        </span>
                    </span>
                </p>
                <p class="flex flex-col text-xs text-gray-400">
                    <span class="flex flex-col py-2 text-xs font-medium text-white">
                        Popularity  
                        <span v-if="person?.popularity" class="py-2 text-sm text-gray-400">
                            {{ person.popularity.toFixed(2) }}
                        </span>
                    </span>
                </p>
            </div>
    </div>
    <div class="p-10 mx-auto text-white max-w-7xl">
    <h2 class="py-2 mb-4 text-3xl font-semibold">Known For</h2>
    <div v-if="credits?.cast?.length" class="flex flex-wrap mt-5 overflow-hidden transition-all duration-300 shadow-md rounded-xl hover:shadow-xl">
      <div
       @click="() => router.push(`/movies/${movie.id}`)"
        v-for="movie in credits.cast"
        :key="movie.id"
        class="mx-auto mt-5 overflow-hidden transition-all duration-300 delay-75 rounded shadow cursor-pointer hover:scale-105 max-w-72 "
      >
        <img
          v-if="movie.poster_path"
          :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/600x900'"
          :alt="movie.title"
          class="object-cover w-full h-96"
        />
        <div class="p-2 text-center text-white">
          <p class="text-sm font-medium">{{ movie.title }}</p>
        </div>
      </div>
    </div>
    <p v-else class="text-gray-400">No movie credits found for this person.</p>
  </div>
    



</template>

<script setup>
 
 const route = useRoute();
const router = useRouter();
const person = ref(null);
const config = useRuntimeConfig();
const credits = ref(null);

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
        credits.value = data;
    } catch (error) {
        console.error('Error fetching movie credits:', error);
        credits.value = { cast: [] };
    }
 }
 movieCredits()

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
        console.error('Error fetching movies:', error);
    };
};
fetchTv()

</script>