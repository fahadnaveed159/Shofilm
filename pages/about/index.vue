<template>
  <div
    class="relative h-[60vh] bg-gradient-to-b from-black to-[#0f0f0f] overflow-hidden fade-up"
  >
    <div class="absolute inset-0">
      <div class="absolute inset-0 z-10 bg-black/60"></div>
      <img
        src="https://i.pinimg.com/1200x/3c/f6/56/3cf656908a2481110485bac3bf1297d9.jpg"
        alt="Cinema Background"
        class="object-cover w-full h-full scale-110 animate-subtle-zoom"
      />
    </div>
    <div
      class="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center"
    >
      <h1 class="text-4xl font-bold text-white md:text-6xl lg:text-7xl">
        Welcome to <span class="text-orange-500">Shofilm</span>
      </h1>
      <p class="max-w-2xl mt-6 text-lg text-gray-300">
        Experience cinema like never before. ShoFilm is your gateway to
        discovering extraordinary stories, connecting with fellow film
        enthusiasts, and exploring the boundless world of movies.
      </p>
    </div>
  </div>

  <!-- Story Section -->
  <div
    class="flex flex-col items-center justify-between gap-10 mx-auto mt-5 md:flex-row py-14 max-w-7xl fade-up"
  >
    <div class="px-4 py-5 lg:px-0">
      <img
        src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3"
        alt="Movie Experience"
        class="w-full h-[400px] object-cover brightness-75"
      />
    </div>
    <div class="max-w-md px-5 text-center lg:max-w-xl md:px-0">
      <h2 class="mb-4 text-3xl font-semibold text-white md:text-4xl">
        Our <span class="text-orange-500">Vision</span>
      </h2>
      <p class="leading-relaxed text-gray-300">
        ShoFilm brings cinema closer to you by offering a seamless streaming
        experience with thousands of movies from around the world. We believe
        great stories deserve to be seen and shared—anytime, anywhere.
      </p>
    </div>
  </div>

  <!-- Highlights -->
         <section class="px-6 py-20 bg-gradient-to-r from-slate-950 via-gray-900 to-gray-950">
            <div class="container max-w-6xl mx-auto text-center text-white">
                <h2 class="mb-16 text-5xl font-bold gradient-text">ShoFilm <span class="text-orange-500">Impact</span></h2>
                <div class="grid gap-8 md:grid-cols-4">
                    <div class="fade-up">
                        <div class="mb-4 text-6xl font-black text-pink-400">5M+</div>
                        <p class="text-xl text-gray-300">Active Cinephiles</p>
                    </div>
                    <div class="fade-up" style="animation-delay: 0.1s;">
                        <div class="mb-4 text-6xl font-black text-blue-400">250K+</div>
                        <p class="text-xl text-gray-300">Movies & Shows</p>
                    </div>
                    <div class="fade-up" style="animation-delay: 0.2s;">
                        <div class="mb-4 text-6xl font-black text-green-400">1M+</div>
                        <p class="text-xl text-gray-300">Reviews Written</p>
                    </div>
                    <div class="fade-up" style="animation-delay: 0.3s;">
                        <div class="mb-4 text-6xl font-black text-yellow-400">180</div>
                        <p class="text-xl text-gray-300">Countries Reached</p>
                    </div>
                </div>
            </div>
        </section>


  <!-- Call to Action -->
         <section class="px-6 py-20">
            <div class="container max-w-4xl mx-auto text-center">
                <div class="p-12 glass-effect rounded-3xl">
                    <h2 class="mb-6 text-4xl font-bold text-white gradient-text">Ready to Discover Your Next Favorite Film?</h2>
                    <p class="mb-8 text-xl leading-relaxed text-gray-300">
                        Join millions of movie lovers who trust ShoFilm to guide their cinematic journey. 
                        Your perfect movie night is just one click away.
                    </p>
                    <div class="flex flex-col justify-center gap-6 sm:flex-row">
                        <button @click="() => router.push(`/`)" class="px-10 py-4 text-lg font-bold text-white transition-all duration-300 transform bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-2xl hover:scale-105 neon-glow">
                            Start Exploring Now
                        </button>
                        <button @click="() => router.push(`/popular-movies`)" class="px-10 py-4 text-lg font-bold text-purple-400 transition-all duration-300 transform border-2 border-purple-500 hover:bg-purple-500 hover:text-white rounded-2xl hover:scale-105">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>

</template>

<script setup>
  const router = useRouter();
  const route = useRoute();

</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

* {
  font-family: "Poppins", sans-serif;
}

.fade-up {
            animation: fadeUp 0.8s ease-out;
        }
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
</style>
