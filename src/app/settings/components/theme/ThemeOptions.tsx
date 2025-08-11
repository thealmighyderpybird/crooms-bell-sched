import ThemeOption from "~/app/settings/components/theme/ThemeOption";
import ThemeGrid from "~/app/settings/components/theme/ThemeGrid";
import styles from "./theme.module.css";
import ThemeImage from "./ThemeImage";

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
            <ThemeImage src="https://cdn.croomssched.tech/data/7291ef48-5f58-4f73-a79d-23f146afd471/Christmas.png"
                        theme="Christmas" />
        </ThemeOption>
        <ThemeOption id="wawwf" title="What Are We Waiting For?">
            <ThemeImage src="https://cdn.croomssched.tech/data/7291ef48-5f58-4f73-a79d-23f146afd471/WAWWF.png"
                        theme="What Are We Waiting For?" />
        </ThemeOption>
        <ThemeOption id="burn-the-ships" title="Burn The Ships">
            <ThemeImage
                src="https://cdn.croomssched.tech/data/7291ef48-5f58-4f73-a79d-23f146afd471/BurnTheShips-Square.png"
                theme="Burn The Ships" />
        </ThemeOption>
        <ThemeOption id="landon-homeless-camp" title="Camp Landon">
            <ThemeImage src="https://cdn.croomssched.tech/data/7291ef48-5f58-4f73-a79d-23f146afd471/landon.png"
                        theme="Landon's Homeless Camp" />
        </ThemeOption>
    </ThemeGrid>;
}