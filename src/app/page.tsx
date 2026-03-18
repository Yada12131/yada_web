import { prisma } from '@/lib/prisma'
import HeroSection from '@/components/HeroSection'
import IntroSection from '@/components/IntroSection'
import ServicesGrid from '@/components/ServicesGrid'
import TeamSection from '@/components/TeamSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import CTASection from '@/components/CTASection'

export const dynamic = 'force-dynamic'

export default async function Home() {
  // Fetch all data in parallel
  const [homeData, introData, sliders, services, equipo, testimonios, cta] =
    await Promise.all([
      prisma.home.findFirst(),
      prisma.intro.findFirst(),
      prisma.slider.findMany({ take: 5 }),
      prisma.service.findFirst(),
      prisma.founder.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.testimony.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.cTA.findFirst(),
    ])

  // Prepare hero data
  const heroData = {
    titulo:
      homeData?.title_1 || '¡Cada gran diseño comienza con una historia aún mejor!',
    subtitulo:
      homeData?.seccion_h1 || 'Bienvenidos a YADA CREACIONES',
    descripcion:
      homeData?.conte_1 ||
      'Nuestro proceso comienza con un estudio de las necesidades a través del diseño y el desarrollo para generar estrategias innovadoras para tu negocio.',
    slides: sliders.map((s) => ({
      titulo: s.title || '',
      descripcion: s.descripcion || '',
    })),
  }

  // Prepare intro data
  const introContent = {
    titulo: introData?.titulo || '¡Hola! Somos YADA CREACIONES',
    subtitulo: introData?.subtitulo || 'Nuestro equipo está listo',
    contenido:
      introData?.descripcion ||
      'Una empresa enfocada en dar soluciones a la medida para profesionales que requieran impulsar su negocio a otro nivel. Aceptamos requerimientos en las versiones de lenguaje y aunque que somos totalmente flexibles en nuestro desempeño de trabajo. No satisface colaborar con nuestros clientes.',
  }

  // Prepare services
  const servicios = [
    {
      nombre: services?.nombre_servicio_1 || 'Desarrollo Web',
      descripcion:
        services?.dservicio_1 ||
        'Creamos sitios web modernos, rápidos y seguros con las últimas tecnologías.',
    },
    {
      nombre: services?.nombre_servicio_2 || 'Diseño Digital',
      descripcion:
        services?.dservicio_2 ||
        'Diseñamos interfaces atractivas y funcionales enfocadas en la experiencia del usuario.',
    },
    {
      nombre: services?.nombre_servicio_3 || 'Marketing Digital',
      descripcion:
        services?.Dservicio_3 ||
        'Estrategias de marketing digital para llevar tu marca al siguiente nivel.',
    },
  ]

  // Prepare CTA data
  const ctaData = {
    titulo:
      cta?.titulo || '¿Quieres cotizar tu proyecto con nosotros?',
    descripcion:
      cta?.descripcion ||
      'En YADA creemos que la innovación y la experiencia del usuario son clave. Cuéntanos sobre tu proyecto y te asesoraremos sobre la mejor forma de trabajar con nosotros para tu plan de negocio.',
    boton_texto: cta?.boton_texto || 'Contáctanos',
    boton_link: cta?.boton_link || '/contacto',
  }

  return (
    <main className="min-h-screen">
      <HeroSection {...heroData} />

      <IntroSection {...introContent} />

      <ServicesGrid
        titulo="Nuestros servicios"
        subtitulo="Trabajamos con las mejores programas"
        servicios={servicios}
      />

      <TeamSection
        titulo="Equipo de trabajo"
        descripcion={introContent.contenido}
        equipo={equipo}
      />

      <TestimonialsSection testimonios={testimonios} />

      <CTASection {...ctaData} />
    </main>
  )
}
