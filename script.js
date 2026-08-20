/* =========================================================
   ELISA DIATTA — PORTFOLIO
   JAVASCRIPT
========================================================= */


/* =========================================================
   CONFIGURATION
========================================================= */

const CONFIG = {

    /*
     * TON EMAIL DE CONTACT
     */
    CONTACT_EMAIL: "elisadiatt607@gmail.com",


    /*
     * INTITULÉS QUI S'AFFICHENT
     * AVEC L'EFFET MACHINE À ÉCRIRE
     */
    TITLES: [
        "Community Manager",
        "Assistante Community Manager",
        "Assistante digitale"
    ]

};


/* =========================================================
   MENU MOBILE
========================================================= */

const menuToggle =
    document.querySelector(".menu-toggle");

const navLinks =
    document.querySelector(".nav-links");


if (menuToggle && navLinks) {

    menuToggle.addEventListener(
        "click",
        function () {

            const isOpen =
                navLinks.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Fermer le menu"
                    : "Ouvrir le menu"
            );

        }
    );


    /*
     * Fermer le menu après avoir
     * cliqué sur un lien
     */

    navLinks
        .querySelectorAll("a")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navLinks.classList.remove(
                        "open"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

}


/* =========================================================
   HEADER AU SCROLL
========================================================= */

const header =
    document.querySelector(".site-header");


function updateHeader() {

    if (!header) {
        return;
    }

    if (window.scrollY > 15) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);


updateHeader();


/* =========================================================
   LIEN DE NAVIGATION ACTIF
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navItems =
    document.querySelectorAll(
        ".nav-links a"
    );


const sectionObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        navItems.forEach(
                            function (link) {

                                const target =
                                    link.getAttribute(
                                        "href"
                                    );

                                link.classList.toggle(
                                    "active",
                                    target ===
                                        "#" +
                                        entry.target.id
                                );

                            }
                        );

                    }

                }
            );

        },

        {
            rootMargin:
                "-30% 0px -55% 0px",

            threshold: 0
        }

    );


sections.forEach(
    function (section) {

        sectionObserver.observe(
            section
        );

    }
);


/* =========================================================
   APPARITION AU DÉFILEMENT
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
) {

    revealElements.forEach(
        function (element) {

            element.classList.add(
                "visible"
            );

        }
    );

} else {

    const revealObserver =
        new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(
        function (element) {

            revealObserver.observe(
                element
            );

        }
    );

}


/* =========================================================
   MACHINE À ÉCRIRE
========================================================= */

const typedText =
    document.getElementById(
        "typed-text"
    );


let titleIndex = 0;

let characterIndex = 0;

let deleting = false;


function typeWriter() {

    if (
        !typedText ||
        CONFIG.TITLES.length === 0
    ) {

        return;

    }


    const currentTitle =
        CONFIG.TITLES[titleIndex];


    /*
     * ÉCRIRE
     */

    if (!deleting) {

        typedText.textContent =
            currentTitle.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        if (
            characterIndex ===
            currentTitle.length
        ) {

            setTimeout(
                function () {

                    deleting = true;

                    typeWriter();

                },
                2600
            );

            return;

        }


        setTimeout(
            typeWriter,
            80
        );

        return;

    }


    /*
     * EFFACER
     */

    typedText.textContent =
        currentTitle.substring(
            0,
            characterIndex - 1
        );

    characterIndex--;


    if (characterIndex === 0) {

        deleting = false;

        titleIndex =
            (
                titleIndex + 1
            ) %
            CONFIG.TITLES.length;


        setTimeout(
            typeWriter,
            450
        );

        return;

    }


    setTimeout(
        typeWriter,
        45
    );

}


/*
 * Si la personne a activé
 * "réduire les animations",
 * on affiche simplement le premier titre.
 */

if (typedText) {

    if (
        prefersReducedMotion
    ) {

        typedText.textContent =
            CONFIG.TITLES[0];

    } else {

        typeWriter();

    }

}


/* =========================================================
   ANNÉE AUTOMATIQUE
========================================================= */

const yearElement =
    document.getElementById(
        "year"
    );


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   FORMULAIRE DE CONTACT
========================================================= */

const contactForm =
    document.getElementById(
        "contact-form"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            /*
             * Empêche le formulaire
             * d'être envoyé vers un serveur.
             */

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const subject =
                document
                    .getElementById("subject")
                    .value
                    .trim();


            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();


            /*
             * Message qui sera
             * automatiquement préparé.
             */

            const emailBody =

`Bonjour Elisa,

Nom : ${name}

Email : ${email}

Message :

${message}

Merci.`;


            /*
             * Création du lien mailto.
             */

            const mailtoLink =

                "mailto:" +
                CONFIG.CONTACT_EMAIL +

                "?subject=" +
                encodeURIComponent(
                    subject
                ) +

                "&body=" +
                encodeURIComponent(
                    emailBody
                );


            /*
             * Ouverture de la messagerie.
             */

            window.location.href =
                mailtoLink;

        }
    );

}


/* =========================================================
   TÉLÉCHARGEMENT DU CV
========================================================= */

const downloadCV =
    document.getElementById(
        "download-cv"
    );


if (downloadCV) {

    downloadCV.addEventListener(
        "click",
        function () {

            /*
             * Version texte du CV.
             *
             * Plus tard, lorsque ton vrai
             * CV PDF sera prêt, on pourra
             * remplacer ce système.
             */

            const cvContent =

`ELISA DIATTA

Community Manager | Assistante digitale

Dakar, Sénégal

Téléphone :
77 150 17 11

Email :
${CONFIG.CONTACT_EMAIL}

Disponibilité :
À partir de septembre 2026


OBJECTIF PROFESSIONNEL

Je souhaite évoluer dans le domaine du
Community Management et de la communication
digitale.

Mon objectif est d'acquérir de l'expérience
professionnelle, de développer mes compétences
et, à terme, de pouvoir créer et développer
mes propres projets en ligne.


FORMATION

Licence 2 — Multimédia Internet Communication
UNCHK

Formation professionnelle en Community Management


COMPÉTENCES

- Community Management
- Canva
- CapCut
- Création de visuels
- Création de contenus digitaux
- Gestion des réseaux sociaux


PROJET PRINCIPAL

Lisa Shop

Projet e-commerce consacré à la vente de
vêtements et de produits cosmétiques.

Réalisations :

- Logo
- Charte graphique
- Identité visuelle
- Visuels
- Contenus pour les réseaux sociaux
- Vidéo promotionnelle
- Mise en place des réseaux sociaux


FORMATION PROFESSIONNELLE

Semaine 1 :
Bases de l'ordinateur et signatures professionnelles.

Semaine 2 :
Outils collaboratifs : Trello, Google Meet et Google Drive.

Semaine 3 :
Réseaux sociaux, analyse de marché et prompts.

Semaine 4 :
Design en ligne et identité visuelle.

Semaine 5 :
Création de la charte graphique.

Semaine 6 :
Contenu vidéo, stratégie digitale, Business Manager et portfolio.

Semaine 7 :
Mise en pratique et finalisation du projet Lisa Shop.


POSTES RECHERCHÉS

- Community Manager
- Assistante Community Manager
- Assistante digitale


TYPE DE POSTE

Stage / Premier emploi
`;


            /*
             * Création du fichier.
             */

            const blob =
                new Blob(
                    [cvContent],
                    {
                        type:
                            "text/plain;charset=utf-8"
                    }
                );


            const fileURL =
                URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement(
                    "a"
                );


            link.href =
                fileURL;


            link.download =
                "CV-Elisa-Diatta.txt";


            document.body.appendChild(
                link
            );


            link.click();


            link.remove();


            URL.revokeObjectURL(
                fileURL
            );

        }
    );

}