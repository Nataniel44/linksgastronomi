export default function SectionWrapper({ children, className = '', id }) {
  return (
    <section id={id} className={`w-full  mx-auto  pt-16 md:pt-24 px-4 overflow-visible ${className}`}>
      {children}
    </section>
  );
}