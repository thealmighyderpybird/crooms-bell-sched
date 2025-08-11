import Switch, { type ReactSwitchProps } from "react-switch";

export default function OptionSlider(props: ReactSwitchProps) {
    return <div className="links">
        <Switch {...props}
                onColor="#888"
                uncheckedIcon={false}
                checkedIcon={false}
                handleDiameter={15}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={40}
        />
    </div>;
};