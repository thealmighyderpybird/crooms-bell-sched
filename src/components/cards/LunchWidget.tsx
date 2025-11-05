import cardTableStyles from "./styles/cardTable.module.css";
import CardHeader from "~/components/index/CardHeader";
import CBSHServerURL from "~/lib/CBSHServerURL";
import Card from "~/components/index/Card";
import { ca } from "zod/locales";

interface LunchFetch {
    status: "OK" | "FAILED",
    data: LunchItem[],
}

interface LunchItem {
    name: string,
}

export default async function LunchWidget() {
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
            <CardHeader>Lunch Menu</CardHeader>
            <div className={cardTableStyles.table} style={{ marginBlockStart: "0.5rem" }}>
                <div>
                    <div>Failed to connect to server. Server maintenance may be in progress.</div>
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