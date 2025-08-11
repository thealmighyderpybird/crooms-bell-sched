"use client";

import { createContext, type JSX, type SVGProps, useContext, useState, type ReactNode } from "react";

const DismissCircleRegular = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path
            d="M24 4c11.046 0 20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24S12.954 4 24 4m-6.116 12.116l-.102-.091a1.25 1.25 0 0 0-1.564 0l-.102.091l-.091.102a1.25 1.25 0 0 0 0 1.564l.091.102L22.233 24l-6.117 6.116l-.091.102a1.25 1.25 0 0 0 0 1.564l.091.102l.102.091a1.25 1.25 0 0 0 1.564 0l.102-.091L24 25.767l6.116 6.117l.102.091a1.25 1.25 0 0 0 1.564 0l.102-.091l.091-.102a1.25 1.25 0 0 0 0-1.564l-.091-.102L25.767 24l6.117-6.116l.091-.102a1.25 1.25 0 0 0 0-1.564l-.091-.102l-.102-.091a1.25 1.25 0 0 0-1.564 0l-.102.091L24 22.233zl-.102-.091z"
            fill="currentColor"/>
    </svg>;
};

const WarningRegular = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path
            d="M20.471 6.228c1.617-2.99 5.916-2.966 7.5.042l15.533 29.502c1.49 2.83-.562 6.23-3.76 6.23H8.255c-3.22 0-5.27-3.44-3.738-6.272zM24 15c-.69 0-1.25.56-1.25 1.25v11.5a1.25 1.25 0 1 0 2.5 0v-11.5c0-.69-.56-1.25-1.25-1.25m0 20a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
            fill="currentColor"/>
    </svg>;
};

const InfoRegular = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path
            d="M44 24c0 11.046-8.954 20-20 20S4 35.046 4 24S12.954 4 24 4s20 8.954 20 20m-20-4c-.69 0-1.25.56-1.25 1.25v12.5a1.25 1.25 0 1 0 2.5 0v-12.5c0-.69-.56-1.25-1.25-1.25m0-3a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
            fill="currentColor"/>
    </svg>;
};

const DismissRegular = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
        <path d="M8.384 6.616a1.25 1.25 0 1 0-1.768 1.768L22.232 24L6.616 39.616a1.25 1.25 0 0 0 1.768 1.768L24 25.768l15.615 15.615a1.25 1.25 0 1 0 1.768-1.768L25.768 24L41.383 8.384a1.25 1.25 0 1 0-1.767-1.767L24 22.232z"
              fill="currentColor" />
    </svg>;
};

type Alert = { id: number, title: string; message: string; type: 0 | 1 | 2 | -1 };

type AlertContextType = {
    createAlertBalloon: (title: string, message: string, type?: Alert["type"]) => void;
};

enum BalloonTypes {
    Info = 0,
    Warn = 1,
    Alert = 2,
    Generic = -1,
}

const BalloonTypeMap = {
    [BalloonTypes.Info]: "info",
    [BalloonTypes.Warn]: "warn",
    [BalloonTypes.Alert]: "alert",
    [BalloonTypes.Generic]: undefined,
}

const IconMap = {
    [BalloonTypes.Info]: <InfoRegular />,
    [BalloonTypes.Warn]: <WarningRegular />,
    [BalloonTypes.Alert]: <DismissCircleRegular />,
    [BalloonTypes.Generic]: undefined,
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

const useAlert = () => {
    const ctx = useContext(AlertContext);
    if (!ctx) throw new Error("useAlert must be used within AlertProvider");
    return ctx;
};

export function AlertProvider({ children }: { children: ReactNode }) {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    const createAlertBalloon = (title: string, message: string, type: Alert["type"] = -1) => {
        const id = Date.now();
        setAlerts(prev => [...prev, { id, title, message, type }]);
        setTimeout(() => setAlerts(prev => prev.filter(a => a.id !== id)), 10000);
    };

    return (
        <AlertContext.Provider value={{ createAlertBalloon: createAlertBalloon }}>
            {children}
            <div id="alert-floater">
                {alerts.map(alert => (
                    <div key={alert.id} className={ BalloonTypeMap[alert.type] }>
                        <div>
                            <span className="icon">
                                { IconMap[alert.type] }
                            </span>
                            <div>
                                <h3>{ alert.title }</h3>
                                <p>{ alert.message }</p>
                            </div>
                        </div>
                        <DismissRegular className="close"
                                        onClick={ () => setAlerts(prev => prev.filter(a => a.id !== alert.id)) } />
                    </div>
                ))}
            </div>
        </AlertContext.Provider>
    );
}

export default useAlert;