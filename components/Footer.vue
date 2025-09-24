<template>
  <div class="text-gray-400 bg-gray-950">
    <div
      class="flex items-center justify-between px-5 py-8 mx-auto mt-20 text-white max-w-7xl"
    >
      <div class="">
        <img src="/logo.png" class="w-32" alt="Logo" />
      </div>
      <div>
        <ul class="flex gap-5 text-sm font-medium text-gray-300">
          <li
            class="transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
          >
            <a href="/popular-movies">Popular Movies</a>
          </li>
          <li
            class="transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
          >
            <a href="/about">About</a>
          </li>
          <li
            class="transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
          >
            <a href="/contact">Contact</a>
          </li>
          <li
            class="transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
          >
            <a href="/tv-shows">Tv Shows</a>
          </li>
        </ul>
      </div>
      <div class="flex">
        <a
          class="transition duration-300 ease-in-out delay- hover:-translate-y-1 hover:scale-110"
          href="https://www.linkedin.com/feed/?nis=true"
          target="_blank"
        >
          <Icon name="mdi:linkedin" class="mx-2 text-2xl text-white" />
        </a>
        <a
          class="transition duration-300 ease-in-out delay- hover:-translate-y-1 hover:scale-110"
          href="https://www.facebook.com/profile.php?id=61565171947376"
          target="_blank"
        >
          <Icon name="mdi:facebook-box" class="mx-2 text-2xl text-white" />
        </a>
        <a
          class="transition duration-300 ease-in-out delay- hover:-translate-y-1 hover:scale-110"
          href="https://github.com/fahadnaveed159"
          target="_blank"
        >
          <Icon name="mdi:github" class="mx-2 text-2xl text-white" />
        </a>
      </div>
    </div>
    <div class="py-4 mx-auto text-xs text-center text-gray-400 max-w-7xl">
      © 2025 <span class="font-semibold text-white">CineStream</span>. All
      rights reserved.
      <br />
      Designed & developed with ❤️ by
      <span class="font-semibold text-white">Fahad Khan</span>
    </div>
  </div>
</template>
