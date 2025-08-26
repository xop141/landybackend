import client from "../redisClient.js";

let cafeCache = null;

export const preloadCache = async () => { 
  if (!cafeCache) {
    console.log("🔄 Preloading cafes from Redis...");
    const cafes = await client.get("cafe");
    cafeCache = JSON.parse(cafes);
    console.log("✅ Cafe cache preloaded");
  }
  return cafeCache;
};

export const getCafeCache = async () => {
  console.time("getCafeCache");
  if (!cafeCache) {
    return preloadCache();
  } else{
return cafeCache;
  }
  
};
