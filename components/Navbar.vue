<template>
  <header class="bg-black">
    <div class="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex-1 md:flex md:items-center md:gap-12">
          <NuxtLink to="/">
            <img src="/logo.png" class="w-auto h-8" alt="logo" />
          </NuxtLink>
        </div>

        <div class="md:flex md:items-center md:gap-12">
          <nav aria-label="Global" class="hidden md:block">
            <ul class="flex items-center gap-6 text-sm">
              <li v-for="link in navLinks" :key="link.title">
                <NuxtLink
                  class="font-medium text-gray-300 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                  :to="link.href"
                >
                  {{ link.title }}
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <div class="flex items-center gap-4 text-white">
            <input
              v-model="userInput"
              type="text"
              placeholder="Search"
              className="
          w-full pl-12 pr-4 py-2
          bg-white/10 text-gray-100 placeholder-gray-200
          border border-gray-600 rounded-xl
          focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600
          hover:border-gray-400
          transition duration-200
        "
            />

            <button
              @click="handleSearch"
              class="px-3 py-2 text-sm text-white rounded-full"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const userInput = ref("");
const navLinks = [
  {
    title: "Popular Movies",
    href: "/popular-movies",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Tv Shows",
    href: "/tv-shows",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

const router = useRouter();

const handleSearch = () => {
  if (userInput.value) {
    router.push(`/search/${userInput.value}`);
  }
};
</script>
