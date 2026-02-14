export default function ProgressMeter({ progress }: { progress: number }) {
    return <div className="bg-(--sec) w-full h-1 mt-1 rounded-lg flex">
        <div className="bg-(--accent-color) h-1 rounded-lg" style={{ width: progress + "%" }} />
    </div>
};