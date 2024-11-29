export default function Footer() {
  return (
    <footer className="dark:bg-black dark:text-white p-4 pb-20">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Gastronómik. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
