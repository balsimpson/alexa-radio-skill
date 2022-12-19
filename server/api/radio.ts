export default defineEventHandler( async (event) => {
  // const config = useRuntimeConfig()
  const body = await readBody(event)
  console.log("event", event.context, body)
  return {
    name: "Blues",
    url: "https://stream-39.zeno.fm/agtp9c146qzuv?zs=azWAiz9SQTCC2pjV4LgLUg"
  }
})