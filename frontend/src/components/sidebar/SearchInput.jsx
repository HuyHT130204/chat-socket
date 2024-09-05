import { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	useEffect(() => {
		if (search.length < 3) {
			setSearchResults([]);
			return;
		}

		const matchingConversations = conversations.filter((c) =>
			c.fullName.toLowerCase().includes(search.toLowerCase())
		);

		setSearchResults(matchingConversations);

		if (matchingConversations.length === 0) {
			toast.error("No such user found!");
		}
	}, [search, conversations]);

	const handleSelectConversation = (conversation) => {
		setSelectedConversation(conversation);
		setSearch("");
		setSearchResults([]);
	};

	return (
		<div>
			<form className="flex items-center gap-2">
				<input
					type="text"
					placeholder="Search…"
					className="input input-bordered rounded-full"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button type="submit" className="btn btn-circle bg-sky-500 text-white" disabled>
					<IoSearchSharp className="w-6 h-6 outline-none" />
				</button>
			</form>
			{searchResults.length > 0 && (
				<ul className="mt-2 bg-transparent rounded-md shadow-md">
					{searchResults.map((result) => (
						<li
							key={result._id}
							className="p-2 hover:bg-black/20 cursor-pointer flex items-center gap-2 rounded-lg"
							onClick={() => handleSelectConversation(result)}
						>
							<img
								src={result.profilePic} 
								alt={result.fullName} 
								className="w-8 h-8 rounded-full" 
							/>
							<span className="text-lg">{result.emoji}</span>
							<span>{result.fullName}</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SearchInput;
