const Footer = () => {
  return (
    <footer className="bg-[#06131b] text-white pt-16 pb-8 px-5 border-t border-cyan-500/10 relative overflow-hidden">
      {/* Cosmic Glow Background */}
      <div
        className="absolute top-0 right-0 w-full h-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 90% 20%, #36ccfd16 0%, #139bfd11 75%, transparent 100%)',
          filter: 'blur(80px)',
          zIndex: -1,
        }}
      />

      {/* Stars effect */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-40"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Responsive grid: side by side on md and up */}
      <div className="max-w-[1386px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1: Brand & Newsletter */}
        <div>
          <div className="flex items-center mb-6">
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none" className="mr-2">
              <rect width="12" height="24" rx="2" fill="#36ccfd"/>
              <rect x="16" y="12" width="12" height="12" rx="2" fill="#139bfd"/>
              <rect x="32" y="8" width="12" height="16" rx="2" fill="#36ccfd"/>
            </svg>
            <span className="text-xl font-bold text-cyan-300">VirTuo</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mb-6 leading-tight">
            Get Ready To <br />
            <span className="text-cyan-300">Create Great</span>
          </h2>
        </div>

        {/* Column 2: Quick Link */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Quick Link</h3>
          <ul className="space-y-3">
            {['About Me', 'Service', 'Contact Me', 'Blog Post', 'Pricing'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-gray-300 hover:text-cyan-300 transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Contact</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-cyan-500/10 border border-cyan-500 rounded-full flex items-center justify-center">
                <svg width="12" height="12" fill="currentColor" className="text-cyan-400">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15l-2-2v-4h2v4h2l-2 2zm1-9h-2V6h2v2z"/>
                </svg>
              </div>
              <span className="text-gray-300">example@gmail.com</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-cyan-500/10 border border-cyan-500 rounded-full flex items-center justify-center">
                <svg width="12" height="12" fill="currentColor" className="text-cyan-400">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15l-2-2v-4h2v4h2l-2 2zm1-9h-2V6h2v2z"/>
                </svg>
              </div>
              <span className="text-gray-300">3891 Ranchview Dr. Richardson</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-cyan-500/10 border border-cyan-500 rounded-full flex items-center justify-center">
                <svg width="12" height="12" fill="currentColor" className="text-cyan-400">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15l-2-2v-4h2v4h2l-2 2zm1-9h-2V6h2v2z"/>
                </svg>
              </div>
              <span className="text-gray-300">01245789321</span>
            </div>
          </div>
        </div>

        {/* Column 4: Social */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Follow Us</h3>
          <div className="flex space-x-4">
            {[
              { name: 'Instagram', icon: 'IG' },
              { name: 'LinkedIn', icon: 'in' },
              { name: 'Twitter', icon: 'X' },
              { name: 'Facebook', icon: 'f' },
            ].map((social) => (
              <a
                key={social.name}
                href={`#${social.name.toLowerCase()}`}
                aria-label={social.name}
                className="w-10 h-10 bg-[#0a1a26] border border-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 pt-6 border-t border-cyan-500/10 flex flex-col sm:flex-row justify-center items-center text-sm text-gray-400">
        <p>© Shehroz 2025 | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;