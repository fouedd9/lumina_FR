import { BatteryFull, Coffee, Gift, Home, Lightbulb, Wifi, Zap } from "lucide-react";

export const reviews = [
    { name: 'Sonia B.', city: 'Monastir', text: 'Absolument magnifique ! Elle illumine mon salon avec une chaleur incomparable. Je vais en commander une deuxième.', stars: 5 },
    { name: 'Karim R.', city: 'Tunis', text: "Parfaite pour mon café. Mes clients adorent l'ambiance qu'elle crée. Livraison rapide, produit premium.", stars: 5 },
    { name: 'Amal T.', city: 'Sousse', text: 'Cadeau offert à ma meilleure amie — elle a été bouleversée. Élégante, chic, et la lumière est douce. Top !', stars: 5 },
    { name: 'Mehdi L.', city: 'Sfax', text: "On a équipé tout notre restaurant avec ces lampes. Le résultat est bluffant, l'ambiance a totalement changé.", stars: 5 },
];

export const useCases = [
    {
        icon: Coffee,
        title: "Café & Restaurant",
        desc: "Transformez l'ambiance de votre établissement. Chaque table devient un espace intimiste et raffiné qui invite les clients à rester plus longtemps.",
        // img: "/photo_de_couverture_enligne_.png",
        img: "/Photo_de_couverture.png",
        // img: "/restaurant.png",
    },
    {
        icon: Home,
        title: "Décor de chambre",
        desc: "Une lumière douce et chaleureuse pour vos soirées de détente. Sur votre table de chevet, elle crée une atmosphère apaisante et luxueuse.",
        img: "/Décors_de_chambre.png",
    },
    {
        icon: Gift,
        title: "Idée cadeau unique",
        desc: "Offrez un cadeau qui marque les esprits. Élégant, original et utile — parfait pour un anniversaire, une fête ou simplement dire merci.",
        img: "/idee_cadeau.png",
    },
];

export const features = [
    {
        icon: BatteryFull,
        label: "Batterie longue durée",
        desc: "Jusqu'à 6h d'autonomie sur une seule charge",
    },
    {
        icon: Wifi,
        label: "Sans fil",
        desc: "Aucun câble, posez-la où vous voulez",
    },
    { icon: Zap, label: "Recharge USB-C", desc: "Charge rapide et universelle" },
    {
        icon: Lightbulb,
        label: "3 modes d'éclairage",
        desc: "Chaud, neutre ou intensité variable",
    },
];

export const galleryImgs = [
    "/Lumina_Profil.png",
    "/First_Post.png",
    "/photo_de_couverture_enligne_.png",
    "/restaurant_cocoon.png",
    "/Décors_de_chambre.png",
    "/restaurant.png",
    "/friendly_table.png",
    "/hand_woman.png"
    // "/bar_festif.png"
];

export const rightImg = [
    // "/restaurant_pirate.jpeg",
    // "/friendly_table.png",s
    "/first_post.jpeg",
    "/bar_jobi.png",
]