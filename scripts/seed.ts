import { PrismaClient } from '@prisma/client';
//const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function seedDatabase() {
  try {
    // Kullanıcı oluşturma
    const user = await db.profile.create({
      data: {
        email: "test@test.com",
        imageUrl: "imageUrl",
        name: "Berat Test",
        userId: "userId"
      }
    });

    await db.category.createMany({
      data: [
        { name: "Yazılım Geliştirme", url: "yazilim-gelistirme" },
        { name: "Müzik", url: "muzik" },
        { name: "Fitness", url: "fitness" },
        { name: "Finans ve Muhasebe", url: "finans-ve-muhasebe" },
        { name: "Tasarım", url: "tasarim" },
        { name: "Mühendislik", url: "muhendislik" },
        { name: "Web Geliştirme", url: "web-gelistirme" }
      ]
    })

    const category = await db.category.findFirstOrThrow()

    // Kurs oluşturma
    const course = await db.course.create({
      data: {
        title: "Yeni Kurs",
        profileId: user.id,
        categoryId: category.id

      }
    });

    // Kurs oluşturma
    const course2 = await db.course.create({
      data: {
        title: "Brand New Course",
        profileId: user.id,
        categoryId: category.id
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
