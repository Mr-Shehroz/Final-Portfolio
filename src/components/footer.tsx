import Image from "next/image";

const Footer = () => {
  // Github SVG icon
  const GithubIcon = () => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-cyan-400">
      <rect width="24" height="24" rx="12" fill="#0E2232" />
      <path
        d="M12 2C6.48 2 2 6.58 2 12.26c0 4.47 2.87 8.26 6.84 9.6.5.1.68-.22.68-.48v-1.67c-2.78.62-3.37-1.37-3.37-1.37-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.13.64-1.4-2.22-.26-4.56-1.15-4.56-5.1 0-1.13.38-2.06 1.02-2.78-.1-.25-.44-1.27.09-2.65 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.88c.85.004 1.7.11 2.5.32 1.9-1.33 2.74-1.05 2.74-1.05.53 1.38.2 2.4.1 2.65.64.72 1.02 1.65 1.02 2.78 0 3.96-2.34 4.83-4.57 5.09.36.33.68.97.68 1.97v2.92c0 .27.18.59.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
        fill="#22D3EE"
      />
    </svg>
  );

  // Email SVG icon
  const EmailIcon = () => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-cyan-400">
      <rect width="24" height="24" rx="12" fill="#0E2232" />
      <path d="M21 8.5V15a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 15V8.5m18 0A2.5 2.5 0 0 0 18.5 6h-13A2.5 2.5 0 0 0 3 8.5m18 0-8.22 6.54a1 1 0 0 1-1.28 0L3 8.5" stroke="#22D3EE" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  // Phone SVG icon
  const PhoneIcon = () => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-cyan-400">
      <rect width="24" height="24" rx="12" fill="#0E2232" />
      <path d="M18.882 16.023c-.435-.433-2.589-2.134-3.02-2.388-.433-.256-.749-.318-1.06.023-.312.342-.918 1.064-1.126 1.284-.208.221-.385.238-.709.089a8.88 8.88 0 0 1-2.712-2.338 8.293 8.293 0 0 1-1.718-2.752c-.138-.32-.013-.5.19-.7.2-.2.445-.525.6-.7.156-.174.111-.453-.068-.92-.177-.465-.785-2.192-1.053-3.004-.277-.829-.562-.717-.77-.73-.198-.012-.421-.014-.644-.014-.222 0-.571.082-.87.385C3.447 4.49 2.897 6.166 3 7.247c.122 1.282.769 3.256 2.523 5.928 1.714 2.605 3.586 4.453 6.3 6.19 2.67 1.72 4.645 2.404 5.927 2.525 1.08.104 2.757-.447 2.893-1.787.032-.338-.005-.695-.017-.888-.013-.217.1-.494-.73-.771-.816-.269-2.542-.876-3.007-1.053-.467-.18-.745-.225-.92-.068-.176.156-.502.401-.701.6-.199.203-.38.328-.7.19Z" stroke="#22D3EE" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

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
            <Image src="/logo1.svg" height={100} width={100} alt="logo" className="2xl:w-[180px] w-[150px]"/>
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
            {['About', 'Services', 'Portfolio', 'Contact'].map((item) => (
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
            {/* Email */}
            <div className="flex items-start gap-3">
              <a
                href="mailto:shehroz.programmer@gmail.com"
                className="w-6 h-6 bg-cyan-500/10 border border-cyan-500 rounded-full flex items-center justify-center hover:bg-cyan-500/20 transition"
                aria-label="Send Email"
                target="_blank"
                rel="noopener noreferrer"
              >
                <EmailIcon />
              </a>
              <a
                href="mailto:shehroz.programmer@gmail.com"
                className="text-gray-300 hover:text-cyan-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                shehroz.programmer@gmail.com
              </a>
            </div>
            {/* Github (as location replacement) */}
            <div className="flex items-start gap-3">
              <a
                href="https://github.com/Mr-Shehroz"
                className="w-6 h-6 bg-cyan-500/10 border border-cyan-500 rounded-full flex items-center justify-center hover:bg-cyan-500/20 transition"
                aria-label="View Github"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon />
              </a>
              <a
                href="https://github.com/Mr-Shehroz"
                className="text-gray-300 hover:text-cyan-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/Mr-Shehroz
              </a>
            </div>
            {/* Phone */}
            <div className="flex items-start gap-3">
              <a
                href="tel:+923255706845"
                className="w-6 h-6 bg-cyan-500/10 border border-cyan-500 rounded-full flex items-center justify-center hover:bg-cyan-500/20 transition"
                aria-label="Call phone"
              >
                <PhoneIcon />
              </a>
              <a
                href="tel:+923255706845"
                className="text-gray-300 hover:text-cyan-300 transition-colors"
              >
                +923255706845
              </a>
            </div>
          </div>
        </div>

        {/* Column 4: Social */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Follow Us</h3>
          <div className="flex space-x-4">
            {/* Instagram */}
            <a
              href="https://instagram.com/"
              aria-label="Instagram"
              className="w-10 h-10 bg-[#0a1a26] border border-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg fill="currentColor" viewBox="0 0 20 20" width="21" height="21">
                <path d="M10 7.01A2.99 2.99 0 1010 13a2.99 2.99 0 000-5.99zm0 4.93A1.94 1.94 0 1110 8.07a1.94 1.94 0 010 3.87zm4.55-1.42a.704.704 0 01.7-.71.705.705 0 011.41 0 .704.704 0 01-.7.7.704.704 0 01-.71-.7zM10 4.1a5.9 5.9 0 105.9 5.9A5.9 5.9 0 0010 4.1zm0 10.55a4.65 4.65 0 114.65-4.65A4.65 4.65 0 0110 14.65z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/"
              aria-label="LinkedIn"
              className="w-10 h-10 bg-[#0a1a26] border border-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg fill="currentColor" viewBox="0 0 24 24" width="21" height="21">
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.4 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm14.9 10.29h-3v-4.89c0-1.16-.02-2.65-1.62-2.65-1.62 0-1.87 1.27-1.87 2.57v4.97h-3v-9h2.89v1.23h.04c.4-.76 1.38-1.56 2.83-1.56 3.02 0 3.58 1.99 3.58 4.58v5.75z" />
              </svg>
            </a>
            {/* Twitter/X */}
            <a
              href="https://x.com/"
              aria-label="Twitter"
              className="w-10 h-10 bg-[#0a1a26] border border-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg fill="currentColor" viewBox="0 0 24 24" width="21" height="21">
                <path d="M21.543 7.104c.015.207.015.414.015.623 0 6.348-4.836 13.657-13.657 13.657-2.71 0-5.23-.792-7.358-2.143.377.044.753.066 1.13.066 2.25 0 4.32-.765 5.967-2.056-2.104-.04-3.885-1.428-4.504-3.328.292.055.59.083.897.083.435 0 .86-.06 1.257-.166-2.213-.447-3.879-2.397-3.879-4.736v-.06c.652.362 1.4.58 2.194.605-1.3-.872-2.154-2.36-2.154-4.042 0-.893.24-1.728.66-2.445 2.407 2.954 6.013 4.896 10.078 5.1-.084-.357-.128-.73-.128-1.115 0-2.685 2.179-4.864 4.868-4.864 1.398 0 2.666.59 3.553 1.54 1.11-.217 2.16-.625 3.102-1.184-.366 1.142-1.137 2.098-2.145 2.705 1-.119 1.958-.385 2.842-.777-.664.993-1.504 1.87-2.473 2.573z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://facebook.com/"
              aria-label="Facebook"
              className="w-10 h-10 bg-[#0a1a26] border border-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg fill="currentColor" viewBox="0 0 24 24" width="21" height="21">
                <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.078v-3.622h3.078v-2.671c0-3.066 1.872-4.736 4.602-4.736 1.312 0 2.437.097 2.768.141v3.213l-1.899.001c-1.492 0-1.783.709-1.783 1.751v2.301h3.567l-.465 3.622h-3.102V24h6.075c.73 0 1.323-.593 1.323-1.326V1.326C24 .592 23.405 0 22.675 0"/>
              </svg>
            </a>
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