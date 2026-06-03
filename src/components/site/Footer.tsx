export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 md:flex-row">
        <div className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary" />
          TijdperkAI <span className="text-xs font-normal text-muted-foreground">× Weclairify</span>
        </div>
        <nav className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <a href="#programma" className="hover:text-foreground">Programma</a>
          <a href="#pakketten" className="hover:text-foreground">Pakketten</a>
          <a href="#reviews" className="hover:text-foreground">Reviews</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
          <a href="mailto:hello@weclairify.com" className="hover:text-foreground">Contact</a>
        </nav>
        <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} TijdperkAI × Weclairify</div>
      </div>
    </footer>
  );
}
