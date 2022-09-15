import "./styles.css";

type SpellInfoDetailProps = {
    heading: string;
    detail: string;
};

// Renders small spell information blocks
function SpellDetail(props: SpellInfoDetailProps) {
    return (
        <div
            data-testid="spellDetail"
            className="detail"
        >
            <div className="detail_heading">{props.heading}</div>
            <div className="detail_value">{props.detail}</div>
        </div>
    );
}

export default SpellDetail;