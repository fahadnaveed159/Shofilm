<template>
  <header class="relative bg-black">
    <div class="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center justify-between flex-1 gap-4">
          <NuxtLink to="/">
            <img src="/logo.png" class="w-24 md:h-8 md:w-auto" alt="logo" />
          </NuxtLink>
          
          <!-- Search Input - Visible on all screens -->
          <div class="flex items-center flex-1 max-w-lg mx-4">
            <input
              v-model="userInput"
              type="text"
              placeholder="Search movies, TV shows..."
              @keyup.enter="handleSearch"
              class="w-full py-1 pl-4 pr-4 text-xs text-gray-100 placeholder-gray-200 transition duration-200 border border-gray-600 md:py-2 md:text-sm bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600 hover:border-gray-400"
            />
          </div>
        </div>

        <!-- Desktop Navigation -->
        <nav class="items-center hidden gap-8 md:flex">
          <ul class="flex items-center gap-6 text-sm">
            <li v-for="link in navLinks" :key="link.title" class="relative cursor-pointer group">
              <NuxtLink
                class="font-medium text-gray-300 transition-colors duration-300 group-hover:text-orange-400"
                
                :to="link.href"
              >
                <span class="absolute left-0 -bottom-1 h-[2px] w-0 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>

                {{ link.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          class="p-2 text-gray-200 md:hidden"
          @click="isMenuOpen = !isMenuOpen"
          aria-label="Toggle menu"
        >
          <svg
            v-if="!isMenuOpen"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-show="isMenuOpen"
      class="fixed left-0 right-0 z-50 w-full transition-all duration-300 bg-black border-t border-gray-800 top-16 md:hidden"
    >
      <!-- Mobile Navigation Links -->
      <ul class="flex flex-col py-4 space-y-2">
        <li v-for="link in navLinks" :key="link.title">
          <NuxtLink
            @click="isMenuOpen = false"
            class="block px-4 py-2 text-base font-medium text-gray-300 transition-colors duration-200 hover:bg-gray-800 hover:text-white"
            :to="link.href"
          >
            {{ link.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
const userInput = ref("");
const isMenuOpen = ref(false);
const router = useRouter();

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

// Handle search for desktop
const handleSearch = () => {
  const searchQuery = userInput.value.trim();
  if (searchQuery) {
    router.push(`/search/${searchQuery}`);
    userInput.value = ''; // Clear the input after search
  }
};

// Handle search for mobile
const handleSearchMobile = () => {
  handleSearch();
  isMenuOpen.value = false; // Close mobile menu after search
};

// Close mobile menu when window is resized to desktop size
if (process.client) {
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) { // md breakpoint
      isMenuOpen.value = false;
    }
  });
}
</script>
