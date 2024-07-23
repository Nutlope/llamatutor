import type React from "react";
import { Fragment, useEffect, useState } from "react";

export default function RelatedTopics({
	topic,
	setPromptValue,
	handleInitialChat,
}: {
	topic: string;
	setPromptValue: React.Dispatch<React.SetStateAction<string>>;
	handleInitialChat: (newTopic?: string) => Promise<void>;
}) {
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
		setPromptValue(relatedTopic);
		handleInitialChat(relatedTopic);
	};

	return (
		<div className="flex gap-2 lg:px-4">
			<h3 className="text-base font-bold uppercase leading-[152.5%] text-black text-nowrap">
				Related Topics:{" "}
			</h3>
			{loading ? (
				<p>Loading...</p>
			) : relatedTopics.length > 0 ? (
				<ul className="flex gap-4 lg:pl-2 overflow-x-scroll text-nowrap">
					{relatedTopics.slice(0, 3).map((relatedTopic, index) => (
						<Fragment key={relatedTopic}>
							{index > 0 && " | "}
							<li
								onClick={() => handleTopicClick(relatedTopic)}
								className="text-blue-500 hover:cursor-pointer"
							>
								{relatedTopic}
							</li>
						</Fragment>
					))}
				</ul>
			) : (
				<></>
			)}
		</div>
	);
}
