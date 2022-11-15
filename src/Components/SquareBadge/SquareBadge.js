import "./SquareBadge.css";

export default function SquareBadge({ text}) {
    return (
        <div className="square-badge-root">
            <p className="square-badge-text">{text}</p>
        </div>
    );
}