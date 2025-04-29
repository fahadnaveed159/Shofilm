<template>
    <header class="bg-black">
        <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                <div class="flex-1 md:flex md:items-center md:gap-12">
                    <NuxtLink to="/">
                        <img src="/logo.png" class="h-8 w-auto" alt="logo">
                    </NuxtLink>
                </div>

                <div class="md:flex md:items-center md:gap-12">
                    <nav aria-label="Global" class="hidden md:block">
                        <ul class="flex items-center gap-6 text-sm">
                            <li v-for="link in navLinks" :key="link.title">
                                <NuxtLink class="text-gray-300 transition font-medium hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                                    :to="link.href">
                                    {{ link.title }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </nav>

                    <!-- <div class="flex items-center gap-4">
                        <div class="sm:flex sm:gap-4">
                            <a class="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm dark:hover:bg-teal-500"
                                href="#">
                                Login
                            </a>

                            <div class="hidden sm:flex">
                                <a class="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                                    href="#">
                                    Register
                                </a>
                            </div>
                        </div>

                        <div class="block md:hidden">
                            <button
                                class="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
                                <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div> -->

                    <div class="flex items-center gap-4 text-white">
                        <input v-model="userInput" type="text" placeholder="Search"
                            class="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-teal-600 focus:ring-teal-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-teal-500 dark:focus:ring-teal-500"
                             />

                            <button @click="handleSearch" class=" px-3 rounded-full py-2 text-white">Search</button>
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
    
]

const router = useRouter();

const handleSearch = () => {
    if (userInput.value) {
        router.push(`/search/${userInput.value}`);
    }
};
</script>