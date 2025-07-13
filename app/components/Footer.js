export default function Footer() {
  return (
    <footer className="dark:bg-white dark:text-black p-4 pb-20">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} ClickCito. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
