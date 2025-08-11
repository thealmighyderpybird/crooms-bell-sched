"use client";

import InputControl from "../../components/periods/inputControl";
import { updatePeriodNames } from "~/lib/settingsManager";
import styles from "../../settings.module.css";
import { useState } from "react";

export default function PeriodNameChanger({ initial }: { initial: string }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const initialArray = JSON.parse(initial);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const [period1, setPeriod1] = useState(initialArray[0]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const [period2, setPeriod2] = useState(initialArray[1]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const [period3, setPeriod3] = useState(initialArray[2]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const [period4, setPeriod4] = useState(initialArray[3]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const [period5, setPeriod5] = useState(initialArray[4]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const [period6, setPeriod6] = useState(initialArray[5]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const [period7, setPeriod7] = useState(initialArray[6]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const [period8, setPeriod8] = useState(initialArray[7]);

    const periodNames = [
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        period1!.toString().trim(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        period2!.toString().trim(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        period3!.toString().trim(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        period4!.toString().trim(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        period5!.toString().trim(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        period6!.toString().trim(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        period7!.toString().trim(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        period8!.toString().trim(),
    ];

    return <div style={{ marginBlockStart: "1.5rem" }}>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <InputControl inputId="period1" inputName="1st Period" value={period1} onChange={e => {
                          setPeriod1(e.currentTarget.value);
                      }} />
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <InputControl inputId="period2" inputName="2nd Period" value={period2} onChange={e => {
                          setPeriod2(e.currentTarget.value);
                      }} />
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <InputControl inputId="period3" inputName="3rd Period" value={period3} onChange={e => {
                          setPeriod3(e.currentTarget.value);
                      }} />
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <InputControl inputId="period4" inputName="4th Period" value={period4} onChange={e => {
                          setPeriod4(e.currentTarget.value);
                      }} />
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <InputControl inputId="period5" inputName="5th Period" value={period5} onChange={e => {
                          setPeriod5(e.currentTarget.value);
                      }} />
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <InputControl inputId="period6" inputName="6th Period" value={period6} onChange={e => {
                          setPeriod6(e.currentTarget.value);
                      }} />
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <InputControl inputId="period7" inputName="7th Period" value={period7} onChange={e => {
                          setPeriod7(e.currentTarget.value);
                      }} />
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <InputControl inputId="period8" inputName="Homeroom" value={period8} onChange={e => {
                          setPeriod8(e.currentTarget.value);
                      }} />
        <div style={{ textAlign: "right" }}>
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */}
            <button className={ styles.button } onClick={() => updatePeriodNames(periodNames)}>Save</button>
        </div>
    </div>;
};