<template>
  <div class="max-w-lg px-4 py-12 mx-auto">
    <div>
      <div class="mb-12">
        <div>Settings</div>
        <div>Here you can change the various Alexa responses.</div>
      </div>


      <div class="space-y-8">
        <form>
          <h2 class="mb-2 text-xl font-bold">Now Playing</h2>
          <p class="mb-4 text-sm">Alexa says this when playing a new station. e.g: Here is Acoustic Blues. Channel name
            will be added at the
            end automatically.</p>
          <input class="w-full px-4 py-2 mb-2 rounded-lg bg-stone-800" type="text" placeholder="Input 1">
          <input class="w-full px-4 py-2 mb-2 rounded-lg bg-stone-800" type="text" placeholder="Input 2">
          <input class="w-full px-4 py-2 mb-2 rounded-lg bg-stone-800" type="text" placeholder="Input 3">
          <button class="w-full px-4 py-2 rounded-lg bg-stone-700 hover:bg-gray-800" type="button">Add Another</button>
        </form>

        <form>
          <h2 class="mb-2 text-xl font-bold">Stop Playing</h2>
          <p class="mb-4 text-sm">Alexa says this when you stop the skill.</p>
          <input class="w-full px-4 py-2 mb-2 rounded-lg bg-stone-800" type="text" placeholder="Input 1">
          <input class="w-full px-4 py-2 mb-2 rounded-lg bg-stone-800" type="text" placeholder="Input 2">
          <input class="w-full px-4 py-2 mb-2 rounded-lg bg-stone-800" type="text" placeholder="Input 3">
          <button class="w-full px-4 py-2 rounded-lg bg-stone-700 hover:bg-gray-800" type="button">Add Another</button>
        </form>

        <form>
          <h2 class="mb-2 text-xl font-bold">Next Playing</h2>
          <p class="mb-4 text-sm">Alexa says this when it plays the next station.</p>
          <input class="w-full px-4 py-2 mb-2 rounded-lg bg-stone-800" type="text" placeholder="Input 1">
          <input class="w-full px-4 py-2 mb-2 rounded-lg bg-stone-800" type="text" placeholder="Input 2">
          <input class="w-full px-4 py-2 mb-2 rounded-lg bg-stone-800" type="text" placeholder="Input 3">
          <button class="w-full px-4 py-2 rounded-lg bg-stone-700 hover:bg-gray-800" type="button">Add Another</button>
        </form>

        <form>
          <h2 class="mb-2 text-xl font-bold">Help</h2>
          <p class="mb-4 text-sm">Alexa says this when you ask for help.</p>
          <input class="w-full px-4 py-2 mb-2 rounded-lg bg-stone-800" type="text" placeholder="Input 1">
          <input class="w-full px-4 py-2 mb-2 rounded-lg bg-stone-800" type="text" placeholder="Input 2">
          <input class="w-full px-4 py-2 mb-2 rounded-lg bg-stone-800" type="text" placeholder="Input 3">
          <button class="w-full px-4 py-2 rounded-lg bg-stone-700 hover:bg-gray-800" type="button">Add Another</button>
        </form>

        <form>
          <h2 class="mb-2 text-xl font-bold">Error</h2>
          <p class="mb-4 text-sm">Alexa says this when encountering an error.</p>
          <input class="w-full px-4 py-2 mb-2 rounded-lg bg-stone-800" type="text" placeholder="Input 1">
          <input class="w-full px-4 py-2 mb-2 rounded-lg bg-stone-800" type="text" placeholder="Input 2">
          <input class="w-full px-4 py-2 mb-2 rounded-lg bg-stone-800" type="text" placeholder="Input 3">
          <button class="w-full px-4 py-2 rounded-lg bg-stone-700 hover:bg-gray-800" type="button">Add Another</button>
        </form>
      </div>

    </div>
  </div>
</template>