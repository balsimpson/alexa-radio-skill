<template>
  <div class="max-w-lg px-4 py-12 mx-auto text-stone-400">
    <div>
      <div class="sticky p-6 mb-12 border rounded-lg top-24 bg-stone-900 border-stone-800">
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
        <FormResponses title="Now Playing" description="Alexa says this when playing a new station. e.g: Here is Acoustic Blues. Channel name will be added at the end automatically." placeholder="Now playing"/>
        
        <FormResponses title="Stop Playing" description="Alexa says this when you stop the skill." placeholder="Stop playing"/>
        
        <FormResponses title="Next Playing" description="Alexa says this when it plays the next station." placeholder="Next playing"/>
        
        <FormResponses title="Help" description="Alexa says this when you ask for help." placeholder="Ask me to play a station"/>
      </div>

    </div>
  </div>
</template>