import { getDonnanPicture } from "~/components/donnan/donnan";
import styles from "./styles.module.css";

export default function DonnanPage() {
    return <div className={styles.root}>
        <img src={getDonnanPicture()} alt="Donnan" className="block" />
    </div>
}