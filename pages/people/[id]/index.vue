<template>
    <div class="text-white max-w-7xl mx-auto p-10">
        <div class="flex gap-10 items-center">
            <img :src="`http://image.tmdb.org/t/p/w500${person?.profile_path}`" alt="" class="w-96 h-96 rounded-lg ovject-cover">
            <div class="flex flex-col gap-5 text-sm item-center">
                <h1 class="text-3xl font-medium">
                    {{ person?.name}}
                </h1>
                <p class="text-gray-400 text-sm">
                    {{ person?.biography }}
                </p>
            </div>
        </div>
        <div class="flex gap-10 max-w-7xl mx-auto flex-col py-8 mt-5">
        <p class="text-gray-400 text-xs">
                    <span class="text-white font-medium text-sm">
                        Birthday    :
                    </span>
                    {{ person?.birthday }}
                </p>
                <p class="text-gray-400 text-xs">
                    <span class="text-white font-medium text-sm">
                        Place of Birth :
                        </span>
                        {{ person?.place_of_birth }}
                </p>
                <p class="text-gray-400 text-xs">
                    <span class="text-white font-medium  text-sm">
                        Known For       :
                    </span>
                    <span v-if="person?.known_for_department">
                        {{ person.known_for_department }}
                    </span>
                </p>
                <p class="text-gray-400 text-xs">
                    <span class="text-white font-medium  text-sm">
                        Also Known As         :
                        </span>
                        <span v-if="person?.also_known_as && person.also_known_as.length">
                            {{ person.also_known_as.join(', ') }}
                        </span>
                </p>
                <p class="text-gray-400 text-xs">
                    <span class="text-white font-medium">
                        Gender     :
                        <span v-if="person?.gender" class="text-gray-400  text-sm">
                            {{ person.gender === 1 ? 'Female' : person.gender === 2 ? 'Male' : 'Other' }}
                        </span>
                    </span>
                </p>
                <p class="text-gray-400 text-xs">
                    <span class="text-white font-medium text-xs">
                        Popularity  :
                        <span v-if="person?.popularity" class="text-gray-400 text-sm">
                            {{ person.popularity.toFixed(2) }}
                        </span>
                    </span>
                </p>
            </div>
    </div>
</template>

<script setup>
 
 const route = useRoute();
 const person = ref(null);
 const config = useRuntimeConfig();

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