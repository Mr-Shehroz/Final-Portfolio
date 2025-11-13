'use client';

// SVG icons for Github and External Link
const GithubIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.867 8.178 6.839 9.504.5.09.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.604-3.37-1.342-3.37-1.342-.454-1.154-1.11-1.462-1.11-1.462-.909-.621.069-.608.069-.608 1.004.071 1.532 1.031 1.532 1.031.892 1.53 2.341 1.088 2.91.833.092-.646.349-1.089.636-1.34-2.221-.253-4.555-1.112-4.555-4.947 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.91-1.295 2.749-1.025 2.749-1.025.545 1.378.202 2.397.099 2.65.64.699 1.029 1.593 1.029 2.686 0 3.844-2.337 4.692-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.42-.012 2.749 0 .268.18.577.688.479C19.135 20.196 22 16.447 22 12.021 22 6.484 17.522 2 12 2Z"
      fill="currentColor"
    />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M15 3h6v6m-1-5-9.293 9.293a1 1 0 0 1-1.414 0L5 9.414l9.293-9.293ZM21 21H3V3h7V1H3a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2v-7h-2v7Z"
      fill="currentColor"
    />
  </svg>
);

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform with Real-Time Inventory Sync",
      description:
        "Built a full-stack React/Node.js e-commerce store with automated inventory sync across multiple warehouses using webhooks and cron jobs. Reduced manual stock updates by 90%.",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe API"],
      image: "/ecommerce.jpg",
      github: "https://github.com/Mr-Shehroz/full-ecommerce",
      demo: "https://full-ecommerce-five-inky.vercel.app/"
    },
    {
      title: "Admin Panel for E-Commerce Web",
      description:
        "Developed a robust admin dashboard for managing products, orders, users, and analytics. Real-time stats, user roles, inventory tools and bulk operations for easy store maintenance.",
      tech: ["React", "Redux Toolkit", "Node.js", "MongoDB", "Ant Design"],
      image: "/admin.jpg",
      github: "https://github.com/Mr-Shehroz/full-admin",
      demo: "https://full-admin-delta.vercel.app/"
    },
    {
      title: "NFT Landing Page with Headless CMS",
      description:
        "Created a modern NFT landing page with real-time content editing using Sanity CMS. Includes NFT showcase, wallet connect, creator stories, and dynamic updates from CMS without redeploy.",
      tech: ["Next.js", "TypeScript", "Sanity.io", "Tailwind CSS", "Web3.js"],
      image: "/nft.png",
      github: "https://github.com/Mr-Shehroz/age",
      demo: "https://age-mocha.vercel.app/"
    },
    {
      title: "Full Stack Blog Platform",
      description:
        "A full-stack blog system featuring Markdown support, comments, authentication, admin workflow, and deployment-ready API. Built for speed and SEO. Effortless writing, reading and managing blog content.",
      tech: ["Next.js", "React", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=480&q=80",
      github: "https://github.com/Mr-Shehroz/full-stack-blog",
      demo: "https://full-stack-blog-rho.vercel.app/"
    },
    {
      title: "Salon Website & Booking System",
      description:
        "Developed a modern salon web application with online appointment booking, service selection, stylist profiles, real-time availability, and automated confirmations. Includes admin dashboard to manage bookings, staff, and promotions seamlessly.",
      tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=480&q=80",
      github: "https://github.com/Mr-Shehroz/salon",
      demo: "https://khushibeautysalon.vercel.app/"
    },
  ];

  return (
    <section id="portfolio" className="text-white py-20 px-5 mx-auto max-w-[1386px]">
      {/* Header */}
      <div className="text-center mb-12">
        <h5 className="text-cyan-400 text-sm uppercase tracking-wider">LATEST PORTFOLIO</h5>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2">
          Transforming Ideas into Exceptional Systems
        </h2>
        <p className="mt-4 text-gray-300 max-w-3xl mx-auto leading-relaxed">
          I build scalable, intelligent solutions that solve real business problems — combining clean code with automation to deliver measurable impact.
        </p>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group relative bg-[#06131b] border border-cyan-500/20 rounded-xl overflow-hidden transition-all duration-300 will-change-transform"
            tabIndex={0}
          >
            {/* Glowing Background on Hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 60% 40%, #36ccfd36 20%, #139bfd16 80%, transparent 100%)',
                filter: 'blur(16px)',
                zIndex: -1,
              }}
            />

            {/* Image Container */}
            <div className="relative overflow-hidden rounded-t-xl">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="w-full h-[220px] sm:h-[280px] xl:h-[380px] object-cover transition-transform duration-500 group-hover:scale-[1.04] group-hover:rotate-[-0.5deg]"
                loading="lazy"
              />
              {/* Optional subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#06131b] via-transparent to-transparent opacity-90"></div>
            </div>

            {/* Content */}
            <div className="p-6 pt-4">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-cyan-300 group-hover:text-cyan-400 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-gray-300 text-base leading-relaxed mb-4 group-hover:opacity-90 transition-opacity">
                {project.description}
              </p>

              {/* Tech Stack Tags - Fade In on Hover */}
              <div className="flex flex-wrap gap-2 mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs px-2 py-1 rounded-full transition-colors group-hover:border-cyan-400/50 group-hover:bg-cyan-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View on Github"
                  className="inline-flex items-center gap-1 text-sm text-cyan-400 bg-[#36ccfd1a] rounded-lg px-2 py-1 
                    hover:bg-cyan-500/30 hover:text-cyan-100 
                    active:bg-cyan-600/40 
                    focus-visible:ring-2 focus-visible:ring-cyan-400 
                    transition-all duration-200 group-hover:scale-[1.03] group-hover:shadow-[0_4px_12px_rgba(19,159,253,0.3)]
                    will-change-transform"
                >
                  <GithubIcon />
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Demo"
                  className="inline-flex items-center gap-1 text-sm text-cyan-400 bg-[#36ccfd1a] rounded-lg px-2 py-1 
                    hover:bg-cyan-500/30 hover:text-cyan-100 
                    active:bg-cyan-600/40 
                    focus-visible:ring-2 focus-visible:ring-cyan-400 
                    transition-all duration-200 group-hover:scale-[1.03] group-hover:shadow-[0_4px_12px_rgba(19,159,253,0.3)]
                    will-change-transform"
                >
                  <ExternalLinkIcon />
                </a>
              </div>
            </div>

            {/* Lift Effect on Hover */}
            <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-2xl shadow-cyan-500/20 -z-10"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;