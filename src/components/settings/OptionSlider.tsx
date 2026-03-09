import { type ReactSwitchProps } from "react-switch";
import Switch from "react-switch";

export default function OptionSlider(props: ReactSwitchProps) {
    return <div className="links">
        <Switch {...props} className="block! react-switch" onColor="#888" handleDiameter={15} height={20} width={40}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                uncheckedIcon={false} checkedIcon={false} />
    </div>;
};