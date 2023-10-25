//import { PrismaClient } from '@prisma/client';
const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();


function generateRandomString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}


async function seedDatabase() {
  try {
    // Kullanıcı oluşturma
    const user = await db.profile.findUnique({
      where: {
        userId: "user_2Wqq6ScuAFSo5zKhYQ1XVCMD3F8"
      }
    })

    if (!user) {
      return console.log("Seed: User not found!");
    }

    await db.category.createMany({
      data: [
        { name: "Programlama Dilleri", url: "programlama-dilleri" },
        { name: "Müzik Dersleri", url: "muzik-dersleri" },
        { name: "Spor ve Egzersiz", url: "spor-ve-egzersiz" },
        { name: "Finans ve Muhasebe", url: "finans-ve-muhasebe" },
        { name: "Tasarım ve Grafik", url: "tasarim-ve-grafik" },
        { name: "Mühendislik Dersleri", url: "muhendislik-dersleri" },
        { name: "Web Geliştirme", url: "web-gelistirme" },
      ],
    });

    const topLevelCategories = await db.category.findMany();

    for (const category of topLevelCategories) {
      await db.category.update({
        where: { id: category.id },
        data: {
          subcategories: {
            create: [
              { name: generateRandomString(10), url: generateRandomString(10) },
              { name: generateRandomString(10), url: generateRandomString(10) },
              {
                name: generateRandomString(10), url: generateRandomString(10),
                subcategories: {
                  create: [
                    { name: generateRandomString(10), url: generateRandomString(10) },
                    { name: generateRandomString(10), url: generateRandomString(10) },
                  ],
                },
              },
            ],
          },
        },
      });
    }


    /* Bu kısım oluşturulan kategoriye yeni alt kategori ekleme örneği
    const mainCategory = await db.category.create({
      data: {
        name: "Ana Kategori",
        url: "ana-kategori",
      },
    });

    await db.category.update({
      where: { id: mainCategory.id }, // Ana kategorinin kimliği
      data: {
        subcategories: {
          create: [
            { name: "Alt Kategori 1", url: "alt-kategori-1" },
            { name: "Alt Kategori 2", url: "alt-kategori-2" },
          ],
        },
      },
    }); 
    */

    const category = await db.category.findFirst();
    if (!category) {
      return console.log("Seed: Category not found!");
    }
    // Kurs oluşturma
    const course = await db.course.create({
      data: {
        title: "Yeni Kurs",
        profileId: user.id,
        categoryId: category.id,
        instructor: user.name,
        url: "yeni-kurs"

      }
    });

    // Kurs oluşturma
    const course2 = await db.course.create({
      data: {
        title: "Brand New Course",
        profileId: user.id,
        categoryId: category.id,
        instructor: "Burcu Gül",
        url: "brand-new-course"
      }
    });

    // Favori oluşturma
    await db.favorite.createMany({
      data: [
        {
          courseId: course.id,
          profileId: user.id
        },
        {
          courseId: course2.id,
          profileId: user.id,
        }
      ]
    });

    // Sepet oluşturma
    await db.basket.createMany({
      data: [
        {
          courseId: course.id,
          profileId: user.id,
          totalPrice: 100,
        }, {
          courseId: course2.id,
          profileId: user.id,
          totalPrice: 120,
        }
      ]
    });

    // Diğer tablolar için mock veri oluşturmayı buraya ekleyin

    console.log("Mock data successfully created.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await db.$disconnect();
  }
}

seedDatabase();
