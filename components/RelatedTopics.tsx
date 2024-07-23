import type React from "react";
import { useEffect, useState } from "react";

type RelatedTopicsProps = {
	topic: string;
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
	handleSourcesAndChat: (question: string) => Promise<void>;
};

const RelatedTopics: React.FC<RelatedTopicsProps> = ({
	topic,
	setInputValue,
	handleSourcesAndChat,
}) => {
	const [relatedTopics, setRelatedTopics] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchRelatedTopics = async () => {
			setLoading(true);
			const response = await fetch("/api/getRelatedTopics", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ topic }),
			});

			if (response.ok) {
				const data = await response.json();
				setRelatedTopics(data.topics);
			}
			setLoading(false);
		};

		if (topic) {
			fetchRelatedTopics();
		}
	}, [topic]);

	const handleTopicClick = (relatedTopic: string) => {
		setInputValue(relatedTopic);
		handleSourcesAndChat(relatedTopic);
	};

	return (
		<div className="related-topics">
			<h3>Related Topics</h3>
			{loading ? (
				<p>Loading...</p>
			) : (
				<ul>
					{relatedTopics.map((relatedTopic) => (
						<li
							key={relatedTopic}
							onClick={() => handleTopicClick(relatedTopic)}
						>
							{relatedTopic}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default RelatedTopics;
