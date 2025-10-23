export default function SectionWrapper({ children, className = '', id }) {
  return (
    <section id={id} className={`w-full max-w-5xl mx-auto py-16 px-4 ${className}`}>
      {children}
    </section>
  );
}