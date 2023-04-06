const navbar = function () {
    return {
        open: false,
        entries: [
            { name: 'home', targetSection: '#home' },
            { name: 'about', targetSection: '#about' },
            { name: 'skills', targetSection: '#skills' },
            { name: 'experience', targetSection: '#experience' },
            { name: 'projects', targetSection: '#project' },
            { name: 'contact', targetSection: '#contact' },
        ],
    };
};
window.$navbar = navbar;

const home = function () {
    let $refs;

    return {
        setup(refs) {
            $refs = refs;
        },
        async fireworks(durationInSeconds) {
            const duration = durationInSeconds * 1000;
            const end = Date.now() + duration;

            (function frame() {
                // launch a few confetti from the left edge
                window.confetti({
                    particleCount: 7,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                });
                // and launch a few from the right edge
                window.confetti({
                    particleCount: 7,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                });

                // keep going until we are out of time
                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            })();
        },
        // Based on:
        // https://stackoverflow.com/a/30358006/2251135
        play() {
            this.showVideo = true;
            $refs.youtubeEmbeddedVideo.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        },
        hide() {
            this.showVideo = false;
            $refs.youtubeEmbeddedVideo.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        },
        showVideo: false,
    };
};
window.$home = home;

const skills = function () {
    return {
        languages: [
            {
                name: 'HTML',
                image: './images/html5.svg',
                description:
                    'HTML is essential for creating web content with a wide range of applications, constantly evolving to meet changing needs and remaining vital.',
            },
            {
                name: 'CSS',
                image: './images/css.svg',
                description: 'CSS is critical for creating visually appealing and consistent web designs across devices and platforms.',
            },
            {
                name: 'JavaScript',
                image: './images/js.svg',
                description:
                    'JavaScript has grown to become one of the most popular programming languages in the world, with a large and active developer community.',
            },
        ],
        async load() {
            const res = await fetch('https://nextjs-red-six-46.vercel.app/api/wakatime/SFMTUNING', { method: 'GET' });
            const stats = await res.json();
            const { data } = stats;
            const languagesIWant = ['HTML', 'CSS', 'JavaScript'];
            const languageStatsList = data.languages.filter(l => languagesIWant.indexOf(l.name) !== -1);
            for (let i = 0; i < languageStatsList.length; i++) {
                const languageStats = languageStatsList[i];
                const targetLanguage = this.languages.find(l => l.name === languageStats.name);
                targetLanguage.hours = languageStats.hours;
                targetLanguage.decimal = languageStats.decimal;
            }
        },
        progress(language) {
            const percentage = (language.decimal / 320) * 100;
            return `${percentage}%`;
        },
    };
};
window.$skills = skills;

const experience = function () {
    return {
        entries: [
            {
                place: 'Ensign College - Bachelor of Cybersecurity/IT',
                date: 'Aug 2021 - Aug 2025 (Graduation)',
                description: `
                <p>
                    Utah - Salt Lake Area, Knowledge in, Java, SQL Database analysis and administration, Agile project management, Web Development.
                </p>
                `,
            },
            {
                place: 'Environmental Logistics Sao Paulo - Safety Officer Technician',
                date: '2016 - 2017',
                description: `
                <p>
                    Brazil - Sao Paulo Area, LOGA provides public cleaning services in São Paulo, the 11th largest city in the world.
                    EHS management in 24/7 dedicated operation of environmental logistics (public and health services waste management)
                    of the Northwest Group of the City of São Paulo, Meetings with Presidency / Board of Directors to present results,
                    performance indicators and Safety actions. Interface with various departments in corporate affairs of Safety 
                    (Communication/Operation/Legal/Controlling/Environment) Fire Brigade Management (Monthly meetings, simulated, external and internal training).
                    Work management in places with hazardous atmospheres (H2S, Co2). Autoclave, Industrial Boiler, Central Plant for Treatment of Hospital Waste.    
                
                <p>
                `,
            },
            {
                place: 'Sodexo - Safety Officer Technician',
                date: '2015 - 2016',
                description: `
                <p>
                    Sodexo is a French food services and facilities management company. Sodexo is one of the world's largest multinational corporations.
                    EHS management in food service processes for over 2000 employees in a large hospital.
                    Fixed acting routine in 24/7 operation with over 110 employees. Implementation of all management
                    Safety. Implementation of a Behavioral Health and Safety Management System. Survey and application of performance indicators (KPIs). 
                    Inspections on heat generation equipment (Combined ovens, industrial stoves, fryers and pressure boiler).Chemical Management 
                    (Alkaline detergent, chlorine disinfectants and caustic degreaser) Management of Fire Brigade and Waste Program.
                </p>
                `,
            },
            {
                place: 'ESTRE - Safety Officer Technician',
                date: '2013 - 2015',
                description: `
                <p>
                    Estre is Brazil’s largest environmental services company. 
                    Responsible for EHS management of TWM (Total Waste Management), Daily inspections of dedicated logistics operations. 
                    Monitoring and daily inspections in the Maintenance shop (Tires Service, Mechanics, Painting and Welding) and Fuel Station.

                </p>
                `,
            },
        ],
    };
};

window.$experience = experience;
