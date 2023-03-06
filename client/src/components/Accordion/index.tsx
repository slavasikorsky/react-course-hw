import { useState } from "react";
import "./Accordion.scss";

interface Props {
	items: [{ title: string; content: string }];
}

type AccordionProps = (props: Props) => JSX.Element;

const Accordion: AccordionProps = ({ items }) => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const handleClick = (index: number) => {
		return activeIndex === index
			? setActiveIndex(null)
			: setActiveIndex(index);
	};

	return (
		<div className="accordion">
			{items &&
				items.map((item, index) => (
					<div key={item.title} className="item">
						<button
							type="button"
							className={activeIndex === index ? "active" : ""}
							onClick={() => handleClick(index)}
							aria-expanded={activeIndex === index}
						>
							{item.title}
						</button>
						{activeIndex === index && (
							<div className="content">{item.content}</div>
						)}
					</div>
				))}
		</div>
	);
};

export default Accordion;