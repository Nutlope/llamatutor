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
		// Function to fetch related topics from the API
		const fetchRelatedTopics = async () => {
			setLoading(true);
			try {
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
			} catch (error) {
				console.error("Failed to fetch related topics:", error);
			} finally {
				setLoading(false);
			}
		};

		if (topic) {
			fetchRelatedTopics(); // Fetch topics if a topic is provided
		}
	}, [topic]);

	// Function to handle click on a related topic
	const handleTopicClick = (relatedTopic: string) => {
		setPromptValue(relatedTopic); // Set the prompt value to the clicked topic
		handleInitialChat(relatedTopic); // Initiate chat with the clicked topic
	};

	return (
		<div className="flex gap-2 lg:px-4">
			<h3 className="text-base font-bold uppercase leading-[152.5%] text-black text-nowrap">
				Related Topics:
			</h3>
			{loading ? (
				<p>Loading...</p>
			) : relatedTopics.length > 0 ? (
				<ul className="flex gap-4 lg:pl-2 overflow-x-scroll text-nowrap">
					{relatedTopics.map((relatedTopic, index) => (
						<Fragment key={relatedTopic}>
							{index > 0 && "|"}
							<li
								onClick={() => handleTopicClick(relatedTopic)}
								className="text-blue-500 hover:cursor-pointer"
							>
								{relatedTopic}
							</li>
						</Fragment>
					))}
				</ul>
			) : null}
		</div>
	);
}
