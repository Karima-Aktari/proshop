# 🛠 MERN Debugging Checklist

## 1️⃣ Backend (Node + Express + MongoDB)

- ✅ `.env` ফাইলে সব variable set আছে কিনা (`MONGO_URI`, `PORT`)
- ✅ `dotenv.config()` একেবারে শুরুতে আছে কিনা
- ✅ `connectDB()` ঠিক URI পাচ্ছে কিনা (log দিয়ে check করো)
- ✅ `app.use("/api/...", routeFile)` এ path আর frontend axios call একই কিনা
- ✅ Response এ `res.json(...)` ব্যবহার হচ্ছে কিনা

---

## 2️⃣ Routes & Controllers

- ✅ Route prefix আর axios URL match করছে কিনা
- ✅ `router.get("/:id")` এ `.find()` বা DB query সঠিক কিনা
- ✅ Error handling (try/catch বা middleware) আছে কিনা

---

## 3️⃣ Frontend (React + Axios + Vite)

- ✅ axios URL backend এর সাথে match করছে (`/api/products` vs `/app/products`)
- ✅ `vite.config.js` এ proxy ঠিক আছে কিনা
- ✅ `useEffect` dependency ঠিক আছে কিনা
- ✅ State এর initial value array কিনা (না হলে `.map is not a function`)

---

## 4️⃣ Common Errors

- ❌ `products.map is not a function` → initial state array না, বা data missing
- ❌ `MongoDB Connected: undefined` → `.env` এ `MONGO_URI` missing
- ❌ `ERR_MODULE_NOT_FOUND` → wrong import path (`./` vs `../`)
- ❌ CORS issue → backend এ `app.use(cors())` দরকার

---

## 5️⃣ Quick Debug Steps

1. `console.log()` দিয়ে data check করো
2. Backend এ `console.log(req.params, req.body)` ব্যবহার করো
3. Frontend এ DevTools → Network tab এ response check করো
4. Import path সবসময় verify করো (`./` vs `../`)
5. Error message পুরোটা ভালো করে পড়ো (clue থাকে)

---

✨ এই ফাইলটা project এর root folder এ রেখে দিলে future এ error fix করা অনেক সহজ হবে।
