export default function SectionWrapper({ children, className = '', id }) {
  return (
    <section id={id} className={`w-full max-w-5xl mx-auto  pt-16 md:pt-24 px-4 ${className}`}>
      {children}
    </section>
  );
}