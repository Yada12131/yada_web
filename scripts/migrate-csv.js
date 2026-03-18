const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Iniciando migración de datos desde SQL (Laravel) a PostgreSQL...\n');

  try {
    // 1. Migrate Abouts
    console.log('📦 Migrando datos de Abouts...');
    await prisma.about.deleteMany(); // Limpiar tabla primero
    await prisma.about.create({
      data: {
        titulo: 'Nuestra historia',
        descripcion1: 'asdasdasddsasdadads',
        mision: 'Nuestra empresa tiene la misión de brindar asesoramiento constante a nuestros clientes, garantizando, la calidad, puntualidad en la entrega, nos destacamos en la idoneidad y respeto por la exclusividad de cada uno de nuestros clientes.',
        vision: 'Está enfocada en darle la mayor prioridad a cada uno de nuestros clientes de una manera personalizada, cumplir con las expectativas en la calidad de nuestro servicio, ya que somos una empresa prestadora de servicios en la creación de páginas web donde nos encargamos de llevar a cabo la realización de materializar y la expansión a nivel mundial de nuestros clientes ya sea empresas constituidas, como también aquellas que comienzan a dar sus primeros pasos con la certeza que nosotros YADA CREACIONES esta como apoyo permanente ,tanto en el desarrollo de sus páginas como la constante retro alimentación de las mismas los que nos hará lideres en la fidelización de nuestros clientes.',
        createdAt: new Date('2024-05-08 18:38:06'),
        updatedAt: new Date('2024-05-08 18:38:06')
      }
    });

    // 2. Migrate Founders / Team
    console.log('📦 Migrando datos de Founders...');
    await prisma.founder.deleteMany();
    await prisma.founder.createMany({
      data: [
        {
          nombre: 'Daniel Ospina Vanegas',
          cargo: 'CEO, Analista de software',
          phrase: 'El camino hacia el éxito está lleno de desafíos, pero la recompensa final es inigualable. Cree en ti mismo y en tus habilidades, y llegarás a la meta.',
          linkedin: 'https://www.instagram.com/',
          createdAt: new Date('2024-05-03 00:15:54'),
          updatedAt: new Date('2024-05-03 00:15:54')
        },
        {
          nombre: 'Yuliana Bedoya Cardona',
          cargo: 'CEO, Diseñadora',
          phrase: '',
          linkedin: 'https://www.instagram.com/',
          createdAt: new Date('2024-05-03 00:16:16'),
          updatedAt: new Date('2024-05-03 00:16:16')
        },
        {
          nombre: 'Flor Esmeralda Redondo',
          cargo: 'Fotografa',
          phrase: '',
          linkedin: 'https://www.instagram.com/',
          createdAt: new Date('2024-05-03 00:16:30'),
          updatedAt: new Date('2024-05-03 00:16:30')
        }
      ]
    });

    // 3. Migrate Homes
    console.log('📦 Migrando datos de Home...');
    await prisma.home.deleteMany();
    await prisma.home.create({
      data: {
        seccion_h1: '¡Hola somos\r\n',
        title_1: 'Nos complace colaborar con nuestros clientes,\r\n',
        conte_1: 'Nuestras herramientas\r\n',
        button_cotiza: '#',
      }
    });

    // 4. Migrate Services
    console.log('📦 Migrando datos de Services...');
    await prisma.service.deleteMany();
    await prisma.service.create({
      data: {
        encabezado: 'gsaffafasdafs',
        descripcion: 'fssfafsafsfsa',
        url_boton: 'https://www.youtube.com/watch?v=uMbNub8JoqY',
        nombre_servicio_1: 'sasdada',
        dservicio_1: 'dasdsadsads',
        createdAt: new Date('2024-05-07 23:33:31'),
        updatedAt: new Date('2024-05-07 23:33:31')
      }
    });

    // 5. Migrate Main User (Admin)
    console.log('📦 Migrando Usuario Administrador...');
    // Verificamos si ya existe el usuario antes de insertarlo
    const existingUser = await prisma.user.findUnique({
      where: { email: 'ospinavanegasdaniel@gmail.com' }
    });
    
    if (!existingUser) {
      await prisma.user.create({
        data: {
          name: 'Daniel Ospina Vanegas',
          email: 'ospinavanegasdaniel@gmail.com',
          // Este es el hash bcrypt de la BD original. Si no funciona el login viejo, 
          // usaremos la herramienta de restablecimiento.
          password: '$2y$10$T/ra5pPowhKRa/cTmCzFyeD.69DMnmQobM2WBVKGQZltK3le3Owti', 
          createdAt: new Date('2024-05-01 19:50:09'),
          updatedAt: new Date('2024-05-07 23:36:19')
        }
      });
    }

    console.log('\n🎉 ¡Proceso de migración SQL -> Prisma finalizado exitosamente!');

  } catch (err) {
    console.error('💥 Error durante la migración:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
