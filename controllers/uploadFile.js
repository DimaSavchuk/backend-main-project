// const cloudinary = require("cloudinary").v2;
// const { recipesModel } = require("../models/recipesModel");
// const fs = require("fs");
// const path = require("path");

// //шлях до папки з зображеннями
// const folderPath = path.join(__dirname, "../images/cocktails");

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// const uploadFileToCloudinary = async (filePath, file) => {
//   try {
//     //записуються файли у папку drinks зі своїм оригінальним імʼям
//     const result = await cloudinary.uploader.upload(filePath, {
//       folder: "drinks",
//       public_id: file.replace(" ", "20"),
//       use_filename: true,
//       unique_filename: false,
//     });
//     console.log(`File ${filePath} uploaded to URL: ${result.url}`);
//   } catch (err) {
//     console.error(`Failed to upload ${filePath}. Error: ${err.message}`);
//   }
// };

// //мені зручно робити контрольвані дії, тому я додаю тимчасову логіку зазвичай в якийсь публічний ендпоінт і за потреби активую виклик через постмен

// const getIngredients = async (req, res) => {
//   //всі файли з твоєї локальної папки витягуються і відправляються на завантаження в клаудинарій

//   const files = fs.readdirSync(folderPath);
//   for (const file of files) {
//     const fullFilePath = path.join(folderPath, file);
//     if (fs.statSync(fullFilePath).isFile()) {
//       await uploadFileToCloudinary(fullFilePath, file);
//     }
//   }

//   const updateResult = await recipesModel.updateMany({}, [
//     // {
//     //   $set: {
//     //     ingredientThumb: {
//     //       $concat: [
//     //         "https://res.cloudinary.com/dgooxm96o/image/upload/v1695488903/ingredients/",
//     //         { $arrayElemAt: [{ $split: ["$ingredientThumb", "/"] }, -1] },
//     //         ".png",
//     //       ],
//     //     },
//     //     "thumb-medium": {
//     //       $concat: [
//     //         "https://res.cloudinary.com/dgooxm96o/image/upload/v1695488903/ingredients/",
//     //         { $arrayElemAt: [{ $split: ["$thumb-medium", "/"] }, -1] },
//     //         ".png",
//     //       ],
//     //     },
//     //     "thumb-small": {
//     //       $concat: [
//     //         "https://res.cloudinary.com/dgooxm96o/image/upload/v1695488903/ingredients/",
//     //         { $arrayElemAt: [{ $split: ["$thumb-small", "/"] }, -1] },
//     //         ".png",
//     //       ],
//     //     },
//     //   },
//     // },
//     {
//       $set: {
//         drinkThumb: {
//           $concat: [
//             "https://res.cloudinary.com/dgooxm96o/image/upload/v1695488903/drinks/",
//             { $arrayElemAt: [{ $split: ["$drinkThumb", "/"] }, -1] },
//             ".jpg",
//           ],
//         },
//       },
//     },
//   ]);
// };

// module.exports = { getIngredients };
