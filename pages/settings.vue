<template>
  <div class="max-w-lg px-4 py-12 mx-auto text-[#7C3D13]">
    <div>
      <div class="sticky mb-12 top-24 bg-[#EE9A8F]">
        <div class="flex flex-col items-center justify-between pb-3 text-center sm:flex-row sm:text-left">
          <div>
            <div class="text-3xl font-bold">Settings</div>
            <div class="pr-6">Change the various Alexa responses.</div>
          </div>
          <button
            class="shrink-0 mt-2 sm:mt-0 px-3 py-1 font-semibold border-2 rounded border-[#7C3D13] text-stone-200 bg-[#7C3D13] h-full">Save
            Settings</button>
        </div>
      </div>


      <div class="space-y-4">
        <form class="p-4 border-2 rounded-lg border-[#7C3D13] bg-white">
          <h2 class="mb-1 text-xl font-bold">Now Playing</h2>
          <p class="mb-4 text-sm">Alexa says this when playing a new station. e.g: Here is Acoustic Blues. Channel name
            will be added at the end automatically.</p>
          <div class="space-y-2">
            <input
              class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-[#7C3D13] border-[#7C3D13] focus:outline-none focus:shadow-outline bg-[#ffffff]"
              type="text" placeholder="Input 1">
            <input
              class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-[#7C3D13] border-[#7C3D13] focus:outline-none focus:shadow-outline bg-[#ffffff]"
              type="text" placeholder="Input 2">
            <input
              class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-[#7C3D13] border-[#7C3D13] focus:outline-none focus:shadow-outline bg-[#ffffff]"
              type="text" placeholder="Input 3">
          </div>
          <!-- <button class="w-full px-4 py-2 rounded-lg bg-stone-700 hover:bg-gray-800" type="button">Add Another</button> -->
        </form>

        <form class="p-4 border-2 rounded-lg border-[#7C3D13] bg-white">
          <h2 class="mb-1 text-xl font-bold">Stop Playing</h2>
          <p class="mb-4 text-sm">Alexa says this when you stop the skill.</p>
          <div class="space-y-2">
            <input
              class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-[#7C3D13] border-[#7C3D13] focus:outline-none focus:shadow-outline bg-[#ffffff]"
              type="text" placeholder="Input 1">
            <input
              class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-[#7C3D13] border-[#7C3D13] focus:outline-none focus:shadow-outline bg-[#ffffff]"
              type="text" placeholder="Input 2">
            <input
              class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-[#7C3D13] border-[#7C3D13] focus:outline-none focus:shadow-outline bg-[#ffffff]"
              type="text" placeholder="Input 3">
          </div>
          <!-- <button class="w-full px-4 py-2 rounded-lg bg-stone-700 hover:bg-gray-800" type="button">Add Another</button> -->
        </form>

        <form class="p-4 border-2 rounded-lg border-[#7C3D13] bg-white">
          <h2 class="mb-1 text-xl font-bold">Next Playing</h2>
          <p class="mb-4 text-sm">Alexa says this when it plays the next station.</p>
          <div class="space-y-2">
            <input
              class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-[#7C3D13] border-[#7C3D13] focus:outline-none focus:shadow-outline bg-[#ffffff]"
              type="text" placeholder="Input 1">
            <input
              class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-[#7C3D13] border-[#7C3D13] focus:outline-none focus:shadow-outline bg-[#ffffff]"
              type="text" placeholder="Input 2">
            <input
              class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-[#7C3D13] border-[#7C3D13] focus:outline-none focus:shadow-outline bg-[#ffffff]"
              type="text" placeholder="Input 3">
          </div>
          <!-- <button class="w-full px-4 py-2 rounded-lg bg-stone-700 hover:bg-gray-800" type="button">Add Another</button> -->
        </form>

        <form class="p-4 border-2 rounded-lg border-[#7C3D13] bg-white">
          <h2 class="mb-1 text-xl font-bold">Help</h2>
          <p class="mb-4 text-sm">Alexa says this when you ask for help.</p>
          <div class="space-y-2">
            <input
              class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-[#7C3D13] border-[#7C3D13] focus:outline-none focus:shadow-outline bg-[#ffffff]"
              type="text" placeholder="Input 1">
            <input
              class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-[#7C3D13] border-[#7C3D13] focus:outline-none focus:shadow-outline bg-[#ffffff]"
              type="text" placeholder="Input 2">
            <input
              class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-[#7C3D13] border-[#7C3D13] focus:outline-none focus:shadow-outline bg-[#ffffff]"
              type="text" placeholder="Input 3">
          </div>
          <!-- <button class="w-full px-4 py-2 rounded-lg bg-stone-700 hover:bg-gray-800" type="button">Add Another</button> -->
        </form>

        <form class="p-4 border-2 rounded-lg border-[#7C3D13] bg-white">
          <h2 class="mb-1 text-xl font-bold">Error</h2>
          <p class="mb-4 text-sm">Alexa says this when encountering an error.</p>
          <div class="space-y-2">
            <input
              class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-[#7C3D13] border-[#7C3D13] focus:outline-none focus:shadow-outline bg-[#ffffff]"
              type="text" placeholder="Input 1">
            <input
              class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-[#7C3D13] border-[#7C3D13] focus:outline-none focus:shadow-outline bg-[#ffffff]"
              type="text" placeholder="Input 2">
            <input
              class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-[#7C3D13] border-[#7C3D13] focus:outline-none focus:shadow-outline bg-[#ffffff]"
              type="text" placeholder="Input 3">
          </div>
          <!-- <button class="w-full px-4 py-2 rounded-lg bg-stone-700 hover:bg-gray-800" type="button">Add Another</button> -->
        </form>
      </div>

    </div>
  </div>
</template>