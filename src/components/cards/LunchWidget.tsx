import cardTableStyles from "./styles/cardTable.module.css";
import CardHeader from "~/components/index/CardHeader";
import CBSHServerURL from "~/lib/CBSHServerURL";
import Card from "~/components/index/Card";

interface LunchFetch {
    status: "OK" | "FAILED",
    data: LunchItem[],
}

interface LunchItem {
    name: string,
}

const sillyQuips = ["motherboards", "CPU", "graphics cards", "Wi-Fi cards", "RAM", "SSD", "sketchy hard drives",
                            "plastic", "USB dongles", "lunch"];

export default async function LunchWidget() {
    const randomNumber1 = Math.floor(Math.random() * 10);
    const randomNumber2 = Math.floor(Math.random() * 10);
    try {
        const menu = await getLunchMenu();
        return <Card>
            <CardHeader>Lunch Menu</CardHeader>
            <div className={cardTableStyles.table} style={{ marginBlockStart: "0.5rem" }}>
                <div>
                    <div className={cardTableStyles.header + dailyActiveFunction(1)}>Monday</div>
                    <div>{menu[0]!.name}</div>
                </div>
                <div>
                    <div className={cardTableStyles.header + dailyActiveFunction(2)}>Tuesday</div>
                    <div>{menu[1]!.name}</div>
                </div>
                <div>
                    <div className={cardTableStyles.header + dailyActiveFunction(3)}>Wednesday</div>
                    <div>{menu[2]!.name}</div>
                </div>
                <div>
                    <div className={cardTableStyles.header + dailyActiveFunction(4)}>Thursday</div>
                    <div>{menu[3]!.name}</div>
                </div>
                <div>
                    <div className={cardTableStyles.header + dailyActiveFunction(5)}>Friday</div>
                    <div>{menu[4]!.name}</div>
                </div>
            </div>
        </Card>
    }
    catch {
        return <Card>
            <div style={{ marginBlockStart: "0.5rem", userSelect: "none" }}>
                <div style={{ display: "flex", flexFlow: "column", alignItems: "center" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="6rem" height="6rem">
                        <path d="M24 4c11.046 0 20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24S12.954 4 24 4"
                              fill="url(#fluentColorDismissCircle480)" />
                        <path d="m17.782 16.025l.102.091L24 22.233l6.116-6.117a1.25 1.25 0 0 1 1.666-.091l.102.091a1.25 1.25 0 0 1 .091 1.666l-.091.102L25.767 24l6.117 6.116a1.25 1.25 0 0 1 .091 1.666l-.091.102a1.25 1.25 0 0 1-1.666.091l-.102-.091L24 25.767l-6.116 6.117a1.25 1.25 0 0 1-1.666.091l-.102-.091a1.25 1.25 0 0 1-.091-1.666l.091-.102L22.233 24l-6.117-6.116a1.25 1.25 0 0 1-.091-1.666l.091-.102a1.25 1.25 0 0 1 1.666-.091"
                              fill="url(#fluentColorDismissCircle481)" />
                        <defs>
                            <linearGradient x1="10.25" x2="36.5" y1="6.5" y2="45.25" gradientUnits="userSpaceOnUse"
                                            id="fluentColorDismissCircle480">
                                <stop stopColor="#F83F54"></stop>
                                <stop offset="1" stopColor="#CA2134"></stop>
                            </linearGradient>
                            <linearGradient x1="16.708" x2="25.3" y1="24.729" y2="33.663" gradientUnits="userSpaceOnUse"
                                            id="fluentColorDismissCircle481">
                                <stop stopColor="#FDFDFD"></stop>
                                <stop offset="1" stopColor="#FECBE6"></stop>
                            </linearGradient>
                        </defs>
                    </svg>
                    <h2>Lunch Menu Unavailable</h2>
                    <p style={{ textAlign: "center" }}>
                        We couldn&apos;t connect to the server, we&apos;re probably having fried { sillyQuips[randomNumber1] } with
                        a side of melted { sillyQuips[randomNumber2] }.
                    </p>
                </div>
            </div>
        </Card>
    }
};

const dailyActiveFunction = (day: number) => {
    return new Date().getDay() === day ? " " + cardTableStyles.active : "";
};

const getLunchMenu = async () => {
    const e = await fetch(CBSHServerURL + "/infofetch/lunch");
            const r = await e.json() as LunchFetch;
            return r.data;
};