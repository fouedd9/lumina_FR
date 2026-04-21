import { useState, useEffect, useRef } from "react";
import { Star, Truck, MapPin, Clock, ChevronDown, Check } from "lucide-react";
import {
  features,
  galleryImgs,
  reviews,
  rightImg,
  useCases,
} from "./data/data";

// Replace with your actual WhatsApp number (format: country code + number, no +)
const WHATSAPP_NUMBER = "33767653082";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Bonjour%20Foued%2C%20je%20souhaite%20commander%20une%20lampe%20Lumina%20FR%20!`;

function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function useIntersectionObserver(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, [threshold]);

  return { ref, visible };
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useIntersectionObserver();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % galleryImgs.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#0d0a06",
        color: "#f5ede0",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Floating WhatsApp Button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
        style={{
          background: "#25D366",
          color: "#fff",
          boxShadow: "0 8px 32px rgba(37,211,102,0.4)",
        }}
      >
        <WhatsAppIcon size={22} />
        <span>Commander</span>
      </a>

      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(13,10,6,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(212,160,23,0.15)" : "none",
        }}
      >
        <div className="flex items-center gap-3">
          <img
            src="/Lumina_Profil.png"
            alt="Lumina FR"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span
            className="text-xl font-bold tracking-tight"
            style={{ color: "#D4A017" }}
          >
            Lumina <span style={{ color: "#f5ede0" }}>FR</span>
          </span>
        </div>
        {/* <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
          style={{ background: "#25D366", color: "#fff" }}
        >
          <WhatsAppIcon size={16} />
          Commander
        </a> */}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/photo_de_couverture_enligne_.png')`,
            filter: "brightness(0.35)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(13,10,6,0.85) 0%, rgba(60,35,5,0.4) 50%, rgba(13,10,6,0.9) 100%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-12 items-center w-full">
          <div>
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6 tracking-widest uppercase"
              style={{
                background: "rgba(212,160,23,0.15)",
                color: "#D4A017",
                border: "1px solid rgba(212,160,23,0.3)",
              }}
            >
              Nouveau produit
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              La lampe qui
              <br />
              <span style={{ color: "#D4A017" }}>sublime</span> chaque
              <br />
              moment
            </h1>
            <p
              className="text-lg mb-8 leading-relaxed"
              style={{ color: "#c9b99a" }}
            >
              Lumina FR — une lampe sans fil rechargeable au design doré
              intemporel. Parfaite pour les cafés, restaurants, chambres et
              comme cadeau d'exception.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  background: "#25D366",
                  color: "#fff",
                  boxShadow: "0 8px 32px rgba(37,211,102,0.3)",
                }}
              >
                <WhatsAppIcon size={22} />
                Commander via WhatsApp
              </a>
            </div>
            <div className="flex flex-wrap gap-6">
              {[
                "Livraison express Monastir",
                "Toute la Tunisie 24h",
                // "Garantie qualité",
                "Satisfait ou remboursé",
                "Garantie qualité",
              ].map((txt, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "#c9b99a" }}
                >
                  <Check size={16} style={{ color: "#D4A017" }} />
                  {txt}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div
                className="absolute-inset-8 rounded-full blur-3xl opacity-30"
                style={{
                  background:
                    "radial-gradient(circle, #D4A017 0%, transparent 70%)",
                }}
              />
              <img
                src="/Lumina_Profil.png"
                alt="Lumina FR Lamp"
                className="relative w-72 h-72 md:w-96 md:h-96 object-cover rounded-full shadow-2xl"
                style={{ border: "2px solid rgba(212,160,23,0.3)" }}
              />
            </div>
          </div>
        </div>

        <a
          href="#produit"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          style={{ color: "#D4A017" }}
        >
          <ChevronDown size={32} />
        </a>
      </section>

      {/* Features Strip */}
      <section
        id="produit"
        style={{
          background: "rgba(212,160,23,0.06)",
          borderTop: "1px solid rgba(212,160,23,0.1)",
          borderBottom: "1px solid rgba(212,160,23,0.1)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, label, desc }, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="flex flex-col items-center text-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(212,160,23,0.15)" }}
                >
                  <Icon size={22} style={{ color: "#D4A017" }} />
                </div>
                <div className="font-semibold text-sm">{label}</div>
                <div
                  className="text-xs leading-relaxed"
                  style={{ color: "#9a8a72" }}
                >
                  {desc}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <div
              className="text-xs uppercase tracking-widest mb-3 font-semibold"
              style={{ color: "#D4A017" }}
            >
              Galerie
            </div>
            <h2 className="text-4xl font-bold">Un design pensé pour séduire</h2>
            <p className="mt-4 max-w-lg mx-auto" style={{ color: "#9a8a72" }}>
              Chaque courbe, chaque reflet — la Lumina FR est conçue pour
              devenir le point focal de n'importe quel espace.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeIn delay={100} className="md:row-span-2">
            <div
              className="relative overflow-hidden rounded-2xl group"
              style={{ height: "500px" }}
            >
              <img
                src={galleryImgs[activeImg]}
                alt="Lumina FR"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {galleryImgs.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      background:
                        i === activeImg ? "#D4A017" : "rgba(255,255,255,0.4)",
                    }}
                  />
                ))}
              </div>
            </div>
          </FadeIn>

          {rightImg.map((src, i) => (
            <FadeIn key={i} delay={200 + i * 100}>
              <div
                className="relative overflow-hidden rounded-2xl group"
                style={{ height: "238px" }}
              >
                <img
                  src={src}
                  alt="Lumina FR"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section
        style={{
          background: "rgba(212,160,23,0.04)",
          borderTop: "1px solid rgba(212,160,23,0.08)",
        }}
        className="py-24"
      >
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <div
                className="text-xs uppercase tracking-widest mb-3 font-semibold"
                style={{ color: "#D4A017" }}
              >
                Utilisations
              </div>
              <h2 className="text-4xl font-bold">
                Parfaite pour chaque moment
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map(({ icon: Icon, title, desc, img }, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div
                  className="rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(212,160,23,0.15)",
                  }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ height: "220px" }}
                  >
                    <img
                      src={img}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div
                      className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(212,160,23,0.9)" }}
                    >
                      <Icon size={18} style={{ color: "#0d0a06" }} />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{title}</h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#9a8a72" }}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 max-w-6xl mx-auto px-6" id="prix">
        <FadeIn>
          <div className="text-center mb-16">
            <div
              className="text-xs uppercase tracking-widest mb-3 font-semibold"
              style={{ color: "#D4A017" }}
            >
              Tarifs
            </div>
            <h2 className="text-4xl font-bold">Choisissez votre offre</h2>
            <p className="mt-4" style={{ color: "#9a8a72" }}>
              Des prix accessibles pour un produit d'exception
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Single */}
          <FadeIn delay={100}>
            <div
              className="rounded-2xl p-8 flex flex-col transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(212,160,23,0.2)",
              }}
            >
              <div
                className="text-lg font-semibold mb-2"
                style={{ color: "#c9b99a" }}
              >
                1 Lampe Lumina FR
              </div>
              <div className="flex items-end gap-2 mb-6">
                <span
                  className="text-5xl font-bold"
                  style={{ color: "#D4A017" }}
                >
                  59
                </span>
                <span
                  className="text-2xl font-bold pb-1"
                  style={{ color: "#D4A017" }}
                >
                  DT
                </span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "1 lampe dorée premium",
                  "1 Câble de recharge inclus",
                  "  Livraison partout en Tunisie",
                  "  Garantie qualité",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm"
                    style={{ color: "#c9b99a" }}
                  >
                    <Check size={16} style={{ color: "#D4A017" }} />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                style={{ background: "#25D366", color: "#fff" }}
              >
                <WhatsAppIcon size={18} />
                Commander — 59 DT
              </a>
            </div>
          </FadeIn>

          {/* Duo */}
          <FadeIn delay={200}>
            <div
              className="rounded-2xl p-8 flex flex-col relative transition-all duration-300 hover:scale-[1.02]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(212,160,23,0.12) 0%, rgba(212,160,23,0.06) 100%)",
                border: "2px solid rgba(212,160,23,0.5)",
              }}
            >
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap"
                style={{ background: "#D4A017", color: "#0d0a06" }}
              >
                Meilleure offre
              </div>
              <div
                className="text-lg font-semibold mb-2"
                style={{ color: "#c9b99a" }}
              >
                2 Lampes Lumina FR
              </div>
              <div className="flex items-end gap-2 mb-1">
                <span
                  className="text-5xl font-bold"
                  style={{ color: "#D4A017" }}
                >
                  100
                </span>
                <span
                  className="text-2xl font-bold pb-1"
                  style={{ color: "#D4A017" }}
                >
                  DT
                </span>
              </div>
              <div className="text-sm mb-6" style={{ color: "#9a8a72" }}>
                au lieu de 118 DT — économisez 18 DT
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "2 lampes dorées premium",
                  "2 câbles de recharge inclus",
                  "Livraison partout en Tunisie",
                  "Idéal pour offrir en duo",
                  "Garantie qualité",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm"
                    style={{ color: "#c9b99a" }}
                  >
                    <Check size={16} style={{ color: "#D4A017" }} />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Bonjour%2C%20je%20souhaite%20commander%202%20lampes%20Lumina%20FR%20pour%20100%20DT%20!`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: "#25D366",
                  color: "#fff",
                  boxShadow: "0 6px 24px rgba(37,211,102,0.3)",
                }}
              >
                <WhatsAppIcon size={18} />
                Commander — 100 DT
              </a>
            </div>
          </FadeIn>
          {/* en gros */}
          <FadeIn delay={100}>
            <div
              className="rounded-2xl p-8 flex flex-col transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(212,160,23,0.2)",
              }}
            >
              <div
                className="text-lg font-semibold mb-2"
                style={{ color: "#c9b99a" }}
              >
                10 Lampes Lumina FR
              </div>
              <div className="flex items-end gap-2 mb-1">
                <span
                  className="text-5xl font-bold"
                  style={{ color: "#D4A017" }}
                >
                  400
                </span>
                <span
                  className="text-2xl font-bold pb-1"
                  style={{ color: "#D4A017" }}
                >
                  DT
                </span>
              </div>
              {/* here  */}
              <div className="text-sm mb-6" style={{ color: "#9a8a72" }}>
                au lieu de 118 DT — économisez 18 DT
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "10 lampe dorée premium",
                  "10 Câble de recharge inclus",
                  "  Livraison partout en Tunisie",
                  "  Garantie qualité",
                  "  Satisfait ou remboursé ",
                  "  Livraison gratuite ",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm"
                    style={{ color: "#c9b99a" }}
                  >
                    <Check size={16} style={{ color: "#D4A017" }} />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                style={{ background: "#25D366", color: "#fff" }}
              >
                <WhatsAppIcon size={18} />
                Commander — 400 DT
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Delivery Section */}
      <section
        style={{
          background: "rgba(212,160,23,0.04)",
          borderTop: "1px solid rgba(212,160,23,0.08)",
          borderBottom: "1px solid rgba(212,160,23,0.08)",
        }}
        className="py-20"
      >
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <div
                className="text-xs uppercase tracking-widest mb-3 font-semibold"
                style={{ color: "#D4A017" }}
              >
                Livraison
              </div>
              <h2 className="text-4xl font-bold">Rapide et fiable</h2>
              <p className="mt-4" style={{ color: "#9a8a72" }}>
                Votre lampe livrée directement chez vous
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn delay={100}>
              <div
                className="rounded-2xl p-8 flex items-start gap-5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(212,160,23,0.2)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(212,160,23,0.15)" }}
                >
                  <MapPin size={26} style={{ color: "#D4A017" }} />
                </div>
                <div>
                  <div className="font-bold text-xl mb-2">Monastir</div>
                  <div
                    className="flex items-center gap-2 mb-3"
                    style={{ color: "#D4A017" }}
                  >
                    <Clock size={15} />
                    <span className="font-bold text-lg">Moins de 24h</span>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#9a8a72" }}
                  >
                    Livraison express à Monastir. Commandez le matin, recevez le
                    jour même ou le lendemain.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div
                className="rounded-2xl p-8 flex items-start gap-5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(212,160,23,0.2)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(212,160,23,0.15)" }}
                >
                  <Truck size={26} style={{ color: "#D4A017" }} />
                </div>
                <div>
                  <div className="font-bold text-xl mb-2">Toute la Tunisie</div>
                  <div
                    className="flex items-center gap-2 mb-3"
                    style={{ color: "#D4A017" }}
                  >
                    <Clock size={15} />
                    <span className="font-bold text-lg">24h — 48h</span>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#9a8a72" }}
                  >
                    Livraison dans toutes les villes tunisiennes. Tunis, Sfax,
                    Sousse, Nabeul et partout ailleurs.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={300}>
            <div
              className="mt-8 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4"
              style={{
                background: "rgba(37,211,102,0.08)",
                border: "1px solid rgba(37,211,102,0.2)",
              }}
            >
              <div className="flex items-center gap-3">
                <div style={{ color: "#25D366" }}>
                  <WhatsAppIcon size={28} />
                </div>
                <div>
                  <div className="font-bold">
                    Commande uniquement via WhatsApp
                  </div>
                  <div className="text-sm" style={{ color: "#9a8a72" }}>
                    Simple, rapide et sécurisé
                  </div>
                </div>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap"
                style={{ background: "#25D366", color: "#fff" }}
              >
                <WhatsAppIcon size={18} />
                Commander maintenant
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <div
              className="text-xs uppercase tracking-widest mb-3 font-semibold"
              style={{ color: "#D4A017" }}
            >
              Avis clients
            </div>
            <h2 className="text-4xl font-bold">Ils nous font confiance</h2>
            <div className="flex items-center justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  fill="#D4A017"
                  style={{ color: "#D4A017" }}
                />
              ))}
              <span className="ml-2 text-sm" style={{ color: "#9a8a72" }}>
                5.0 — 100+ avis
              </span>
            </div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map(({ name, city, text, stars }, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div
                className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(212,160,23,0.15)",
                }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(stars)].map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      fill="#D4A017"
                      style={{ color: "#D4A017" }}
                    />
                  ))}
                </div>
                <p
                  className="text-sm leading-relaxed mb-5 italic"
                  style={{ color: "#c9b99a" }}
                >
                  "{text}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      background: "rgba(212,160,23,0.2)",
                      color: "#D4A017",
                    }}
                  >
                    {name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{name}</div>
                    <div className="text-xs" style={{ color: "#9a8a72" }}>
                      {city}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/first_post.jpeg')`,
            filter: "brightness(0.25)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(13,10,6,0.7), rgba(13,10,6,0.85))",
          }}
        />
        <FadeIn className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6 tracking-widest uppercase"
            style={{
              background: "rgba(212,160,23,0.15)",
              color: "#D4A017",
              border: "1px solid rgba(212,160,23,0.3)",
            }}
          >
            Offre disponible maintenant
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Illuminez votre espace
            <br />
            <span style={{ color: "#D4A017" }}>dès aujourd'hui</span>
          </h2>
          <p
            className="text-lg mb-10 leading-relaxed"
            style={{ color: "#c9b99a" }}
          >
            Rejoignez des centaines de clients satisfaits à travers la Tunisie.
            Commandez maintenant et recevez votre Lumina FR en express.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: "#25D366",
              color: "#fff",
              boxShadow: "0 8px 32px rgba(37,211,102,0.35)",
            }}
          >
            <WhatsAppIcon size={24} />
            Commander via whatsapp
          </a>
          <p className="mt-6 text-sm" style={{ color: "#6b5e4e" }}>
            Commande 100% via WhatsApp — Simple, rapide, sécurisé
          </p>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer
        className="py-10 px-6 text-center"
        style={{
          borderTop: "1px solid rgba(212,160,23,0.1)",
          background: "rgba(0,0,0,0.4)",
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <img
            src="/Lumina_Profil.png"
            alt="Lumina FR"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-bold" style={{ color: "#D4A017" }}>
            Lumina FR
          </span>
        </div>
        <p className="text-sm mb-4" style={{ color: "#6b5e4e" }}>
          La lampe sans fil rechargeable qui sublime chaque espace
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm transition-colors duration-300 hover:opacity-80"
          style={{ color: "#25D366" }}
        >
          <WhatsAppIcon size={16} />
          Commander via WhatsApp
        </a>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <p className="mt-6 text-xs" style={{ color: "#3d3228" }}>
            &copy; 2026 Lumina FR — Tunisie
          </p>
          <p className="mt-0 text-xs" style={{ color: "#3d3228" }}>
            made with ♥️ by Foued SAIDANE
          </p>
        </div>
      </footer>
    </div>
  );
}
