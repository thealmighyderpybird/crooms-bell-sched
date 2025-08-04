import ThemeOption from "~/app/settings/personalization/ThemeOption";
import ThemeGrid from "~/app/settings/personalization/ThemeGrid";
import styles from "./theme.module.css";

export default function ThemeOptions() {
    return <ThemeGrid>
        <ThemeOption id="default-accent" title="Default Colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" className={ styles.theme }>
                <polygon points="0,0 50,0 0,50" fill="#690D24"></polygon>
                <polygon points="50,50 50,0 0,50" fill="#FF1010"></polygon>
            </svg>
        </ThemeOption>
        <ThemeOption id="windows" title="Windows Blue">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" className={ styles.theme }>
                <rect height="50" width="50" fill="#0078D4"></rect>
            </svg>
        </ThemeOption>
        <ThemeOption id="nature" title="Nature Green">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" className={ styles.theme }>
                <polygon points="0,0 50,0 0,50" fill="#006400"></polygon>
                <polygon points="50,50 50,0 0,50" fill="#008000"></polygon>
            </svg>
        </ThemeOption>
        <ThemeOption id="halloween" title="Halloween">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" className={ styles.theme }>
                <polygon points="0,0 50,0 0,50" fill="#4B0082"></polygon>
                <polygon points="50,50 50,0 0,50" fill="#FF8C00"></polygon>
            </svg>
        </ThemeOption>
        <ThemeOption id="winter" title="Winter">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" className={ styles.theme }>
                <polygon points="0,0 50,0 0,50" fill="#1E90FF"></polygon>
                <polygon points="50,50 50,0 0,50" fill="#87CEEB"></polygon>
            </svg>
        </ThemeOption>
        <ThemeOption id="christmas" title="Christmas">
            <img src="https://cdn.croomssched.tech/data/7291ef48-5f58-4f73-a79d-23f146afd471/Christmas.png"
                 width="50" height="50" alt="Christmas Theme" className={ styles.theme } />
        </ThemeOption>
        <ThemeOption id="wawwf" title="What Are We Waiting For?">
            <img src="https://cdn.croomssched.tech/data/7291ef48-5f58-4f73-a79d-23f146afd471/WAWWF.png" width="50"
                 height="50" alt="What Are We Waiting For? Theme" className={ styles.theme } />
        </ThemeOption>
        <ThemeOption id="burn-the-ships" title="Burn The Ships">
            <img
                src="https://cdn.croomssched.tech/data/7291ef48-5f58-4f73-a79d-23f146afd471/BurnTheShips-Square.png"
                width="50" height="50" alt="Burn The Ships Theme" className={ styles.theme } />
        </ThemeOption>
        <ThemeOption id="landon-homeless-camp" title="Camp Landon">
            <img src="https://cdn.croomssched.tech/data/7291ef48-5f58-4f73-a79d-23f146afd471/landon.png" width="50"
                 height="50" alt="Landon's Homeless Camp Theme" className={ styles.theme } />
        </ThemeOption>
    </ThemeGrid>;
}